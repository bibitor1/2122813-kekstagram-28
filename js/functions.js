const isTheStringLonger = (str, num) => str.length <= num;
isTheStringLonger('Я ничего не понимаю', 10);

const isPalindrom = (str) => {
  str = str.toLowerCase().replace(/ /g,'');
  return str === str.split('').reverse().join('');
};
isPalindrom('ТоПот');

const getNumbers = (str) => {
  if (typeof str === 'number') {
    return str;
  }

  let newStr = '';

  for (const i in str) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      newStr += str[i];
    }
  }
  return parseInt(newStr, 10);
};
getNumbers('2023 год');

const addSymbolsToString = (str, minLength, piece) => {
  if (str.length >= minLength) {
    return str;
  }

  const newPiece = minLength - str.length;

  return piece.slice(0, newPiece % piece.length) + piece.repeat(newPiece / piece.length) + str;
};
addSymbolsToString('q', 4, 'we');
