import { create } from 'zustand';
import { Question, TestResult, UserInfo } from '../types/test';
import { allQuestions } from '../data/questions';
import { calculateTestResults } from '../utils/scoring';
import { getShuffledQuestions } from '../utils/shuffle';
import { saveTestResult } from '../services/testService';

interface TestState {
  userInfo: UserInfo | null;
  currentQuestion: number;
  questions: Question[];
  answers: Record<string, string>;
  results: TestResult | null;
  isSubmitting: boolean;
  error: string | null;
  adminMode: boolean;
  isAuthenticated: boolean;
  startTime: number | null;
  completionTime: number | null;
  setUserInfo: (info: UserInfo) => void;
  setAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitTest: () => Promise<void>;
  startTest: () => void;
  setAdminMode: (mode: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
}

export const useTestStore = create<TestState>((set, get) => ({
  userInfo: null,
  currentQuestion: 0,
  questions: [],
  answers: {},
  results: null,
  isSubmitting: false,
  error: null,
  adminMode: false,
  isAuthenticated: false,
  startTime: null,
  completionTime: null,

  setUserInfo: (info) => {
    set({ userInfo: info });
  },

  startTest: () => {
    const { userInfo } = get();
    if (!userInfo) return;
    
    const shuffledQuestions = getShuffledQuestions(allQuestions);
    set({
      questions: shuffledQuestions,
      currentQuestion: 0,
      answers: {},
      results: null,
      error: null,
      startTime: Date.now(),
      completionTime: null
    });
  },

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, state.questions.length - 1),
    }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    }));
  },

  submitTest: async () => {
    const { questions, answers, userInfo, startTime } = get();
    if (!userInfo || !startTime) return;
    
    set({ isSubmitting: true, error: null });
    
    try {
      const completionTime = Math.floor((Date.now() - startTime) / 1000); // in seconds
      const results = calculateTestResults(questions, answers, userInfo, completionTime);
      await saveTestResult(results);
      set({ results, isSubmitting: false, completionTime });
    } catch (error) {
      set({ 
        error: 'Failed to submit test results. Please try again.',
        isSubmitting: false 
      });
    }
  },

  setAdminMode: (mode) => {
    set({ 
      adminMode: mode,
      isAuthenticated: mode ? get().isAuthenticated : false
    });
  },

  setAuthenticated: (authenticated) => {
    set({ isAuthenticated: authenticated });
  },
}));