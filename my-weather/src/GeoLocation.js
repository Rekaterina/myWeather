/* eslint-disable no-undef */
import {
  createNewElement, appendChildren, convertCoords, addTextNode, showErrorMessage,
} from './helpers';

export default class GeoLocation {
  constructor(weather) {
    this.weather = weather;
  }

  async start() {
    await this.getGeolocation();
    await this.getMap();
    this.renderGeoLocation();
  }

  async getGeolocation() {
    try {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((pos) => this.extractGeoLocation(pos));
      } else {
        showErrorMessage('Sorry, browser does not support geolocation!');
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  extractGeoLocation(position) {
    const { latitude, longitude } = position.coords;
    this.weather.state.latitude = latitude;
    this.weather.state.longitude = longitude;
  }

  async getMap() {
    await ymaps.ready(() => {
      const myMap = new ymaps.Map('map', {
        center: [this.weather.state.latitude, this.weather.state.longitude],
        zoom: 11,
      }, {
        searchControlProvider: 'yandex#search',
      });
      const myGeoObject = new ymaps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: [this.weather.state.latitude, this.weather.state.longitude],
        },
      });
      myMap.geoObjects.add(myGeoObject);
    });
  }

  renderGeoLocation() {
    this.renderMap();
    this.renderCoords();
  }

  renderMap() {
    const map = createNewElement('div');
    map.setAttribute('id', 'map');
    this.geoLocationSection = document.querySelector('.geo-location-section');
    appendChildren(this.geoLocationSection, map);
  }

  renderCoords() {
    const coords = createNewElement('div', 'coords');
    this.latitude = createNewElement('p', 'latitude');
    this.longitude = createNewElement('p', 'longitude');
    this.addCoordsText();
    appendChildren(coords, this.latitude, this.longitude);
    appendChildren(this.geoLocationSection, coords);
  }

  addCoordsText() {
    addTextNode(this.latitude, `Latitude: ${convertCoords(this.weather.state.latitude)}`);
    addTextNode(this.longitude, `Longitude: ${convertCoords(this.weather.state.longitude)}`);
  }
}
