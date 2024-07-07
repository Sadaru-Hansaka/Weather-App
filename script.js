import Template from "./templateClass.js";
// API key and API url
const apiKey = "4b5ee782cafe18a02317076e6a68e150";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search-btn");
const weather_icon = document.querySelector(".weather-icon");
const plusIcon = document.querySelector(".plus-icon");

let currentWeatherData;

// get location by village,city,country
async function getWeatherByCity(city) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`;
    try {
        const geocodeResp = await fetch(geocodeUrl);
        const geocodeData = await geocodeResp.json();
        console.log('Geocode Response:', geocodeData);  // Log the geocoding response for debugging

        if (geocodeData.length > 0) {
            const { lat, lon, name, country } = geocodeData[0];  // Use the first result
            console.log(`Using location: ${name}, ${country} (${lat}, ${lon})`);
            getWeather(lat, lon);
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

async function getWeather(lat, lon) {
    // fetch API
    const resp = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    
    // error handling
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
    // display weather
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    currentWeatherData = data;
    updateWeathericon(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// error
function showError() {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

// eventlistner to search button
searchbtn.addEventListener("click", () => {
    const city = searchBox.value;
    getWeatherByCity(city);
});


const cityArray = [];

plusIcon.addEventListener("click", async () => {
    const city = searchBox.value;
    if (city && !cityArray.some(item => item.city === city)) {
        const weatherData = await getWeatherByCity(city);
        if (weatherData) {
            cityArray.push({ city, data: weatherData });
            console.log(cityArray);

            const cityContainer = document.querySelector(".right-side");
            cityContainer.innerHTML = ''; // Clear the previous content

            cityArray.forEach((item, index) => {
                const temp = item.data.main.temp; // Access temperature correctly
                const cityName = item.data.name; // Access city name correctly
                const template = new Template(`city-${index}`, cityName, temp);
                const newBox = template.createBox();
                cityContainer.appendChild(newBox);
            });
        }
    }
});



// ---------------------------------------------------------------------------------------
// Fetch initial weather data
// const initialLocation = 'Hapugala, Galle, Sri Lanka'; //default location
// getWeatherByCity(initialLocation);

// Update data every 1 minute
setInterval(() => {
    const currentLocation = searchBox.value;
    if (currentLocation) {
        getWeatherByCity(currentLocation);
    }
}, 60000); // 1 minute

// Get time and date according to the city
setInterval(() => {
    const cityTime = getCityTime();
    const time = cityTime.toLocaleTimeString();
    const date = cityTime.toLocaleDateString();
    document.querySelector(".Time").innerHTML = time;
    document.querySelector(".Date").innerHTML = date;
}, 1000);

function updateWeathericon(data) {
    // get date and time according to the city
    const currentTime = new Date().getTime() / 1000;
    const sunrise_time = data.sys.sunrise;
    const sunset_time = data.sys.sunset;

    // weather description
    const des = data.weather[0].description;
    console.log(des);
    document.querySelector(".description").innerHTML = des;

    let iconSrc = '';
    let bgGradient = '';

    // change background color and weather icon according to the weather data
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

    weather_icon.src = iconSrc;
    document.querySelector(".card").style.background = bgGradient;
}

// update weather data every 1 minute
setInterval(() => {
    if (currentWeatherData) {
        updateWeathericon(currentWeatherData);
    }
}, 60000);


// get time according to the city
let cityTimeOffset;
function getCityTime() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = new Date(utc + (cityTimeOffset * 1000));
    return cityTime;
};
