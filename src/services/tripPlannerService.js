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
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9f1?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 1892,
  },
  {
    id: 3,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 1654,
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 3021,
  },
];

const mockItinerary = (destination, days, interests, budget) => {
  const activities = {
    Heritage: ['Museum Tour', 'Historical Walking Tour', 'Ancient Monuments', 'Local History Museum'],
    Adventure: ['Hiking', 'Rock Climbing', 'Paragliding', 'Water Sports'],
    Nightlife: ['Bar Hopping', 'Nightclub Experience', 'Live Music', 'Casino Night'],
    Food: ['Street Food Tour', 'Cooking Class', 'Food Market Visit', 'Fine Dining'],
    Nature: ['Park Exploration', 'Hiking Trail', 'Wildlife Sanctuary', 'Nature Photography'],
    Spiritual: ['Temple Visit', 'Meditation Retreat', 'Yoga Class', 'Sacred Site Tour'],
    Luxury: ['Spa Treatment', 'Fine Dining', 'Luxury Shopping', 'Private Tours'],
    Family: ['Theme Park', 'Zoo Visit', 'Family Restaurant', 'Kids Activity Center'],
  };

  const itinerary = [];
  for (let i = 1; i <= parseInt(days); i++) {
    const dayActivities = interests
      .slice(0, 3)
      .flatMap(interest => activities[interest] || [])
      .slice(0, 3);
    
    itinerary.push({
      day: i,
      title: `Day ${i} - ${destination}`,
      activities: dayActivities,
      estimatedCost: (parseInt(budget) / parseInt(days)).toFixed(2),
      meals: ['Breakfast', 'Lunch', 'Dinner'],
    });
  }
  return itinerary;
};

const mockHotels = [
  {
    id: 1,
    name: 'Luxury Plaza Hotel',
    rating: 4.8,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop',
    reviews: 1203,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
  },
  {
    id: 2,
    name: 'Budget Comfort Inn',
    rating: 4.2,
    pricePerNight: 45,
    image: 'https://images.unsplash.com/photo-1520609089903-988627b72eae?w=300&h=200&fit=crop',
    reviews: 892,
    amenities: ['WiFi', 'Breakfast', 'Front Desk'],
  },
  {
    id: 3,
    name: 'Mid-Range Paradise Resort',
    rating: 4.5,
    pricePerNight: 85,
    image: 'https://images.unsplash.com/photo-1566611593682-dea778067b91?w=300&h=200&fit=crop',
    reviews: 1645,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
  },
];

const mockRestaurants = [
  {
    id: 1,
    name: 'Michelin Star Bistro',
    cuisine: 'French',
    rating: 4.9,
    avgCost: 120,
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Street Food Paradise',
    cuisine: 'Local',
    rating: 4.6,
    avgCost: 15,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561029?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Asian Fusion Kitchen',
    cuisine: 'Asian',
    rating: 4.7,
    avgCost: 35,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
  },
];

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

  getHotels: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockHotels), 800);
    });
  },

  getRestaurants: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRestaurants), 800);
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

  getLocalExperiences: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLocalExperiences), 800);
    });
  },

  getTrains: async (from, to) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTrains = mockTrains.filter(
          train => train.from.toLowerCase().includes(from?.toLowerCase()) &&
                   train.to.toLowerCase().includes(to?.toLowerCase())
        );
        resolve(filteredTrains.length > 0 ? filteredTrains : mockTrains);
      }, 700);
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
