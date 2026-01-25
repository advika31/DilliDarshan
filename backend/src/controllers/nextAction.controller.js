const osmService = require("../services/osm.service");
const weatherService = require("../services/weather.service");
const crowdService = require("../services/crowd.service");
const distanceUtil = require("../utils/distance.util");
const { getWikipediaInfo, getFamousDelhiPlaces } = require("../services/wikipedia.service");
const { getDelhiHeritagePlaces } = require("../services/delhiHeritage.service");

const getNextAction = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude required" });
  }

  try {
    // Get curated Delhi heritage places
    const heritagePlaces = await getDelhiHeritagePlaces(lat, lon);
    console.log(`Found ${heritagePlaces.length} heritage places from Delhi list`);

    // For now, just use heritage places
    const allPlaces = heritagePlaces;

    if (allPlaces.length === 0) {
      return res.json({
        weather: { condition: "CLEAR", crowd: "LOW" },
        recommendations: []
      });
    }

    console.log('Processing places...');
    const weather = await weatherService.getWeather(lat, lon);
    const crowdLevel = crowdService.getCrowdLevel();
    const weatherCondition = weatherService.classifyWeather(weather);

    console.log('Enhancing places...');
    const enhancedPlaces = allPlaces.map((place, index) => {
      // Calculate distance from user location
      const distance = distanceUtil.getDistanceInKm(
        lat,
        lon,
        place.lat,
        place.lon
      );

      return {
        ...place,
        distance: distance,
        wikipediaInfo: null,
        isFamous: place.category === 'Heritage'
      };
    });

    console.log('Scoring places...');
    const scoredPlaces = enhancedPlaces.map((place) => {
      let distanceScore = place.distance <= 1 ? 40 : place.distance <= 3 ? 25 : 10;
      let crowdScore = crowdLevel === "LOW" ? 30 : crowdLevel === "MEDIUM" ? 20 : 10;
      let weatherScore = weatherCondition === "CLEAR" ? 30 : weatherCondition === "CLOUDY" ? 20 : 10;
      let fameBonus = place.isFamous ? 20 : 0;
      let heritageBonus = place.category === 'Heritage' ? 15 : 0;

      const totalScore = distanceScore + crowdScore + weatherScore + fameBonus + heritageBonus;

      return {
        name: place.tags.name,
        lat: place.lat,
        lon: place.lon,
        distance: place.distance,
        totalScore,
        tags: place.tags,
        isFamous: place.isFamous,
        wikipediaInfo: place.wikipediaInfo,
        category: place.category || 'Tourist Spot'
      };
    });

    scoredPlaces.sort((a, b) => b.totalScore - a.totalScore);
    const topPlaces = scoredPlaces.slice(0, 4);

    console.log('Sending response...');
    res.json({
      weather: {
        condition: weatherCondition,
        crowd: crowdLevel
      },
      recommendations: topPlaces.map(place => ({
        name: place.name,
        lat: place.lat,
        lon: place.lon,
        distance_km: place.distance.toFixed(2),
        score: place.totalScore,
        tags: place.tags,
        isFamous: place.isFamous,
        wikipediaInfo: place.wikipediaInfo,
        reason: `${place.distance <= 1 ? 'Very close' : place.distance <= 3 ? 'Nearby' : 'Worth visiting'}, ${crowdLevel.toLowerCase()} crowd, ${weatherCondition.toLowerCase()} weather${place.isFamous ? ', Famous landmark' : ''}${place.category === 'Heritage' ? ', Heritage site' : ''}`
      }))
    });
  } catch (err) {
    console.error("Recommendation Error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
};

module.exports = { getNextAction };
