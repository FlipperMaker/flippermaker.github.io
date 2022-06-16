cardCollapseEnabled = () => true;


function showHideCard(btn, cardID){
	if(!cardCollapseEnabled()) return;
	if (typeof btn === 'string' || btn instanceof String) btn = document.getElementById(btn);
	btn.addEventListener("click", (event) => {
		event.preventDefault();
		$(cardID).collapse("toggle");
		$(cardID).on('shown.bs.collapse hidden.bs.collapse', (event) => updateMasonryLayout());			
	});
}
function showHideCardShow(cardID){
	if(!cardCollapseEnabled()) return;
	$(cardID).collapse("show");
	$(cardID).on('shown.bs.collapse hidden.bs.collapse', (event) => updateMasonryLayout());
}
function genCardHeadCode(cardTitle, cardSpanName){
	var a = `<div class="card-header text-center">`;
	var aa = `<div class="card-header">`;
	var l = `<div class="ms-auto d-inline-block">`;
	var ll = `<div class="text-start d-inline-block">`;
	var lll = `<div class="float-start d-inline-block">`;
	var r = `<div class="me-auto d-inline-block">`;
	var rr = `<div class="text-end d-inline-block">`;
	var rrr = `<div class="float-end d-inline-block">`;
	var d = `</div>`;
	var b = `<h5 class="card-title d-inline-block">${cardTitle}</h5>`;
	if(!cardCollapseEnabled()) return a+b+d;
	var c = `<button id="${cardSpanName}BodyCollapse" type="button" class="btn btn-primary btn-sm d-inline-block">Show/Hide</button>`;
	return aa+lll+b+d+rrr+c+d+d;
}


function updateMasonryLayout(){
	var msnry = new Masonry( '.row', { percentPosition: true });
	msnry.layout();
}



function getDownloadWebsitePrefix(internalUrl = false){
	if (internalUrl) return "https://flippermaker.github.io/download.html";
	return "https://dev.flpr.app/s";
}

function cleanString(inputString) {
  return inputString.toString().replaceAll(/\s/g, "");
}
function replaceSpace(inputString, replacement) {
  return inputString.toString().replaceAll(/\s/g, replacement);
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
function allHex(inputText) {
  return /^[A-Fa-f0-9]+$/.test(inputText);
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
function dictionaryToArray(inputDictionary){
	var ret = [];
	for (let i in inputDictionary) {
		ret.push([i, inputDictionary[i]]);		
	}
	return ret;
}



