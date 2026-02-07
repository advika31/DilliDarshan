import os, json, faiss, numpy as np, uuid, math, requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from fastapi.staticfiles import StaticFiles

from llm.local_llm import generate_with_ollama
from utils.translate import translate
from tts.multilingual_tts import generate_multilingual_audio

MODEL = SentenceTransformer("all-MiniLM-L6-v2")
# INDEX = faiss.read_index("rag/monuments.index")

with open("rag/chunk_meta.json", encoding="utf-8") as f:
    CHUNKS = json.load(f)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

class StoryRequest(BaseModel):
    placeId: str
    mode: str       
    language: str

class VoiceRequest(BaseModel):
    story: str
    language: str
    cache_key: str

class EmergencyRequest(BaseModel):
    lat: float
    lng: float


def retrieve_chunks(placeId: str, k=4):
    results = [c["content"] for c in CHUNKS if c["id"] == placeId]
    return results[:k]


@app.post("/story/generate")
def generate_story(req: StoryRequest):
    chunks = retrieve_chunks(req.placeId)

    if not chunks:
        print(f"Warning: No chunks found for placeId {req.placeId}")
        context = "Historic monument in Delhi."
    else:
        context = "\n".join(chunks)

    if req.mode == "factual":
        prompt = f"""
You are a professional historian for Delhi Tourism.
Summarize the significance of this location clearly and engagingly.

GUIDELINES:
1. Focus on the most important dates, builders, and architectural styles.
2. Mention 1-2 unique or "did you know" style facts that make this place special.
3. Keep the tone objective but not boring. Avoid dry lists.
4. Structure it logically: Origins -> Architecture -> Modern significance.
5. Keep it under 150 words.

CONTENT TO ADAPT:
{context}
"""
    else:
        prompt = f"""
You are a charismatic local storyteller in Delhi.
Your goal is to transport the listener to this place through words.

STORYTELLING RULES:
1. Start with a hook that grabs attention immediately.
2. Use sensory details (the cool breeze, the rough stone, the echo of the past, the noise of the city fading away).
3. Use Second-Person ("You") to put the user directly in the scene.
4. Weave the history into a narrative—don't just list facts. Make the emperors, artisans, and commoners feel alive.
5. End with a thought-provoking sentiment or an invitation to explore a specific detail closer.
6. Keep it under 200 words.

CONTENT TO ADAPT:
{context}
"""

    story_en = generate_with_ollama(prompt).strip()

    if not story_en:
        print("⚠️ Ollama failed, using structured fallback")
        story_en = context

    if req.language != "English":
        lang_map = {"Hindi": "hi", "Tamil": "ta", "Marathi": "mr"}
        story = translate(story_en, lang_map[req.language])
    else:
        story = story_en

    return {"story": story}


@app.post("/story/voice")
def generate_voice(req: VoiceRequest):
    audio_dir = "static/audio"
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)

    try:
        for filename in os.listdir(audio_dir):
            if filename.startswith(req.cache_key):
                file_path = os.path.join(audio_dir, filename)
                try:
                    os.remove(file_path)
                except Exception as e:
                    print(f"Error removing old file {filename}: {e}")
    except Exception as e:
        print(f"Error accessing directory: {e}")

    unique_suffix = str(uuid.uuid4())[:8]
    filename = f"{req.cache_key}_{unique_suffix}.mp3"
    audio_path = f"{audio_dir}/{filename}"

    temp = generate_multilingual_audio(req.story, req.language)
    
    os.rename(temp, audio_path)

    return {"audio_url": audio_path}


@app.post("/emergency/nearby")
def get_nearby_emergency_services(req: EmergencyRequest):
    """
    Get nearby emergency services (hospitals, police stations) for given coordinates.
    Uses OpenStreetMap Overpass API for real-time data with proper distance calculation.
    """
    lat, lng = req.lat, req.lng
    
    # Define bounding box (approximately 20km radius for better coverage)
    radius = 0.2  # Roughly 20km
    bbox = f"{lat-radius},{lng-radius},{lat+radius},{lng+radius}"
    
    # Query for hospitals and police stations
    overpass_query = f"""
    [out:json][timeout:25];
    (
      node["amenity"="hospital"]({bbox});
      node["amenity"="police"]({bbox});
      way["amenity"="hospital"]({bbox});
      way["amenity"="police"]({bbox});
      relation["amenity"="hospital"]({bbox});
      relation["amenity"="police"]({bbox});
    );
    out geom;
    """
    
    try:
        # Call OpenStreetMap Overpass API
        response = requests.post(
            "https://overpass-api.de/api/interpreter",
            data=overpass_query,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            services = []
            
            for element in data.get("elements", []):
                if element.get("type") == "node":
                    tags = element.get("tags", {})
                    name = tags.get("name", "Unknown")
                    amenity = tags.get("amenity", "")
                    
                    if amenity in ["hospital", "police"]:
                        service_lat = element.get("lat")
                        service_lng = element.get("lon")
                        
                        # Calculate actual distance using Haversine formula
                        distance_km = calculate_distance(lat, lng, service_lat, service_lng)
                        
                        services.append({
                            "lat": service_lat,
                            "lng": service_lng,
                            "name": name,
                            "source": "osm",
                            "type": amenity,
                            "distance_km": round(distance_km, 2)
                        })
            
            # Sort by distance and return nearest 10
            services.sort(key=lambda x: x["distance_km"])
            
            # If no real-time data found, fall back to mock
            if not services:
                return get_mock_emergency_services(lat, lng)
            
            return {"results": services[:10]}  # Return 10 nearest services
            
        else:
            # API call failed, use mock data
            return get_mock_emergency_services(lat, lng)
            
    except Exception as e:
        print(f"Error fetching real-time emergency services: {e}")
        # Fallback to mock data
        return get_mock_emergency_services(lat, lng)


def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two coordinates using Haversine formula."""
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_lat/2)**2 + 
         math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c


def get_mock_emergency_services(lat, lng):
    """Fallback mock emergency services data for Delhi area."""
    mock_services = [
        {"lat": 28.6139, "lng": 77.2090, "name": "AIIMS Delhi", "source": "mock", "type": "hospital"},
        {"lat": 28.6396, "lng": 77.2735, "name": "Safdarjung Hospital", "source": "mock", "type": "hospital"},
        {"lat": 28.6333, "lng": 77.2174, "name": "LNJP Hospital", "source": "mock", "type": "hospital"},
        {"lat": 28.6494703, "lng": 77.2265741, "name": "Delhi Police Headquarters", "source": "mock", "type": "police"},
        {"lat": 28.6890673, "lng": 77.2215343, "name": "Civil Lines Police Station", "source": "mock", "type": "police"},
        {"lat": 28.6448, "lng": 77.2167, "name": "Kashmir Gate Police Station", "source": "mock", "type": "police"},
    ]
    
    # Calculate distances and filter within 20km
    nearby_services = []
    for service in mock_services:
        distance_km = calculate_distance(lat, lng, service["lat"], service["lng"])
        if distance_km <= 20:  # Within 20km
            service_with_distance = service.copy()
            service_with_distance["distance_km"] = round(distance_km, 2)
            nearby_services.append(service_with_distance)
    
    # Sort by distance
    nearby_services.sort(key=lambda x: x["distance_km"])
    
    return {"results": nearby_services}