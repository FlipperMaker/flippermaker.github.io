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