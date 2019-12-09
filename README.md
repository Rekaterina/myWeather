Проблема в том, что я не совсем понимаю как писать правильно асинхронные функции... 
Вот у меня есть класс Geolocation, в котором я получаю координаты местоположения, отрисовываю карту,
Потом после получения координат, в классе ApiLoader я на основании этих координат получаю данные,
которые рендерю в классе Weather.

Так вот , чтобы это все последовательно реализовать я вызываю
 необходимый метод в конце текущего метода, что наверное не есть хорошо)

```javascript
   extractGeoLocation(position) {
    const { latitude, longitude } = position.coords;
    this.weather.state.latitude = latitude;
    this.weather.state.longitude = longitude;
    this.getMap();
  }
 ```
 
 Файл ApiLoader, так писать вообще можно?
 
 ```javascript
    async getData() {
    await Promise.all([this.getLocation(),
      this.getWeather()]);

    this.weather.renderData();
  }
 ```
 Как правильно организовать код?
 Please! help me! cry-cry-cry
