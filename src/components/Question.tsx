import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { Question as QuestionType } from '../types/test';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { AlertCircle } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { 
    currentQuestion, 
    questions, 
    answers, 
    setAnswer, 
    nextQuestion,
    previousQuestion,
    submitTest,
    isSubmitting,
    error 
  } = useTestStore();
  
  const selectedAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedAnswer && event.key >= '1' && event.key <= '4') {
        const index = parseInt(event.key) - 1;
        if (index < question.options.length) {
          const answer = question.options[index];
          setAnswer(question.id, answer);
          
          if (!isLastQuestion) {
            setTimeout(() => {
              nextQuestion();
            }, 300);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [question, selectedAnswer, isLastQuestion, setAnswer, nextQuestion]);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const getQuestionDifficulty = () => {
    if (question.type === 'english') {
      return question.cefrLevel || 'B1';
    }
    return question.category || 'general';
  };

  const handleOptionSelect = (option: string) => {
    setAnswer(question.id, option);
    
    if (!isLastQuestion) {
      setTimeout(() => {
        nextQuestion();
      }, 300);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
          />
          <Timer />
        </div>

        <div className="bg-spotify-darkgray p-8 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-spotify-green/10 text-spotify-green rounded-full text-sm font-medium">
              {question.type === 'english' ? 'English' : 'Aptitude'} - {getQuestionDifficulty()}
            </span>
            {!selectedAnswer && (
              <div className="flex items-center text-spotify-lightgray text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                Press 1-4 or click to select an answer
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-spotify-white mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.label
                key={index}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                  selectedAnswer === option
                    ? 'bg-spotify-green/20 border-2 border-spotify-green'
                    : 'bg-[#333333] hover:bg-[#404040] border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleOptionSelect(option)}
                  className="w-4 h-4 text-spotify-green border-spotify-lightgray focus:ring-spotify-green"
                />
                <div className="ml-3 flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#404040] rounded-full text-spotify-lightgray text-sm mr-3">
                    {index + 1}
                  </span>
                  <span className="text-spotify-white text-lg">{option}</span>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};