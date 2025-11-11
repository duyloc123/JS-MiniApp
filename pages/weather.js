const inputCity = document.getElementById('searchWeather');
const btnSearch = document.getElementById('btn__search');
const textWeatherTemp = document.getElementById('weather__temperature');
const textWeatherCity = document.getElementById('weather__cityName');
const humidityWeather = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const imgWeather = document.getElementById('imgWeather');

const key = "0b5c96dc26c41f4888b05e7e78d534c7";
const defaultCity = "London";
const changeTemp = 273.15;
let iconWeather;
let temperature;

function initliAppWeather() {
    fetchWeather();
}

async function fetchWeather() {
    try {
      if(inputCity.value === "") {
        inputCity.style.border = "2px solid red";
      } else {
        inputCity.style.border = "";
        const rs = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${key}`);
        const data = await rs.json();
        temperature = data.main.temp - changeTemp;
        textWeatherTemp.innerHTML = `${Math.floor(temperature)}°C`;
        textWeatherCity.innerHTML = inputCity.value;
        humidityWeather.innerHTML = `${data.main.humidity}%`;
        windSpeed.innerHTML = `${Math.floor(data.wind.speed*3.6)} Km/h`;
        iconWeather = data.weather[0].description;
        checkWeather(iconWeather);
      }
    } catch (err) {
      alert("Not data found");
    }
}

btnSearch.addEventListener('click', () => {
  fetchWeather();
})

function checkWeather(iconWeather) {
  switch(iconWeather) {
    case "clear sky":
      imgWeather.setAttribute("src","https://openweathermap.org/img/wn/01d@2x.png");
      break;
    case "few clouds":
      imgWeather.setAttribute("src","https://openweathermap.org/img/wn/02d@2x.png");
      break;
    case "overcast clouds":
      imgWeather.setAttribute("src","https://openweathermap.org/img/wn/03d@2x.png");
      break;
    case "broken clouds":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/04d@2x.png");
      break;
    case "shower rain":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/09d@2x.png");
      break;
    case "rain":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/10d@2x.png");
      break;
    case "thunderstorm":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/11d@2x.png");
      break;
    case "snow":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/13d@2x.png");
      break;
    case "mist":
      imgWeather.setAttribute("src","http://openweathermap.org/img/wn/50d@2x.png");
      break;
    default:
  }
}

// initliAppWeather();

// Todo: Theme Light