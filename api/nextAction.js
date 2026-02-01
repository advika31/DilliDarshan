const API_BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.56:5001'
  : 'https://your-production-api.com';

export async function getNextAction(lat, lon) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `${API_BASE_URL}/api/next-action?lat=${lat}&lon=${lon}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('API unavailable, using fallback:', error.message);

    // Return fallback data when API is unavailable
    return getFallbackRecommendations(lat, lon);
  }
}

function getFallbackRecommendations(lat, lon) {
  // Fallback Delhi heritage places when backend is unavailable
  const fallbackPlaces = [
    {
      name: 'Red Fort',
      lat: 28.6562,
      lon: 77.2410,
      distance_km: '2.5',
      score: 85,
      reason: 'Historic Mughal monument, must visit',
      category: 'Heritage'
    },
    {
      name: 'India Gate',
      lat: 28.6129,
      lon: 77.2295,
      distance_km: '3.1',
      score: 80,
      reason: 'Iconic war memorial, great for photos',
      category: 'History'
    },
    {
      name: 'Qutub Minar',
      lat: 28.5245,
      lon: 77.1855,
      distance_km: '15.2',
      score: 75,
      reason: 'UNESCO World Heritage site',
      category: 'Heritage'
    },
    {
      name: 'Lotus Temple',
      lat: 28.5535,
      lon: 77.2588,
      distance_km: '8.7',
      score: 70,
      reason: 'Beautiful architecture, peaceful atmosphere',
      category: 'Culture'
    }
  ];

  return {
    weather: {
      condition: 'CLEAR',
      crowd: 'MEDIUM'
    },
    recommendations: fallbackPlaces
  };
}
