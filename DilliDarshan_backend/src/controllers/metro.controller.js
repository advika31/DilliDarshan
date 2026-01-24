import { getPlaceCoordinates } from "../services/maps.service.js";
import { findNearestMetro } from "../services/metro.service.js";

export const getNearestMetro = async (req, res) => {
  const { placeName } = req.query;

  try {
    const placeCoords = await getPlaceCoordinates(placeName);
    const metro = await findNearestMetro(placeCoords);

    res.json({
      place: placeName,
      nearestMetro: {
        station: metro.name,
        line: metro.line,
        exitGate: metro.exits[0],
        walkingTime: metro.walkingTime
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
