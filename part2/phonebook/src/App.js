import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search_criteria,setSearchCriteria] = useState('')
  const [filtered_persons,setFilteredPersons] = useState([])

  const submitName = (event) => {
    let updated_name = event.target.value
    setNewName(updated_name)
  }

  const submitPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const submitNameForm = (event) => {
    event.preventDefault()

    let names = persons.map(person => person.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      let new_person = { name: newName, number: newPhone }
      let new_persons = persons.concat(new_person)
      setPersons(new_persons);
    }
  }

  const filterSearchCriteria = (event) => {
    let updated_search_criteria = event.target.value
    let case_indep_search_criteria = updated_search_criteria.toLowerCase()
    setSearchCriteria(updated_search_criteria)
    let new_filtered_persons = [...persons]
    if(case_indep_search_criteria){
      new_filtered_persons = persons.filter( person => person.name.toLowerCase().includes(case_indep_search_criteria))
    }
    setFilteredPersons(new_filtered_persons)
  }


  const PhoneBook = ({}) =>{

    let phone_book = []
    if(search_criteria.length>0 ){
      phone_book = filtered_persons.map((person, i) =>
        <div key={person.name + i}>{person.name} {person.number}</div>
      )
    }else{
      phone_book = persons.map((person, i) =>
      <div key={person.name + i}>{person.name} {person.number}</div>)
    }
    return(phone_book)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={search_criteria} onChange={filterSearchCriteria} />
      </div>
      <br/>
      <form onSubmit={submitNameForm}>
        <div>
          name: <input value={newName} onChange={submitName} />
        </div>
        <div>
          phone number: <input value={newPhone} onChange={submitPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>

        <PhoneBook />

      </ul>

    </div>
  )
}

export default App