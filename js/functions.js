function checkLength(string, number) {
  return (string.length <= number) ? true : false;
}
console.log(checkLength('Я ничего не понимаю', 20));

function checkPalindrom (string) {
  string = string.toLowerCase().replace(/ /g,'');
  return (string == string.split('').reverse().join('')) ? true : false;
}
console.log(checkPalindrom('Лёша на полке клопа нашёл '));

function getNumbers(string) {
  if (typeof string === 'number') {
      return string;
      }
  let str = '';
  for (i = 0; i < string.length; i++) {
      if (!Number.isNaN(parseInt(string[i], 10))) {
      str += string[i];
      }
  }
  return parseInt(str, 10);
}
console.log(getNumbers('2023 год'));

function addSmth (string, minl, adds) {
  if (string.length >= minl) {
      return string;
  }
      let newadds = minl - string.length;
      return adds.slice(0, newadds % adds.length) + adds.repeat(newadds / adds.length) + string;
}
console.log(addSmth ('q', 4, 'werty'))
