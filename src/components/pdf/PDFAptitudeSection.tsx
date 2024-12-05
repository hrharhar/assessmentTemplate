import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { TestResult } from '../../types/test';
import { pdfStyles } from './PDFStyles';
import {
  getLogicalReasoningFeedback,
  getNumericalAbilityFeedback,
  getProblemSolvingFeedback,
  getOverallAptitudeFeedback,
  getImprovementSuggestions
} from '../../utils/aptitudeFeedback';

interface PDFAptitudeSectionProps {
  aptitudeScore: TestResult['aptitudeScore'];
}

export const PDFAptitudeSection: React.FC<PDFAptitudeSectionProps> = ({ aptitudeScore }) => {
  const scores = [
    { label: 'Logical Reasoning', value: aptitudeScore.logical, feedback: getLogicalReasoningFeedback },
    { label: 'Numerical Ability', value: aptitudeScore.numerical, feedback: getNumericalAbilityFeedback },
    { label: 'Problem Solving', value: aptitudeScore.problemSolving, feedback: getProblemSolvingFeedback }
  ];

  const improvementSuggestions = getImprovementSuggestions(
    aptitudeScore.logical,
    aptitudeScore.numerical,
    aptitudeScore.problemSolving
  );

  return (
    <View style={pdfStyles.section} wrap={false}>
      <Text style={pdfStyles.sectionTitle}>Aptitude Assessment</Text>
      
      <View style={pdfStyles.scoreGrid}>
        {scores.map((score, index) => (
          <View key={index} style={pdfStyles.scoreBox}>
            <Text style={pdfStyles.scoreLabel}>{score.label}</Text>
            <Text style={pdfStyles.scoreValue}>{score.value.toFixed(1)}%</Text>
            <View style={pdfStyles.progressBar}>
              <View style={[pdfStyles.progressFill, { width: `${score.value}%` }]} />
            </View>
            <Text style={pdfStyles.feedback}>
              {score.feedback(score.value)}
            </Text>
          </View>
        ))}
      </View>

      <View style={pdfStyles.card}>
        <Text style={pdfStyles.scoreLabel}>Overall Assessment</Text>
        <Text style={pdfStyles.scoreValue}>{aptitudeScore.overall.toFixed(1)}%</Text>
        <View style={pdfStyles.progressBar}>
          <View style={[pdfStyles.progressFill, { width: `${aptitudeScore.overall}%` }]} />
        </View>
        <Text style={pdfStyles.feedback}>
          {getOverallAptitudeFeedback(aptitudeScore.overall)}
        </Text>

        <View style={pdfStyles.suggestionsList}>
          <Text style={[pdfStyles.scoreLabel, { marginBottom: 6 }]}>
            Improvement Suggestions:
          </Text>
          {improvementSuggestions.map((suggestion, index) => (
            <View key={index} style={pdfStyles.suggestion}>
              <View style={pdfStyles.bullet} />
              <Text style={pdfStyles.suggestionText}>{suggestion}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};