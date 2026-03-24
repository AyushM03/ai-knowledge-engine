from fastapi import APIRouter, HTTPException
from app.models.schemas import QueryRequest, QueryResponse
from app.services.responder import answer_question

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    """
    Accept a question, search the vector DB,
    generate an AI answer and return it.
    """
    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    try:
        result = answer_question(
            question=request.question,
            top_k=request.top_k
        )

        return QueryResponse(
            answer=result["answer"],
            sources=result["sources"],
            question=result["question"]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))