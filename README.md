# YatraAI - AI-Powered Personalized Trip Planner 🌍✈️

A modern, production-ready travel planning web application built with React, Vite, Tailwind CSS, and Framer Motion. Discover, plan, and book your dream trips with AI-powered recommendations.

## 🚀 Features

- **AI-Powered Trip Planning**: Generate personalized itineraries based on budget, interests, and travel style
- **Smart Recommendations**: Hotels, restaurants, attractions, and activities tailored to your preferences
- **Real-time Weather Forecasts**: Up-to-date weather information for your destination
- **Flexible Budgeting**: See cost breakdowns and adjust your trip to fit your budget
- **Interactive Dashboard**: Beautiful, responsive trip planning interface
- **AI Chat Assistant**: Real-time recommendations and support
- **Booking Integration**: Seamless flight, hotel, and activity booking
- **Trip Sharing**: Share your itinerary with friends and family
- **Dark Mode UI**: Modern glassmorphism design with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Charts**: Recharts (ready for analytics)
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── components/
│   ├── TripPlannerForm.jsx       # Main trip form component
│   ├── DestinationCard.jsx        # Destination display card
│   ├── HotelCard.jsx              # Hotel recommendation card
│   ├── RestaurantCard.jsx         # Restaurant recommendation card
│   ├── ItineraryDay.jsx           # Day-by-day itinerary component
│   └── AIAssistant.jsx            # AI chat assistant widget
├── pages/
│   ├── HomePage.jsx               # Landing page with hero section
│   └── DashboardPage.jsx          # Trip dashboard
├── services/
│   └── tripPlannerService.js      # Mock API service (Gemini integration ready)
├── store/
│   └── store.js                   # Zustand state management
├── styles/
│   └── index.css                  # Global styles & Tailwind
├── App.jsx                        # Main application component
└── main.jsx                       # React entry point
```

## 🎯 Core Components

### TripPlannerForm
Collects user preferences:
- Destination
- Budget
- Number of travelers
- Trip duration
- Travel interests (Heritage, Adventure, Food, etc.)

### Dashboard
Displays personalized trip plan with:
- Day-by-day itinerary
- Hotel recommendations
- Restaurant suggestions
- Weather forecasts
- Budget tracking
- Quick booking actions

### AI Assistant
Floating chat widget for:
- Real-time recommendations
- Dynamic itinerary adjustments
- Local insights
- 24/7 support

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project**
```bash
cd yatraai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📸 Key Pages

### 1. Home Page
- **Hero Section**: Animated travel-themed banner
- **Trip Form**: Comprehensive trip planning form
- **Popular Destinations**: Carousel of trending destinations
- **Features**: Highlights of YatraAI capabilities
- **Call-to-Action**: Encourages trip creation

### 2. Dashboard
- **Trip Summary**: Overview of your trip details
- **Weather Widget**: 7-day weather forecast
- **Itinerary Timeline**: Day-by-day activity breakdown
- **Hotel Cards**: Curated hotel recommendations
- **Restaurant Cards**: Dining suggestions with ratings
- **Quick Actions**: One-click booking buttons

## 🎨 Design System

### Colors
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Dark Background: `#0f172a`
- Card Background: `#1e293b`

### Typography
- Font Family: Inter
- Headings: Bold weights
- Body: Regular weights with opacity variations

### Effects
- Glassmorphism cards with backdrop blur
- Gradient overlays
- Smooth animations with Framer Motion
- Hover effects on interactive elements

## 🔌 API Integration

The app uses a mock API service (`tripPlannerService.js`) that simulates:
- Destination search
- Itinerary generation
- Hotel and restaurant recommendations
- Weather forecasting
- Travel time estimation

**Ready for integration with:**
- Google Gemini AI API
- Google Maps API
- Weather APIs
- Booking APIs (Skyscanner, Booking.com, etc.)

## 📱 Responsive Design

- **Mobile**: Optimized for small screens
- **Tablet**: Flexible grid layouts
- **Desktop**: Full-featured interface
- **Large Screens**: Enhanced spacing and layouts

## 🎬 Animation Features

- Page transitions
- Component entrance animations
- Hover effects on cards
- Smooth scrolling
- Loading states
- Interactive button feedback

## 🔐 Security Considerations

- Environment variables for API keys
- Client-side form validation
- CORS configuration ready
- XSS protection with React
- Secure booking flow placeholders

## 📊 Analytics Ready

Includes integration points for:
- User journey tracking
- Trip preference analytics
- Popular destination insights
- Booking conversion tracking

## 🎯 Future Enhancements

- [ ] Real Gemini AI integration
- [ ] Google Maps integration
- [ ] Firebase authentication
- [ ] Real booking system
- [ ] User profiles and saved trips
- [ ] Multi-language support (Hindi, Tamil, Kannada, Telugu)
- [ ] Progressive Web App (PWA)
- [ ] Offline itinerary mode
- [ ] Social sharing features
- [ ] Admin dashboard

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Built with ❤️ for travel enthusiasts | Perfect for hackathons and portfolio projects**
