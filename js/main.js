// API key = f8b14f394f5b7b14292a3d7cfc8915d2

const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";
let userZipCode = document.getElementById('userZipCodeInput').value;

let page = document.getElementById("page");

window.addEventListener('load', renderUI());

function renderUI() {
    let userInput = document.createElement('input');
    userInput.setAttribute('placeholder', 'Enter Zipcode.');
    userInput.setAttribute('id', 'userZipCodeInput')
    page.appendChild(userInput);

    let btn = document.createElement('button');
    btn.innerHTML = 'Get Weather';
    page.appendChild(btn);
    btn.addEventListener('click', function() {
        return weatherData();
    })
}

function weatherData() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${userZipCode}&appid=${API_KEY}`)
        .then(response => {
            var data = response.data;
            console.log(data);
        })
        .catch (error => {
            console.error(error);
            alert("There was an issue getting weather data.");
        });
}

