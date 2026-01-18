# rag/index_faiss.py
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("data/monuments.json") as f:
    docs = json.load(f)

texts = [d["content"] for d in docs]
embeddings = model.encode(texts)

index = faiss.IndexFlatL2(len(embeddings[0]))
index.add(np.array(embeddings))

faiss.write_index(index, "rag/monuments.index")

with open("rag/metadata.json", "w") as f:
    json.dump(docs, f)
