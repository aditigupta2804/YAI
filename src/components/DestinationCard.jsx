import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      onClick={() => onSelect(destination)}
      className="cursor-pointer group h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl h-72 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
        {/* Background Image */}
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay - Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full shadow-lg"
        >
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <Star size={12} className="fill-white" />
            {destination.rating}
          </span>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2 line-clamp-1">{destination.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-pink-400 flex-shrink-0" />
              <p className="text-sm text-gray-200">{destination.country}</p>
            </div>

            {/* Rating Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Star
                        size={14}
                        className={
                          i < Math.floor(destination.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-500'
                        }
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs text-gray-300">
                  ({destination.reviews})
                </span>
              </div>

              {/* Hover Action */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-pink-400 group-hover:text-pink-300"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Gradient Border on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-2xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default DestinationCard;
