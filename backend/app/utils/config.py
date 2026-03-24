from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "AI Knowledge Engine")
DEBUG = os.getenv("DEBUG", "False") == "True"

def validate_config():
    """Check all required config on startup"""
    print(f"Starting {APP_NAME}...")
    print("Using Ollama for embeddings and responses — no API key needed")