import { collection, addDoc, getDocs, query, where, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { TestResult } from '../types/test';
import { PDFReportContent } from '../components/pdf/PDFReportContent';
import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { registerPDFFonts } from '../components/pdf/PDFFont';

// Register fonts for PDF generation
registerPDFFonts();

export const saveTestResult = async (result: TestResult) => {
  try {
    const docRef = await addDoc(collection(db, 'testResults'), {
      ...result,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

export const getAllTestResults = async () => {
  try {
    const q = query(
      collection(db, 'testResults'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TestResult[];
  } catch (error) {
    console.error('Error fetching all test results:', error);
    throw error;
  }
};

export const deleteTestResult = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'testResults', id));
  } catch (error) {
    console.error('Error deleting test result:', error);
    throw error;
  }
};

export const exportTestResultToCsv = (result: TestResult): string => {
  const headers = [
    'Full Name',
    'Target Role',
    'Date',
    'Completion Time',
    'Aptitude - Logical',
    'Aptitude - Numerical',
    'Aptitude - Problem Solving',
    'Aptitude - Overall',
    'English - Grammar',
    'English - Vocabulary',
    'English - Reading',
    'English - Listening',
    'English - Overall',
    'English - CEFR Level'
  ];

  const data = [
    result.userInfo.fullName,
    result.userInfo.targetRole,
    new Date(result.timestamp).toLocaleDateString(),
    `${Math.floor(result.completionTime / 60)} minutes ${result.completionTime % 60} seconds`,
    result.aptitudeScore.logical.toFixed(1) + '%',
    result.aptitudeScore.numerical.toFixed(1) + '%',
    result.aptitudeScore.problemSolving.toFixed(1) + '%',
    result.aptitudeScore.overall.toFixed(1) + '%',
    result.englishScore.grammar.toFixed(1) + '%',
    result.englishScore.vocabulary.toFixed(1) + '%',
    result.englishScore.reading.toFixed(1) + '%',
    result.englishScore.listening.toFixed(1) + '%',
    result.englishScore.overall.toFixed(1) + '%',
    result.englishScore.level
  ];

  return [headers.join(','), data.join(',')].join('\n');
};

export const generatePDFReport = async (result: TestResult): Promise<Blob> => {
  try {
    const element = React.createElement(PDFReportContent, { result });
    const pdfDoc = pdf();
    pdfDoc.updateContainer(element);
    const blob = await pdfDoc.toBlob();
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report. Please try again.');
  }
};