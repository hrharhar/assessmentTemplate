import { StyleSheet } from '@react-pdf/renderer';

// Define colors to match Tailwind theme
const colors = {
  spotifyGreen: '#1DB954',
  spotifyBlack: '#191414',
  spotifyDarkGray: '#282828',
  spotifyLightGray: '#B3B3B3',
  spotifyWhite: '#FFFFFF',
  darkBg: '#333333',
  borderColor: '#404040'
};

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.spotifyBlack,
    color: colors.spotifyWhite,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: colors.spotifyWhite,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: colors.spotifyLightGray,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.spotifyWhite,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.spotifyDarkGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  scoreBox: {
    width: '48%',
    margin: '1%',
    padding: 12,
    backgroundColor: colors.darkBg,
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: colors.spotifyLightGray,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 20,
    color: colors.spotifyWhite,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.borderColor,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.spotifyGreen,
    borderRadius: 3,
  },
  feedback: {
    fontSize: 10,
    color: colors.spotifyLightGray,
    lineHeight: 1.4,
  },
  cefrBox: {
    backgroundColor: colors.darkBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  cefrLevel: {
    fontSize: 18,
    color: colors.spotifyWhite,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  suggestionsList: {
    marginTop: 12,
  },
  suggestion: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.spotifyGreen,
    marginRight: 6,
    marginTop: 4,
  },
  suggestionText: {
    flex: 1,
    fontSize: 10,
    color: colors.spotifyLightGray,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    paddingTop: 12,
    textAlign: 'center',
    fontSize: 10,
    color: colors.spotifyLightGray,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoGrid: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  infoItem: {
    flex: 1,
    margin: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.spotifyLightGray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: colors.spotifyWhite,
    fontWeight: 'bold',
  },
  assessmentNote: {
    backgroundColor: colors.spotifyDarkGray,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  assessmentNoteTitle: {
    fontSize: 14,
    color: colors.spotifyWhite,
    fontWeight: 'bold',
    marginBottom: 6,
  }
});