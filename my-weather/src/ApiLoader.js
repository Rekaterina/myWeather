import { getSeason, getTimeOfDay, showErrorMessage } from './helpers';

import {
  MILLISECONDS_IN_SECOND,
} from './constants';

export default class ApiLoader {
  constructor(weather, apiKey, url) {
    this.weather = weather;
    this.apiKey = apiKey;
    this.url = url;
    this.weatherData = null;
    this.locationData = null;
  }

  async getData() {
    await this.getLocation();
    await this.getWeather();
    await this.getImage();
    this.weather.renderData();
  }

  async getLocation() {
    try {
      const url = `${this.url.geocoder}${this.weather.state.latitude}+${this.weather.state.longitude}&key=${this.apiKey.geocoder}&language=en`;
      const locationResponse = await fetch(url);
      this.locationData = await locationResponse.json();
      this.extractLocationData();
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  extractLocationData() {
    this.weather.state.city = this.locationData.results[0].components.city;
    this.weather.state.country = this.locationData.results[0].components.country;
    if (!this.weather.state.localOffset) {
      this.weather.state.localOffset = this.locationData.results[0].annotations.timezone.offset_sec;
    }
    this.weather.state.cityOffset = this.locationData.results[0].annotations.timezone.offset_sec;
    this.weather.state.timeOffset = this.weather.state.cityOffset - this.weather.state.localOffset;
  }

  async getWeather() {
    try {
      const mainUrl = `${this.url.weather}${this.apiKey.weather}/${this.weather.state.latitude},${this.weather.state.longitude}`;
      const url = this.url.proxy + mainUrl;
      const weatherResponse = await fetch(url);
      this.weatherData = await weatherResponse.json();
      this.extractWeatherTodayData();
      this.extractWeatherForecastData();
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  extractWeatherTodayData() {
    this.weather.state.unixTime = this.weatherData.currently.time;
    this.weather.state.localTime = this.weather.state.unixTime + this.weather.state.timeOffset;
    this.weather.state.summary = this.weatherData.currently.summary;
    this.weather.state.icon = this.weatherData.currently.icon;
    this.weather.state.humidity = this.weatherData.currently.humidity;
    this.weather.state.wind = this.weatherData.currently.windSpeed;
    this.weather.state.temperatureFahr = this.weatherData.currently.temperature;
    this.weather.state.temperatureFeelFahr = this.weatherData.currently.apparentTemperature;
  }

  extractWeatherForecastData() {
    this.weather.state.forecast = {};
    this.weather.state.forecast.icon = [];
    this.weather.state.forecast.time = [];
    this.weather.state.forecast.tempHigh = [];
    this.weather.state.forecast.tempLow = [];

    for (let i = 1; i < 4; i += 1) {
      this.weather.state.forecast.icon.push(this.weatherData.daily.data[i].icon);
      this.weather.state.forecast.time.push(this.weatherData.daily.data[i].time);
      this.weather.state.forecast.tempHigh.push(this.weatherData.daily.data[i].temperatureHigh);
      this.weather.state.forecast.tempLow.push(this.weatherData.daily.data[i].temperatureLow);
    }
  }

  async getImage() {
    try {
      const imageQuery = `
        ${this.weather.state.summary}
        ${getSeason(new Date(this.weather.state.localTime * MILLISECONDS_IN_SECOND))}
        ${getTimeOfDay(new Date(this.weather.state.localTime * MILLISECONDS_IN_SECOND))}`;
      const url = `${this.url.unsplash}${imageQuery}&client_id=${this.apiKey.unsplash}`;
      const imageResponse = await fetch(url);
      this.imageData = await imageResponse.json();
      this.weather.state.image = this.imageData.urls.regular;
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  async getCoords() {
    try {
      const url = `${this.url.geocoder}${this.weather.state.city}&key=${this.apiKey.geocoder}`;
      const coordsResponse = await fetch(url);
      const coordsData = await coordsResponse.json();
      this.weather.state.latitude = coordsData.results[0].geometry.lat;
      this.weather.state.longitude = coordsData.results[0].geometry.lng;
    } catch (err) {
      showErrorMessage(err.message);
    }
  }
}
