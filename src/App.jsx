import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY
  const [city, setCity] = useState('')
  const [data, setData] = useState()
  // const body = document.querySelector('body')

  async function dataSet(cityName) {
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${privateKey}&lang=pt_br`
    const response = await axios.get(apiWeather)
    setData(response.data)
    document.body.style.background = `url('https://source.unsplash.com/1600x1000/?Cidade-${cityName}')`
    console.log(response.data)
  }

  return (
    <div className="container">
      <div className="form">
        <h3>Previsão do clima para hoje da cidade:</h3>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            onChange={(e) => {
              setCity(e.target.value)
            }}
          />
          <button
            onClick={async (e) => {
              e.preventDefault()
              const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${privateKey}&lang=pt_br`
              const response = await axios.get(apiWeather)
              setData(response.data)
              console.log(response.data)
              document.body.style.background = `url('https://source.unsplash.com/1600x1000/?Cidade-${city}')`
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {!data ? (
        <div className="buttons">
          <button
            value="Sorocaba"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Sorocaba
          </button>
          <button
            value="Seul"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Seul
          </button>
          <button
            value="Tokio"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Tókio
          </button>
          <button
            value="Cancun"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Cancún
          </button>
          <button
            value="New York"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Nova Yorque
          </button>
          <button
            value="Jacarta"
            className="btn"
            onClick={(e) => {
              setCity(e.target.value)
              dataSet(e.target.value)
            }}
          >
            Jacarta
          </button>
        </div>
      ) : (
        <div id="weather-data">
          <h2>
            <i className="fa-solid fa-location-dot"></i>
            <span id="city">{data.name}</span>
            <img
              src={`https://flagsapi.com/${data.sys.country}/flat/32.png`}
              alt="Country"
            />
          </h2>
          <p id="temperature">
            <span>{data.main.temp.toFixed(1)}</span>&deg;C
          </p>
          <div id="description-container">
            <p id="description">{data.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt="Condição do tempo"
              id="weather-icon"
            />
          </div>
          <div id="details-container">
            <p id="umidity">
              <i className="fa-solid fa-droplet"></i>
              <span>{data.main.humidity}%</span>
            </p>
            <p id="wind">
              <i className="fa-solid fa-wind"></i>
              <span>{data.wind.speed.toFixed(1)}km/h</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
