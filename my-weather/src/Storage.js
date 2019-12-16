export default class Storage {
  constructor() {
    this.state = {
      celsius: true,
      fahrenheit: false,
    };
  }

  getState() {
    if (localStorage.getItem('celsius') == null) {
      return;
    }
    this.state.celsius = JSON.parse(localStorage.getItem('celsius'));
    this.state.fahrenheit = JSON.parse(localStorage.getItem('fahrenheit'));
  }

  setState() {
    localStorage.setItem('celsius', this.state.celsius);
    localStorage.setItem('fahrenheit', this.state.fahrenheit);
  }
}
