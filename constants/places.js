// constants/places.js

export const PLACES = [
  {
    id: '1',
    name: 'Humayun\'s Tomb',
    image: 'https://whc.unesco.org/uploads/thumbs/site_0232_0005-400-400-20210425155601.webp', 
    culturalHook: 'The garden tomb that inspired the Taj Mahal',
    crowdLevel: 'low',
    category: 'Heritage',
    distance: '1.2 km',
    bestTimeToVisit: 'Early morning (7-9 AM)',
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: '₹30 (Indians), ₹500 (Foreigners)',
    nearestMetro: 'JLN Stadium (Violet Line)',
    walkingDistance: '15 minutes',
    transportTips: 'Auto-rickshaw available (₹30-40)',
    toilets: 'paid',
    accessibilityNotes: 'Wheelchair accessible pathways',
    seating: true,
    shade: true,
  },
  {
    id: '2',
    name: 'Qutub Minar',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbKdCaNXy2CeHmgEveocnJdKutiXWI3G3KBA&s',
    culturalHook: 'Delhi\'s tallest minaret, a UNESCO World Heritage Site',
    crowdLevel: 'medium',
    category: 'History',
    distance: '4.5 km',
    bestTimeToVisit: 'Morning (9-11 AM)',
    openingHours: '7:00 AM - 5:00 PM',
    entryFee: '₹35 (Indians), ₹550 (Foreigners)',
    nearestMetro: 'Qutub Minar (Yellow Line)',
    walkingDistance: '10 minutes',
    transportTips: 'E-rickshaw available (₹20)',
    toilets: 'paid',
    accessibilityNotes: 'Limited wheelchair access',
    seating: true,
    shade: true,
  },
  {
    id: '3',
    name: 'Connaught Place',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMhF6gu0jSRbNROGrQStvBNyDA_fNQtC8ADA&s',
    culturalHook: 'Colonial architecture meets modern commerce',
    crowdLevel: 'high',
    category: 'Market',
    distance: '0.8 km',
    bestTimeToVisit: 'Evening (5-9 PM)',
    openingHours: '10:00 AM - 10:00 PM',
    entryFee: 'Free',
    nearestMetro: 'Rajiv Chowk (Blue & Yellow Line)',
    walkingDistance: '2 minutes',
    transportTips: 'Direct metro connection',
    toilets: 'paid',
    accessibilityNotes: 'Elevators available in metro station',
    seating: true,
    shade: true,
  },
  {
    id: '4',
    name: 'Red Fort',
    image: 'data:image/jpeg;base64,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',
    culturalHook: 'The seat of Mughal power',
    crowdLevel: 'high',
    category: 'Heritage',
    distance: '3.3 km',
    bestTimeToVisit: 'Morning (9-11 AM)',
    openingHours: '9:30 AM - 6:00 PM (Closed Mondays)',
    entryFee: '₹35 (Indians), ₹550 (Foreigners)',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    walkingDistance: '20 minutes',
    transportTips: 'Auto-rickshaw recommended (₹40-60)',
    toilets: 'paid',
    accessibilityNotes: 'Wheelchair accessible',
    seating: true,
    shade: true,
  },
  {
    id: '5',
    name: 'Lotus Temple',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKWPHZYlcvLMSbgZIL7Ano9sHuYC_6hHe_w&s',
    culturalHook: 'A place of peace and architectural marvel',
    crowdLevel: 'medium',
    category: 'Culture',
    distance: '6.1 km',
    bestTimeToVisit: 'Morning (9-11 AM)',
    openingHours: '9:00 AM - 7:00 PM (Closed Mondays)',
    entryFee: 'Free',
    nearestMetro: 'Kalkaji Mandir (Magenta Line)',
    walkingDistance: '10 minutes',
    transportTips: 'E-rickshaw available (₹25)',
    toilets: 'public',
    accessibilityNotes: 'Fully wheelchair accessible',
    seating: true,
    shade: true,
  }
];

export const getPlaceById = (id) => {
  return PLACES.find(place => place.id === id);
};

export const getNearbyPlaces = (currentPlaceId, limit = 3) => {
  const currentIndex = PLACES.findIndex(p => p.id === currentPlaceId);
  if (currentIndex === -1) return PLACES.slice(0, limit);
  
  const nearby = [];
  const visited = new Set([currentPlaceId]);
  
  for (let i = 0; i < PLACES.length && nearby.length < limit; i++) {
    const idx = (currentIndex + i) % PLACES.length;
    if (!visited.has(PLACES[idx].id)) {
      nearby.push(PLACES[idx]);
      visited.add(PLACES[idx].id);
    }
  }
  
  return nearby;
};