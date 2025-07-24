import { format } from "date-fns";
import { weatherIcons } from "./weatherIcons.js";
import "./styles.css"; // or './styles.scss'

// DOM Elements
const weatherForm = document.getElementById("weather-form");
const locationInput = document.getElementById("location");
const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");

// API Configuration
const API_KEY = "6bca95e92d953ca3a16ef09d24d5ab8e";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Initialize the app
export function initWeatherApp() {
  weatherForm.addEventListener("submit", handleFormSubmit);
  loadLastSearchedLocation();
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (!location) return;

  try {
    const weatherData = await fetchWeatherData(location);
    updateUI(weatherData);
    saveLastSearchedLocation(location);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Please try again.");
  }
}

// Fetch weather data from API
async function fetchWeatherData(location) {
  const response = await fetch(
    `${API_URL}?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}

// Update the UI with weather data
function updateUI(data) {
  // City and date
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  currentDate.textContent = format(new Date(), "EEEE, MMMM do yyyy");

  // Main weather info
  temperature.textContent = Math.round(data.main.temp);
  weatherCondition.textContent = data.weather[0].description;
  weatherIcon.className = getWeatherIcon(
    data.weather[0].id,
    data.weather[0].icon
  );

  // Weather details
  feelsLike.textContent = Math.round(data.main.feels_like);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
  pressure.textContent = data.main.pressure;
}

// Get appropriate weather icon based on weather code
function getWeatherIcon(weatherCode, iconCode) {
  const isDayTime = iconCode.includes("d");
  const iconClass = weatherIcons[weatherCode] || "fa-cloud";
  return `fas ${iconClass} ${isDayTime ? "day-icon" : "night-icon"}`;
}

// Save last searched location to localStorage
function saveLastSearchedLocation(location) {
  localStorage.setItem("lastSearchedLocation", location);
}

// Load last searched location from localStorage
function loadLastSearchedLocation() {
  const lastLocation = localStorage.getItem("lastSearchedLocation");
  if (lastLocation) {
    locationInput.value = lastLocation;
    weatherForm.dispatchEvent(new Event("submit"));
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initWeatherApp);
