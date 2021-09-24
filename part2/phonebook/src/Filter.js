import React from 'react'

const Filter = ({ search_criteria, persons, setSearchCriteria, setFilteredPersons }) => {
    const filterSearchCriteria = (event) => {
      let updated_search_criteria = event.target.value
      let case_indep_search_criteria = updated_search_criteria.toLowerCase()
      setSearchCriteria(updated_search_criteria)
      let new_filtered_persons = [...persons]
      if (case_indep_search_criteria) {
        new_filtered_persons = persons.filter(person => person.name.toLowerCase().includes(case_indep_search_criteria))
      }
      setFilteredPersons(new_filtered_persons)
    }
  
    return (
      <div>
        filter shown with: <input value={search_criteria} onChange={filterSearchCriteria} />
      </div>
    )
  }

export default Filter