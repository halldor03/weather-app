import { fetchProcessAPI } from "./API.js";

const DOM = (() => {
  const contentDiv = () => {
    const body = document.querySelector("body");
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    body.appendChild(content);
  };

  const searchInput = () => {
    const content = document.getElementById("content");
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("inputContainer");
    content.appendChild(inputContainer);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "input");
    input.setAttribute("id", "input");
    input.setAttribute("placeholder", "Search location");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("spellcheck", "false");
    inputContainer.appendChild(input);
    input.focus();
  };

  const weather = (processedCityData) => {
    const content = document.getElementById("content");

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherContainer");
    content.appendChild(weatherContainer);

    const weatherDesc = document.createElement("div");
    weatherDesc.classList.add("weatherDesc");
    weatherDesc.innerText = processedCityData.weather;
    weatherContainer.appendChild(weatherDesc);

    const cityCountry = document.createElement("div");
    cityCountry.classList.add("cityCountry");
    cityCountry.innerText =
      processedCityData.city + ", " + processedCityData.country;
    weatherContainer.appendChild(cityCountry);

    const currentTime = document.createElement("div");
    currentTime.classList.add("currentTime");
    currentTime.innerText = processedCityData.currentTime;
    weatherContainer.appendChild(currentTime);

    const temperatureCurrent = document.createElement("div");
    temperatureCurrent.classList.add("temperatureCurrent");
    temperatureCurrent.innerText =
      parseInt(processedCityData.tempCurrent) + "\u2103";
    weatherContainer.appendChild(temperatureCurrent);

    const temperatureFeeling = document.createElement("div");
    temperatureFeeling.classList.add("temperatureFeeling");
    temperatureFeeling.innerText =
      "feels like: " + parseInt(processedCityData.tempFeeling) + "\u2103";
    weatherContainer.appendChild(temperatureFeeling);

    const wind = document.createElement("div");
    wind.classList.add("wind");
    wind.innerText = "wind: " + processedCityData.windSpeed + " m/s";
    weatherContainer.appendChild(wind);

    const humidity = document.createElement("div");
    humidity.classList.add("humidity");
    humidity.innerText = "humidity: " + processedCityData.humidity + " %";
    weatherContainer.appendChild(humidity);

    const sunrise = document.createElement("div");
    sunrise.classList.add("sunrise");
    sunrise.innerText = "sunrise: " + processedCityData.sunrise;
    weatherContainer.appendChild(sunrise);

    const sunset = document.createElement("div");
    sunset.classList.add("sunset");
    sunset.innerText = "sunset: " + processedCityData.sunset;
    weatherContainer.appendChild(sunset);
  };

  const pollution = (processedPollutionData) => {
    const content = document.getElementById("content");

    const pollutionContainer = document.createElement("div");
    pollutionContainer.classList.add("pollutionContainer");
    content.appendChild(pollutionContainer);

    const COlevel = document.createElement("div");
    COlevel.classList.add("COlevel");
    COlevel.innerText = "CO level: " + processedPollutionData.CO;
    pollutionContainer.appendChild(COlevel);

    const SO2level = document.createElement("div");
    SO2level.classList.add("SO2level");
    SO2level.innerText = "SO2 level: " + processedPollutionData.SO2;
    pollutionContainer.appendChild(SO2level);

    const PM10level = document.createElement("div");
    PM10level.classList.add("PM10level");
    PM10level.innerText = "PM10 level: " + processedPollutionData.PM10;
    pollutionContainer.appendChild(PM10level);

    const NO2level = document.createElement("div");
    NO2level.classList.add("NO2level");
    NO2level.innerText = "NO2 level: " + processedPollutionData.NO2;
    pollutionContainer.appendChild(NO2level);

    const PM25level = document.createElement("div");
    PM25level.classList.add("PM25level");
    PM25level.innerText = "PM2,5 level: " + processedPollutionData.PM25;
    pollutionContainer.appendChild(PM25level);

    const O3level = document.createElement("div");
    O3level.classList.add("O3level");
    O3level.innerText = "O3 level: " + processedPollutionData.O3;
    pollutionContainer.appendChild(O3level);

    const generalPollutionLevel = document.createElement("div");
    generalPollutionLevel.classList.add("generalPollutionLevel");
    if (processedPollutionData.general === 1) {
      generalPollutionLevel.innerText = "General pollution level: good";
    } else if (processedPollutionData.general === 2) {
      generalPollutionLevel.innerText = "General pollution level: fair";
    } else if (processedPollutionData.general === 3) {
      generalPollutionLevel.innerText = "General pollution level: moderate";
    } else if (processedPollutionData.general === 4) {
      generalPollutionLevel.innerText = "General pollution level: poor";
    } else if (processedPollutionData.general === 5) {
      generalPollutionLevel.innerText = "General pollution level: very poor";
    }

    pollutionContainer.appendChild(generalPollutionLevel);
  };

  const noCityFound = () => {
    const inputContainer = document.querySelector(".inputContainer");
    const noCityDivFind = document.querySelector(".noCityFound");
    if (noCityDivFind !== null) {
      noCityDivFind.remove();
    }
    const noCityDiv = document.createElement("div");
    noCityDiv.classList.add("noCityFound");
    noCityDiv.innerText = "No such city!";
    inputContainer.appendChild(noCityDiv);
  };

  // const reset = () => {
  //   const weatherContainer = document.querySelector(".weatherContainer");
  //   weatherContainer.remove();
  // };
  return { contentDiv, searchInput, weather, noCityFound, pollution };
})();
DOM.contentDiv();
DOM.searchInput();

export { DOM };

function searchCity() {
  const input = document.getElementById("input");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const city = input.value;
      // DOM.reset();
      // DOM.contentDiv();
      // DOM.searchInput();
      fetchProcessAPI.getCity(city);
      input.value = null;
      // DOM.noCityFound();
      // searchCity();
    }
  });
}
searchCity();

// console.log(data);
// Object.keys(data).forEach((key) => {
//   console.log(key + ":", data[key]);
// });

// https://openweathermap.org/api/air-pollution
// https://openweathermap.org/current#data
// https://powietrze.gios.gov.pl/pjp/current

// https://bscottnz.github.io/weather-app/
// https://ding-09.github.io/weather-app/
