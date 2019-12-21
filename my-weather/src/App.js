import Weather from './Weather';
import GeoLocation from './GeoLocation';
import ApiLoader from './ApiLoader';
import ControlPanel from './ControlPanel';
import Storage from './Storage';
import './style.css';
import {
  createNewElement,
  appendChildren,
  toggleClass,
  showErrorMessage,
} from './helpers';
import {
  API_KEY, URL,
} from './constants';

export default class App {
  constructor() {
    this.wrapper = document.querySelector('.wrapper');
    this.storage = new Storage();
    this.weather = new Weather(this.storage);
    this.geoLocation = new GeoLocation(this.weather);
    this.apiLoader = new ApiLoader(this.weather, API_KEY, URL);
    this.controlPanel = new ControlPanel(this.weather, this.apiLoader,
      this.storage, this.geoLocation);
  }

  init() {
    this.storage.getState();
    this.renderMainElement();
    this.controlPanel.init();
    this.getData();
  }

  async getData() {
    try {
      await this.geoLocation.start();
      await this.apiLoader.getData();
      this.endLoad();
    } catch (err) {
      showErrorMessage('Error');
    }
  }

  renderMainElement() {
    const header = createNewElement('header', 'header');
    this.main = createNewElement('main', 'main', 'hidden');
    const weatherSection = createNewElement('section', 'weather-section');
    const geoLocationSection = createNewElement('section', 'geo-location-section');
    this.spinner = createNewElement('div', 'spinner');
    const errorMessageBox = createNewElement('p', 'error-message', 'hidden');
    appendChildren(this.main, weatherSection, geoLocationSection);
    appendChildren(this.wrapper, header, this.main, this.spinner, errorMessageBox);
  }

  endLoad() {
    toggleClass('hidden', this.spinner, this.main);
  }
}
