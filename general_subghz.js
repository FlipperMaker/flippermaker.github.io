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
class subghzDeviceSignalRawMulti{
	constructor(inputName, inputFiletype, inputVersion, inputFrequency, inputPreset, inputProtocol, inputRAW_Data_Array = [], inputRAW_Data_ArrayChunkedString = [], inputRAW_Data_ArrayChunkedStringFormatted = [], inputRAW_Data_ArrayChunkedStringFormattedPrefixed = [], inputRAW_Data_Prefix = "RAW_Data") {
		this.subghzName = inputName;
		this.subghzFiletype = inputFiletype;
		this.subghzVersion = inputVersion;
		this.subghzFrequency = inputFrequency;
		this.subghzPreset = inputPreset;
		this.subghzProtocol = inputProtocol;
		this.subghzRAW_Data_Array = inputRAW_Data_Array;
		this.subghzRAW_Data_ArrayChunked = inputRAW_Data_ArrayChunkedString;
		this.subghzRAW_Data_ArrayChunkedFormatted = inputRAW_Data_ArrayChunkedStringFormatted;
		this.subghzRAW_Data_ArrayChunkedFormattedPrefixed = inputRAW_Data_ArrayChunkedStringFormattedPrefixed;
		this.subghzRAW_Data_Prefix = inputRAW_Data_Prefix;
	}
	addRawDataSingle(inputData){
		this.subghzRAW_Data_Array.push(inputData);
		if(this.subghzRAW_Data_Array.length > 0){
			this.update_subghzRAW_Data_ArrayChunked();
			this.update_subghzRAW_Data_ArrayChunkedFormatted();
			this.update_subghzRAW_Data_ArrayChunkedFormattedPrefixed();
		}
	}
	update_subghzRAW_Data_ArrayChunked(){
		this.subghzRAW_Data_ArrayChunked = [];
		var tempBuffer = [];
		for (let i in this.subghzRAW_Data_Array) {
			if(tempBuffer.length < 512){
				tempBuffer.push(this.subghzRAW_Data_Array[i]);
			}else{
				this.subghzRAW_Data_ArrayChunked.push(tempBuffer);
				tempBuffer = [];
				tempBuffer.push(this.subghzRAW_Data_Array[i]);
			}
		}
		this.subghzRAW_Data_ArrayChunked.push(tempBuffer);
	}
	update_subghzRAW_Data_ArrayChunkedFormatted(){
		this.subghzRAW_Data_ArrayChunkedFormatted = [];
		for (let i in this.subghzRAW_Data_ArrayChunked) {
			this.subghzRAW_Data_ArrayChunkedFormatted.push(this.subghzRAW_Data_ArrayChunked[i].join(" "));
		}
	}
	update_subghzRAW_Data_ArrayChunkedFormattedPrefixed(){
		this.subghzRAW_Data_ArrayChunkedFormattedPrefixed = [];
		for (let i in this.subghzRAW_Data_ArrayChunkedFormatted) {
			this.subghzRAW_Data_ArrayChunkedFormattedPrefixed.push(this.subghzRAW_Data_Prefix+": "+this.subghzRAW_Data_ArrayChunkedFormatted[i]);
		}
		
	}
}


function genUrlSub(keyName, fileType, version, frequency, preset, protocol, bitLength, keyData) {
	var encodedFileType = fileType.replace(" ", "+");
	var encodedKey = splitIntoPairs(keyData).join("+");
	var returnUrl = "https://dev.flpr.app/s#path=subghz/" + keyName + ".sub&Filetype=" + encodedFileType + "&Version=" + version + "&Frequency=" + frequency + "&Preset=" + preset + "&Protocol=" + protocol + "&Bit=" + bitLength + "&Key=" + encodedKey;
	return returnUrl;
}
function genUrlSub_Raw(keyName, fileType, version, frequency, preset, protocol, rawDataFormatted_Array, prefix = "RAW_Data") { //not done
	var encodedFileType = fileType.replace(" ", "+");
	var rawData = "";
	for(let i in rawDataFormatted_Array){
		var line = rawDataFormatted_Array[i];
		line = line.replace("+","%2B");
		line = line.replace("-","%2D");
		line = replaceSpace(line, "%20");
		line = line.trim();
		rawData = rawData + "&RAW_Data="+line;
	}
	keyName = replaceSpace(keyName, "_");
	fileType = replaceSpace(fileType, "%20");
	var returnUrl = "https://dev.flpr.app/s#path=subghz/" + keyName + ".sub&Filetype=" + fileType + "&Version=" + version + "&Frequency=" + frequency + "&Preset=" + preset + "&Protocol=" + protocol + rawData;
	return returnUrl;
}
function ookToSubRaw(inputName, inputFileType, inputVersion, inputFrequency, inputPreset, inputProtocol, inputOneLen, inputZeroLen, inputRepeats, inputPause, inputOokBits){
	var ret = new subghzDeviceSignalRawMulti(inputName, urlEncodeSpace(inputFileType), inputVersion.toString(), inputFrequency.toString(), inputPreset.toString(), inputProtocol.toString());
	if(parseInt(inputPause) == 0){
		inputPause = inputZeroLen;
	}
	var data = [];
	var prevbit = null;
	var prevbitlen = 0;
	for (let i = 0; i < inputOokBits.length; i++) {
		if (prevbit !== null && prevbit.toString() != inputOokBits[i].toString()){
			data.push(prevbitlen);
			prevbitlen = 0;
		}
		if (inputOokBits[i] == '1'){
			prevbitlen += inputOneLen;
		}else{
			prevbitlen -= inputZeroLen;
		}
		prevbit = inputOokBits[i];
	}
	if (prevbit == '1'){
		data.push(prevbitlen);
		data.push(-inputPause);
	}else{
		data.push(prevbitlen - inputPause);
	}
	var datalines = [];
	for (let i = 0; i < data.length; i+=512){
		var batch = []
		var subData = data.slice(i,i+512);
		for (let o = 0; o < subData.length; o++){
			batch.push(subData[o].toString());
		}
		for(let dataPoint in batch){
			ret.addRawDataSingle(batch[dataPoint]);
		}
		datalines.push("RAW_Data: "+batch.join(" "));
	}	
	return ret;
}


function ookToSubRawText(inputFileType, inputVersion, inputFrequency, inputPreset, inputProtocol, inputOneLen, inputZeroLen, inputRepeats, inputPause, inputOokBits){
	var res = "Filetype: "+urlEncodeSpace(inputFileType)+" Version: "+inputVersion.toString()+" Frequency: "+inputFrequency.toString()+" Preset: "+inputPreset.toString()+" Protocol: "+inputProtocol.toString()+" ";
	if(parseInt(inputPause) == 0){
		inputPause = inputZeroLen;
	}
	var data = [];
	var prevbit = null;
	var prevbitlen = 0;
	for (let i = 0; i < inputOokBits.length; i++) {
		if (prevbit !== null && prevbit.toString() != inputOokBits[i].toString()){
			data.push(prevbitlen);
			prevbitlen = 0;
		}
		if (inputOokBits[i] == '1'){
			prevbitlen += inputOneLen;
		}else{
			prevbitlen -= inputZeroLen;
		}
		prevbit = inputOokBits[i];
	}
	if (prevbit == '1'){
		data.push(prevbitlen);
		data.push(-inputPause);
	}else{
		data.push(prevbitlen - inputPause);
	}
	var datalines = [];
	for (let i = 0; i < data.length; i+=512){
		var batch = []
		var subData = data.slice(i,i+512);
		for (let o = 0; o < subData.length; o++){
			batch.push(subData[o].toString());
		}
		datalines.push("RAW_Data: "+batch.join(" "));
	}
	res += datalines.join('\n');
	return res;
}