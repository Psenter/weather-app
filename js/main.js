// API key = f8b14f394f5b7b14292a3d7cfc8915d2

//All the API stuff i need(key, path, URL)
const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";

//pulls the div from the HTML in
let page = document.getElementById("page");

//when the page loads it runs renderUI
window.addEventListener('load', renderUI);

//RENDERS the elements onto the screen
function renderUI() {
    //adds the 'Weather App' title to the page
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Weather App';
    page.appendChild(h1);

    //adds a user input box for the person to type their chosen zipcode into
    let userInput = document.createElement('input');
    userInput.setAttribute('placeholder', 'Enter Zipcode.');
    userInput.setAttribute('id', 'userZipCodeInput')
    page.appendChild(userInput);

    //adds a button to start the search for weather in the area the user wants
    let btn = document.createElement('button');
    btn.innerHTML = 'Get Weather';
    page.appendChild(btn);
    btn.addEventListener('click', function() {
        return getweatherData();
    });

    let weatherTables = document.createElement('div');
    weatherTables.setAttribute('id', 'weatherData');
    page.appendChild(weatherTables);
}

function getweatherData() {
    //uses axios to make a call to api
    //userZipCode is a var that saves the user input and puts it into the API
    //API_KEY is a global var used
    let userZipCode = document.getElementById('userZipCodeInput').value;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${userZipCode}&appid=${API_KEY}`)
        .then(response => {
            let data = response.data;
            console.log(data);
            let weatherInfo = createWeatherTables(data);
            let weatherDataDiv = document.getElementById("weatherData");
            weatherDataDiv.innerHTML = weatherInfo;
        })
        //IF an error happens, an alert is displayed saying there was an error 
        .catch (error => {
            console.error(error);
            alert("There was an issue getting weather data.\nPlease check your zipcode.");
        });
}

function createWeatherTables(data) {
    let weatherIcon = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    let tempK = data.main.temp;
    let tempC = (tempK - 273.15).toFixed(1);
    let tempF = ((tempC * 9/5) + 32).toFixed(1);
    let weatherZipDataDisplay = 
    `
      <div class="container">
        <div class="row">
            <div class="col">
                City
            <div>
        </div>
      </div>
      <div class="container">
        <div class="row">
            <div class="col">
                ${data.name}
            <div>
        </div>
      </div>
      <div class="container">
        <div class="row">
            <div class="col">
                Temperature
            <div>
        </div>
      </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    ${tempK}
                </div>
                <div class="col">
                    ${tempF}
                </div>
                <div class="col">
                    ${tempC}
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                Humidity
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    ${data.main.humidity}
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    Pressure
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    ${data.weather.pressure}
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    Condition
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    ${data.weather[0].description}
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                Other Info
                <div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <img src="${iconUrl}" alt="Weather picture.">
                <div>
            </div>
        </div>
    `;
    return weatherZipDataDisplay;
}