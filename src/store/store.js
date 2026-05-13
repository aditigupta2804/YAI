import { create } from 'zustand';

export const useTripStore = create((set) => ({
  tripData: {
    destination: '',
    budget: '',
    travelers: 1,
    duration: 3,
    interests: [],
    startDate: '',
    currency: 'USD', // USD or INR
  },
  
  setTripData: (data) => set((state) => ({
    tripData: { ...state.tripData, ...data },
  })),
  
  addInterest: (interest) => set((state) => ({
    tripData: {
      ...state.tripData,
      interests: [...state.tripData.interests, interest],
    },
  })),
  
  removeInterest: (interest) => set((state) => ({
    tripData: {
      ...state.tripData,
      interests: state.tripData.interests.filter(i => i !== interest),
    },
  })),
  
  resetTripData: () => set({
    tripData: {
      destination: '',
      budget: '',
      travelers: 1,
      duration: 3,
      interests: [],
      startDate: '',
    },
  }),
}));

export const useItineraryStore = create((set) => ({
  itinerary: [],
  loading: false,
  error: null,
  
  setItinerary: (itinerary) => set({ itinerary }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearItinerary: () => set({ itinerary: [], error: null }),
}));

export const useUIStore = create((set) => ({
  darkMode: true,
  sidebarOpen: false,
  chatOpen: false,
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setChatOpen: (open) => set({ chatOpen: open }),
}));
