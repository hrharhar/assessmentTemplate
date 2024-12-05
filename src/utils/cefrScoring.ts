import { CEFRLevel, EnglishScores, EnglishLevels } from '../types/test';

const CEFR_THRESHOLDS = {
  C2: 90,
  C1: 75,
  B2: 60,
  B1: 45,
  A2: 30,
  A1: 0
} as const;

const CEFR_NUMERIC_VALUES: Record<CEFRLevel, number> = {
  'C2': 6,
  'C1': 5,
  'B2': 4,
  'B1': 3,
  'A2': 2,
  'A1': 1
};

export const determineCEFRLevel = (score: number): CEFRLevel => {
  if (score >= CEFR_THRESHOLDS.C2) return 'C2';
  if (score >= CEFR_THRESHOLDS.C1) return 'C1';
  if (score >= CEFR_THRESHOLDS.B2) return 'B2';
  if (score >= CEFR_THRESHOLDS.B1) return 'B1';
  if (score >= CEFR_THRESHOLDS.A2) return 'A2';
  return 'A1';
};

export const calculateSubSkillLevels = (scores: EnglishScores): EnglishLevels => {
  const subSkillLevels = {
    grammar: determineCEFRLevel(scores.grammar),
    vocabulary: determineCEFRLevel(scores.vocabulary),
    reading: determineCEFRLevel(scores.reading),
    listening: determineCEFRLevel(scores.listening)
  };

  // Calculate overall CEFR level
  const numericValues = Object.values(subSkillLevels).map(level => CEFR_NUMERIC_VALUES[level]);
  const average = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
  const roundedAverage = Math.round(average);

  // Map numeric average back to CEFR level
  const overallLevel = Object.entries(CEFR_NUMERIC_VALUES).find(
    ([_, value]) => value === roundedAverage
  )?.[0] as CEFRLevel;

  return {
    ...subSkillLevels,
    overall: overallLevel
  };
};

export const getCEFRDescription = (level: CEFRLevel): string => {
  const descriptions: Record<CEFRLevel, string> = {
    'C2': 'Mastery - Can understand virtually everything heard or read with ease.',
    'C1': 'Advanced - Can express ideas fluently and spontaneously without obvious searching.',
    'B2': 'Upper Intermediate - Can interact with a degree of fluency and spontaneity.',
    'B1': 'Intermediate - Can deal with most situations likely to arise while traveling.',
    'A2': 'Elementary - Can communicate in simple and routine tasks.',
    'A1': 'Beginner - Can understand and use familiar everyday expressions.'
  };
  return descriptions[level];
};

export const getSkillLevelDescription = (skill: keyof EnglishScores, level: CEFRLevel): string => {
  const descriptions: Record<keyof EnglishScores, Record<CEFRLevel, string>> = {
    grammar: {
      'C2': 'Maintains consistent grammatical control of complex language.',
      'C1': 'Consistently maintains a high degree of grammatical accuracy.',
      'B2': 'Shows a relatively high degree of grammatical control.',
      'B1': 'Uses reasonably accurately a repertoire of frequently used patterns.',
      'A2': 'Uses some simple structures correctly.',
      'A1': 'Shows only limited control of a few simple grammatical structures.'
    },
    vocabulary: {
      'C2': 'Has a good command of a very broad lexical repertoire.',
      'C1': 'Has a good command of a broad lexical repertoire.',
      'B2': 'Has a good range of vocabulary for matters connected to their field.',
      'B1': 'Has enough vocabulary to express themselves with some circumlocutions.',
      'A2': 'Has sufficient vocabulary for basic communication needs.',
      'A1': 'Has a basic vocabulary repertoire of isolated words and phrases.'
    },
    reading: {
      'C2': 'Can understand and interpret critically virtually all forms of written language.',
      'C1': 'Can understand in detail lengthy, complex texts.',
      'B2': 'Can read with a large degree of independence.',
      'B1': 'Can understand the main points of clear standard input.',
      'A2': 'Can understand short, simple texts containing high frequency vocabulary.',
      'A1': 'Can understand very short, simple texts a single phrase at a time.'
    },
    listening: {
      'C2': 'Has no difficulty in understanding any kind of spoken language.',
      'C1': 'Can understand enough to follow extended speech on abstract topics.',
      'B2': 'Can understand the main ideas of complex speech.',
      'B1': 'Can understand the main points of clear standard speech.',
      'A2': 'Can understand phrases and expressions related to immediate needs.',
      'A1': 'Can follow speech that is very slow and carefully articulated.'
    }
  };
  return descriptions[skill][level];
};