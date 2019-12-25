const API_KEY = {
  weather: 'b94f3a8c43a2c175fd804ca11cdc45c4',
  geocoder: 'e1ca72f9b542444d83814368a5b1d1ca',
  unsplash: '607543282482e421de9fb7ccba6e43658df591b173859db6751d570993e55958',
};

const URL = {
  proxy: 'https://cors-anywhere.herokuapp.com/',
  weather: 'https://api.darksky.net/forecast/',
  geocoder: 'https://api.opencagedata.com/geocode/v1/json?q=',
  unsplash: 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHOT_WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const LONG_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const BUTTON_ANIMATION_DURATION = 500;
const ERROR_MESSAGE_DURATION = 4000;
const TEMP_FACTOR1 = 32;
const TEMP_FACTOR2 = 0.556;
const COORD_FACTOR = 0.6;
const ENTER_KEY_CODE = 13;


export {
  API_KEY,
  URL, MONTHS,
  SHOT_WEEK_DAYS,
  LONG_WEEK_DAYS,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  BUTTON_ANIMATION_DURATION,
  ERROR_MESSAGE_DURATION,
  TEMP_FACTOR1,
  TEMP_FACTOR2,
  COORD_FACTOR,
  ENTER_KEY_CODE,
};
