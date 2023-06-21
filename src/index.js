let now = new Date();
let p = document.querySelector("#time");
let apiKey = "214335cedce3748d2c97d468e1fe7560";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
let day = days[now.getDay()];
p.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");

  let city = searchInput.value;
  h1.innerHTML = searchInput.value;

  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
    .then(displayTemperature);
}

function searchCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  let description = document.querySelector(".condition");
  description.innerHTML = `${response.data.weather[0].description}`;
  let speed = document.querySelector("#speed");
  speed.innerHTML = `
Pressure: ${response.data.main.pressure} kPa
<br />
Humidity: ${response.data.main.humidity}%
<br />
Wind: ${response.data.wind.speed} km/h`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(displayCurrentTemperature);
}

function displayCurrentTemperature(response) {
  let h1 = document.querySelector("h1");

  h1.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  console.log(response);
  let description = document.querySelector(".condition");
  description.innerHTML = `${response.data.weather[0].description}`;
  let speed = document.querySelector("#speed");
  speed.innerHTML = `
Pressure: ${response.data.main.pressure} kPa
<br />
Humidity: ${response.data.main.humidity}%
<br />
Wind: ${response.data.wind.speed} km/h`;
}

let heading = document.querySelector("#search-bar");
heading.addEventListener("submit", search);
let current = document.getElementById("current");
current.addEventListener("click", searchCurrent);
