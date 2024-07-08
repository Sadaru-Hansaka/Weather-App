// template.js
export class Template {
    constructor(id, cityName, temp,cityArray) {
        this.id = id;
        this.cityName = cityName;
        this.temp = temp;
        this.cityArray = cityArray;
    }

    createBox() {
        const boxElement = document.createElement('div');
        boxElement.classList.add('template_box');

        const closeIcon = document.createElement('span');
        closeIcon.innerHTML = '&times;'; // HTML entity for '×'
        closeIcon.classList.add('close_icon');
        closeIcon.style.cursor = 'pointer'; // Make the icon look clickable

        closeIcon.addEventListener('click', () => {
            console.log("Clicked")
            boxElement.remove();
            this.cityArray.splice(this.cityName, 1);
            console.log(this.cityArray);
            // const index = this.cityArray.findIndex(item => item.city === this.cityName);
            // if (index !== -1) {
            //     this.cityArray.splice(index, 1);
            //     console.log(this.cityArray);
            // }
        });

        boxElement.appendChild(closeIcon);

        const textElement = document.createElement('p');
        textElement.innerText = `Name: ${this.cityName}\nTemperature: ${this.temp}`;
        boxElement.appendChild(textElement);
        
        return boxElement;
    }    
}

export function handleWeathercard(plusIcon, searchBox,cityArray,getWeatherByCity,getCityTime) {
    plusIcon.addEventListener("click", async () => {
        const city = searchBox.value;
        if (city && !cityArray.some(item => item.city === city)) {
            if (cityArray.length >= 3) {
                alert("You can only add up to 3 cities");
                return;
            }
    
            const weatherData = await getWeatherByCity(city);
            if (weatherData) {
                cityArray.push({ city, data: weatherData });
                console.log(cityArray);
    
                const cityContainer = document.querySelector(".right-side");
                cityContainer.innerHTML = ''; // Clear the previous content
    
                cityArray.forEach((item, index) => {
                    const temp = item.data.main.temp; // Access temperature correctly
                    const cityName = item.data.name; // Access city name correctly
                    const template = new Template(`city-${index}`, cityName, temp,cityArray);
                    const newBox = template.createBox();
                    cityContainer.appendChild(newBox);
                });
            }
        }
    });
}