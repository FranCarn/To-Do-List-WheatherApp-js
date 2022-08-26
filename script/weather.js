const APIKey = `666a9c0eec2c719f937083ca9dde8a7c`;
const loc = document.getElementById("location");
const descript = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const feelTemp = document.getElementById("feel-temp");
const humidity = document.getElementById("humidity");

function displayOnDOM(data) {
  loc.textContent = data.name;
  descript.textContent = data.weather[0].description;
  weatherIcon.src = `../assets/icons/${data.weather[0].icon}.png`;
  temp.textContent = `${Math.round(data.main.temp)}° C`;
  feelTemp.textContent = `Sensación Térmica: ${Math.round(
    data.main.feels_like
  )}° C`;
  humidity.textContent = `Humedad: ${data.main.humidity}%`;
}

function getInitialData() {
  if (navigator.geolocation) {
    let apiUrl;
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&units=metric&appid=${APIKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((dataJSON) => displayOnDOM(dataJSON));
    });
  }
}

getInitialData();
