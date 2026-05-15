import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { formatPriceWithCurrency } from '../utils/helpers';

const ItineraryDay = ({ day, activities = [], estimatedCost, meals = [], currency = 'USD' }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="glassmorphism rounded-2xl p-6 mb-4"
    >
      {/* Day Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
        <motion.h3 variants={item} className="text-2xl font-bold gradient-text">
          Day {day}
        </motion.h3>
        <motion.div variants={item} className="flex items-center gap-2 text-green-400 font-semibold">
          <span className="text-xl">{formatPriceWithCurrency(estimatedCost, currency)}</span>
        </motion.div>
      </div>

      {/* Activities */}
      <div className="space-y-3 mb-4">
        <motion.h4 variants={item} className="text-sm font-semibold text-gray-300 uppercase">
          Recommended Activities
        </motion.h4>
        {activities.length > 0 ? (
          activities.map((activity, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="flex items-start gap-3 p-3 bg-dark-card/50 rounded-lg"
            >
              <MapPin size={18} className="text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-medium">{activity}</p>
                <p className="text-xs text-gray-400 mt-1">Duration: 2-3 hours</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No specific activities planned</p>
        )}
      </div>

      {/* Meals */}
      {meals.length > 0 && (
        <div className="space-y-2">
          <motion.h4 variants={item} className="text-sm font-semibold text-gray-300 uppercase">
            Meals
          </motion.h4>
          <div className="flex flex-wrap gap-2">
            {meals.map((meal, idx) => (
              <motion.span
                key={idx}
                variants={item}
                className="px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm rounded-full"
              >
                {meal}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ItineraryDay;
