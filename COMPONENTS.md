# YatraAI Component Documentation

## Overview
This document provides a comprehensive guide to all components in the YatraAI application.

## Components

### 1. TripPlannerForm
**Location**: `src/components/TripPlannerForm.jsx`

**Purpose**: Main form for collecting trip preferences

**Props**:
- `onSubmit` (function): Called when form is submitted

**Features**:
- Destination input with MapPin icon
- Budget selector with DollarSign icon
- Duration input with Calendar icon
- Travelers count selector
- 8 interest categories (Heritage, Adventure, Nightlife, Food, Nature, Spiritual, Luxury, Family)
- Form validation
- Submit button with Sparkles icon

**State Management**:
- Uses `useTripStore` from Zustand
- Manages: destination, budget, travelers, duration, interests

**Example Usage**:
```jsx
<TripPlannerForm onSubmit={(data) => console.log(data)} />
```

---

### 2. DestinationCard
**Location**: `src/components/DestinationCard.jsx`

**Purpose**: Display destination information with image and rating

**Props**:
- `destination` (object): Destination data
- `onSelect` (function): Called when card is clicked

**Destination Object**:
```javascript
{
  id: number,
  name: string,
  country: string,
  image: string,
  rating: number,
  reviews: number
}
```

**Features**:
- Background image with hover zoom effect
- Gradient overlay
- Star rating display
- Review count
- Smooth animations

**Example Usage**:
```jsx
<DestinationCard 
  destination={destinationData}
  onSelect={handleSelect}
/>
```

---

### 3. HotelCard
**Location**: `src/components/HotelCard.jsx`

**Purpose**: Display hotel recommendations

**Props**:
- `hotel` (object): Hotel data

**Hotel Object**:
```javascript
{
  id: number,
  name: string,
  rating: number,
  pricePerNight: number,
  image: string,
  reviews: number,
  amenities: array
}
```

**Features**:
- Hotel image with rating badge
- Amenity icons (WiFi, Pool, Gym, Restaurant)
- Price display
- Book Now button
- Hover animations

**Example Usage**:
```jsx
<HotelCard hotel={hotelData} />
```

---

### 4. RestaurantCard
**Location**: `src/components/RestaurantCard.jsx`

**Purpose**: Display restaurant recommendations

**Props**:
- `restaurant` (object): Restaurant data

**Restaurant Object**:
```javascript
{
  id: number,
  name: string,
  cuisine: string,
  rating: number,
  avgCost: number,
  image: string
}
```

**Features**:
- Restaurant image with zoom effect
- Cuisine type
- Star rating
- Average cost display
- Make Reservation button

**Example Usage**:
```jsx
<RestaurantCard restaurant={restaurantData} />
```

---

### 5. ItineraryDay
**Location**: `src/components/ItineraryDay.jsx`

**Purpose**: Display day-by-day itinerary details

**Props**:
- `day` (number): Day number
- `activities` (array): List of activities
- `estimatedCost` (string): Daily cost estimate
- `meals` (array): Meals included

**Features**:
- Staggered animation for activities
- Activity icons and descriptions
- Daily cost breakdown
- Meal display with badges
- Responsive layout

**Example Usage**:
```jsx
<ItineraryDay
  day={1}
  activities={['Museum Tour', 'Lunch']}
  estimatedCost="150"
  meals={['Breakfast', 'Lunch', 'Dinner']}
/>
```

---

### 6. AIAssistant
**Location**: `src/components/AIAssistant.jsx`

**Purpose**: Floating AI chat widget

**Props**:
- `isOpen` (boolean): Show/hide chat
- `onClose` (function): Called when chat is closed

**Features**:
- Message history
- User and AI messages distinction
- Typing input
- Send button
- Microphone button (UI)
- Plus button for attachments
- Smooth open/close animations
- Scrollable message area

**Example Usage**:
```jsx
const [chatOpen, setChatOpen] = useState(false);
<AIAssistant isOpen={chatOpen} onClose={() => setChatOpen(false)} />
```

---

## Page Components

### HomePage
**Location**: `src/pages/HomePage.jsx`

**Purpose**: Landing page with trip planning form

**Sections**:
1. **Hero Section**: Animated background, title, form
2. **Popular Destinations**: Grid of destination cards
3. **Features**: Highlights of the platform
4. **CTA Section**: Call-to-action for trip creation

**Features**:
- Animated background elements
- Loading state for destinations
- Responsive grid layout
- Smooth scroll animations

---

### DashboardPage
**Location**: `src/pages/DashboardPage.jsx`

**Purpose**: Trip planning dashboard

**Sections**:
1. **Header**: Back button, trip title, download/share
2. **Left Sidebar**:
   - Trip summary (destination, duration, budget)
   - 7-day weather forecast
   - Quick action buttons
3. **Main Content**:
   - Day-by-day itinerary
   - Hotel recommendations
   - Restaurant suggestions

**Features**:
- Real-time data loading
- Cost calculation
- Sticky header
- Responsive two-column layout

---

## State Management

### useTripStore
**Location**: `src/store/store.js`

**State**:
```javascript
{
  tripData: {
    destination: string,
    budget: string,
    travelers: number,
    duration: number,
    interests: array,
    startDate: string
  }
}
```

**Methods**:
- `setTripData(data)`: Update trip data
- `addInterest(interest)`: Add interest
- `removeInterest(interest)`: Remove interest
- `resetTripData()`: Clear all data

---

### useItineraryStore
**Location**: `src/store/store.js`

**State**:
```javascript
{
  itinerary: array,
  loading: boolean,
  error: null | string
}
```

**Methods**:
- `setItinerary(itinerary)`: Set itinerary data
- `setLoading(loading)`: Update loading state
- `setError(error)`: Set error message
- `clearItinerary()`: Clear itinerary data

---

### useUIStore
**Location**: `src/store/store.js`

**State**:
```javascript
{
  darkMode: boolean,
  sidebarOpen: boolean,
  chatOpen: boolean
}
```

**Methods**:
- `toggleDarkMode()`: Toggle dark/light mode
- `setSidebarOpen(open)`: Control sidebar
- `setChatOpen(open)`: Control chat widget

---

## Services

### tripPlannerService
**Location**: `src/services/tripPlannerService.js`

**Methods**:

#### getPopularDestinations()
Returns popular travel destinations
```javascript
const destinations = await tripPlannerService.getPopularDestinations();
```

#### generateItinerary(destination, days, interests, budget)
Generates a personalized itinerary
```javascript
const itinerary = await tripPlannerService.generateItinerary(
  'Paris',
  5,
  ['Heritage', 'Food'],
  2000
);
```

#### getHotels()
Returns hotel recommendations
```javascript
const hotels = await tripPlannerService.getHotels();
```

#### getRestaurants()
Returns restaurant recommendations
```javascript
const restaurants = await tripPlannerService.getRestaurants();
```

#### searchDestination(query)
Searches destinations by name
```javascript
const results = await tripPlannerService.searchDestination('Paris');
```

#### getWeatherForecast(destination)
Gets 7-day weather forecast
```javascript
const weather = await tripPlannerService.getWeatherForecast('Paris');
```

#### estimateTravelTime(from, to)
Estimates travel time between locations
```javascript
const times = await tripPlannerService.estimateTravelTime('NYC', 'LA');
```

---

## Utility Functions

### helpers.js
**Location**: `src/utils/helpers.js`

Available functions:
- `formatCurrency(amount, currency)`: Format amount to currency string
- `calculateTotalCost(days, dailyCost, travelers)`: Calculate total trip cost
- `formatDate(date)`: Format date to readable string
- `calculateDaysBetween(startDate, endDate)`: Get days between dates
- `getRating(rating)`: Normalize rating to 0-5
- `getInitials(name)`: Get name initials
- `truncateText(text, maxLength)`: Truncate long text
- `generateUUID()`: Generate unique ID
- `debounce(func, wait)`: Debounce function
- `getWeatherEmoji(condition)`: Get emoji for weather condition

---

## Styling

### Tailwind Classes
Custom Tailwind utilities in `src/styles/index.css`:

```css
.glassmorphism {} /* Card styling with backdrop blur */
.gradient-text {} /* Gradient text effect */
.gradient-btn {} /* Gradient button styling */
.card-hover {} /* Hover effects for cards */
.smooth-scroll {} /* Smooth scrolling */
```

### Color Palette
```javascript
primary: #3b82f6    // Blue
secondary: #8b5cf6  // Purple
accent: #ec4899     // Pink
dark-bg: #0f172a    // Dark background
dark-card: #1e293b  // Card background
```

---

## Icons Used
All icons from **Lucide React**:
- Plane, MapPin, DollarSign, Users, Calendar
- Star, Cloud, Zap, Download, Share2
- Send, Mic, Plus, X, ArrowLeft, MessageCircle
- Wifi, Waves, Dumbbell, UtensilsCrossed, Utensils

---

## Animation Patterns

### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

### Slide Up
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

### Stagger Children
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="show"
>
  {children}
</motion.div>
```

---

## Best Practices

1. **Always use Zustand hooks** for state management
2. **Keep components small** and focused
3. **Use Framer Motion** for all animations
4. **Follow responsive design** with Tailwind breakpoints
5. **Mock data** before API integration
6. **Add loading states** for async operations
7. **Validate form inputs** before submission
8. **Use semantic HTML** for accessibility

---

For more details, refer to individual component files and inline comments.
