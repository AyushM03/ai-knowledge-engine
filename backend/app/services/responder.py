import os
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.services.embedder import search_similar

def get_llm():
    """Initialize the Ollama LLM"""
    return OllamaLLM(model="mistral")

def answer_question(question: str, top_k: int = 3) -> dict:
    """
    1. Search vector DB for relevant chunks
    2. Send chunks + question to Mistral
    3. Return the answer
    """

    # Step 1 — find relevant chunks from your documents
    relevant_chunks = search_similar(question, top_k=top_k)

    if not relevant_chunks:
        return {
            "answer": "I could not find any relevant information. Please upload some documents first.",
            "sources": [],
            "question": question
        }

    # Step 2 — build context from retrieved chunks
    context = "\n\n".join([
        f"Source: {chunk['source']}\n{chunk['content']}"
        for chunk in relevant_chunks
    ])

    # Step 3 — build the prompt
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are a helpful AI assistant. Answer the question based ONLY on the
context provided below. If the answer is not in the context, say
"I don't have enough information in the uploaded documents to answer this."

Context:
{context}

Question: {question}

Answer:"""
    )

    # Step 4 — build the chain using new LangChain syntax
    llm = get_llm()
    chain = prompt_template | llm | StrOutputParser()
    answer = chain.invoke({
        "context": context,
        "question": question
    })

    # Step 5 — collect source filenames
    sources = list(set([chunk["source"] for chunk in relevant_chunks]))

    return {
        "answer": answer.strip(),
        "sources": sources,
        "question": question
    }