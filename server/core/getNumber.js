let number;

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (number === undefined || forceRestart === true) {
    number = Math.round(Math.random() * 100);

    if (number === 0) { number = 1; }
  }
  //console.log(number);
  return number;
};

export default getNumber;
