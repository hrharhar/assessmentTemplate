import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Loader } from 'lucide-react';
import { useTestStore } from '../store/testStore';

export const TestNavigation: React.FC = () => {
  const { 
    currentQuestion, 
    questions, 
    answers, 
    nextQuestion, 
    previousQuestion, 
    submitTest,
    isSubmitting,
    error 
  } = useTestStore();
  
  const isLastQuestion = currentQuestion === questions.length - 1;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0 || isSubmitting}
          className="btn-spotify-outline disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2 inline" />
          Previous
        </button>
        
        <span className="text-sm text-spotify-lightgray">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        
        {isLastQuestion ? (
          <button
            onClick={submitTest}
            disabled={answeredQuestions !== questions.length || isSubmitting}
            className="btn-spotify disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader className="w-4 h-4 mr-2 inline animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2 inline" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={isSubmitting}
            className="btn-spotify disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2 inline" />
          </button>
        )}
      </div>
      
      <div className="flex justify-center">
        <span className="text-sm text-spotify-lightgray">
          {answeredQuestions} of {questions.length} questions answered
        </span>
      </div>
    </div>
  );
};