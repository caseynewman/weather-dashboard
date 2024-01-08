const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');
let cityName;


const getWeather = async (url) => {
    let currentCity = cityInput.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const data = await response.json();
    cityName = data.name;
    currentTemp = data.main.temp;
    console.log(data)


    displayCurrentWeather()
}

const displayCurrentWeather = () => {
    const currentCityDisplay = document.createElement('h2');
    currentCityDisplay.textContent = cityName;
    currentWeatherDiv.appendChild(currentCityDisplay);

    const currentTempDisplay = document.createElement('p');
    currentTempDisplay.textContent = currentTemp + ' °F';
    currentWeatherDiv.appendChild(currentTempDisplay);
}



searchBtn.addEventListener('click', getWeather)