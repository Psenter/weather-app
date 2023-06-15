// API key = f8b14f394f5b7b14292a3d7cfc8915d2

//All the API stuff i need(key, path, URL, takes the input from user and saves it)
const API_KEY = "f8b14f394f5b7b14292a3d7cfc8915d2";
const API_URL = "http://api.openweathermap.org";
let API_PATH = "/data/2.5/weather";
let userZipCode = document.getElementById('userZipCodeInput').value;

//pulls the div from the HTML in
let page = document.getElementById("page");

//when the page loads it runs renderUI
window.addEventListener('load', renderUI());

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
        return weatherData();
    });
}

function weatherData() {
    //uses axios to make a call to api
    //userZipCode is a global var that saves the user input and puts it into the API
    //API_KEY is a global var used
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${userZipCode}&appid=${API_KEY}`)
        .then(response => {
            var data = response.data;
            console.log(data);
        })
        //IF an error happens, an alert is displayed saying there was an error 
        .catch (error => {
            console.error(error);
            alert("There was an issue getting weather data.\nPlease check your zipcode.");
        });
}

