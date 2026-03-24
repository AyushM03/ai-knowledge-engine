from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import UploadResponse
from app.services.parser import process_file
from app.services.embedder import store_chunks
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):

    allowed_types = [".pdf", ".txt"]
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="File type not supported. Use PDF or TXT only."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        # Save file temporarily
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract chunks from file
        chunks = process_file(file_path, file.filename)

        # Store chunks in vector database
        stored = store_chunks(chunks, file.filename)

        return UploadResponse(
            success=True,
            filename=file.filename,
            chunks_created=stored,
            message=f"Stored {stored} chunks from {file.filename} into knowledge base"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)