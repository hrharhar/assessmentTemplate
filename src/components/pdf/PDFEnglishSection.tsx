import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { TestResult } from '../../types/test';
import { pdfStyles } from './PDFStyles';
import { getCEFRDescription, getSkillFeedback } from '../../utils/feedbackGenerator';

interface PDFEnglishSectionProps {
  englishScore: TestResult['englishScore'];
}

export const PDFEnglishSection: React.FC<PDFEnglishSectionProps> = ({ englishScore }) => {
  const skills = ['grammar', 'vocabulary', 'reading', 'listening'] as const;

  return (
    <View style={pdfStyles.section} wrap={false}>
      <Text style={pdfStyles.sectionTitle}>English Proficiency</Text>
      
      <View style={pdfStyles.cefrBox}>
        <Text style={pdfStyles.scoreLabel}>Overall CEFR Level</Text>
        <Text style={pdfStyles.cefrLevel}>{englishScore.level}</Text>
        <Text style={pdfStyles.feedback}>
          {getCEFRDescription(englishScore.level)}
        </Text>
      </View>

      <View style={pdfStyles.scoreGrid}>
        {skills.map((skill) => (
          <View key={skill} style={pdfStyles.scoreBox}>
            <Text style={pdfStyles.scoreLabel}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </Text>
            <Text style={pdfStyles.scoreValue}>
              {englishScore[skill].toFixed(1)}%
            </Text>
            <View style={pdfStyles.progressBar}>
              <View style={[pdfStyles.progressFill, { width: `${englishScore[skill]}%` }]} />
            </View>
            <Text style={pdfStyles.feedback}>
              {getSkillFeedback(skill, englishScore[skill])}
            </Text>
          </View>
        ))}
      </View>

      <View style={pdfStyles.assessmentNote}>
        <Text style={pdfStyles.assessmentNoteTitle}>Assessment Note</Text>
        <Text style={pdfStyles.feedback}>
          This assessment provides a snapshot of your current English proficiency level. 
          Regular practice and exposure to English in various contexts will help improve your skills.
        </Text>
      </View>
    </View>
  );
};