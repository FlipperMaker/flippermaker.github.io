class nfcGeneral{
	constructor(tagType) {
		this.nfc = new nfcNTAG(tagType);
		this.errorFlag = false;
	}
	checkErrorFlagOK = () => this.errorFlag == false && this.nfc.errorFlag == false;
	generate_tag_url(filename, url){
		
		var generatedNFC = this.nfc.generate_TAG_URL(url);
		if (generatedNFC === false) return false;
		var badUrl = false;
		var CR = '%0D';
		var LF = '%0A';
		var hash = '%23';
		var fc = generatedNFC.trim();
		if(fc.length == 0){ return '#'; }
		fc = fc.split('\n');
		var returnUrlCheck = getDownloadWebsitePrefix(true)+"#path=nfc%2F"+filename+".nfc";
		var returnUrl = getDownloadWebsitePrefix(true)+"#path=nfc%2F"+filename+".nfc";
		fc.forEach( i => {
			var ii = i.trim();	
			if(ii.slice(0,1) != '#' && ii.length > 0){
				if(!ii.includes(':') && ii.trim().slice(0,1) != '#'){badUrl = true;}
				var iii = ii.split(':');
				var a = urlEncodeSpace(iii[0].trim());
				var b = urlEncodeSpace(iii[1].trim());
				returnUrl += "&" + a + "=" + b;
			}
		});
		if(badUrl){return "";}
		if(returnUrlCheck == returnUrl){return "";}
		return returnUrl;// + LF;
	}
}
class nfcHelper{
	constructor() {
		this.exceptionOnError = true;
		this.errorFlag = false;
	}
	error = (funcName, msg) => console.log('nfcHelper-Error-'+funcName+'-'+msg);
	checkErrorFlagOK = () => this.errorFlag == false;
	throwException(msg, ret = false){
        if (this.exceptionOnError) console.log(msg);
		this.errorFlag = !ret;
        return ret;
	}
	upper = (val) => (val && typeof val === 'string' ? val.toUpperCase().trim() : this.error('upper', typeof val));
	lower = (val) => (val && typeof val === 'string' ? val.toLowerCase().trim() : this.error('lower', typeof val));
	array_contains = (val, valArray) => valArray.includes(val);
	array_contains_lower = (val, valArray) => {var r = valArray.find((el) => el.toLowerCase() === val.toLowerCase()); return (r ? r : false);};
	dict_contains_lower = (val, valDict) => {var r = Object.keys(valDict).find((el) => {return el.toLowerCase() === val.toLowerCase()}); return (r ? valDict[r] : false);};
	dict_contains = (val, valDictionary) => val in valDictionary;
	isTrue = (x) => x === true;
	isFalse = (x) => x === false;
	randomHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	genPages = (r, c = 4, prefill = 0) => Array.from(Array(parseInt(r)), _ => Array(parseInt(c)).fill(parseInt(prefill)));
	
	int_to_hexStr = (x, padding = 0) => pad(intToHex(x), padding);
	int_to_binStr = (x, padding = 0) => pad(intToBin(x), padding);
	hexStr_to_intStr = (x, padding = 0) => pad(BigInt("0x"+x), padding);
	binStr_to_intStr = (x, padding = 0) => pad(BigInt("0b"+x), padding);
	hexStr_to_int = (x, padding = 0) => BigInt(this.hexStr_to_intStr(x, padding));
	binStr_to_int = (x, padding = 0) => BigInt(this.binStr_to_intStr(x, padding));
	hexStr_to_binStr = (x, padding = 0) => this.int_to_binStr(this.hexStr_to_int(x, padding), padding);
	binStr_to_hexStr = (x, padding = 0) => this.int_to_hexStr(this.binStr_to_int(x, padding), padding);
	hex_to_binStr = (x, padding = 0) => parseInt(x, 16).toString(2);
	bin_to_hexStr = (x, padding = 0) => parseInt(x, 2).toString(16);
	hex_to_hexStr = (x) => x.toString(16);
	
	splitString = (x) => x.match(/(..?)/g);
	splitStringToString = (x) => this.splitString(x).join(' ');
	
	intToPageAndIndex = (inputIndex, pageSize = 4) => [parseInt(parseInt(inputIndex)/pageSize), parseInt(parseInt(inputIndex)%pageSize)];
	
	hexArrayToByteArray = (hexArray) => (Array.isArray(hexArray) ? [... new Uint8Array(hexArray)] : (Number.isInteger(hexArray) ? [... new Uint8Array([hexArray])] : this.throwException('nefHelper-Error-hexArrayToByteArray') ));
	
	byteArray_to_hexStr = (buffer) => [...new Uint8Array(buffer)].map(x => this.upper(x.toString(16).padStart(2, '0'))).join('');	
	byteArray_to_hexStr_Split = (x) => this.splitStringToString(this.byteArray_to_hexStr(x));
	byteArray_to_hexStr_Split_Array = (x) => this.byteArray_to_hexStr_Split(x).split(' ');
	hexStr_to_byteArray(hex) {
		for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	}
	prepend(value, array) {
		var newArray = array.slice();
		newArray.unshift(value);
		return newArray;
	}
	string_to_bytes = (x) => {
		var data = [];
		for (var i = 0; i < x.length; i++){  
			data.push(x.charCodeAt(i).toString(16));
		}
		return data;
	};
	// string_to_bytes = (x) => {
		// var arr1 = [];
		// for (var n = 0, l = x.length; n < l; n ++) 
		 // {
			// var hex = x.charCodeAt(n).toString(16);
			// arr1.push(hex);
		 // }
		// return arr1.join('');
	// };
	
}
class nfcNTAG{
	constructor(nfcDeviceType = 'NTAG215') {
		this.exceptionOnError = true;
		this.helper = new nfcHelper();
        this.nfcDeviceType = this.validDeviceType(nfcDeviceType);
        this.nfcPages = this.helper.genPages(this.getNfcPageCount());
        this.nfcUID = '044FA8925D5A81'.replaceAll(' ','');
		this.errorFlag = false;
	}
	checkErrorFlagOK = () => this.errorFlag == false && this.helper.errorFlag == false;
	throwException(msg, ret = false){
        if (this.exceptionOnError) console.log(msg);
		this.errorFlag = !ret;
        return ret;
	}
	getFlipperFileVersion = () => 2;
	getNfcCascadeTag = (getArray = false) => this.helper.int_to_hexStr(getArray ? this.helper.hexArrayToByteArray(0x88) : 0x88);
	getNfcATQA = (getArray = false) => (getArray ? this.helper.hexArrayToByteArray([0x44, 0x00]) : 0x4400);
	getNfcSAK = (getArray = false) => (getArray ? this.helper.hexArrayToByteArray(0x00) : 0x00);
	
	getNfcDeviceType = (nfcDeviceType = null) => (nfcDeviceType ? nfcDeviceType : this.nfcDeviceType);
	
	validDeviceType(nfcDeviceType){
        nfcDeviceType = this.helper.upper(nfcDeviceType);
        var nfcDeviceTypes = ['NTAG213','NTAG215','NTAG216'];
        if (this.helper.array_contains(nfcDeviceType, nfcDeviceTypes)) return nfcDeviceType;
        return this.throwException('Error: validDeviceType');
	}
	getNfcPageCount(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var pageSizes = {'NTAG213':'45','NTAG215':'135','NTAG216':'231'};
        var pageSize = this.helper.dict_contains_lower(nfcDeviceType, pageSizes);
		if (pageSize) return pageSize;
        return this.throwException('getNfcPageCount');
	}
	getNfcSignature(opt = 2){
		var nfcSignature = [this.helper.hexStr_to_byteArray('1B84EB70BD4CBD1B1DE4980B1858BD7C7285B4E47B388E96CF886BEEA343AD90'),
                        this.helper.hexStr_to_byteArray('0000000000000000000000000000000000000000000000000000000000000000'),
                        this.helper.hexStr_to_byteArray(this.helper.randomHex(64))];
        return this.helper.byteArray_to_hexStr(nfcSignature[opt]);
	}
	getNfcManufacturerId(manufacturer){
        var nfcManufacturers = {'NXPsemiconductors': 0x04, 'STMicroelectronics': 0x02, 'EMmicroelectronic':0x16, 'NordicSemiconductor': 0x5F};
        var manufacturer = this.helper.dict_contains_lower(manufacturer, nfcManufacturers);
		if (manufacturer) return manufacturer;
        return this.throwException('getNfcManufacturerId');
	}
	getNfcStorageSize(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var storageSizes = {'NTAG213': 0x0F, 'NTAG215': 0x11, 'NTAG216': 0x13};
        var storageSize = this.helper.dict_contains_lower(nfcDeviceType, storageSizes);
        if (storageSize) return storageSize;
        return this.throwException('getNfcStorageSize');
	}
	getNfcProductType(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var productTypes = {'NTAG213': 0x04, 'NTAG215': 0x04, 'NTAG216': 0x04};
        var productType = this.helper.dict_contains_lower(nfcDeviceType, productTypes);
        if (productType) return productType;
        return this.throwException('getNfcProductType');
	}
	getNfcMaxUrlLength(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var urlLengths = {'NTAG213': 132, 'NTAG215': 492, 'NTAG216': 854};
        var urlLength = this.helper.dict_contains_lower(nfcDeviceType, urlLengths);
        if (urlLength) return urlLength;
        return this.throwException('getNfcMaxUrlLength');
	}
	getNfcMaxTextLength(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var textLengths = {'NTAG213': 130, 'NTAG215': 490, 'NTAG216': 852};
        var textLength = this.helper.dict_contains_lower(nfcDeviceType, textLengths);
        if (textLength) return textLength;
        return this.throwException('getNfcMaxTextLength');
	}
	getNfcProductSubType(nfcDeviceType = null, nfcSubType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        nfcSubType = (nfcSubType ? nfcSubType : '50pF');
        var productSubTypes = {'NTAG213': {'50pF': 0x02}, 'NTAG215': {'50pF': 0x02}, 'NTAG216': {'50pF': 0x02}};
        var productSubTypeA = this.helper.dict_contains_lower(nfcDeviceType, productSubTypes);
		if (productSubTypeA){
			var productSubTypeB = this.helper.dict_contains_lower(nfcSubType, productSubTypeA);
			if (productSubTypeB) return productSubTypeB;
		}
        return this.throwException('getNfcProductSubType');
	}
	getMifareVersion(nfcManufacturer = 'NXPsemiconductors', nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var fixedHeader = 0x00;
        var vendorID = this.getNfcManufacturerId(nfcManufacturer);
        vendorID = this.helper.isFalse(vendorID) ? 0x04 : vendorID;
        var productType = this.getNfcProductType();
        var productSubType = this.getNfcProductSubType();
        var majorProductVersion = 0x01;
        var minorProductVersion = 0x00;
        var storageSize = this.getNfcStorageSize(nfcDeviceType);
        var protocolType = 0x03;
        var nfcMifareVersion = [fixedHeader, vendorID, productType, productSubType, majorProductVersion, minorProductVersion, storageSize, protocolType];
        nfcMifareVersion = this.helper.hexArrayToByteArray(nfcMifareVersion);
        return nfcMifareVersion;
	}
	updatePagesHex(page, pageIndex, hexVal){
		hexVal = parseInt(hexVal, 16);
		var maxIndex = this.nfcPages.length*4;
		var curIndex = (page*4) + pageIndex;
		if (curIndex >=  maxIndex) return this.throwException('updatePagesHex-outside limits');
		this.nfcPages[page][pageIndex] = this.helper.upper(hexVal.toString()).replace('0X','');
	}
	
	setCapabilityContainer(nfcDeviceType = null){
        nfcDeviceType = this.getNfcDeviceType(nfcDeviceType);
        var cc0 = 0xE1;
        var cc1 = 0x10;
        var cc2 = {'NTAG213': 0x12, 'NTAG215':0x3E, 'NTAG216': 0x6D}; //NDEF Size
        cc2 = this.helper.dict_contains_lower(nfcDeviceType, cc2);
        if (cc2 === false) return this.throwException('setCapabilityContainer');
        var cc3 = 0x00;
        var cc = this.helper.hexArrayToByteArray([cc0, cc1, cc2, cc3]);
        cc = this.helper.byteArray_to_hexStr(cc);
        cc = this.helper.splitString(cc);
        var offset = 3*4;
		cc.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i+offset);
			this.updatePagesHex(v[0],v[1],x);
		});
	}
	getNfcUid(opt = 2){
        if (this.nfcUID) return this.nfcUID;
        var randomUID = this.helper.hexArrayToByteArray([this.getNfcManufacturerId('NXPsemiconductors')]);
        randomUID = [...randomUID, ...this.helper.hexStr_to_byteArray(this.helper.randomHex(10))];
        randomUID = [...randomUID, 0x80];
        var nfcUIDs = ['0485928AA06181', '044FA8925D5A81', randomUID]; //'04 XX XX XX XX XX (80,81)'
        this.nfcUID = this.helper.byteArray_to_hexStr(this.nfcUID);
        return this.nfcUID;
	}
	setConfigPages(){//hexArrayToByteArray
        var config_p0_i0_b76_MIRROR_CONF = {'default': [0b0,0b0], 'noASCIImirror': [0b0,0b0], 'UIDASCIImirror': [0b0,0b1], 'NFCcounterASCIImirror': [0b1,0b0],'UIDandNFCcounterASCIImirror': [0b1,0b1]};
        var config_p0_i0_b54_MIRROR_BYTE = {'default': [0b0,0b0]};
        var config_p0_i0_b3_RFUI = [0b0];
        var config_p0_i0_b2_STRG_MOD_EN = {'default':[0b1], 'strongModulationEnable':[0b1], 'strongModulationDisable':[0b0]};
        var config_p0_i0_b10_RFUI = [0b0,0b0];
        var config_p0_i0x = [config_p0_i0_b76_MIRROR_CONF['default'], config_p0_i0_b54_MIRROR_BYTE['default'], config_p0_i0_b3_RFUI,
                              config_p0_i0_b2_STRG_MOD_EN['default'], config_p0_i0_b10_RFUI];
        
        var config_p0_i0 = 0b0;
        config_p0_i0x.forEach(i => {
            i.forEach(o => config_p0_i0 = config_p0_i0<<1^o);
		});
        var config_p0_i1 = 0x00;
        var config_p0_i2 = 0x00;
        var config_p0_i3 = 0xFF;
        var config_p0 = this.helper.hexArrayToByteArray([config_p0_i0, config_p0_i1, config_p0_i2, config_p0_i3]);
        var config_p1_i0_b7_PROT = {'default': [0b0], 'writeProtected': [0b0], 'readWriteProtected': [0b1]};
        var config_p1_i0_b6_CFGLCK = {'default': [0b0], 'userConfigurationUnlocked': [0b0], 'userConfigurationLocked': [0b1]};
        var config_p1_i0_b5_RFUI = [0b0];
        var config_p1_i0_b4_NFC_CNT_EN = {'default': [0b0], 'NFCcounterDisabled': [0b0], 'NFCcounterEnabled': [0b1]};
        var config_p1_i0_b3_NFC_CNT_PWD_PROT = {'default': [0b0], 'NFCcounterProtectionDisabled': [0b0], 'NFCcounterProtectionEnabled': [0b1]};
        var config_p1_i0_b210_AUTHLIM = {'default': [0b0, 0b0, 0b0], 'UnlimitedPasswordAttempts': [0b0, 0b0, 0b0], 'ThreePasswordAttempts': [0b0, 0b1, 0b1]};
        var config_p1_i0 = 0b0;
        var config_p1_i0x = [config_p1_i0_b7_PROT['default'], config_p1_i0_b6_CFGLCK['default'], config_p1_i0_b5_RFUI,
                        config_p1_i0_b4_NFC_CNT_EN['default'], config_p1_i0_b3_NFC_CNT_PWD_PROT['default'], config_p1_i0_b210_AUTHLIM['default']];
        config_p1_i0x.forEach(i => {
            i.forEach(o => config_p1_i0 = config_p1_i0<<1^o);
		});
        var config_p1_i1 = 0x05;
        var config_p1_i2 = 0x00;
        var config_p1_i3 = 0x00;
        var config_p1 = this.helper.hexArrayToByteArray([config_p1_i0, config_p1_i1, config_p1_i2, config_p1_i3]);
        var config_p2 = this.helper.hexArrayToByteArray([0x00, 0x00, 0x00, 0x00]);
        var config_p3_i01 = this.helper.hexArrayToByteArray([0x00, 0x00]);
        var config_p3_i2 = 0x00;
        var config_p3_i3 = 0x00;
        var config_p3 = this.helper.hexArrayToByteArray([...config_p3_i01, config_p3_i2, config_p3_i3]);
        var config = this.helper.hexArrayToByteArray([...config_p0, ...config_p1, ...config_p2, ...config_p3]);
        config = this.helper.splitString(this.helper.byteArray_to_hexStr(config));
    
        var offset = 9999;
        if (this.nfcDeviceType == 'NTAG213'){ offset = 41*4;}
        else if (this.nfcDeviceType == 'NTAG215'){ offset = 131*4;}
        else if (this.nfcDeviceType == 'NTAG216'){ offset = 227*4;}
        else {return this.throwException('setConfigPages - offset error');}
		config.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i+offset);
			this.updatePagesHex(v[0],v[1],x);
		});
	}
	calculateBccChecksum(hexList){
        var ret = 0b0;
        hexList.forEach(i => {
			ret = ret ^ parseInt(i,16);
		});
        return ret;
	}
	setPagesUidAndSerial(lock1 = 0x00, lock2 = 0x00){
        var insertData = [];
        var uidList = this.helper.splitString(this.getNfcUid());
        var bcc0 = uidList.slice(0,3);
        var bcc1 = this.helper.int_to_hexStr(this.calculateBccChecksum(uidList.slice(3)));
        bcc0 = this.helper.prepend(this.getNfcCascadeTag(), bcc0);
        bcc0 = this.helper.int_to_hexStr(this.calculateBccChecksum(bcc0));
        insertData = [...insertData, ...uidList.slice(0,3)];
        insertData.push(bcc0);
        insertData = [...insertData, ...uidList.slice(3)];
        insertData.push((bcc1));
        insertData.push(('48'));
        insertData.push((lock1));
        insertData.push((lock2));
		insertData.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i);
			this.updatePagesHex(v[0],v[1],x);
		});
        
	}
	setManualBytes(){
        var manuallySetBytes = {'NTAG213':[{'page':40, 'index':3, 'data': 0xbd}],
                            'NTAG215':[{'page':130, 'index':3, 'data': 0xbd}],
                            'NTAG216':[{'page':226, 'index':3, 'data': 0xbd}]};
        var insertData = [];
        if (this.nfcDeviceType == 'NTAG213') insertData = manuallySetBytes['NTAG213'];
        else if (this.nfcDeviceType == 'NTAG215') insertData = manuallySetBytes['NTAG215'];
        else if (this.nfcDeviceType == 'NTAG216') insertData = manuallySetBytes['NTAG216'];
        else return this.throwException('setManualBytes - Device Type error');
		insertData.forEach((x, i) => {
			this.updatePagesHex(x['page'],x['index'],this.helper.hex_to_hexStr(x['data']));
		});
	}
	generateHeader(){
        var nfcHeader = ['Filetype: Flipper NFC device',
                     `Version: ${this.getFlipperFileVersion()}`,
                     `Device type: ${this.nfcDeviceType}`,
                     `UID: ${this.helper.splitStringToString(this.getNfcUid())}`,
                     `ATQA: ${this.helper.splitStringToString(pad(this.getNfcATQA().toString(16),4))}`,
                     `SAK: ${pad(this.getNfcSAK().toString(16),2)}`,
                     `Signature: ${this.helper.splitStringToString(this.getNfcSignature())}`,
                     `Mifare version: ${this.helper.byteArray_to_hexStr_Split(this.getMifareVersion())}`,
                     'Counter 0: 0',
                     'Tearing 0: 00',
                     'Counter 1: 0',
                     'Tearing 1: 00',
                     'Counter 2: 0',
                     'Tearing 2: 00',
                     `Pages total: ${this.getNfcPageCount()}`];
        return nfcHeader.join('\n');
	}
	generatePages = () => {
		var ret = '';
		this.nfcPages.forEach((x, i) => {
			var reta = '';
			x.forEach((x,i) => reta+=this.helper.int_to_hexStr(x, 2));
			if (ret.length > 0) ret += '\n';
			ret += `Page ${i.toString()}: ${this.helper.splitStringToString(reta)}`;
		});
		return ret;
	};
	generate(){
        this.setPagesUidAndSerial();
        this.setCapabilityContainer();
        this.setConfigPages();
        this.setManualBytes();
	}
	
	getUriIdentifier(identifier){
        var identifiers = {'None': 0x00, 'http://www.': 0x01, 'https://www.': 0x02, 'http://': 0x03, 'https://': 0x04, 'tel:': 0x05,
                       'mailto:': 0x06, 'ftp://anonymous:anonymous@': 0x07, 'ftp://ftp.': 0x08, 'ftps://': 0x09, 'sftp://': 0x0A,
                       'smb://': 0x0B, 'nfs://': 0x0C, 'ftp://': 0x0D, 'dav://': 0x0E, 'news:': 0x0F, 'telnet://': 0x10, 'imap:': 0x11,
                       'rtsp://': 0x12, 'urn:': 0x13, 'pop:': 0x14, 'sip:': 0x15, 'sips:': 0x16, 'tftp:': 0x17, 'btspp://': 0x18,
                       'btl2cap://': 0x19, 'btgoep://': 0x1A, 'tcpobex://': 0x1B, 'irdaobex://': 0x1C, 'file://': 0x1D, 'urn:epc:id:': 0x1E,
                       'urn:epc:tag:': 0x1F, 'urn:epc:pat:': 0x20, 'urn:epc:raw:': 0x21, 'urn:epc:': 0x22, 'urn:nfc:': 0x23};
        var identifier = this.helper.dict_contains_lower(identifier, identifiers);
        if (identifier) return identifier;
        return this.throwException('getUriIdentifier');
	}
	NDEF_URI_URLA(uri, url, pageOffset = 4, indexOffset = 0){
        var offset = (pageOffset*4)+indexOffset;
		url = url.trim();
        uri = this.getUriIdentifier(uri.trim());
		//console.log(url.length,url.length+5, this.getNfcMaxUrlLength(), '~'+url+'~');
		if (url.length+5 >= this.getNfcMaxUrlLength()) return this.throwException('NDEF_URI_URL-error length');
        var ndef = [0x03, url.length+5,   //NDEF message, 15 byte message
                0xD1,               //NDEF Record header: MB = 1b, ME = 1b, CF = 0b, SR = 1b, IL = 0b, TNF - 001b
                0x01, url.length+1,   //type length, payload length
                0x55,               //Type = URI
                uri];                //URI Indentifier = https:    
        ndef = this.helper.hexArrayToByteArray([...ndef]);
		//ndef = [...ndef, ...this.helper.string_to_bytes(url)];
        ndef = this.helper.byteArray_to_hexStr_Split_Array(ndef);
		ndef = [...ndef, ...this.helper.string_to_bytes(url)];
		ndef.push('FE');
		//console.log(ndef);
		//console.log(this.helper.string_to_bytes(url));
        ndef.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i+offset);
			this.updatePagesHex(v[0],v[1],this.helper.upper(x));
		});
	}
	NDEF_URI_URL(uri, url, pageOffset = 4, indexOffset = 0){
		//this.NDEF_URI_URLA(uri, url, pageOffset = 4, indexOffset = 0);
        if (url.length < 255) this.NDEF_URI_URL_SHORT(uri, url, pageOffset, indexOffset);
		else this.NDEF_URI_URL_LONG(uri, url, pageOffset, indexOffset);
	}
	NDEF_URI_URL_LONG(uri, url, pageOffset = 4, indexOffset = 0){
		var packetExtra = 8;
        var offset = (pageOffset*4)+indexOffset;
		url = url.trim();
        uri = this.getUriIdentifier(uri.trim());
		if (url.length+packetExtra >= this.getNfcMaxUrlLength()) return this.throwException('NDEF_URI_URL-error length');
        var ndef = [0x03,   //NDEF message, 15 byte message
					0xFF,                 //NDEF Record header: MB = 1b, ME = 1b, CF = 0b, SR = 1b, IL = 0b, TNF - 001b
					((url.length+packetExtra) >>> 8) & 0x0FF,
					(url.length+packetExtra) & 0x0FF,
					0xC1,
					0x01,0x00,0x00, ((url.length+1) >>> 8) & 0x0FF, (url.length+1) & 0x0FF,   //type length, payload length
					0x55,                 //Type = URI
					uri];                 //URI Indentifier = https:   
					
        ndef = this.helper.hexArrayToByteArray([...ndef]);
		//ndef = [...ndef, ...this.helper.string_to_bytes(url)];
        ndef = this.helper.byteArray_to_hexStr_Split_Array(ndef);
		ndef = [...ndef, ...this.helper.string_to_bytes(url)];
		ndef.push('FE');
        ndef.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i+offset);
			this.updatePagesHex(v[0],v[1],this.helper.upper(x));
		});
	}
	NDEF_URI_URL_SHORT(uri, url, pageOffset = 4, indexOffset = 0){
		var packetExtra = 5;
        var offset = (pageOffset*4)+indexOffset;
		url = url.trim();
        uri = this.getUriIdentifier(uri.trim());
		if (url.length+packetExtra >= this.getNfcMaxUrlLength()) return this.throwException('NDEF_URI_URL-error length');
        var ndef = [0x03, url.length+packetExtra,   //NDEF message, 15 byte message
					0xD1,               //NDEF Record header: MB = 1b, ME = 1b, CF = 0b, SR = 1b, IL = 0b, TNF - 001b
					0x01, url.length+1,   //type length, payload length
					0x55,               //Type = URI
					uri];                //URI Indentifier = https:    
        ndef = this.helper.hexArrayToByteArray([...ndef]);
        ndef = this.helper.byteArray_to_hexStr_Split_Array(ndef);
		ndef = [...ndef, ...this.helper.string_to_bytes(url)];
		ndef.push('FE');	
        ndef.forEach((x, i) => {
			var v = this.helper.intToPageAndIndex(i+offset);
			this.updatePagesHex(v[0],v[1],this.helper.upper(x));
		});
	}
	generate_TAG_URL(url){
		url = url.trim();
        var identifiers = ['http://www.', 'https://www.', 'http://', 'https://', 'tel:', 'mailto:', 'ftp://anonymous:anonymous@', 'ftp://ftp.', 'ftps://', 'sftp://', 'smb://', 'nfs://', 'ftp://', 'dav://', 'news:', 'telnet://', 'imap:', 'rtsp://', 'urn:', 'pop:', 'sip:', 'sips:', 'tftp:', 'btspp://', 'btl2cap://', 'btgoep://', 'tcpobex://', 'irdaobex://', 'file://', 'urn:epc:id:', 'urn:epc:tag:', 'urn:epc:pat:', 'urn:epc:raw:', 'urn:epc:', 'urn:nfc:'];
		var identifier = null;
		identifiers.forEach(x => {
			if(this.helper.lower(url).includes(this.helper.lower(x))){
				//console.log('idddd',this.helper.lower(url).slice(0,x.length));
				if(this.helper.lower(url).slice(0,x.length) == this.helper.lower(x)){
					identifier = x;
					url = url.slice(x.length);
				}
			}
		});
		if(identifier && url){
			// console.log(identifier);
			// console.log(url);
			this.generate();
			if (this.NDEF_URI_URL(identifier, url) === false) return this.throwException('generate_TAG_URL-error NDEF_URI_URL');
			var h = this.generateHeader();
			var p = this.generatePages();
			var ret = h+'\n'+p;
			//console.log(ret);
			return ret;
		}
		return this.throwException('generate_TAG_URL-error url or identifier');
	}
			
	printPages=()=>this.nfcPages.forEach((x, i) => {
		var ret = '';
		x.forEach((x,i) => ret+=this.helper.int_to_hexStr(x,2));
		console.log('page',i,ret);
	});
}

function testGeneralNfcHelper() {
	var a = new nfcHelper();
	var x = ['NTAG213', 'NTAG215', 'NTAG216'];
	console.log("randomHex", a.genRanHex(6));
	console.log("array_contains", a.array_contains("NTAG215", x));
	console.log("dict_contains",a.dict_contains("hi", { a: 1234, hi: 535, tt: 234 }));
}
function testGeneralNfc() {
	var a = new nfcNTAG('NTAG213');
	//a.throwException("manual exception");
	//console.log("validDeviceType", a.validDeviceType());
	//console.log("getNfcDeviceType", a.getNfcDeviceType());
	//console.log("getNfcPageCount", a.getNfcPageCount());
	//console.log("nfcPages", a.nfcPages);
	//console.log("getNfcSignature", a.getNfcSignature());
	//console.log("getNfcManufacturerId", a.getNfcManufacturerId('STMicroelectronics'));
	//console.log("getNfcStorageSize", a.getNfcStorageSize());
	//console.log("getNfcProductType", a.getNfcProductType());
	//console.log("getNfcProductSubType", a.getNfcProductSubType());
	//console.log("getMifareVersion", a.getMifareVersion());
	//console.log("setCapabilityContainer", a.setCapabilityContainer());
	//console.log("printPages", a.printPages());
	//console.log("getNfcUid", a.getNfcUid());
	//a.setPagesUidAndSerial();
	//a.setConfigPages();
	//a.setManualBytes();
	//a.generate();
	//a.NDEF_URI_URL('https://', 'youtube.com/watch?v=dQw4w9WgXcQ');
	//a.printPages();
	//console.log(a.generateHeader());
	//console.log(a.generatePages());
	//a.generate_TAG_URL('https://youtube.com/watch?v=dQw4w9WgXcQ');
}
//var a = testGeneralNfc();
//var b = testGeneralNfcHelper();








