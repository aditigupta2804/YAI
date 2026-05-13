import { motion } from 'framer-motion';
import { Plane, MapPin, DollarSign, Users, Calendar, Sparkles, IndianRupee } from 'lucide-react';
import { useTripStore } from '../store/store';

const TripPlannerForm = ({ onSubmit }) => {
  const { tripData, setTripData, addInterest, removeInterest } = useTripStore();

  const interests = ['Heritage', 'Adventure', 'Nightlife', 'Food', 'Nature', 'Spiritual', 'Luxury', 'Family'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripData.destination && tripData.budget && tripData.interests.length > 0) {
      onSubmit(tripData);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Destination Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-semibold text-gray-200">Destination *</label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-4 text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Enter destination (e.g., Paris, Tokyo, Bali)"
            value={tripData.destination}
            onChange={(e) => setTripData({ destination: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-dark-card/80 text-white placeholder-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          />
          <motion.div
            animate={{ scaleX: tripData.destination ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"
          />
        </div>
      </motion.div>

      {/* Budget & Duration Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-2"
        >
          <label className="block text-sm font-semibold text-gray-200">Budget *</label>
          <div className="relative group">
            <DollarSign className="absolute left-4 top-4 text-green-400 group-focus-within:text-green-300 transition-colors" size={20} />
            <input
              type="number"
              placeholder="e.g., 2000"
              value={tripData.budget}
              onChange={(e) => setTripData({ budget: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-green-500/30 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:bg-dark-card/80 text-white placeholder-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <motion.div
              animate={{ scaleX: tripData.budget ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-gray-200">Currency</label>
          <div className="relative group">
            {tripData.currency === 'INR' ? (
              <IndianRupee className="absolute left-4 top-4 text-orange-400 group-focus-within:text-orange-300 transition-colors" size={20} />
            ) : (
              <DollarSign className="absolute left-4 top-4 text-green-400 group-focus-within:text-green-300 transition-colors" size={20} />
            )}
            <select
              value={tripData.currency}
              onChange={(e) => setTripData({ currency: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-orange-500/30 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-dark-card/80 text-white transition-all duration-300 shadow-lg hover:shadow-xl appearance-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
            </select>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Duration */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-gray-200">Duration (Days) *</label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-300 transition-colors" size={20} />
            <input
              type="number"
              min="1"
              max="30"
              value={tripData.duration}
              onChange={(e) => setTripData({ duration: parseInt(e.target.value) })}
              className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-dark-card/80 text-white placeholder-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <motion.div
              animate={{ scaleX: tripData.duration ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Travelers Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <label className="block text-sm font-semibold text-gray-200">Number of Travelers</label>
        <div className="relative group">
          <Users className="absolute left-4 top-4 text-pink-400 group-focus-within:text-pink-300 transition-colors" size={20} />
          <input
            type="number"
            min="1"
            max="20"
            value={tripData.travelers}
            onChange={(e) => setTripData({ travelers: parseInt(e.target.value) })}
            className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-pink-500/30 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:bg-dark-card/80 text-white placeholder-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          />
          <motion.div
            animate={{ scaleX: tripData.travelers ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"
          />
        </div>
      </motion.div>

      {/* Interests Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <label className="block text-sm font-semibold text-gray-200">Travel Interests *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map((interest, idx) => (
            <motion.button
              key={interest}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              whileHover={{ scale: 1.08, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                tripData.interests.includes(interest)
                  ? removeInterest(interest)
                  : addInterest(interest)
              }
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                tripData.interests.includes(interest)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-600/50'
                  : 'bg-dark-card/50 border-2 border-gray-600/30 text-gray-300 hover:border-purple-500/50 hover:shadow-lg'
              }`}
            >
              <motion.div
                animate={{ rotate: tripData.interests.includes(interest) ? 360 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
              />
              <span className="relative">{interest}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        disabled={!tripData.destination || !tripData.budget || tripData.interests.length === 0}
        className="relative w-full py-4 px-6 gradient-btn font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg overflow-hidden shadow-xl"
      >
        <motion.div
          animate={{ x: [-400, 400] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sparkles size={20} />
        </motion.div>
        Generate My Perfect Trip
      </motion.button>
    </motion.form>
  );
};

export default TripPlannerForm;
