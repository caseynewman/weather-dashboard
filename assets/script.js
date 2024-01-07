const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');
let currentCity;
let cityName = [];


const getWeather = async (url) => {
    currentCity = cityInput.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=fe48577d7995f2974587723e4b533c3c`)
    const data = await response.json()
    console.log(data)
}

const getCityName = () => {
    cityName[index] = currentCity.name;
}

getCityName()

const displayCurrentWeather = () => {
    let currentCityDisplay = document.createElement('h2');
    currentCityDisplay.textContent = currentCity;
    console.log(currentCity)

    currentWeatherDiv.appendChild(currentCityDisplay);
}

displayCurrentWeather()




searchBtn.addEventListener('click', getWeather)