const apiKey ="4b5ee782cafe18a02317076e6a68e150";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");

async function getWeather(city){
    const resp = await fetch(apiUrl+city+`&appid=${apiKey}`); 

    if(resp.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{
        const data = await resp.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed +"km/h";

        if(data.weather[0].main=="Clouds"){
            weather_icon.src="images/clouds.png";
        }else if(data.weather[0].main=="Clear"){
            weather_icon.src="images/clear.png";
        }else if(data.weather[0].main=="Rain"){
            weather_icon.src="images/rain.png";
        }else if(data.weather[0].main=="Drizzle"){
            weather_icon.src="images/drizzle.png";
        }else if(data.weather[0].main=="Mist"){
            weather_icon.src="images/mist.png"; 
        }else{
            weather_icon.src="images/snow.png";
        }

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
 
}

searchbtn.addEventListener("click", ()=>{
    getWeather(searchBox.value);
});

// Fetch initial weather data
const initialLocation = 'Galle'; // Default location
getWeather(initialLocation);

// Update data every 1 minitue
setInterval(() => {
    const currentLocation = searchBox.value;
    if (currentLocation) {
        getWeatherWeather(currentLocation);
    }
},6000); // 1 minute