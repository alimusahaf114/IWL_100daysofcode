document.addEventListener("DOMContentLoaded", () => {
  startSnowfall(); // Start snowfall as soon as the page loads
});

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "870a335e41b4b821de2269e925be6914";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter a City.......");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data....");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  let weatherInfoContainer = document.querySelector(".weatherInfoContainer");
  if (!weatherInfoContainer) {
    weatherInfoContainer = document.createElement("div");
    weatherInfoContainer.classList.add("weatherInfoContainer");
    card.appendChild(weatherInfoContainer);
  }

  weatherInfoContainer.innerHTML = "";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  weatherInfoContainer.appendChild(cityDisplay);
  weatherInfoContainer.appendChild(tempDisplay);
  weatherInfoContainer.appendChild(humidityDisplay);
  weatherInfoContainer.appendChild(descDisplay);
  weatherInfoContainer.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️";
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "☔";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800 && weatherId < 900:
      return "☁️";
    default:
      return "?";
  }
}

function displayError(message) {
  let weatherInfoContainer = document.querySelector(".weatherInfoContainer");
  if (!weatherInfoContainer) {
    weatherInfoContainer = document.createElement("div");
    weatherInfoContainer.classList.add("weatherInfoContainer");
    card.appendChild(weatherInfoContainer);
  }

  weatherInfoContainer.innerHTML = "";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherInfoContainer.appendChild(errorDisplay);
}

// Function to create a continuous snowfall effect
function startSnowfall() {
  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random position and animation duration for more realism
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.width = snowflake.style.height = `${
      Math.random() * 5 + 5
    }px`;

    document.body.appendChild(snowflake);
  }
}
