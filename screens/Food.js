// Food data with 5 categories and 20 Delhi food places

export const FOOD_CATEGORIES = [
  {
    id: 'street-food',
    name: 'Street Food',
    icon: '🌮',
    color: '#FF6B6B'
  },
  {
    id: 'mughlai',
    name: 'Mughlai Cuisine',
    icon: '🍗',
    color: '#FFA500'
  },
  {
    id: 'sweets',
    name: 'Sweets & Desserts',
    icon: '🍰',
    color: '#FF69B4'
  },
  {
    id: 'regional',
    name: 'Regional Cuisine',
    icon: '🥘',
    color: '#4ECDC4'
  },
  {
    id: 'vegetarian',
    name: 'Pure Vegetarian',
    icon: '🥗',
    color: '#95E1D3'
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    icon: '🍔',
    color: '#E74C3C'
  }
];

export const FOOD_ITEMS = [
  // Street Food Category (4 items)
  {
    id: 'food-1',
    name: 'Jama Masjid Chaat Corner',
    category: 'street-food',
    image: 'https://content.jdmagicbox.com/comp/def_content/chaat_corners/default-chaat-corners-3.jpg',
    description: 'Famous for crispy chaat, gol gappa, dahi bhalle',
    location: 'Jama Masjid, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Auto-rickshaw: ₹40-60 from Metro\nBus: 52, 231, 232',
    heritageInfo: 'Located in the heart of Old Delhi near 300+ year old Jama Masjid\nHistoric market area with 400 years of food culture',
    highlights: ['Gol Gappa', 'Dahi Bhalle', 'Aloo Tikki', 'Papdi Chaat'],
    navigateCoordinates: '28.6505, 77.2302',
    bestTime: '5:00 PM - 10:00 PM',
    priceRange: '₹20-50 per person',
    ratings: 4.6
  },
  {
    id: 'food-2',
    name: 'Paranthe Wali Gali - Karim\'s',
    category: 'street-food',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EX-fBV4agW3nzLDX1U80E_urLjLegJ8I9Q&s',
    description: 'Authentic Mughlai parathas and kebabs',
    location: 'Paranthe Wali Gali, Chandni Chowk',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '10 minutes walk',
    transportConnectivity: 'Direct metro connection\nAuto-rickshaw: ₹30-50',
    heritageInfo: 'Famous lane dating back to Mughal era\nFamilies serving same recipes for 200+ years\nWikipedia heritage site',
    highlights: ['Alu Paratha', 'Puri-Bhaji', 'Kebabs', 'Naan'],
    navigateCoordinates: '28.6497, 77.2309',
    bestTime: '8:00 AM - 11:00 PM',
    priceRange: '₹30-80 per person',
    ratings: 4.7
  },
  {
    id: 'food-3',
    name: 'Indra\'s Samosas - Chandni Chowk',
    category: 'street-food',
    image: 'https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg',
    description: 'Crispy samosas with aloo tikki and pani puri',
    location: 'Chandni Chowk Market',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro Yellow Line direct\nAutos readily available',
    heritageInfo: 'Established 1950 in Old Delhi bazaar\nServes famous Delhi samosa style\nPart of Chandni Chowk food heritage',
    highlights: ['Samosas', 'Aloo Tikki', 'Pani Puri', 'Chikhalwali'],
    navigateCoordinates: '28.6502, 77.2315',
    bestTime: '6:00 AM - 10:00 PM',
    priceRange: '₹15-40 per person',
    ratings: 4.5
  },
  {
    id: 'food-4',
    name: 'Rajendra Chaat Bhandar',
    category: 'street-food',
    image: 'https://ministryofcurry.com/wp-content/uploads/2025/10/samosa-chaat-16.jpg',
    description: 'Must-try papdi chaat and masala puri',
    location: 'Dariba Kalan, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '12 minutes walk',
    transportConnectivity: 'Auto: ₹50-70\nBus: 201, 231',
    heritageInfo: 'Historic jewel market area with 300-year-old trading history\nServes traditional Delhi recipes passed through generations',
    highlights: ['Papdi Chaat', 'Masala Puri', 'Gol Gappa', 'Bada Pav'],
    navigateCoordinates: '28.6488, 77.2297',
    bestTime: '5:00 PM - 10:00 PM',
    priceRange: '₹20-50 per person',
    ratings: 4.4
  },

  // Mughlai Cuisine Category (5 items)
  {
    id: 'food-5',
    name: 'Al-Karim - Red Fort',
    category: 'mughlai',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Karim%27s.jpg',
    description: 'Legendary Mughlai restaurant with 150+ years history',
    location: 'Jama Masjid, Red Fort Area',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '10 minutes walk',
    transportConnectivity: 'Metro: Yellow Line\nAuto: ₹40-60\nBus: 52, 231',
    heritageInfo: 'Established 1862, legendary Mughlai cuisine\nServes recipes from Mughal empire\nRed Fort heritage zone nearby',
    highlights: ['Nihari', 'Kebabs', 'Biryani', 'Korma', 'Haleem'],
    navigateCoordinates: '28.6505, 77.2308',
    bestTime: '12:00 PM - 11:00 PM',
    priceRange: '₹200-400 per person',
    ratings: 4.8
  },
  {
    id: 'food-6',
    name: 'Gali Paranthe Wali - Natraj',
    category: 'mughlai',
    image: 'https://cookingorgeous.com/wp-content/uploads/2021/06/lamb-shish-kebab-20-500x500.jpg',
    description: 'Authentic Mughlai kebabs and mutton dishes',
    location: 'Paranthe Wali Gali, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Direct metro connection\nAuto: ₹30-50',
    heritageInfo: 'Historic Paranthe Wali Gali with 200-year heritage\nFamily business serving Mughlai recipes',
    highlights: ['Mutton Kebab', 'Chicken Mughlai', 'Parathas', 'Biryani'],
    navigateCoordinates: '28.6497, 77.2309',
    bestTime: '12:00 PM - 10:00 PM',
    priceRange: '₹150-350 per person',
    ratings: 4.6
  },
  {
    id: 'food-7',
    name: 'Chor Bizarre - Defli Gate',
    category: 'mughlai',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxPcOmZP5iBdcyMRnT9J5ftQuhQSeGYA4MA&s',
    description: 'Royalist Mughlai dining experience',
    location: 'Delhi Gate, New Delhi',
    nearestMetro: 'Delhi Gate (Blue Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹60-80\nBus: 202, 503',
    heritageInfo: 'Inspired by Mughal palace cuisine\nDecorated with antique artifacts\nNeighboring historic Delhi Gate',
    highlights: ['Rogan Josh', 'Shami Kebab', 'Nihari', 'Seekh Kebab'],
    navigateCoordinates: '28.6443, 77.2315',
    bestTime: '11:30 AM - 11:00 PM',
    priceRange: '₹250-450 per person',
    ratings: 4.7
  },
  {
    id: 'food-8',
    name: 'Haveli - Old Delhi',
    category: 'mughlai',
    image: 'https://play-lh.googleusercontent.com/Nswtqel3p6_6RB-0aA6smv21CK7_WiRKLLwHsT2vdjj4CFg6OeacZiTWCzt4s-7RhZYP=w240-h480-rw',
    description: 'Roof-top dining with heritage views and Mughlai cuisine',
    location: 'Chandni Chowk, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '7 minutes walk',
    transportConnectivity: 'Metro Yellow Line\nAuto: ₹35-50',
    heritageInfo: 'Located in preserved Haveli (heritage mansion)\nRoof-top views of Jama Masjid\nAuthentic Mughlai cuisine with Old Delhi heritage',
    highlights: ['Biryani', 'Kebabs', 'Korma', 'Naan', 'Raita'],
    navigateCoordinates: '28.6508, 77.2315',
    bestTime: '1:00 PM - 11:00 PM',
    priceRange: '₹300-500 per person',
    ratings: 4.7
  },
  

  // Sweets & Desserts Category (4 items)
  {
    id: 'food-10',
    name: 'Haldiram\'s - Chandni Chowk',
    category: 'sweets',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Haldiram%27s_2024_Logo.svg/1280px-Haldiram%27s_2024_Logo.svg.png',
    description: 'Delhi\'s most famous sweets and snacks chain',
    location: 'Chandni Chowk Market',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '2 minutes walk',
    transportConnectivity: 'Direct metro Yellow Line\nAuto: ₹20-40',
    heritageInfo: 'Established 1937, iconic Delhi sweet shop\nPart of Chandni Chowk food heritage\nInternational brand starting from Old Delhi',
    highlights: ['Barfi', 'Halwa', 'Kachori', 'Samosa', 'Dry Fruits'],
    navigateCoordinates: '28.6502, 77.2320',
    bestTime: '9:00 AM - 9:00 PM',
    priceRange: '₹100-300 per person',
    ratings: 4.6
  },
  {
    id: 'food-11',
    name: 'Jalebi Fafda Corner - Chandni Chowk',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
    description: 'Original Delhi jalebi with crispy texture',
    location: 'Chandni Chowk Main Market',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro Yellow Line direct\nAuto: ₹25-45',
    heritageInfo: '150+ year old family recipe\nOld Delhi bazaar specialty\nTraditional sweet-making since Mughal era',
    highlights: ['Jalebi', 'Fafda', 'Khichdi', 'Rabri', 'Malpua'],
    navigateCoordinates: '28.6500, 77.2318',
    bestTime: '7:00 AM - 10:00 PM',
    priceRange: '₹20-80 per person',
    ratings: 4.5
  },
  {
    id: 'food-12',
    name: 'Paranthe Wali Gali Sweet Shop',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
    description: 'Traditional Delhi kheer and khichdi',
    location: 'Paranthe Wali Gali, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Metro: Yellow Line\nAuto: ₹30-50',
    heritageInfo: 'Part of famous Paranthe Wali Gali heritage lane\nFamily recipe passed through 6 generations\nHistoric location 200+ years old',
    highlights: ['Kheer', 'Khichdi', 'Badham Ki Kheer', 'Halwa', 'Puri'],
    navigateCoordinates: '28.6497, 77.2309',
    bestTime: '6:00 AM - 11:00 PM',
    priceRange: '₹30-100 per person',
    ratings: 4.4
  },
  {
    id: 'food-13',
    name: 'Dariba Sweet House',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    description: 'Famous for peda and dry fruit sweets',
    location: 'Dariba Kalan, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '10 minutes walk',
    transportConnectivity: 'Auto: ₹50-70\nBus: 201, 231, 232',
    heritageInfo: 'Historic jewel market area heritage\nServing sweets since 1920s\nPart of Old Delhi\'s food legacy',
    highlights: ['Peda', 'Barfi', 'Dry Fruits', 'Gajar Ka Halwa', 'Besan Barfi'],
    navigateCoordinates: '28.6488, 77.2297',
    bestTime: '8:00 AM - 9:00 PM',
    priceRange: '₹150-400 per person',
    ratings: 4.5
  },

  // Regional Cuisine Category (4 items)
  {
    id: 'food-14',
    name: 'Bihari Kabab - Jama Masjid',
    category: 'regional',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
    description: 'Traditional Bihari meat preparations',
    location: 'Jama Masjid Area, Old Delhi',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Metro Yellow Line\nAuto: ₹40-60',
    heritageInfo: 'Rare Bihari cuisine in Delhi\nNear historic Jama Masjid (300+ years)\nCultural heritage of Eastern India',
    highlights: ['Bihari Kabab', 'Litti Chokha', 'Meat Curry', 'Puri', 'Rice'],
    navigateCoordinates: '28.6505, 77.2302',
    bestTime: '12:00 PM - 10:00 PM',
    priceRange: '₹120-250 per person',
    ratings: 4.3
  },
  {
    id: 'food-15',
    name: 'Andhra & Telugu Restaurant',
    category: 'regional',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMzpHpy95I_7oZWoK7OfxRO54OiPurcvLtQ&s',
    description: 'Spicy South Indian Andhra cuisine',
    location: 'Delhi Gate Area, New Delhi',
    nearestMetro: 'Delhi Gate (Blue Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹60-80',
    heritageInfo: 'Authentic Andhra Pradesh cuisine\nCultural representation in Delhi\nTraditional spice blend cooking',
    highlights: ['Biryani', 'Curry', 'Pesarattu', 'Gongura', 'Sambar'],
    navigateCoordinates: '28.6443, 77.2315',
    bestTime: '11:30 AM - 10:00 PM',
    priceRange: '₹100-250 per person',
    ratings: 4.4
  },
  {
    id: 'food-16',
    name: 'Rajasthani Thali House',
    category: 'regional',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    description: 'Authentic Rajasthani dal-baati-churma',
    location: 'New Delhi Central Area',
    nearestMetro: 'Patel Chowk (Blue Line)',
    metroDistance: '7 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹50-70',
    heritageInfo: 'Royal Rajasthani recipe heritage\nTraditional spice preparation\nCultural cuisine of desert regions',
    highlights: ['Dal-Baati', 'Churma', 'Ker Sangri', 'Bati', 'Ghee'],
    navigateCoordinates: '28.6308, 77.1900',
    bestTime: '12:00 PM - 11:00 PM',
    priceRange: '₹150-300 per person',
    ratings: 4.5
  },
  {
    id: 'food-17',
    name: 'Punjabi Haveli - Chandni Chowk',
    category: 'regional',
    image: 'https://static.toiimg.com/thumb/53314156.cms?imgsize=1762111&width=800&height=800',
    description: 'Authentic Punjabi chole-bhature and makki-roti',
    location: 'Chandni Chowk Heritage Area',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro Yellow Line\nAuto: ₹30-50',
    heritageInfo: 'Punjabi cultural cuisine heritage\nLocated in preserved Haveli mansion\nTraditional Sikh and Punjabi recipes',
    highlights: ['Chole-Bhature', 'Makki-Roti', 'Sarson Ka Saag', 'Pickle', 'Lassi'],
    navigateCoordinates: '28.6502, 77.2320',
    bestTime: '8:00 AM - 11:00 PM',
    priceRange: '₹80-200 per person',
    ratings: 4.6
  },

  // Pure Vegetarian Category (3 items)
  {
    id: 'food-18',
    name: 'Deepak\'s Vegetarian Restaurant',
    category: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    description: 'Pure vegetarian North & South Indian cuisine',
    location: 'Chandni Chowk Area',
    nearestMetro: 'Chandni Chowk (Yellow Line)',
    metroDistance: '7 minutes walk',
    transportConnectivity: 'Metro Yellow Line\nAuto: ₹30-50\nBus: 52, 231',
    heritageInfo: 'Vegetarian cuisine heritage of Delhi\nTraditional Indian vegetable recipes\nNeighboring 400-year-old bazaar',
    highlights: ['Paneer Butter Masala', 'Dal Makhani', 'Sambar', 'Dosa', 'Thali'],
    navigateCoordinates: '28.6500, 77.2318',
    bestTime: '11:00 AM - 10:00 PM',
    priceRange: '₹80-200 per person',
    ratings: 4.5
  },
  {
    id: 'food-19',
    name: 'Veggies Garden Thali House',
    category: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    description: 'Complete vegetarian thali with organic vegetables',
    location: 'Delhi Gate, New Delhi',
    nearestMetro: 'Delhi Gate (Blue Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹60-80',
    heritageInfo: 'Organic vegetarian cooking traditions\nTraditional recipes with modern hygiene\nHealthy Indian vegetarian heritage',
    highlights: ['Thali', 'Paneer', 'Sabzi', 'Roti', 'Raita', 'Pickles'],
    navigateCoordinates: '28.6443, 77.2315',
    bestTime: '12:00 PM - 11:00 PM',
    priceRange: '₹120-250 per person',
    ratings: 4.4
  },
  {
    id: 'food-20',
    name: 'South Indian Veg Restaurant',
    category: 'vegetarian',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FBiThBDSB2dg-8w75MoVK34KJo2Thj3UdQ&s',
    description: 'Authentic South Indian vegetarian cuisine',
    location: 'New Delhi Area',
    nearestMetro: 'Patel Chowk (Blue Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹50-70\nBus: 416',
    heritageInfo: 'South Indian vegetarian tradition heritage\nAuthentic Tamil and Telugu recipes\nTraditional cooking methods preserved',
    highlights: ['Dosa', 'Idli', 'Sambar', 'Chutney', 'Biryani', 'Uttapam'],
    navigateCoordinates: '28.6308, 77.1900',
    bestTime: '7:00 AM - 10:00 PM',
    priceRange: '₹100-220 per person',
    ratings: 4.5
  },

  // Fast Food Category (3 items)
  {
    id: 'food-21',
    name: 'Burger King Delhi',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    description: 'Premium flame-grilled burgers and quick service',
    location: 'Connaught Place, New Delhi',
    nearestMetro: 'Rajiv Chowk (Blue/Yellow Line)',
    metroDistance: '5 minutes walk',
    transportConnectivity: 'Metro: Blue/Yellow Line\nAuto: ₹30-50\nBus: 403, 420',
    heritageInfo: 'Modern fast food experience in central Delhi\nPremium dining with fast service\nInternational burger standards',
    highlights: ['Whopper', 'Chicken Burgers', 'Fries', 'Shakes', 'Combos'],
    navigateCoordinates: '28.6318, 77.2197',
    bestTime: '11:00 AM - 11:00 PM',
    priceRange: '₹150-350 per person',
    ratings: 4.3
  },
  {
    id: 'food-22',
    name: 'Domino\'s Pizza - Khan Market',
    category: 'fast-food',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPFNbAZr6l6hPNklwjcwCNmuIzl6gq2OWug&s',
    description: 'Fresh pizzas with authentic Italian flavors',
    location: 'Khan Market, New Delhi',
    nearestMetro: 'Kalkaji Mandir (Blue Line)',
    metroDistance: '8 minutes walk',
    transportConnectivity: 'Metro: Blue Line\nAuto: ₹60-80\nBus: 401, 405',
    heritageInfo: 'Contemporary pizza delivery in trendy Khan Market\nFresh baked pizzas with quality ingredients\nPerfect for casual dining',
    highlights: ['Cheese Pizza', 'Veggie Supreme', 'Chicken Feast', 'Garlic Breadsticks', 'Sides'],
    navigateCoordinates: '28.5679, 77.2422',
    bestTime: '12:00 PM - 11:30 PM',
    priceRange: '₹200-500 per person',
    ratings: 4.4
  },
  {
    id: 'food-23',
    name: 'Olive Bar & Kitchen - Pasta House',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    description: 'Italian pasta and contemporary fusion cuisine',
    location: 'Mehrauli, New Delhi',
    nearestMetro: 'Chhatarpur (Violet Line)',
    metroDistance: '10 minutes drive',
    transportConnectivity: 'Auto: ₹80-120\nBus: 506, 507',
    heritageInfo: 'Premium Italian pasta restaurant\nAuthentic Italian recipes with modern twist\nCozy dining experience near heritage sites',
    highlights: ['Pasta Carbonara', 'Penne Arrabbiata', 'Fettuccine Alfredo', 'Risotto', 'Tiramisu'],
    navigateCoordinates: '28.5244, 77.1963',
    bestTime: '12:30 PM - 11:00 PM',
    priceRange: '₹300-600 per person',
    ratings: 4.6
  }
];

// Helper function to get food items by category
export const getFoodItemsByCategory = (categoryId) => {
  return FOOD_ITEMS.filter(item => item.category === categoryId);
};

// Helper function to get food item by id
export const getFoodItemById = (itemId) => {
  return FOOD_ITEMS.find(item => item.id === itemId);
};

// Helper function to get category details
export const getCategoryDetails = (categoryId) => {
  return FOOD_CATEGORIES.find(cat => cat.id === categoryId);
};
