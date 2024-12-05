import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Brain, Book, CheckCircle } from 'lucide-react';
import { useTestStore } from '../store/testStore';

export const TestIntro: React.FC = () => {
  const { setUserInfo, startTest } = useTestStore();
  const [fullName, setFullName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleStart = () => {
    if (!fullName.trim() || !targetRole.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setUserInfo({ fullName, targetRole });
    startTest();
  };

  const features = [
    {
      icon: Clock,
      title: "45-60 Minutes",
      description: "Complete the assessment at your own pace"
    },
    {
      icon: Brain,
      title: "Aptitude Assessment",
      description: "Test your logical, numerical, and problem-solving abilities"
    },
    {
      icon: Book,
      title: "English Proficiency",
      description: "Evaluate your English skills according to CEFR standards"
    },
    {
      icon: CheckCircle,
      title: "Instant Results",
      description: "Get detailed insights and recommendations immediately"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-spotify-white mb-4">
            Welcome to the Assessment Platform
          </h1>
          <p className="text-xl text-spotify-lightgray max-w-2xl mx-auto">
            Discover your potential through our comprehensive assessment system
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-spotify group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="w-8 h-8 text-spotify-green group-hover:text-spotify-hover transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-spotify-white group-hover:text-spotify-hover transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-spotify-lightgray">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                className="btn-spotify inline-flex items-center"
              >
                Get Started
                <Play className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-spotify"
          >
            <h2 className="text-2xl font-semibold text-spotify-white mb-6">Your Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-spotify-lightgray mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#404040] border-2 border-transparent focus:border-spotify-green text-spotify-white rounded-lg focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="targetRole" className="block text-sm font-medium text-spotify-lightgray mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  id="targetRole"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-2 bg-[#404040] border-2 border-transparent focus:border-spotify-green text-spotify-white rounded-lg focus:outline-none transition-colors"
                  placeholder="e.g., Software Engineer, Product Manager"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-spotify-outline"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="btn-spotify"
                >
                  Start Assessment
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};