import React from 'react'
import Course from './Course.js'



const Total = (props) => {

  let parts = props.course.parts;
  const reducer = (s,p) =>{
    let num_of_exercises = 0
    if (s.exercises){
      num_of_exercises = s.exercises+p.exercises;
    }else{
      num_of_exercises = s+p.exercises;
    }
    return(
      num_of_exercises
    )
  }



  let total = parts.reduce(reducer);
  console.log("logging the total")
  console.log(total)
  return (
    <p>Number of exercises {total}</p>
  )
}




const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course)=>
        <ul key={course.id}>
            <Course course={course} />
            <Total course={course} />
        </ul>
      )}
    </div>

  )

}

export default App