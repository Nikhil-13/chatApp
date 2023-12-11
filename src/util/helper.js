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
export function formattedNumber(value) {
  const formatted = value.slice(0, 5) + ' ' + value.slice(5, 10);
  return formatted;
}

export function removeNonAlphabeticCharacters(inputString) {
  var regex = /[^a-zA-Z\s]/g;
  var cleanedString = inputString.replace(regex, '');
  return cleanedString;
}

export function getInitials(name) {
  const words = name.split(' ');
  let initials = '';
  for (let i = 0; i < Math.min(2, words.length); i++) {
    if (words[i].length > 0) {
      initials += words[i][0].toUpperCase();
    }
  }
  return initials;
}