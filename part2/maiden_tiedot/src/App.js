import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Content = ({countries, handleShow}) => 
  countries.length === 1 ? 
    <Country country={countries[0]} />
    :
    <CountryList countries={countries} handleShow={handleShow} />


const CountryList = ({countries, handleShow}) => 
  countries.map(country => 
    <div key={country.area}> 
      {country.name} <button value={country.name} onClick={handleShow} >show</button>
    </div>
  )

const Country = ({country}) =>
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <Languages languages={country.languages} />
    <div><img alt="flag" src={country.flag} width="200" height="100"/></div>
    <h2>Weather in {country.capital}</h2>
    <Weather capital={country.capital} />
  </div>

const Languages = ({languages}) => 
  <div>
    <h3>languages</h3>
    <ul>
      {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
  </div>

const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])
    const weatherHook = () => {
      const params = {
        access_key: '64942d7524419b60a1b546dcab66dde6',
        query: capital
      }
      axios
        .get('https://api.weatherstack.com/current', {params})
        .then(response => {
          const apiResponse = response.data;
          console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
          setWeather(apiResponse)
        })
        .catch(error => {
          console.log(error);
        });
      }
    useEffect(weatherHook, [])
    
    return weather ? 
      <div>
        <p><b>temperature</b> {weather ? weather.temp_c : ""} Celsius</p>
        <p><img alt="weather icon" src={`http:${weather.weather_icons}`} /></p>
        <p><b>wind</b> {weather.wind_kph} kph, direction {weather.wind_dir}</p>
      </div> 
      : <></>
  }

function App() {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
  }
  const filterCallback = (country) => RegExp(searchWord, 'i').test(country.name)
  const countriesToShow = countries.filter(filterCallback)
 
  return (
    <div className="App">
      <h2>Country infos!</h2>
       <input value={searchWord} onChange={handleSearch} placeholder='Find a country!' />
      { countriesToShow.length > 10 ?
          <p>Too many matches, specify another filter</p>
          :
          <Content countries={countriesToShow} handleShow={handleSearch} />
      }
    </div>
  );
}

export default App;