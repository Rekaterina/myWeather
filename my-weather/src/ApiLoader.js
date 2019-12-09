export default class ApiLoader {
  constructor(weather, apiKey, token, url) {
    this.weather = weather;
    this.apiKey = apiKey;
    this.token = token;
    this.url = url;
  }

  async getData() {
    await Promise.all([this.getLocation(),
      this.getWeather()]);

    this.weather.renderData();
  }

  async getLocation() {
    try {
      const url = `${this.url.geocoder}${this.weather.state.latitude}+${this.weather.state.longitude}&key=${this.apiKey.geocoder}&language=en`;
      const locationResponse = await fetch(url);
      const locationData = await locationResponse.json();
      this.weather.state.country = locationData.results[0].components.country;
      this.weather.state.city = locationData.results[0].components.city;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getWeather() {
    try {
      const mainUrl = `${this.url.weather}${this.apiKey.weather}/${this.weather.state.latitude},${this.weather.state.longitude}`;
      const url = this.url.proxy + mainUrl;
      const weatherResponse = await fetch(url);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      this.weather.state.summary = weatherData.currently.summary;
      this.weather.state.humidity = weatherData.currently.humidity;
      this.weather.state.wind = weatherData.currently.windSpeed;
      this.weather.state.temperatureFahr = weatherData.currently.temperature;
      this.weather.state.temperatureFeelFahr = weatherData.currently.apparentTemperature;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
