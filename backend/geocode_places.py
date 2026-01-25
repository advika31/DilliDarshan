import pandas as pd
from geopy.geocoders import Nominatim
from time import sleep
from tqdm import tqdm

# Load CSV
df = pd.read_csv("places.csv")

# Initialize Nominatim
geolocator = Nominatim(user_agent="delhi-tourism-app")

latitudes = []
longitudes = []

for place in tqdm(df["name"]):
    try:
        location = geolocator.geocode(f"{place}, Delhi, India")
        if location:
            latitudes.append(location.latitude)
            longitudes.append(location.longitude)
        else:
            latitudes.append(None)
            longitudes.append(None)
        sleep(1)  # IMPORTANT: rate limit
    except:
        latitudes.append(None)
        longitudes.append(None)

df["latitude"] = latitudes
df["longitude"] = longitudes

# Save final file
df.to_csv("places.csv", index=False)

print("Geocoding complete")
