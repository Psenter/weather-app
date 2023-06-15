// API key = f8b14f394f5b7b14292a3d7cfc8915d2

//All the API stuff i need(key, path, URL)
const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";

//pulls the div from the HTML in
let page = document.getElementById("page");

//when the page loads it runs renderUI
window.addEventListener("load", renderUI);

//RENDERS the elements onto the screen
function renderUI() {
  //adds the 'Weather App' title to the page
  let h1 = document.createElement("h1");
  h1.innerHTML = "Weather App";
  page.appendChild(h1);

  //adds a user input box for the person to type their chosen zipcode into
  let userInput = document.createElement("input");
  userInput.setAttribute("placeholder", "Enter Zipcode.");
  userInput.setAttribute("id", "userZipCodeInput");
  page.appendChild(userInput);

  //adds a button to start the search for weather in the area the user wants
  let btn = document.createElement("button");
  btn.innerHTML = "Get Weather";
  page.appendChild(btn);
  btn.addEventListener("click", function () {
    return getweatherData();
  });

  //creates a div with an id of 'weatherData' and puts it onto the screen
  let weatherTables = document.createElement("div");
  weatherTables.setAttribute("id", "weatherData");
  page.appendChild(weatherTables);
}

function getweatherData() {
  //uses axios to make a call to api
  //userZipCode is a var that saves the user input and puts it into the API
  //API_KEY is a global var used
  let userZipCode = document.getElementById("userZipCodeInput").value;
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${userZipCode}&appid=${API_KEY}`
    )

    //.then statment is what to do if there is data to gather
    .then((response) => {
      //stores the API call in var data
      let data = response.data;

      //logs all the data in console
      console.log(data);

      //calls the below function and sets the var equal to the function
      let weatherInfo = createWeatherTables(data);

      //gets the created empty div from 'renderUI' function
      let weatherDataDiv = document.getElementById("weatherData");

      //sets the div in the 'renderUI' function equal to the weatherInfo(which is set equal to the function)
      weatherDataDiv.innerHTML = weatherInfo;
    })

    //IF an error happens, an alert is displayed saying there was an error
    .catch((error) => {
      console.error(error);
      alert(
        "There was an issue getting weather data.\nPlease check your zipcode."
      );
    });
}

function createWeatherTables(data) {
  //gets the image ID
  //then is inserted into URL to complete it and make it able to be pulled into the html
  let weatherImage = data.weather.icon;
  let weatherImageUrl = `https://openweathermap.org/img/wn/${weatherImage}.png`;

  //gets the temp from the API
  //converts temp kelvin into celsius and fahrenheit
  let tempK = data.main.temp;
  let tempC = (tempK - 273.15).toFixed(1);
  let tempF = ((tempC * 9) / 5 + 32).toFixed(1);

  //this is a template literal
  //allows me to make a multi-line string
  //also allows me to insert temps and other data directly into the string
  let weatherZipDataDisplay = `
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
                    <img src="${weatherImageUrl}" alt="Weather picture.">
                <div>
            </div>
        </div>
    `;
  return weatherZipDataDisplay;
}
