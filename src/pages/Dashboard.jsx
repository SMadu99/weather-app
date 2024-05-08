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
  const api_key = "64bd7b2db8c96ff716df610a71630431";

  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showError, setShowError] = useState(false);
  const [viewMore, setViewMore] = useState(false); 
  const [currentCity, setCurrentCity] = useState("Colombo"); // State to track currently searched city

  useEffect(() => {
    fetchWeatherAndForecast(currentCity); // Fetch weather for the current city
  }, [viewMore, currentCity]); // Re-fetch weather data when viewMore or currentCity changes

  const fetchWeatherAndForecast = async (city) => {
    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${api_key}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (currentWeatherData.cod === 200 && forecastData.cod === "200") {
        setCurrentWeather(currentWeatherData);

        const currentDate = new Date();
        let filteredForecastData;
        if (viewMore) {
          filteredForecastData = forecastData.list.filter((item) => {
            const forecastDateTime = new Date(item.dt_txt);
            return forecastDateTime.getHours() === 12 && forecastDateTime.getDate() > currentDate.getDate();
          });
        } else {
          filteredForecastData = forecastData.list.filter((item) => {
            const forecastDateTime = new Date(item.dt_txt);
            return forecastDateTime.getHours() === 12 && forecastDateTime.getDate() > currentDate.getDate() && forecastDateTime.getDate() <= currentDate.getDate() + 3;
          });
        }

        setForecastData(filteredForecastData);
        setErrorMessage("");
        setShowError(false);
      } else {
        setErrorMessage("Please Enter City Name Correctly");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setShowError(true);
    }
  };

  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear;
      case "02d":
      case "02n":
        return cloud;
      case "03d":
      case "03n":
        return clouds;
      case "04d":
      case "04n":
        return clouds;
      case "09d":
      case "09n":
        return shower;
      case "10d":
      case "10n":
        return rain;
      case "11d":
      case "11n":
        return strom;
      case "13d":
      case "13n":
        return winter;
      case "50d":
      case "50n":
        return mist;
      default:
        return cloud;
    }
  };

  const search = async () => {
    if (searchQuery === "") {
      setErrorMessage("Please enter a city name.");
      setShowError(true);
      return;
    }
    setCurrentCity(searchQuery); 
    setSearchQuery(""); 
  };

  return (
    <div className="container">
      <div className="header-weatherdash">
        <h1>Weather Dashboard</h1>
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
            <img src={setWeatherIcon(currentWeather.weather?.[0]?.icon)} alt="" />
          </div>
          <div className="weather">
            {currentWeather.weather ? currentWeather.weather[0].description : ""}
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
          <div style={{ display: "flex" }}>
            <div className="day-forecast-text">Forecast Details</div>
            <button
              style={{
                backgroundColor: "#263651",
                color: "#ffffff",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                marginTop: "30px",
                marginLeft: "20px",
              }}
              onClick={() => setViewMore(!viewMore)}
            >
              {viewMore ? "View Less" : "View More"}
            </button>
          </div>
          <div className="day-forecast-Maincards">
            {forecastData.map((forecast, index) => (
              <div key={index} className="day-forecast-card">
                <h3>{forecast.dt_txt}</h3>
                <img src={setWeatherIcon(forecast.weather?.[0]?.icon)} alt="" />
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
      {showError && (
        <div className="error-modal">
          <div className="error-message">{errorMessage}</div>
          <button
            style={{
              backgroundColor: "#ff5252",
              color: "#ffffff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginTop: "8px",
            }}
            onClick={() => setShowError(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
