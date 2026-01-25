const axios = require("axios");

const getWikipediaInfo = async (placeName) => {
  try {
    // Search for the place
    const searchResponse = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`
    );

    if (searchResponse.data && searchResponse.data.extract) {
      return {
        description: searchResponse.data.extract,
        url: searchResponse.data.content_urls?.desktop?.page,
        image: searchResponse.data.thumbnail?.source,
        notable: true
      };
    }
  } catch (error) {
    // Try alternative search
    try {
      const searchResponse = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/encyclopedia/search?q=${encodeURIComponent(placeName)}&limit=1`
      );

      if (searchResponse.data.pages && searchResponse.data.pages.length > 0) {
        const page = searchResponse.data.pages[0];
        return {
          description: page.description,
          url: page.content_urls?.desktop?.page,
          image: page.thumbnail?.source,
          notable: true
        };
      }
    } catch (altError) {
      console.log(`No Wikipedia info found for ${placeName}`);
    }
  }

  return null;
};

const getFamousDelhiPlaces = async () => {
  // List of famous Delhi landmarks that should always be included if nearby
  const famousDelhiPlaces = [
    "India Gate",
    "Red Fort",
    "Qutub Minar",
    "Humayun's Tomb",
    "Lotus Temple",
    "Akshardham",
    "Jama Masjid",
    "Rashtrapati Bhavan",
    "Parliament House",
    "Gurudwara Bangla Sahib",
    "ISKCON Temple",
    "National Museum",
    "National Gallery of Modern Art",
    "India Habitat Centre",
    "Connaught Place",
    "Chandni Chowk",
    "Hauz Khas Village",
    "Lodhi Gardens",
    "Garden of Five Senses",
    "Dilli Haat",
    "Safdarjung Tomb",
    "Jantar Mantar",
    "Purana Qila",
    "Tughlaqabad Fort",
    "Feroz Shah Kotla",
    "Agrasen ki Baoli",
    "National Zoological Park"
  ];

  return famousDelhiPlaces;
};

module.exports = {
  getWikipediaInfo,
  getFamousDelhiPlaces
};
