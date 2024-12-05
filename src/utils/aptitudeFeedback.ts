type ScoreRange = 'low' | 'moderate' | 'high';

const getScoreRange = (score: number): ScoreRange => {
  if (score <= 40) return 'low';
  if (score <= 70) return 'moderate';
  return 'high';
};

export const getLogicalReasoningFeedback = (score: number): string => {
  const range = getScoreRange(score);
  
  const feedback = {
    low: "Your logical reasoning is in the early stages of development. Practice recognizing patterns, solving logic puzzles, and analyzing sequences to improve.",
    moderate: "You have a moderate grasp of logical reasoning. Focus on enhancing this skill by solving moderately complex puzzles and practicing deductive reasoning exercises.",
    high: "You demonstrate strong logical reasoning skills. To excel further, challenge yourself with advanced problem-solving scenarios and strategic thinking games."
  };
  
  return feedback[range];
};

export const getNumericalAbilityFeedback = (score: number): string => {
  const range = getScoreRange(score);
  
  const feedback = {
    low: "Your numerical ability needs improvement. Start with basic arithmetic exercises and gradually progress to interpreting data, graphs, and charts.",
    moderate: "You show a growing proficiency in numerical ability. Focus on solving practical math problems, such as calculating percentages or analyzing trends in data.",
    high: "You have excellent numerical skills. To refine your expertise, work on solving advanced numerical problems and applying them in real-world scenarios."
  };
  
  return feedback[range];
};

export const getProblemSolvingFeedback = (score: number): string => {
  const range = getScoreRange(score);
  
  const feedback = {
    low: "Your problem-solving skills need development. Start by practicing breaking down complex problems into smaller, manageable parts and applying structured thinking.",
    moderate: "You show a good foundation in problem-solving. Build on this by tackling moderately complex problems and experimenting with creative solutions.",
    high: "You demonstrate exceptional problem-solving abilities. To further improve, focus on handling ambiguous situations and developing innovative solutions."
  };
  
  return feedback[range];
};

export const getOverallAptitudeFeedback = (score: number): string => {
  const range = getScoreRange(score);
  
  const feedback = {
    low: "Your overall aptitude score indicates room for improvement. Strengthening your logical, numerical, and problem-solving skills will help you perform better in cognitive tasks.",
    moderate: "You have a moderate aptitude level. Focus on consistently improving across all areas to enhance your ability to analyze and solve complex problems.",
    high: "Your overall aptitude score is strong. Continue building on your existing skills by taking on challenging tasks that push your cognitive limits."
  };
  
  return feedback[range];
};

export const getImprovementSuggestions = (
  logicalScore: number,
  numericalScore: number,
  problemSolvingScore: number
): string[] => {
  const suggestions: string[] = [];
  
  // Logical Reasoning Suggestions
  if (logicalScore <= 70) {
    suggestions.push("Try Sudoku, logic puzzles, and games like chess to enhance pattern recognition and strategic thinking.");
  } else {
    suggestions.push("Challenge yourself with advanced reasoning exercises such as case studies or decision-making simulations.");
  }
  
  // Numerical Ability Suggestions
  if (numericalScore <= 70) {
    suggestions.push("Start with basic math drills and progress to interpreting data sets and financial calculations.");
  } else {
    suggestions.push("Refine your skills by analyzing real-world data trends or solving financial modeling problems.");
  }
  
  // Problem Solving Suggestions
  if (problemSolvingScore <= 70) {
    suggestions.push("Practice structured thinking by tackling step-by-step problem-solving exercises like puzzles or troubleshooting tasks.");
  } else {
    suggestions.push("Work on creative problem-solving through brainstorming, hypothetical scenarios, or real-world case studies.");
  }
  
  return suggestions;
};