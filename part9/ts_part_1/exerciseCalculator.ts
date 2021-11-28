
interface ExerciseResults  {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription:string,
    target: number,
    average: number
}



export const calculateExercises = (training_hours: Array<number>, target_value:number): ExerciseResults => {

    const periodLength = training_hours.length;
    const training_days = training_hours.filter(day=> day !== 0);
    const trainingDays = training_days.length;
    const target = target_value;
    const average = training_days.reduce((prev,cur)=>prev+cur,0)/periodLength;
    let ratingDescription = null;
    let success = null;
    let rating = null;
    if(average>=target){
        ratingDescription = 'Excellent Work keep it up';
        success = true;
        rating = 3;
    }else{
        ratingDescription = 'Step up your game your almost there';
        success = false;
        rating=1;
    }

    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


// const last_argument = process.argv.length-1;
// const target_hours = Number(process.argv[last_argument]);
// const workout_hours: number[] = process.argv.slice(2,last_argument).map(hours => Number(hours));

// const data = calculateExercises(workout_hours,target_hours);
// console.log(data);
