export type QuestionType = 'aptitude' | 'english';
export type AptitudeCategory = 'logical' | 'numerical' | 'problem-solving';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type EnglishSkill = 'grammar' | 'vocabulary' | 'reading' | 'listening';

export interface UserInfo {
  fullName: string;
  targetRole: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: string;
  category?: AptitudeCategory;
  cefrLevel?: CEFRLevel;
  englishSkill?: EnglishSkill;
}

export interface EnglishScores {
  grammar: number;
  vocabulary: number;
  reading: number;
  listening: number;
}

export interface EnglishLevels {
  grammar: CEFRLevel;
  vocabulary: CEFRLevel;
  reading: CEFRLevel;
  listening: CEFRLevel;
  overall: CEFRLevel;
}

export interface TestResult {
  userInfo: UserInfo;
  aptitudeScore: {
    logical: number;
    numerical: number;
    problemSolving: number;
    overall: number;
  };
  englishScore: EnglishScores & {
    level: CEFRLevel;
    overall: number;
  };
  timestamp: string;
  completionTime: number; // in seconds
}