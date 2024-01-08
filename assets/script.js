const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');
const citiesContainer = document.querySelector('#cities-container');
const currentDate = dayjs().format('dddd, MMMM D, YYYY');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityName;
let currentTemp;
let currentWind;
let currentHumidity;


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

    displayCurrentWeather();
    updateRecentSearch();
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
    currentHumidityDisplay.textContent = 'Humidity: ' + currentHumidity + '%';
    currentWeatherDiv.appendChild(currentHumidityDisplay);
}

const updateRecentSearch = () => {
    cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cities));
    displayRecentSearch();

}

const displayRecentSearch = () => {
    const citiesList = document.createElement('li');
    cities.forEach((cities, index) => {
        const newCity = document.createElement('button');
        newCity.textContent = cityName;
        citiesList.appendChild(newCity);
    })
    citiesContainer.appendChild(citiesList);
}


const displayRecentSearchHeading = () => {
    const recentSearchHeading = document.createElement('h4');
    recentSearchHeading.textContent = 'Your Recent Cities';
    citiesContainer.appendChild(recentSearchHeading);
}

displayRecentSearchHeading();




//need to clear from main when searching again
//add icons to weather
//5 day forecast

searchBtn.addEventListener('click', getWeather)