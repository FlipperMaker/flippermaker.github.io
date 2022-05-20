class subghzDevice{
	constructor(inputName) {
		this.subghzName = inputName;
		this.subghzSignal = [];
	}
	addSignal(signal){
		this.subghzSignal.push(signal);
	}
	getSignal(inputName){
		for(var i = 0; i < this.subghzSignal.length; i++) {
			var n = this.subghzSignal[i];
			if(n.subghzName.toString().toLowerCase() == inputName.toString().toLowerCase()){
				return n;
			}				
		}
	
	}
}
class subghzDeviceSignalRaw{
	constructor(inputName, inputFiletype, inputVersion, inputFrequency, inputPreset, inputProtocol, inputRAW_Data) {
		this.subghzName = inputName;
		this.subghzFiletype = inputFiletype;
		this.subghzVersion = inputVersion;
		this.subghzFrequency = inputFrequency;
		this.subghzPreset = inputPreset;
		this.subghzProtocol = inputProtocol;
		this.subghzRAW_Data = inputRAW_Data;
	}
}


function genUrlSub(keyName, fileType, version, frequency, preset, protocol, bitLength, keyData) {
	var encodedFileType = fileType.replace(" ", "+");
	var encodedKey = splitIntoPairs(keyData).join("+");
	var returnUrl = "https://dev.flpr.app/s#path=subghz/" + keyName + ".sub&Filetype=" + encodedFileType + "&Version=" + version + "&Frequency=" + frequency + "&Preset=" + preset + "&Protocol=" + protocol + "&Bit=" + bitLength + "&Key=" + encodedKey;
	return returnUrl;
}
function genUrlSub_Raw(keyName, fileType, version, frequency, preset, protocol, rawData) {
	var encodedFileType = fileType.replace(" ", "+");
	var returnUrl = "https://dev.flpr.app/s#path=subghz/" + keyName + ".sub&Filetype=" + encodedFileType + "&Version=" + version + "&Frequency=" + frequency + "&Preset=" + preset + "&Protocol=" + protocol + "&RAW_Data=" + rawData;
	return returnUrl;
}