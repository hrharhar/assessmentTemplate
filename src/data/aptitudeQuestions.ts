import { Question } from '../types/test';

export const aptitudeQuestions: Question[] = [
  // Logical Reasoning
  {
    id: 'apt-log-1',
    type: 'aptitude',
    category: 'logical',
    text: 'In a sequence of numbers, each number after the first two is the sum of the previous two numbers: 1, 1, 2, 3, 5, 8, 13. What comes next?',
    options: ['15', '20', '21', '23'],
    correctAnswer: '21'
  },
  {
    id: 'apt-log-2',
    type: 'aptitude',
    category: 'logical',
    text: 'If all dolphins are mammals and all mammals breathe air, which conclusion is valid?',
    options: [
      'Only dolphins breathe air',
      'All dolphins breathe air',
      'Some air-breathing animals are dolphins',
      'No dolphins breathe underwater'
    ],
    correctAnswer: 'All dolphins breathe air'
  },
  {
    id: 'apt-log-3',
    type: 'aptitude',
    category: 'logical',
    text: 'In a line of people, John is 7th from the left and 4th from the right. How many people are in the line?',
    options: ['9', '10', '11', '12'],
    correctAnswer: '10'
  },
  {
    id: 'apt-log-4',
    type: 'aptitude',
    category: 'logical',
    text: 'If the day after tomorrow is two days before Thursday, what day is it today?',
    options: ['Monday', 'Sunday', 'Tuesday', 'Wednesday'],
    correctAnswer: 'Sunday'
  },
  {
    id: 'apt-log-5',
    type: 'aptitude',
    category: 'logical',
    text: 'Complete the pattern: 2, 6, 12, 20, 30, __',
    options: ['36', '40', '42', '44'],
    correctAnswer: '42'
  },

  // Numerical Ability
  {
    id: 'apt-num-1',
    type: 'aptitude',
    category: 'numerical',
    text: 'A store offers a 20% discount on a $150 item. During a special sale, they offer an additional 10% off the discounted price. What is the final price?',
    options: ['$108', '$105', '$112', '$98'],
    correctAnswer: '$108'
  },
  {
    id: 'apt-num-2',
    type: 'aptitude',
    category: 'numerical',
    text: 'If 8 workers can complete a project in 10 days working 6 hours per day, how many days will it take 6 workers working 8 hours per day to complete the same project?',
    options: ['8 days', '10 days', '12 days', '14 days'],
    correctAnswer: '10 days'
  },
  {
    id: 'apt-num-3',
    type: 'aptitude',
    category: 'numerical',
    text: 'A car travels 240 km in 3 hours. What is its average speed in meters per second?',
    options: ['20 m/s', '22.2 m/s', '25 m/s', '27.8 m/s'],
    correctAnswer: '22.2 m/s'
  },
  {
    id: 'apt-num-4',
    type: 'aptitude',
    category: 'numerical',
    text: 'In a class of 45 students, the ratio of boys to girls is 4:5. How many boys are in the class?',
    options: ['18', '20', '22', '25'],
    correctAnswer: '20'
  },
  {
    id: 'apt-num-5',
    type: 'aptitude',
    category: 'numerical',
    text: 'If a machine produces 120 parts in 4 hours, how many parts will it produce in 7 hours, assuming constant speed?',
    options: ['180', '210', '240', '270'],
    correctAnswer: '210'
  },

  // Problem Solving
  {
    id: 'apt-ps-1',
    type: 'aptitude',
    category: 'problem-solving',
    text: 'A water tank has two inlet pipes and one outlet pipe. Pipe A can fill the tank in 4 hours, Pipe B in 6 hours, and the outlet pipe can empty it in 12 hours. If all pipes are opened simultaneously, how long will it take to fill the tank?',
    options: ['3 hours', '4 hours', '6 hours', '8 hours'],
    correctAnswer: '6 hours'
  },
  {
    id: 'apt-ps-2',
    type: 'aptitude',
    category: 'problem-solving',
    text: 'In a database of 1000 records, a linear search takes 0.1 seconds to find a record. How long would it take to search through 5000 records?',
    options: ['0.3 seconds', '0.4 seconds', '0.5 seconds', '0.6 seconds'],
    correctAnswer: '0.5 seconds'
  },
  {
    id: 'apt-ps-3',
    type: 'aptitude',
    category: 'problem-solving',
    text: 'A project requires 100 hours of work. Three team members work on it: A works twice as fast as B, and B works three times as fast as C. If they work together, how many hours will it take to complete the project?',
    options: ['14 hours', '16 hours', '18 hours', '20 hours'],
    correctAnswer: '16 hours'
  },
  {
    id: 'apt-ps-4',
    type: 'aptitude',
    category: 'problem-solving',
    text: 'In an array of numbers from 1 to 100, one number is missing. The sum of all numbers should be 5050, but the actual sum is 4955. What is the missing number?',
    options: ['95', '96', '97', '98'],
    correctAnswer: '95'
  },
  {
    id: 'apt-ps-5',
    type: 'aptitude',
    category: 'problem-solving',
    text: 'A software system processes 1000 transactions per minute. If the system needs to be upgraded to handle 1.5 million transactions per day, what should be its minimum processing speed in transactions per minute?',
    options: ['850', '1042', '1250', '1458'],
    correctAnswer: '1042'
  }
];