import {NewPatient, Gender} from './types';



type Fields = { name : unknown, occupation: unknown, gender: unknown, ssn: unknown, dateOfBirth: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = ({ name, occupation, gender, ssn, dateOfBirth } : Fields): NewPatient => {
    console.log('inside toNewPatientEntry');
    const newEntry: NewPatient = {
        name: parseData(name),
        occupation: parseData(occupation),
        gender: parseGender(gender),
        ssn: parseData(ssn),
        dateOfBirth: parseData(dateOfBirth),
        entries: []
    };

    return newEntry;
};



const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// The data proofing here is not very good. I should use enums and more specific types
const parseData = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
    return name;
  };


  // The data proofing here is not very good. I should use enums and more specific types
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing comment');
    }
    return gender;
  };


export default toNewPatientEntry;