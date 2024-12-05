import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useTestStore } from '../store/testStore';

export const AdminButton: React.FC = () => {
  const { setAdminMode } = useTestStore();

  return (
    <button
      onClick={() => setAdminMode(true)}
      className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
      aria-label="Admin Panel"
    >
      <ClipboardList className="w-6 h-6" />
    </button>
  );
};