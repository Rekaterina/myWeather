/* eslint-disable no-undef */
import ApiLoader from './ApiLoader';
import { API_KEY, TOKEN, URL } from './constants';
import { createNewElement, appendChildren, convertCoords } from './helpers';

export default class GeoLocation {
  constructor(weather) {
    this.weather = weather;
  }

  async getGeolocation() {
    try {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((pos) => this.extractGeoLocation(pos));
      } else {
        alert('Sorry, browser does not support geolocation!');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  extractGeoLocation(position) {
    const { latitude, longitude } = position.coords;
    this.weather.state.latitude = latitude;
    this.weather.state.longitude = longitude;
    this.getMap();
  }

  getMap() {
    ymaps.ready(() => {
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
    this.renderGeoLocation();
  }

  renderGeoLocation() {
    this.renderMap();
    this.renderCoords();
    this.initApiLoader();
  }

  renderMap() {
    const map = createNewElement('div');
    map.setAttribute('id', 'map');
    this.geoLocationSection = document.querySelector('.geo-location-section');
    appendChildren(this.geoLocationSection, map);
  }

  renderCoords() {
    const coords = `
        <div class="coords">
        <p class="latitude">Latitude: <span class="latitude-value">${convertCoords(this.weather.state.latitude)}</span></p>
        <p class="longitude">Longitude: <span class="longitude-value">${convertCoords(this.weather.state.longitude)}</span></p>
      </div>`;
    this.geoLocationSection.innerHTML += coords;
  }

  initApiLoader() {
    this.apiLoader = new ApiLoader(this.weather, API_KEY, TOKEN, URL);
    this.apiLoader.getData();
  }
}
