# backend/tts/multilingual_tts.py
import os
import uuid
from gtts import gTTS

AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

LANG_MAP = {
    "English": "en",
    "Hindi": "hi",
    "Tamil": "ta",
    "Marathi": "mr"
}

def generate_multilingual_audio(text: str, language: str) -> str:
    lang = LANG_MAP.get(language)
    if not lang:
        raise ValueError("Unsupported language")

    filename = f"{uuid.uuid4()}.mp3"
    path = os.path.join(AUDIO_DIR, filename)

    gTTS(text=text, lang=lang).save(path)
    return f"static/audio/{filename}"
