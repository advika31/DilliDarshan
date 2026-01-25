from deep_translator import GoogleTranslator

def translate_to_hindi(text: str) -> str:
    return GoogleTranslator(source="en", target="hi").translate(text)

def to_hinglish(text: str) -> str:
    hindi = GoogleTranslator(source="en", target="hi").translate(text)
    
    return GoogleTranslator(source="hi", target="en").translate(hindi)
