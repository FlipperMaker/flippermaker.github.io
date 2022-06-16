class subghztoolOokToSub{
	constructor() {
		this.cardSpanName = 'cardtoolOokToSub';
		this.cardTitle = 'Ook To Sub (Tool-SubGHz)';
		
		
		
		this.cardCollapseBodyClassCode = cardCollapseEnabled() ? "collapse" : "";
		this.cardCollapseBodyIdCode = this.cardSpanName+'Body';
		
		this.cardCollapseHeadCode = genCardHeadCode(this.cardTitle, this.cardSpanName);
		this.cardCode = `
			<div class="card mb-3">
			  ${this.cardCollapseHeadCode}
			  <div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">
				<form id="generateOokToSub">
				  <div class="mb-3">
					<label for="nameOokToSub" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameOokToSub">
					<div id="nameHelpOokToSub" class="form-text">Do not include ".sub" It will be added automatically.</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="binHexOokToSub" class="form-label">Binary/HEX OOK</label>
					<input type="text" class="form-control" id="binHexOokToSub" placeholder="Ex: 101110 10 10001 or a844 ff 23 d e">
					<div id="binHexHelpOokToSub" class="form-text">Binary/HEX OOK</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="fileTypeOokToSub" class="form-label">File Type</label>
					<select id="fileTypeOokToSub" class="form-select" aria-label="Default select">
					  <option value="Flipper SubGhz Key File" selected>Flipper SubGhz Key File</option>
					</select>
					<div id="fileTypeHelpOokToSub" class="form-text"></div>
				  </div>
				  
				  <div class="mb-3">
					<label for="versionOokToSub" class="form-label">Version</label>
					<input type="text" class="form-control" id="versionOokToSub" placeholder="" value="1">
					<div id="versionHelpOokToSub" class="form-text"></div>
				  </div>
				  
				  <div class="mb-3">
					<label for="frequencyOokToSub" class="form-label">Frequency</label>
					<input type="text" class="form-control" id="frequencyOokToSub" placeholder="Ex: 433.92 or 433920000">
					<div id="frequencyHelpOokToSub" class="form-text">Values less than 1000 will be multiplied by 1,000,000</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="presetOokToSub" class="form-label">Preset</label>
					<select id="presetOokToSub" class="form-select" aria-label="Default select">
					  <option value="FuriHalSubGhzPresetOok270Async" selected>FuriHalSubGhzPresetOok270Async</option>
					  <option value="FuriHalSubGhzPresetOok650Async">FuriHalSubGhzPresetOok650Async</option>
					  <option value="FuriHalSubGhzPreset2FSKDev238Async">FuriHalSubGhzPreset2FSKDev238Async</option>
					  <option value="FuriHalSubGhzPreset2FSKDev476Async">FuriHalSubGhzPreset2FSKDev476Async</option>
					</select>
					<div id="presetHelpOokToSub" class="form-text"></div>
				  </div>
				  
				  <div class="mb-3">
					<label for="protocolOokToSub" class="form-label">Protocol</label>
					<input type="text" class="form-control" id="protocolOokToSub" placeholder="" value="RAW">
					<div id="protocolHelpOokToSub" class="form-text">This generates RAW files, so its best to leave this as RAW</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="oneLengthOokToSub" class="form-label">1 Length</label>
					<input type="text" class="form-control" id="oneLengthOokToSub" placeholder="Ex: 1000" value="">
					<div id="oneLengthHelpOokToSub" class="form-text">in Microseconds</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="zeroLengthOokToSub" class="form-label">0 Length</label>
					<input type="text" class="form-control" id="zeroLengthOokToSub" placeholder="Ex: 1000" value="">
					<div id="zeroLengthHelpOokToSub" class="form-text">in Microseconds</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="repeatsOokToSub" class="form-label">Repeats</label>
					<input type="text" class="form-control" id="repeatsOokToSub" placeholder="Ex: 1" value="1">
					<div id="repeatsHelpOokToSub" class="form-text">Number of times to transmit the signal</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="pauseOokToSub" class="form-label">Pause</label>
					<input type="text" class="form-control" id="pauseOokToSub" placeholder="Ex: 1000" value="">
					<div id="pauseHelpOokToSub" class="form-text">Time to pause after a single TX in microseconds</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="transposeOneOokToSub" class="form-label">Transpose 1 to</label>
					<input type="text" class="form-control" id="transposeOneOokToSub" placeholder="Ex: 1000" value="1">
					<div id="transposeOneHelpOokToSub" class="form-text">Transpose the OOK value</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="transposeZeroOokToSub" class="form-label">Transpose 0 to</label>
					<input type="text" class="form-control" id="transposeZeroOokToSub" placeholder="Ex: 001000" value="0">
					<div id="transposeZeroHelpOokToSub" class="form-text">Transpose the OOK value</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="transposeStartOokToSub" class="form-label">Transpose from index</label>
					<input type="text" class="form-control" id="transposeStartOokToSub" placeholder="Ex: 23" value="0">
					<div id="transposeStartHelpOokToSub" class="form-text">Starting index of the binary OOK to begin transposing. 0 = Beginning</div>
				  </div>
				  
				  <div class="mb-3">
					<label for="transposeEndOokToSub" class="form-label">Transpose to index</label>
					<input type="text" class="form-control" id="transposeEndOokToSub" placeholder="Ex: 29" value="0">
					<div id="transposeEndHelpOokToSub" class="form-text">Ending index of the binary OOK to stop transposing. 0 = Entire OOK if start is 0 too</div>
				  </div>
				  
				  
				  
				  <button id="generateSubmitOokToSub" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetOokToSub" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>		
		`;
		
	}
	verifyInt(inputInt, validStartInclusive, validEndInclusive, valueBad = 0){
		inputInt = parseInt(inputInt.toString().trim());
		return ((inputInt >= validStartInclusive && inputInt <= validEndInclusive) ? inputInt : valueBad );
	}
	verifyFloat(inputFloat, validStartInclusive, validEndInclusive, valueBad = 0.0){
		inputFloat = parseFloat(inputFloat.toString().trim());
		return ((inputFloat >= validStartInclusive && inputFloat <= validEndInclusive) ? inputFloat : valueBad );
	}
	
	getForm(){
		return document.getElementById("generateOokToSub");
	}
	getFormFileName(getValue = false){
		return (getValue ? replaceSpace(this.getForm().elements["nameOokToSub"].value.toString().trim(), "_") : this.getForm().elements["nameOokToSub"]);
	}
	getFormBinHexOok(getValue = false){
		if(getValue){
			var raw = this.getForm().elements["binHexOokToSub"].value.toString().trim();
			raw = cleanString(raw).toString();
			var isHex = allHex(raw);
			var isBin = allBinary(raw);
			var isNumber = allNumeric(raw);
			var cleanValue = 0;
			if (isBin){
				cleanValue = BigInt("0b"+raw);
				//console.log("base2~"+cleanValue.toString());
			} else if (isHex){
				cleanValue = BigInt("0x"+raw);
				//console.log("base16~"+cleanValue.toString());
			} else if (isNumber){ //should never reach this because all ints are also hex
				cleanValue = parseInt(raw, 10);
				//console.log("base10~"+cleanValue.toString());
			}
			return cleanValue.toString(10);
		}else{
			return this.getForm().elements["binHexOokToSub"];
		}
	}
	getFormVersion(getValue = false){
		return (getValue ? this.verifyInt(this.getForm().elements["versionOokToSub"].value, 0, 100, 1) : this.getForm().elements["versionOokToSub"]);
	}
	getFormFrequency(getValue = false){
		if(getValue){
			var temp = this.verifyFloat(this.getForm().elements["frequencyOokToSub"].value, 0, 1000000000, 300);
			if (temp < 1000){
				temp = temp * 1000000
			}
			return this.verifyInt(temp, 200000000, 999000000, 300000000);
		}else{
			return this.getForm().elements["frequencyOokToSub"];
		}
		return (getValue ? this.getForm().elements["frequencyOokToSub"].value : this.getForm().elements["frequencyOokToSub"]);
	}
	getFormPreset(getValue = false){
		return (getValue ? this.getForm().elements["presetOokToSub"].value : this.getForm().elements["presetOokToSub"]);
	}
	getFormFileType(getValue = false){
		return (getValue ? this.getForm().elements["fileTypeOokToSub"].value : this.getForm().elements["fileTypeOokToSub"]);
	}
	getFormProtocol(getValue = false){
		return (getValue ? this.getForm().elements["protocolOokToSub"].value.toString().trim() : this.getForm().elements["protocolOokToSub"]);
	}
	getFormOneLength(getValue = false){
		return (getValue ? this.verifyInt(this.getForm().elements["oneLengthOokToSub"].value, 1, 10000000, 1000) : this.getForm().elements["oneLengthOokToSub"]);
	}
	getFormTransposeOne(getValue = false){
		if(getValue){
			var temp = this.getForm().elements["transposeOneOokToSub"].value.toString().trim();
			temp = ((temp.length > 0) ? temp : "1" );
			temp = ((allBinary(temp)) ? temp : "1" );
			return temp;
		}else{
			return this.getForm().elements["transposeOneOokToSub"];
		}
	}
	getFormTransposeZero(getValue = false){
		if(getValue){
			var temp = this.getForm().elements["transposeZeroOokToSub"].value.toString().trim();
			temp = ((temp.length > 0) ? temp : "0" );
			temp = ((allBinary(temp)) ? temp : "0" );
			return temp;
		}else{
			return this.getForm().elements["transposeZeroOokToSub"];
		}
	}
	getFormTransposeStart(getValue = false){
		if(getValue){
			var temp = this.getForm().elements["transposeStartOokToSub"].value.toString().trim();
			temp = ((temp.length > 0) ? temp : "0" );
			temp = this.verifyInt(temp, 0, 9999999999, 0);
			return temp;
		}else{
			return this.getForm().elements["transposeStartOokToSub"];
		}
	}
	getFormTransposeEnd(getValue = false){
		if(getValue){
			var temp = this.getForm().elements["transposeEndOokToSub"].value.toString().trim();
			temp = ((temp.length > 0) ? temp : "0" );
			temp = this.verifyInt(temp, 0, 9999999999, 0);
			return temp;
		}else{
			return this.getForm().elements["transposeEndOokToSub"];
		}
	}
	getFormZeroLength(getValue = false){
		return (getValue ? this.verifyInt(this.getForm().elements["zeroLengthOokToSub"].value, 1, 10000000, 1000) : this.getForm().elements["zeroLengthOokToSub"]);
	}
	getFormRepeats(getValue = false){
		return (getValue ? this.verifyInt(this.getForm().elements["repeatsOokToSub"].value, 1, 20, 1) : this.getForm().elements["repeatsOokToSub"]);
	}
	getFormPause(getValue = false){
		return (getValue ? this.verifyInt(this.getForm().elements["pauseOokToSub"].value, 1, 10000000, 1000) : this.getForm().elements["pauseOokToSub"]);
	}
	getFormBinHexOok_Bin(){
		return BigInt(this.getFormBinHexOok(true)).toString(2);
	}
	getFormBinHexOok_Hex(){
		return BigInt(this.getFormBinHexOok(true)).toString(16);
	}
	getFormBinHexOok_Int(){
		return BigInt(this.getFormBinHexOok(true)).toString(10);
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		showHideCard(this.cardSpanName+'BodyCollapse', '#'+this.cardSpanName+'Body');
			
		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			
			var formFileName = this.getFormFileName();
			var formFileNameValue = this.getFormFileName(true);
			if (formFileNameValue.length <= 0) { formFileNameValue = "NoName"; }
			var formBinHexOok = this.getFormBinHexOok();
			var formBinHexOokValue = this.getFormBinHexOok(true);
			var formBinHexOokValue_Hex = this.getFormBinHexOok_Hex(true);
			var formBinHexOokValue_Bin = this.getFormBinHexOok_Bin(true);
			var formVersion = this.getFormVersion();
			var formVersionValue = this.getFormVersion(true);
			var formFrequency = this.getFormFrequency();
			var formFrequencyValue = this.getFormFrequency(true);
			var formPreset = this.getFormPreset();
			var formPresetValue = this.getFormPreset(true);
			var formProtocol = this.getFormProtocol();
			var formProtocolValue = this.getFormProtocol(true);
			var formOneLength = this.getFormOneLength();
			var formOneLengthValue = this.getFormOneLength(true);
			var formZeroLength = this.getFormZeroLength();
			var formZeroLengthValue = this.getFormZeroLength(true);
			var formRepeats = this.getFormRepeats();
			var formRepeatsValue = this.getFormRepeats(true);
			var formPause = this.getFormPause();
			var formPauseValue = this.getFormPause(true);
			var formFileType = this.getFormFileType();
			var formFileTypeValue = this.getFormFileType(true);
			var formTransposeOne = this.getFormTransposeOne();
			var formTransposeOneValue = this.getFormTransposeOne(true);
			var formTransposeZero = this.getFormTransposeZero();
			var formTransposeZeroValue = this.getFormTransposeZero(true);
			var formTransposeStart = this.getFormTransposeStart();
			var formTransposeStartValue = this.getFormTransposeStart(true);
			var formTransposeEnd = this.getFormTransposeEnd();
			var formTransposeEndValue = this.getFormTransposeEnd(true);
			console.log("Render-formTransposeStartValue-"+formTransposeStartValue.toString());
			console.log("Render-formTransposeEndValue-"+formTransposeEndValue.toString());
			
			
			if (formTransposeStartValue >= formTransposeEndValue){
				console.log("Error renderCard Check");
				formTransposeStartValue == 0;
				formTransposeEndValue == 0;
			}
			
			formBinHexOokValue_Bin = this.transposeBinary(formBinHexOokValue_Bin, formTransposeOneValue, formTransposeZeroValue, formTransposeStartValue, formTransposeEndValue);
			console.log(formBinHexOokValue_Bin);
			
			var strTruncate = 30;
			var formBinHexOokValue_Bin_Short = formBinHexOokValue_Bin.toString();
			formBinHexOokValue_Bin_Short = ((formBinHexOokValue_Bin_Short.length > strTruncate) ? formBinHexOokValue_Bin_Short.slice(0, strTruncate) + "..." : formBinHexOokValue_Bin_Short );
			var formBinHexOokValue_Hex_Short = formBinHexOokValue_Hex.toString();
			formBinHexOokValue_Hex_Short = ((formBinHexOokValue_Hex_Short.length > strTruncate) ? formBinHexOokValue_Hex_Short.slice(0, strTruncate) + "..." : formBinHexOokValue_Hex_Short );
			
			var out_subghzDeviceSignalRawMulti = ookToSubRaw(formFileNameValue, formFileTypeValue, formVersionValue, formFrequencyValue, formPresetValue, formProtocolValue, formOneLengthValue, formZeroLengthValue, formRepeatsValue, formPauseValue, formBinHexOokValue_Bin);
			
			var out_downloadButton = this.genDownloadButtonOokToSub(formFileNameValue, out_subghzDeviceSignalRawMulti);
			
			setButtonGenerateModal(out_downloadButton);
			setTextGenerateModal("Name: " + formFileNameValue + ".sub");
			appendTextGenerateModal("Transpose: 1->" + formTransposeOneValue);
			appendTextGenerateModal("Transpose: 0->" + formTransposeZeroValue);
			appendTextGenerateModal("OOK (Int): " + formBinHexOokValue);
			appendTextGenerateModal("OOK (Bin): " + formBinHexOokValue_Bin_Short);
			appendTextGenerateModal("OOK (Hex): " + formBinHexOokValue_Hex_Short);
			generateModal.show();
		
		});		
		
	}
	transposeBinary(inputBinary, oneValue, zeroValue, fromValue = 0, toValue = 0){
		console.log("transposeBinary-from-"+fromValue);
		console.log("transposeBinary-to-"+toValue);
		inputBinary = inputBinary.toString().trim();
		oneValue = oneValue.toString().trim();
		zeroValue = zeroValue.toString().trim();
		fromValue = parseInt(fromValue);
		toValue = parseInt(toValue);
		if(fromValue == toValue && toValue == 0){
			inputBinary = inputBinary.replaceAll("0", "x");
			inputBinary = inputBinary.replaceAll("1", oneValue);
			inputBinary = inputBinary.replaceAll("x", zeroValue);
			console.log('Slice0: '+inputBinary)
			return inputBinary;
		}else{
			toValue = ((toValue < inputBinary.length) ? toValue : inputBinary.length );
			if(fromValue < 0 || fromValue >= toValue){ console.log("Error transposeBinary Check"); return this.transposeBinary(inputBinary, oneValue, zeroValue); }
			var binaryLeft = "";
			var binaryMiddle = "";
			var binaryRight = "";
			if(fromValue == 0){
				binaryLeft = inputBinary.slice(fromValue, toValue);
				binaryLeft = binaryLeft.replaceAll("0", "x");
				binaryLeft = binaryLeft.replaceAll("1", oneValue);
				binaryLeft = binaryLeft.replaceAll("x", zeroValue);															
				if(toValue < inputBinary.length){
					binaryRight = inputBinary.slice(toValue, inputBinary.length);
				}
				var newBinary = binaryLeft+binaryMiddle+binaryRight;
				console.log('Slice1: '+newBinary);
				console.log('Slice1s: '+binaryLeft+" "+binaryMiddle+" "+binaryRight);
				return newBinary;
			}else{
				binaryLeft = inputBinary.slice(0, fromValue);
				binaryMiddle = inputBinary.slice(fromValue, toValue);
				binaryMiddle = binaryMiddle.replaceAll("0", "x");
				binaryMiddle = binaryMiddle.replaceAll("1", oneValue);
				binaryMiddle = binaryMiddle.replaceAll("x", zeroValue);
				if(toValue < inputBinary.length){
					binaryRight = inputBinary.slice(toValue, inputBinary.length);
				}
				var newBinary = binaryLeft+binaryMiddle+binaryRight;
				console.log('Slice2: '+newBinary);
				console.log('Slice2s: '+binaryLeft+" "+binaryMiddle+" "+binaryRight);
				return newBinary;
			}
		}
		
	}
	genUrlOokToSub(keyNameInput, btnInput){
		var url = genUrlSub_Raw(keyNameInput, btnInput.subghzFiletype, btnInput.subghzVersion, 
								btnInput.subghzFrequency, btnInput.subghzPreset, btnInput.subghzProtocol, 
								btnInput.subghzRAW_Data_ArrayChunkedFormatted);
		return url;
	}
	genDownloadButtonOokToSub(keyName, btn) {
		var shortName = keyName;
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		var flipperDownloadUrl = this.genUrlOokToSub(keyName, btn);
		var returnUrl =
			'<a href="'+flipperDownloadUrl+'" class="btn btn-primary" target="_blank">Download ' + shortName + ".sub</a>";
		return returnUrl;
	}

	

}

