import React, { useState } from 'react';
import { FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestResult } from '../types/test';
import { ResultsInsights } from './ResultsInsights';
import { AptitudeInsights } from './AptitudeInsights';
import { ErrorBoundary } from './ErrorBoundary';
import { PDFReport } from './PDFReport';
import { formatTime } from '../utils/timeFormat';

interface ResultsDashboardProps {
  results: TestResult;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  const [showPDF, setShowPDF] = useState(false);

  if (showPDF) {
    return <PDFReport results={results} onBack={() => setShowPDF(false)} />;
  }

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-8 space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-spotify-white mb-2"
            >
              Assessment Results
            </motion.h1>
            <div className="flex items-center text-spotify-lightgray">
              <Clock className="w-4 h-4 mr-2" />
              <span>Completion Time: {formatTime(results.completionTime)}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPDF(true)}
            className="btn-spotify inline-flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            View PDF Report
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-semibold text-spotify-white mb-6"
            >
              Aptitude Assessment
            </motion.h2>
            <AptitudeInsights scores={results.aptitudeScore} />
          </section>

          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-semibold text-spotify-white mb-6"
            >
              English Proficiency
            </motion.h2>
            <ResultsInsights results={results} />
          </section>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};