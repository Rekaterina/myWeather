import {
  createNewElement,
  appendChildren,
  convertToCelsius,
  addTextNode,
  getLongWeekDay,
  getAverageTemp,
  removeFirstChildNode,
  convertDate,
} from './helpers';
import { MILLISECONDS_IN_MINUTE, SECONDS_IN_MINUTE } from './constants';

export default class Weather {
  constructor(storage) {
    this.state = { lastCity: 'Moscow' };
    this.storage = storage;
  }

  renderData() {
    this.renderBGImage();
    this.renderLocation();
    this.renderCurrentDate();
    this.renderWeatherToday();
    this.renderWeatherForecast();
  }

  renderBGImage() {
    if (this.state.image) {
      document.body.style.backgroundImage = `url(${this.state.image})`;
    }
  }

  renderLocation() {
    const location = createNewElement('p', 'location');
    this.weatherSection = document.querySelector('.weather-section');
    appendChildren(this.weatherSection, location);
    addTextNode(location, `${this.state.city}, ${this.state.country}`);
  }

  renderCurrentDate() {
    this.getCurrentDate();
    this.currentDateElem = createNewElement('p', 'current-date');
    this.weatherSection = document.querySelector('.weather-section');
    addTextNode(this.currentDateElem, `${this.state.currentDate}`);
    appendChildren(this.weatherSection, this.currentDateElem);
    setInterval(() => this.updateCurrentDate(), MILLISECONDS_IN_MINUTE);
  }

  getCurrentDate() {
    this.state.currentDate = convertDate(this.state.localTime);
    this.state.localTime += SECONDS_IN_MINUTE;
  }

  updateCurrentDate() {
    this.getCurrentDate();
    removeFirstChildNode(this.currentDateElem);
    addTextNode(this.currentDateElem, `${this.state.currentDate}`);
  }

  renderWeatherToday() {
    this.weatherSection = document.querySelector('.weather-section');
    const weatherToday = createNewElement('div', 'weather-today');
    const weatherIcon = createNewElement('img', 'weather-icon');
    this.temperatureToday = createNewElement('p', 'temperature-today');
    const weatherTodayData = createNewElement('ul', 'weather-today-data');
    const weatherSummary = createNewElement('li');
    this.temperatureFeel = createNewElement('li', 'temperature-feel');
    const wind = createNewElement('li');
    const humidity = createNewElement('li');

    this.addTextTemperatureToday();
    addTextNode(weatherSummary, `${this.state.summary}`);
    addTextNode(wind, `wind: ${(this.state.wind).toFixed(0)}m/s`);
    addTextNode(humidity, `humidity: ${this.state.humidity * 100}%`);
    weatherIcon.src = `img/icons/${this.state.icon}.png`;

    appendChildren(weatherTodayData, weatherSummary, this.temperatureFeel, wind, humidity);
    appendChildren(weatherToday, this.temperatureToday, weatherIcon, weatherTodayData);
    appendChildren(this.weatherSection, weatherToday);
  }

  addTextTemperatureToday() {
    if (this.storage.state.celsius) {
      addTextNode(this.temperatureToday, `${convertToCelsius(this.state.temperatureFahr)}°`);
      addTextNode(this.temperatureFeel, `feels like: ${convertToCelsius(this.state.temperatureFeelFahr)}°`);
    } else {
      addTextNode(this.temperatureToday, `${(this.state.temperatureFahr).toFixed(0)}°`);
      addTextNode(this.temperatureFeel, `feels like: ${(this.state.temperatureFeelFahr).toFixed(0)}°`);
    }
  }

  renderWeatherForecast() {
    const weatherForecast = createNewElement('div', 'weather-forecast');
    for (let i = 0; i < 3; i += 1) {
      const weatherForecastItem = createNewElement('p', 'weather-forecast-item');
      const weatherForecastDay = createNewElement('span', 'weather-forecast-day');
      const weatherForecastTemp = createNewElement('span', 'weather-forecast-temperature');
      const weatherForecastIcon = createNewElement('img', 'weather-forecast-icon');

      appendChildren(weatherForecastItem, weatherForecastDay,
        weatherForecastTemp, weatherForecastIcon);
      appendChildren(weatherForecast, weatherForecastItem);
    }

    appendChildren(this.weatherSection, weatherForecast);

    document.querySelectorAll('.weather-forecast-day').forEach((item, index) => {
      addTextNode(item, getLongWeekDay((this.state.forecast.time[index] + this.state.timeOffset)));
    });

    document.querySelectorAll('.weather-forecast-icon').forEach((item, index) => {
      const link = item;
      link.src = `img/icons/${this.state.forecast.icon[index]}.png`;
    });

    this.addTextTemperatureForecast();
  }

  addTextTemperatureForecast() {
    document.querySelectorAll('.weather-forecast-temperature').forEach((item, index) => {
      const tempLow = this.state.forecast.tempLow[index];
      const tempHigh = this.state.forecast.tempHigh[index];
      const averageTemp = getAverageTemp(tempLow, tempHigh);
      if (this.storage.state.celsius) {
        addTextNode(item, `${convertToCelsius(averageTemp)}°`);
      } else {
        addTextNode(item, `${averageTemp}°`);
      }
    });
  }
}
