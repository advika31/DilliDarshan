import os
import json
import faiss
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.staticfiles import StaticFiles

from llm.local_llm import generate_with_ollama
from tts.multilingual_tts import generate_multilingual_audio
from utils.translate import translate

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("rag/monuments.index")

with open("rag/metadata.json", encoding="utf-8") as f:
    METADATA = json.load(f)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

class StoryRequest(BaseModel):
    placeId: str
    placeName: str
    mode: str
    language: str

class VoiceRequest(BaseModel):
    story: str
    language: str
    cache_key: str

@app.post("/story/generate")
def generate_story(req: StoryRequest):
    print("STORY REQUEST:", req)

    query = f"{req.placeName} monument Delhi"
    embedding = model.encode([query])

    _, I = index.search(np.array(embedding), k=1)
    idx = int(I[0][0])

    base_content = METADATA[idx]["content"]

    prompt = (
        f"Write a {req.mode} tour description.\n"
        f"Limit to 80 words.\n"
        f"Facts only.\n\n"
        f"{base_content}"
    )

    story_en = generate_with_ollama(prompt)

    if not story_en.strip():
        print("Using fallback content")
        story_en = base_content[:500]

    if req.language == "English":
        final_story = story_en
    elif req.language == "Hindi":
        final_story = translate(story_en, "hi")
    elif req.language == "Tamil":
        final_story = translate(story_en, "ta")
    elif req.language == "Marathi":
        final_story = translate(story_en, "mr")
    else:
        final_story = story_en

    return {"story": final_story}


@app.post("/story/voice")
def generate_voice(req: VoiceRequest):
    if not req.story.strip():
        raise HTTPException(422, "Empty story")

    filename = f"{req.cache_key}.mp3"
    path = os.path.join(AUDIO_DIR, filename)

    if os.path.exists(path):
        return {"audio_url": f"static/audio/{filename}"}

    temp_audio = generate_multilingual_audio(req.story, req.language)
    os.rename(temp_audio, path)

    return {"audio_url": f"static/audio/{filename}"}
