import Search from "../Search/index.jsx";
import { useState, useEffect } from "react";

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [iconUrl, setIconUrl] = useState("");
    const [error, setError] = useState(""); // Store error messages

    async function fetchWeatherData(cityName) {
        if (!cityName.trim()) {
            setError("Please enter a valid city name.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d8f048e474507961f4411865d01c4a65`
            );
            const data = await response.json();

            console.log(data, 'data');

            if (data.cod === "404") {
                setError("City not found. Please check the spelling and try again.");
                setLoading(false);
                return;
            }

            setWeatherData(data);
            setLoading(false);

            const iconCode = data.weather?.[0]?.icon;
            if (iconCode) {
                setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
            }
        } catch (e) {
            console.log(e);
            setError("Something went wrong. Please try again later.");
            setLoading(false);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }

    useEffect(() => {
        fetchWeatherData('Bath');
    }, []);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            {/* Display error messages */}
            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                weatherData && (
                    <div>
                        <div className="city-name">
                            <h2>
                                {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                            </h2>
                            <div className="date">
                                <span>{getCurrentDate()}</span>
                            </div>
                            {/* Weather Icon */}
                            {iconUrl && <img className="weather-icon" src={iconUrl} alt="Weather Icon" />}
                            <div className="temp">{kelvinToCelsius(weatherData?.main?.temp)}°C</div>
                            <p className="description">
                                {weatherData?.weather?.[0]?.description || ""}
                            </p>
                            <div className="weather-info">
                                <div className="column">
                                    <div>
                                        <p className="wind">{weatherData?.wind?.speed} m/s</p>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                                <div className="column">
                                    <div>
                                        <p className="humidity">{weatherData?.main?.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
