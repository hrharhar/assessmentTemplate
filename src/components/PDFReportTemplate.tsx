import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { TestResult } from '../types/test';
import { format } from 'date-fns';
import { getCEFRDescription, getSkillFeedback } from '../utils/feedbackGenerator';

// Register custom fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4TYFv.ttf' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 30,
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
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1e40af',
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 5,
  },
  skillSection: {
    marginBottom: 15,
  },
  skillTitle: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 5,
  },
  skillScore: {
    fontSize: 20,
    color: '#1a202c',
    marginBottom: 5,
  },
  skillFeedback: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 10,
  },
  cefrDescription: {
    fontSize: 12,
    color: '#4a5568',
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#edf2f7',
    borderRadius: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
    borderTop: '1 solid #e2e8f0',
    paddingTop: 10,
  }
});

interface PDFReportTemplateProps {
  result: TestResult;
}

export const PDFReportTemplate: React.FC<PDFReportTemplateProps> = ({ result }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessment Report</Text>
        <Text style={styles.subtitle}>
          {format(new Date(result.timestamp), 'MMMM d, yyyy')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidate Information</Text>
        <Text>Full Name: {result.userInfo.fullName}</Text>
        <Text>Target Role: {result.userInfo.targetRole}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>English Proficiency</Text>
        <Text style={styles.cefrDescription}>
          {getCEFRDescription(result.englishScore.level)}
        </Text>

        {(['grammar', 'vocabulary', 'reading', 'listening'] as const).map((skill) => (
          <View key={skill} style={styles.skillSection}>
            <Text style={styles.skillTitle}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</Text>
            <Text style={styles.skillScore}>{result.englishScore[skill].toFixed(1)}%</Text>
            <Text style={styles.skillFeedback}>
              {getSkillFeedback(skill, result.englishScore[skill])}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aptitude Assessment</Text>
        <View style={styles.skillSection}>
          <Text style={styles.skillTitle}>Logical Reasoning</Text>
          <Text style={styles.skillScore}>{result.aptitudeScore.logical.toFixed(1)}%</Text>
        </View>
        <View style={styles.skillSection}>
          <Text style={styles.skillTitle}>Numerical Ability</Text>
          <Text style={styles.skillScore}>{result.aptitudeScore.numerical.toFixed(1)}%</Text>
        </View>
        <View style={styles.skillSection}>
          <Text style={styles.skillTitle}>Problem Solving</Text>
          <Text style={styles.skillScore}>{result.aptitudeScore.problemSolving.toFixed(1)}%</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Professional Assessment Report</Text>
        <Text>This report is generated based on standardized assessment results.</Text>
      </View>
    </Page>
  </Document>
);