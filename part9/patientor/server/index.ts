import express from 'express';
import cors from 'cors';
import diagnosis_router from './src/routes/diagnoses';
import patient_router from './src/routes/patients';


const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/diagnoses',diagnosis_router);
app.use('/api/patients', patient_router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});