exports.isValidDate = (str) => {
  return /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[0-1])$/.test(str);
}

exports.isNormalInteger = (str) => {
  return /^(0|[1-9]\d*)$/.test(str);
}