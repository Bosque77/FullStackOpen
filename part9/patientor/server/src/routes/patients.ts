import express from 'express';
import patientService from '../services/patientService';
import {NonSensitivePatientEntry, Patient} from "../types";
import toNewPatientEntry from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const patient_router = express.Router();


patient_router.get('/', (_req, res) => {
  const patients:NonSensitivePatientEntry[] = patientService.getNonSensitivePatientEntries();
  res.send(patients);
});


patient_router.get('/:id', (req, res) => {

  const patient:Patient | undefined = patientService.getPatientById(req.params.id);
  res.send(patient);
});

patient_router.post('/', (req, res) => {
  console.log('inside patient post request');
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addEntry(newPatientEntry);
    res.json(newPatient);
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patient_router;