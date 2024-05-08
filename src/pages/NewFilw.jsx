import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./Dashboard.css";
import cloud from "../assests/cloudy.png";
import clear from "../assests/clear.png";
import rain from "../assests/rain.png";
import winter from "../assests/winter.png";
import clouds from "../assests/clouds.png";
import mist from "../assests/mist.png";
import shower from "../assests/shower rain.png";
import strom from "../assests/strom.png";
import humidity from "../assests/humidity.png";
import wind from "../assests/wind.png";

function Dashboard() {
  let api_key = "64bd7b2db8c96ff716df610a71630431";
  let location = "Colombo";

  const [wicon, setWicon] = useState(cloud);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const [showError, setShowError] = useState(false);

  const fetchWeatherAndForecast = async (location) => {
    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();
  
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=Metric&appid=${api_key}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
  
      if (currentWeatherData.cod === 200 && forecastData.cod === "200") {
        setCurrentWeather(currentWeatherData);
        
        // Filter forecasts for 12:00:00 for the next three days
        const currentDate = new Date();
        const nextThreeDaysData = forecastData.list.filter(item => {
          const forecastDateTime = new Date(item.dt_txt);
          return (
            forecastDateTime.getHours() === 12 &&
            forecastDateTime.getDate() > currentDate.getDate() &&
            forecastDateTime.getDate() <= currentDate.getDate() + 3
          );
        });
        
        // Set icon based on weather condition
        setWeatherIcon(currentWeatherData.weather[0].icon);
  
        // Set forecast data
        setForecastData(nextThreeDaysData);
        
        setErrorMessage("");
        setShowError(false);
      } else {
        setErrorMessage("Please Enter City Name Correctly");
        setShowError(true); // Show error message
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setShowError(true); // Show error message
    }
  };
  

  useEffect(() => {
    fetchWeatherAndForecast(location); // Default location
  }, []);

  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setWicon(clear);
        break;
      case "02d":
      case "02n":
        setWicon(cloud);
        break;
      case "03d":
      case "03n":
        setWicon(clouds);
        break;
      case "04d":
      case "04n":
        setWicon(clouds);
        break;
      case "09d":
      case "09n":
        setWicon(shower);
        break;
      case "10d":
      case "10n":
        setWicon(rain);
        break;
      case "11d":
      case "11n":
        setWicon(strom);
        break;
      case "13d":
      case "13n":
        setWicon(winter);
        break;
      case "50d":
      case "50n":
        setWicon(mist);
        break;
      default:
        setWicon(cloud);
        break;
    }
  };

  const search = async () => {
    if (searchQuery === "") {
      setErrorMessage("Please enter a city name.");
      setShowError(true); // Show error message
      return;
    }
    fetchWeatherAndForecast(searchQuery);
  };

  return (
    <div className="container">
      <div className="header-weatherdash">
        <h1>Weather App</h1>
      </div>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search"
          className="cityInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <FaSearch />
        </div>
      </div>
      <div className="middle-container">
        <div className="weather-card">
          
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather">
            {currentWeather.weather
              ? currentWeather.weather[0].description
              : ""}
          </div>
          <div className="weather-temp">
            {currentWeather.main ? currentWeather.main.temp : ""} °c
          </div>
          <div className="weather-location">{currentWeather.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {currentWeather.main ? currentWeather.main.humidity : ""}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img src={wind} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">
                  {currentWeather.wind ? currentWeather.wind.speed : ""} km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="days-forecast">
            <div style={{display:"flex"}}>
          <div className="day-forecast-text">Forecast for 3 Days</div>
          <button style={{backgroundColor: "#263651",
        color: "#ffffff",
        padding: "4px 8px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        marginTop: "30px",
        marginLeft:"100px",
        }}>View More</button>
          </div>
          <div className="day-forecast-Maincards">
            {forecastData.slice(0, 3).map((forecast, index) => (
              <div key={index} className="day-forecast-card">
                <h3>{forecast.dt_txt}</h3>
                
                <img src={wicon} alt="" />
                <div className="weather-temp-forecast">
                  Temp: {forecast.main.temp} °c
                </div>
                <div className="humidity-forecast">
                  Humidity: {forecast.main.humidity}%
                </div>
                <div className="wind-forecast">
                  Wind: {forecast.wind.speed} km/h
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Error Modal */}
      {showError && (
        <div className="error-modal">
          <div className="error-message">{errorMessage}</div>
          <button style={{
        backgroundColor: "#ff5252",
        color: "#ffffff",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "8px" // Add margin to separate button from error message
      }} onClick={() => setShowError(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
