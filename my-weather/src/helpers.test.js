import {
  convertToCelsius,
  convertCoords,
  convertMinutes,
  getAverageTemp,
  convertDate,
  getLongWeekDay,
  getSeason,
  getTimeOfDay,
} from './helpers';

describe('helpers.convertToCelsius', () => {
  test('сonvert temperature from Fahrenheit to Celsius', () => {
    expect(convertToCelsius(30)).toBe('-1');
    expect(convertToCelsius(32)).toBe('0');
    expect(convertToCelsius(40)).toBe('4');
    expect(convertToCelsius(50)).toBe('10');
    expect(convertToCelsius(100)).toBe('38');
  });
});

describe('helpers.convertCoords', () => {
  test('сonvert coordinate to degrees and minutes', () => {
    expect(convertCoords(53.54782)).toBe("53°33'");
    expect(convertCoords(-53.54782)).toBe("-53°33'");
    expect(convertCoords(143.9836882)).toBe("143°59'");
    expect(convertCoords(-143.9836882)).toBe("-143°59'");
  });
});

describe('helpers.convertMinutes', () => {
  test('сonvert minutes', () => {
    expect(convertMinutes(0)).toBe('00');
    expect(convertMinutes(5)).toBe('05');
    expect(convertMinutes(10)).toBe(10);
    expect(convertMinutes(59)).toBe(59);
  });
});

describe('helpers.getAverageTemp', () => {
  test('get the average of the numbers', () => {
    expect(getAverageTemp(2.748, 5.849)).toBe('4');
    expect(getAverageTemp(-12.748, -25.849)).toBe('-19');
    expect(getAverageTemp(24.748, 54.849)).toBe('40');
    expect(getAverageTemp(23.748, -32.849)).toBe('-5');
  });
});

describe('helpers.convertDate', () => {
  test('convert date to string', () => {
    expect(convertDate(134567777)).toBe('Sun 7 April 14:56');
    expect(convertDate(1576566657)).toBe('Tue 17 December 10:10');
    expect(convertDate(1850423344)).toBe('Mon 21 August 1:29');
    expect(convertDate(1346997277)).toBe('Fri 7 September 8:54');
  });
});

describe('helpers.getLongWeekDay', () => {
  test('get long week day', () => {
    expect(getLongWeekDay(134567777)).toBe('Sunday');
    expect(getLongWeekDay(1576566657)).toBe('Tuesday');
    expect(getLongWeekDay(1850423344)).toBe('Monday');
    expect(getLongWeekDay(1346997277)).toBe('Friday');
  });
});

describe('helpers.getSeason', () => {
  test('get season of year', () => {
    expect(getSeason(134567777)).toBe('spring');
    expect(getSeason(1576566657)).toBe('winter');
    expect(getSeason(1850423344)).toBe('summer');
    expect(getSeason(1346997277)).toBe('autumn');
  });
});

describe('helpers.getTimeOfDay', () => {
  test('get get time of day', () => {
    expect(getTimeOfDay(134567777)).toBe('day');
    expect(getTimeOfDay(1576566657)).toBe('day');
    expect(getTimeOfDay(1850423344)).toBe('night');
    expect(getTimeOfDay(1346997277)).toBe('day');
  });
});
