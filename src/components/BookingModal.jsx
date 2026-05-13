import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Users, MapPin, Plane, Train } from 'lucide-react';
import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, type, title }) => {
  const [formData, setFormData] = useState({
    passengers: 1,
    date: '',
    from: '',
    to: '',
    class: 'economy'
  });

  const [booked, setBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      onClose();
      setBooked(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-4 glassmorphism-enhanced rounded-3xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {type === 'flight' && <Plane size={24} className="text-blue-400" />}
                {type === 'train' && <Train size={24} className="text-purple-400" />}
                {type === 'hotel' && <MapPin size={24} className="text-pink-400" />}
                {title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-red-600/30 rounded-lg"
              >
                <X size={20} className="text-red-400" />
              </motion.button>
            </div>

            {booked ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Check size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-gray-300">Your {type} has been successfully booked.</p>
                <p className="text-sm text-gray-400">Confirmation details will be sent to your email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Passengers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Passengers</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-3 text-purple-400" />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 bg-dark-card/70 border border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Travel Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-3 text-blue-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-dark-card/70 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-500 text-white"
                      required
                    />
                  </div>
                </div>

                {/* From - To */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-2">From</label>
                    <input
                      type="text"
                      placeholder="Departure"
                      value={formData.from}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card/70 border border-gray-600/30 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-2">To</label>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={formData.to}
                      onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-card/70 border border-gray-600/30 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Class Selection */}
                {type === 'flight' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Class</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['economy', 'business', 'first'].map((cls) => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setFormData({ ...formData, class: cls })}
                          className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all ${
                            formData.class === cls
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-dark-card/50 border border-gray-600/30 text-gray-300 hover:border-blue-500/50'
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold mt-6 hover:shadow-lg"
                >
                  Confirm Booking
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
