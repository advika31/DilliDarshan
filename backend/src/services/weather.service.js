const axios = require("axios");

const getWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const response = await axios.get(url);

  const current = response.data.current_weather;

  return {
    temperature: current.temperature,
    windspeed: current.windspeed,
    weathercode: current.weathercode
  };
};

const classifyWeather = (weather) => {
  const { temperature, weathercode } = weather;

  if (weathercode >= 61 && weathercode <= 67) {
    return "RAINY";
  }

  if (temperature >= 38) {
    return "VERY_HOT";
  }

  return "PLEASANT";
};

module.exports = { getWeather, classifyWeather };
