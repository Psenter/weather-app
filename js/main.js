// API key = f8b14f394f5b7b14292a3d7cfc8915d2

//WORKS (HOW TO CALL API AND GET DATA)
/*fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=f8b14f394f5b7b14292a3d7cfc8915d2')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    */

let page = document.getElementById("page");

let userInput = document.createElement("input");
userInput.id = "userZipCode";
page.appendChild(userInput);

let btn = document.createElement("button");
btn.innerHTML = "Get weather";
page.appendChild(btn);

//FINISH (lets user input become the id in API call)
let apiUserID = document.getElementById("userZipCode");