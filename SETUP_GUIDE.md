# YatraAI Setup Guide

## ✅ Project Initialization Complete!

Your YatraAI project has been successfully created and is ready to run. Follow the steps below to get started.

## 🚀 Quick Start (Development)

### Step 1: Navigate to Project Directory
```bash
cd c:\Users\ankit\OneDrive\Desktop\hackathon\yatraai
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5173/**

### Step 3: Open in Browser
Visit the URL above to see your YatraAI application in action!

## 📦 Project Structure

```
yatraai/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── TripPlannerForm.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── HotelCard.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── ItineraryDay.jsx
│   │   └── AIAssistant.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx     # Landing page
│   │   └── DashboardPage.jsx # Trip dashboard
│   ├── services/           # API and data services
│   │   └── tripPlannerService.js
│   ├── store/              # State management
│   │   └── store.js        # Zustand stores
│   ├── utils/              # Utility functions
│   │   └── helpers.js
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Documentation
```

## 🎯 Key Features Implemented

### ✅ Home Page
- [x] Animated hero section with gradient overlays
- [x] Trip planner form with all inputs
- [x] Popular destinations carousel
- [x] Feature highlights
- [x] Call-to-action section
- [x] Responsive footer

### ✅ Trip Planner Form
- [x] Destination search input
- [x] Budget selector
- [x] Travelers count
- [x] Trip duration
- [x] 8 travel interest categories
- [x] Form validation

### ✅ Dashboard Page
- [x] Trip summary widget
- [x] Weather forecast (7-day)
- [x] Day-by-day itinerary
- [x] Hotel recommendations (3 cards)
- [x] Restaurant suggestions
- [x] Quick booking actions
- [x] Download & Share options

### ✅ AI Assistant
- [x] Floating chat widget
- [x] Message history
- [x] AI response simulation
- [x] Voice input button (UI)
- [x] Microphone integration ready

### ✅ UI/UX Elements
- [x] Glassmorphism design
- [x] Smooth animations (Framer Motion)
- [x] Responsive grid layouts
- [x] Dark mode theme
- [x] Gradient text and buttons
- [x] Hover effects and interactions
- [x] Loading states
- [x] Card animations

## 🔧 Available Commands

### Development
```bash
npm run dev       # Start development server (http://localhost:5173)
```

### Production
```bash
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## 📝 Customization Guide

### 1. Update Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'primary': '#3b82f6',      // Change primary color
  'secondary': '#8b5cf6',    // Change secondary color
  'accent': '#ec4899',       // Change accent color
}
```

### 2. Add New Destinations
Edit `src/services/tripPlannerService.js`:
```javascript
const mockDestinations = [
  // Add your destinations here
];
```

### 3. Customize Brand Name
Search and replace "YatraAI" with your brand name:
- `src/App.jsx`
- `index.html`
- `README.md`

### 4. Add Real API Integration
Update `src/services/tripPlannerService.js`:
```javascript
// Replace mock data with actual API calls
export const tripPlannerService = {
  generateItinerary: async (destination, days, interests, budget) => {
    const response = await axios.post('/api/generate-itinerary', {
      destination, days, interests, budget
    });
    return response.data;
  },
  // ... other methods
};
```

## 🌐 Environment Variables

Create a `.env.local` file in the project root:
```
VITE_API_BASE_URL=http://localhost:3000
VITE_GEMINI_API_KEY=your_api_key_here
VITE_ENABLE_BOOKING=true
```

Access in components:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

Tailwind CSS handles responsive design automatically using `sm:`, `md:`, `lg:` prefixes.

## 🎨 Customizing Animations

All animations use Framer Motion. Examples:

```javascript
// Simple fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// Slide and fade
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

## 🔗 Adding New Pages

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Import and use:
```javascript
import NewPage from './pages/NewPage';

// In App.jsx
{currentPage === 'newpage' && <NewPage />}
```

## 🎯 Common Tasks

### Change Primary Brand Color
1. Open `tailwind.config.js`
2. Update `primary` color
3. Restart dev server

### Add New Form Field
1. Edit `src/components/TripPlannerForm.jsx`
2. Add to `useTripStore` in `src/store/store.js`
3. Include in form submission

### Customize Card Design
1. Edit `src/components/[Card].jsx`
2. Modify Tailwind classes
3. Adjust shadows and colors

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Deploy dist folder to GitHub Pages
```

## 🧪 Testing

Add testing libraries:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Create test files next to components:
```
Component.jsx
Component.test.jsx
```

## 📚 Learning Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Zustand**: https://github.com/pmndrs/zustand

## ⚙️ Performance Optimization

1. **Code Splitting**: Vite handles automatically
2. **Image Optimization**: Use Unsplash/Pexels for images
3. **Bundle Analysis**:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Module Not Found Error
```bash
rm -rf node_modules
npm install
```

### Tailwind Not Applying
1. Ensure `src/styles/index.css` is imported in `App.jsx`
2. Check `tailwind.config.js` content paths
3. Restart dev server

## 📞 Support

For issues or questions:
1. Check the [README.md](README.md)
2. Review component documentation in code comments
3. Check [Vite docs](https://vitejs.dev)
4. Check [React docs](https://react.dev)

## 🎉 You're All Set!

Your YatraAI application is ready to use. Start the dev server with `npm run dev` and begin building!

**Happy coding! ✈️🌍**
