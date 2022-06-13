class nfctoolCreate{
	constructor() {
		this.cardSpanName = 'cardtoolNfcCreate';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">NFC Creator (Tool-NFC)</h5>
			  </div>
			  <div class="card-body">
				<form id="generateNfcToolCreate">
				  <div class="mb-3">
					<label for="nameFormNfcToolCreate" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameFormNfcToolCreate">
					<div id="nameHelpNfcToolCreate" class="form-text">Do not include the file extension. It will be added automatically. A blank name will automatically be named "NoName".</div>
				  </div>
				  <div class="mb-3">
					<label for="tagtypeFormToolShare" class="form-label">Tag Type</label>
					<select id="tagtypeFormToolShare" class="form-select" aria-label="Default select">
					  <option value="NTAG213" selected>NTAG213</option>
					  <option value="NTAG215">NTAG215</option>
					  <option value="NTAG216">NTAG216</option>
					</select>
					<div id="tagtypeHelpToolShare" class="form-text"></div>
				  </div>
				  
				  <div class="mb-3">
					<label for="urlFormNfcToolCreate" class="form-label">URL</label>
					<input type="text" class="form-control" id="urlFormNfcToolCreate" placeholder="https://youtu.be/...">
					<div id="urlHelpNfcToolCreate" class="form-text">URI scheme required. (ex: "https://", "tel://", ...)<br />Max Lengths: NTAG213=126, NTAG215=483, NTAG216=845</div>
				  </div>
				  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button id="exampleNfcToolCreate" type="button" class="btn btn-secondary btn-sm">Example Url</button>
				  </div>
				  <br />
				  <button id="submitNfcToolCreate" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetNfcToolCreate" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>		
		`;
		
		
	}
	
	
	getForm(){ return document.getElementById("generateNfcToolCreate"); }
	//File Name
	getFormFileName(getValue = false){ return (getValue ? this.getForm().elements["nameFormNfcToolCreate"].value : this.getForm().elements["nameFormNfcToolCreate"]); }
	getFormFileNameClean(){ return replaceSpace(this.getFormFileName(true), "_"); }
	getFormFileName_Valid = () => true;
	
	//Url Direct Text Field
	getFormUrlText(getValue = false){ return (getValue ? this.getForm().elements["urlFormNfcToolCreate"].value : this.getForm().elements["urlFormNfcToolCreate"]); }
	getFormUrlTextClean(){ return this.getFormUrlText(true); }
	getFormUrlText_Valid = () => this.getFormUrlTextClean().length > 1;
	
	//Url Direct Text Example Button
	buttonFormExample(getValue = false){ return this.getForm().elements["exampleNfcToolCreate"]; }
	
	//Tag Type Select Field
	getFormTagTypeSelect(getValue = false){ return (getValue ? this.getForm().elements["tagtypeFormToolShare"].value : this.getForm().elements["tagtypeFormToolShare"]); }
	getFormTagTypeSelectClean(){ return this.getFormTagTypeSelect(true).trim(); }
	getFormTagTypeSelect_Valid = () => true;

	validForm = () => {getFormFileName_Valid && getFormUrlText_Valid && getFormTagTypeSelect_Valid};
	
	
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.buttonFormExample().addEventListener("click", (event) => {
			event.preventDefault();
			this.getForm().elements["urlFormNfcToolCreate"].value = "https://youtu.be/dQw4w9WgXcQ";
		});
		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			if(this.getFormFileNameClean().trim() == ""){ this.getForm().elements["nameFormNfcToolCreate"].value = "NoName"; }
			setTextGenerateModal("Name: " + this.getFormFileNameClean() + ".nfc");
			appendTextGenerateModal("URL: " + (this.getFormUrlTextClean().length > 50 ?this.getFormUrlTextClean().slice(0,50):this.getFormUrlTextClean()));
			var downloadButton = this.genDownloadButton();
			setButtonGenerateModal(downloadButton);
			if(downloadButton === false){
				clearGenerateModal();
				setTextGenerateModal("Error generating. Check URL.");
			}
			generateModal.show(); 
		});
	}
	genDownloadButton() {
		var shortName = this.getFormFileNameClean();
		var nfc_general = new nfcGeneral(this.getFormTagTypeSelectClean());
		var url = nfc_general.generate_tag_url(this.getFormFileNameClean(), this.getFormUrlTextClean());
		if(url && nfc_general.checkErrorFlagOK()){
			if (shortName.length > 10) { shortName = shortName.slice(0, 10) + ".."; }
			var returnUrl = '<a href="'+url+'" class="btn btn-primary" target="_blank">Download ' + shortName + ".nfc"+"</a>";
			return returnUrl;
		}
		return false;
	}
}

