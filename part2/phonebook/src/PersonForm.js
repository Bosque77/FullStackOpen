import React from "react"

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
        window.alert(`${newName} is already added to phonebook`)
      } else {
        let new_id = persons.length+1
        let new_person = { name: newName, number: newPhone , id: new_id}
        let new_persons = persons.concat(new_person)
        setPersons(new_persons);
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