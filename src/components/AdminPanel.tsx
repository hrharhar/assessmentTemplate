import React, { useEffect, useState } from 'react';
import { X, Download, Home, Loader, Trash2, FileText, FileDown } from 'lucide-react';
import { getAllTestResults, deleteTestResult, exportTestResultToCsv, generatePDFReport } from '../services/testService';
import { TestResult } from '../types/test';
import { format } from 'date-fns';
import { useTestStore } from '../store/testStore';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminPanel: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { setAdminMode } = useTestStore();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getAllTestResults();
      setResults(data);
    } catch (err) {
      setError('Failed to load test results');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestResult(id);
      setResults(results.filter(result => result.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete test result');
    }
  };

  const exportSingleResult = (result: TestResult) => {
    const csvContent = exportTestResultToCsv(result);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-result-${result.userInfo.fullName.replace(/\s+/g, '-')}-${format(new Date(result.timestamp), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportPDF = async (result: TestResult) => {
    try {
      const blob = await generatePDFReport(result);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessment-report-${result.userInfo.fullName.replace(/\s+/g, '-')}-${format(new Date(result.timestamp), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to generate PDF report');
    }
  };

  const exportAllResults = () => {
    const csvContent = results.map(result => exportTestResultToCsv(result)).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-test-results-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-spotify-black flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-spotify-green" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-spotify-black overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAdminMode(false)}
              className="p-2 hover:bg-spotify-darkgray rounded-full transition-colors"
              aria-label="Return to Main Page"
            >
              <Home className="w-6 h-6 text-spotify-white" />
            </motion.button>
            <h1 className="text-2xl font-bold text-spotify-white">Test Results Administration</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportAllResults}
            className="btn-spotify inline-flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export All Results
          </motion.button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="bg-spotify-darkgray shadow-lg rounded-lg overflow-hidden border border-[#404040]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#404040]">
              <thead className="bg-[#333333]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    Target Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    Aptitude Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    English Level
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-spotify-lightgray uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#404040]">
                {results.map((result) => (
                  <motion.tr
                    key={result.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-[#333333] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-spotify-white">
                      {result.userInfo.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-spotify-lightgray">
                      {result.userInfo.targetRole}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-spotify-lightgray">
                      {format(new Date(result.timestamp), 'PPP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-spotify-lightgray">
                      {result.aptitudeScore.overall.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-spotify-lightgray">
                      {result.englishScore.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => exportPDF(result)}
                          className="text-spotify-green hover:text-spotify-hover transition-colors"
                          title="Export PDF Report"
                        >
                          <FileDown className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => exportSingleResult(result)}
                          className="text-spotify-green hover:text-spotify-hover transition-colors"
                          title="Export CSV"
                        >
                          <FileText className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(result.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Result"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-spotify-darkgray rounded-lg p-6 max-w-sm w-full border border-[#404040]"
            >
              <h3 className="text-lg font-semibold text-spotify-white mb-4">Confirm Deletion</h3>
              <p className="text-spotify-lightgray mb-6">
                Are you sure you want to delete this test result? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-spotify-lightgray hover:text-spotify-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};