
//https://stackoverflow.com/questions/55659348/how-to-iterate-over-a-dictionary-of-arrays-without-knowing-the-key-name
class irDevice{
	constructor(irName) {
		this.irName = irName;
		this.irButtons = [];
	}
	addButton(btn){
		this.irButtons.push(btn);
	}
}
class irDeviceButton{
	constructor(btnName, btnType, btnProtocol, btnAddress, btnCommand) {
		this.btnName = btnName;
		this.irType = btnType;
		this.irProtocol = btnProtocol;
		this.btnAddress = btnAddress;
		this.btnCommand = btnCommand;
	}
}
//var returnUrl = "https://dev.flpr.app/s#path=infrared/" + keyName + ".ir&Filetype=" + encodedFileType + "&Version=" + version + "&%23=flippermaker.github.io" + "&name=" + preset + "&type=" + irType + "&protocol=" + irProtocol + "&address=" + irAddress + "&command=" + encodedCommand;

//https://dev.flpr.app/s/#path=infrared/4.ir&Filetype=IR+signals+file&Version=1&%23=flippermaker.github.io
//&name=Power&type=parsed&protocol=Samsung32&address=0E+00+00+00&command=0C+00+00+00
function genUrlIr(keyName, fileType, version, btnName, irType, irProtocol, irAddress, irCommand) {
	var encodedFileType = replaceSpace(fileType, "+");
	var returnUrl = getDownloadWebsitePrefix()+"#path=infrared/" + keyName + ".ir&Filetype=" + encodedFileType + "&Version=" + version + genUrlIrSingleButton(btnName, irType, irProtocol, irAddress, irCommand) + "%0A";
	return returnUrl;
}
function genUrlIrMultiButton(keyName, fileType, version, buttonArray) {
	if(buttonArray.length == 0){return "#";}
	if(buttonArray.length == 1){return genUrlIr(keyName, fileType, version, buttonArray[0].btnName, buttonArray[0].irType, buttonArray[0].irProtocol, buttonArray[0].btnAddress, buttonArray[0].btnCommand);}
	var encodedFileType = replaceSpace(fileType, "+");
	var returnUrl = getDownloadWebsitePrefix()+"#path=infrared/" + keyName + ".ir&Filetype=" + encodedFileType + "&Version=" + version + genUrlIrMultiButtonString(buttonArray) + "%0A";
	console.log(returnUrl);
	return returnUrl;
}

function genUrlIrSingleButton(btnName, irType, irProtocol, irAddress, irCommand) {
	var encodedAddress = splitIntoPairs(replaceSpace(irAddress,"")).join("+");
	var encodedCommand = splitIntoPairs(replaceSpace(irCommand,"")).join("+");
	//var returnUrl = "&%23=flippermaker.github.io" + "&name=" + btnName + "&type=" + irType + "&protocol=" + irProtocol + "&address=" + encodedAddress + "&command=" + encodedCommand; //%0D%0A \r\n
	var returnUrl = "%0A%23%20" + "&name=" + btnName + "&type=" + irType + "&protocol=" + irProtocol + "&address=" + encodedAddress + "&command=" + encodedCommand;
	return returnUrl;
}
function genUrlIrMultiButtonArray(buttons) {
	singleButtons = [];
	buttons.forEach(c => {
		singleButtons.push(genUrlIrSingleButton(c.btnName, c.irType, c.irProtocol, c.btnAddress, c.btnCommand));
		//console.log("SINGLE----"+genUrlIrSingleButton(c.btnName, c.irType, c.irProtocol, c.btnAddress, c.btnCommand));
	});
	return singleButtons;
}
function genUrlIrMultiButtonString(buttons) {
	//console.log(genUrlIrMultiButtonArray(buttons).join(""));
	return genUrlIrMultiButtonArray(buttons).join("");
}



