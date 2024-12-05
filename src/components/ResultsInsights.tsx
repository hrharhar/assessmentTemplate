import React from 'react';
import { TestResult } from '../types/test';
import { Brain, Book, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCEFRDescription, getSkillFeedback } from '../utils/feedbackGenerator';

interface ResultsInsightsProps {
  results: TestResult;
}

export const ResultsInsights: React.FC<ResultsInsightsProps> = ({ results }) => {
  const { englishScore } = results;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="card-spotify">
        <div className="flex items-center mb-6">
          <Book className="w-6 h-6 text-spotify-green mr-2" />
          <h3 className="text-xl font-semibold text-spotify-white">CEFR Level Assessment</h3>
        </div>
        <div className="p-4 bg-[#333333] rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-spotify-lightgray">Overall CEFR Level</span>
            <span className="text-2xl font-bold text-spotify-white">{englishScore.level}</span>
          </div>
          <p className="text-spotify-lightgray">
            {getCEFRDescription(englishScore.level)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['grammar', 'vocabulary', 'reading', 'listening'] as const).map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#333333] p-4 rounded-lg hover:bg-[#404040] transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-spotify-lightgray capitalize">{skill}</span>
                <span className="text-xl font-bold text-spotify-white">
                  {englishScore[skill].toFixed(1)}%
                </span>
              </div>
              <div className="mb-3">
                <div className="w-full bg-[#404040] rounded-full h-2">
                  <div
                    className="bg-spotify-green rounded-full h-2 transition-all duration-500"
                    style={{ width: `${englishScore[skill]}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-spotify-lightgray">
                {getSkillFeedback(skill, englishScore[skill])}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-spotify"
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-spotify-green mr-2" />
          <h3 className="text-lg font-semibold text-spotify-white">Assessment Note</h3>
        </div>
        <p className="text-spotify-lightgray">
          This assessment provides a snapshot of your current English proficiency level. 
          Regular practice and exposure to English in various contexts will help improve your skills.
        </p>
      </motion.div>
    </motion.div>
  );
};