// Mock API service for trip recommendations
// In production, this would integrate with Gemini AI API

const mockDestinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 1654,
  },
  {
    id: 3,
    name: 'New Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1523480717985-7a79f3dc8b45?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 1985,
  },
  {
    id: 4,
    name: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 1420,
  },
  {
    id: 5,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9f1?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 1892,
  },
  {
    id: 6,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 3021,
  },
];

const destinationThemes = {
  paris: [
    {
      title: 'Romantic Paris Icons',
      region: 'Seine & Central Paris',
      activities: ['Louvre Museum guided tour', 'Eiffel Tower sunset visit', 'Seine river cruise'],
    },
    {
      title: 'Parisian Food & Art',
      region: 'Le Marais',
      activities: ['French pastry tasting', 'Montmartre art walk', 'Chef-led cooking class'],
    },
    {
      title: 'Historic Paris Landmarks',
      region: 'Latin Quarter',
      activities: ['Notre-Dame riverside walk', 'Luxembourg Gardens stroll', 'Palace of Versailles half-day trip'],
    },
  ],
  bali: [
    {
      title: 'Ubud Culture & Rice Terraces',
      region: 'Ubud',
      activities: ['Rice terrace morning walk', 'Balinese cooking workshop', 'Local market visit'],
    },
    {
      title: 'Beach & Temple Relaxation',
      region: 'Seminyak',
      activities: ['Seminyak beach lounge', 'Tanah Lot sunset temple', 'Beachfront seafood dinner'],
    },
    {
      title: 'Nature & Wellness Day',
      region: 'Central Bali',
      activities: ['Tegallalang sunrise trek', 'Jatiluwih rice terrace tour', 'Spa and yoga session'],
    },
  ],
  'new delhi': [
    {
      title: 'Historic Delhi Heritage',
      region: 'Old Delhi',
      activities: ['Taj Mahal sunrise visit', 'Red Fort exploration', 'Chandni Chowk street food walk'],
    },
    {
      title: 'Cultural & Spiritual Delhi',
      region: 'South Delhi',
      activities: ['Qutub Minar heritage tour', 'Lotus Temple visit', 'Akshardham cultural experience'],
    },
    {
      title: 'Local Flavors & Markets',
      region: 'Connaught Place',
      activities: ['Local bazaar shopping', 'Mughlai cuisine dinner', 'Heritage museum visit'],
    },
  ],
  goa: [
    {
      title: 'Goa Beach Day',
      region: 'North Goa',
      activities: ['Calangute beach sunset', 'Water sports adventure', 'Beach shacks dinner'],
    },
    {
      title: 'Heritage & Spice Trails',
      region: 'Old Goa',
      activities: ['Fort Aguada coastal walk', 'Spice plantation tour', 'Portuguese heritage church visit'],
    },
    {
      title: 'Local Markets & Culture',
      region: 'Anjuna',
      activities: ['Anjuna market shopping', 'Sunset beach party', 'Seafood tasting'],
    },
  ],
  tokyo: [
    {
      title: 'Tokyo City Sights',
      region: 'Shibuya & Shinjuku',
      activities: ['Shibuya crossing nightlife', 'Tokyo Tower city view', 'Senso-ji temple visit'],
    },
    {
      title: 'Food & Markets',
      region: 'Tsukiji & Ginza',
      activities: ['Tsukiji street food experience', 'Ramen alley dinner', 'Ginza shopping stroll'],
    },
    {
      title: 'Cultural Tokyo',
      region: 'Asakusa',
      activities: ['Meiji Shrine visit', 'Imperial Palace walk', 'Japanese tea ceremony'],
    },
  ],
  'new york': [
    {
      title: 'Classic Manhattan',
      region: 'Midtown',
      activities: ['Times Square evening tour', 'Central Park bike ride', 'Broadway theater night'],
    },
    {
      title: 'Iconic Landmarks',
      region: 'Financial District',
      activities: ['Statue of Liberty cruise', 'Brooklyn Bridge walk', '9/11 Memorial visit'],
    },
    {
      title: 'City Culture & Eats',
      region: 'SoHo & Chelsea',
      activities: ['High Line stroll', 'Chelsea Market food tour', 'Museum mile visit'],
    },
  ],
  default: [
    {
      title: 'Local Highlights',
      region: 'City Center',
      activities: ['City highlights tour', 'Popular food experience', 'Relaxing leisurely activity'],
    },
  ],
};

const activityMap = {
  Heritage: ['Museum tour', 'Historical walking tour', 'Ancient monument visit', 'Local history museum exploration'],
  Adventure: ['Hiking', 'Rock climbing', 'Paragliding', 'Water sports'],
  Nightlife: ['Bar hopping', 'Nightclub experience', 'Live music show', 'Rooftop lounge visit'],
  Food: ['Street food tour', 'Cooking class', 'Food market visit', 'Fine dining experience'],
  Nature: ['Park exploration', 'Scenic hike', 'Wildlife sanctuary visit', 'Nature photography session'],
  Spiritual: ['Temple visit', 'Meditation retreat', 'Yoga class', 'Sacred site tour'],
  Luxury: ['Spa treatment', 'Luxury shopping', 'Private tour', 'Fine dining experience'],
  Family: ['Theme park', 'Zoo visit', 'Family restaurant', 'Kids activity center'],
};

const mockItinerary = (destination, days, interests, budget) => {
  const normalizedDestination = (destination || '').trim().toLowerCase();
  const themes = destinationThemes[normalizedDestination] || destinationThemes.default;
  const totalDays = parseInt(days, 10) || 1;
  const dailyCost = parseInt(budget, 10) && totalDays ? parseInt(budget, 10) / totalDays : 0;

  return Array.from({ length: totalDays }, (_, dayIndex) => {
    const theme = themes[dayIndex % themes.length];
    const rotatedInterests = interests.length
      ? [...interests.slice(dayIndex), ...interests.slice(0, dayIndex)].slice(0, 3)
      : [];

    const interestActivities = rotatedInterests.map((interest, index) => {
      const options = activityMap[interest] || ['Local experience'];
      const activity = options[(dayIndex + index) % options.length];
      return `${activity} around ${theme.region}`;
    });

    const activities = [
      ...theme.activities,
      ...interestActivities,
    ]
      .slice(0, 3)
      .map((activity, idx) => (activity.includes(theme.region) ? activity : `${activity}`));

    return {
      day: dayIndex + 1,
      title: `Day ${dayIndex + 1} - ${theme.title}`,
      activities,
      estimatedCost: dailyCost.toFixed(0),
      meals: ['Breakfast', 'Lunch', 'Dinner'],
    };
  });
};

const destinationHotels = {
  paris: [
    {
      id: 1,
      name: 'Le Marais Boutique Hotel',
      rating: 4.8,
      pricePerNight: 220,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop',
      reviews: 1432,
      amenities: ['WiFi', 'Breakfast', 'Rooftop Terrace'],
    },
    {
      id: 2,
      name: 'Seine Riverside Suites',
      rating: 4.6,
      pricePerNight: 180,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
      reviews: 987,
      amenities: ['River View', 'Spa', 'Concierge'],
    },
  ],
  bali: [
    {
      id: 3,
      name: 'Ubud Jungle Retreat',
      rating: 4.9,
      pricePerNight: 120,
      image: 'https://images.unsplash.com/photo-1501877008226-bc8d1ef7a2ed?w=300&h=200&fit=crop',
      reviews: 2021,
      amenities: ['Pool', 'Yoga Class', 'Spa'],
    },
    {
      id: 4,
      name: 'Seminyak Beach Resort',
      rating: 4.7,
      pricePerNight: 140,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop',
      reviews: 1568,
      amenities: ['Beach Access', 'Bar', 'Surf Lessons'],
    },
  ],
  'new delhi': [
    {
      id: 5,
      name: 'Imperial Delhi Hotel',
      rating: 4.8,
      pricePerNight: 110,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop',
      reviews: 1245,
      amenities: ['Pool', 'Restaurant', 'Spa'],
    },
    {
      id: 6,
      name: 'Connaught Place Inn',
      rating: 4.5,
      pricePerNight: 85,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
      reviews: 895,
      amenities: ['WiFi', 'Breakfast', 'City Center'],
    },
  ],
  goa: [
    {
      id: 7,
      name: 'Goa Beachside Villa',
      rating: 4.7,
      pricePerNight: 95,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
      reviews: 1340,
      amenities: ['Sea View', 'Pool', 'Breakfast'],
    },
    {
      id: 8,
      name: 'Palolem Resort',
      rating: 4.6,
      pricePerNight: 90,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&h=200&fit=crop',
      reviews: 1045,
      amenities: ['Beach Access', 'Bar', 'Yoga'],
    },
  ],
  tokyo: [
    {
      id: 9,
      name: 'Shinjuku City Hotel',
      rating: 4.7,
      pricePerNight: 160,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
      reviews: 1190,
      amenities: ['WiFi', 'Breakfast', 'City View'],
    },
    {
      id: 10,
      name: 'Tokyo Tower Suites',
      rating: 4.9,
      pricePerNight: 190,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop',
      reviews: 1405,
      amenities: ['Rooftop', 'Gym', 'Spa'],
    },
  ],
  'new york': [
    {
      id: 11,
      name: 'Midtown Manhattan Hotel',
      rating: 4.8,
      pricePerNight: 220,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
      reviews: 1987,
      amenities: ['Gym', 'Free WiFi', 'Breakfast'],
    },
    {
      id: 12,
      name: 'Brooklyn Boutique Inn',
      rating: 4.5,
      pricePerNight: 180,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop',
      reviews: 1023,
      amenities: ['Coffee Bar', 'City Tours', 'Gym'],
    },
  ],
  default: [
    {
      id: 13,
      name: 'Global Comfort Hotel',
      rating: 4.4,
      pricePerNight: 130,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop',
      reviews: 980,
      amenities: ['WiFi', 'Breakfast', 'Concierge'],
    },
  ],
};

const destinationRestaurants = {
  paris: [
    {
      id: 1,
      name: 'Bistro de Paris',
      cuisine: 'French',
      rating: 4.9,
      avgCost: 110,
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Croissant & Co.',
      cuisine: 'Bakery',
      rating: 4.7,
      avgCost: 35,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop',
    },
  ],
  bali: [
    {
      id: 3,
      name: 'Balinese Spice House',
      cuisine: 'Indonesian',
      rating: 4.8,
      avgCost: 20,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561029?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Beachfront Grill Bali',
      cuisine: 'Seafood',
      rating: 4.6,
      avgCost: 30,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    },
  ],
  'new delhi': [
    {
      id: 5,
      name: 'Delhi Street Eats',
      cuisine: 'Indian',
      rating: 4.9,
      avgCost: 15,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
    },
    {
      id: 6,
      name: 'Mughlai Palace',
      cuisine: 'Mughlai',
      rating: 4.7,
      avgCost: 25,
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&h=200&fit=crop',
    },
  ],
  goa: [
    {
      id: 7,
      name: 'Goan Seafood Shack',
      cuisine: 'Seafood',
      rating: 4.8,
      avgCost: 22,
      image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=300&h=200&fit=crop',
    },
    {
      id: 8,
      name: 'Spice Island Café',
      cuisine: 'Local',
      rating: 4.6,
      avgCost: 18,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop',
    },
  ],
  tokyo: [
    {
      id: 9,
      name: 'Sushi Ichiban',
      cuisine: 'Japanese',
      rating: 4.9,
      avgCost: 65,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
    },
    {
      id: 10,
      name: 'Ramen Alley',
      cuisine: 'Japanese',
      rating: 4.7,
      avgCost: 20,
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&h=200&fit=crop',
    },
  ],
  'new york': [
    {
      id: 11,
      name: 'Manhattan Diner',
      cuisine: 'American',
      rating: 4.6,
      avgCost: 50,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
    },
    {
      id: 12,
      name: 'Pizza & Pasta Co.',
      cuisine: 'Italian',
      rating: 4.7,
      avgCost: 40,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
    },
  ],
  default: [
    {
      id: 13,
      name: 'Global Food Market',
      cuisine: 'International',
      rating: 4.5,
      avgCost: 35,
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=200&fit=crop',
    },
  ],
};

const destinationExperiences = {
  paris: [
    {
      id: 1,
      name: 'Seine River Sunset Cruise',
      category: 'Culture',
      description: 'Enjoy a romantic evening cruise with views of Paris landmarks.',
      duration: '2 hours',
      price: 45,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Montmartre Art Walk',
      category: 'Heritage',
      description: 'Explore artists, galleries, and cafes in historic Montmartre.',
      duration: '3 hours',
      price: 35,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&h=200&fit=crop',
    },
  ],
  bali: [
    {
      id: 3,
      name: 'Ubud Rice Terrace Tour',
      category: 'Nature',
      description: 'Visit iconic rice terraces and local villages near Ubud.',
      duration: '4 hours',
      price: 30,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Balinese Cooking Class',
      category: 'Food',
      description: 'Learn to prepare traditional Balinese dishes with local chefs.',
      duration: '3 hours',
      price: 40,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=200&fit=crop',
    },
  ],
  'new delhi': [
    {
      id: 5,
      name: 'Old Delhi Street Food Walk',
      category: 'Food',
      description: 'Taste authentic street food in bustling Old Delhi markets.',
      duration: '3 hours',
      price: 20,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
    },
    {
      id: 6,
      name: 'Taj Mahal Sunrise Visit',
      category: 'Heritage',
      description: 'Day trip to the Taj Mahal with sunrise entrance.',
      duration: '8 hours',
      price: 70,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
    },
  ],
  goa: [
    {
      id: 7,
      name: 'Goa Beach Sunset Cruise',
      category: 'Adventure',
      description: 'Enjoy a scenic cruise along Goa’s coastline at sunset.',
      duration: '2 hours',
      price: 40,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=200&fit=crop',
    },
    {
      id: 8,
      name: 'Goa Spice Plantation Visit',
      category: 'Culture',
      description: 'Walk through a spice farm and taste local produce.',
      duration: '4 hours',
      price: 25,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=200&fit=crop',
    },
  ],
  tokyo: [
    {
      id: 9,
      name: 'Tokyo Metro City Tour',
      category: 'City',
      description: 'Ride Tokyo’s famous metro and visit top city districts.',
      duration: '5 hours',
      price: 55,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
    },
    {
      id: 10,
      name: 'Tsukiji Food Market Walk',
      category: 'Food',
      description: 'Sample fresh seafood and Japanese snacks in Tsukiji.',
      duration: '3 hours',
      price: 30,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
    },
  ],
  'new york': [
    {
      id: 11,
      name: 'Central Park Bike Tour',
      category: 'Nature',
      description: 'Explore Central Park by bike with a guided route.',
      duration: '2 hours',
      price: 35,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
    },
    {
      id: 12,
      name: 'Broadway Theater Evening',
      category: 'Entertainment',
      description: 'Enjoy a Broadway show in the Theater District.',
      duration: '3 hours',
      price: 120,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
    },
  ],
  default: [
    {
      id: 13,
      name: 'City Highlights Tour',
      category: 'Culture',
      description: 'A curated tour of the city’s top attractions.',
      duration: '4 hours',
      price: 45,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop',
    },
  ],
};

const destinationTransports = {
  paris: [
    {
      id: 1,
      name: 'RER A Express',
      from: 'Charles de Gaulle',
      to: 'Châtelet-Les Halles',
      departure: '08:30',
      arrival: '09:00',
      duration: '30m',
      price: 15,
      class: 'Train',
      seats: 120,
    },
    {
      id: 2,
      name: 'Paris Metro Line 1',
      from: 'La Défense',
      to: 'Champs-Élysées',
      departure: '10:00',
      arrival: '10:20',
      duration: '20m',
      price: 3,
      class: 'Metro',
      seats: 200,
    },
  ],
  bali: [
    {
      id: 3,
      name: 'Denpasar Airport Shuttle',
      from: 'Ngurah Rai Airport',
      to: 'Kuta',
      departure: '09:00',
      arrival: '09:45',
      duration: '45m',
      price: 10,
      class: 'Shuttle',
      seats: 30,
    },
    {
      id: 4,
      name: 'Ubud Resort Transfer',
      from: 'Denpasar',
      to: 'Ubud',
      departure: '11:00',
      arrival: '12:15',
      duration: '1h 15m',
      price: 12,
      class: 'Bus',
      seats: 40,
    },
  ],
  'new delhi': [
    {
      id: 5,
      name: 'Delhi Metro Yellow Line',
      from: 'Huda City Centre',
      to: 'Shivaji Stadium',
      departure: '08:00',
      arrival: '09:30',
      duration: '90m',
      price: 2,
      class: 'Metro',
      seats: 200,
    },
    {
      id: 6,
      name: 'Airport Express Shuttle',
      from: 'IGI Airport',
      to: 'New Delhi Station',
      departure: '07:30',
      arrival: '08:00',
      duration: '30m',
      price: 7,
      class: 'Train',
      seats: 150,
    },
  ],
  goa: [
    {
      id: 7,
      name: 'Goa Beach Shuttle',
      from: 'Vasco da Gama',
      to: 'Baga Beach',
      departure: '10:00',
      arrival: '11:00',
      duration: '1h',
      price: 8,
      class: 'Bus',
      seats: 40,
    },
  ],
  tokyo: [
    {
      id: 8,
      name: 'Tokyo Metro Ginza Line',
      from: 'Asakusa',
      to: 'Ginza',
      departure: '09:15',
      arrival: '09:40',
      duration: '25m',
      price: 3,
      class: 'Metro',
      seats: 300,
    },
  ],
  'new york': [
    {
      id: 9,
      name: 'Amtrak Northeast Regional',
      from: 'New York Penn',
      to: 'Boston South',
      departure: '08:00',
      arrival: '12:30',
      duration: '4h 30m',
      price: 70,
      class: 'Train',
      seats: 120,
    },
  ],
  default: [
    {
      id: 10,
      name: 'City Shuttle Service',
      from: 'Airport',
      to: 'Downtown',
      departure: '08:00',
      arrival: '08:45',
      duration: '45m',
      price: 15,
      class: 'Shuttle',
      seats: 40,
    },
  ],
};

const mockLocalExperiences = [
  {
    id: 1,
    name: 'Traditional Spice Market Tour',
    category: 'Culture & Food',
    description: 'Experience authentic local markets and learn about traditional spices used in Indian cuisine',
    duration: '2-3 hours',
    price: 25,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1596040708496-cd4628902d4a?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Village Home Cooking Class',
    category: 'Culinary',
    description: 'Cook traditional meals with a local family and learn age-old recipes passed down generations',
    duration: '3-4 hours',
    price: 35,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Temple & Spiritual Heritage Walk',
    category: 'Heritage',
    description: 'Guided tour of sacred temples with insights into architectural heritage and spiritual significance',
    duration: '2-3 hours',
    price: 20,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Rickshaw & Local Life Tour',
    category: 'Adventure',
    description: 'Ride traditional auto-rickshaws through bustling streets and experience authentic local life',
    duration: '1-2 hours',
    price: 15,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
  },
  {
    id: 5,
    name: 'Yoga & Ayurveda Wellness',
    category: 'Wellness',
    description: 'Traditional yoga sessions with Ayurvedic wellness consultations from local practitioners',
    duration: '2 hours',
    price: 30,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop',
  },
  {
    id: 6,
    name: 'Textile & Craft Workshop',
    category: 'Arts & Crafts',
    description: 'Learn traditional textile weaving and handcraft techniques from local artisans',
    duration: '3 hours',
    price: 40,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1578762336906-4a28b79f7889?w=300&h=200&fit=crop',
  },
];

const mockTrains = [
  {
    id: 1,
    name: 'Rajdhani Express',
    from: 'Delhi',
    to: 'Mumbai',
    departure: '22:00',
    arrival: '07:00+1',
    duration: '9h',
    price: 120,
    class: 'AC 1st Class',
    seats: 45,
  },
  {
    id: 2,
    name: 'Shatabdi Express',
    from: 'Delhi',
    to: 'Agra',
    departure: '06:00',
    arrival: '09:00',
    duration: '3h',
    price: 35,
    class: 'AC Chair Car',
    seats: 120,
  },
  {
    id: 3,
    name: 'Howrah Express',
    from: 'Mumbai',
    to: 'Kolkata',
    departure: '15:30',
    arrival: '10:15+1',
    duration: '18h 45m',
    price: 85,
    class: 'AC 2 Tier',
    seats: 200,
  },
];

export const tripPlannerService = {
  getPopularDestinations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDestinations), 500);
    });
  },

  generateItinerary: async (destination, days, interests, budget) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockItinerary(destination, days, interests, budget));
      }, 1500);
    });
  },

  getHotels: async (destination) => {
    const normalized = (destination || '').trim().toLowerCase();
    const hotels = destinationHotels[normalized] || destinationHotels.default;
    return new Promise((resolve) => {
      setTimeout(() => resolve(hotels), 800);
    });
  },

  getRestaurants: async (destination) => {
    const normalized = (destination || '').trim().toLowerCase();
    const restaurants = destinationRestaurants[normalized] || destinationRestaurants.default;
    return new Promise((resolve) => {
      setTimeout(() => resolve(restaurants), 800);
    });
  },

  searchDestination: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockDestinations.filter(
          d => d.name.toLowerCase().includes(query.toLowerCase()) ||
               d.country.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 600);
    });
  },

  getWeatherForecast: async (destination) => {
    return new Promise((resolve) => {
      const forecast = Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        temp: Math.floor(Math.random() * 15) + 20,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 40) + 50,
      }));
      setTimeout(() => resolve(forecast), 600);
    });
  },

  estimateTravelTime: async (from, to) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          flight: `${Math.floor(Math.random() * 10) + 2} hours`,
          train: `${Math.floor(Math.random() * 20) + 8} hours`,
          drive: `${Math.floor(Math.random() * 30) + 10} hours`,
        });
      }, 500);
    });
  },

  getLocalExperiences: async (destination) => {
    const normalized = (destination || '').trim().toLowerCase();
    const experiences = destinationExperiences[normalized] || destinationExperiences.default;
    return new Promise((resolve) => {
      setTimeout(() => resolve(experiences), 800);
    });
  },

  getTrains: async (destination) => {
    const normalized = (destination || '').trim().toLowerCase();
    const transports = destinationTransports[normalized] || destinationTransports.default;
    return new Promise((resolve) => {
      setTimeout(() => resolve(transports), 700);
    });
  },

  bookFlight: async (flightData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          bookingId: `FLIGHT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          message: 'Flight booked successfully!',
          ...flightData,
        });
      }, 1000);
    });
  },

  bookTrain: async (trainData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          bookingId: `TRAIN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          message: 'Train booked successfully!',
          pnr: `${Math.random().toString().substr(2, 10)}`,
          ...trainData,
        });
      }, 1000);
    });
  },

  bookHotel: async (hotelData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          confirmationId: `HOTEL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          message: 'Hotel booked successfully!',
          ...hotelData,
        });
      }, 1000);
    });
  },

  bookExperience: async (experienceData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          ticketId: `EXP${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          message: 'Experience booked successfully!',
          ...experienceData,
        });
      }, 1000);
    });
  },
};
