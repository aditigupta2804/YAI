import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TripPlannerForm from '../components/TripPlannerForm';
import DestinationCard from '../components/DestinationCard';
import { tripPlannerService } from '../services/tripPlannerService';
import { Plane, ArrowRight, Sparkles, MapPin } from 'lucide-react';

const HomePage = ({ onTripGenerated }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await tripPlannerService.getPopularDestinations();
      setDestinations(data);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  const handleGenerateTrip = async (tripData) => {
    onTripGenerated(tripData);
  };

  const handleDestinationSelect = (destination) => {
    // Pre-fill the form with selected destination
    console.log('Selected:', destination);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-purple-900/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 1,
            }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-6"
            >
              <Plane className="text-white" size={32} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              YatraAI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Your Personalized AI Travel Companion
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover, plan, and book your dream trip with AI-powered recommendations tailored to your budget, interests, and style.
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <TripPlannerForm onSubmit={handleGenerateTrip} />
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Popular Destinations
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore trending destinations loved by travelers worldwide
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-64 glassmorphism rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {destinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <DestinationCard
                    destination={dest}
                    onSelect={handleDestinationSelect}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Why Choose YatraAI?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles size={32} />,
                title: 'AI-Powered Planning',
                desc: 'Intelligent algorithms create personalized itineraries based on your preferences.',
              },
              {
                icon: <MapPin size={32} />,
                title: 'Global Coverage',
                desc: 'Explore thousands of destinations with detailed local insights and recommendations.',
              },
              {
                icon: <ArrowRight size={32} />,
                title: 'Seamless Booking',
                desc: 'Book flights, hotels, and activities all in one place with verified deals.',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glassmorphism p-8 rounded-2xl text-center"
              >
                <div className="flex justify-center mb-4 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of travelers who've planned their perfect trips with YatraAI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 gradient-btn font-bold rounded-lg text-lg inline-flex items-center gap-2"
            >
              <Sparkles size={24} />
              Start Planning Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
