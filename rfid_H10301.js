class rfidH10301{
	constructor() {
		this.cardSpanName = 'cardH10301';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">H10301</h5>
			  </div>

			  <div class="card-body">
				<form id="generateH10301">
				  <div class="mb-3">
					<label for="nameH10301" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameH10301">
					<div id="nameHelpH10301" class="form-text">Do not include ".rfid" It will be added automatically.</div>
				  </div>
				  <div class="mb-3">
					<label for="codeH10301" class="form-label">Code</label>
					<input type="text" class="form-control" id="codeH10301">
					<div id="codeHelpH10301" class="form-text">Value: 0 to 65535</div>
				  </div>
				  <div class="mb-3">
					<label for="facH10301" class="form-label">Facility Code</label>
					<input type="text" class="form-control" id="facH10301">
					<div id="facHelpH10301" class="form-text">Value: 0-255</div>
				  </div>
				  <button id="generateH10301" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetH10301" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>
		`;
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.formH10301 = document.getElementById("generateH10301");
		this.formH10301.addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			//var generateModal = new bootstrap.Modal(document.getElementById('generateModal'), {});
			clearGenerateModal();
			var nameH10301 = this.formH10301.elements["nameH10301"].value;
			nameH10301 = cleanString(nameH10301);
			if (nameH10301.length <= 0) {
				nameH10301 = "NoName";
			}
			var codeH10301 = this.formH10301.elements["codeH10301"].value;
			codeH10301 = cleanString(codeH10301);
			var codeIntH10301 = parseInt(codeH10301);
			var facH10301 = this.formH10301.elements["facH10301"].value;
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
				var hexH10301 = this.getH10301Hex(codeIntH10301, facIntH10301);
				var binH10301 = this.getH10301Bin(codeIntH10301, facIntH10301);
				//console.log(binH10301.slice(0, 12));
				//console.log(binH10301.slice(12, 24));
				var binFullH10301 =
					findParity("even", binH10301.slice(0, 12)) +
					binH10301 +
					findParity("odd", binH10301.slice(12, 24));
				setButtonGenerateModal(this.genUrlH10301(nameH10301, hexH10301));
				setTextGenerateModal("Name: " + nameH10301 + ".sub");
				appendTextGenerateModal("Code: " + codeH10301);
				appendTextGenerateModal("Facility: " + facH10301);
				appendTextGenerateModal("Hex: " + hexH10301);
				appendTextGenerateModal("Binary: " + binH10301);
				appendTextGenerateModal("Binary Full: " + binFullH10301);
			}
			generateModal.show();
		});
	}
	getH10301Bin(codeData, facData) {
		var hexData = this.getH10301Hex(codeData, facData);
		var binData = hexToBin(hexData);
		binData = pad(binData, 24);
		return binData;
	}
	getH10301Hex(codeData, facData) {
		var codeHex = intToHex(codeData);
		codeHex = pad(codeHex, 4);
		var facHex = intToHex(facData);
		facHex = pad(facHex, 2);
		var fullHex = facHex + codeHex;
		return fullHex;
	}
	genUrlH10301(keyName, hexData) {
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

