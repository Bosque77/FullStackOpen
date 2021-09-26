import React, { useState, useEffect } from 'react'
import Persons from './Persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import axios from 'axios'





const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search_criteria, setSearchCriteria] = useState('')
  const [filtered_persons, setFilteredPersons] = useState([...persons])


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search_criteria={search_criteria} persons={persons} setSearchCriteria={setSearchCriteria} setFilteredPersons={setFilteredPersons} />
      <br />
      <PersonForm newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} setPersons={setPersons} filtered_persons={filtered_persons} search_criteria={search_criteria} />
      </ul>

    </div>
  )
}

export default App