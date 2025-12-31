"""
AI Assistant Backend - FastAPI server with conversational agent capabilities
Intelligent AI assistant powered by Google Gemini with RAG and conversation memory
Features: Multi-turn conversations, context awareness, document retrieval
"""

import os
import uuid
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
# Supports both OPENAI_API_KEY (legacy) and GOOGLE_API_KEY
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

# Get API key - support both old OpenAI name and new Google name
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("OPENAI_API_KEY", "")
print(f"[DEBUG] API_KEY loaded: {GOOGLE_API_KEY[:10]}... (length: {len(GOOGLE_API_KEY)})")

from contextlib import asynccontextmanager
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# --- Configuration ---
CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "chroma_db")
DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "docs")
LLM_MODEL = "gemini-2.5-flash"  # Fast and efficient Gemini model
EMBEDDING_MODEL = "models/embedding-001"

# --- Global state ---
vectorstore = None
retriever = None
conversation_store: Dict[str, InMemoryChatMessageHistory] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize resources on startup"""
    global vectorstore, retriever
    print(f"[DEBUG] Startup - API_KEY: {GOOGLE_API_KEY[:10]}...")
    try:
        embeddings = GoogleGenerativeAIEmbeddings(
            model=EMBEDDING_MODEL,
            google_api_key=GOOGLE_API_KEY
        )
        vectorstore = Chroma(
            persist_directory=CHROMA_DB_DIR,
            embedding_function=embeddings
        )
        retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
        print(f"[OK] RAG system initialized with {vectorstore._collection.count()} documents")
    except Exception as e:
        print(f"[WARNING] RAG system not ready: {e}")
    yield
    # Cleanup if needed

app = FastAPI(
    title="AI Assistant API",
    description="Conversational AI assistant with RAG and memory capabilities",
    version="3.0.0",
    lifespan=lifespan
)

# Enable CORS for Docusaurus frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class Message(BaseModel):
    """Individual chat message"""
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: Optional[str] = None
    sources: Optional[List[dict]] = None

class ChatRequest(BaseModel):
    """Request body for chat endpoint"""
    message: str
    conversation_id: Optional[str] = None
    use_rag: Optional[bool] = True

class ChatResponse(BaseModel):
    """Response from chat endpoint"""
    message: str
    sources: Optional[List[dict]] = []
    conversation_id: str
    timestamp: str

class ConversationHistory(BaseModel):
    """Get conversation history"""
    conversation_id: str
    messages: List[Message]

class IngestResponse(BaseModel):
    """Response from ingest endpoint"""
    status: str
    documents_added: int
    total_documents: int

# --- Helper Functions ---

def extract_text_from_markdown(file_path: str) -> str:
    """Extract plain text from markdown file, removing frontmatter"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Remove YAML frontmatter (between --- markers)
    lines = content.split('\n')
    in_frontmatter = False
    clean_lines = []
    for line in lines:
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
            continue
        if not in_frontmatter:
            clean_lines.append(line)
    return '\n'.join(clean_lines)

def get_markdown_files(directory: str) -> List[str]:
    """Recursively find all markdown files in directory"""
    md_files = []
    for root, dirs, files in os.walk(directory):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

# --- Conversation Memory Management ---

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    """Get or create conversation history for a session"""
    if session_id not in conversation_store:
        conversation_store[session_id] = InMemoryChatMessageHistory()
    return conversation_store[session_id]

# --- AI Assistant Chain with Memory ---

def create_conversational_rag_chain(use_rag=True):
    """Create a conversational RAG chain with memory using Google Gemini"""
    llm = ChatGoogleGenerativeAI(
        model=LLM_MODEL,
        google_api_key=GOOGLE_API_KEY,
        temperature=0.7,
        convert_system_message_to_human=True
    )

    # System prompt for the conversational AI assistant
    system_prompt = """You are an intelligent AI assistant for the Book-Physical-AI documentation platform. You specialize in:
- ROS 2 (Robot Operating System 2) and robotics
- Vision-Language-Action (VLA) systems
- Physical AI and embodied intelligence
- Robotics hardware and simulation
- Computer vision and autonomous systems

Your capabilities:
✓ Answer questions using retrieved documentation (RAG)
✓ Maintain context across the conversation
✓ Provide clear, technical explanations
✓ Reference specific documentation sources
✓ Help users understand complex robotics concepts

Guidelines:
- Be conversational and helpful
- Use the conversation history to provide contextual responses
- When using retrieved context, cite your sources
- If you don't know something, admit it and suggest where to find information
- Provide code examples when appropriate
- Break down complex topics into understandable chunks

{context}"""

    # Create prompt template with message history
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}")
    ])

    def format_docs(docs):
        if not docs:
            return "No specific documentation context available."
        formatted = "Retrieved Documentation:\n\n"
        for i, doc in enumerate(docs, 1):
            source = doc.metadata.get("source", "unknown")
            formatted += f"[Source {i}: {source}]\n{doc.page_content}\n\n"
        return formatted

    # Build the chain - only use retriever if RAG is enabled and retriever exists
    if use_rag and retriever:
        try:
            chain = (
                {
                    "context": lambda x: format_docs(retriever.invoke(x["question"])),
                    "question": lambda x: x["question"],
                    "chat_history": lambda x: x["chat_history"]
                }
                | prompt
                | llm
                | StrOutputParser()
            )
        except Exception as e:
            print(f"[WARNING] RAG chain failed, using fallback: {e}")
            # Fallback if retriever fails
            chain = (
                {
                    "context": lambda x: "Documentation retrieval temporarily unavailable.",
                    "question": lambda x: x["question"],
                    "chat_history": lambda x: x["chat_history"]
                }
                | prompt
                | llm
                | StrOutputParser()
            )
    else:
        # Fallback without RAG
        chain = (
            {
                "context": lambda x: "No documentation retrieval available.",
                "question": lambda x: x["question"],
                "chat_history": lambda x: x["chat_history"]
            }
            | prompt
            | llm
            | StrOutputParser()
        )

    # Wrap with message history
    conversational_chain = RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="question",
        history_messages_key="chat_history"
    )

    return conversational_chain

# --- API Endpoints ---

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AI Assistant API",
        "version": "3.0.0",
        "features": ["conversational_memory", "rag", "multi_turn_chat"]
    }

@app.get("/stats")
async def stats():
    """Get AI assistant statistics"""
    stats_data = {
        "status": "ready",
        "llm_model": LLM_MODEL,
        "active_conversations": len(conversation_store),
        "rag_enabled": retriever is not None
    }

    if vectorstore is not None:
        stats_data["documents_indexed"] = vectorstore._collection.count()
        stats_data["embedding_model"] = EMBEDDING_MODEL

    return stats_data

@app.post("/ingest", response_model=IngestResponse)
async def ingest_documents():
    """
    Ingest all markdown documentation into the vector store.
    Scans the docs/ directory recursively.
    """
    global vectorstore, retriever

    if vectorstore is None:
        raise HTTPException(status_code=503, detail="RAG system not initialized")

    md_files = get_markdown_files(DOCS_DIR)
    if not md_files:
        raise HTTPException(status_code=404, detail="No markdown files found in docs/")

    from langchain_core.documents import Document
    documents = []
    for file_path in md_files:
        try:
            text = extract_text_from_markdown(file_path)
            # Create relative path for source tracking
            rel_path = os.path.relpath(file_path, DOCS_DIR)
            doc = Document(
                page_content=text,
                metadata={"source": rel_path}
            )
            documents.append(doc)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # Add documents to vector store
    if documents:
        vectorstore.add_documents(documents)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

    total = vectorstore._collection.count()
    return IngestResponse(
        status="success",
        documents_added=len(documents),
        total_documents=total
    )

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Conversational AI assistant endpoint with memory and RAG.
    Maintains conversation history and retrieves relevant documentation.
    """
    try:
        # Get or create conversation ID
        conv_id = request.conversation_id or str(uuid.uuid4())
        timestamp = datetime.now().isoformat()

        # Create conversational chain with RAG setting
        chain = create_conversational_rag_chain(use_rag=request.use_rag)

        # Invoke chain with conversation history
        answer = chain.invoke(
            {"question": request.message},
            config={"configurable": {"session_id": conv_id}}
        )

        # Get source documents ONLY if RAG is explicitly enabled and retriever exists
        sources = []
        if request.use_rag and retriever:
            try:
                retrieved_docs = retriever.invoke(request.message)
                for doc in retrieved_docs[:3]:  # Limit to top 3 sources
                    sources.append({
                        "content": doc.page_content[:150] + "..." if len(doc.page_content) > 150 else doc.page_content,
                        "source": doc.metadata.get("source", "unknown")
                    })
            except Exception as e:
                print(f"[WARNING] RAG retrieval failed (will continue without sources): {e}")
                # Don't fail the whole request, just skip sources

        return ChatResponse(
            message=answer,
            sources=sources,
            conversation_id=conv_id,
            timestamp=timestamp
        )
    except Exception as e:
        print(f"[ERROR] Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.get("/conversation/{conversation_id}", response_model=ConversationHistory)
async def get_conversation(conversation_id: str):
    """Get full conversation history for a session"""
    if conversation_id not in conversation_store:
        raise HTTPException(status_code=404, detail="Conversation not found")

    history = conversation_store[conversation_id]
    messages = []

    for msg in history.messages:
        role = "user" if isinstance(msg, HumanMessage) else "assistant"
        messages.append(Message(
            role=role,
            content=msg.content,
            timestamp=datetime.now().isoformat()
        ))

    return ConversationHistory(
        conversation_id=conversation_id,
        messages=messages
    )

@app.delete("/conversation/{conversation_id}")
async def clear_conversation(conversation_id: str):
    """Clear conversation history for a session"""
    if conversation_id in conversation_store:
        del conversation_store[conversation_id]
        return {"status": "cleared", "conversation_id": conversation_id}
    raise HTTPException(status_code=404, detail="Conversation not found")

@app.get("/conversations")
async def list_conversations():
    """List all active conversation IDs"""
    return {
        "active_conversations": list(conversation_store.keys()),
        "count": len(conversation_store)
    }

@app.delete("/reset")
async def reset_vectorstore():
    """Clear all indexed documents (for testing/development)"""
    global vectorstore, retriever

    import shutil
    if os.path.exists(CHROMA_DB_DIR):
        shutil.rmtree(CHROMA_DB_DIR)
        os.makedirs(CHROMA_DB_DIR, exist_ok=True)

    embeddings = GoogleGenerativeAIEmbeddings(
        model=EMBEDDING_MODEL,
        google_api_key=GOOGLE_API_KEY
    )
    vectorstore = Chroma(
        persist_directory=CHROMA_DB_DIR,
        embedding_function=embeddings
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

    return {"status": "reset", "message": "Vector store cleared and rebuilt"}
