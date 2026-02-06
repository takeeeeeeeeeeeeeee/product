import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import "./index.css";

// 47都道府県の英語キーだけ保持
const CITY_COORDS = {
  Hokkaido: { lat: 43.06, lon: 141.35 },
  Aomori: { lat: 40.82, lon: 140.74 },
  Iwate: { lat: 39.70, lon: 141.15 },
  Miyagi: { lat: 38.26, lon: 140.87 },
  Akita: { lat: 39.72, lon: 140.10 },
  Yamagata: { lat: 38.24, lon: 140.36 },
  Fukushima: { lat: 37.75, lon: 140.47 },
  Ibaraki: { lat: 36.36, lon: 140.47 },
  Tochigi: { lat: 36.56, lon: 139.88 },
  Gunma: { lat: 36.39, lon: 139.06 },
  Saitama: { lat: 35.86, lon: 139.65 },
  Chiba: { lat: 35.60, lon: 140.12 },
  Tokyo: { lat: 35.68, lon: 139.76 },
  Kanagawa: { lat: 35.45, lon: 139.64 },
  Niigata: { lat: 37.91, lon: 139.06 },
  Toyama: { lat: 36.69, lon: 137.21 },
  Ishikawa: { lat: 36.56, lon: 136.65 },
  Fukui: { lat: 36.06, lon: 136.22 },
  Yamanashi: { lat: 35.66, lon: 138.57 },
  Nagano: { lat: 36.65, lon: 138.18 },
  Gifu: { lat: 35.42, lon: 136.76 },
  Shizuoka: { lat: 34.97, lon: 138.39 },
  Aichi: { lat: 35.18, lon: 136.90 },
  Mie: { lat: 34.73, lon: 136.51 },
  Shiga: { lat: 35.01, lon: 135.86 },
  Kyoto: { lat: 35.01, lon: 135.77 },
  Osaka: { lat: 34.69, lon: 135.50 },
  Hyogo: { lat: 34.69, lon: 135.18 },
  Nara: { lat: 34.68, lon: 135.83 },
  Wakayama: { lat: 34.23, lon: 135.17 },
  Tottori: { lat: 35.50, lon: 134.23 },
  Shimane: { lat: 35.47, lon: 133.05 },
  Okayama: { lat: 34.66, lon: 133.92 },
  Hiroshima: { lat: 34.40, lon: 132.46 },
  Yamaguchi: { lat: 34.20, lon: 131.47 },
  Tokushima: { lat: 34.07, lon: 134.55 },
  Kagawa: { lat: 34.34, lon: 134.04 },
  Ehime: { lat: 33.84, lon: 132.77 },
  Kochi: { lat: 33.56, lon: 133.53 },
  Fukuoka: { lat: 33.59, lon: 130.40 },
  Saga: { lat: 33.25, lon: 130.30 },
  Nagasaki: { lat: 32.75, lon: 129.87 },
  Kumamoto: { lat: 32.79, lon: 130.74 },
  Oita: { lat: 33.23, lon: 131.61 },
  Miyazaki: { lat: 31.91, lon: 131.42 },
  Kagoshima: { lat: 31.56, lon: 130.56 },
  Okinawa: { lat: 26.21, lon: 127.68 },
};

// 日本語→英語マッピング
const JP_TO_EN = {
  北海道: "Hokkaido",
  青森: "Aomori",
  岩手: "Iwate",
  宮城: "Miyagi",
  秋田: "Akita",
  山形: "Yamagata",
  福島: "Fukushima",
  茨城: "Ibaraki",
  栃木: "Tochigi",
  群馬: "Gunma",
  埼玉: "Saitama",
  千葉: "Chiba",
  東京: "Tokyo",
  神奈川: "Kanagawa",
  新潟: "Niigata",
  富山: "Toyama",
  石川: "Ishikawa",
  福井: "Fukui",
  山梨: "Yamanashi",
  長野: "Nagano",
  岐阜: "Gifu",
  静岡: "Shizuoka",
  愛知: "Aichi",
  三重: "Mie",
  滋賀: "Shiga",
  京都: "Kyoto",
  大阪: "Osaka",
  兵庫: "Hyogo",
  奈良: "Nara",
  和歌山: "Wakayama",
  鳥取: "Tottori",
  島根: "Shimane",
  岡山: "Okayama",
  広島: "Hiroshima",
  山口: "Yamaguchi",
  徳島: "Tokushima",
  香川: "Kagawa",
  愛媛: "Ehime",
  高知: "Kochi",
  福岡: "Fukuoka",
  佐賀: "Saga",
  長崎: "Nagasaki",
  熊本: "Kumamoto",
  大分: "Oita",
  宮崎: "Miyazaki",
  鹿児島: "Kagoshima",
  沖縄: "Okinawa",
};

function App() {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  // localStorage から読み込み
  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      const savedCities = JSON.parse(saved);
      setCities(savedCities);
      savedCities.forEach(fetchWeather);
    }
  }, []);

  // cities 更新時に localStorage 保存
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  // Open-Meteo から天気取得
  const fetchWeather = async (city) => {
    const coords = CITY_COORDS[city];
    if (!coords) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData((prev) => ({
        ...prev,
        [city]: data.current_weather,
      }));
    } catch (err) {
      console.error("Open-Meteo fetch error:", err);
    }
  };

  // 都市追加（日本語・英語両対応）
  const addCity = (input) => {
    const city = JP_TO_EN[input] || input;
    if (!CITY_COORDS[city]) {
      alert(`${input} は登録されていない都市です`);
      return;
    }
    if (!cities.includes(city)) {
      setCities([city, ...cities]);
      fetchWeather(city);
    }
  };

  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));
    setWeatherData((prev) => {
      const copy = { ...prev };
      delete copy[city];
      return copy;
    });
  };

  return (
    <div className="app">
      <h1>Weather Dashboard 🌤</h1>
      <SearchBar onSearch={addCity} />
      <div className="cards">
        {cities.map((city) => (
          <WeatherCard
            key={city}
            city={city}
            data={weatherData[city]}
            onRemove={removeCity}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
