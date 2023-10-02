const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";

let page = document.getElementById("page");
page.classList.add("container");


page.innerHTML = `
    <h1 class="text-center mt-5">Weather App</h1>
    <div class="row justify-content-center mt-5">
      <input class="col-2 text-center p-2" type="text" id="userZipcode" placeholder="Enter Zipcode.">
      <div class="col-1"></div>
      <button class="col-2 text-center p-2 blue-btn" id="btn">Get Weather.</button>
    </div>
    <div id="weatherInfo" class="mt-5"></div>
`;

let userZipcode = document.getElementById("userZipcode")

window.addEventListener("load", function() {
  let storedZipcode = localStorage.getItem("zipcode");
  if (storedZipcode) {
    userZipcode.value = storedZipcode;
    getWeatherData();
  }
})

userZipcode.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    return console.log(getWeatherData());
  }
});

let btn = document.getElementById("btn")
btn.addEventListener("click", function() {
  return console.log(getWeatherData());
});

function getWeatherData() {
  const userZipcodeValue = userZipcode.value;
  const weatherInfo = document.getElementById("weatherInfo")

  if (!userZipcodeValue) {
    alert("Please enter a zipcode.");
    return;
  }

  axios.get(`${API_URL}${API_PATH}?zip=${userZipcodeValue}&appid=${API_KEY}`)
    .then((response) => {
      let data = response.data;
      const tempC = (data.main.temp - 273.15).toFixed(1);
      const tempF = ((tempC * 9) / 5 + 32).toFixed(1);

      const feelsLikeC = (data.main.feels_like - 273.15).toFixed(1);
      const feelsLikeF = ((feelsLikeC * 9) / 5 + 32).toFixed(1);

      localStorage.setItem("zipcode", userZipcodeValue);

      weatherInfo.innerHTML = "";

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

      weatherInfo.innerHTML = weatherData;
    })

    .catch((error) => {
      console.error(error);
      alert("There was an issue getting the weather data.\nPlease check the zipcode.")
    })
}
