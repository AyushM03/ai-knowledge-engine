from pydantic import BaseModel
from typing import Optional

class UploadResponse(BaseModel):
    success: bool
    filename: str
    chunks_created: int
    message: str

class QueryRequest(BaseModel):
    question: str
    top_k: Optional[int] = 3

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]
    question: str