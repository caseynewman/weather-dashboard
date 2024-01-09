const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const currentWeatherDiv = document.querySelector('#current-weather');
const weeklyForecastDiv = document.querySelector('#weekly-forecast');
const citiesContainer = document.querySelector('#cities-container');
const currentDate = dayjs().format('dddd, MMMM D, YYYY');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityName;
let currentTemp;
let currentWind;
let currentHumidity;
let cityLat;
let cityLon;
let forecastDate;
let forecastTemp;
let forecastWind;
let forecastHumidity;




const getWeather = async (url) => {
    let currentCity = cityInput.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const cityData = await response.json();
    cityName = cityData.name;
    currentTemp = cityData.main.temp;
    // weatherIcon = cityData.weather[0].icon;
    currentWind = cityData.wind.speed;
    currentHumidity = cityData.main.humidity;
    cityLat = cityData.coord.lat;
    cityLon = cityData.coord.lon;

    displayCurrentWeather();
    getForecast();
    // currentCity.textContent = '';
    updateRecentSearch();
}

const getForecast = async (url) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const forecastData = await response.json();
    cityName = forecastData.city.name;
    forecastArr = forecastData.list;

    for (let i = 0; i < forecastArr.length; i+=8) {     
        forecastDate = forecastArr[i].dt;
        forecastTemp = forecastArr[i].main.temp;
        console.log(forecastTemp)
        // weatherIcon = forecastData.weather[i].icon;
        forecastWind = forecastArr[i].wind.speed;
        forecastHumidity = forecastArr[i].main.humidity;
    }

    displayForecast();
}

const displayRecentSearchHeading = () => {
    const recentSearchHeading = document.createElement('h4');
    recentSearchHeading.textContent = 'Your Recent Cities';
    citiesContainer.appendChild(recentSearchHeading);
}

displayRecentSearchHeading();

const displayCurrentWeather = () => {
    currentWeatherDiv.textContent = '';

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

const displayForecast = () => {
    weeklyForecastDiv.textContent = '';

    const forecastDateDisplay = document.createElement('h3');
    forecastDateDisplay.textContent = forecastDate;
    weeklyForecastDiv.appendChild(forecastDateDisplay);

    const forecastTempDisplay = document.createElement('p');
    forecastTempDisplay.textContent = 'Temp: ' + forecastTemp + ' °F';
    weeklyForecastDiv.appendChild(forecastTempDisplay);

    const forecastWindDisplay = document.createElement('p');
    forecastWindDisplay.textContent = 'Wind: ' + forecastWind + ' MPH';
    weeklyForecastDiv.appendChild(forecastWindDisplay);

    const forecastHumidityDisplay = document.createElement('p');
    forecastHumidityDisplay.textContent = 'Humidity: ' + forecastHumidity + '%';
    weeklyForecastDiv.appendChild(forecastHumidityDisplay);
}

const updateRecentSearch = () => {
    cities.push(cityName)
    localStorage.setItem('cities', JSON.stringify(cities));
}

const removeDuplicateCities = (data) => {
    let uniqueCities = [];
    data.forEach(element => {
        if(!uniqueCities.includes(element)) {
            uniqueCities.push(element)
        }
    });
    return uniqueCities;
}

const displayRecentSearch = () => {
    const unique = removeDuplicateCities(cities);
    localStorage.setItem('cities', JSON.stringify(cities));
    const citiesList = document.createElement('li');
    unique.forEach((cities, index) => {
        const newCity = document.createElement('button');
        newCity.textContent = cities;
        citiesList.appendChild(newCity);
    })
    citiesContainer.appendChild(citiesList);

}

displayRecentSearch();

// const clearInput = () => {
//     document.getElementById('#city-search').value = '';
// }








//add icons to weather
//5 day forecast
//disable button if input is empty
//clear value from search bar onclick

searchBtn.addEventListener('click', getWeather)