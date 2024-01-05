



const getWeather = async (url) => {
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?appid=fe48577d7995f2974587723e4b533c3c')
    const data = await response.json()
    console.log(data)
}