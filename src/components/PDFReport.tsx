import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { TestResult } from '../types/test';
import { PDFReportContent } from './pdf/PDFReportContent';
import { registerPDFFonts } from './pdf/PDFFont';

// Register fonts
registerPDFFonts();

interface PDFReportProps {
  results: TestResult;
  onBack: () => void;
}

export const PDFReport: React.FC<PDFReportProps> = ({ results, onBack }) => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-50 transition-colors"
        >
          Back to Results
        </button>
      </div>
      <PDFViewer className="w-full h-full">
        <PDFReportContent result={results} />
      </PDFViewer>
    </div>
  );
};