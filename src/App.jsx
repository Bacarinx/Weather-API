import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY
  const [city, setCity] = useState('')
  const [data, setData] = useState([{}])

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
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div id="weather-data">
        <h2>
          <i className="fa-solid fa-location-dot"></i>
          <span id="city">{city}</span>
          <img
            src={`https://flagsapi.com/${data.sys.country}/flat/32.png`}
            alt="Country"
          />
        </h2>
        <p id="temperature">
          <span>{data.main.temp.toFixed(1)}</span>&deg;C
        </p>
        <div id="description-container">
          <p id="description">Nublado</p>
          <img src="" alt="Condição do tempo" id="weather-icon" />
        </div>
        <div id="details-container">
          <p id="umidity">
            <i className="fa-solid fa-droplet"></i>
            <span>48%</span>
          </p>
          <p id="wind">
            <i className="fa-solid fa-wind"></i>
            <span>3km/h</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
