# /backend/llm/local_llm.py
import subprocess
import shutil

def generate_with_ollama(prompt: str) -> str:
    ollama_path = shutil.which("ollama")

    if not ollama_path:
        raise RuntimeError("Ollama not found in PATH")

    result = subprocess.run(
        [ollama_path, "run", "mistral"],
        input=prompt,
        capture_output=True,
        text=True,
        shell=False,
        encoding='utf-8',
        errors="ignore"
    )

    return result.stdout.strip()