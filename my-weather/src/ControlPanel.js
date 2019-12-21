import {
  createNewElement,
  appendChildren,
  toggleClass,
  addTextNode,
  removeFirstChildNode,
  animateButton,
  removeAllChildNodes,
  showErrorMessage,
} from './helpers';

import {
  ENTER_KEY_CODE,
} from './constants';


export default class ControlPanel {
  constructor(weather, apiLoader, storage, geoLocation) {
    this.weather = weather;
    this.apiLoader = apiLoader;
    this.storage = storage;
    this.geoLocation = geoLocation;
    this.searchStr = '';
  }

  init() {
    this.renderControlPanel();
    this.setActiveTool();
    this.eventListeners();
  }

  renderControlPanel() {
    const header = document.querySelector('.header');
    this.controlPanelElem = createNewElement('div', 'control-panel');
    appendChildren(header, this.controlPanelElem);
    this.renderReloadImageButton();
    this.renderTranslate();
    this.renderTemperatureSwitch();
    this.renderLastSearchCityButton();
    this.renderSearchBar();
  }

  renderReloadImageButton() {
    this.reloadImageButton = createNewElement('button', 'reload-btn');
    const reloadImageButtonIcon = createNewElement('i', 'fas', 'fa-sync-alt');
    appendChildren(this.reloadImageButton, reloadImageButtonIcon);
    appendChildren(this.controlPanelElem, this.reloadImageButton);
  }

  renderTemperatureSwitch() {
    this.temperatureSwitch = createNewElement('div', 'temperature-switch');
    this.celsiusButton = createNewElement('button', 'celsius-btn');
    this.fahrenheitButton = createNewElement('button', 'fahrenheit-btn');
    addTextNode(this.celsiusButton, '°C');
    addTextNode(this.fahrenheitButton, '°F');
    appendChildren(this.temperatureSwitch, this.celsiusButton, this.fahrenheitButton);
    appendChildren(this.controlPanelElem, this.temperatureSwitch);
  }

  renderLastSearchCityButton() {
    this.lastCityButton = createNewElement('button', 'last-city-btn');
    const span = createNewElement('span');
    this.lastCityName = createNewElement('span', 'last-city');
    addTextNode(span, 'Show weather in');
    addTextNode(this.lastCityName, `${this.weather.state.lastCity}`);
    appendChildren(this.lastCityButton, span, this.lastCityName);
    appendChildren(this.controlPanelElem, this.lastCityButton);
  }

  renderSearchBar() {
    this.searchBar = createNewElement('div', 'search-bar');
    this.searchInput = createNewElement('input', 'input');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', 'Search city');
    this.searchButton = createNewElement('button', 'search-btn');
    this.microphone = createNewElement('div', 'microphone');
    this.microphoneIcon = createNewElement('i', 'fas', 'fa-microphone');
    addTextNode(this.searchButton, 'Search');
    appendChildren(this.microphone, this.microphoneIcon);
    appendChildren(this.searchBar, this.searchInput,
      this.microphone, this.searchButton);
    appendChildren(this.controlPanelElem, this.searchBar);
  }

  renderTranslate() {
    const translate = createNewElement('div');
    translate.setAttribute('id', 'google_translate_element');
    appendChildren(this.controlPanelElem, translate);
  }

  setActiveTool() {
    if (this.storage.state.celsius) {
      this.celsiusButton.classList.add('active');
    }
    if (this.storage.state.fahrenheit) {
      this.fahrenheitButton.classList.add('active');
    }
  }

  eventListeners() {
    this.reloadImageButton.addEventListener('click', () => {
      this.reloadImage();
    });

    this.celsiusButton.addEventListener('click', () => {
      if (this.storage.state.fahrenheit) {
        this.chooseCelsius();
      }
    });

    this.fahrenheitButton.addEventListener('click', () => {
      if (this.storage.state.celsius) {
        this.chooseFahrenheit();
      }
    });

    this.lastCityButton.addEventListener('click', () => {
      animateButton(this.lastCityButton);
      this.searchLastCityInfo();
    });

    this.searchInput.addEventListener('change', ({ target }) => {
      this.saveSearchStr(target.value);
    });

    this.searchButton.addEventListener('click', () => {
      if (this.searchInput.value) {
        this.updateLastCity();
        animateButton(this.searchButton);
        this.updateInfo();
      }
    });

    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === ENTER_KEY_CODE && this.searchInput.value) {
        this.updateLastCity();
        this.updateInfo();
      }
    });

    this.microphone.addEventListener('click', () => {
      this.startRecognition();
    });
  }

  updateLastCity() {
    if ((this.searchInput.value).toLowerCase() !== (this.weather.state.city).toLowerCase()) {
      const temp = this.weather.state.city;
      this.weather.state.city = this.searchStr;
      this.weather.state.lastCity = temp;
      this.updateCityText();
    }
  }

  searchLastCityInfo() {
    this.switchCity();
    this.updateInfo();
  }

  switchCity() {
    const temp = this.weather.state.city;
    this.weather.state.city = this.weather.state.lastCity;
    this.weather.state.lastCity = temp;
    this.updateCityText();
  }

  updateCityText() {
    this.lastCityName.innerText = this.weather.state.lastCity;
  }

  saveSearchStr(searchStr) {
    this.searchStr = searchStr;
  }

  async reloadImage() {
    animateButton(this.reloadImageButton);
    await this.apiLoader.getImage();
    this.weather.renderBGImage();
  }

  chooseCelsius() {
    animateButton(this.celsiusButton);
    this.changeTemperature();
  }

  chooseFahrenheit() {
    animateButton(this.fahrenheitButton);
    this.changeTemperature();
  }

  changeTemperature() {
    this.storage.state.celsius = !this.storage.state.celsius;
    this.storage.state.fahrenheit = !this.storage.state.fahrenheit;
    this.storage.setState();
    toggleClass('active', this.celsiusButton, this.fahrenheitButton);
    this.removeTemperatureText();
    this.weather.addTextTemperatureToday();
    this.weather.addTextTemperatureForecast();
  }

  removeTemperatureText() {
    this.temperatureToday = document.querySelector('.temperature-today');
    this.temperatureFeel = document.querySelector('.temperature-feel');
    removeFirstChildNode(this.temperatureToday, this.temperatureFeel);
    document.querySelectorAll('.weather-forecast-temperature').forEach((item) => {
      removeFirstChildNode(item);
    });
  }

  async updateInfo() {
    try {
      this.startLoad();
      this.removeNodes();
      await this.apiLoader.getCoords();
      await this.geoLocation.getMap();
      await this.apiLoader.getLocation();
      await this.apiLoader.getWeather();
      await this.apiLoader.getImage();
      this.geoLocation.addCoordsText();
      this.weather.renderData();
      this.endLoad();
    } catch (err) {
      showErrorMessage('Error');
    }
  }

  startLoad() {
    this.main = document.querySelector('.main');
    this.spinner = document.querySelector('.spinner');
    toggleClass('hidden', this.spinner, this.main);
  }

  endLoad() {
    toggleClass('hidden', this.spinner, this.main);
  }

  removeNodes() {
    const map = document.querySelector('#map');
    const latitude = document.querySelector('.latitude');
    const longitude = document.querySelector('.longitude');
    removeFirstChildNode(map, latitude, longitude);
    this.weatherSection = document.querySelector('.weather-section');
    removeAllChildNodes(this.weatherSection);
  }

  startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    toggleClass('microphone-animation', this.microphoneIcon);

    recognition.addEventListener('result', (e) => {
      this.recognitionQuery = e.results[0][0].transcript;
    });

    recognition.addEventListener('end', () => {
      toggleClass('microphone-animation', this.microphoneIcon);
      if (!this.recognitionQuery) {
        showErrorMessage('Try again');
        return;
      }
      this.searchInput.value = this.recognitionQuery;
      const temp = this.weather.state.city;
      this.weather.state.city = this.recognitionQuery;
      this.weather.state.lastCity = temp;
      this.updateCityText();
      this.updateInfo();
    });
  }
}
