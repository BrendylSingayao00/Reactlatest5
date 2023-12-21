import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Philippines&appid=20486cd39fb69a29045847d0176f3e7b`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

  // Function to get the appropriate icon based on the weather condition
  const getWeatherIcon = () => {
    if (!data.weather || data.weather.length === 0) {
      return 'fa-solid fa-sun'; // Default icon for a nice day
    }

    const mainWeather = data.weather[0].main.toLowerCase();

    switch (mainWeather) {
      case 'clear':
        return 'fa-solid fa-sun'; // Sun icon for clear weather
      case 'clouds':
        return 'fa-solid fa-cloud'; // Cloud icon for cloudy weather
      case 'rain':
        return 'fa-solid fa-cloud-rain'; // Cloud with raindrops icon for rainy weather
      case 'thunderstorm':
        return 'fa-solid fa-bolt'; // Lightning bolt icon for thunderstorm
      default:
        return 'fa-solid fa-sun'; // Default icon for a nice day
    }
  };
  // Function to generate weather-related message
  const generateWeatherMessage = () => {
    if (!data.weather || data.weather.length === 0) {
      return "Have a great day!";
    }

    const mainWeather = data.weather[0].main.toLowerCase();

    switch (mainWeather) {
      case 'clear':
        return 'Sunny Day';
      case 'clouds':
        return 'Cloudy Day';
      case 'rain':
        return 'Rainy Day';
      case 'thunderstorm':
        return 'Thunderstorm';
      default:
        return "Maayad ha aldaw!";
    }
  };

  return (
    <div className="weatherContainer bg-light">
      <div className="location">
        <h5 className='pinas'>{data.name}</h5>
      </div>
      <div className="degree">
        {data.wind ? <h1 style={{ marginBottom: '-15px',fontSize: '40px'  }}> {data.wind.deg} °c</h1> : null}
      </div>
      <div className="Descript">
      <i className={`fa-solid ${getWeatherIcon()}`} ></i>
        <p style={{ marginBottom: '-15px' }}>{generateWeatherMessage()}</p>
      </div>

      {data.name !== undefined && (
        <div className="weatherBOTTOM">
          {data.main ? <p style={{ marginBottom: '-10px' }}>Humidity:  {data.main.humidity} %</p> : null}
          {data.main ? <p style={{ marginBottom: '-10px' }}>Temp: {data.main.temp} °</p> : null}
          {data.wind ? <p style={{ marginBottom: '-10px' }}>Wind:  {data.wind.speed} km/h</p> : null}
          {data.sys.sunrise ? <p style={{ marginBottom: '-10px' }}>Sunrise:  {data.sys.sunrise} </p> : null}

        </div>
      )}
    </div>
  )
}

export default Weather;
