const isLong = (string, number) => string.length <= number;
isLong('Я ничего не понимаю', 10);

const isPalindrom = (string) => {
  string = string.toLowerCase().replace(/ /g,'');
  return string === string.split('').reverse().join('');
};
isPalindrom('ТоПот');

const getNumbers = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let str = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      str += string[i];
    }
  }
  return parseInt(str, 10);
};
getNumbers('2023 год');

const addSmth = (string, minLength, piece) => {
  if (string.length >= minLength) {
    return string;
  }

  const newPiece = minLength - string.length;
  return piece.slice(0, newPiece % piece.length) + piece.repeat(newPiece / piece.length) + string;
};
addSmth('q', 4, 'we');
