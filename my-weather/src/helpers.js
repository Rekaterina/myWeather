import {
  MONTHS,
  SHOT_WEEK_DAYS,
  LONG_WEEK_DAYS,
  BUTTON_ANIMATION_DURATION,
  ERROR_MESSAGE_DURATION,
  TEMP_FACTOR1,
  TEMP_FACTOR2,
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
  const degrees = Math.floor(coordinate);
  const minutes = (coordinate - degrees).toFixed(2).slice(2);
  return `${degrees}°${minutes}'`;
};

const convertToCelsius = (tempFahr) => ((tempFahr - TEMP_FACTOR1) * TEMP_FACTOR2).toFixed(0);

const convertMinutes = (minutes) => {
  if (minutes < 10) {
    return `0${minutes}`;
  } return minutes;
};

const getLongWeekDay = (newDate) => LONG_WEEK_DAYS[newDate.getDay()];

const convertDate = (newDate) => `${SHOT_WEEK_DAYS[newDate.getDay()]}
  ${newDate.getDate()}
  ${MONTHS[newDate.getMonth()]}
  ${newDate.getHours()}:${convertMinutes(newDate.getMinutes())}`;

const getAverageTemp = (tempLow, tempHigh) => ((tempLow + tempHigh) / 2).toFixed(0);

const getSeason = (newDate) => {
  const month = newDate.getMonth();
  if (month === 11 || month === 0 || month === 1) {
    return 'winter';
  }
  if (month === 2 || month === 3 || month === 4) {
    return 'summer';
  }

  if (month === 5 || month === 6 || month === 7) {
    return 'spring';
  }
  return 'autumn';
};

const getTimeOfDay = (newDate) => {
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
  buttonElem.classList.add('btn-animation');
  setTimeout(() => buttonElem.classList.remove('btn-animation'), BUTTON_ANIMATION_DURATION);
};

const showErrorMessage = (message) => {
  const errorMessageBox = document.querySelector('.error-message');
  addTextNode(errorMessageBox, `Error: ${message}`);
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
};
