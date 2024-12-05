import { Question } from '../types/test';

export const englishQuestions: Question[] = [
  // Grammar Questions
  {
    id: 'eng-a2-1',
    type: 'english',
    cefrLevel: 'A2',
    englishSkill: 'grammar',
    text: 'Choose the correct form: "She _____ to the store yesterday."',
    options: ['go', 'goes', 'went', 'gone'],
    correctAnswer: 'went'
  },
  {
    id: 'eng-b1-1',
    type: 'english',
    cefrLevel: 'B1',
    englishSkill: 'grammar',
    text: 'Choose the correct conditional form: "If I _____ rich, I would travel the world."',
    options: ['am', 'were', 'would be', 'will be'],
    correctAnswer: 'were'
  },
  {
    id: 'eng-b2-3',
    type: 'english',
    cefrLevel: 'B2',
    englishSkill: 'grammar',
    text: 'Select the correct form: "By the time we arrive, they _____ for three hours."',
    options: [
      'will be waiting',
      'will have been waiting',
      'would have waited',
      'had been waiting'
    ],
    correctAnswer: 'will have been waiting'
  },
  {
    id: 'eng-c1-3',
    type: 'english',
    cefrLevel: 'C1',
    englishSkill: 'grammar',
    text: 'Choose the correct subjunctive form: "The committee recommended that he _____ the position."',
    options: ['accepts', 'accepted', 'accept', 'would accept'],
    correctAnswer: 'accept'
  },

  // Vocabulary Questions
  {
    id: 'eng-b2-1',
    type: 'english',
    cefrLevel: 'B2',
    englishSkill: 'vocabulary',
    text: 'Select the most appropriate synonym for "ambiguous":',
    options: ['clear', 'uncertain', 'definite', 'simple'],
    correctAnswer: 'uncertain'
  },
  {
    id: 'eng-c1-2',
    type: 'english',
    cefrLevel: 'C1',
    englishSkill: 'vocabulary',
    text: 'Select the most appropriate word: "The professor\'s explanation was so _____ that few students understood it."',
    options: ['simple', 'esoteric', 'straightforward', 'basic'],
    correctAnswer: 'esoteric'
  },
  {
    id: 'eng-c2-1',
    type: 'english',
    cefrLevel: 'C2',
    englishSkill: 'vocabulary',
    text: 'Select the most appropriate word: "The critic\'s _____ review of the novel was both insightful and scathing."',
    options: ['thorough', 'trenchant', 'detailed', 'complete'],
    correctAnswer: 'trenchant'
  },
  {
    id: 'eng-c2-3',
    type: 'english',
    cefrLevel: 'C2',
    englishSkill: 'vocabulary',
    text: 'Select the most appropriate synonym for "perspicacious":',
    options: ['astute', 'intelligent', 'clever', 'bright'],
    correctAnswer: 'astute'
  },

  // Reading Questions
  {
    id: 'eng-b1-2',
    type: 'english',
    cefrLevel: 'B1',
    englishSkill: 'reading',
    text: 'Read the following passage and answer: "The new policy aims to reduce carbon emissions by 30% over the next decade." What is the main goal of the policy?',
    options: [
      'Increase carbon emissions',
      'Reduce carbon emissions',
      'Maintain current emissions',
      'Study emission patterns'
    ],
    correctAnswer: 'Reduce carbon emissions'
  },
  {
    id: 'eng-b2-2',
    type: 'english',
    cefrLevel: 'B2',
    englishSkill: 'reading',
    text: 'Read and interpret: "The project was a hard nut to crack from the start." What does this mean?',
    options: [
      'The project was easy',
      'The project was difficult',
      'The project involved nuts',
      'The project was quick'
    ],
    correctAnswer: 'The project was difficult'
  },
  {
    id: 'eng-c1-1',
    type: 'english',
    cefrLevel: 'C1',
    englishSkill: 'reading',
    text: 'Read and analyze: "The author\'s prose is deliberately opaque, forcing readers to engage more deeply with the text." What is the author\'s intention?',
    options: [
      'To make the text easy to read',
      'To confuse readers',
      'To encourage deeper engagement',
      'To write quickly'
    ],
    correctAnswer: 'To encourage deeper engagement'
  },
  {
    id: 'eng-c2-2',
    type: 'english',
    cefrLevel: 'C2',
    englishSkill: 'reading',
    text: 'Analyze the sentence: "No sooner had the implications become clear than the committee reversed its decision." What is the sequence of events?',
    options: [
      'The committee decided, then understood',
      'Understanding came first, then the decision changed',
      'Both happened simultaneously',
      'The sequence is unclear'
    ],
    correctAnswer: 'Understanding came first, then the decision changed'
  },

  // Listening Questions
  {
    id: 'eng-a2-2',
    type: 'english',
    cefrLevel: 'A2',
    englishSkill: 'listening',
    text: 'Listen and select: "What time does the train _____ tomorrow?"',
    options: ['leave', 'leaves', 'leaving', 'left'],
    correctAnswer: 'leave'
  },
  {
    id: 'eng-b1-3',
    type: 'english',
    cefrLevel: 'B1',
    englishSkill: 'listening',
    text: 'In a conversation about travel plans, you hear: "We might _____ the museum if we have time."',
    options: ['visit', 'visiting', 'visited', 'to visit'],
    correctAnswer: 'visit'
  },
  {
    id: 'eng-b2-4',
    type: 'english',
    cefrLevel: 'B2',
    englishSkill: 'listening',
    text: 'During a lecture, you hear: "The findings _____ several previous theories about climate change."',
    options: ['contradict', 'contradicts', 'contradicting', 'contradicted'],
    correctAnswer: 'contradict'
  },
  {
    id: 'eng-c1-4',
    type: 'english',
    cefrLevel: 'C1',
    englishSkill: 'listening',
    text: 'In an academic discussion, you hear: "The research methodology _____ several innovative approaches."',
    options: ['incorporate', 'incorporates', 'incorporating', 'incorporated'],
    correctAnswer: 'incorporates'
  }
];