const fs = require('fs');
const path = require('path');

const getDelhiHeritagePlaces = async (lat, lon) => {
  try {
    const csvPath = path.join(__dirname, '../../places_delhi_filled.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');

    const lines = csvData.split('\n');
    const places = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [id, name, category, latitude, longitude] = line.split(',');

      if (latitude && longitude && latitude !== '' && longitude !== '') {
        places.push({
          id: parseInt(id),
          name: name.replace(/"/g, ''),
          category: category.replace(/"/g, ''),
          lat: parseFloat(latitude),
          lon: parseFloat(longitude),
          tags: {
            name: name.replace(/"/g, ''),
            tourism: 'attraction',
            historic: 'monument',
            category: category.replace(/"/g, '')
          }
        });
      }
    }

    return places;
  } catch (error) {
    console.error('Error reading Delhi heritage places:', error);
    return [];
  }
};

module.exports = { getDelhiHeritagePlaces };
