// template.js
export class Template {
    constructor(cityName, country,temp,cityArray) {
        this.cityName = cityName;
        this.country = country;
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
            
            const index = this.cityArray.findIndex(item => item.city === this.cityName);

            if (index > -1) {
                this.cityArray.splice(index, 1); // Remove the item from the array
            }

            boxElement.remove();
            
            
        });

        boxElement.appendChild(closeIcon);

        const textElement = document.createElement('p');
        textElement.innerText = `Name: ${this.cityName}\nCountry: ${this.country}\nTemperature: ${this.temp}`;
        boxElement.appendChild(textElement);
        
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
                    const template = new Template(cityName,couuntry, temp,cityArray);
                    const newBox = template.createBox();
                    cityContainer.appendChild(newBox);
                });
            }
        }
    });
}