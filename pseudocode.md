<!--
MoSCow

Must have:
1. Weather data
2. Place to have User input
3. Reactive

Should have:
1. Different places shown per zip code
2. Way to use more than 1 zip code

Could have:
1. Store data in local storage
2. extra weather data
-->

# INIT:

## Notes/Questions:
> how do i get data with axios

> how to get data to display on screen

>need to get API key

>How will the data be displayed?

>STATE CHANGE: STATE is changed when a new zip is entered

## STEPS:
1. User travels to site
2. User puts in zip code
3. User clicks button OR hits enter(return) key

    * IF error, error message is shown
    * ELSE no error, shows data from API


## STATE: 
CURRENTWEATHERDATA = object that holds the zip code entered by the user

USERINPUT = current value of "zipcode"

## PROGRAM START
WAIT FOR USER INPUT

GET USER INPUT

* Modify UI to match user input
## END

# FUNCTIONAL:
```
fetchData () {
    //take user input
    //gets all data needed for site (city, waether, temp, image)
    //set state
}

zipCodeCheck [event] {
    //validate users input
    //input is 5 digits, only numbers
    //if error, display message
}

renderUI () {
    //shows all data on page
}
```