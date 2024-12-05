import { Question, TestResult, CEFRLevel, UserInfo, EnglishSkill } from '../types/test';
import { determineCEFRLevel } from './cefrScoring';

const calculateAptitudeScore = (
  questions: Question[],
  answers: Record<string, string>
): TestResult['aptitudeScore'] => {
  const categories = ['logical', 'numerical', 'problem-solving'] as const;
  const scores = {
    logical: 0,
    numerical: 0,
    problemSolving: 0,
    overall: 0
  };

  const categoryCounts = {
    logical: 0,
    numerical: 0,
    'problem-solving': 0
  };

  questions
    .filter(q => q.type === 'aptitude')
    .forEach(question => {
      const category = question.category!;
      categoryCounts[category]++;
      
      if (answers[question.id] === question.correctAnswer) {
        if (category === 'problem-solving') {
          scores.problemSolving += 100;
        } else {
          scores[category] += 100;
        }
      }
    });

  // Calculate average for each category
  categories.forEach(category => {
    const count = categoryCounts[category === 'problem-solving' ? 'problem-solving' : category];
    if (count > 0) {
      if (category === 'problem-solving') {
        scores.problemSolving /= count;
      } else {
        scores[category] /= count;
      }
    }
  });

  // Calculate overall score
  const validScores = Object.values(scores).filter(score => !isNaN(score) && score !== 0);
  scores.overall = validScores.length > 0 
    ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
    : 0;
  
  return scores;
};

const calculateEnglishScore = (
  questions: Question[],
  answers: Record<string, string>
): TestResult['englishScore'] => {
  const englishQuestions = questions.filter(q => q.type === 'english');
  
  // Initialize scores and counts for each skill
  const skillScores = {
    grammar: 0,
    vocabulary: 0,
    reading: 0,
    listening: 0
  };
  
  const skillCounts = {
    grammar: 0,
    vocabulary: 0,
    reading: 0,
    listening: 0
  };

  // Calculate scores for each skill
  englishQuestions.forEach(question => {
    const skill = question.englishSkill as EnglishSkill;
    if (!skill) return;

    skillCounts[skill]++;
    if (answers[question.id] === question.correctAnswer) {
      skillScores[skill] += 100;
    }
  });

  // Calculate averages for each skill
  Object.keys(skillScores).forEach(skill => {
    const count = skillCounts[skill as EnglishSkill];
    if (count > 0) {
      skillScores[skill as EnglishSkill] /= count;
    }
  });

  // Calculate overall score
  const validScores = Object.values(skillScores).filter(score => !isNaN(score) && score !== 0);
  const overall = validScores.length > 0 
    ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
    : 0;

  // Determine CEFR level based on overall score
  const level = determineCEFRLevel(overall);

  return {
    ...skillScores,
    overall,
    level
  };
};

export const calculateTestResults = (
  questions: Question[],
  answers: Record<string, string>,
  userInfo: UserInfo,
  completionTime: number
): TestResult => {
  return {
    userInfo,
    aptitudeScore: calculateAptitudeScore(questions, answers),
    englishScore: calculateEnglishScore(questions, answers),
    timestamp: new Date().toISOString(),
    completionTime
  };
};