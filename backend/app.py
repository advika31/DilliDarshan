import json
import faiss
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.staticfiles import StaticFiles

from llm.local_llm import generate_with_ollama
from tts.generate_audio import generate_audio
from utils.translate import translate_to_hindi, to_hinglish

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("rag/monuments.index")

with open("rag/metadata.json") as f:
    METADATA = json.load(f)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

class StoryRequest(BaseModel):
    placeId: str
    placeName: str
    mode: str
    language: str

class VoiceRequest(BaseModel):
    story: str

@app.post("/story/generate")
def generate_story(req: StoryRequest):
    query = f"{req.placeName} monument history Delhi"
    query_embedding = model.encode([query])
    
    _, I = index.search(np.array(query_embedding), k=1)

    base_content = METADATA[I[0][0]]["content"]

    prompt = f"""
You are a Delhi heritage storyteller.
Rewrite the following content into a {req.mode} story.
Use ONLY given facts.

CONTENT:
{base_content}
"""

    story_en = generate_with_ollama(prompt).strip()

    if not story_en:
        raise HTTPException(500, "LLM returned empty story")
    
    if req.language == "Hindi":
        final_story = translate_to_hindi(story_en)
    elif req.language == "Hinglish":
        final_story = to_hinglish(story_en)
    else:
        final_story = story_en

    return {
        "story": final_story,
        "language": req.language
    }

@app.post("/story/voice")
def generate_voice(req: VoiceRequest):
    text = req.story.strip()
    if not text:
        raise HTTPException(400, "Empty story text")

    audio_path = generate_audio(text)
    return {"audio_url": audio_path}
