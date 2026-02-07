# backend/rag/build_index.py
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

MODEL = SentenceTransformer("all-MiniLM-L6-v2")

with open("data/monuments.json", encoding="utf-8") as f:
    monuments = json.load(f)

texts = []
chunk_meta = []

for monument in monuments:
    texts.append(monument["content"])
    chunk_meta.append({
        "id": monument["id"],
        "name": monument["name"],
        "content": monument["content"]
    })

embeddings = MODEL.encode(texts, convert_to_numpy=True)

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

faiss.write_index(index, "rag/monuments.index")

with open("rag/chunk_meta.json", "w", encoding="utf-8") as f:
    json.dump(chunk_meta, f, ensure_ascii=False, indent=2)

print(f"✅ Indexed {len(texts)} monuments correctly")
