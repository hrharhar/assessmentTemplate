import { CEFRLevel } from '../types/test';

export const getCEFRDescription = (level: CEFRLevel): string => {
  const descriptions: Record<CEFRLevel, string> = {
    'A1': "You are at the A1 Beginner level, meaning you can understand and use everyday expressions and very basic phrases. Practice forming sentences and expanding your vocabulary to progress.",
    'A2': "You are at the A2 Elementary level, meaning you can handle basic conversations and routine expressions. Progressing to the next level requires more focus on expanding vocabulary and practicing active listening.",
    'B1': "You are at the B1 Intermediate level. This means you can understand and participate in conversations on familiar topics. To move forward, work on using more complex sentences and refining your grammar.",
    'B2': "You are at the B2 Upper Intermediate level, demonstrating the ability to understand and express ideas on a wide range of topics. Focus on improving fluency and nuance in speech.",
    'C1': "You are at the C1 Advanced level, showcasing strong communication skills. To further improve, concentrate on mastering idiomatic expressions and specialized vocabulary.",
    'C2': "You are at the C2 Proficient level, indicating near-native fluency. To maintain your skill, practice using technical and complex language effectively."
  };
  return descriptions[level];
};

export const getSkillFeedback = (skill: string, score: number): string => {
  const feedbackRanges = {
    grammar: {
      low: "Your grammar demonstrates basic understanding. Focus on mastering simple sentence structures and practicing verb tenses.",
      medium: "You show moderate control of grammar. Work on sentence complexity and ensure consistency in tense usage.",
      high: "You have good command of grammar. To further improve, focus on refining advanced structures and reducing minor errors."
    },
    vocabulary: {
      low: "Building a stronger vocabulary base will help you communicate more effectively. Start with common words and phrases used in everyday conversations.",
      medium: "Your vocabulary is growing. Work on adding synonyms and topic-specific words to enhance communication.",
      high: "You have a strong vocabulary repertoire. Focus on learning idiomatic expressions and context-specific terminology."
    },
    reading: {
      low: "Your reading ability is in the early stages. Practice by reading short, simple texts and focusing on comprehension of individual sentences.",
      medium: "You show growing proficiency in reading. Challenge yourself with longer texts and practice extracting key ideas.",
      high: "Your reading skills are strong. Improve further by exploring more complex materials and analyzing context and nuances."
    },
    listening: {
      low: "Your listening skills need improvement. Start by practicing with slow, clear audio recordings and focusing on basic comprehension.",
      medium: "You have moderate listening skills. Practice understanding faster-paced audio and conversations in different contexts.",
      high: "Your listening ability is strong. Focus on capturing subtle details and implied meanings in various types of speech."
    }
  };

  const getRange = (score: number) => {
    if (score <= 40) return 'low';
    if (score <= 70) return 'medium';
    return 'high';
  };

  const skillFeedback = feedbackRanges[skill as keyof typeof feedbackRanges];
  return skillFeedback[getRange(score)];
};