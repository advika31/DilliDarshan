import os
import uuid
from gtts import gTTS

AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

LANG_MAP = {
    "Hindi": "hi",
    "Tamil": "ta",
    "Marathi": "mr",
}

def generate_multilingual_audio(text: str, language: str) -> str:
    lang_code = LANG_MAP.get(language)
    if not lang_code:
        raise ValueError("Unsupported language")

    filename = f"{uuid.uuid4()}.mp3"
    path = os.path.join(AUDIO_DIR, filename)

    tts = gTTS(text=text, lang=lang_code)
    tts.save(path)

    return path
