import os, json, faiss, numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.staticfiles import StaticFiles

from llm.local_llm import generate_with_ollama
from utils.translate import translate
from tts.multilingual_tts import generate_multilingual_audio

MODEL = SentenceTransformer("all-MiniLM-L6-v2")
INDEX = faiss.read_index("rag/monuments.index")

with open("rag/chunk_meta.json", encoding="utf-8") as f:
    CHUNKS = json.load(f)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

class StoryRequest(BaseModel):
    placeId: str
    mode: str       
    language: str

class VoiceRequest(BaseModel):
    story: str
    language: str
    cache_key: str


def retrieve_chunks(placeId: str, k=4):
    results = [c["text"] for c in CHUNKS if c["placeId"] == placeId]
    return results[:k]


@app.post("/story/generate")
def generate_story(req: StoryRequest):
    chunks = retrieve_chunks(req.placeId)

    if not chunks:
        raise HTTPException(404, "No content found for place")

    context = "\n".join(chunks)

    if req.mode == "factual":
        prompt = f"""
You are an official Delhi Tourism historian.

Rewrite the content below into a clear, factual, third-person description.
Maintain accuracy.
No imagination.
No added facts.
~140 words.

CONTENT:
{context}
"""
    else:
        prompt = f"""
You are a Delhi walking-tour narrator.

Using ONLY the content below, create an immersive visitor experience.
Second-person narration.
Smooth transitions.
Do NOT add facts, dates, or names.
~200 words.

CONTENT:
{context}
"""

    story_en = generate_with_ollama(prompt).strip()

    if not story_en:
        print("⚠️ Ollama failed, using structured fallback")
        story_en = context

    if req.language != "English":
        lang_map = {"Hindi": "hi", "Tamil": "ta", "Marathi": "mr"}
        story = translate(story_en, lang_map[req.language])
    else:
        story = story_en

    return {"story": story}


@app.post("/story/voice")
def generate_voice(req: VoiceRequest):
    audio_path = f"static/audio/{req.cache_key}.mp3"

    if os.path.exists(audio_path):
        return {"audio_url": audio_path}

    temp = generate_multilingual_audio(req.story, req.language)
    os.rename(temp, audio_path)

    return {"audio_url": audio_path}
