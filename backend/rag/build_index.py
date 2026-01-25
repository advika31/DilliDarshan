# backend/rag/build_index.py
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("rag/metadata.json") as f:
    metadata = json.load(f)

texts = [item["content"] for item in metadata]
embeddings = model.encode(texts, convert_to_numpy=True)

dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

faiss.write_index(index, "rag/monuments.index")

print("✅ FAISS index rebuilt with dim:", dim)
