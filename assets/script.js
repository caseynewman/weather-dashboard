const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');


const getWeather = async (url) => {
    let currentCity = cityInput.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=fe48577d7995f2974587723e4b533c3c`)
    const data = await response.json()
    console.log(data)
}

const displayCurrentWeather = () => {
    let currentCityDisplay = document.createElement('h2');
    currentCityDisplay.textContent = cityInput.value;
    currentWeatherDiv.appendChild(currentCityDisplay);
}

displayCurrentWeather()




searchBtn.addEventListener('click', getWeather)