# app.py
import os
import json
import faiss
import numpy as np
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from pydantic import BaseModel
from llm.local_llm import generate_with_ollama

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("rag/monuments.index")

with open("rag/metadata.json") as f:
    METADATA = json.load(f)

app = FastAPI()


class StoryRequest(BaseModel):
    placeId: str
    placeName: str
    mode: str


FACTUAL_PROMPT = """
You are a heritage historian.
Rewrite the following content into a concise, factual description.
No metaphors. No imagination. Only verified facts.

CONTENT:
{content}
"""

IMMERSIVE_PROMPT = """
You are a cultural storyteller for a walking tour.
Rewrite the following content into an immersive narrative.
Use vivid but respectful language.
Do NOT invent facts. Do NOT add dates or events not present.

CONTENT:
{content}
"""

@app.post("/story/generate")
def generate_story(req: StoryRequest):
    print("---- STORY REQUEST ----")
    print("Place:", req.placeName)
    print("Mode:", req.mode)

    # 1. Vector search
    query = f"{req.placeName} monument history Delhi"
    query_embedding = model.encode([query])

    D, I = index.search(np.array(query_embedding), k=1)
    retrieved_doc = METADATA[I[0][0]]
    base_content = retrieved_doc["content"]

    print("Retrieved content:", base_content[:80])

    try:
        print("Calling Ollama...")

        system_prompt = (
            "You are a heritage storyteller for Delhi monuments.\n"
            "You must strictly use ONLY the provided content.\n"
            "Do NOT add new facts, dates, or names.\n"
        )

        if req.mode == "factual":
            user_prompt = f"""
Rewrite the following content into a concise, factual description.
No metaphors. No imagination. Strictly factual.

CONTENT:
{base_content}
"""
        else:
            user_prompt = f"""
Rewrite the following content into an immersive walking-tour style story.
Use second-person narration like 'you see', 'you walk'.
Change sentence structure.
Do NOT invent facts or dates.

CONTENT:
{base_content}
"""

        

        story_text = generate_with_ollama(user_prompt)
        fallback = False

    except Exception as e:
        print("OLLAMA ERROR:", str(e))
        story_text = base_content
        fallback = True

    return {
        "story": story_text,
        "confidence": 0.9,
        "sources": ["ASI", "Community Archive"],
        "mode": req.mode,
        "fallback": fallback
    }
