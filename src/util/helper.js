export function extractDigits(inputString) {
  const regex = /\d/g;
  const digitsArray = inputString.match(regex);
  if (digitsArray !== null) {
    const digitsOnly = digitsArray.join('');
    return digitsOnly;
  }
}

export function validateNumber(value) {
  return value.length !== 10;
}
export function formatNumber(value) {
  const formatted =
    value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 10);
  return formatted;
}
