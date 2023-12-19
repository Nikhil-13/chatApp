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
  const words = name?.split(' ');
  let initials = '';
  for (let i = 0; i < Math.min(2, words?.length); i++) {
    if (words[i]?.length > 0) {
      initials += words[i][0]?.toUpperCase();
    }
  }
  return initials;
}

export function sortByTimestamp(inputArray) {
  const sortedArray = inputArray.sort(
    (a, b) => a[1].timestamp - b[1].timestamp,
  );
  return sortedArray;
}

export function timestampToLocal(timestamp) {
  const timestampInMilliseconds = timestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  const localTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return localTime;
}

export function timestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
