import React from "react";
import phoneBookService from "./services/phone-book-service";

const Person = ({ name, number}) => {

  return (
    <>{name} {number}</>
  )

}

const Persons = ({ persons, setPersons,filtered_persons, search_criteria }) => {

  const deleteEntry = (id, name) => {

    let result = window.confirm(`Delete '${name}' ?`)
    if (result) {
      phoneBookService.deleteEntry(id)
        .then( returned_data => {
          let new_persons = persons.filter(person => person.id !==id)
          setPersons(new_persons)
        }

         

        )
    }
  }

  let phone_book = []
  if (search_criteria.length > 0) {
    phone_book = filtered_persons.map((person) => <Person name={person.name} number={person.number} key={person.id} />)
  } else {
    phone_book = persons.map((person) => {
      return (
        <div key={person.id}>
          <Person name={person.name} number={person.number}/><button onClick={() => deleteEntry(person.id, person.name)}>Delete</button>
        </div>
      )


    }






    )
  }
  return (phone_book)
}

export default Persons