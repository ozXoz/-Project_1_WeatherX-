import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=da8c1040837628e95a1ddbad0d86a369`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${location}&client_id=YOUR_UNSPLASH_ACCESS_KEY`;

  useEffect(() => {
    if (location) {
      axios.get(unsplashUrl).then((response) => {
        const image = response.data.results[0]?.urls.regular;
        setImageUrl(image);
      });
    }
  }, [location, unsplashUrl]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Please enter the city"
          type="text"
        />
      </div>
      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="City" />
        </div>
      )}
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          {data.main && (
            <div className="weather-info">
              <div className="temp">
                <h1>{data.main.temp}°F</h1>
              </div>
              <div className="description">
                <p>{data.weather[0].main}</p>
              </div>
            </div>
          )}
        </div>
        <div className="bottom">
          {data.main && (
            <div className="weather-details">
              <div className="feels">
                <p>Feels Like</p>
                <p className="bold">{data.main.feels_like}°F</p>
              </div>
              <div className="humidity">
                <p>Humidity</p>
                <p className="bold">{data.main.humidity}%</p>
              </div>
              {data.wind && (
                <div className="wind">
                  <p>Wind Speed</p>
                  <p className="bold">{data.wind.speed} MPH</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
