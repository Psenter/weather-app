// API key = f8b14f394f5b7b14292a3d7cfc8915d2

const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";

let page = document.getElementById("page");
page.classList.add("container");

page.insertAdjacentHTML("beforeend", `
    <h1 class="text-center mt-5">Weather App</h1>
    <div class="row justify-content-center mt-5">
      <input class="col-2 text-center p-2" type="text" id="userZipcode" placeholder="Enter Zipcode.">
      <div class="col-1"></div>
      <button class="col-2 text-center p-2" id="btn">Get Weather.</button>
    </div>
`);

let userZipcode = document.getElementById("userZipcode")
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

  if (!userZipcodeValue) {
    alert("Please enter a zipcode.");
    return;
  }

  axios.get(`${API_URL}${API_PATH}?zip=${userZipcodeValue}&appid=${API_KEY}`)
    .then((response) => {
      let data = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
      alert("There was an issue getting the weather data.\nPlease check the zipcode.")
    })
}
