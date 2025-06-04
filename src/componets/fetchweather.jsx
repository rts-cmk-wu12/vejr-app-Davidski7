import { useState } from "react";
import "../style/home.scss";

export default function FetchWeather() {
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = "cd672469cb17aa1ca25bd4c4349b643e";

    const fetchCoordinates = () => {
        if (!city) return;

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    alert("Byen blev ikke fundet.");
                    setCoordinates(null);
                    setWeatherData(null);
                } else {
                    const coords = {
                        lat: data[0].lat,
                        lon: data[0].lon,
                        name: `${data[0].name}`
                    };
                    setCoordinates(coords);
                    fetchWeather(coords);
                }
            });
    };

    const fetchWeather = (coords) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                setWeatherData({
                    temp: data.main.temp,
                    name: coords.name,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                });
            });
    };

    return (
        <div className="weather-container">
            <h1>Hent vejrdata</h1>
            <input
                type="text"
                placeholder="F.eks. København"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchCoordinates}>Hent vejr</button>

            {coordinates && (
                <div>
                    <p><strong>Breddegrad:</strong> {coordinates.lat}</p>
                    <p><strong>Længdegrad:</strong> {coordinates.lon}</p>
                </div>
            )}

            {weatherData && (
                <div className="weather-data">
                    <h2>Vejr i {weatherData.name}</h2>
                    <p><strong>Temperatur:</strong> {weatherData.temp} °C</p>
                    <p><strong>Beskrivelse:</strong> {weatherData.description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt={weatherData.description}
                    />
                </div>
            )}
        </div>
    );
}
