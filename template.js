// template.js
export class Template {
    constructor(cityName, country,temp,cityArray,weather) {
        this.cityName = cityName;
        this.country = country;
        this.temp = temp;
        this.cityArray = cityArray;
        this.weather = weather;
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
        
        switch(weath){
            case "Clouds":
                weahterImg.src = '../images/day-clouds.png';
                weahterImg.alt = 'Clouds';
                imageElement.appendChild(weahterImg);
                break;
            case "Rain":
                weahterImg.src = '../images/day-rain.png';
                weahterImg.alt = 'Rain';
                imageElement.appendChild(weahterImg);
                break;
            case "Clear":
                weahterImg.src = '../images/day-clear.png';
                weahterImg.alt = 'Clear';
                imageElement.appendChild(weahterImg);
                break;
            case "Snow":
                weahterImg.src = '../images/day-snow.png';
                weahterImg.alt = 'Snow';
                imageElement.appendChild(weahterImg);
                break;
            case "Drizzle":
                weahterImg.src = '../images/day-drizzle.png';
                weahterImg.alt = 'Drizzle';
                imageElement.appendChild(weahterImg);
                break;
            case "Mist":
                weahterImg.src = '../images/day-mist.png';
                weahterImg.alt = 'mist';
                imageElement.appendChild(weahterImg);
                break;
            default:
                imageElement.innerText=`Name: ${this.weather}`;
        }
        

        template_container.appendChild(imageElement);

        const textElement = document.createElement('div');
        textElement.classList.add('template-text');
        textElement.innerText = `Name: ${this.cityName}\nCountry: ${this.country}\nTemperature: ${this.temp}\nWeather: ${this.weather}`;
        template_container.appendChild(textElement);

        boxElement.appendChild(template_container);
        
        return boxElement;
    }    
}

export function handleWeathercard(plusIcon, searchBox,cityArray,getWeatherByCity,getCityTime) {
    plusIcon.addEventListener("click", async () => {
        document.querySelector(".right-side").style.display = "block";
        const city = searchBox.value;
        if (city && !cityArray.some(item => item.city === city)) {
            if (cityArray.length >= 3) {
                alert("You can only add up to 3 cities");
                return;
            }
    
            const weatherData = await getWeatherByCity(city);
            if (weatherData) {
                const cityName = weatherData.name;
                cityArray.push({city : cityName, data : weatherData});
    
                const cityContainer = document.querySelector(".right-side");
                cityContainer.innerHTML = ''; // Clear the previous content
    
                cityArray.forEach((item) => {
                    const cityName = item.data.name; // Access city name correctly
                    const couuntry = item.data.sys.country;
                    const temp = item.data.main.temp;
                    const weather = item.data.weather[0].main;
                    const template = new Template(cityName,couuntry, temp,cityArray,weather);
                    const newBox = template.createBox();
                    cityContainer.appendChild(newBox);
                });
            }
        }
    });
}