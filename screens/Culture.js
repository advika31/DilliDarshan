// Culture/Festivals data with categories and Delhi festival places

export const FESTIVAL_CATEGORIES = [
  {
    id: 'religious',
    name: 'Religious Festivals',
    icon: '🙏',
    color: '#FF8C00'
  },
  {
    id: 'seasonal',
    name: 'Seasonal Festivals',
    icon: '🌸',
    color: '#66BB6A'
  },
  {
    id: 'cultural',
    name: 'Cultural Events',
    icon: '🎭',
    color: '#FF7043'
  },
  {
    id: 'national',
    name: 'National Celebrations',
    icon: '🇮🇳',
    color: '#FF6B6B'
  },
  {
    id: 'art-music',
    name: 'Art & Music',
    icon: '🎵',
    color: '#FFD54F'
  }
];

export const FESTIVAL_ITEMS = [
  // Religious Festivals
  {
    id: 'festival-1',
    name: 'Diwali - Festival of Lights',
    category: 'religious',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV7nMnBWdPkfTaNjAnYcNjj36nSu4gMXsHOA&s',
    description: 'One of the most important Hindu festivals celebrating victory of light over darkness',
    location: 'Throughout Delhi - Temples, Markets, Homes',
    celebrationLocation: 'Laxmi Nagar, Chandni Chowk, Dilli Haat, ISKCON Temple',
    nearestMetro: 'Various Metro Lines',
    metroDistance: 'All areas accessible',
    transportConnectivity: 'Metro: All lines operational\nBus: Extended routes\nAuto: Peak surge pricing',
    festivities: 'Oil lamps lighting, Fireworks, Sweet preparations, Shopping for lights and decorations\nTraditional Ramlila performances',
    highlights: ['Oil Lamps (Diyas)', 'Rangoli Art', 'Sweets & Mithai', 'Fireworks', 'Shopping Markets'],
    navigateCoordinates: '28.6139, 77.2090',
    bestTime: 'October-November (15 days before Diwali)',
    priceRange: 'Free celebrations, ₹100-500 for shopping',
    ratings: 4.9,
    dateInfo: 'Celebrated for 5 days, Date changes yearly (Oct-Nov)'
  },
  {
    id: 'festival-2',
    name: 'Holi - Festival of Colors',
    category: 'religious',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fRZVYqe3GLhvEHDmeoA2w_HeoqeVZAlQkA&s',
    description: 'Vibrant festival celebrating the arrival of spring and renewal of relationships',
    location: 'Parks, Streets, Temples across Delhi',
    celebrationLocation: 'India Gate, Delhi Ridge Area, Temples, Community Centers',
    nearestMetro: 'Central Park, Rajiv Chowk, AIIMS',
    metroDistance: '5-15 minutes walk',
    transportConnectivity: 'Metro: Available\nBus: Regular services\nAuto: ₹50-80',
    festivities: 'Colored powder (Gulal) throwing, Water balloon play, Bonfires (Holika Dahan), Traditional sweets\nBhang preparation',
    highlights: ['Color Throwing', 'Water Play', 'Holika Dahan Bonfire', 'Gujhiya Sweets', 'Folk Music'],
    navigateCoordinates: '28.6129, 77.2295',
    bestTime: 'March (Day before and day of Holi)',
    priceRange: 'Free celebrations, ₹200-400 for colors/supplies',
    ratings: 4.8,
    dateInfo: 'Celebrated on full moon of Phalguna month (Feb-Mar)'
  },
  {
    id: 'festival-3',
    name: 'Navratri & Durga Puja',
    category: 'religious',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFmUAW9KE39wQ9Lz7jlL3anoJoVxSlEoTycw&s',
    description: 'Nine-day festival dedicated to Goddess Durga with Garba dancing and Dandiya Raas',
    location: 'Temples, Community Pandals, Cultural Centers',
    celebrationLocation: 'Chattarpur Mandir, ISKCON Temple, Dilli Haat, Various Pandals in Colonies',
    nearestMetro: 'Chattarpur, Qutub Minar',
    metroDistance: '10-20 minutes',
    transportConnectivity: 'Metro: Yellow, Pink Lines\nAuto: ₹60-100\nBus: Special routes during festival',
    festivities: 'Garba & Dandiya dancing, Fasting, Rangoli making, Traditional dress (Ghagra-Choli)\nArti and prayers at temples',
    highlights: ['Garba Dancing', 'Dandiya Raas', 'Rangoli', 'Traditional Food', 'Cultural Programs'],
    navigateCoordinates: '28.5244, 77.1940',
    bestTime: 'September-October (9 days)',
    priceRange: 'Free entry at pandals, ₹50-200 for paid events',
    ratings: 4.7,
    dateInfo: 'Celebrated for 9 days, Dates vary yearly (Sept-Oct)'
  },

  // Seasonal Festivals
  {
    id: 'festival-4',
    name: 'Phool Walon Ki Sair - Flower Fair',
    category: 'seasonal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoUvTBbR8fR0ZjpFa1zdf9ylNV9gnxghg0A&s',
    description: 'Ancient flower festival dating back 300+ years with processions of flowers',
    location: 'Sufi Shrines - Hazrat Nizamuddin Dargah & Amir Khusro Dargah',
    celebrationLocation: 'Hazrat Nizamuddin Complex, Old Delhi',
    nearestMetro: 'Jangpura, Lajpat Nagar',
    metroDistance: '15 minutes walk',
    transportConnectivity: 'Metro: Purple, Pink Lines\nAuto: ₹40-60\nBus: 14, 32, 54',
    festivities: 'Flower processions, Qawwali music, Traditional food offerings, Horse-drawn carriages decorated with flowers',
    highlights: ['Flower Processions', 'Qawwali Music', 'Sufi Traditions', 'Traditional Sweets', 'Historical Heritage'],
    navigateCoordinates: '28.5948, 77.2451',
    bestTime: 'March-April (Usually 2 days)',
    priceRange: 'Free entry, ₹100-300 for donations',
    ratings: 4.6,
    dateInfo: 'Celebrated for 2 days, Date varies (March-April)'
  },
  {
    id: 'festival-5',
    name: 'International Mango Festival',
    category: 'seasonal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPz75tLsAxpHgYF5U9UKVKrvw33ULIRx2gYA&s',
    description: 'Festival celebrating India\'s national fruit with varieties from across the country',
    location: 'Talkatora Stadium & Dilli Haat',
    celebrationLocation: 'Talkatora Garden, Dilli Haat, IHC Lodhi Estate',
    nearestMetro: 'Lok Kalendra Marg, Rajiv Chowk',
    metroDistance: '10 minutes walk',
    transportConnectivity: 'Metro: Available\nAuto: ₹40-80\nBus: Regular services',
    festivities: 'Mango tasting sessions, Cooking demonstrations, Live cultural programs, Mango products bazaar\nAgricultural exhibitions',
    highlights: ['Mango Varieties', 'Taste Tests', 'Cooking Shows', 'Craft Items', 'Cultural Programs'],
    navigateCoordinates: '28.5885, 77.2145',
    bestTime: 'July (Entire month)',
    priceRange: '₹50 entry, ₹100-300 for tastings',
    ratings: 4.5,
    dateInfo: 'Celebrates entire July month'
  },

  // Cultural Events
  {
    id: 'festival-6',
    name: 'Surajkund Crafts Mela',
    category: 'cultural',
    image: 'https://static.toiimg.com/photo/62706089.cms',
    description: 'Annual crafts fair featuring artisans from across India with folk performances',
    location: 'Surajkund, Faridabad (Near Delhi)',
    celebrationLocation: 'Surajkund amphitheater complex',
    nearestMetro: 'HUDA City Center, then transfer',
    metroDistance: '35 km from Delhi center',
    transportConnectivity: 'Metro + Auto: ₹150-200\nCar: Recommended\nBus: Tourist shuttles available',
    festivities: 'Craft exhibitions, Live performances, Fashion shows, Cooking demonstrations, Workshops\nTraditional music and dance',
    highlights: ['Handicrafts', 'Folk Dances', 'Fashion Shows', 'Food Bazaar', 'Artisan Workshops'],
    navigateCoordinates: '28.3872, 77.3814',
    bestTime: 'February (Entire month)',
    priceRange: '₹100 entry, ₹500-2000 for purchases',
    ratings: 4.7,
    dateInfo: 'Celebrated for entire February month'
  },
  {
    id: 'festival-7',
    name: 'Dilli Haat International Fair',
    category: 'cultural',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MVAG6QNEZ1qDp5eewHLdu6eF_CMiQF5rZQ&s',
    description: 'Year-round open-air cultural bazaar showcasing crafts and cuisine from Indian states',
    location: 'Dilli Haat, Inder Lok & INA',
    celebrationLocation: 'Dilli Haat (Multiple locations)',
    nearestMetro: 'Inder Lok (Yellow Line), INA (Green Line)',
    metroDistance: '5-10 minutes walk',
    transportConnectivity: 'Metro: Direct access\nAuto: ₹30-50\nBus: Multiple routes',
    festivities: 'Handicraft shopping, Regional cuisine tasting, Live craft demonstrations, Cultural programs\nTheme-based monthly exhibitions',
    highlights: ['Regional Crafts', 'Traditional Food', 'Live Shows', 'Artisan Stalls', 'Cultural Exchange'],
    navigateCoordinates: '28.6370, 77.2485',
    bestTime: 'Throughout year (Best: Oct-Mar)',
    priceRange: '₹5 entry, ₹200-1000 for shopping',
    ratings: 4.6,
    dateInfo: 'Open year-round, Seasonal exhibitions monthly'
  },

  // National Celebrations
  {
    id: 'festival-8',
    name: 'Republic Day Parade',
    category: 'national',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUMoy_TL3c_uWq-y96dbqtO2cCB6J3XqpYhQ&s',
    description: 'Grand parade celebrating India\'s Constitution with military displays and cultural performances',
    location: 'Rajpath (Now Kartavya Path), Red Fort Area',
    celebrationLocation: 'Rajpath, India Gate, Red Fort, Connaught Place',
    nearestMetro: 'Rajiv Chowk, Lok Kalendra Marg',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro: Available from 6 AM\nBus: Extended routes\nAuto: Heavy traffic, not recommended',
    festivities: 'Military parade, Cultural tableaux from states, Traditional music, Airforce fly-past\nCelebrations till evening',
    highlights: ['Military Parade', 'Cultural Tableaux', 'Army Display', 'Airforce Show', 'Patriotic Performances'],
    navigateCoordinates: '28.6181, 77.2009',
    bestTime: 'January 26 (Early morning 5 AM suggested)',
    priceRange: 'Free entry (tickets for premium seating ₹1000-5000)',
    ratings: 4.9,
    dateInfo: 'Celebrated on January 26 (Republic Day)'
  },
  {
    id: 'festival-9',
    name: 'Independence Day Celebration',
    category: 'national',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVv_IHdOilQCuHZsnK78iIfWuCHeOgOp5ldw&s',
    description: 'National celebration commemorating India\'s independence with flag hoisting and cultural events',
    location: 'Red Fort, Parks, Schools, Government Buildings',
    celebrationLocation: 'Red Fort, Connaught Place, Delhi Ridge, Talkatora',
    nearestMetro: 'Chandni Chowk, Rajiv Chowk, Khan Market',
    metroDistance: '5-15 minutes walk',
    transportConnectivity: 'Metro: Available\nBus: Regular services\nAuto: ₹40-80',
    festivities: 'Flag hoisting ceremony, National anthem, Cultural programs, Patriotic songs, Fireworks in evening\nMilitary displays',
    highlights: ['Flag Hoisting', 'National Anthem', 'Patriotic Performances', 'Fireworks', 'Military Shows'],
    navigateCoordinates: '28.6562, 77.2410',
    bestTime: 'August 15 (Entire day celebrations)',
    priceRange: 'Free entry for all public areas',
    ratings: 4.8,
    dateInfo: 'Celebrated on August 15 (Independence Day)'
  },

  // Art & Music
  {
    id: 'festival-10',
    name: 'Delhi Art Week',
    category: 'art-music',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4A_daVouPREOw1KzCIPwPwE-JB_qzZAxyaA&s',
    description: 'Contemporary art festival showcasing galleries, exhibitions, and artists from across India and world',
    location: 'Various Art Galleries - Delhi Art District, Khan Market, Rajori Garden',
    celebrationLocation: 'Art Galleries, Museums, Community Centers',
    nearestMetro: 'Rajiv Chowk, Khan Market, IIT Delhi',
    metroDistance: '10-20 minutes',
    transportConnectivity: 'Metro: Available\nAuto: ₹50-100\nCab: Recommended for gallery hopping',
    festivities: 'Art exhibitions, Gallery walks, Artist talks, Performance art, Installation art\nAuction of artworks',
    highlights: ['Modern Art', 'Contemporary Works', 'Artist Interactions', 'Art Performances', 'Gallery Tours'],
    navigateCoordinates: '28.5855, 77.1958',
    bestTime: 'March-April (Annual week-long event)',
    priceRange: 'Free entry to most galleries, ₹500-2000 for premium events',
    ratings: 4.7,
    dateInfo: 'Celebrated annually for 7-10 days (March-April)'
  },
  {
    id: 'festival-11',
    name: 'Qawwali Festival - Hazrat Nizamuddin',
    category: 'art-music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    description: 'Traditional Sufi music festival celebrating 800-year-old Qawwali musical tradition',
    location: 'Hazrat Nizamuddin Auliya Dargah & Amir Khusro Dargah',
    celebrationLocation: 'Sufi Shrines in Hazrat Nizamuddin',
    nearestMetro: 'Jangpura, Lajpat Nagar',
    metroDistance: '15-20 minutes walk',
    transportConnectivity: 'Metro: Purple, Pink Lines\nAuto: ₹40-70\nBus: 14, 32, 54',
    festivities: 'Live Qawwali performances by renowned singers, Sufi devotional music, Langar (community meal)\nSpiritual gatherings',
    highlights: ['Qawwali Music', 'Sufi Tradition', 'Spiritual Experience', 'Traditional Food', 'Community Participation'],
    navigateCoordinates: '28.5948, 77.2451',
    bestTime: 'Throughout year (Especially March-April & Sept-Oct)',
    priceRange: 'Free entry, Optional donations',
    ratings: 4.8,
    dateInfo: 'Thursday & Friday evenings regularly, Special events on festivals'
  }
];

export const getFestivalItemsByCategory = (categoryId) => {
  return FESTIVAL_ITEMS.filter(item => item.category === categoryId);
};
