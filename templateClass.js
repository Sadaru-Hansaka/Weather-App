export default class Template{
    constructor(id,cityName,temp){
        this.id = id;
        this.cityName = cityName;
        this.temp = temp;
    }

    createBox() {
        // Create a div element for the box
        const boxElement = document.createElement('div');
        boxElement.id = this.id;
        boxElement.style.border = '1px solid black';
        boxElement.style.padding = '10px';
        // boxElement.style.margin = '10px';

        
        boxElement.innerText = `Name: ${this.cityName}/nTemperature: ${this.temp}`;
    
        // Append the box to the body (or any other container)
        // document.body.appendChild(boxElement);
        return boxElement;
      }
    
};
