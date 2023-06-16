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
      //stores the API call in the var data
      let data = response.data;

      //logs all the data in console
      console.log(data);

      //calls the below function and sets the var equal to the function
      let allWeatherInfo = createWeatherTables(data);

      //gets the created empty div from 'renderUI' function
      let weatherDiv = document.createElement("div");

      //sets the div in the 'renderUI' function equal to the weatherInfo(which is set equal to the function)
      weatherDiv.innerHTML = allWeatherInfo;
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

  //gets all the info needed and stores it all in vars
  let tempK = data.main.temp;
  let tempC = (tempK - 273.15).toFixed(1);
  let tempF = ((tempC * 9) / 5 + 32).toFixed(1);
  let cityName = data.name;
  let cityHumidity = data.main.humidity;
  let cityCondition = data.weather[0].description;

  //FIX WET CODE WHEN POSSIBLE  
  let allWeatherOfCity = document.createElement("div");
  allWeatherOfCity.setAttribute('class', 'container');

  let nameOfCity = document.createElement("div");
  nameOfCity.classList.add("row", "border", "border-dark")
  nameOfCity.innerHTML = cityName;
  allWeatherOfCity.appendChild(nameOfCity);

  let tempsOfCity = document.createElement("div");
  tempsOfCity.classList.add("row", "border", "border-dark")
  tempsOfCity.innerHTML = tempK+'°K' + ' ' + tempF+'°F'+' '+tempC+'°C';
  allWeatherOfCity.appendChild(tempsOfCity);

  let humidityOfCity = document.createElement("div");
  humidityOfCity.classList.add("row", "border", "border-dark")
  humidityOfCity.innerHTML = cityHumidity;
  allWeatherOfCity.appendChild(humidityOfCity);

  let conditionOfCity = document.createElement("div");
  conditionOfCity.classList.add("row", "border", "border-dark")
  conditionOfCity.innerHTML = cityCondition;
  allWeatherOfCity.appendChild(conditionOfCity);

  page.appendChild(allWeatherOfCity);
}
