import React, { useState } from 'react';
import { Lock, X, Home } from 'lucide-react';
import { useTestStore } from '../store/testStore';
import { motion } from 'framer-motion';

const ADMIN_PASSWORD = 'admin123'; // In production, this should be stored securely

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAdminMode, setAuthenticated } = useTestStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="fixed inset-0 bg-spotify-black bg-opacity-95 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-spotify-darkgray rounded-lg p-8 w-full max-w-md relative border border-[#404040] shadow-xl"
      >
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={() => setAdminMode(false)}
            className="p-2 hover:bg-[#404040] rounded-full transition-colors"
            aria-label="Return to Main Page"
          >
            <Home className="w-5 h-5 text-spotify-lightgray" />
          </button>
          <button
            onClick={() => setAdminMode(false)}
            className="p-2 hover:bg-[#404040] rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-spotify-lightgray" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#404040] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-spotify-green" />
          </div>
          <h2 className="text-2xl font-bold text-spotify-white">Admin Access</h2>
          <p className="text-spotify-lightgray mt-2">Enter the admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-spotify-lightgray mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#404040] border-2 border-transparent focus:border-spotify-green 
                         text-spotify-white rounded-lg focus:outline-none transition-colors"
              placeholder="Enter admin password"
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-spotify-green hover:bg-spotify-hover text-spotify-black font-bold 
                     py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 
                     focus:ring-spotify-green focus:ring-opacity-50"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};