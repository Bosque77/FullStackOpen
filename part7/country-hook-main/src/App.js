import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const getCountryData = async(url) =>{
    let response = await axios.get(url)
    console.log(response)
    let response_data = response.data
    let data = response_data[0]

    const country_data = {
      found: true,
      data: {
        name: data.altSpellings[1],
        capital: data.capital,
        population: data.population,
        flag: data.flags.png,
    }
  }

    setCountry(country_data)
  }

  useEffect(() => {
    console.log('inside use effect ')

    let url = `https://restcountries.com/v3.1/name/${name}`
    getCountryData(url)

  },[name])

  return country
}

const Country = ({ country }) => {
  console.log('country passed into Country component')
  console.log(country)

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
