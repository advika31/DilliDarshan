# backend/utils/translate.py
from deep_translator import GoogleTranslator

def translate(text: str, target_lang: str) -> str:
    return GoogleTranslator(source="en", target=target_lang).translate(text)
