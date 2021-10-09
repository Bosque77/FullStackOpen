import React, { useState, useEffect } from 'react'
import Persons from './Persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import {NotificationMessage, ErrorMessage} from './Message.js'
import axios from 'axios'
import phoneBookService from "./services/phone-book-service";




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search_criteria, setSearchCriteria] = useState('')
  const [filtered_persons, setFilteredPersons] = useState([...persons])
  const [message, setMessage] = useState()
  const [error_message, setErrorMessage] = useState()

  const hook = () => {
    console.log('effect')
    phoneBookService.getAll().then(returned_persons => {
        console.log(returned_persons)
        console.log('promise fulfilled')
        setPersons(returned_persons)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <NotificationMessage message={message}/>
      <ErrorMessage message={error_message}/>
      <h2>Phonebook</h2>
      <Filter search_criteria={search_criteria} persons={persons} setSearchCriteria={setSearchCriteria} setFilteredPersons={setFilteredPersons} />
      <br />
      <PersonForm newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} persons={persons} setPersons={setPersons} setMessage={setMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} setPersons={setPersons} filtered_persons={filtered_persons} search_criteria={search_criteria} setMessage={setMessage} setErrorMessage={setErrorMessage}/>
      </ul>

    </div>
  )
}

export default App