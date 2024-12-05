import { Question } from '../types/test';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getShuffledQuestions = (questions: Question[]): Question[] => {
  // Group questions by type and category/level
  const aptitudeQuestions = questions.filter(q => q.type === 'aptitude');
  const englishQuestions = questions.filter(q => q.type === 'english');

  // Shuffle each group separately to maintain balance
  const shuffledAptitude = shuffleArray(aptitudeQuestions);
  const shuffledEnglish = shuffleArray(englishQuestions);

  // Combine and return
  return [...shuffledAptitude, ...shuffledEnglish];
};