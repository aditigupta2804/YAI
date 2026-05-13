import { motion } from 'framer-motion';
import { Wifi, Waves, Dumbbell, UtensilsCrossed, Star, DollarSign, MapPin, IndianRupee } from 'lucide-react';
import { formatPriceWithCurrency, convertCurrency } from '../utils/helpers';

const HotelCard = ({ hotel, onBook, currency = 'USD' }) => {
  const amenityIcons = {
    WiFi: <Wifi size={16} />,
    Pool: <Waves size={16} />,
    Gym: <Dumbbell size={16} />,
    Restaurant: <UtensilsCrossed size={16} />,
    Breakfast: <UtensilsCrossed size={16} />,
    'Front Desk': <Wifi size={16} />,
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glassmorphism-enhanced rounded-3xl overflow-hidden group h-full flex flex-col hover-lift"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
        <motion.img
          src={hotel.image}
          alt={hotel.name}
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
            {hotel.rating}
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
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={12} />
            <span>{hotel.reviews} verified reviews</span>
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <motion.div
              key={amenity}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-3 py-1.5 rounded-full text-xs text-gray-300 hover:border-purple-500/60 transition-all"
            >
              <span className="text-purple-400">{amenityIcons[amenity] || <Wifi size={14} />}</span>
              <span>{amenity}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex-1" /> {/* Spacer */}

        {/* Price & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between pt-4 border-t border-gray-700/50"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 text-green-400 font-bold text-lg"
          >
            {currency === 'INR' ? (
              <IndianRupee size={18} />
            ) : (
              <DollarSign size={18} />
            )}
            <span>{formatPriceWithCurrency(convertCurrency(hotel.pricePerNight, 'USD', currency), currency)}</span>
            <span className="text-xs text-gray-400 font-normal">/night</span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook && onBook('hotel', hotel)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg font-bold transition-all duration-300 hover:shadow-lg"
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
