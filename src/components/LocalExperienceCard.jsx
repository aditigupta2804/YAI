import { motion } from 'framer-motion';
import { MapPin, Users, Clock, DollarSign, Heart, Share2, IndianRupee } from 'lucide-react';
import { formatPriceWithCurrency, convertCurrency } from '../utils/helpers';

const LocalExperienceCard = ({ experience, onBook, currency = 'USD' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="glassmorphism-enhanced rounded-3xl overflow-hidden group h-full flex flex-col hover-lift"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-600/20 to-red-600/20">
        <motion.img
          src={experience.image}
          alt={experience.name}
          className="w-full h-full object-cover"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1.5 rounded-full shadow-lg"
        >
          <span className="text-xs font-bold text-white">⭐ Local</span>
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
          <h3 className="text-xl font-bold text-white line-clamp-2">{experience.name}</h3>
          <p className="text-sm text-orange-300 mt-1">{experience.category}</p>
        </motion.div>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-2">{experience.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={14} className="text-purple-400" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users size={14} className="text-pink-400" />
            <span>Group Allowed</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Price & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 pt-4 border-t border-gray-700/50"
        >
          <div className="flex items-center gap-1 text-green-400 font-bold text-lg">
            {currency === 'INR' ? (
              <IndianRupee size={18} />
            ) : (
              <DollarSign size={18} />
            )}
            <span>{formatPriceWithCurrency(convertCurrency(experience.price, 'USD', currency), currency)}</span>
            <span className="text-xs text-gray-400 font-normal">/person</span>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBook && onBook('experience', experience)}
              className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold text-sm transition-all hover:shadow-lg"
            >
              Book Experience
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-dark-card/50 border border-gray-600/30 text-pink-400 rounded-lg hover:border-pink-500/50 transition-all"
            >
              <Heart size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocalExperienceCard;
