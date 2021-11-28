import patients from '../../data/patients';
import { Patient,NonSensitivePatientEntry, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';



const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = ():NonSensitivePatientEntry[] => {
    return patients.map(({id,name,occupation,gender,dateOfBirth})=>({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};

const addEntry = (entry:NewPatient):Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


export default {
  getEntries,
  getNonSensitivePatientEntries,
  addEntry
};