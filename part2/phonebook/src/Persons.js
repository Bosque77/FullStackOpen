import React from "react";

const Person = ({ name, number}) => <div>{name} {number}</div>

const Persons = ({ persons, filtered_persons, search_criteria }) => {

  let phone_book = []
  if (search_criteria.length > 0) {
    phone_book = filtered_persons.map((person) => <Person name={person.name} number={person.number} key={person.id} />)
  } else {
    phone_book = persons.map((person) => <Person name={person.name} number={person.number} key={person.id} />)
  }
  return (phone_book)
}

export default Persons