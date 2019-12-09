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

const convertCoords = (coordinate) => {
  const degrees = Math.floor(coordinate);
  const minutes = (coordinate - degrees).toFixed(2).slice(2);
  return `${degrees}°${minutes}'`;
};

const convertToCelc = (temperatureFahr) => {
  return ((temperatureFahr - 32) * 0.556).toFixed(0);
};

export {
  createNewElement,
  appendChildren,
  convertCoords,
  convertToCelc,
};
