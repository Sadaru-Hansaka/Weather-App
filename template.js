// template.js
export class Template {
    constructor(cityName, country,temp,cityArray,weather,sunrise,sunset,weath_des) {
        this.cityName = cityName;
        this.country = country;
        this.temp = temp;
        this.cityArray = cityArray;
        this.weather = weather;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.weath_des = weath_des;
    }

    createBox() {
        const boxElement = document.createElement('div');
        boxElement.classList.add('template_box');

        const closeIcon = document.createElement('span');
        closeIcon.innerHTML = '&times;'; // HTML entity for '×'
        closeIcon.classList.add('close_icon');

        closeIcon.addEventListener('click', () => {
            
            const index = this.cityArray.findIndex(item => item.city === this.cityName);

            if (index > -1) {
                this.cityArray.splice(index, 1); // Remove the item from the array
            }

            boxElement.remove();
            
            
        });

        boxElement.appendChild(closeIcon);

        const template_container = document.createElement('div');
        template_container.classList.add('template_container');
        
        
        const imageElement = document.createElement('div');
        imageElement.classList.add('template-image');
        const weath = this.weather;
        const weahterImg = document.createElement('img');
        weahterImg.classList.add('template_img');

        const currentTime = new Date().getTime() / 1000;
        
        
        switch(weath){
            case "Clouds":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-clouds.png';
                    weahterImg.alt = 'Clouds';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-clouds.png';
                    weahterImg.alt = 'Clouds';
                    imageElement.appendChild(weahterImg);
                }
                break;
            case "Rain":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-rain.png';
                    weahterImg.alt = 'Rain';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-rain.png';
                    weahterImg.alt = 'Rain';
                    imageElement.appendChild(weahterImg);
                }
                break;
            case "Clear":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-clear.png';
                    weahterImg.alt = 'Clear';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-clear.png';
                    weahterImg.alt = 'Clear';
                    imageElement.appendChild(weahterImg);
                }
                break;
            case "Snow":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-snow.png';
                    weahterImg.alt = 'Snow';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-snow.png';
                    weahterImg.alt = 'Snow';
                    imageElement.appendChild(weahterImg);
                }
                break;
            case "Drizzle":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-drizzle.png';
                    weahterImg.alt = 'Drizzle';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-drizzle.png';
                    weahterImg.alt = 'Drizzle';
                    imageElement.appendChild(weahterImg);
                }
                break;
            case "Mist":
                if(currentTime >= this.sunrise && currentTime <= this.sunset){
                    weahterImg.src = '../images/day-mist.png';
                    weahterImg.alt = 'Mist';
                    imageElement.appendChild(weahterImg);
                }else{
                    weahterImg.src = '../images/night-mist.png';
                    weahterImg.alt = 'Mist';
                    imageElement.appendChild(weahterImg);
                }
                break;
            default:
                imageElement.innerText=`Name: ${this.weather}`;
        }
        

        template_container.appendChild(imageElement);

        const textElement = document.createElement('div');

        const title_name = document.createElement('h1');
        title_name.innerText = `${this.cityName},${this.country}`;
        textElement.appendChild(title_name);

        const title_temp = document.createElement('h2');
        const temP = Math.round(this.temp);
        title_temp.innerText = `${temP} °C  \n(${this.weath_des})`;
        textElement.appendChild(title_temp);

        template_container.appendChild(textElement);

        boxElement.appendChild(template_container);
        
        return boxElement;
    }    
}

export function handleWeathercard(plusIcon, searchBox,cityArray,getWeatherByCity,getCityTime) {
    plusIcon.addEventListener("click", async () => {
        document.querySelector(".right-side").style.display = "block";
        
        const city = searchBox.value;

        const weatherData = await getWeatherByCity(city);
        if (weatherData) {

            const cityName = weatherData.name;
            if (city && !cityArray.some(item => item.city === cityName)) {
                if (cityArray.length >= 3) {
                    alert("You can only add up to 3 cities");
                    return;
                }
                
                cityArray.push({city : cityName, data : weatherData});
                    
                    
                const cityContainer = document.querySelector(".right-side");
                cityContainer.innerHTML = ''; // Clear the previous content
        
                cityArray.forEach((item) => {
                    const cityName = item.data.name; // Access city name correctly
                    const couuntry = item.data.sys.country;
                    const temp = item.data.main.temp;
                    const sunset = item.data.sys.sunset;
                    const sunrise = item.data.sys.sunrise;
                        
                    const weather = item.data.weather[0].main;
                    const weath_des = item.data.weather[0].description;
                    const template = new Template(cityName,couuntry, temp,cityArray,weather,sunrise,sunset,weath_des);
                    const newBox = template.createBox();
                    cityContainer.appendChild(newBox);
                });
            }else{
                alert("City already added");
            }
        };
    });
        
};
