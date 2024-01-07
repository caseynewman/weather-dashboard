const searchBtn = document.querySelector('#search-button');
const input = document.querySelector('#city-search');



const getWeather = async (url) => {
    let inputValue = input.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=fe48577d7995f2974587723e4b533c3c`)
    const data = await response.json()
    console.log(data)
}

const displayCurrentWeather = () => {
    
}






searchBtn.addEventListener('click', getWeather)