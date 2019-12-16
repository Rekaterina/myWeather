import {
  createNewElement,
  appendChildren,
  toggleClass,
  addTextNode,
  removeFirstChildNode,
  animateButton,
  removeAllChildNodes,
} from './helpers';


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
    this.renderTemperatureSwitch();
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

  renderSearchBar() {
    this.searchBar = createNewElement('div', 'search-bar');
    this.searchInput = createNewElement('input', 'input');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', 'Search city');
    this.searchButton = createNewElement('button', 'search-btn');
    addTextNode(this.searchButton, 'Search');
    appendChildren(this.searchBar, this.searchInput, this.searchButton);
    appendChildren(this.controlPanelElem, this.searchBar);
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

    this.temperatureSwitch.addEventListener('click', (e) => {
      this.switchTemperature(e);
    });

    this.searchInput.addEventListener('change', ({ target }) => {
      this.saveSearchStr(target.value);
    });

    this.searchButton.addEventListener('click', () => {
      if (this.searchStr.length !== 0) {
        animateButton(this.searchButton);
        this.updateInfo();
      }
    });

    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 13 && this.searchStr.length !== 0) {
        this.updateInfo();
      }
    });
  }

  saveSearchStr(searchStr) {
    this.searchStr = searchStr;
    this.weather.state.city = this.searchStr;
  }

  async reloadImage() {
    animateButton(this.reloadImageButton);
    await this.apiLoader.getImage();
    this.weather.renderBGImage();
  }

  switchTemperature({ target }) {
    if (this.storage.state.celsius && target.classList.contains('fahrenheit-btn')) {
      this.chooseFahrenheit();
    }

    if (this.storage.state.fahrenheit && target.classList.contains('celsius-btn')) {
      this.chooseCelsius();
    }
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
}
