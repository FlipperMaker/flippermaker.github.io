class subghzMegaCode{
	constructor() {
		this.cardSpanName = 'cardMegaCode';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">MegaCode (SubGHz)</h5>
			  </div>
			  <div class="card-body">
				<form id="generateMegaCode">
				  <div class="mb-3">
					<label for="nameMegaCode" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameMegaCode">
					<div id="nameHelpMegaCode" class="form-text">Do not include ".sub" It will be added automatically.</div>
				  </div>
				  <div class="mb-3">
					<label for="codeMegaCode" class="form-label">Code</label>
					<input type="text" class="form-control" id="codeMegaCode">
					<div id="codeHelpMegaCode" class="form-text">Value: 0 to 65535</div>
				  </div>
				  <div class="mb-3">
					<label for="facMegaCode" class="form-label">Facility Code</label>
					<input type="text" class="form-control" id="facMegaCode">
					<div id="facHelpMegaCode" class="form-text">Value: 0-15</div>
				  </div>
				  <div class="mb-3">
					<label for="btnMegaCode" class="form-label">Button Number</label>
					<input type="text" class="form-control" id="btnMegaCode">
					<div id="btnHelpMegaCode" class="form-text">Value: 0-7</div>
				  </div>
				  <button id="generateMegaCode" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetMegaCode" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>		
		`;
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.formMegaCode = document.getElementById("generateMegaCode");
		this.formMegaCode.addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			//var generateModal = new bootstrap.Modal(document.getElementById('generateModal'), {});
			clearGenerateModal();
			var nameMegaCode = this.formMegaCode.elements["nameMegaCode"].value;
			nameMegaCode = cleanString(nameMegaCode);
			if (nameMegaCode.length <= 0) {
				nameMegaCode = "NoName";
			}
			var codeMegaCode = this.formMegaCode.elements["codeMegaCode"].value;
			var codeIntMegaCode = parseInt(codeMegaCode);
			var facMegaCode = this.formMegaCode.elements["facMegaCode"].value;
			var facIntMegaCode = parseInt(facMegaCode);
			var btnMegaCode = this.formMegaCode.elements["btnMegaCode"].value;
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
				var hexMegaCode = this.getMegaCodeHex(
					codeIntMegaCode,
					facIntMegaCode,
					btnIntMegaCode
				);
				setButtonGenerateModal(this.genUrlMegaCode(nameMegaCode, hexMegaCode));
				setTextGenerateModal("Name: " + nameMegaCode + ".sub");
				appendTextGenerateModal("Code: " + codeMegaCode);
				appendTextGenerateModal("Facility: " + facMegaCode);
				appendTextGenerateModal("Button: " + btnMegaCode);
				appendTextGenerateModal("Hex: " + hexMegaCode);
			}
			generateModal.show();
		});		
		
	}
	getMegaCodeBin(codeData, facData, btnData) {
		codeData = cleanString(codeData);
		facData = cleanString(facData);
		btnData = cleanString(btnData);
		var codeBin = intToBin(codeData);
		var facBin = intToBin(facData);
		var btnBin = intToBin(btnData);
		codeBin = pad(codeBin, 16);
		facBin = pad(facBin, 4);
		btnBin = pad(btnBin, 3);
		var binData = "1" + facBin + codeBin + btnBin;
		return binData;
	}
	getMegaCodeHex(codeData, facData, btnData) {
		var binData = this.getMegaCodeBin(codeData, facData, btnData);
		var hexData = binToHex(binData);
		return hexData;
	}
	genUrlMegaCode(keyName, hexData) {
		var shortName = keyName;
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		var kd1 = hexData.slice(0, 2);
		var kd2 = hexData.slice(2, 4);
		var kd3 = hexData.slice(4, 6);
		var returnUrl =
			'<a href="'+getDownloadWebsitePrefix()+'#path=subghz/' +
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

