import { Font } from '@react-pdf/renderer';

export const registerPDFFonts = () => {
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
};