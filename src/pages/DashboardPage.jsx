import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTripStore, useItineraryStore } from '../store/store';
import { tripPlannerService } from '../services/tripPlannerService';
import { formatPriceWithCurrency, convertCurrency } from '../utils/helpers';
import ItineraryDay from '../components/ItineraryDay';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import LocalExperienceCard from '../components/LocalExperienceCard';
import TrainCard from '../components/TrainCard';
import BookingModal from '../components/BookingModal';
import { ArrowLeft, Download, Share2, MapPin, DollarSign, Calendar, Users, Cloud, Zap, Plane, Train, IndianRupee } from 'lucide-react';

const DashboardPage = ({ onBack }) => {
  const tripData = useTripStore((state) => state.tripData);
  const itinerary = useItineraryStore((state) => state.itinerary);
  const setItinerary = useItineraryStore((state) => state.setItinerary);
  
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [trains, setTrains] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [bookingModal, setBookingModal] = useState({ isOpen: false, type: '', title: '' });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Generate itinerary
        const itineraryData = await tripPlannerService.generateItinerary(
          tripData.destination,
          tripData.duration,
          tripData.interests,
          tripData.budget
        );
        setItinerary(itineraryData);

        // Fetch all supporting data in parallel
        const [hotelsData, restaurantsData, weatherData, experiencesData, trainsData] = await Promise.all([
          tripPlannerService.getHotels(),
          tripPlannerService.getRestaurants(),
          tripPlannerService.getWeatherForecast(tripData.destination),
          tripPlannerService.getLocalExperiences(),
          tripPlannerService.getTrains(tripData.destination, ''),
        ]);

        setHotels(hotelsData);
        setRestaurants(restaurantsData);
        setWeather(weatherData);
        setExperiences(experiencesData);
        setTrains(trainsData);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [tripData, setItinerary]);

  const totalCost = itinerary.reduce((sum, day) => sum + parseFloat(day.estimatedCost || 0), 0);

  const handleQuickAction = (type) => {
    if (type === 'flight') {
      setBookingModal({ isOpen: true, type: 'flight', title: 'Book Flight' });
    } else if (type === 'hotel') {
      setBookingModal({ isOpen: true, type: 'hotel', title: 'Book Hotel' });
    } else if (type === 'train') {
      setBookingModal({ isOpen: true, type: 'train', title: 'Book Train' });
    }
  };

  const handleBooking = (bookingType, data) => {
    if (bookingType === 'restaurant') {
      setBookingModal({ isOpen: true, type: 'restaurant', title: 'Make Reservation' });
    } else if (bookingType === 'experience') {
      setBookingModal({ isOpen: true, type: 'experience', title: 'Book Experience' });
    } else if (bookingType === 'hotel') {
      setBookingModal({ isOpen: true, type: 'hotel', title: 'Book Hotel' });
    } else if (bookingType === 'train') {
      setBookingModal({ isOpen: true, type: 'train', title: 'Book Train' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-purple-900/20">
      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, type: '', title: '' })}
        type={bookingModal.type}
        title={bookingModal.title}
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-dark-card/80 backdrop-blur-md border-b border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-purple-400" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-white">{tripData.destination}</h1>
              <p className="text-gray-400">{tripData.duration} days • {tripData.travelers} traveler(s)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium"
            >
              <Download size={18} />
              Download PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
            >
              <Share2 size={18} />
              Share
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trip Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism-enhanced rounded-3xl p-6 space-y-4"
              >
                <h3 className="text-lg font-bold text-white">Trip Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-blue-400" />
                    <span>{tripData.destination}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={18} className="text-purple-400" />
                    <span>{tripData.duration} Days</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users size={18} className="text-pink-400" />
                    <span>{tripData.travelers} Travelers</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    {tripData.currency === 'INR' ? (
                      <IndianRupee size={18} className="text-orange-400" />
                    ) : (
                      <DollarSign size={18} className="text-green-400" />
                    )}
                    <span>{formatPriceWithCurrency(tripData.budget, tripData.currency)} Budget</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Total Estimated Cost</p>
                  <p className="text-2xl font-bold text-green-400">{formatPriceWithCurrency(totalCost.toFixed(0), tripData.currency)}</p>
                </div>
              </motion.div>

              {/* Weather Forecast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glassmorphism-enhanced rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Cloud size={20} className="text-cyan-400" />
                  Weather
                </h3>
                <div className="space-y-2">
                  {weather.slice(0, 3).map((w) => (
                    <motion.div
                      key={w.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * w.day }}
                      className="flex items-center justify-between p-2 bg-dark-card/50 rounded-lg"
                    >
                      <span className="text-sm text-gray-300">Day {w.day}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{w.temp}°C</p>
                        <p className="text-xs text-gray-400">{w.condition}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glassmorphism-enhanced rounded-3xl p-6 space-y-3"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-400" />
                  Quick Book
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction('flight')}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Plane size={16} />
                  Book Flights
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction('train')}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Train size={16} />
                  Book Trains
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction('hotel')}
                  className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                >
                  🏨 Book Hotels
                </motion.button>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              {/* Itinerary Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">📅 Your Itinerary</h2>
                <div className="space-y-4">
                  {itinerary.map((day) => (
                    <ItineraryDay
                      key={day.day}
                      day={day.day}
                      activities={day.activities}
                      estimatedCost={day.estimatedCost}
                      meals={day.meals}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Hotels Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">🏨 Recommended Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onBook={handleBooking}
                      currency={tripData.currency}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Trains Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">🚂 Train Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trains.map((train) => (
                    <TrainCard
                      key={train.id}
                      train={train}
                      onBook={handleBooking}
                      currency={tripData.currency}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Restaurants Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">🍽️ Restaurant Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onBook={handleBooking}
                      currency={tripData.currency}
                    />
                  ))}
                </div>
              </motion.section>
              {/* Local Experiences Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">✨ Local Experiences (Indian Culture)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.map((experience) => (
                    <LocalExperienceCard
                      key={experience.id}
                      experience={experience}
                      onBook={handleBooking}
                      currency={tripData.currency}
                    />
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
