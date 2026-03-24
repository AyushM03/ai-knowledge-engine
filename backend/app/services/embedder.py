import os
from typing import List
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma

CHROMA_DIR = "chroma_db"

def get_embeddings():
    return OllamaEmbeddings(
        model="nomic-embed-text"
    )

def store_chunks(chunks: List[str], filename: str) -> int:
    embeddings = get_embeddings()

    metadatas = [{"source": filename, "chunk_index": i}
                 for i, _ in enumerate(chunks)]

    vectordb = Chroma(
        persist_directory=CHROMA_DIR,
        embedding_function=embeddings
    )

    vectordb.add_texts(
        texts=chunks,
        metadatas=metadatas
    )

    return len(chunks)

def search_similar(query: str, top_k: int = 3) -> List[dict]:
    embeddings = get_embeddings()

    vectordb = Chroma(
        persist_directory=CHROMA_DIR,
        embedding_function=embeddings
    )

    results = vectordb.similarity_search_with_score(query, k=top_k)

    formatted = []
    for doc, score in results:
        formatted.append({
            "content": doc.page_content,
            "source": doc.metadata.get("source", "unknown"),
            "score": round(score, 4)
        })

    return formatted