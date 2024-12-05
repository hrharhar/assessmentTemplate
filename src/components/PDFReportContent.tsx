import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { TestResult } from '../types/test';
import { format } from 'date-fns';
import { formatTime } from '../utils/timeFormat';
import {
  getLogicalReasoningFeedback,
  getNumericalAbilityFeedback,
  getProblemSolvingFeedback,
  getOverallAptitudeFeedback,
  getImprovementSuggestions
} from '../utils/aptitudeFeedback';
import { getCEFRDescription, getSkillFeedback } from '../utils/feedbackGenerator';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf',
      fontWeight: 'bold'
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1e40af',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666666',
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#1e40af',
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 5,
  },
  scoreGrid: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  scoreBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    border: '1 solid #e2e8f0',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 20,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 5,
    lineHeight: 1.4,
  },
  suggestionsList: {
    marginTop: 10,
  },
  suggestion: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: '#1e40af',
    borderRadius: 1.5,
    marginRight: 5,
    marginTop: 5,
  },
  englishSection: {
    marginTop: 20,
  },
  cefrBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    border: '1 solid #e2e8f0',
  },
  cefrLevel: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 10,
    paddingTop: 10,
    borderTop: '1 solid #e2e8f0',
  },
  completionTime: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 5,
  }
});

interface PDFReportContentProps {
  result: TestResult;
}

export const PDFReportContent: React.FC<PDFReportContentProps> = ({ result }) => {
  const improvementSuggestions = getImprovementSuggestions(
    result.aptitudeScore.logical,
    result.aptitudeScore.numerical,
    result.aptitudeScore.problemSolving
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Assessment Report</Text>
          <Text style={styles.subtitle}>
            {format(new Date(result.timestamp), 'MMMM d, yyyy')}
          </Text>
          <Text style={styles.completionTime}>
            Completion Time: {formatTime(result.completionTime)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Candidate Information</Text>
          <Text style={styles.scoreLabel}>Full Name: {result.userInfo.fullName}</Text>
          <Text style={styles.scoreLabel}>Target Role: {result.userInfo.targetRole}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aptitude Assessment</Text>
          
          <View style={styles.scoreGrid}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>Logical Reasoning</Text>
              <Text style={styles.scoreValue}>{result.aptitudeScore.logical.toFixed(1)}%</Text>
              <Text style={styles.feedback}>
                {getLogicalReasoningFeedback(result.aptitudeScore.logical)}
              </Text>
            </View>
            
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>Numerical Ability</Text>
              <Text style={styles.scoreValue}>{result.aptitudeScore.numerical.toFixed(1)}%</Text>
              <Text style={styles.feedback}>
                {getNumericalAbilityFeedback(result.aptitudeScore.numerical)}
              </Text>
            </View>
            
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>Problem Solving</Text>
              <Text style={styles.scoreValue}>{result.aptitudeScore.problemSolving.toFixed(1)}%</Text>
              <Text style={styles.feedback}>
                {getProblemSolvingFeedback(result.aptitudeScore.problemSolving)}
              </Text>
            </View>
          </View>

          <View style={styles.cefrBox}>
            <Text style={styles.scoreLabel}>Overall Aptitude Score</Text>
            <Text style={styles.scoreValue}>{result.aptitudeScore.overall.toFixed(1)}%</Text>
            <Text style={styles.feedback}>
              {getOverallAptitudeFeedback(result.aptitudeScore.overall)}
            </Text>
          </View>

          <View style={styles.suggestionsList}>
            <Text style={[styles.scoreLabel, { marginBottom: 10 }]}>Improvement Suggestions:</Text>
            {improvementSuggestions.map((suggestion, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                <View style={styles.bullet} />
                <Text style={styles.suggestion}>{suggestion}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>English Proficiency</Text>
          
          <View style={styles.cefrBox}>
            <Text style={styles.cefrLevel}>CEFR Level: {result.englishScore.level}</Text>
            <Text style={styles.feedback}>
              {getCEFRDescription(result.englishScore.level)}
            </Text>
          </View>

          <View style={styles.scoreGrid}>
            {(['grammar', 'vocabulary', 'reading', 'listening'] as const).map((skill) => (
              <View key={skill} style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</Text>
                <Text style={styles.scoreValue}>{result.englishScore[skill].toFixed(1)}%</Text>
                <Text style={styles.feedback}>
                  {getSkillFeedback(skill, result.englishScore[skill])}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Assessment Report - Generated on {format(new Date(), 'PPP')}
        </Text>
      </Page>
    </Document>
  );
};