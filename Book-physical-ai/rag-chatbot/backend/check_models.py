"""Check available Gemini models"""
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("OPENAI_API_KEY", "")

genai.configure(api_key=GOOGLE_API_KEY)

print("Available Gemini models:")
print("-" * 50)
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"  - {model.name}")
