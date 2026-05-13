import { motion } from 'framer-motion';
import { Train, Clock, MapPin, Users, DollarSign, IndianRupee } from 'lucide-react';
import { formatPriceWithCurrency, convertCurrency } from '../utils/helpers';

const TrainCard = ({ train, onBook, currency = 'USD' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="glassmorphism-enhanced rounded-2xl p-5 space-y-4 hover-lift"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Train size={20} className="text-purple-400" />
            <h3 className="text-lg font-bold text-white">{train.name}</h3>
          </div>
          <p className="text-xs text-purple-300">{train.class}</p>
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center"
        >
          <Train size={18} className="text-purple-400" />
        </motion.div>
      </div>

      {/* Route Info */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="text-sm font-bold text-white">{train.from}</p>
          <p className="text-xs text-purple-400">{train.departure}</p>
        </div>
        <div className="flex-1 px-3">
          <div className="h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 relative">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute left-0 top-0 h-full w-2 bg-white rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">{train.duration}</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-sm font-bold text-white">{train.to}</p>
          <p className="text-xs text-pink-400">{train.arrival}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-700/30">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Available Seats</div>
          <div className="flex items-center justify-center gap-1 text-sm font-bold text-green-400">
            <Users size={14} />
            {train.seats}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Price</div>
          <div className="flex items-center justify-center gap-1 text-sm font-bold text-yellow-400">
            {currency === 'INR' ? (
              <IndianRupee size={14} />
            ) : (
              <DollarSign size={14} />
            )}
            {formatPriceWithCurrency(convertCurrency(train.price, 'USD', currency), currency)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Journey</div>
          <p className="text-sm font-bold text-blue-400">{train.duration}</p>
        </div>
      </div>

      {/* Book Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onBook && onBook('train', train)}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold text-sm transition-all hover:shadow-lg"
      >
        Book Train Ticket
      </motion.button>
    </motion.div>
  );
};

export default TrainCard;
