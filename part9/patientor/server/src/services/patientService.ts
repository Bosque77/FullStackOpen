import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient} from '../types';
import { v1 as uuid } from 'uuid';



const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
    entries
  }));
};

const getPatientById = (id:string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if(patient){
    return {
      id: patient.id,
      name: patient.name,
      occupation: patient.occupation,
      gender: patient.gender,
      ssn: patient.ssn,
      dateOfBirth: patient.dateOfBirth,
      entries: patient.entries
    };

  }else{
    return undefined;
  }

};

const addEntry = (entry: NewPatient): Patient => {
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
  addEntry,
  getPatientById
};