import pdfplumber
from typing import List

def extract_text_from_pdf(file_path: str) -> str:
    """Extract all text from a PDF file"""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def extract_text_from_txt(file_path: str) -> str:
    """Extract text from a plain text file"""
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read().strip()

def split_into_chunks(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """
    Split text into overlapping chunks.
    Overlap means chunks share some words — this helps AI find
    answers that sit across two chunk boundaries.
    """
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk.strip())
        start += chunk_size - overlap

    return chunks

def process_file(file_path: str, filename: str) -> List[str]:
    """Main function — detects file type and returns chunks"""
    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif filename.endswith(".txt"):
        text = extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {filename}")

    chunks = split_into_chunks(text)
    return chunks