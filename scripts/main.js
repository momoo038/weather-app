import { fetchAPI } from "./api.js";

const searchBtn = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const errorSpan = document.querySelector(".errorSpan");
const toggleWeather = document.querySelector(".toggleWeatherVisibility ");
const toggleFooter = document.querySelector(".weatherFooterVisibility");
const weatherHumidity = document.querySelector(".humidity-num");
const weatherWind = document.querySelector(".wind-num");
const weatherTemp = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".description");
const weatherCity = document.querySelector(".city");
const weatherIcon = document.querySelector(".weatherIcon");
const tempSwitchBtn = document.querySelector(".tempSwitch");

let lastFetchedFahrenheit = null;
let lastFetchedWind = null;

searchBtn.addEventListener("click", async () => {
  const searchValue = searchInput.value;
  if (searchValue === "") {
    console.error(`Search term cannot be empty`);
    errorSpan.style.display = "block";
    errorSpan.textContent = "Search term cannot be empty.";
    toggleWeather.style.display = "none";
    toggleFooter.style.display = "none";

    setTimeout(() => {
      errorSpan.style.display = "none";
      errorSpan.textContent = "";
    }, 2000);
    return;
  }

  try {
    const searchData = await fetchAPI(searchValue);
    console.log(searchData);
    if (!searchData) {
      return;
    }

    lastFetchedFahrenheit = searchData.currentConditions.temp;
    lastFetchedWind = searchData.currentConditions.windspeed;

    toggleWeather.style.display = "block";
    toggleFooter.style.display = "block";
    weatherTemp.textContent = lastFetchedFahrenheit + " F°";
    weatherDesc.textContent = searchData.currentConditions.conditions;
    weatherHumidity.textContent = searchData.currentConditions.humidity;

    if (tempSwitchBtn.classList.contains("celsius")) {
      const mphToKph = lastFetchedWind * 1.60934;
      weatherWind.textContent = mphToKph.toFixed(1) + " kph";
    } else {
      weatherWind.textContent = lastFetchedWind + " mph";
    }

    weatherCity.textContent = searchData.resolvedAddress;
    weatherIcon.src =
      "images/weather-icons/" + searchData.currentConditions.icon + ".svg";
  } catch (error) {
    console.error(`Failed to fetch API data: ${error}`);
    errorSpan.style.display = "block";
    errorSpan.textContent = error.message;

    setTimeout(() => {
      errorSpan.style.display = "none";
      toggleWeather.style.display = "none";
      toggleFooter.style.display = "none";
      errorSpan.textContent = "";
    }, 2000);
  }
});

tempSwitchBtn.addEventListener("click", () => {
  tempSwitchBtn.classList.toggle("celsius");
  if (tempSwitchBtn.classList.contains("celsius")) {
    tempSwitchBtn.textContent = "C°";
  } else {
    tempSwitchBtn.textContent = "F°";
  }

  if (lastFetchedFahrenheit !== null) {
    if (tempSwitchBtn.classList.contains("celsius")) {
      const tempsCelsius = (lastFetchedFahrenheit - 32) / 1.8;
      weatherTemp.textContent = tempsCelsius.toFixed(1) + " C°";
      const mphToKph = lastFetchedWind * 1.60934;
      weatherWind.textContent = mphToKph.toFixed(1) + " kph";
    } else {
      weatherTemp.textContent = lastFetchedFahrenheit + " F°";
      weatherWind.textContent = lastFetchedWind + " mph";
    }
  }
});
