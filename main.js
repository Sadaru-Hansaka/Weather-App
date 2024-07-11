// main.js
import { getWeatherByCity, getCityTime } from './weather.js';
import { Template,handleWeathercard } from './template.js';


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const plusIcon = document.querySelector(".plus-icon");


let currentWeatherData;
const cityArray = [];

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    getWeatherByCity(city);
});

handleWeathercard(plusIcon, searchBox,cityArray,getWeatherByCity,getCityTime);


setInterval(() => {
    const currentLocation = searchBox.value;
    if (currentLocation) {
        getWeatherByCity(currentLocation);
    }
}, 60000); // 1 minute

setInterval(() => {
    const cityTime = getCityTime();
    const time = cityTime.toLocaleTimeString();
    const date = cityTime.toLocaleDateString();
    document.querySelector(".Time").innerHTML = time;
    document.querySelector(".Date").innerHTML = date;
}, 1000);


setInterval(() => {
    if (currentWeatherData) {
        updateWeatherIcon(currentWeatherData);
    }
}, 60000);
