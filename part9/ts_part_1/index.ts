import express from 'express';
const app = express();
app.use(express.json());
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

interface ExerciseRequest {
  "daily_exercises": Array<number>
  "target": number
}



app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    try{
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        console.log(height,weight);
        const data = calculateBmi(height,weight);
        res.json(data);
    }catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if(error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(500).send(errorMessage);
    }
});

app.post('/exercise',(req,res) => {
  try{
    const data  = req.body as ExerciseRequest ;
    const daily_exercises:number[] = data.daily_exercises;
    const target:number = data.target;
    
    if (!daily_exercises || ! target){
      throw 'parameters missing';
    }

 
    const exercise_results = calculateExercises(daily_exercises,target);
    console.log(exercise_results );
    res.json(exercise_results);

  }catch(error: unknown){
    console.log(error);
    const error_message = {
      error: 'parameters missing'
    };
    if(error instanceof TypeError) {
      error_message.error = 'format of the data is incorrect';
    }

    res.status(400).send(error_message);

  }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});