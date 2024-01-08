const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');
const currentDate = dayjs().format('dddd, MMMM D, YYYY');
let cityName;


const getWeather = async (url) => {
    let currentCity = cityInput.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const cityData = await response.json();
    cityName = cityData.name;
    currentTemp = cityData.main.temp;
    // weatherIcon = cityData.weather[0].icon;
    currentWind = cityData.wind.speed;
    currentHumidity = cityData.main.humidity;
    console.log(cityData)


    displayCurrentWeather()
}

const displayCurrentWeather = () => {
    const currentCityDisplay = document.createElement('h2');
    currentCityDisplay.textContent = cityName;
    currentWeatherDiv.appendChild(currentCityDisplay);

    const currentDateDisplay = document.createElement('h3');
    currentDateDisplay.textContent = currentDate;
    currentWeatherDiv.appendChild(currentDateDisplay);

    const currentTempDisplay = document.createElement('p');
    currentTempDisplay.textContent = 'Temp: ' + currentTemp + ' °F';
    currentWeatherDiv.appendChild(currentTempDisplay);

    const currentWindDisplay = document.createElement('p');
    currentWindDisplay.textContent = 'Wind: ' + currentWind + ' MPH';
    currentWeatherDiv.appendChild(currentWindDisplay);

    const currentHumidityDisplay = document.createElement('p');
    currentHumidityDisplay.textContent = 'Humidity: ' + currentHumidity + ' %';
    currentWeatherDiv.appendChild(currentHumidityDisplay);
}




searchBtn.addEventListener('click', getWeather)