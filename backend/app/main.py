from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, query
from app.utils.config import validate_config

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

@app.on_event("startup")
def startup_event():
    validate_config()
    print("AI Knowledge Engine started successfully")

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(query.router, prefix="/api", tags=["Query"])

@app.get("/")
def root():
    return {"status": "running", "message": "AI Knowledge Engine is live"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}