import { motion } from 'framer-motion';
import { Utensils, DollarSign, Star, ChefHat, IndianRupee } from 'lucide-react';
import { formatPriceWithCurrency, convertCurrency } from '../utils/helpers';

const RestaurantCard = ({ restaurant, onBook, currency = 'USD' }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glassmorphism-enhanced rounded-3xl overflow-hidden group h-full flex flex-col hover-lift"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-600/20 to-red-600/20">
        <motion.img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-2 rounded-full shadow-xl"
        >
          <div className="flex items-center gap-1 text-white font-bold">
            <Star size={16} className="fill-white" />
            {restaurant.rating}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{restaurant.name}</h3>
          <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-600/20 w-fit px-3 py-1.5 rounded-full border border-purple-500/30">
            <ChefHat size={16} className="text-purple-400" />
            <span className="font-medium">{restaurant.cuisine}</span>
          </div>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <Star
                  size={14}
                  className={
                    i < Math.floor(restaurant.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {restaurant.rating}/5
          </span>
        </motion.div>

        <div className="flex-1" /> {/* Spacer */}

        {/* Price & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 pt-4 border-t border-gray-700/50"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-green-400 font-bold text-lg"
          >
            {currency === 'INR' ? (
              <IndianRupee size={18} />
            ) : (
              <DollarSign size={18} />
            )}
            <span>{formatPriceWithCurrency(convertCurrency(restaurant.avgCost, 'USD', currency), currency)}</span>
            <span className="text-xs text-gray-400 font-normal">average</span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook && onBook('restaurant', restaurant)}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
          >
            <motion.div
              animate={{ x: [-300, 300] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
            <span className="relative">Make Reservation</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
