import React from "react";
import { CITY_NAMES_JP } from "../CITY_NAMES_JP";

function WeatherCard({ city, data, onRemove }) {
  if (!data) return null;

  const weatherIcon = () => {
    switch (data.weathercode || 0) {
      case 0:
      case 1: return "☀️";
      case 2: return "⛅";
      case 3: return "☁️";
      case 61: return "🌧️";
      case 71: return "❄️";
      default: return "🌤️";
    }
  };

  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>{CITY_NAMES_JP[city] || city}</h2>
        <button className="delete-btn" onClick={() => onRemove(city)}>🗑️</button>
      </div>
      <div className="card-body">
        <span className="icon">{weatherIcon()}</span>
        <span className="temp">{data.temperature}°C</span>
        <span className="wind">💨 {data.windspeed} m/s</span>
      </div>
    </div>
  );
}

export default WeatherCard;
