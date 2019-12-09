import Weather from './Weather';
import GeoLocation from './GeoLocation';
// import ApiLoader from './ApiLoader';
// import { API_KEY, TOKEN, URL } from './constants';
import { createNewElement, appendChildren } from './helpers';
import './style.css';

export default class App {
  constructor() {
    this.wrapper = document.querySelector('.wrapper');
    this.weather = new Weather();
    this.geoLocation = new GeoLocation(this.weather);
    // this.apiLoader = new ApiLoader(this.weather, API_KEY, TOKEN, URL);
  }

  init() {
    this.renderElement();
    this.geoLocation.getGeolocation();
    // this.apiLoader.start();
  }

  renderElement() {
    const header = createNewElement('header', 'header');
    const main = createNewElement('main', 'main');
    const weatherSection = createNewElement('section', 'weather-section');
    const geoLocationSection = createNewElement('section', 'geo-location-section');
    appendChildren(main, weatherSection, geoLocationSection);
    appendChildren(this.wrapper, header, main);
  }
}
