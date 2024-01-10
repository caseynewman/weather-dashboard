const searchBtn = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-search');
const weatherContainer = document.querySelector('#weather-container');
const citiesContainer = document.querySelector('#cities-container');
const currentDate = dayjs().format('dddd, MMMM D, YYYY');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityName;
let cityLat;
let cityLon;
let forecastArr;



const getWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const cityData = await response.json();
    cityLat = cityData.coord.lat;
    cityLon = cityData.coord.lon;

    if (cityInput.value !== '') {
        searchBtn.disabled = false;
    } else {
        searchBtn.disabled = true;
    }

    displayCurrentWeather(cityData);
    await getForecast();
    updateRecentSearch();
    displayRecentSearch();
    clearInput();
}

const getForecast = async (url) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=fe48577d7995f2974587723e4b533c3c&units=imperial`);
    const forecastData = await response.json();
    cityName = forecastData.city.name;
    forecastArr = forecastData.list;

    for(let i = 0; i < forecastArr.length; i+=8) {
        displayForecast(forecastArr[i]);
    }
}

// const displayRecentSearchHeading = () => {
//     const recentSearchHeading = document.createElement('h4');
//     recentSearchHeading.textContent = 'Your Recent Cities';
//     citiesContainer.appendChild(recentSearchHeading);
// }

// displayRecentSearchHeading();

const displayCurrentWeather = (cityData) => {
    weatherContainer.textContent = '';

    const currentWeatherEl = document.createElement('article');
    const currentCity = document.createElement('h2');
    const dateHeading = document.createElement('h3');
    const currentTemp = document.createElement('p');
    const currentWind = document.createElement('p');
    const currentHumidity = document.createElement('p');

    currentCity.textContent = cityData.name;
    dateHeading.textContent = currentDate;
    currentTemp.textContent = 'Temp: ' + cityData.main.temp + ' °F';
    currentWind.textContent = 'Wind: ' + cityData.wind.speed + ' MPH';
    currentHumidity.textContent = 'Humidity: ' + cityData.main.humidity + '%';

    weatherContainer.appendChild(currentWeatherEl);
    currentWeatherEl.appendChild(currentCity);
    currentWeatherEl.appendChild(dateHeading);
    currentWeatherEl.appendChild(currentTemp);
    currentWeatherEl.appendChild(currentWind);
    currentWeatherEl.appendChild(currentHumidity);
}

const displayForecast = (dailyForecast) => {
    const forecastDay = document.createElement('article');
    const forecastDate = document.createElement('h3');
    const forecastTemp = document.createElement('p');
    const forecastWind = document.createElement('p');
    const forecastHumidity = document.createElement('p');
    const weatherIcon = document.createElement('p');

    forecastDate.textContent = dayjs(dailyForecast.dt_txt).format('MM/DD/YY');
    forecastTemp.textContent = 'Temp: ' + dailyForecast.main.temp + ' °F';
    forecastWind.textContent = 'Wind: ' + dailyForecast.wind.speed + ' MPH';
    forecastHumidity.textContent = 'Humidity: ' + dailyForecast.main.humidity + '%';
    weatherIcon.textContent = String.fromCharCode(dailyForecast.weather[0].icon);

    weatherContainer.appendChild(forecastDay);
    forecastDay.appendChild(forecastDate);
    forecastDay.appendChild(forecastTemp);
    forecastDay.appendChild(forecastWind);
    forecastDay.appendChild(forecastHumidity);
    forecastDay.appendChild(weatherIcon);
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
    localStorage.getItem('cities', JSON.stringify(cities));
    citiesContainer.innerHTML = '';
    const citiesList = document.createElement('li');
    unique.forEach((cities, index) => {
        const newCity = document.createElement('button');
        newCity.textContent = cities;
        citiesList.appendChild(newCity);

        newCity.addEventListener('click', (e) => {
            let myRecentCity = e.target.textContent;
            getWeather(myRecentCity);
        })
    })
    citiesContainer.appendChild(citiesList);
}

displayRecentSearch();

const clearInput = () => {
    cityInput.value = '';
}






//add icons to weather
//check event listener for sidebar buttons
//recent cities heading



searchBtn.addEventListener('click', (e) => {
    let searchedCity = cityInput.value;
    getWeather(searchedCity);
})
