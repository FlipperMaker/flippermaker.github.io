function cleanString(inputString) {
  return inputString.toString().replace(/\s/g, "");
}
function replaceSpace(inputString, replacement) {
  return inputString.toString().replace(/\s/g, replacement);
}
function urlEncodeSpace(inputString) {
  return replaceSpace(inputString, "+");
}
function pad(num, size) {
  num = cleanString(num);
  while (num.length < size) num = "0" + num;
  return num;
}
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
function intToHex(inputNumber) {
  var hexString = parseInt(inputNumber, 10).toString(16);
  return hexString.toString().toUpperCase();
}
function hexToInt(inputHex) {
  var hexString = parseInt(inputHex, 16);
  return hexString.toString();
}
function intToBin(inputNumber) {
  var binString = parseInt(inputNumber, 10).toString(2);
  return binString.toString();
}
function binToInt(inputBin) {
  var binString = parseInt(inputBin, 2);
  return binString.toString();
}
function binToHex(inputBin) {
  return intToHex(binToInt(inputBin)).toUpperCase();
}
function hexToBin(inputHex) {
  return intToBin(hexToInt(inputHex));
}
function findParity(parity, bin) {
  const arr = bin.toString().split("");
  let countOnes = 0;
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 1) {
      countOnes += 1;
    }
  }
  if (parity == "even") {
    if (countOnes % 2 == 0) {
      res = 0;
    } else {
      res = 1;
    }
  } else {
    if (countOnes % 2 !== 0) {
      res = 0;
    } else {
      res = 1;
    }
  }
  return res;
}
function allNumeric(inputText) {
  return /^\d+$/.test(inputText);
}
function allAlphaNumericUnderscore(inputText) {
  return /^[A-Za-z_0-9]+$/.test(inputText);
}
function allBinary(inputText) {
  return /^[0-1]+$/.test(inputText);
}
function splitIntoPairs(inputString) {
  return inputString.match(/(..?)/g);
}
function dictionaryKeySearch(inputDictionary, inputSearchWord){
	var ret = null;
	for (let i in inputDictionary) {
		if(inputSearchWord.toString().trim().toLowerCase() == i.toString().trim().toLowerCase()){
			ret = inputDictionary[i];
			break;
		}
	}
	return ret;
}



