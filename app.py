from fastapi import FastAPI
import uvicorn
import os
import math
import requests
from pydantic import BaseModel

app = FastAPI()

class EmergencyRequest(BaseModel):
    lat: float
    lng: float

class StoryRequest(BaseModel):
    placeId: str
    mode: str       
    language: str

@app.get("/")
def read_root():
    return {"message": "DilliDarshan Backend is running!", "status": "active"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

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

@app.post("/storytelling/get")
def get_story(data: StoryRequest):
    stories = {
        "english": "Delhi, the capital of India, has a rich history spanning over 1000 years. From the Mughal era to British rule, each dynasty left its mark on this vibrant city.",
        "hindi": "दिल्ली, भारत की राजधानी, का इतिहास 1000 से अधिक वर्षों पुराना है। मुगलकाल से लेकर ब्रिटिश शासन तक, प्रत्येक राजवंश ने इस जीवंत शहर पर अपनी छाप छोड़ी है।"
    }
    
    language = data.language if data.language in stories else "english"
    
    return {
        "story": stories[language],
        "placeId": data.placeId,
        "language": language,
        "duration": "2-3 minutes"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
