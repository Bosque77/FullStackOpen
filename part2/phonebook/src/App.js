import React, { useState } from 'react'
import Persons from './Persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search_criteria, setSearchCriteria] = useState('')
  const [filtered_persons, setFilteredPersons] = useState([...persons])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search_criteria={search_criteria} persons={persons} setSearchCriteria={setSearchCriteria} setFilteredPersons={setFilteredPersons} />
      <br />
      <PersonForm newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} filtered_persons={filtered_persons} search_criteria={search_criteria} />
      </ul>

    </div>
  )
}

export default App