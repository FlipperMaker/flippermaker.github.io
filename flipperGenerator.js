function cleanString(inputString) {
  return inputString.toString().replace(/\s/g, "");
}
function pad(num, size) {
  num = cleanString(num);
  while (num.length < size) num = "0" + num;
  return num;
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
function getGenerateModal() {
  var generateModal = new bootstrap.Modal(
    document.getElementById("generateModal"),
    {}
  );
  return generateModal;
}
function clearGenerateModal() {
  document.getElementById("generateMessageModal").innerHTML = "";
  document.getElementById("generateButtonModal").innerHTML = "";
}
function setTextGenerateModal(message) {
  document.getElementById("generateMessageModal").innerHTML =
    "<p>" + message + "</p>";
}
function setButtonGenerateModal(linkAddress) {
  document.getElementById("generateButtonModal").innerHTML = linkAddress;
}
function appendTextGenerateModal(message) {
  document.getElementById("generateMessageModal").innerHTML =
    getHtmlGenerateModal() + "<p>" + message + "</p>";
}
function getHtmlGenerateModal() {
  return document.getElementById("generateMessageModal").innerHTML.toString();
}
function splitIntoPairs(inputString) {
  return inputString.match(/(..?)/g);
}
MegaCode_Block: {
  const formMegaCode = document.getElementById("generateMegaCode");

  formMegaCode.addEventListener("submit", (event) => {
    event.preventDefault();
    var generateModal = getGenerateModal();
    //var generateModal = new bootstrap.Modal(document.getElementById('generateModal'), {});
    clearGenerateModal();
    var nameMegaCode = formMegaCode.elements["nameMegaCode"].value;
    nameMegaCode = cleanString(nameMegaCode);
    if (nameMegaCode.length <= 0) {
      nameMegaCode = "NoName";
    }
    var codeMegaCode = formMegaCode.elements["codeMegaCode"].value;
    var codeIntMegaCode = parseInt(codeMegaCode);
    var facMegaCode = formMegaCode.elements["facMegaCode"].value;
    var facIntMegaCode = parseInt(facMegaCode);
    var btnMegaCode = formMegaCode.elements["btnMegaCode"].value;
    var btnIntMegaCode = parseInt(btnMegaCode);
    if (
      codeIntMegaCode > 65535 ||
      codeIntMegaCode < 0 ||
      facIntMegaCode > 15 ||
      facIntMegaCode < 0 ||
      btnIntMegaCode > 7 ||
      btnIntMegaCode < 0
    ) {
      setTextGenerateModal("Input Value Error");
    } else {
      var hexMegaCode = getMegaCodeHex(
        codeIntMegaCode,
        facIntMegaCode,
        btnIntMegaCode
      );
      setButtonGenerateModal(genUrlMegaCode(nameMegaCode, hexMegaCode));
      setTextGenerateModal("Name: " + nameMegaCode + ".sub");
      appendTextGenerateModal("Code: " + codeMegaCode);
      appendTextGenerateModal("Facility: " + facMegaCode);
      appendTextGenerateModal("Button: " + btnMegaCode);
      appendTextGenerateModal("Hex: " + hexMegaCode);
    }
    generateModal.show();
  });
  function getMegaCodeBin(codeData, facData, btnData) {
    codeData = cleanString(codeData);
    facData = cleanString(facData);
    btnData = cleanString(btnData);
    codeBin = intToBin(codeData);
    facBin = intToBin(facData);
    btnBin = intToBin(btnData);
    codeBin = pad(codeBin, 16);
    facBin = pad(facBin, 4);
    btnBin = pad(btnBin, 3);
    var binData = "1" + facBin + codeBin + btnBin;
    return binData;
  }
  function getMegaCodeHex(codeData, facData, btnData) {
    var binData = getMegaCodeBin(codeData, facData, btnData);
    var hexData = binToHex(binData);
    return hexData;
  }

  function genUrlMegaCode(keyName, hexData) {
    var shortName = keyName;
    if (shortName.length > 10) {
      shortName = shortName.slice(0, 10) + "..";
    }
    var kd1 = hexData.slice(0, 2);
    var kd2 = hexData.slice(2, 4);
    var kd3 = hexData.slice(4, 6);
    var returnUrl =
      '<a href="https://dev.flpr.app/s/#path=subghz/' +
      keyName +
      ".sub&Filetype=Flipper+SubGhz+Key+File&Version=1&Frequency=318000000&Preset=FuriHalSubGhzPresetOok650Async&Protocol=MegaCode&Bit=24&Key=00+00+00+00+00+" +
      kd1 +
      "+" +
      kd2 +
      "+" +
      kd3 +
      '" class="btn btn-primary" target="_blank">Download ' +
      shortName +
      ".sub</a>";
    return returnUrl;
  }
}
H10301_Block: {
  const formH10301 = document.getElementById("generateH10301");

  formH10301.addEventListener("submit", (event) => {
    event.preventDefault();
    var generateModal = getGenerateModal();
    //var generateModal = new bootstrap.Modal(document.getElementById('generateModal'), {});
    clearGenerateModal();
    var nameH10301 = formH10301.elements["nameH10301"].value;
    nameH10301 = cleanString(nameH10301);
    if (nameH10301.length <= 0) {
      nameH10301 = "NoName";
    }
    var codeH10301 = formH10301.elements["codeH10301"].value;
    codeH10301 = cleanString(codeH10301);
    var codeIntH10301 = parseInt(codeH10301);
    var facH10301 = formH10301.elements["facH10301"].value;
    facH10301 = cleanString(facH10301);
    var facIntH10301 = parseInt(facH10301);
    if (
      codeIntH10301 > 65535 ||
      codeIntH10301 < 0 ||
      facIntH10301 > 255 ||
      facIntH10301 < 0 ||
      !allNumeric(codeH10301) ||
      !allNumeric(facH10301) ||
      !allAlphaNumericUnderscore(nameH10301)
    ) {
      setTextGenerateModal("Name Or Value Error");
    } else {
      var hexH10301 = getH10301Hex(codeIntH10301, facIntH10301);
      var binH10301 = getH10301Bin(codeIntH10301, facIntH10301);
      console.log(binH10301.slice(0, 12));
      console.log(binH10301.slice(12, 24));
      var binFullH10301 =
        findParity("even", binH10301.slice(0, 12)) +
        binH10301 +
        findParity("odd", binH10301.slice(12, 24));
      setButtonGenerateModal(genUrlH10301(nameH10301, hexH10301));
      setTextGenerateModal("Name: " + nameH10301 + ".sub");
      appendTextGenerateModal("Code: " + codeH10301);
      appendTextGenerateModal("Facility: " + facH10301);
      appendTextGenerateModal("Hex: " + hexH10301);
      appendTextGenerateModal("Binary: " + binH10301);
      appendTextGenerateModal("Binary Full: " + binFullH10301);
    }
    generateModal.show();
  });
  function getH10301Bin(codeData, facData) {
    var hexData = getH10301Hex(codeData, facData);
    var binData = hexToBin(hexData);
    binData = pad(binData, 24);
    return binData;
  }
  function getH10301Hex(codeData, facData) {
    var codeHex = intToHex(codeData);
    codeHex = pad(codeHex, 4);
    var facHex = intToHex(facData);
    facHex = pad(facHex, 2);
    var fullHex = facHex + codeHex;
    return fullHex;
  }

  function genUrlH10301(keyName, hexData) {
    var shortName = keyName;
    if (shortName.length > 10) {
      shortName = shortName.slice(0, 10) + "..";
    }
    var urlH10301 = genUrlRFID(keyName, "H10301", hexData);
    var returnUrl =
      '<a href="' +
      urlH10301 +
      '" class="btn btn-primary" target="_blank">Download ' +
      shortName +
      ".sub</a>";
    return returnUrl;
  }
}
Firefly_Block: {
  const formFirefly = document.getElementById("generateFirefly");

  formFirefly.addEventListener("submit", (event) => {
    event.preventDefault();
    var generateModal = getGenerateModal();
    clearGenerateModal();
    var nameFirefly = formFirefly.elements["nameFirefly"].value;
    nameFirefly = cleanString(nameFirefly);
    if (nameFirefly.length <= 0) {
      nameFirefly = "NoName";
    }
    var codeFirefly = formFirefly.elements["codeFirefly"].value;
    codeFirefly = cleanString(codeFirefly);
    var codeIntFirefly = pad(parseInt(codeFirefly), 10);
    if (
      codeIntFirefly.length != 10 ||
      !allBinary(codeFirefly) ||
      !allAlphaNumericUnderscore(nameFirefly)
    ) {
      setTextGenerateModal("Name Or Value Error");
    } else {
      var hexFirefly = getFireflyHex(codeIntFirefly);
      setButtonGenerateModal(genUrlFirefly(nameFirefly, hexFirefly));
      setTextGenerateModal("Name: " + nameFirefly + ".sub");
      appendTextGenerateModal("Hex: " + hexFirefly);
      appendTextGenerateModal("Binary: " + codeIntFirefly);
    }
    generateModal.show();
  });
  /*  function getFireflyBin(codeData, facData) {
    var hexData = getFireflyHex(codeData, facData);
    var binData = hexToBin(hexData);
    binData = pad(binData, 24);
    return binData;
  }*/
  function getFireflyHex(codeData) {
    var codeHex = binToHex(codeData);
    codeHex = pad(codeHex, 10);
    return codeHex;
  }

  function genUrlFirefly(keyName, hexData) {
    var shortName = keyName;
    if (shortName.length > 10) {
      shortName = shortName.slice(0, 10) + "..";
    }
    hexData = pad(hexData, 16);
    var urlFirefly = genUrlSub(
      keyName,
      "Flipper SubGhz Key File",
      "1",
      "300000000",
      "FuriHalSubGhzPresetOok650Async",
      "Firefly",
      "10",
      hexData
    );
    var returnUrl =
      '<a href="' +
      urlFirefly +
      '" class="btn btn-primary" target="_blank">Download ' +
      shortName +
      ".sub</a>";
    return returnUrl;
  }
}
General: {
  function genUrlSub(
    keyName,
    fileType,
    version,
    frequency,
    preset,
    protocol,
    bitLength,
    keyData
  ) {
    var encodedFileType = fileType.replace(" ", "+");
    var encodedKey = splitIntoPairs(keyData).join("+");
    var returnUrl =
      "https://dev.flpr.app/s#path=subghz/" +
      keyName +
      ".sub&Filetype=" +
      encodedFileType +
      "&Version=" +
      version +
      "&Frequency=" +
      frequency +
      "&Preset=" +
      preset +
      "&Protocol=" +
      protocol +
      "&Bit=" +
      bitLength +
      "&Key=" +
      encodedKey;
    return returnUrl;
  }
  //needs to be generalized more. ie different bit length
  function genUrlRFID(keyName, keyType, hexData) {
    var kd1 = hexData.slice(0, 2);
    var kd2 = hexData.slice(2, 4);
    var kd3 = hexData.slice(4, 6);
    var returnUrl =
      "https://dev.flpr.app/s#path=lfrfid/" +
      keyName +
      ".rfid&Filetype=Flipper+RFID+key&Version=1&Key+type=" +
      keyType +
      "&Data=" +
      kd1 +
      "+" +
      kd2 +
      "+" +
      kd3;
    return returnUrl;
  }
}
