import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log("Error fetching weather");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </div>

      <div className="app-container">
        <h1 className="title">🌤 Weather App</h1>
        <div className="datetime">
            <div className="time-row">
              <div className="clock"></div>
              <p>{time.toLocaleTimeString()}</p>
            </div>
            <p>{time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {weather && (
          <div className="weather-box">
            <h2>{weather.name}</h2>
            <p>🌡 Temperature: {weather.main.temp} °C</p>
            <p>🌥 Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Weather;