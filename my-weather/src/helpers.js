import {
  MONTHS,
  SHOT_WEEK_DAYS,
  LONG_WEEK_DAYS,
  BUTTON_ANIMATION_DURATION,
  ERROR_MESSAGE_DURATION,
  TEMP_FACTOR1,
  TEMP_FACTOR2,
  COORD_FACTOR,
  MILLISECONDS_IN_SECOND,
} from './constants';

const createNewElement = (element, ...classes) => {
  const newElement = document.createElement(element);
  classes.forEach((item) => {
    newElement.classList.add(item);
  });
  return newElement;
};

const appendChildren = (parent, ...children) => {
  children.forEach((item) => {
    parent.appendChild(item);
  });
};

const toggleClass = (classItem, ...elements) => {
  elements.forEach((item) => {
    item.classList.toggle(classItem);
  });
};

const addTextNode = (element, text) => element.appendChild(document.createTextNode(text));

const removeFirstChildNode = (...elements) => {
  elements.forEach((item) => {
    item.removeChild(item.childNodes[0]);
  });
};

const removeAllChildNodes = (...elements) => {
  elements.forEach((item) => {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  });
};

const convertCoords = (coordinate) => {
  const degrees = (coordinate > 0) ? Math.floor(coordinate) : Math.ceil(coordinate);
  const minutes = ((Math.abs(coordinate) - Math.abs(degrees)) * COORD_FACTOR).toFixed(2).slice(2);
  return `${degrees}°${minutes}'`;
};

const convertToCelsius = (tempFahr) => ((tempFahr - TEMP_FACTOR1) * TEMP_FACTOR2).toFixed(0);

const convertMinutes = (minutes) => {
  if (minutes < 10) {
    return `0${minutes}`;
  } return minutes;
};

const getLongWeekDay = (unixTime) => {
  const newDate = new Date(unixTime * MILLISECONDS_IN_SECOND);
  return LONG_WEEK_DAYS[newDate.getDay()];
};

const convertDate = (unixTime) => {
  const newDate = new Date(unixTime * MILLISECONDS_IN_SECOND);
  const day = SHOT_WEEK_DAYS[newDate.getDay()];
  const date = newDate.getDate();
  const month = MONTHS[newDate.getMonth()];
  const hours = newDate.getHours();
  const seconds = convertMinutes(newDate.getMinutes());
  return `${day} ${date} ${month} ${hours}:${seconds}`;
};

const getAverageTemp = (tempLow, tempHigh) => ((tempLow + tempHigh) / 2).toFixed(0);

const getSeason = (unixTime) => {
  const newDate = new Date(unixTime * MILLISECONDS_IN_SECOND);
  const month = newDate.getMonth();
  if (month === 11 || month === 0 || month === 1) {
    return 'winter';
  }
  if (month === 2 || month === 3 || month === 4) {
    return 'spring';
  }

  if (month === 5 || month === 6 || month === 7) {
    return 'summer';
  }
  return 'autumn';
};

const getTimeOfDay = (unixTime) => {
  const newDate = new Date(unixTime * MILLISECONDS_IN_SECOND);
  const hour = newDate.getHours();
  if (hour >= 7 && hour <= 20) {
    return 'day';
  }
  return 'night';
};

const animateButton = (buttonElem) => {
  if (buttonElem.classList.contains('search-btn')) {
    buttonElem.classList.add('search-btn-animation');
    setTimeout(() => buttonElem.classList.remove('search-btn-animation'), BUTTON_ANIMATION_DURATION);
  }

  if (buttonElem.classList.contains('last-city-btn')) {
    buttonElem.classList.add('last-city-btn-animation');
    setTimeout(() => buttonElem.classList.remove('last-city-btn-animation'), BUTTON_ANIMATION_DURATION);
  }

  buttonElem.classList.add('btn-animation');
  setTimeout(() => buttonElem.classList.remove('btn-animation'), BUTTON_ANIMATION_DURATION);
};

const showErrorMessage = (message) => {
  const errorMessageBox = document.querySelector('.error-message');
  errorMessageBox.innerText = message;
  toggleClass('hidden', errorMessageBox);
  setTimeout(() => toggleClass('hidden', errorMessageBox), ERROR_MESSAGE_DURATION);
};

export {
  createNewElement,
  appendChildren,
  convertCoords,
  convertToCelsius,
  addTextNode,
  getLongWeekDay,
  convertDate,
  getAverageTemp,
  getSeason,
  getTimeOfDay,
  toggleClass,
  removeFirstChildNode,
  animateButton,
  removeAllChildNodes,
  showErrorMessage,
  convertMinutes,
};
