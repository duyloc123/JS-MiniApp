const inputCity = document.getElementById('searchWeather');
const btnSearch = document.getElementById('btn__search');
const textWeatherTemp = document.getElementById('weather__temperature');
const textWeatherCity = document.getElementById('weather__cityName');
const humidityWeather = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const imgWeather = document.getElementById('imgWeather');

const key = "0b5c96dc26c41f4888b05e7e78d534c7";
const cityValue = textWeatherCity.value.trim();
const changeTemp = 273.15;
let temperature;

function initliAppWeather() {
    fetchWeather();
}

async function fetchWeather() {
    const rs = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}`);
    const data = await rs.json();
    temperature = data.main.temp - changeTemp;
    textWeatherTemp.innerHTML = `${Math.floor(temperature)}°C`;
    textWeatherCity.innerHTML = cityValue;
    humidityWeather.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${Math.floor(data.wind.speed*3.6)} Km/h`;
}

btnSearch.addEventListener('click', () => {
  console.log("123");
})

initliAppWeather();