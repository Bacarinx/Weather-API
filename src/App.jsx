import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useQuery } from 'react-query'

function App() {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY
  const [city, setCity] = useState('')
  const [prevData, setPrevData] = useState(null)

  const { isLoading, error, refetch } = useQuery(
    ['weather', city],
    async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${privateKey}&lang=pt_br`,
      )
      return response.data
    },
    {
      enabled: false, // Don't fetch data automatically, wait for the user to trigger it
      onSuccess: (fetchData) => {
        setPrevData(fetchData)
        document.body.style.background = `url('https://source.unsplash.com/1800x1200/?Cidade-${city}')`
      },
      staleTime: 1000,
    },
  )

  const handleSetCity = (e) => {
    setCity(e.target.value)
  }

  const handlecallAPI = (e) => {
    e.preventDefault()
    refetch()
  }

  const handleButtonClick = async (e) => {
    e.preventDefault()
    await setCity(e.target.value)
    refetch()
  }

  return (
    <div className="container">
      <div className="form">
        <h3>Previsão do clima para hoje da cidade:</h3>
        <div className="form-input-container">
          <form action="Post">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              onChange={handleSetCity}
            />
            <button
              type="submit"
              onClick={async (e) => {
                handlecallAPI(e)
              }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="carregando">
          <strong>Carregando dados</strong>
          <p>Aguarde um momento</p>
        </div>
      ) : error ? (
        <div className="erros">
          <p>
            <strong>ERRO: </strong>Cidade não encontrada
          </p>
          <p>Pesquise o nome da cidade em inglês.</p>
        </div>
      ) : !prevData ? (
        <div className="buttons">
          <button
            value="Sorocaba"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Sorocaba
          </button>
          <button
            value="Seul"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Seul
          </button>
          <button
            value="Tokio"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Tókio
          </button>
          <button
            value="Cancun"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Cancún
          </button>
          <button
            value="New York"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Nova Yorque
          </button>
          <button
            value="Madrid"
            className="btn"
            onClick={(e) => handleButtonClick(e)}
          >
            Madrid
          </button>
        </div>
      ) : (
        <div id="weather-data">
          <h2>
            <i className="fa-solid fa-location-dot"></i>
            <span id="city">{prevData.name}</span>
            <img
              src={`https://flagsapi.com/${prevData.sys.country}/flat/32.png`}
              alt="Country"
            />
          </h2>
          <p id="temperature">
            <span>{prevData.main.temp.toFixed(1)}</span>&deg;C
          </p>
          <div id="description-container">
            <p id="description">{prevData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${prevData.weather[0].icon}.png`}
              alt="Condição do tempo"
              id="weather-icon"
            />
          </div>
          <div id="details-container">
            <p id="umidity">
              <i className="fa-solid fa-droplet"></i>
              <span>{prevData.main.humidity}%</span>
            </p>
            <p id="wind">
              <i className="fa-solid fa-wind"></i>
              <span>{prevData.wind.speed.toFixed(1)}km/h</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
