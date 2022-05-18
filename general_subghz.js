function genUrlSub(keyName, fileType, version, frequency, preset, protocol, bitLength, keyData) {
	var encodedFileType = fileType.replace(" ", "+");
	var encodedKey = splitIntoPairs(keyData).join("+");
	var returnUrl = "https://dev.flpr.app/s#path=subghz/" + keyName + ".sub&Filetype=" + encodedFileType + "&Version=" + version + "&Frequency=" + frequency + "&Preset=" + preset + "&Protocol=" + protocol + "&Bit=" + bitLength + "&Key=" + encodedKey;
	return returnUrl;
}