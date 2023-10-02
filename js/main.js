//holds all of my API information
const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";

//gets page div from the DOM and adds container class to the page
let page = document.getElementById("page");
page.classList.add("container");

//sets the innerHTML of the page to what is below
page.innerHTML = `
    <h1 class="text-center mt-5">Weather App</h1>
    <div class="row justify-content-center mt-5">
      <input class="col-2 text-center p-2" type="text" id="userZipcode" placeholder="Enter Zipcode.">
      <div class="col-1"></div>
      <button class="col-2 text-center p-2 blue-btn" id="btn">Get Weather.</button>
    </div>
    <div id="weatherInfo" class="mt-5"></div>
`;

//creates var that holds the input from the user zipcode
let userZipcode = document.getElementById("userZipcode")

//adds an event listener to check if the user hits enter
//if the user hits enter, it sends the user input to the the getWeatherData function 
userZipcode.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    return getWeatherData();
  }
});

//gets the button element that was added to the page
//adds en event listener to the button that when clicked sends the user input to the getWeatherData function
let btn = document.getElementById("btn")
btn.addEventListener("click", function() {
  return console.log(getWeatherData());
});

function getWeatherData() {
  //creates a var that is set to the value of userZipcode
  //gets the weatherInfo div and creates a var that is set to hold that div
  const userZipcodeValue = userZipcode.value;
  const weatherInfo = document.getElementById("weatherInfo")

  //if the zipcode that the user input is not an actual zipcode, if the input field is empty then it displays this message
  if (!userZipcodeValue) {
    alert("Please enter a zipcode.");
    return;
  }

  //makes an axios call to get all of the data for the zipcode that was enter
  axios.get(`${API_URL}${API_PATH}?zip=${userZipcodeValue}&appid=${API_KEY}`)
    .then((response) => {
      let data = response.data;

      //conversions for F and C temperatures 
      const tempC = (data.main.temp - 273.15).toFixed(1);
      const tempF = ((tempC * 9) / 5 + 32).toFixed(1);

      const feelsLikeC = (data.main.feels_like - 273.15).toFixed(1);
      const feelsLikeF = ((feelsLikeC * 9) / 5 + 32).toFixed(1);

      //creates a var called weatherData equal to the HTML that is shown
      //the ${} in the HTML inserts the data from the API to be displayed
      const weatherData = `
      <div class="row justify-content-center">
        <div class="border border-dark text-center col-8 yellow-back"><b>City</b></div>
      </div>
      <div class="row justify-content-center">
        <div class="border-bottom border-start border-end border-dark text-center col-8 p-3">${data.name}</div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="border border-dark text-center col-8 yellow-back"><b>Temperature</b></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-2 text-center border-dark border-start border-bottom p-3">${data.main.temp} K</div>
        <div class="col-2 text-center border-dark border-start border-bottom p-3">${tempF} F</div>
        <div class="col-2 text-center border-dark border-start border-bottom border-end p-3">${tempC} C</div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="border border-dark text-center col-8 yellow-back"><b>Condition</b></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-8 text-center border-dark border-bottom border-start border-end p-3">${data.weather[data.id].description}</div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="border border-dark text-center col-8 yellow-back"><b>Feels like</b></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-2 text-center border-dark border-start border-bottom p-3">${data.main.feels_like} K</div>
        <div class="col-2 text-center border-dark border-start border-bottom p-3">${feelsLikeF} F</div>
        <div class="col-2 text-center border-dark border-start border-bottom border-end p-3">${feelsLikeC} C</div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="border border-dark text-center col-8 yellow-back"><b>Wind</b></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-center border-dark border-bottom border-start border-end p-4">${data.wind.deg}°</div>
        <div class="col-4 text-center border-dark border-bottom border-end p-4">${data.wind.speed}</div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="border border-dark text-center col-8 yellow-back"><b>Other Information</b></div>
      </div>
      <div class="row justify-content-center mb-5">
        <div class="col-8 text-center border-dark border-bottom border-start border-end p-4">${data.sys.country}</div>
      </div>
      `;

      //sets the weatherInfo div HTML to be set as the weatherData var
      weatherInfo.innerHTML = weatherData;
    })

    //if the zipcode entered is not an actual zipcode, it will display this message
    .catch((error) => {
      console.error(error);
      alert("There was an issue getting the weather data.\nPlease check the zipcode.")
    })
}
