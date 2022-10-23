function createInput() {
  const content = document.getElementById("content");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "input");
  input.setAttribute("id", "input");
  input.setAttribute("placeholder", "Search city");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("spellcheck", "false");
  content.append(input);
}
createInput();

function searchCity() {
  const input = document.getElementById("input");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const city = input.value;
      getAPI(city);
      input.value = null;
    }
  });
}
searchCity();

async function getAPI(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d83edcff39bcbf91f81d87eaf5275391&units=metric&lang=en`;
  const fetchAPI = await fetch(url, { mode: "cors" });
  const dataAPI = await fetchAPI.json();
  if (dataAPI.cod == 404) {
    console.log("City not found");
  } else {
    processData(dataAPI);
  }
}
function processData(data) {
  console.log(data);
  const processedData = {
    city: data.name,
    country: data.sys.country,
    coordE: data.coord.lat + "E",
    coordN: data.coord.lon + "N",
    currentTime: new Date().getHours() + ":" + new Date().getMinutes(), // display local time, not user's
    sunrise:
      // new Date(data.sys.sunrise * 1000).getHours() +
      // ":" +
      // new Date(data.sys.sunrise * 1000).getMinutes(),
      new Date(data.sys.sunrise * 1000).toLocaleString("en-US"),

    sunset:
      new Date(data.sys.sunset * 1000).getHours() +
      ":" +
      new Date(data.sys.sunset * 1000).getMinutes(),
    // new Date(data.sys.sunset).toLocaleString("en-US"),
    // new Date().toLocaleString("en-US"),

    timezone: data.timezone,
    visibility: data.visibility,
    tempCurrent: data.main.temp,
    tempFeeling: data.main.feels_like,
    pressure: data.main.pressure + " hPa",
    humidity: data.main.humidity,
    weather: data.weather[0].description,
    windSpeed: data.wind.speed,
  };
  console.table(processedData);
}
getAPI("Poznan");

// console.log(data);
// Object.keys(data).forEach((key) => {
//   console.log(key + ":", data[key]);
// });

// https://openweathermap.org/api/air-pollution
// https://openweathermap.org/current#data
// https://eager-hamilton-724cee.netlify.app/
// https://dovimaj.github.io/weather-app/
// https://bscottnz.github.io/weather-app/
// https://ding-09.github.io/weather-app/
