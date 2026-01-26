# backend/llm/local_llm.py
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"

def generate_with_ollama(prompt: str) -> str:
    try:
        payload = {
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.4,
                "num_predict": 220
            }
        }

        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=40
        )

        response.raise_for_status()
        data = response.json()

        output = data.get("response", "").strip()
        return output if output else ""

    except Exception as e:
        print("⚠️ OLLAMA HTTP FAILURE:", repr(e))
        return ""
