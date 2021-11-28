import express from 'express';
import diagnosisService from '../services/diagnosisService';
import {Diagnosis} from "../types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnosis_router = express.Router();


diagnosis_router.get('/', (_req, res) => {
  const diagnoses:Diagnosis[] = diagnosisService.getEntries();
  res.send(diagnoses);
});

diagnosis_router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default diagnosis_router;