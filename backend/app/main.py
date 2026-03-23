from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="AI Knowledge Engine",
    description="Your personal AI-powered document assistant",
    version="1.0.0"

)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "running",
        "message": "AI Knowledge Engine is live"
    }

# Test route
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0"
    }