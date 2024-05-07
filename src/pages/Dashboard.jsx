import React, { useState } from "react";
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

  const [wicon, setWicon] = useState(cloud);
  const [errorMessage, setErrorMessage] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      setErrorMessage("Please enter a city name.");
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const weather = document.getElementsByClassName("weather");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temprature[0].innerHTML = data.main.temp + " °c";
    location[0].innerHTML = data.name;
    weather[0].innerHTML = data.weather[0].description;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(clouds);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(clouds);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(shower);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain);
    } else if (
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      setWicon(strom);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(winter);
    } else if (
      data.weather[0].icon === "50d" ||
      data.weather[0].icon === "50n"
    ) {
      setWicon(mist);
    }
  };

  return (
    <div className="container">
      <div className="header-weatherdash">
        <h1>Weather App</h1>
      </div>
      <div className="top-bar">
        <input type="text" placeholder="Search" className="cityInput" />

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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather">Cloud</div>
          <div className="weather-temp">24 c</div>
          <div className="weather-location">London</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img src={wind} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="days-forecast">
          <div className="day-forecast-text">
            Forecast for 3 Days
          </div>
          <div className="day-forecast-Maincards">
            <div className="day-forecast-card">
                <h3 >2024-05-08</h3>
                <img src={cloud} alt="" />
                <div className="weather-temp-forecast">Temp:24 c</div>
                <div className="humidity-forecast">Humidity:24 c</div>
                <div className="wind-forecast">Wind:24 c</div>
            </div>
            <div className="day-forecast-card">
                <h3>2024-05-08</h3>
                <img src={cloud} alt="" />
                <div className="weather-temp-forecast">Temp:24 c</div>
                <div className="humidity-forecast">Humidity:24 c</div>
                <div className="wind-forecast">Wind:24 c</div>
            </div>
            <div className="day-forecast-card">
                <h3>2024-05-08</h3>
                <img src={cloud} alt="" />
                <div className="weather-temp-forecast">Temp:24 c</div>
                <div className="humidity-forecast">Humidity:24 c</div>
                <div className="wind-forecast">Wind:24 c</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
