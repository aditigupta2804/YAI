# YatraAI - API Integration Guide

This guide shows how to integrate real APIs and replace mock data.

## Overview

The application currently uses mock data in `src/services/tripPlannerService.js`. This guide covers integrating:
- Google Gemini AI for itinerary generation
- Google Places API for destinations/locations
- Weather API for forecasts
- Booking APIs for flights/hotels/activities

## 1. Google Gemini AI Integration

### Setup

1. **Get API Key**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create a new API key
   - Store in `.env.local`: `VITE_GEMINI_API_KEY=your_key`

2. **Install Required Package**
   ```bash
   npm install @google/generative-ai
   ```

### Implementation

Replace in `src/services/tripPlannerService.js`:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const tripPlannerService = {
  generateItinerary: async (destination, days, interests, budget) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create a ${days}-day itinerary for ${destination} with budget $${budget}. 
    Interests: ${interests.join(', ')}. 
    Include specific places to visit, restaurants, activities, and estimated costs.
    Return as JSON with day-by-day details.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  },
};
```

## 2. Weather API Integration

### Using OpenWeatherMap

1. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get free API key
   - Add to `.env.local`: `VITE_WEATHER_API_KEY=your_key`

2. **Installation**
   ```bash
   npm install axios
   ```

3. **Implementation**

```javascript
import axios from 'axios';

export const getWeatherForecast = async (destination) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  try {
    // First get coordinates
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${destination}&limit=1&appid=${apiKey}`
    );
    
    if (!geoRes.data.length) return null;
    
    const { lat, lon } = geoRes.data[0];
    
    // Then get weather forecast
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    
    return weatherRes.data.list.slice(0, 8).map(item => ({
      day: Math.ceil(item.dt / 86400),
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
      humidity: item.main.humidity,
    }));
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};
```

## 3. Google Places API

### Setup

1. **Enable API**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Places API and Maps API
   - Create API key

2. **Add to `.env.local`**
   ```
   VITE_GOOGLE_PLACES_API_KEY=your_key
   VITE_GOOGLE_MAPS_API_KEY=your_key
   ```

3. **Install Package**
   ```bash
   npm install @googlemaps/js-api-loader
   ```

### Search Destinations

```javascript
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  version: "weekly",
  libraries: ["places"]
});

export const searchDestinations = async (query) => {
  const google = await loader.load();
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  
  return new Promise((resolve, reject) => {
    const request = {
      query: query,
      type: 'tourist_attraction'
    };
    
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
};
```

## 4. Hotel Booking Integration

### Using Booking.com API

1. **Get Affiliate ID**
   - Sign up at [Booking Affiliate](https://affiliate.booking.com/)
   - Get API credentials

2. **Hotel Search Implementation**

```javascript
import axios from 'axios';

const bookingAPI = axios.create({
  baseURL: 'https://api.booking.com/v2',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_BOOKING_API_KEY}`
  }
});

export const searchHotels = async (destination, checkIn, checkOut, guests) => {
  try {
    const response = await bookingAPI.get('/accommodations', {
      params: {
        name: destination,
        arrival_date: checkIn,
        departure_date: checkOut,
        guests: guests,
        sort_by: 'popularity',
        limit: 10
      }
    });
    
    return response.data.results.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      rating: hotel.review_score,
      pricePerNight: hotel.price_for_stay,
      image: hotel.photo_url,
      reviews: hotel.review_count,
      amenities: hotel.facilities,
      bookingUrl: hotel.url
    }));
  } catch (error) {
    console.error('Hotel Search Error:', error);
    return [];
  }
};
```

## 5. Flight Search Integration

### Using Skyscanner API

1. **Get API Key**
   - Visit [Skyscanner API](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
   - Get RapidAPI key

2. **Flight Search**

```javascript
import axios from 'axios';

const skyscannerAPI = axios.create({
  baseURL: 'https://skyscanner44.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
  }
});

export const searchFlights = async (origin, destination, departDate, returnDate) => {
  try {
    const response = await skyscannerAPI.get('/searchFlights', {
      params: {
        origin,
        destination,
        departDate,
        returnDate,
        currency: 'USD'
      }
    });
    
    return response.data.itineraries.map(flight => ({
      id: flight.id,
      price: flight.price.raw,
      departure: flight.legs[0].departure,
      arrival: flight.legs[0].arrival,
      airline: flight.legs[0].carriers[0].name,
      duration: flight.legs[0].duration,
      stops: flight.legs[0].stops
    }));
  } catch (error) {
    console.error('Flight Search Error:', error);
    return [];
  }
};
```

## 6. Restaurant Data Integration

### Using Yelp API

1. **Get API Key**
   - Sign up at [Yelp Developers](https://www.yelp.com/developers)
   - Create app and get API key

2. **Restaurant Search**

```javascript
import axios from 'axios';

const yelpAPI = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_YELP_API_KEY}`
  }
});

export const searchRestaurants = async (location, cuisine = '', limit = 10) => {
  try {
    const response = await yelpAPI.get('/businesses/search', {
      params: {
        location,
        categories: cuisine,
        sort_by: 'rating',
        limit
      }
    });
    
    return response.data.businesses.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.categories[0].title,
      rating: restaurant.rating,
      avgCost: restaurant.price ? restaurant.price.length * 10 : 25,
      image: restaurant.image_url,
      address: restaurant.location.address1,
      phone: restaurant.phone,
      url: restaurant.url
    }));
  } catch (error) {
    console.error('Restaurant Search Error:', error);
    return [];
  }
};
```

## 7. Database Integration

### Using Firebase Firestore

1. **Setup Firebase**
   ```bash
   npm install firebase
   ```

2. **Initialize Firebase**

Create `src/services/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

3. **Save Trip to Database**

```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export const saveTrip = async (tripData) => {
  try {
    const user = auth.currentUser;
    
    const docRef = await addDoc(collection(db, 'trips'), {
      ...tripData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Save Trip Error:', error);
    throw error;
  }
};
```

## 8. Environment Variables Template

Update `.env.local`:

```
# APIs
VITE_GEMINI_API_KEY=your_key
VITE_WEATHER_API_KEY=your_key
VITE_GOOGLE_PLACES_API_KEY=your_key
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_BOOKING_API_KEY=your_key
VITE_RAPIDAPI_KEY=your_key
VITE_YELP_API_KEY=your_key

# Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id

# Feature Flags
VITE_ENABLE_REAL_APIs=true
VITE_API_BASE_URL=https://api.example.com
```

## 9. Error Handling

Add error handling wrapper:

```javascript
export const withErrorHandling = async (apiCall, fallback = null) => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response?.status === 429) {
      // Rate limited
      console.warn('Rate limited, retrying in 60 seconds');
    }
    
    return fallback;
  }
};

// Usage
const hotels = await withErrorHandling(
  () => searchHotels(...),
  mockHotels // fallback
);
```

## 10. Testing API Integration

```javascript
// Test API connectivity
async function testAPIs() {
  try {
    const weather = await getWeatherForecast('London');
    console.log('Weather API ✓', weather);
    
    const hotels = await searchHotels('London', '2024-06-01', '2024-06-05', 2);
    console.log('Hotel API ✓', hotels);
    
    const flights = await searchFlights('NYC', 'LON', '2024-06-01', '2024-06-05');
    console.log('Flight API ✓', flights);
  } catch (error) {
    console.error('API Test Failed:', error);
  }
}

// Call in development
if (import.meta.env.DEV) {
  testAPIs();
}
```

## Next Steps

1. Choose which APIs to integrate first
2. Get API keys and credentials
3. Update `.env.local` with keys
4. Replace mock functions in `tripPlannerService.js`
5. Test thoroughly with real data
6. Handle errors and edge cases
7. Implement caching if needed
8. Monitor API usage and costs

## Resources

- [Google Generative AI](https://developers.generativeai.google/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Places API](https://developers.google.com/maps/documentation/places)
- [Booking.com API](https://booking-xml.github.io/)
- [Skyscanner API](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
- [Yelp API](https://www.yelp.com/developers/documentation)
- [Firebase Documentation](https://firebase.google.com/docs)

Good luck with integration! 🚀
