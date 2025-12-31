# Quick Start Guide - AI Assistant

Get your conversational AI assistant running in 5 minutes!

## Prerequisites

- Python 3.12+ installed
- Node.js and npm installed (for Docusaurus)
- Google API key ([Get one here](https://makersuite.google.com/app/apikey))

## Step 1: Install Backend Dependencies (2 min)

```bash
cd Book-physical-ai/rag-chatbot/backend
pip install -r requirements.txt
```

Verify installation:
```bash
python test_imports.py
```

You should see:
```
[OK] All required imports successful!
[OK] Your AI assistant backend is ready to run
```

## Step 2: Configure API Key (30 sec)

1. Copy the example environment file:
```bash
cd ..
copy .env.example .env
```

2. Edit `.env` and add your Google API key:
```
GOOGLE_API_KEY=your_actual_google_api_key_here
```

## Step 3: Start the Backend (30 sec)

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Keep this terminal open!

## Step 4: Test the API (30 sec)

Open a new terminal and test:

```bash
# Health check
curl http://localhost:8000/

# Get stats
curl http://localhost:8000/stats

# Test chat
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d "{\"message\": \"Hello!\"}"
```

## Step 5: Ingest Documentation (1 min)

Index your documentation:
```bash
curl -X POST http://localhost:8000/ingest
```

This will scan and embed all markdown files in the `docs/` directory.

## Step 6: Start Docusaurus (30 sec)

In a new terminal:
```bash
cd Book-physical-ai
npm start
```

The site should open at `http://localhost:3000`

## Step 7: Test the Chat Widget

1. Look for the purple chat button in the bottom-right corner
2. Click it to open the chat
3. Try these test questions:
   - "What is ROS 2?"
   - "Tell me about Physical AI"
   - "How do I install ROS 2?"

## Features to Try

### 1. Conversational Memory
Ask follow-up questions:
```
You: What is ROS 2?
Bot: [explains ROS 2]

You: How is it different from ROS 1?
Bot: [explains differences, referencing previous context]
```

### 2. RAG Toggle
- Click the "📚 RAG On" button to toggle RAG on/off
- RAG On: Uses documentation (shows sources)
- RAG Off: Uses general knowledge only

### 3. Clear Conversation
- Click the 🔄 button to reset the conversation
- Memory indicator changes from "🧠 Memory Active" to "💭 New Chat"

### 4. View Sources
- When RAG is enabled, sources appear below answers
- Hover over source tags to see content snippets

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is already in use
netstat -ano | findstr :8000

# Try a different port
uvicorn main:app --reload --port 8001
```

### "RAG system not initialized"
```bash
# Re-ingest documents
curl -X POST http://localhost:8000/ingest
```

### Frontend can't connect
1. Check backend is running: `curl http://localhost:8000/`
2. Check API URL in ChatWidget.js (should be `http://localhost:8000`)
3. Check browser console for CORS errors

### No conversation memory
- Make sure you're getting a `conversation_id` in the response
- Check the backend logs for errors
- Try clearing your browser cache

## API Examples

### Basic Chat
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Physical AI?"}'
```

### Continue Conversation
```bash
# Use the conversation_id from previous response
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me more",
    "conversation_id": "abc-123",
    "use_rag": true
  }'
```

### Get History
```bash
curl http://localhost:8000/conversation/abc-123
```

### Clear Conversation
```bash
curl -X DELETE http://localhost:8000/conversation/abc-123
```

## What's Next?

1. **Read the full README** for advanced configuration
2. **Check UPGRADE_SUMMARY.md** to see what changed
3. **Customize the system prompt** in `backend/main.py`
4. **Style the widget** in `frontend/ChatWidget.module.css`
5. **Add more documentation** and re-run `/ingest`

## Common Commands

**Start backend:**
```bash
cd Book-physical-ai/rag-chatbot/backend
uvicorn main:app --reload
```

**Start frontend:**
```bash
cd Book-physical-ai
npm start
```

**Ingest docs:**
```bash
curl -X POST http://localhost:8000/ingest
```

**Check stats:**
```bash
curl http://localhost:8000/stats
```

**List conversations:**
```bash
curl http://localhost:8000/conversations
```

## Need Help?

- 📖 **README.md** - Full documentation
- 📝 **UPGRADE_SUMMARY.md** - What changed in v3.0.0
- 🐛 **Check backend logs** - Look at the terminal running uvicorn
- 🔍 **Check browser console** - F12 → Console tab

---

**You're all set!** Enjoy your new conversational AI assistant! 🤖
