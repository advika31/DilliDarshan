export const PLACES = [
  {
    id: '1',
    name: 'India Gate',
    culturalHook: 'A symbol of sacrifice and national pride',
    crowdLevel: 'high',
    bestTimeToVisit: 'Early morning (6-8 AM) or evening (6-8 PM)',
    openingHours: 'Open 24 hours',
    entryFee: 'Free',
    nearestMetro: 'Central Secretariat (Yellow Line)',
    walkingDistance: '15 minutes',
    transportTips: 'Auto-rickshaw available from metro station (₹30-50)',
    toilets: 'public',
    accessibilityNotes: 'Wheelchair accessible pathways available',
    seating: true,
    shade: false,
  },
  {
    id: '2',
    name: 'Qutub Minar',
    culturalHook: 'Delhi\'s tallest minaret, a UNESCO World Heritage Site',
    crowdLevel: 'medium',
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
    culturalHook: 'The heart of New Delhi, colonial architecture meets modern commerce',
    crowdLevel: 'high',
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
    culturalHook: 'The seat of Mughal power, witness to India\'s independence',
    crowdLevel: 'high',
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
    culturalHook: 'A place of peace and architectural marvel',
    crowdLevel: 'medium',
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
  },
  {
    id: '6',
    name: 'Humayun\'s Tomb',
    culturalHook: 'The garden tomb that inspired the Taj Mahal',
    crowdLevel: 'low',
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
