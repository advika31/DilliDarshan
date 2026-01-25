import os
import uuid
from TTS.api import TTS

tts_en = TTS(
    model_name="tts_models/en/ljspeech/fast_pitch",
    progress_bar=False,
    gpu=False
)

AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def generate_english_audio(text: str) -> str:
    filename = f"{uuid.uuid4()}.wav"
    path = os.path.join(AUDIO_DIR, filename)

    tts_en.tts_to_file(text=text, file_path=path)
    return path
