import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, Plus } from 'lucide-react';
import { useState } from 'react';

const AIAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI travel assistant. How can I help you plan your trip today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: 'That\'s a great question! Based on your preferences, I recommend visiting the local markets in the morning and enjoying sunset at the viewpoint. Would you like more suggestions?',
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 800);

      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 w-full max-w-md h-screen max-h-[600px] glassmorphism-enhanced rounded-3xl flex flex-col shadow-2xl z-50 border border-purple-500/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-t-3xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-white text-lg">YatraAI Assistant</h3>
              <div className="flex items-center gap-1.5 text-xs text-green-400 mt-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                Online & Ready
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-red-600/30 rounded-xl transition-all duration-200"
            >
              <X size={22} className="text-red-400" />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, x: message.sender === 'user' ? 50 : -50 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-dark-card/80 border border-purple-500/30 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-gray-700/50 space-y-3 bg-dark-bg/40 rounded-b-3xl">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-purple-400"
              >
                <Mic size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-purple-400"
              >
                <Plus size={20} />
              </motion.button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-dark-card/70 border-2 border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 font-bold"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;
