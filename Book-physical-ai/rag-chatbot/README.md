# Book-Physical-AI Conversational AI Assistant

An intelligent conversational AI assistant with RAG (Retrieval-Augmented Generation) and memory capabilities for the Book-Physical-AI documentation platform.

## ✨ Features

- 🧠 **Conversational Memory** - Maintains context across multi-turn conversations
- 📚 **RAG Integration** - Retrieves and uses documentation context for accurate answers
- 🎯 **Intelligent Responses** - Powered by Google Gemini 1.5 Flash
- 💭 **Context-Aware** - Understands conversation flow and references previous messages
- 🔄 **Session Management** - Persistent conversations with unique session IDs
- 🎨 **Modern UI** - Beautiful, responsive chat widget with dark mode support
- 📖 **Source Citations** - Shows which documentation was used to answer questions

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Docusaurus Frontend (React)                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │  ChatWidget.js - Conversational UI               │       │
│  │  • Multi-turn chat with memory                   │       │
│  │  • Session persistence                           │       │
│  │  • RAG toggle & clear conversation               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼ REST API
┌─────────────────────────────────────────────────────────────┐
│              FastAPI Backend (Conversational Agent)          │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Conversation Memory Store (In-Memory)           │       │
│  │  ┌────────────────────────────────────────┐     │       │
│  │  │ POST /chat - Conversational endpoint   │     │       │
│  │  │   → RunnableWithMessageHistory         │     │       │
│  │  │   → RAG retrieval (ChromaDB)           │     │       │
│  │  │   → Google Gemini 1.5 Flash            │     │       │
│  │  └────────────────────────────────────────┘     │       │
│  │  • GET /conversation/{id} - Get history         │       │
│  │  • DELETE /conversation/{id} - Clear history    │       │
│  │  • GET /stats - System statistics               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Backend**: FastAPI + Python 3.12
- **AI Framework**: LangChain with conversational memory
- **LLM**: Google Gemini 1.5 Flash
- **Embeddings**: Google `text-embedding-001`
- **Vector Database**: ChromaDB (local persistence)
- **Frontend**: React (Docusaurus component)
- **Memory**: In-memory conversation store with session management

## Quick Start

### 1. Install Backend Dependencies

```bash
cd rag-chatbot/backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cd rag-chatbot
cp .env.example .env
# Edit .env and add your Google API key
```

Your `.env` file should contain:
```
GOOGLE_API_KEY=your_google_api_key_here
```

Get your Google API key from: https://makersuite.google.com/app/apikey

### 3. Start the Backend Server

```bash
cd rag-chatbot/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Ingest Documentation

The server will automatically ingest documents on startup, or you can trigger it manually:

```bash
curl -X POST http://localhost:8000/ingest
```

### 5. Run the Frontend

In a separate terminal, start Docusaurus:

```bash
cd rag-chatbot/../..
npm start
```

The chat widget will appear in the bottom-right corner of documentation pages.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check & feature info |
| GET | `/stats` | System statistics (conversations, docs, model) |
| POST | `/chat` | Conversational chat endpoint |
| POST | `/ingest` | Re-ingest all documentation |
| GET | `/conversation/{id}` | Get full conversation history |
| DELETE | `/conversation/{id}` | Clear specific conversation |
| GET | `/conversations` | List all active conversations |
| DELETE | `/reset` | Clear and rebuild vector store |

### Chat Request

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is ROS 2?",
    "conversation_id": "optional-session-id",
    "use_rag": true
  }'
```

### Chat Response

```json
{
  "message": "ROS 2 (Robot Operating System 2) is a flexible framework...",
  "sources": [
    {
      "content": "ROS 2 is the next generation...",
      "source": "ros2-foundations/module-1-ros2.md"
    }
  ],
  "conversation_id": "abc123",
  "timestamp": "2025-12-31T10:30:00"
}
```

### Get Conversation History

```bash
curl http://localhost:8000/conversation/abc123
```

Response:
```json
{
  "conversation_id": "abc123",
  "messages": [
    {
      "role": "user",
      "content": "What is ROS 2?",
      "timestamp": "2025-12-31T10:30:00"
    },
    {
      "role": "assistant",
      "content": "ROS 2 is...",
      "timestamp": "2025-12-31T10:30:05"
    }
  ]
}
```

## Project Structure

```
rag-chatbot/
├── backend/
│   ├── main.py           # FastAPI server with RAG endpoints
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment template
├── frontend/
│   ├── ChatWidget.js     # React chat component
│   └── ChatWidget.module.css
├── data/
│   └── chroma_db/        # ChromaDB persistence (created on first run)
└── README.md
```

## Key Features Explained

### 🧠 Conversational Memory

The AI assistant maintains conversation context using LangChain's `RunnableWithMessageHistory`:
- Each conversation gets a unique session ID
- Previous messages are automatically included in context
- The assistant can reference earlier parts of the conversation
- Memory persists until explicitly cleared

Example:
```
User: What is ROS 2?
Assistant: ROS 2 is the next generation Robot Operating System...

User: How does it differ from ROS 1?
Assistant: Building on what I mentioned about ROS 2, the key differences...
```

### 📚 RAG Integration

RAG can be toggled on/off in the UI:
- **RAG On**: Retrieves relevant documentation before answering
- **RAG Off**: Uses only the LLM's general knowledge
- Top 3 most relevant document chunks are used
- Sources are displayed with each answer

### 🎨 UI Features

- **Memory Indicator**: Shows "🧠 Memory Active" when conversation has history
- **Clear Button** (🔄): Resets conversation and clears memory
- **RAG Toggle**: Switch between doc-grounded and general responses
- **Timestamps**: Shows when each message was sent
- **Source Tags**: Clickable tags showing documentation sources
- **Dark Mode**: Automatic theme switching

## Troubleshooting

### "RAG system not initialized"
- Make sure the backend server is running
- Check that `GOOGLE_API_KEY` is set in `.env`
- Verify the API key is valid

### No documents indexed
- Run `curl -X POST http://localhost:8000/ingest`
- Verify docs exist in the `docs/` directory (two levels up from backend)
- Check backend logs for ingestion errors

### Chat widget not appearing
- Ensure Docusaurus is running (`npm start`)
- Check browser console for errors
- Verify the backend is accessible at `http://localhost:8000`
- Check CORS settings if using different domains

### Conversation not remembering context
- Check that `conversation_id` is being passed in requests
- Verify the session ID is consistent across requests
- Check backend logs for memory store issues

## Adding More Documents

To add new documentation:
1. Add markdown files to the `docs/` directory
2. Restart the backend or call `POST /ingest`
3. The new content will be automatically embedded and searchable

## Configuration

### Backend Configuration

Edit `backend/main.py` to customize:
- `LLM_MODEL`: Change the Gemini model (default: `gemini-1.5-flash`)
- `EMBEDDING_MODEL`: Change embedding model (default: `models/embedding-001`)
- `CHROMA_DB_DIR`: Vector database storage location
- `temperature`: LLM creativity (0.7 by default)

### Frontend Configuration

Edit `ChatWidget.js` to customize:
- `apiUrl`: Backend URL (default: `http://localhost:8000`)
- Initial greeting message
- UI colors and styling in `ChatWidget.module.css`

## Advanced Usage

### Using with Your Own Documentation

1. Place your markdown files in the `docs/` directory
2. Run the ingest endpoint: `curl -X POST http://localhost:8000/ingest`
3. The assistant will now answer questions about your docs

### Programmatic Access

```python
import requests

# Start a conversation
response = requests.post('http://localhost:8000/chat', json={
    'message': 'What is Physical AI?',
    'use_rag': True
})

data = response.json()
conversation_id = data['conversation_id']

# Continue the conversation
response = requests.post('http://localhost:8000/chat', json={
    'message': 'Tell me more about that',
    'conversation_id': conversation_id,
    'use_rag': True
})
```

## Contributing

Contributions are welcome! Areas for improvement:
- Persistent conversation storage (database integration)
- Multi-user session management
- Advanced RAG techniques (reranking, hybrid search)
- Additional agent capabilities (web search, code execution)
- Export conversation history

## License

MIT License - see the parent project for details.
