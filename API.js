import { DOM } from "./index.js";

const fetchProcessAPI = (() => {
  const getCity = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d83edcff39bcbf91f81d87eaf5275391&units=metric&lang=en`;
    const fetchAPI = await fetch(url, { mode: "cors" });
    const dataAPI = await fetchAPI.json();
    if (dataAPI.cod == 404) {
      DOM.noCityFound();
    } else {
      processCityData(dataAPI);
    }
  };
  getCity("Poznan");

  const processCityData = (data) => {
    const processedCityData = {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country,
      timezone: data.timezone / 3600 - 1,
      currentTime: new Date(
        new Date().getTime() +
          new Date().getTimezoneOffset() * 60000 +
          (3600000 * (data.timezone / 3600) - 1)
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      sunrise: new Date(
        new Date(data.sys.sunrise * 1000) + data.timezone / 3600
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      }),
      sunset: new Date(
        new Date(data.sys.sunset * 1000) + data.timezone / 3600
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      }),
      tempCurrent: data.main.temp,
      tempFeeling: data.main.feels_like,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
    // console.table(processedCityData);
    addCityDataToDOM(processedCityData);
    getPollution(processedCityData.lat, processedCityData.lon);
  };

  const addCityDataToDOM = (processedCityData) => {
    const weatherContainer = document.querySelector(".weatherContainer");
    const noCityFound = document.querySelector(".noCityFound");
    if (weatherContainer !== null) {
      weatherContainer.remove();
    }
    if (noCityFound !== null) {
      noCityFound.remove();
    }
    DOM.weather(processedCityData);
  };

  const getPollution = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d83edcff39bcbf91f81d87eaf5275391`;
    const fetchAPI = await fetch(url, { mode: "cors" });
    const dataAPI = await fetchAPI.json();
    processPollutionData(dataAPI);
  };

  const processPollutionData = (data) => {
    const processedPollutionData = {
      CO: data.list[0].components.co,
      PM10: data.list[0].components.pm10,
      PM25: data.list[0].components.pm2_5,
      general: data.list[0].main.aqi,
    };
    // console.table(processedPollutionData);
    addPollutionDataToDOM(processedPollutionData);
  };

  const addPollutionDataToDOM = (processedPollutionData) => {
    const pollutionContainer = document.querySelector(".pollutionContainer");
    if (pollutionContainer !== null) {
      pollutionContainer.remove();
    }
    DOM.pollution(processedPollutionData);
  };
  return { getCity };
})();

export { fetchProcessAPI };
