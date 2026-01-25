import os
import uuid
from gtts import gTTS

AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def generate_multilingual_audio(text: str, language: str) -> str:
    filename = f"{uuid.uuid4()}.mp3"
    path = os.path.join(AUDIO_DIR, filename)

    if language == "Hindi":
        tts = gTTS(text=text, lang="hi")
    elif language == "Hinglish":
        tts = gTTS(text=text, lang="en")
    else:
        tts = gTTS(text=text, lang="en")

    tts.save(path)
    return path
