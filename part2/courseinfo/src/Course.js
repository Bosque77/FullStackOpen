
const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }

const Course = ({ course }) => {

    let parts = course.parts;
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {parts.map(part =>
                    <li key={part.id}>
                        <Part name={part.name} exercises={part.exercises} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Course