import './App.css'

function App() {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY

  return (
    <div className="container">
      <div className="form">
        <h3>Previsão do clima para hoje da cidade:</h3>
        <div className="form-input-container">
          <input type="text" placeholder="Digite o nome da cidade" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div id="weather-data">
        <h2>
          <i className="fa-solid fa-location-dot"></i>
          <span id="city">Maceió</span>
          <img src="" alt="Country" />
        </h2>
        <p id="temperature">
          <span>38</span>&deg;C
        </p>
        <div id="description-container">
          <p id="description">Nublado</p>
          <img src="" alt="Condição do tempo" id="weather-icon" />
        </div>
        <div id="Details-container">
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
