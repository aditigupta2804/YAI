import { useState } from 'react';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AIAssistant from './components/AIAssistant';
import { MessageCircle } from 'lucide-react';
import './styles/index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'dashboard'
  const [chatOpen, setChatOpen] = useState(false);

  const handleTripGenerated = (tripData) => {
    setCurrentPage('dashboard');
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Page Content */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentPage === 'home' ? (
          <HomePage onTripGenerated={handleTripGenerated} />
        ) : (
          <DashboardPage onBack={handleBack} />
        )}
      </motion.div>

      {/* AI Assistant Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/50 z-40"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* AI Assistant Chat */}
      <AIAssistant isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-gray-700/50 py-8 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">About YatraAI</h3>
              <p className="text-gray-400 text-sm">
                Revolutionizing travel planning with AI-powered personalization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Features</a></li>
                <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">About</a></li>
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2026 YatraAI. All rights reserved. Crafted for wanderlust lovers.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
