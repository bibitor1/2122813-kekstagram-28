function checkLength(string, number) {
  return string.length <= number;
}

function checkPalindrom (string) {
  string = string.toLowerCase().replace(/ /g,'');
  return string === string.split('').reverse().join('');
}

function getNumbers(string) {
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
}

function addSmth (string, minl, adds) {
  if (string.length >= minl) {
    return string;
  }
  let newadds = minl - string.length;
  return adds.slice(0, newadds % adds.length) + adds.repeat(newadds / adds.length) + string;
}
