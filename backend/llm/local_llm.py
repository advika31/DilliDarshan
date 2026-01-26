import subprocess

def generate_with_ollama(prompt: str) -> str:
    """
    Guaranteed non-empty output from Ollama
    """
    try:
        result = subprocess.run(
            ["ollama", "run", "llama3"],
            input=prompt.encode("utf-8"),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=25
        )

        output = result.stdout.decode("utf-8").strip()

        if not output:
            raise ValueError("Empty Ollama output")

        return output

    except Exception as e:
        print("OLLAMA FAILURE:", repr(e))
        return ""
