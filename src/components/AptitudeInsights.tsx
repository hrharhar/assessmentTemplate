import React from 'react';
import { Brain, TrendingUp, Calculator, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getLogicalReasoningFeedback,
  getNumericalAbilityFeedback,
  getProblemSolvingFeedback,
  getOverallAptitudeFeedback,
  getImprovementSuggestions
} from '../utils/aptitudeFeedback';

interface AptitudeInsightsProps {
  scores: {
    logical: number;
    numerical: number;
    problemSolving: number;
    overall: number;
  };
}

export const AptitudeInsights: React.FC<AptitudeInsightsProps> = ({ scores }) => {
  const improvementSuggestions = getImprovementSuggestions(
    scores.logical,
    scores.numerical,
    scores.problemSolving
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-spotify"
        >
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-spotify-green mr-2" />
            <h3 className="text-lg font-semibold text-spotify-white">Logical Reasoning</h3>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-spotify-lightgray">Score</span>
              <span className="text-2xl font-bold text-spotify-white">{scores.logical.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#404040] rounded-full h-2">
              <div
                className="bg-spotify-green rounded-full h-2 transition-all duration-500"
                style={{ width: `${scores.logical}%` }}
              />
            </div>
          </div>
          <p className="text-spotify-lightgray text-sm">
            {getLogicalReasoningFeedback(scores.logical)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-spotify"
        >
          <div className="flex items-center mb-4">
            <Calculator className="w-6 h-6 text-spotify-green mr-2" />
            <h3 className="text-lg font-semibold text-spotify-white">Numerical Ability</h3>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-spotify-lightgray">Score</span>
              <span className="text-2xl font-bold text-spotify-white">{scores.numerical.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#404040] rounded-full h-2">
              <div
                className="bg-spotify-green rounded-full h-2 transition-all duration-500"
                style={{ width: `${scores.numerical}%` }}
              />
            </div>
          </div>
          <p className="text-spotify-lightgray text-sm">
            {getNumericalAbilityFeedback(scores.numerical)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-spotify"
        >
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-spotify-green mr-2" />
            <h3 className="text-lg font-semibold text-spotify-white">Problem Solving</h3>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-spotify-lightgray">Score</span>
              <span className="text-2xl font-bold text-spotify-white">{scores.problemSolving.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#404040] rounded-full h-2">
              <div
                className="bg-spotify-green rounded-full h-2 transition-all duration-500"
                style={{ width: `${scores.problemSolving}%` }}
              />
            </div>
          </div>
          <p className="text-spotify-lightgray text-sm">
            {getProblemSolvingFeedback(scores.problemSolving)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-spotify"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-spotify-green mr-2" />
          <h3 className="text-lg font-semibold text-spotify-white">Overall Assessment</h3>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-spotify-lightgray">Overall Score</span>
            <span className="text-2xl font-bold text-spotify-white">{scores.overall.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#404040] rounded-full h-2">
            <div
              className="bg-spotify-green rounded-full h-2 transition-all duration-500"
              style={{ width: `${scores.overall}%` }}
            />
          </div>
        </div>
        <p className="text-spotify-lightgray mb-6">
          {getOverallAptitudeFeedback(scores.overall)}
        </p>
        
        <div>
          <h4 className="font-semibold text-spotify-white mb-3">Improvement Suggestions:</h4>
          <ul className="space-y-2">
            {improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-spotify-green rounded-full mt-2 mr-2" />
                <span className="text-spotify-lightgray text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};