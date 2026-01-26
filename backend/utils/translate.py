from deep_translator import GoogleTranslator

def translate(text: str, target: str) -> str:
    return GoogleTranslator(source="en", target=target).translate(text)