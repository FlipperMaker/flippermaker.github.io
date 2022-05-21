class subghzTouchTunes{
	constructor() {
		this.cardSpanName = 'cardTouchTunes';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">TouchTunes</h5>
			  </div>
			  <div class="card-body">
				<form id="generateTouchTunes">
				  <div class="mb-3">
					<label for="nameTouchTunes" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameTouchTunes">
					<div id="nameHelpTouchTunes" class="form-text">Do not include ".sub" It will be added automatically. A blank name will automatically be named.</div>
				  </div>
				  <div class="mb-3">
					<label for="pinTouchTunes" class="form-label">Pin</label>
					<input type="text" class="form-control" id="pinTouchTunes" placeholder="Ex: 123, brute, all">
					<div id="codeHelpTouchTunes" class="form-text">Value: 0 to 254 -or- "brute" or "all" to generate a file that will brute force all the pins for the selected button.</div>
				  </div>
				  <div class="mb-3">
					<label for="btnTouchTunes" class="form-label">Button Number</label>
					<select id="btnTouchTunes" class="form-select" aria-label="Default select">
					  <option value= "all" selected>ALL</option>
					</select>
					<div id="btnHelpTouchTunes" class="form-text">*Brute Force Coming Soon!</div>
				  </div>
				  <button id="generateTouchTunes" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetTouchTunes" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>		
		`;
		
		this.buttonsLong = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
							'A_Left_Arrow', 'B_Right_Arrow', 'F1_Restart', 'F2_Key',
							'F3_Mic_A_Mute', 'F4_Mic_B_Mute', 'Lock_Queue_Hash',
							'Mic_Vol_Minus_Down_Arrow', 'Mic_Vol_Plus_Up_Arrow',
							'Music_Karaoke_Star', 'Music_Vol_Zone_1Down',
							'Music_Vol_Zone_1Up', 'Music_Vol_Zone_2Down',
							'Music_Vol_Zone_2Up', 'Music_Vol_Zone_3Down',
							'Music_Vol_Zone_3Up', 'OK', 'On_Off',
							'P1', 'P2_Edit_Queue', 'P3_Skip', 'Pause'];
		this.commands = {'On_Off': ['78'],
						 'Pause': ['32', 'B3'],
						 'P1': ['70', 'F1'],
						 'P2_Edit_Queue': ['60'],
						 'P3_Skip': ['CA'],
						 'F1_Restart': ['20'],
						 'F2_Key': ['A0'],
						 'F3_Mic_A_Mute': ['30'],
						 'F4_Mic_B_Mute': ['B0'],
						 'Mic_Vol_Plus_Up_Arrow': ['F2'],
						 'Mic_Vol_Minus_Down_Arrow': ['80'],
						 'A_Left_Arrow': ['84'],
						 'B_Right_Arrow': ['C4'],
						 'OK': ['44', 'DD'],
						 'Music_Vol_Zone_1Up': ['D0', 'F4'],
						 'Music_Vol_Zone_1Down': ['50'],
						 'Music_Vol_Zone_2Up': ['90', 'F6'],
						 'Music_Vol_Zone_2Down': ['10'],
						 'Music_Vol_Zone_3Up': ['C0', 'FC'],
						 'Music_Vol_Zone_3Down': ['40'],
						 '1': ['F0'],
						 '2': ['08'],
						 '3': ['88'],
						 '4': ['48'],
						 '5': ['C8'],
						 '6': ['28'],
						 '7': ['A8'],
						 '8': ['68'],
						 '9': ['E8'],
						 '0': ['98'],
						 'Music_Karaoke_Star': ['18'],
						 'Lock_Queue_Hash': ['58']};
		this.commandsHex = {'On_Off': [0x78],
						 'Pause': [0x32, 0xB3],
						 'P1': [0x70, 0xF1],
						 'P2_Edit_Queue': [0x60],
						 'P3_Skip': [0xCA],
						 'F1_Restart': [0x20],
						 'F2_Key': [0xA0],
						 'F3_Mic_A_Mute': [0x30],
						 'F4_Mic_B_Mute': [0xB0],
						 'Mic_Vol_Plus_Up_Arrow': [0xF2],
						 'Mic_Vol_Minus_Down_Arrow': [0x80],
						 'A_Left_Arrow': [0x84],
						 'B_Right_Arrow': [0xC4],
						 'OK': [0x44, 0xDD],
						 'Music_Vol_Zone_1Up': [0xD0, 0xF4],
						 'Music_Vol_Zone_1Down': [0x50],
						 'Music_Vol_Zone_2Up': [0x90, 0xF6],
						 'Music_Vol_Zone_2Down': [0x10],
						 'Music_Vol_Zone_3Up': [0xC0, 0xFC],
						 'Music_Vol_Zone_3Down': [0x40],
						 '1': [0xF0],
						 '2': [0x08],
						 '3': [0x88],
						 '4': [0x48],
						 '5': [0xC8],
						 '6': [0x28],
						 '7': [0xA8],
						 '8': [0x68],
						 '9': [0xE8],
						 '0': [0x98],
						 'Music_Karaoke_Star': [0x18],
						 'Lock_Queue_Hash': [0x58]};
	}
	encodeCommand(pin, command) {
		var txframe = 0x5d;
		for (let bit = 0; bit < 8; bit++) {
			txframe <<= 1;
			if (pin & (1 << bit)) {
				txframe |= 1;
			}
		}
		txframe <<= 16;
		txframe |= command << 8;
		txframe |= command ^ 0xff;
		var ook = "";
		for (let i = 0; i < 32; i++) {
			if (txframe & 0x80000000) {
				ook += "1000";
				txframe <<= 1;
			} else {
				ook += "10";
				txframe <<= 1;
			}
		}
		ook = "1".repeat(16)+"0".repeat(8) + ook + "1000";
		var ookBin = ook;
		var ookA = BigInt("0b"+ook);
		var ookB = ookA.toString(16);
		ook = BigInt("0b"+ook).toString(16).slice(0,-1);
		if (ook.length % 2 == 1) {
			ook += "0";
		}
		return ookBin;
		//return ook;
	}
	getForm(){
		return document.getElementById("generateTouchTunes");
	}
	getFormFileName(getValue = false){
		return replaceSpace((getValue ? this.getForm().elements["nameTouchTunes"].value : this.getForm().elements["nameTouchTunes"]), "_");
	}
	getFormDevicePin(getValue = false){
		return cleanString(getValue ? this.getForm().elements["pinTouchTunes"].value : this.getForm().elements["pinTouchTunes"]);
	}
	getFormTargetButton(getValue = false){
		return (getValue ? this.getForm().elements["btnTouchTunes"].value : this.getForm().elements["btnTouchTunes"]);
	}
	
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.clearAllOptions();
		this.buttonsLong.forEach( i => {
			var opt = document.createElement('option');
			opt.value = i.toLowerCase();
			opt.innerHTML = i;
			this.getFormTargetButton().appendChild(opt);
		});
		
		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			//Name
			var nameTouchTunes = this.getFormFileName(true);
			nameTouchTunes = cleanString(nameTouchTunes);
			if (nameTouchTunes.length <= 0) {
				nameTouchTunes = "NoName";
			}
			//Pin
			var bruteForce = false;
			var pinTouchTunes = this.getFormDevicePin(true);
			if( pinTouchTunes.toString().length == 0 ) { pinTouchTunes = "0"; }
			if(pinTouchTunes.toString().trim().toLowerCase() == "brute" || pinTouchTunes.toString().trim().toLowerCase() == "all"){
				bruteForce = true;
				pinTouchTunes = "0";
			}
			
			var pinIntTouchTunes = parseInt(pinTouchTunes);
			var pinPaddedTouchTunes = pad(pinIntTouchTunes, 3);
			var btnTouchTunes = this.getFormTargetButton(true);
			
			//var btnIntTouchTunes = parseInt(btnTouchTunes);
			if ( pinIntTouchTunes > 254 || pinIntTouchTunes < 0 ) {
				//setTextGenerateModal("Input Value Error");
				pinIntTouchTunes = 0;
				pinTouchTunes = '0';
			} else {
				
				if(nameTouchTunes == "NoName"){
					nameTouchTunes = "TT"+(bruteForce ? "all" : pinPaddedTouchTunes )+"_"+btnTouchTunes;
				}
				var btnHexTouchTunes = 0;
				var ookTouchTunes = "";
				var signalTouchTunes = null;
				var downloadButton = "";
				if(bruteForce){
					btnHexTouchTunes = this.getButtonHex(btnTouchTunes);
					ookTouchTunes = this.getButtonOok(pinIntTouchTunes, btnHexTouchTunes);
					signalTouchTunes = this.getButtonSub(nameTouchTunes, ookTouchTunes);
					downloadButton = this.genDownloadButtonTouchTunes(nameTouchTunes, btnHexTouchTunes, bruteForce);
					
				}else{
					btnHexTouchTunes = this.getButtonHex(btnTouchTunes);
					ookTouchTunes = this.getButtonOok(pinIntTouchTunes, btnHexTouchTunes);
					signalTouchTunes = this.getButtonSub(nameTouchTunes, ookTouchTunes);
					downloadButton = this.genDownloadButtonTouchTunes(nameTouchTunes, signalTouchTunes, bruteForce);
				}
				setButtonGenerateModal(downloadButton);
				setTextGenerateModal("Name: " + nameTouchTunes + ".sub");
				appendTextGenerateModal("Pin: " + (bruteForce ? "Brute Force" : pinTouchTunes));
				appendTextGenerateModal("Button: " + btnTouchTunes + " (0x"+btnHexTouchTunes.toString(16).toUpperCase()+")");
				
				//appendTextGenerateModal("OOK: " + ookTouchTunes);
			}
			generateModal.show();
		});		
		
	}
	getBruteForceUrl(keyNameInput, btnHex){
		var ookPause = "";//000
		var rawDataLinesUrlParsed = "";
		var tempButtonSubObj = null;
		for(let i = 0; i < 255; i++){
			var tempButtonBin = this.getButtonOok(i, btnHex);
			tempButtonBin = tempButtonBin.slice(0,-1);
			tempButtonBin = tempButtonBin + ookPause;
			tempButtonSubObj = this.getButtonSub("temp", tempButtonBin);
			rawDataLinesUrlParsed = rawDataLinesUrlParsed + rawDataSubFormattedArray_to_Url(tempButtonSubObj.subghzRAW_Data_ArrayChunkedFormatted);
		}
		var ret = genUrlSub_Raw_StringRawData(keyNameInput, tempButtonSubObj.subghzFiletype, tempButtonSubObj.subghzVersion, 
								tempButtonSubObj.subghzFrequency, tempButtonSubObj.subghzPreset, tempButtonSubObj.subghzProtocol, rawDataLinesUrlParsed);
		return ret; 
	}
	getButtonHex(btn){
		var searchResults = dictionaryKeySearch(this.commandsHex, btn)
		return parseInt(((searchResults === null) ? 0 : searchResults ));
	}
	getButtonOok(pin, btnHex){
		var tempButtonBin = this.encodeCommand(pin, btnHex);
		return tempButtonBin;
	}
	getButtonSub(nameTouchTunes, ook){
		var ret = ookToSubRaw(nameTouchTunes, "Flipper SubGhz RAW File", 1, 433920000, "FuriHalSubGhzPresetOok650Async", "RAW", 566, 566, 1, 0, ook);
		return ret;
	}
	removeAllOptions(selectElement) {
		var i, L = selectElement.options.length - 1;
		for(i = L; i >= 0; i--) {
			selectElement.remove(i);
		}
	}
	clearAllOptions(){
		this.clearBtnTouchTunesOptions();
	}
	clearBtnTouchTunesOptions(){
		this.removeAllOptions(this.getFormTargetButton());
	}
	
	genUrlTouchTunes(keyNameInput, btnInput){
		//keyName, fileType, version, frequency, preset, protocol, rawDataFormatted_Array, prefix = "RAW_Data"
		var url = genUrlSub_Raw(keyNameInput, btnInput.subghzFiletype, btnInput.subghzVersion, 
								btnInput.subghzFrequency, btnInput.subghzPreset, btnInput.subghzProtocol, 
								btnInput.subghzRAW_Data_ArrayChunkedFormatted);
		return url;
	}
	/* genUrlTouchTunes(keyNameInput, btnInput){
		var subghzRAW_Data = btnInput.subghzRAW_Data.replace("+","%2B");
		subghzRAW_Data = subghzRAW_Data.replace("-","%2D");
		subghzRAW_Data = replaceSpace(subghzRAW_Data, "%20");
		keyNameInput = replaceSpace(keyNameInput, "%20");
		var subghzFiletype = replaceSpace(btnInput.subghzFiletype, "%20");
		var url = genUrlSub_Raw(keyNameInput, subghzFiletype, btnInput.subghzVersion, 
								btnInput.subghzFrequency, btnInput.subghzPreset, btnInput.subghzProtocol, 
								subghzRAW_Data);
		return url;
	} */
	genDownloadButtonTouchTunes(keyName, btn, bruteforce = false) {
		var shortName = keyName;
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		var flipperDownloadUrl = (bruteforce ? this.getBruteForceUrl(keyName, btn) : this.genUrlTouchTunes(keyName, btn));
		var returnUrl =
			'<a href="'+flipperDownloadUrl+'" class="btn btn-primary" target="_blank">Download ' + shortName + ".sub</a>";
		return returnUrl;
	}
}

