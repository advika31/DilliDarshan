# # /backend/tts/generate_audio.py
# from TTS.api import TTS
# import uuid
# import os

# tts = TTS(
#     model_name="tts_models/en/ljspeech/fast_pitch",
#     progress_bar=False,
#     gpu=False
# )

# AUDIO_DIR = "static/audio"
# os.makedirs(AUDIO_DIR, exist_ok=True)

# def generate_audio(text: str):
#     filename = f"{uuid.uuid4()}.wav"
#     path = os.path.join(AUDIO_DIR, filename)

#     tts.tts_to_file(text=text, file_path=path)
#     return f"static/audio/{filename}"