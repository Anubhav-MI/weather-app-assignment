import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./card";
import "./dashboard.css";

const WeatherDashboard = () => {
  let temperature;
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const [selectedScale, setSelectedScale] = useState("celsius");

  const handleScaleChange = (event) => {
    setSelectedScale(event.target.value);
    // handleSubmit();
  };

  function handleChange(event) {
    setCity(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const coordinatesResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f818153715b1672a89cff5c1510951e7`
      );

      if (coordinatesResponse.data.length > 0) {
        const { lat, lon } = coordinatesResponse.data[0];

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f818153715b1672a89cff5c1510951e7`
        );
        const name = city;
        const { main, weather } = weatherResponse.data;
        if (selectedScale === "celsius") {
          temperature = main.temp - 273;
        } else if (selectedScale === "fahrenheit") {
          temperature = ((main.temp - 273.15) * 9) / 5 + 32;
        }

        const description = weather[0].description;

        const newCity = {
          name,
          temperature,
          description,
        };

        setCities([...cities, newCity]);
        setCity(""); // Clear the input field
      } else {
        console.error("City not found.");
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }

  useEffect(() => {}, []);

  const handleDelete = (cityName) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city.name !== cityName)
    );
  };

  return (
    <div className="main">
      <div className="heading">Forecastly</div>
      <div className="sub-heading">Your daily weather companion</div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      <div className="tempscale">
        {" "}
        <label>Select Temperature Scale:</label>
        <select
          id="tempScale"
          name="tempScale"
          value={selectedScale}
          onChange={handleScaleChange}
        >
          <option value="celsius">Celsius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
      </div>
      <div className="main-body">
        {cities.map((city) => (
          <WeatherCard
            key={city.name}
            city={city.name}
            temperature={city.temperature}
            description={city.description}
            onDelete={() => handleDelete(city.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
