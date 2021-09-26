import React from "react"
import phoneBookService from "./services/phone-book-service"

const PersonForm = ({ newName, setNewName, newPhone, setNewPhone, persons, setPersons }) => {

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
      let confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const current_person = persons.find(person => person.name === newName)
        const updated_contact = { ...current_person, number: newPhone }
        phoneBookService.update(current_person.id,updated_contact)
        let new_persons = persons.map(person=> person.id===current_person.id ? updated_contact : person)
        setPersons(new_persons)
      }
    } else {
      let new_person = { name: newName, number: newPhone }
      phoneBookService.create(new_person)
        .then(person_data => {
          let new_persons = persons.concat(person_data)
          setPersons(new_persons);
        })
        .catch(error => {
          console.log("error saving the phonebook data")
        })

    }
  }
  return (
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
  )
}


export default PersonForm