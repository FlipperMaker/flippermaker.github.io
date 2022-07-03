class subghzFirefly{
	constructor() {
		this.cardSpanName = 'cardFirefly';
		this.cardTitle = 'Firefly/Linear (SubGHz)';
		
		
		
		this.cardCollapseBodyClassCode = cardCollapseEnabled() ? "collapse" : "";
		this.cardCollapseBodyIdCode = this.cardSpanName+'Body';
		
		this.cardCollapseHeadCode = genCardHeadCode(this.cardTitle, this.cardSpanName);
		this.cardCode = `
		<div class="card mb-3">
		  ${this.cardCollapseHeadCode}

		  <div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">
			<!--<h5 class="card-title">Firefly</h5>-->
			<form id="generateFirefly">
			  <div class="mb-3">
				<label for="nameFirefly" class="form-label">File Name</label>
				<input type="text" class="form-control" id="nameFirefly">
				<div id="nameHelpFirefly" class="form-text">Do not include ".sub" It will be added automatically.</div>
			  </div>
			  <div class="mb-3">
				<label for="codeFirefly" class="form-label">Dip Switches</label>
				<input type="text" class="form-control" id="codeFirefly">
				<div id="codeHelpFirefly" class="form-text">Example: 0111100100</div>
			  </div>
			  <button id="generateFirefly" type="submit" class="btn btn-primary">Generate</button>
			  <button id="resetFirefly" type="reset" class="btn btn-primary">Reset</button>

			</form>
		  </div>
		</div>
		`;
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		showHideCard(this.cardSpanName+'BodyCollapse', '#'+this.cardSpanName+'Body');
		this.formFirefly = document.getElementById("generateFirefly");
		
		
		this.formFirefly.addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			var nameFirefly = this.formFirefly.elements["nameFirefly"].value;
			nameFirefly = cleanString(nameFirefly);
			if (nameFirefly.length <= 0) {
				nameFirefly = "NoName";
			}
			var codeFirefly = this.formFirefly.elements["codeFirefly"].value;
			codeFirefly = cleanString(codeFirefly);
			var codeIntFirefly = pad(parseInt(codeFirefly), 10);
			if (
				codeIntFirefly.length != 10 ||
				!allBinary(codeFirefly) ||
				!allAlphaNumericUnderscore(nameFirefly)
			) {
				setTextGenerateModal("Name Or Value Error");
			} else {
				var hexFirefly = this.getFireflyHex(codeIntFirefly);
				setButtonGenerateModal(this.genUrlFirefly(nameFirefly, hexFirefly));
				setTextGenerateModal("Name: " + nameFirefly + ".sub");
				appendTextGenerateModal("Hex: " + hexFirefly);
				appendTextGenerateModal("Binary: " + codeIntFirefly);
			}
			generateModal.show();
		});
	}
	getFireflyHex(codeData) {
		var codeHex = binToHex(codeData);
		codeHex = pad(codeHex, 10);
		return codeHex;
	}
	genUrlFirefly(keyName, hexData) {
		var shortName = keyName;
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		hexData = pad(hexData, 16);
		var urlFirefly = genUrlSub(
			keyName,
			"Flipper SubGhz Key File",
			"1",
			"300000000",
			"FuriHalSubGhzPresetOok650Async",
			"Firefly",
			"10",
			hexData
		);
		var returnUrl =
			'<a href="' +
			urlFirefly +
			'" class="btn btn-primary" target="_blank">Download ' +
			shortName +
			".sub</a>";
		return returnUrl;
	}
	
}




/*  function getFireflyBin(codeData, facData) {
var hexData = getFireflyHex(codeData, facData);
var binData = hexToBin(hexData);
binData = pad(binData, 24);
return binData;
}*/


