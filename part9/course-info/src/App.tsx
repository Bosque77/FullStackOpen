import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}



interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseExtended {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartBaseExtended {
  type: "special",
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }

]


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName }: { courseName: string }) => {
  return (
    <h1>{courseName}</h1>
  )
}



const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(course => <div><Part coursePart={course} /></div>)}
    </div>
  )
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          {coursePart.description}
        </div>
      )
    case "groupProject":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          project exercises {coursePart.groupProjectCount}
        </div>
      )
    case "submission":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          {coursePart.description}  {coursePart.exerciseSubmissionLink}
        </div>
      )
    case "special":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          required skills {coursePart.requirements.map(requirement => requirement + ' ')}
        </div>

      )

    default:
      return assertNever(coursePart)
  }
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div style={{ marginTop: "20px" }}> 
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>)
}


const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
