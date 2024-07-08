// weather.js
const apiKey = "4b5ee782cafe18a02317076e6a68e150";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let currentWeatherData;
let cityTimeOffset;

export async function getWeatherByCity(city) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`;
    try {
        const geocodeResp = await fetch(geocodeUrl);
        const geocodeData = await geocodeResp.json();
        console.log('Geocode Response:', geocodeData);  // Log the geocoding response for debugging

        if (geocodeData.length > 0) {
            const { lat, lon, name, country } = geocodeData[0];  // Use the first result
            document.querySelector(".city").innerHTML = `${name}, ${country}`;
            return await getWeather(lat, lon);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error);
        showError();
    }
    return null;
}

export async function getWeather(lat, lon) {
    const resp = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    
    if (resp.status === 404) {
        showError();
    } else {
        const data = await resp.json();
        displayWeather(data);
        return data;
    }
    return null;
}

function displayWeather(data) {
    cityTimeOffset = data.timezone;

    console.log(data);
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    currentWeatherData = data;
    updateWeatherIcon(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function showError() {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

function updateWeatherIcon(data) {
    const currentTime = new Date().getTime() / 1000;
    const sunrise_time = data.sys.sunrise;
    const sunset_time = data.sys.sunset;

    const des = data.weather[0].description;
    console.log(des);
    document.querySelector(".description").innerHTML = des;

    let iconSrc = '';
    let bgGradient = '';

    if (data.weather[0].main == "Clouds") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-clouds.png" : "images/night-clouds.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    } else if (data.weather[0].main == "Clear") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-clear.png" : "images/night-clear.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    } else if (data.weather[0].main == "Rain") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-rain.png" : "images/night-rain.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    } else if (data.weather[0].main == "Drizzle") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-drizzle.png" : "images/night-drizzle.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    } else if (data.weather[0].main == "Mist") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-mist.png" : "images/night-mist.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    } else if (data.weather[0].main == "Snow") {
        iconSrc = currentTime >= sunrise_time && currentTime <= sunset_time ? "images/day-snow.png" : "images/night-snow.png";
        bgGradient = currentTime >= sunrise_time && currentTime <= sunset_time ? "linear-gradient(to bottom, #0072ff, #00c6ff)" : "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    }

    document.querySelector(".weather-icon").src = iconSrc;
    document.querySelector(".card").style.background = bgGradient;
}

export function getCityTime() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = new Date(utc + (cityTimeOffset * 1000));
    return cityTime;
}
