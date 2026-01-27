import os, json, faiss, numpy as np, uuid
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.staticfiles import StaticFiles

from llm.local_llm import generate_with_ollama
from utils.translate import translate
from tts.multilingual_tts import generate_multilingual_audio

MODEL = SentenceTransformer("all-MiniLM-L6-v2")
# INDEX = faiss.read_index("rag/monuments.index")

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
    results = [c["content"] for c in CHUNKS if c["id"] == placeId]
    return results[:k]


@app.post("/story/generate")
def generate_story(req: StoryRequest):
    chunks = retrieve_chunks(req.placeId)

    if not chunks:
        print(f"Warning: No chunks found for placeId {req.placeId}")
        context = "Historic monument in Delhi."
    else:
        context = "\n".join(chunks)

    if req.mode == "factual":
        prompt = f"""
You are a professional historian for Delhi Tourism.
Summarize the significance of this location clearly and engagingly.

GUIDELINES:
1. Focus on the most important dates, builders, and architectural styles.
2. Mention 1-2 unique or "did you know" style facts that make this place special.
3. Keep the tone objective but not boring. Avoid dry lists.
4. Structure it logically: Origins -> Architecture -> Modern significance.
5. Keep it under 150 words.

CONTENT TO ADAPT:
{context}
"""
    else:
        prompt = f"""
You are a charismatic local storyteller in Delhi.
Your goal is to transport the listener to this place through words.

STORYTELLING RULES:
1. Start with a hook that grabs attention immediately.
2. Use sensory details (the cool breeze, the rough stone, the echo of the past, the noise of the city fading away).
3. Use Second-Person ("You") to put the user directly in the scene.
4. Weave the history into a narrative—don't just list facts. Make the emperors, artisans, and commoners feel alive.
5. End with a thought-provoking sentiment or an invitation to explore a specific detail closer.
6. Keep it under 200 words.

CONTENT TO ADAPT:
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
    audio_dir = "static/audio"
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)

    try:
        for filename in os.listdir(audio_dir):
            if filename.startswith(req.cache_key):
                file_path = os.path.join(audio_dir, filename)
                try:
                    os.remove(file_path)
                except Exception as e:
                    print(f"Error removing old file {filename}: {e}")
    except Exception as e:
        print(f"Error accessing directory: {e}")

    unique_suffix = str(uuid.uuid4())[:8]
    filename = f"{req.cache_key}_{unique_suffix}.mp3"
    audio_path = f"{audio_dir}/{filename}"

    temp = generate_multilingual_audio(req.story, req.language)
    
    os.rename(temp, audio_path)

    return {"audio_url": audio_path}