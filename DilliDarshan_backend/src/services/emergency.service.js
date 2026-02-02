import { fetchLiveOSM } from "./osm.service.js";
import EmergencyPlace from "../models/EmergencyPlace.js";
// const dedupe = (arr) => {
//   const map = new Map();
//   arr.forEach(p => {
//     const key = p.name.toLowerCase();
//     if (!map.has(key)) map.set(key, p);
//   });
//   return [...map.values()];
// };

// export const findNearbyHybrid = async ({ lat, lng, type, radius = 3000 }) => {

//   // ✅ 1 — DB cached
//   const dbResults = await EmergencyPlace.find({
//     type,
//     location: {
//       $near: {
//         $geometry: {
//           type: "Point",
//           coordinates: [lng, lat]
//         },
//         $maxDistance: radius
//       }
//     }
//   }).limit(5).lean();

//   // convert db format → common format
//   const dbFormatted = dbResults.map(d => ({
//     name: d.name,
//     type: d.type,
//     lat: d.location.coordinates[1],
//     lng: d.location.coordinates[0],
//     source: "db"
//   }));

//   // ✅ 2 — live OSM
//   let live = [];
//   try {
//     live = await fetchLiveOSM(lat, lng, radius, type);
//   } catch (e) {
//     console.log("OSM fetch failed — fallback to DB only");
//   }

//   // ✅ 3 — merge
//   const merged = dedupe([...dbFormatted, ...live]);

//   return merged.slice(0, 8);
// };



export const findNearbyHybrid = async ({ lat, lng, type, radius = 3000 }) => {

  

  const live = await fetchLiveOSM(lat, lng, radius, type);

  return live.slice(0, 10);
};