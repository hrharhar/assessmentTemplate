import React from 'react';
import { Question } from './components/Question';
import { TestNavigation } from './components/TestNavigation';
import { ResultsDashboard } from './components/ResultsDashboard';
import { TestIntro } from './components/TestIntro';
import { AdminButton } from './components/AdminButton';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { useTestStore } from './store/testStore';

function App() {
  const { currentQuestion, questions, results, adminMode, isAuthenticated } = useTestStore();

  if (adminMode) {
    if (!isAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminPanel />;
  }

  const renderContent = () => {
    if (results) {
      return <ResultsDashboard results={results} />;
    }

    if (questions.length === 0) {
      return <TestIntro />;
    }

    return (
      <div className="card-spotify">
        <Question question={questions[currentQuestion]} />
        <TestNavigation />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-spotify-black">
      <header className="bg-spotify-darkgray shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-spotify-white">Online Assessment Platform</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      <AdminButton />
    </div>
  );
}

export default App;