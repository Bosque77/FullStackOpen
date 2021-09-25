import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



const WeatherData = ({ country }) => {


  const [weather_data, setWeatherData] = useState({})

  const api_key = process.env.REACT_APP_API_KEY
  let weather_data_url = "http://api.weatherstack.com/current" +
    "?access_key=" + api_key +
    "&query=" + country.name.common


  const hook = () => {
    axios.get(weather_data_url)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data.current)
      })
  }

  useEffect(hook, [])


  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      {weather_data ? <div>Temperature {weather_data.temperature}</div> : ""}
    </div>

  )
}

const Country = ({ country }) => {

  let capital = country.capital[0]
  let languages = country.languages
  let language_keys = Object.keys(languages)
  let flag_url = country.flags[0]

  var language_values = Object.keys(languages).map(key => {
    return languages[key];
  });



  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {capital}</div>
      <div>Population {capital}</div>
      <h2>Languages</h2>
      <ul>{language_values.map((language, i) => {
        return (
          <li key={language_keys[i]}>{language}</li>
        )
      })}</ul>

      <img src={flag_url} alt="Country Flag" width="500" height="600" />
    </div>
  )

}

const CountryData = ({ filtered_countries, setCurrentCountry }) => {


  const setCountryHandler = (country) => {
    const handler = () => {

      setCurrentCountry(country)
    }
    return handler
  }

  if (filtered_countries.length > 10) {
    return <div>make the search criteria more specific</div>
  } else if (filtered_countries.length < 10 && filtered_countries.length > 1) {
    return (
      <div>
        {filtered_countries.map(country =>
          <div key={country.name.common}>{country.name.common} <button onClick={setCountryHandler(country)}>show</button></div>)
        }
      </div>
    )
  } else if (filtered_countries.length === 1) {
    let country = filtered_countries[0]
    return (
      <div>
        <div>{country.name.common}</div>
    </div >
    )
  } else {
  return <div>Search for your countries</div>
}

}

function App() {

  const [search_criteria, setSearchCriteria] = useState('')
  const [countries, setCountries] = useState([])
  const [current_country, setCurrentCountry] = useState()
  const [filtered_countries, setFilteredCountires] = useState([])



  const hook = () => {
    axios.get('https://restcountries.com/v3/all')
      .then(response => {
        setCountries(response.data)
      })
  }



  useEffect(hook, [])

  const filterCountries = (event) => {
    let input_data = event.target.value
    setSearchCriteria(input_data)
    let new_filtered_countries = countries.filter(country => {

      let country_name = country.name.common.toLowerCase()
      let case_ind_search_criteria = input_data.toLowerCase()

      if (country_name.includes(case_ind_search_criteria)) {
        return true;
      } else {
        return false;
      }
    })

    if(new_filtered_countries.length==1){
      setCurrentCountry(new_filtered_countries[0])
    }else if(new_filtered_countries.length>1 || new_filtered_countries.length==0){
      setCurrentCountry()
    }

    setFilteredCountires(new_filtered_countries)

  }



  return (
    <div className="App">
      find countries <input value={search_criteria} onChange={filterCountries} />
      <CountryData filtered_countries={filtered_countries} setCurrentCountry={setCurrentCountry} />
      <div>
        {current_country ? <Country country={current_country} /> : ""}
        {current_country ? <WeatherData country={current_country} /> : ""}
      </div>
    </div>
  );
}

export default App;
