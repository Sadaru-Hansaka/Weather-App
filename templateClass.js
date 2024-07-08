export default class Template{
    constructor(id,cityName,temp,){
        this.id = id;
        this.cityName = cityName;
        this.temp = temp;
    }

    createBox() {
        // Create a div element for the box
        const boxElement = document.createElement('div');
        boxElement.classList.add('template_box');

         // Create a span for the close icon
        const closeIcon = document.createElement('span');
        closeIcon.innerHTML = '&times;'; // HTML entity for '×'
        closeIcon.classList.add('close_icon');
        closeIcon.style.cursor = 'pointer'; // Make the icon look clickable
 

         // Append the close icon to the box
        boxElement.appendChild(closeIcon);
 
         // Add the city name and temperature
        const textElement = document.createElement('p');
        textElement.innerText = `Name: ${this.cityName}\nTemperature: ${this.temp}`;
        boxElement.appendChild(textElement);
        
        // document.body.appendChild(boxElement);
        return boxElement;
      }
    
};
