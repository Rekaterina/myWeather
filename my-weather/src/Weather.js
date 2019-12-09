import { createNewElement, appendChildren, convertToCelc } from './helpers';

export default class Weather {
  constructor() {
    this.state = {};
  }

  renderData() {
    this.renderLocation();
    this.renderWeatherToday();
  }

  renderLocation() {
    const location = createNewElement('p', 'location');
    this.weatherSection = document.querySelector('.weather-section');
    appendChildren(this.weatherSection, location);
    location.innerText = `${this.state.city}, ${this.state.country}`;
  }

  renderWeatherToday() {
    const weatherToday = `
    <div class="weather-today">
      <img class="weather-today-icon" src="#" alt="weather">
      <p class="temperature-value">${convertToCelc(this.state.temperatureFahr)}°</p>
      <ul class="weather-description">
        <li class="weather-summary">${this.state.summary}</li>
        <li class="temperature-feel">feels like: ${convertToCelc(this.state.temperatureFeelFahr)}°</li>
        <li class="wind">wind: ${this.state.wind} m/s</li>
        <li class="humidity">humidity: ${this.state.humidity * 100}%</li>
      </ul>
    </div>`;
    this.weatherSection = document.querySelector('.weather-section');
    this.weatherSection.innerHTML += weatherToday;
  }
}
