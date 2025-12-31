"""Test if all required packages are installed"""
try:
    from fastapi import FastAPI
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.runnables.history import RunnableWithMessageHistory
    from langchain_core.chat_history import InMemoryChatMessageHistory
    from langchain_community.vectorstores import Chroma
    print("[OK] All required imports successful!")
    print("[OK] Your AI assistant backend is ready to run")
except ImportError as e:
    print(f"[ERROR] Import error: {e}")
    print("\nPlease install dependencies:")
    print("  pip install -r requirements.txt")
