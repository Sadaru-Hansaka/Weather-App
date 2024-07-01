const apiKey ="4b5ee782cafe18a02317076e6a68e150";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search-btn");
const weather_icon = document.querySelector(".weather-icon");
const plusIcon = document.querySelector(".plus-icon");


async function getWeather(city){
    const resp = await fetch(apiUrl+city+`&appid=${apiKey}`); 

    if(resp.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{
        const data = await resp.json();
        console.log(data);
        cityTimeOffset = data.timezone;
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed +"km/h";

        currentWeatherData = data;
        updateWeathericon(data);

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
 
}

function updateWeathericon(data){
    
    const currentTime = new Date().getTime() / 1000; 
    const sunrise_time = data.sys.sunrise;
    const sunset_time = data.sys.sunset;

    if(data.weather[0].main=="Clouds"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-clouds.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-clouds.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }else if(data.weather[0].main=="Clear"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-clear.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-clear.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }else if(data.weather[0].main=="Rain"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-rain.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-rain.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }else if(data.weather[0].main=="Drizzle"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-drizzle.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-drizzle.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }else if(data.weather[0].main=="Mist"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-mist.png"; 
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-mist.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }else if(data.weather[0].main=="Snow"){
        if (sunrise_time<=currentTime && sunset_time >= currentTime) {
            weather_icon.src="images/day-snow.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #00c6ff, #0072ff)";
        }else{
            weather_icon.src="images/night-snow.png";
            document.querySelector(".card").style.background="linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
        }
    }
};
setInterval(() => {
    if (currentWeatherData) {
        updateWeathericon(currentWeatherData);
    }
}, 60000);

let cityTimeOffset;
function getCityTime() {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = new Date(utc + (cityTimeOffset * 1000));
    return cityTime;
}

searchbtn.addEventListener("click", ()=>{
    getWeather(searchBox.value);
});
const cityArray = [];
plusIcon.addEventListener("click", ()=>{
    let city = searchBox.value;
    if (city && !cityArray.includes(city)) {
        cityArray.push(city);
        console.log(cityArray);
    }
});

// Fetch initial weather data
// const initialLocation = 'Galle'; 
// getWeather(initialLocation);

// Update data every 1 minitue
setInterval(() => {
    const currentLocation = searchBox.value;
    if (currentLocation) {
        getWeather(currentLocation);
    }
},60000); // 1 minute



// get time and date according to the city
setInterval(() => {
    const cityTime = getCityTime();
    const time = cityTime.toLocaleTimeString();
    const date = cityTime.toLocaleDateString();
    document.querySelector(".Time").innerHTML = time;
    document.querySelector(".Date").innerHTML = date;
}, 1000);