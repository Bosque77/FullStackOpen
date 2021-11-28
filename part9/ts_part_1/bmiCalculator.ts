

// A normal BMI is between18. 5 and 25; a person with a BMI between 25 and 30 is 
// considered overweight; and a person with a BMI over 30 
// is considered obese. A person is considered underweight if the BMI is less than 18.5.



export const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / (height ** 2) * 10000);
    const bmi_result = bmi.toFixed(1);
    if (bmi < 18.5) {
        return `Underweight BMI: ${bmi_result}`;
    } else if (bmi >= 18.5 && bmi <= 25) {
        return `Normal (healthy weight) BMI: ${bmi_result}`;
    } else if (bmi >= 25 && bmi <= 30) {
        return `Overweight BMI: ${bmi_result}`;
    } else if (bmi > 30) {
        return `Obese BMI: ${bmi_result}`;
    } else {
        throw new Error('Inputs are incorrect');
    }

};

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])
// let result = calculateBmi(height, weight)
// console.log(result)