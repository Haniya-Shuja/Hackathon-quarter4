@echo off
REM Start RAG Chatbot Backend Server
REM Usage: double-click this file or run from command line

echo Starting RAG Chatbot Backend...
cd /d "%~dp0backend"

REM Check for virtual environment
if exist "..\venv\Scripts\activate.bat" (
    call "..\venv\Scripts\activate.bat"
    echo Using virtual environment...
)

REM Check for .env file
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and add your OpenAI API key.
    pause
    exit /b 1
)

REM Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
