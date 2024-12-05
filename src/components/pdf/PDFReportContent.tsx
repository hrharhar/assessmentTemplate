import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { TestResult } from '../../types/test';
import { format } from 'date-fns';
import { formatTime } from '../../utils/timeFormat';
import { PDFAptitudeSection } from './PDFAptitudeSection';
import { PDFEnglishSection } from './PDFEnglishSection';
import { pdfStyles } from './PDFStyles';

interface PDFReportContentProps {
  result: TestResult;
}

export const PDFReportContent: React.FC<PDFReportContentProps> = ({ result }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Assessment Report</Text>
          <View style={pdfStyles.flexRow}>
            <Text style={pdfStyles.subtitle}>
              {format(new Date(result.timestamp), 'MMMM d, yyyy')}
            </Text>
            <Text style={[pdfStyles.subtitle, { marginLeft: 16 }]}>
              Completion Time: {formatTime(result.completionTime)}
            </Text>
          </View>
        </View>

        <View style={pdfStyles.card}>
          <Text style={pdfStyles.sectionTitle}>Candidate Information</Text>
          <View style={pdfStyles.infoGrid}>
            <View style={pdfStyles.infoItem}>
              <Text style={pdfStyles.infoLabel}>Full Name</Text>
              <Text style={pdfStyles.infoValue}>{result.userInfo.fullName}</Text>
            </View>
            <View style={pdfStyles.infoItem}>
              <Text style={pdfStyles.infoLabel}>Target Role</Text>
              <Text style={pdfStyles.infoValue}>{result.userInfo.targetRole}</Text>
            </View>
          </View>
        </View>

        <PDFAptitudeSection aptitudeScore={result.aptitudeScore} />
        <PDFEnglishSection englishScore={result.englishScore} />

        <Text style={pdfStyles.footer}>
          Assessment Report - Generated on {format(new Date(), 'PPP')}
        </Text>
      </Page>
    </Document>
  );
};