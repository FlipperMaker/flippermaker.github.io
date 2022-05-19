class irGeneric{
	constructor() {
		this.cardSpanName = 'cardIrDevice';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">IR Device</h5>
			  </div>

			  <div class="card-body">
				<form id="generateIrDevice">
				  <div class="mb-3">
					<label for="nameIrDevice" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameIrDevice">
					<div id="nameHelpIrDevice" class="form-text">Do not include ".ir" It will be added automatically. A blank name will automatically be named.</div>
				  </div>
				  <div class="mb-3">
					<label for="typeDeviceIrDevice" class="form-label">Type of Device</label>
					<select id="typeDeviceIrDevice" class="form-select" aria-label="Default select">
					  <option value= "none" selected>Select Device Type</option>
					</select>
					<div id="typeDeviceHelpIrDevice" class="form-text">Select Type of Device</div>
				  </div>
				  <div class="mb-3">
					<label for="modelDeviceIrDevice" class="form-label">Model of Device</label>
					<select id="modelDeviceIrDevice" class="form-select" aria-label="Default select">
					  <option value= "none" selected>Select Device Model</option>
					</select>
					<div id="modelDeviceHelpIrDevice" class="form-text">Select Model</div>
				  </div>
				  <div class="mb-3">
					<label for="targetBtnIrDevice" class="form-label">Button</label>
					<select id="targetBtnIrDevice" class="form-select" aria-label="Default select">
					  <option value= "all" selected>All</option>
					</select>
					<div id="targetBtnHelpIrDevice" class="form-text">Select Button</div>
				  </div>
				  <button id="generateIrDevice" type="submit" class="btn btn-primary">Generate</button>
				  <!--<button id="resetIrDevice" type="reset" class="btn btn-primary">Reset</button>-->

				</form>
			  </div>
			</div>
		`;
		this.irAll = {};
		this.irDeviceTypes = ["TV", "AC", "AudioReceivers", "Bluray", "CCTV", "Cameras", "Consoles", "Converters", "Headunits", "Ledlighting", "Miscellaneous", "Projectors", "Soundbars", "StreamingDevices"];
		this.irTv = {};
		this.irAc = {};
		this.irAudioreceivers = {};
		this.irBluray = {};
		this.irCctv = {};
		this.irCameras = {};
		this.irConsoles = {};
		this.irConverters = {};
		this.irHeadunits = {};
		this.irLedlighting = {};
		this.irMiscellaneous = {};
		this.irProjectors = {};
		this.irSoundbars = {};
		this.irStreamingdevices = {};
		this.createIrDevicesDb();
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.clearAllOptions();
		this.formTypeDeviceIrDevice = this.getFormTypeDevice();
		this.formModelDeviceIrDevice = this.getFormModelDevice();
		this.formTargetBtnIrDevice = this.getFormTargetButton();
		this.formIrDevice = this.getForm();
		
		
		this.irDeviceTypes.forEach( i => {
			var opt = document.createElement('option');
			opt.value = i.toLowerCase();
			opt.innerHTML = i;
			this.formTypeDeviceIrDevice.appendChild(opt);
		});
		
		
		
		
		this.formTypeDeviceIrDevice.addEventListener("change", (event) => {
			event.preventDefault();
			this.clearModelDeviceIrDeviceOptions();
			this.clearTargetBtnIrDeviceOptions();
			for (let k in this.getIrModelsByType(this.formTypeDeviceIrDevice.value)) {
			
				var opt = document.createElement('option');
				opt.value = k.toLowerCase();
				opt.innerHTML = k;
				this.formModelDeviceIrDevice.appendChild(opt);
			}
			this.formModelDeviceIrDevice.dispatchEvent(new Event('change'));
			
		});
		this.formTypeDeviceIrDevice.dispatchEvent(new Event('change'));
		
		
		this.formModelDeviceIrDevice.addEventListener("change", (event) => {
			event.preventDefault();
			this.clearTargetBtnIrDeviceOptions();
			this.getButtonNamesByModel(this.formModelDeviceIrDevice.value).forEach(c => {
				var opt = document.createElement('option');
				opt.value = c.toLowerCase();
				opt.innerHTML = c;
				this.formTargetBtnIrDevice.appendChild(opt);
				
			});
			
			
		});
		this.formModelDeviceIrDevice.dispatchEvent(new Event('change'));
		
		this.formIrDevice.addEventListener("submit", (event) => {
			event.preventDefault();
			this.irDeviceGenerate();
			
		});
	}
	getForm(){
		return document.getElementById("generateIrDevice");
	}
	getFormFileName(getValue = false){
		return (getValue ? this.getForm().elements["nameIrDevice"].value : this.getForm().elements["nameIrDevice"]);
	}
	getFormTypeDevice(getValue = false){
		return (getValue ? this.getForm().elements["typeDeviceIrDevice"].value : this.getForm().elements["typeDeviceIrDevice"]);
		//return this.getForm().elements["typeDeviceIrDevice"];
	}
	getFormModelDevice(getValue = false){
		return (getValue ? this.getForm().elements["modelDeviceIrDevice"].value : this.getForm().elements["modelDeviceIrDevice"]);
		//return this.getForm().elements["modelDeviceIrDevice"];
	}
	getFormTargetButton(getValue = false){
		return (getValue ? this.getForm().elements["targetBtnIrDevice"].value : this.getForm().elements["targetBtnIrDevice"]);
		//return this.getForm().elements["targetBtnIrDevice"]; //document.getElementById('targetBtnIrDevice')
	}
	
	
	irDeviceGenerate(){
		var generateModal = getGenerateModal();
		clearGenerateModal();
		
		var nameIrDevice = cleanString(this.getFormFileName(true));
		nameIrDevice = ((nameIrDevice.length <= 0 || !allAlphaNumericUnderscore(nameIrDevice)) ? "NoName" : nameIrDevice );
		var typeIrDevice = cleanString(this.getFormTypeDevice(true));
		typeIrDevice = ((typeIrDevice.length <= 0) ? "" : typeIrDevice );
		var modelIrDevice = cleanString(this.getFormModelDevice(true));
		modelIrDevice = ((modelIrDevice.length <= 0) ? "" : modelIrDevice );
		var buttonIrDevice = cleanString(this.getFormTargetButton(true));
		buttonIrDevice = ((buttonIrDevice.length <= 0) ? "" : buttonIrDevice );

		if (!this.validSelection()) {
			setTextGenerateModal("Name Or Value Error");
		} else {
			var irBtn_s = this.getButtonByTypeAndModel(typeIrDevice, modelIrDevice, buttonIrDevice);
			var noName = typeIrDevice+"_"+modelIrDevice+"_"+buttonIrDevice; 
			noName = ((allAlphaNumericUnderscore(noName)) ? noName : "NoName" );
			nameIrDevice = ((nameIrDevice == "NoName") ? noName : nameIrDevice );
			//console.log(genUrlIrMultiButton(nameIrDevice, "IR signals file", "1", irBtn_s));
			setButtonGenerateModal(this.genDownloadButton(nameIrDevice, genUrlIrMultiButton(nameIrDevice, "IR signals file", "1", irBtn_s)));//keyName, fileType, version, buttonArray
			setTextGenerateModal("File Name: " + nameIrDevice + ".ir");
			appendTextGenerateModal("Type: " + typeIrDevice);
			appendTextGenerateModal("Model: " + modelIrDevice);
			appendTextGenerateModal("Button(s): " + buttonIrDevice);
			
		} 
		generateModal.show();
	}
	genDownloadButton(fileName, downloadUrl){
		var shortName = fileName;
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		return '<a href="' +downloadUrl +'" class="btn btn-primary" target="_blank">Download ' +shortName +".ir</a>";
		
	}
	
	validSelection(){
		var nameIrDevice = cleanString(this.getFormFileName(true));
		nameIrDevice = ((nameIrDevice.length <= 0 || !allAlphaNumericUnderscore(nameIrDevice)) ? "NoName" : nameIrDevice );
		//console.log("nameIrDevice "+cleanString(this.getFormFileName(true))+" -- "+nameIrDevice);
		var typeIrDevice = cleanString(this.getFormTypeDevice(true));
		typeIrDevice = ((typeIrDevice.length <= 0) ? "" : typeIrDevice );
		//console.log("typeIrDevice "+cleanString(this.getFormTypeDevice(true))+" -- "+typeIrDevice);
		var modelIrDevice = cleanString(this.getFormModelDevice(true));
		modelIrDevice = ((modelIrDevice.length <= 0) ? "" : modelIrDevice );
		//console.log("modelIrDevice "+cleanString(this.getFormModelDevice(true))+" -- "+modelIrDevice);
		var buttonIrDevice = cleanString(this.getFormTargetButton(true));
		buttonIrDevice = ((buttonIrDevice.length <= 0) ? "" : buttonIrDevice );
		//console.log("buttonIrDevice "+cleanString(this.getFormTargetButton(true))+" -- "+buttonIrDevice);
		if ( typeIrDevice == "" || modelIrDevice == "" || buttonIrDevice == "" ) {return false;}
		return true;
	}
	
	getIrModelsByType(irType){
		irType = irType.toLowerCase();
		switch(irType) {
			case 'tv':
				return this.irTv;
			case 'ac':
				return this.irAc;
			case 'audioreceivers':
				return this.irAudioreceivers;
			case 'bluray':
				return this.irBluray;
			case 'cctv':
				return this.irCctv;
			case 'cameras':
				return this.irCameras;
			case 'consoles':
				return this.irConsoles;
			case 'converters':
				return this.irConverters;
			case 'headunits':
				return this.irHeadunits;
			case 'ledlighting':
				return this.irLedlighting;
			case 'miscellaneous':
				return this.irMiscellaneous;
			case 'projectors':
				return this.irProjectors;
			case 'soundbars':
				return this.irSoundbars;
			case 'streamingdevices':
				return this.irStreamingdevices;
			default:
				console.log('Unable to get cards by type. Bad type.');
				return [];
		}
	}
	getButtonsByTypeAndModel(irType, irModel){
		irType = irType.toLowerCase();
		irModel = irModel.toLowerCase();
		var buttons = [];
		var type = this.getIrModelsByType(irType);
		for (let k in type) {
			if(type[k].irName.toLowerCase() == irModel){
				type[k].irButtons.forEach(c => {
					buttons.push(c);
				});
			}
		}
		return buttons;
		
	}
	getButtonByTypeAndModel(irType, irModel, irBtn){
		var ret = [];
		irBtn = irBtn.toLowerCase();
		var buttons = this.getButtonsByTypeAndModel(irType, irModel);
		if(irBtn == "all"){
			return buttons;
		}
		buttons.forEach(c => {
			if(c.btnName.toLowerCase() == irBtn.toLowerCase()){
				ret.push(c);
			}
		});
		return ret;		
	}
	getButtonNamesByModel(modelName){
		var buttons = ["ALL"];
		for (let k in this.irAll) {
			if(this.irAll[k].irName.toLowerCase() == modelName){
				this.irAll[k].irButtons.forEach(c => {
					//console.log(c.btnName);
					buttons.push(c.btnName);
				});
			}
		}
		return buttons;		
	}
	
	removeAllOptions(selectElement) {
		var i, L = selectElement.options.length - 1;
		for(i = L; i >= 0; i--) {
			selectElement.remove(i);
		}
	}
	clearAllOptions(){
		this.clearModelDeviceIrDeviceOptions();
		this.clearTargetBtnIrDeviceOptions();
		this.clearTypeDeviceIrDeviceOptions();
	}
	clearTypeDeviceIrDeviceOptions(){
		this.removeAllOptions(document.getElementById('typeDeviceIrDevice'));
	}
	clearModelDeviceIrDeviceOptions(){
		this.removeAllOptions(document.getElementById('modelDeviceIrDevice'));
	}
	clearTargetBtnIrDeviceOptions(){
		this.removeAllOptions(document.getElementById('targetBtnIrDevice'));
	}
	
	createIrDevicesDb(){ 
		this.createIrDevicesTvDb(); 
		this.createIrDevicesAcDb();
		this.createIrDevicesAudioreceiversDb();
		this.createIrDevicesBlurayDb();
		this.createIrDevicesCctvDb();
		this.createIrDevicesCamerasDb();
		this.createIrDevicesConsolesDb();
		this.createIrDevicesConvertersDb();
		this.createIrDevicesHeadunitsDb();
		this.createIrDevicesLedlightingDb();
		this.createIrDevicesMiscellaneousDb();
		this.createIrDevicesProjectorsDb();
		this.createIrDevicesSoundbarsDb();
		this.createIrDevicesStreamingdevicesDb();
	}
	createIrDevicesAcDb(){
		this.irAc["GoldenVantage_AF510_Fireplace"] = new irDevice("GoldenVantage_AF510_Fireplace");
		this.irAc["GoldenVantage_AF510_Fireplace"].addButton(new irDeviceButton("Power", "parsed", "NEC", "00 00 00 00", "88 00 00 00"));
		this.irAc["GoldenVantage_AF510_Fireplace"].addButton(new irDeviceButton("750W", "parsed", "NEC", "00 00 00 00", "8C 00 00 00"));
		this.irAc["GoldenVantage_AF510_Fireplace"].addButton(new irDeviceButton("1500W", "parsed", "NEC", "00 00 00 00", "90 00 00 00"));
		this.irAc["GoldenVantage_AF510_Fireplace"].addButton(new irDeviceButton("Dimmer", "parsed", "NEC", "00 00 00 00", "94 00 00 00"));
		this.irAll["ac_GoldenVantage_AF510_Fireplace"] = this.irAc["GoldenVantage_AF510_Fireplace"];

		this.irAc["JETTools_AFS_1000B"] = new irDevice("JETTools_AFS_1000B");
		this.irAc["JETTools_AFS_1000B"].addButton(new irDeviceButton("On_off", "parsed", "NEC", "01 00 00 00", "03 00 00 00"));
		this.irAc["JETTools_AFS_1000B"].addButton(new irDeviceButton("Speed", "parsed", "NEC", "01 00 00 00", "07 00 00 00"));
		this.irAc["JETTools_AFS_1000B"].addButton(new irDeviceButton("Time", "parsed", "NEC", "01 00 00 00", "0B 00 00 00"));
		this.irAll["ac_JETTools_AFS_1000B"] = this.irAc["JETTools_AFS_1000B"];

		this.irAc["Koldfront_WAC12001"] = new irDevice("Koldfront_WAC12001");
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Power", "parsed", "NECext", "01 FF 00 00", "12 ED 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Mode", "parsed", "NECext", "01 FF 00 00", "02 FD 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Minus", "parsed", "NECext", "01 FF 00 00", "13 EC 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Plus", "parsed", "NECext", "01 FF 00 00", "1A E5 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Timer", "parsed", "NECext", "01 FF 00 00", "1B E4 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Speed", "parsed", "NECext", "01 FF 00 00", "0E F1 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("One_Touch", "parsed", "NECext", "01 FF 00 00", "16 E9 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Sleep", "parsed", "NECext", "01 FF 00 00", "0A F5 00 00"));
		this.irAc["Koldfront_WAC12001"].addButton(new irDeviceButton("Energy_Saver", "parsed", "NECext", "01 FF 00 00", "0F F0 00 00"));
		this.irAll["ac_Koldfront_WAC12001"] = this.irAc["Koldfront_WAC12001"];

		this.irAc["LG_AC"] = new irDevice("LG_AC");
		this.irAc["LG_AC"].addButton(new irDeviceButton("Power", "parsed", "NECext", "81 66 00 00", "81 7E 00 00"));
		this.irAc["LG_AC"].addButton(new irDeviceButton("Temp Down", "parsed", "NECext", "81 66 00 00", "8A 75 00 00"));
		this.irAc["LG_AC"].addButton(new irDeviceButton("Temp Up", "parsed", "NECext", "81 66 00 00", "85 7A 00 00"));
		this.irAc["LG_AC"].addButton(new irDeviceButton("Fan Speed", "parsed", "NECext", "81 66 00 00", "99 66 00 00"));
		this.irAc["LG_AC"].addButton(new irDeviceButton("Timer", "parsed", "NECext", "81 66 00 00", "9F 60 00 00"));
		this.irAc["LG_AC"].addButton(new irDeviceButton("Mode", "parsed", "NECext", "81 66 00 00", "9B 64 00 00"));
		this.irAll["ac_LG_AC"] = this.irAc["LG_AC"];

		this.irAc["Zenith_AC"] = new irDevice("Zenith_AC");
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Power", "parsed", "NECext", "81 66 00 00", "81 7E 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Temp_down", "parsed", "NECext", "81 66 00 00", "8A 75 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Temp_up", "parsed", "NECext", "81 66 00 00", "85 7A 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Fan_speed", "parsed", "NECext", "81 66 00 00", "99 66 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Timer", "parsed", "NECext", "81 66 00 00", "9F 60 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Mode", "parsed", "NECext", "81 66 00 00", "9B 64 00 00"));
		this.irAc["Zenith_AC"].addButton(new irDeviceButton("Energy_saver", "parsed", "NECext", "81 66 00 00", "82 7D 00 00"));
		this.irAll["ac_Zenith_AC"] = this.irAc["Zenith_AC"];		
	}
	createIrDevicesAudioreceiversDb(){
		this.irAudioreceivers["Onkyo"] = new irDevice("Onkyo");
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Power", "parsed", "NECext", "D2 6C 00 00", "CB 34 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Bluray", "parsed", "NECext", "D2 6C 00 00", "8C 73 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Cbl_sat", "parsed", "NECext", "D2 6D 00 00", "0E F1 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Game", "parsed", "NECext", "D2 6D 00 00", "0D F2 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Streambox", "parsed", "NECext", "D2 6D 00 00", "0C F3 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Pc", "parsed", "NECext", "D2 6D 00 00", "9C 63 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Aux", "parsed", "NECext", "D2 6D 00 00", "9F 60 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Cd", "parsed", "NECext", "D2 6D 00 00", "09 F6 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Tv", "parsed", "NECext", "D2 6D 00 00", "48 B7 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Phono", "parsed", "NECext", "D2 6D 00 00", "0A F5 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Tuner", "parsed", "NECext", "D2 6D 00 00", "0B F4 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Ble", "parsed", "NECext", "D2 1E 00 00", "50 0E 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Settings", "parsed", "NECext", "D2 6C 00 00", "DB 24 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Info", "parsed", "NECext", "D2 6C 00 00", "55 AA 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Back", "parsed", "NECext", "D2 6C 00 00", "54 AB 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Quick_menu", "parsed", "NECext", "D2 6C 00 00", "53 AC 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Up", "parsed", "NECext", "D2 6D 00 00", "82 7D 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Down", "parsed", "NECext", "D2 6D 00 00", "83 7C 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Left", "parsed", "NECext", "D2 6D 00 00", "84 7B 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Right", "parsed", "NECext", "D2 6D 00 00", "85 7A 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Vol_up", "parsed", "NECext", "D2 6D 00 00", "02 FD 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Vol_down", "parsed", "NECext", "D2 6D 00 00", "03 FC 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "D2 6D 00 00", "05 FA 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "D2 6D 00 00", "97 68 00 00"));
		this.irAudioreceivers["Onkyo"].addButton(new irDeviceButton("Mode", "parsed", "NECext", "D2 02 00 00", "D3 2C 00 00"));
		this.irAll["audioreceivers_Onkyo"] = this.irAudioreceivers["Onkyo"];

		this.irAudioreceivers["Onkyo_RC627S"] = new irDevice("Onkyo_RC627S");
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("On", "parsed", "NECext", "D2 03 00 00", "04 FB 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Standby", "parsed", "NECext", "D2 04 00 00", "47 B8 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("VolUp", "parsed", "NECext", "D2 03 00 00", "02 FD 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("VolDown", "parsed", "NECext", "D2 03 00 00", "03 FC 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("InputUp", "parsed", "NECext", "D2 04 00 00", "1E E1 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("InputDown", "parsed", "NECext", "D2 04 00 00", "1F E0 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Muting", "parsed", "NECext", "D2 03 00 00", "05 FA 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Dimmer", "parsed", "NECext", "D2 03 00 00", "95 6A 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Display", "parsed", "NECext", "D2 04 00 00", "55 AA 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Play", "parsed", "NECext", "D2 03 00 00", "1B E4 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Pause", "parsed", "NECext", "D2 03 00 00", "1F E0 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Stop", "parsed", "NECext", "D2 03 00 00", "1C E3 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Rewind", "parsed", "NECext", "D2 03 00 00", "8B 74 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("FF", "parsed", "NECext", "D2 03 00 00", "8A 75 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Back", "parsed", "NECext", "D2 03 00 00", "1E E1 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Forward", "parsed", "NECext", "D2 03 00 00", "1D E2 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Random", "parsed", "NECext", "D2 04 00 00", "57 A8 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Repeat", "parsed", "NECext", "D2 04 00 00", "56 A9 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Scroll", "parsed", "NECext", "D2 04 00 00", "12 ED 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("PlaylistUp", "parsed", "NECext", "D2 09 00 00", "52 AD 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("PlaylistDn", "parsed", "NECext", "D2 09 00 00", "53 AC 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("AlbumUp", "parsed", "NECext", "D2 09 00 00", "50 AF 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("AlbumDn", "parsed", "NECext", "D2 09 00 00", "51 AE 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Band", "parsed", "NECext", "D2 04 00 00", "8A 75 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("FMMode", "parsed", "NECext", "D2 09 00 00", "D3 2C 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("PresetUp", "parsed", "NECext", "D2 03 00 00", "00 FF 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("PresetDn", "parsed", "NECext", "D2 03 00 00", "01 FE 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("TuningUp", "parsed", "NECext", "D2 09 00 00", "40 BF 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("TuningDn", "parsed", "NECext", "D2 09 00 00", "41 BE 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("PlayMode", "parsed", "NECext", "D2 04 00 00", "08 F7 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("GroupSearch", "parsed", "NECext", "D2 04 00 00", "81 7E 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Memory", "parsed", "NECext", "D2 03 00 00", "49 B6 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "D2 04 00 00", "46 B9 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("1", "parsed", "NECext", "D2 03 00 00", "D5 2A 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("2", "parsed", "NECext", "D2 03 00 00", "D6 29 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("3", "parsed", "NECext", "D2 03 00 00", "D7 28 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("4", "parsed", "NECext", "D2 03 00 00", "D8 27 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("5", "parsed", "NECext", "D2 03 00 00", "D9 26 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("6", "parsed", "NECext", "D2 03 00 00", "DA 25 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("7", "parsed", "NECext", "D2 03 00 00", "DB 24 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("8", "parsed", "NECext", "D2 03 00 00", "DC 23 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("9", "parsed", "NECext", "D2 03 00 00", "DD 22 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("GT10", "parsed", "NECext", "D2 03 00 00", "DF 20 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("10_0", "parsed", "NECext", "D2 03 00 00", "DE 21 00 00"));
		this.irAudioreceivers["Onkyo_RC627S"].addButton(new irDeviceButton("CLR", "parsed", "NECext", "D2 03 00 00", "9E 61 00 00"));
		this.irAll["audioreceivers_Onkyo_RC627S"] = this.irAudioreceivers["Onkyo_RC627S"];

		this.irAudioreceivers["Sony_MHC_GS300AV"] = new irDevice("Sony_MHC_GS300AV");
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Sleep", "parsed", "SIRC15", "10 00 00 00", "60 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Balance Left", "parsed", "SIRC15", "10 00 00 00", "26 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Balance Right", "parsed", "SIRC15", "10 00 00 00", "27 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Power", "parsed", "SIRC15", "10 00 00 00", "15 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Center +", "parsed", "SIRC15", "90 00 00 00", "54 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Center -", "parsed", "SIRC15", "90 00 00 00", "55 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Rear +", "parsed", "SIRC15", "90 00 00 00", "4E 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Rear -", "parsed", "SIRC15", "90 00 00 00", "4F 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Game", "parsed", "SIRC15", "10 00 00 00", "7C 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tape", "parsed", "SIRC15", "10 00 00 00", "23 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Display", "parsed", "SIRC15", "10 00 00 00", "4B 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuning +", "parsed", "SIRC20", "3A 07 00 00", "34 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset +", "parsed", "SIRC20", "3A 07 00 00", "31 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Album +", "parsed", "SIRC15", "11 00 00 00", "67 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Disc +", "parsed", "SIRC15", "11 00 00 00", "3E 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset EQ", "parsed", "SIRC15", "90 00 00 00", "6E 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Groove", "parsed", "SIRC15", "10 00 00 00", "7A 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Vol +", "parsed", "SIRC15", "10 00 00 00", "12 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Vol -", "parsed", "SIRC15", "10 00 00 00", "13 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Surround", "parsed", "SIRC15", "90 00 00 00", "40 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Disc -", "parsed", "SIRC15", "11 00 00 00", "3D 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Album -", "parsed", "SIRC15", "11 00 00 00", "66 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuning -", "parsed", "SIRC20", "3A 07 00 00", "33 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset -", "parsed", "SIRC20", "3A 07 00 00", "30 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Play", "parsed", "SIRC20", "3A 07 00 00", "32 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Pause", "parsed", "SIRC20", "3A 07 00 00", "39 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Stop", "parsed", "SIRC20", "3A 07 00 00", "38 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuner/Band", "parsed", "SIRC15", "10 00 00 00", "0F 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("CD", "parsed", "SIRC15", "10 00 00 00", "25 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Test Tone", "parsed", "SIRC15", "90 00 00 00", "4A 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("5.1 ch", "parsed", "SIRC15", "10 00 00 00", "7D 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Video (MD)", "parsed", "SIRC15", "10 00 00 00", "22 00 00 00"));
		this.irAudioreceivers["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Pro Logic", "parsed", "SIRC15", "90 00 00 00", "42 00 00 00"));
		this.irAll["audioreceivers_Sony_MHC_GS300AV"] = this.irAudioreceivers["Sony_MHC_GS300AV"];		
	}
	createIrDevicesBlurayDb(){
		this.irBluray["LG_BlueRay"] = new irDevice("LG_BlueRay");
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "2D 00 00 00", "30 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Eject", "parsed", "Samsung32", "2D 00 00 00", "36 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Pause", "parsed", "Samsung32", "2D 00 00 00", "38 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Play", "parsed", "Samsung32", "2D 00 00 00", "31 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Stop", "parsed", "Samsung32", "2D 00 00 00", "39 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Forward", "parsed", "Samsung32", "2D 00 00 00", "33 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Backward", "parsed", "Samsung32", "2D 00 00 00", "32 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Chptr_next", "parsed", "Samsung32", "2D 00 00 00", "34 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Chpter_back", "parsed", "Samsung32", "2D 00 00 00", "35 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Title_popup", "parsed", "Samsung32", "2D 00 00 00", "4A 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Info_menu", "parsed", "Samsung32", "2D 00 00 00", "3A 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Home", "parsed", "Samsung32", "2D 00 00 00", "67 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Up", "parsed", "Samsung32", "2D 00 00 00", "47 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Down", "parsed", "Samsung32", "2D 00 00 00", "48 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Left", "parsed", "Samsung32", "2D 00 00 00", "59 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Right", "parsed", "Samsung32", "2D 00 00 00", "5A 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Enter", "parsed", "Samsung32", "2D 00 00 00", "58 00 00 00"));
		this.irBluray["LG_BlueRay"].addButton(new irDeviceButton("Disc_menu", "parsed", "Samsung32", "2D 00 00 00", "4B 00 00 00"));
		this.irAll["bluray_LG_BlueRay"] = this.irBluray["LG_BlueRay"];

		this.irBluray["Toshiba_SE_R0398"] = new irDevice("Toshiba_SE_R0398");
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Power", "parsed", "NECext", "45 B5 00 00", "C0 3F 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Setup", "parsed", "NECext", "45 B5 00 00", "20 DF 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Eject", "parsed", "NECext", "45 B5 00 00", "C1 3E 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("OK", "parsed", "NECext", "45 B5 00 00", "21 DE 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Up", "parsed", "NECext", "45 B5 00 00", "80 7F 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Down", "parsed", "NECext", "45 B5 00 00", "81 7E 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Left", "parsed", "NECext", "45 B5 00 00", "51 AE 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Right", "parsed", "NECext", "45 B5 00 00", "4D B2 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Return", "parsed", "NECext", "45 B5 00 00", "22 DD 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "45 B5 00 00", "84 7B 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Display", "parsed", "NECext", "45 B5 00 00", "16 E9 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Topmenu", "parsed", "NECext", "45 B5 00 00", "DE 21 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Play", "parsed", "NECext", "45 B5 00 00", "C2 3D 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Stop", "parsed", "NECext", "45 B5 00 00", "14 EB 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Back", "parsed", "NECext", "45 B5 00 00", "23 DC 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Forward", "parsed", "NECext", "45 B5 00 00", "24 DB 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Rewind", "parsed", "NECext", "45 B5 00 00", "19 E6 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("FF", "parsed", "NECext", "45 B5 00 00", "13 EC 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("MC", "parsed", "NECext", "45 B5 00 00", "C5 3A 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Audio", "parsed", "NECext", "45 B5 00 00", "27 D8 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Subtitle", "parsed", "NECext", "45 B5 00 00", "28 D7 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("PIPAudio", "parsed", "NECext", "45 B5 00 00", "39 C6 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Angle", "parsed", "NECext", "45 B5 00 00", "29 D6 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Clear", "parsed", "NECext", "45 B5 00 00", "EF 10 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Search", "parsed", "NECext", "45 B5 00 00", "26 D9 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Repeat", "parsed", "NECext", "45 B5 00 00", "2B D4 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("AB", "parsed", "NECext", "45 B5 00 00", "2C D3 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("HDMI", "parsed", "NECext", "45 B5 00 00", "9F 60 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("OSC", "parsed", "NECext", "45 B5 00 00", "10 EF 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("PIP", "parsed", "NECext", "45 B5 00 00", "C3 3C 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Program", "parsed", "NECext", "45 B5 00 00", "34 CB 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Digest", "parsed", "NECext", "45 B5 00 00", "35 CA 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Zoom", "parsed", "NECext", "45 B5 00 00", "37 C8 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Bookmark", "parsed", "NECext", "45 B5 00 00", "36 C9 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("1", "parsed", "NECext", "45 B5 00 00", "01 FE 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("2", "parsed", "NECext", "45 B5 00 00", "02 FD 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("3", "parsed", "NECext", "45 B5 00 00", "03 FC 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("4", "parsed", "NECext", "45 B5 00 00", "04 FB 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("5", "parsed", "NECext", "45 B5 00 00", "05 FA 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("6", "parsed", "NECext", "45 B5 00 00", "06 F9 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("7", "parsed", "NECext", "45 B5 00 00", "07 F8 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("8", "parsed", "NECext", "45 B5 00 00", "08 F7 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("9", "parsed", "NECext", "45 B5 00 00", "09 F6 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("0", "parsed", "NECext", "45 B5 00 00", "0A F5 00 00"));
		this.irBluray["Toshiba_SE_R0398"].addButton(new irDeviceButton("Next", "parsed", "NECext", "45 B5 00 00", "0D F2 00 00"));
		this.irAll["bluray_Toshiba_SE_R0398"] = this.irBluray["Toshiba_SE_R0398"];		
	}
	createIrDevicesCctvDb(){
		this.irCctv["Szxlcom_cams"] = new irDevice("Szxlcom_cams");
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Power", "parsed", "SIRC15", "D4 00 00 00", "15 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Pan_up", "parsed", "SIRC20", "3A 0A 00 00", "1A 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Pan_down", "parsed", "SIRC20", "3A 0A 00 00", "1B 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Pan_left", "parsed", "SIRC20", "3A 0A 00 00", "1D 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Pan_right", "parsed", "SIRC20", "3A 0A 00 00", "1C 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Zoom_in_slw", "parsed", "SIRC15", "D4 00 00 00", "1A 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Zoom_out_slow", "parsed", "SIRC15", "D4 00 00 00", "1B 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Zoom_in_fast", "parsed", "SIRC15", "D4 00 00 00", "1C 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Zoom_out_fast", "parsed", "SIRC15", "D4 00 00 00", "1D 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Focus_far", "parsed", "SIRC15", "D4 00 00 00", "22 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Focus_near", "parsed", "SIRC15", "D4 00 00 00", "23 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Auto_focus", "parsed", "SIRC15", "D4 00 00 00", "1E 00 00 00"));
		this.irCctv["Szxlcom_cams"].addButton(new irDeviceButton("Menu", "parsed", "SIRC20", "3A 0A 00 00", "14 00 00 00"));
		this.irAll["cctv_Szxlcom_cams"] = this.irCctv["Szxlcom_cams"];

		this.irCctv["Marshall_CV610"] = new irDevice("Marshall_CV610");
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Power", "parsed", "NEC", "44 00 00 00", "1B 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Pan_up", "parsed", "NEC", "44 00 00 00", "05 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Pan_down", "parsed", "NEC", "44 00 00 00", "0D 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Pan_right", "parsed", "NEC", "44 00 00 00", "0A 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Pan_left", "parsed", "NEC", "44 00 00 00", "08 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Zoom_in", "parsed", "NEC", "44 00 00 00", "41 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Zoom_out", "parsed", "NEC", "44 00 00 00", "1E 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("Menu", "parsed", "NEC", "44 00 00 00", "43 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("1", "parsed", "NEC", "44 00 00 00", "0C 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("2", "parsed", "NEC", "44 00 00 00", "11 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("3", "parsed", "NEC", "44 00 00 00", "0E 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("4", "parsed", "NEC", "44 00 00 00", "10 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("5", "parsed", "NEC", "44 00 00 00", "15 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("6", "parsed", "NEC", "44 00 00 00", "12 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("7", "parsed", "NEC", "44 00 00 00", "14 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("8", "parsed", "NEC", "44 00 00 00", "19 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("9", "parsed", "NEC", "44 00 00 00", "16 00 00 00"));
		this.irCctv["Marshall_CV610"].addButton(new irDeviceButton("0", "parsed", "NEC", "44 00 00 00", "1D 00 00 00"));
		this.irAll["cctv_Marshall_CV610"] = this.irCctv["Marshall_CV610"];		
	}
	createIrDevicesCamerasDb(){
		this.irCameras["Sony"] = new irDevice("Sony");
		this.irCameras["Sony"].addButton(new irDeviceButton("Photo", "parsed", "SIRC20", "3A 1E 00 00", "2D 00 00 00"));
		this.irCameras["Sony"].addButton(new irDeviceButton("Photo_2s", "parsed", "SIRC20", "3A 1E 00 00", "37 00 00 00"));
		this.irCameras["Sony"].addButton(new irDeviceButton("Rec", "parsed", "SIRC20", "3A 1E 00 00", "48 00 00 00"));
		this.irAll["cameras_Sony"] = this.irCameras["Sony"];		
	}
	createIrDevicesConsolesDb(){
		this.irConsoles["Xbox"] = new irDevice("Xbox");
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_power", "parsed", "NECext", "80 D8 00 00", "2F D0 00 00"));
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_up", "parsed", "NECext", "80 D8 00 00", "1E E1 00 00"));
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_down", "parsed", "NECext", "80 D8 00 00", "1F E0 00 00"));
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_left", "parsed", "NECext", "80 D8 00 00", "20 DF 00 00"));
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_right", "parsed", "NECext", "80 D8 00 00", "21 DE 00 00"));
		this.irConsoles["Xbox"].addButton(new irDeviceButton("Xbox_select", "parsed", "NECext", "80 D8 00 00", "22 DD 00 00"));
		this.irAll["consoles_Xbox"] = this.irConsoles["Xbox"];		

		// Talon Media Remote for Xbox One (Model: 048-083-NA)
		this.irConsoles["Xbox_Media_Remote"] = new irDevice("Xbox_Media_Remote");
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_home", "parsed", "NECext", "80 D8 00 00", "64 9B 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_view", "parsed", "NECext", "80 D8 00 00", "6E 91 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_menu", "parsed", "NECext", "80 D8 00 00", "6F 90 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_play_pause", "parsed", "NECext", "80 D8 00 00", "70 8F 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_fast_forward", "parsed", "NECext", "80 D8 00 00", "14 EB 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_rewind", "parsed", "NECext", "80 D8 00 00", "15 EA 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_next_track", "parsed", "NECext", "80 D8 00 00", "1A E5 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_last_track", "parsed", "NECext", "80 D8 00 00", "1B E4 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_stop", "parsed", "NECext", "80 D8 00 00", "19 E6 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_record", "parsed", "NECext", "80 D8 00 00", "17 E8 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_select", "parsed", "NECext", "80 D8 00 00", "22 DD 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_up", "parsed", "NECext", "80 D8 00 00", "1E E1 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_down", "parsed", "NECext", "80 D8 00 00", "1F E0 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_left", "parsed", "NECext", "80 D8 00 00", "20 DF 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_right", "parsed", "NECext", "80 D8 00 00", "21 DE 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_a", "parsed", "NECext", "80 D8 00 00", "66 99 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_b", "parsed", "NECext", "80 D8 00 00", "65 9A 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_x", "parsed", "NECext", "80 D8 00 00", "68 97 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_y", "parsed", "NECext", "80 D8 00 00", "67 98 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_back", "parsed", "NECext", "80 D8 00 00", "23 DC 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_oneguide", "parsed", "NECext", "80 D8 00 00", "26 D9 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_captions", "parsed", "NECext", "80 D8 00 00", "4D B2 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_movies", "parsed", "NECext", "80 D8 00 00", "71 8E 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_tv_shows", "parsed", "NECext", "80 D8 00 00", "72 8D 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_mute", "parsed", "NECext", "80 D8 00 00", "0E F1 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_vol_up", "parsed", "NECext", "80 D8 00 00", "10 EF 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_vol_down", "parsed", "NECext", "80 D8 00 00", "11 EE 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_ch_up", "parsed", "NECext", "80 D8 00 00", "12 ED 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_ch_down", "parsed", "NECext", "80 D8 00 00", "13 EC 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_skip_back", "parsed", "NECext", "80 D8 00 00", "25 DA 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_clr", "parsed", "NECext", "80 D8 00 00", "00 FF 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_dot", "parsed", "NECext", "80 D8 00 00", "1D E2 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_0", "parsed", "NECext", "80 D8 00 00", "00 FF 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_1", "parsed", "NECext", "80 D8 00 00", "01 FE 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_2", "parsed", "NECext", "80 D8 00 00", "02 FD 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_3", "parsed", "NECext", "80 D8 00 00", "03 FC 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_4", "parsed", "NECext", "80 D8 00 00", "04 FB 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_5", "parsed", "NECext", "80 D8 00 00", "05 FA 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_6", "parsed", "NECext", "80 D8 00 00", "06 F9 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_7", "parsed", "NECext", "80 D8 00 00", "07 F8 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_8", "parsed", "NECext", "80 D8 00 00", "08 F7 00 00"));
		this.irConsoles["Xbox_Media_Remote"].addButton(new irDeviceButton("Xbox_9", "parsed", "NECext", "80 D8 00 00", "09 F6 00 00"));
		this.irAll["consoles_Xbox_Media_Remote"] = this.irConsoles["Xbox_Media_Remote"];		
	}
	createIrDevicesConvertersDb(){
		this.irConverters["RME_ADI_2_DAC_FS"] = new irDevice("RME_ADI_2_DAC_FS");
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Power", "parsed", "NECext", "12 34 00 00", "20 DF 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("SEL", "parsed", "NECext", "12 34 00 00", "35 CA 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("BT", "parsed", "NECext", "12 34 00 00", "2B D4 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("EQ", "parsed", "NECext", "12 34 00 00", "2C D3 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("LD", "parsed", "NECext", "12 34 00 00", "2D D2 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Bass_up", "parsed", "NECext", "12 34 00 00", "2F D0 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Bass_down", "parsed", "NECext", "12 34 00 00", "30 CF 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Treble_up", "parsed", "NECext", "12 34 00 00", "31 CE 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Treble_down", "parsed", "NECext", "12 34 00 00", "32 CD 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Volume_up", "parsed", "NECext", "12 34 00 00", "22 DD 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Volume_down", "parsed", "NECext", "12 34 00 00", "21 DE 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("VOL", "parsed", "NECext", "12 34 00 00", "2E D1 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Channl_L", "parsed", "NECext", "12 34 00 00", "33 CC 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Channel_R", "parsed", "NECext", "12 34 00 00", "34 CB 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("5", "parsed", "NECext", "12 34 00 00", "23 DC 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("6", "parsed", "NECext", "12 34 00 00", "24 DB 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("7", "parsed", "NECext", "12 34 00 00", "25 DA 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("1", "parsed", "NECext", "12 34 00 00", "26 D9 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("2", "parsed", "NECext", "12 34 00 00", "27 D8 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("3", "parsed", "NECext", "12 34 00 00", "28 D7 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("4", "parsed", "NECext", "12 34 00 00", "29 D6 00 00"));
		this.irConverters["RME_ADI_2_DAC_FS"].addButton(new irDeviceButton("Buttom_mute", "parsed", "NECext", "12 34 00 00", "2A D5 00 00"));
		this.irAll["converters_RME_ADI_2_DAC_FS"] = this.irConverters["RME_ADI_2_DAC_FS"];		
	}
	createIrDevicesHeadunitsDb(){
		this.irHeadunits["GPX_CDRadio"] = new irDevice("GPX_CDRadio");
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Stop", "parsed", "Samsung32", "81 00 00 00", "09 00 00 00"));
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Play_pause", "parsed", "Samsung32", "81 00 00 00", "01 00 00 00"));
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Skip_bck", "parsed", "Samsung32", "81 00 00 00", "19 00 00 00"));
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Skip_fwd", "parsed", "Samsung32", "81 00 00 00", "11 00 00 00"));
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Prog", "parsed", "Samsung32", "81 00 00 00", "1A 00 00 00"));
		this.irHeadunits["GPX_CDRadio"].addButton(new irDeviceButton("Repeat", "parsed", "Samsung32", "81 00 00 00", "02 00 00 00"));
		this.irAll["headunits_GPX_CDRadio"] = this.irHeadunits["GPX_CDRadio"];		
	}
	createIrDevicesLedlightingDb(){
		this.irLedlighting["Amazon_LED_Lights"] = new irDevice("Amazon_LED_Lights");
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Power", "parsed", "NEC", "00 00 00 00", "40 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Bright_dn", "parsed", "NEC", "00 00 00 00", "5D 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Red", "parsed", "NEC", "00 00 00 00", "58 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Green", "parsed", "NEC", "00 00 00 00", "59 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Blue", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("White", "parsed", "NEC", "00 00 00 00", "44 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Red_up", "parsed", "NEC", "00 00 00 00", "14 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Red_dn", "parsed", "NEC", "00 00 00 00", "10 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Green_up", "parsed", "NEC", "00 00 00 00", "15 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Green_dn", "parsed", "NEC", "00 00 00 00", "11 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Blue_up", "parsed", "NEC", "00 00 00 00", "16 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Blue_dn", "parsed", "NEC", "00 00 00 00", "12 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Quick", "parsed", "NEC", "00 00 00 00", "17 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Slow", "parsed", "NEC", "00 00 00 00", "13 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Auto", "parsed", "NEC", "00 00 00 00", "0F 00 00 00"));
		this.irLedlighting["Amazon_LED_Lights"].addButton(new irDeviceButton("Flash", "parsed", "NEC", "00 00 00 00", "0B 00 00 00"));
		this.irAll["ledlighting_Amazon_LED_Lights"] = this.irLedlighting["Amazon_LED_Lights"];

		this.irLedlighting["44_Button_LED"] = new irDevice("44_Button_LED");
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("On", "parsed", "NEC", "00 00 00 00", "41 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Off", "parsed", "NEC", "00 00 00 00", "40 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("R", "parsed", "NEC", "00 00 00 00", "58 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("G", "parsed", "NEC", "00 00 00 00", "59 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("B", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("W", "parsed", "NEC", "00 00 00 00", "44 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Yellow", "parsed", "NEC", "00 00 00 00", "54 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Light_blue", "parsed", "NEC", "00 00 00 00", "55 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Turqouise", "parsed", "NEC", "00 00 00 00", "49 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Pink", "parsed", "NEC", "00 00 00 00", "48 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Orange", "parsed", "NEC", "00 00 00 00", "50 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Teal", "parsed", "NEC", "00 00 00 00", "51 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Purple", "parsed", "NEC", "00 00 00 00", "4D 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Other_Pink", "parsed", "NEC", "00 00 00 00", "4C 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Song_3", "parsed", "NEC", "00 00 00 00", "1E 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("2H", "parsed", "NEC", "00 00 00 00", "19 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Up_Red", "parsed", "NEC", "00 00 00 00", "14 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Up_Green", "parsed", "NEC", "00 00 00 00", "15 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY1", "parsed", "NEC", "00 00 00 00", "0C 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY2", "parsed", "NEC", "00 00 00 00", "0D 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY3", "parsed", "NEC", "00 00 00 00", "0E 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY4", "parsed", "NEC", "00 00 00 00", "08 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY5", "parsed", "NEC", "00 00 00 00", "09 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("DIY6", "parsed", "NEC", "00 00 00 00", "0A 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Quick", "parsed", "NEC", "00 00 00 00", "17 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Slow", "parsed", "NEC", "00 00 00 00", "13 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Auto", "parsed", "NEC", "00 00 00 00", "0F 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Flash", "parsed", "NEC", "00 00 00 00", "0B 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Jump3", "parsed", "NEC", "00 00 00 00", "04 00 00 00"));
		this.irLedlighting["44_Button_LED"].addButton(new irDeviceButton("Jump7", "parsed", "NEC", "00 00 00 00", "05 00 00 00"));
		this.irAll["ledlighting_44_Button_LED"] = this.irLedlighting["44_Button_LED"];

		this.irLedlighting["LEDStrip"] = new irDevice("LEDStrip");
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("1", "parsed", "NECext", "00 EF 00 00", "00 FF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("2", "parsed", "NECext", "00 EF 00 00", "01 FE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("3", "parsed", "NECext", "00 EF 00 00", "02 FD 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("4", "parsed", "NECext", "00 EF 00 00", "03 FC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("5", "parsed", "NECext", "00 EF 00 00", "04 FB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("6", "parsed", "NECext", "00 EF 00 00", "05 FA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("7", "parsed", "NECext", "00 EF 00 00", "06 F9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("8", "parsed", "NECext", "00 EF 00 00", "07 F8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("9", "parsed", "NECext", "00 EF 00 00", "08 F7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("10", "parsed", "NECext", "00 EF 00 00", "09 F6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("11", "parsed", "NECext", "00 EF 00 00", "0A F5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("12", "parsed", "NECext", "00 EF 00 00", "0B F4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("13", "parsed", "NECext", "00 EF 00 00", "0C F3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("14", "parsed", "NECext", "00 EF 00 00", "0D F2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("15", "parsed", "NECext", "00 EF 00 00", "0E F1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("16", "parsed", "NECext", "00 EF 00 00", "0F F0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("17", "parsed", "NECext", "00 EF 00 00", "10 EF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("18", "parsed", "NECext", "00 EF 00 00", "11 EE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("19", "parsed", "NECext", "00 EF 00 00", "12 ED 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("20", "parsed", "NECext", "00 EF 00 00", "13 EC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("21", "parsed", "NECext", "00 EF 00 00", "14 EB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("22", "parsed", "NECext", "00 EF 00 00", "15 EA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("23", "parsed", "NECext", "00 EF 00 00", "16 E9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("24", "parsed", "NECext", "00 EF 00 00", "17 E8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("25", "parsed", "NECext", "00 EF 00 00", "18 E7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("26", "parsed", "NECext", "00 EF 00 00", "19 E6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("27", "parsed", "NECext", "00 EF 00 00", "1A E5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("28", "parsed", "NECext", "00 EF 00 00", "1B E4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("29", "parsed", "NECext", "00 EF 00 00", "1C E3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("30", "parsed", "NECext", "00 EF 00 00", "1D E2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("31", "parsed", "NECext", "00 EF 00 00", "1E E1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("32", "parsed", "NECext", "00 EF 00 00", "1F E0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("33", "parsed", "NECext", "00 EF 00 00", "20 DF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("34", "parsed", "NECext", "00 EF 00 00", "21 DE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("35", "parsed", "NECext", "00 EF 00 00", "22 DD 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("36", "parsed", "NECext", "00 EF 00 00", "23 DC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("37", "parsed", "NECext", "00 EF 00 00", "24 DB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("38", "parsed", "NECext", "00 EF 00 00", "25 DA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("39", "parsed", "NECext", "00 EF 00 00", "26 D9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("40", "parsed", "NECext", "00 EF 00 00", "27 D8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("41", "parsed", "NECext", "00 EF 00 00", "28 D7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("42", "parsed", "NECext", "00 EF 00 00", "29 D6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("43", "parsed", "NECext", "00 EF 00 00", "2A D5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("44", "parsed", "NECext", "00 EF 00 00", "2B D4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("45", "parsed", "NECext", "00 EF 00 00", "2C D3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("46", "parsed", "NECext", "00 EF 00 00", "2D D2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("47", "parsed", "NECext", "00 EF 00 00", "2E D1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("48", "parsed", "NECext", "00 EF 00 00", "2F D0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("49", "parsed", "NECext", "00 EF 00 00", "30 CF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("50", "parsed", "NECext", "00 EF 00 00", "31 CE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("51", "parsed", "NECext", "00 EF 00 00", "32 CD 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("52", "parsed", "NECext", "00 EF 00 00", "33 CC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("53", "parsed", "NECext", "00 EF 00 00", "34 CB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("54", "parsed", "NECext", "00 EF 00 00", "35 CA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("55", "parsed", "NECext", "00 EF 00 00", "36 C9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("56", "parsed", "NECext", "00 EF 00 00", "37 C8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("57", "parsed", "NECext", "00 EF 00 00", "38 C7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("58", "parsed", "NECext", "00 EF 00 00", "39 C6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("59", "parsed", "NECext", "00 EF 00 00", "3A C5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("60", "parsed", "NECext", "00 EF 00 00", "3B C4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("61", "parsed", "NECext", "00 EF 00 00", "3C C3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("62", "parsed", "NECext", "00 EF 00 00", "3D C2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("63", "parsed", "NECext", "00 EF 00 00", "3E C1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("64", "parsed", "NECext", "00 EF 00 00", "3F C0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("65", "parsed", "NECext", "00 EF 00 00", "40 BF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("66", "parsed", "NECext", "00 EF 00 00", "41 BE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("67", "parsed", "NECext", "00 EF 00 00", "42 BD 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("68", "parsed", "NECext", "00 EF 00 00", "43 BC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("69", "parsed", "NECext", "00 EF 00 00", "44 BB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("70", "parsed", "NECext", "00 EF 00 00", "45 BA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("71", "parsed", "NECext", "00 EF 00 00", "46 B9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("72", "parsed", "NECext", "00 EF 00 00", "47 B8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("73", "parsed", "NECext", "00 EF 00 00", "48 B7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("74", "parsed", "NECext", "00 EF 00 00", "49 B6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("75", "parsed", "NECext", "00 EF 00 00", "4A B5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("76", "parsed", "NECext", "00 EF 00 00", "4B B4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("77", "parsed", "NECext", "00 EF 00 00", "4C B3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("78", "parsed", "NECext", "00 EF 00 00", "4D B2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("79", "parsed", "NECext", "00 EF 00 00", "4E B1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("80", "parsed", "NECext", "00 EF 00 00", "4F B0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("81", "parsed", "NECext", "00 EF 00 00", "50 AF 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("82", "parsed", "NECext", "00 EF 00 00", "51 AE 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("83", "parsed", "NECext", "00 EF 00 00", "52 AD 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("84", "parsed", "NECext", "00 EF 00 00", "53 AC 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("85", "parsed", "NECext", "00 EF 00 00", "54 AB 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("86", "parsed", "NECext", "00 EF 00 00", "55 AA 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("87", "parsed", "NECext", "00 EF 00 00", "56 A9 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("88", "parsed", "NECext", "00 EF 00 00", "57 A8 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("89", "parsed", "NECext", "00 EF 00 00", "58 A7 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("90", "parsed", "NECext", "00 EF 00 00", "59 A6 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("91", "parsed", "NECext", "00 EF 00 00", "5A A5 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("92", "parsed", "NECext", "00 EF 00 00", "5B A4 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("93", "parsed", "NECext", "00 EF 00 00", "5C A3 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("94", "parsed", "NECext", "00 EF 00 00", "5D A2 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("95", "parsed", "NECext", "00 EF 00 00", "5E A1 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("96", "parsed", "NECext", "00 EF 00 00", "5F A0 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("97", "parsed", "NECext", "00 EF 00 00", "60 9F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("98", "parsed", "NECext", "00 EF 00 00", "61 9E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("99", "parsed", "NECext", "00 EF 00 00", "62 9D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("100", "parsed", "NECext", "00 EF 00 00", "63 9C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("101", "parsed", "NECext", "00 EF 00 00", "64 9B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("102", "parsed", "NECext", "00 EF 00 00", "65 9A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("103", "parsed", "NECext", "00 EF 00 00", "66 99 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("104", "parsed", "NECext", "00 EF 00 00", "67 98 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("105", "parsed", "NECext", "00 EF 00 00", "68 97 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("106", "parsed", "NECext", "00 EF 00 00", "69 96 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("107", "parsed", "NECext", "00 EF 00 00", "6A 95 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("108", "parsed", "NECext", "00 EF 00 00", "6B 94 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("109", "parsed", "NECext", "00 EF 00 00", "6C 93 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("110", "parsed", "NECext", "00 EF 00 00", "6D 92 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("111", "parsed", "NECext", "00 EF 00 00", "6E 91 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("112", "parsed", "NECext", "00 EF 00 00", "6F 90 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("113", "parsed", "NECext", "00 EF 00 00", "70 8F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("114", "parsed", "NECext", "00 EF 00 00", "71 8E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("115", "parsed", "NECext", "00 EF 00 00", "72 8D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("116", "parsed", "NECext", "00 EF 00 00", "73 8C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("117", "parsed", "NECext", "00 EF 00 00", "74 8B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("118", "parsed", "NECext", "00 EF 00 00", "75 8A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("119", "parsed", "NECext", "00 EF 00 00", "76 89 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("120", "parsed", "NECext", "00 EF 00 00", "77 88 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("121", "parsed", "NECext", "00 EF 00 00", "78 87 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("122", "parsed", "NECext", "00 EF 00 00", "79 86 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("123", "parsed", "NECext", "00 EF 00 00", "7A 85 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("124", "parsed", "NECext", "00 EF 00 00", "7B 84 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("125", "parsed", "NECext", "00 EF 00 00", "7C 83 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("126", "parsed", "NECext", "00 EF 00 00", "7D 82 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("127", "parsed", "NECext", "00 EF 00 00", "7E 81 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("128", "parsed", "NECext", "00 EF 00 00", "7F 80 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("129", "parsed", "NECext", "00 EF 00 00", "80 7F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("130", "parsed", "NECext", "00 EF 00 00", "81 7E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("131", "parsed", "NECext", "00 EF 00 00", "82 7D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("132", "parsed", "NECext", "00 EF 00 00", "83 7C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("133", "parsed", "NECext", "00 EF 00 00", "84 7B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("134", "parsed", "NECext", "00 EF 00 00", "85 7A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("135", "parsed", "NECext", "00 EF 00 00", "86 79 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("136", "parsed", "NECext", "00 EF 00 00", "87 78 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("137", "parsed", "NECext", "00 EF 00 00", "88 77 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("138", "parsed", "NECext", "00 EF 00 00", "89 76 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("139", "parsed", "NECext", "00 EF 00 00", "8A 75 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("140", "parsed", "NECext", "00 EF 00 00", "8B 74 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("141", "parsed", "NECext", "00 EF 00 00", "8C 73 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("142", "parsed", "NECext", "00 EF 00 00", "8D 72 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("143", "parsed", "NECext", "00 EF 00 00", "8E 71 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("144", "parsed", "NECext", "00 EF 00 00", "8F 70 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("145", "parsed", "NECext", "00 EF 00 00", "90 6F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("146", "parsed", "NECext", "00 EF 00 00", "91 6E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("147", "parsed", "NECext", "00 EF 00 00", "92 6D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("148", "parsed", "NECext", "00 EF 00 00", "93 6C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("149", "parsed", "NECext", "00 EF 00 00", "94 6B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("150", "parsed", "NECext", "00 EF 00 00", "95 6A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("151", "parsed", "NECext", "00 EF 00 00", "96 69 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("152", "parsed", "NECext", "00 EF 00 00", "97 68 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("153", "parsed", "NECext", "00 EF 00 00", "98 67 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("154", "parsed", "NECext", "00 EF 00 00", "99 66 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("155", "parsed", "NECext", "00 EF 00 00", "9A 65 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("156", "parsed", "NECext", "00 EF 00 00", "9B 64 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("157", "parsed", "NECext", "00 EF 00 00", "9C 63 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("158", "parsed", "NECext", "00 EF 00 00", "9D 62 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("159", "parsed", "NECext", "00 EF 00 00", "9E 61 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("160", "parsed", "NECext", "00 EF 00 00", "9F 60 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("161", "parsed", "NECext", "00 EF 00 00", "A0 5F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("162", "parsed", "NECext", "00 EF 00 00", "A1 5E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("163", "parsed", "NECext", "00 EF 00 00", "A2 5D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("164", "parsed", "NECext", "00 EF 00 00", "A3 5C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("165", "parsed", "NECext", "00 EF 00 00", "A4 5B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("166", "parsed", "NECext", "00 EF 00 00", "A5 5A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("167", "parsed", "NECext", "00 EF 00 00", "A6 59 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("168", "parsed", "NECext", "00 EF 00 00", "A7 58 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("169", "parsed", "NECext", "00 EF 00 00", "A8 57 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("170", "parsed", "NECext", "00 EF 00 00", "A9 56 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("171", "parsed", "NECext", "00 EF 00 00", "AA 55 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("172", "parsed", "NECext", "00 EF 00 00", "AB 54 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("173", "parsed", "NECext", "00 EF 00 00", "AC 53 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("174", "parsed", "NECext", "00 EF 00 00", "AD 52 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("175", "parsed", "NECext", "00 EF 00 00", "AE 51 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("176", "parsed", "NECext", "00 EF 00 00", "AF 50 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("177", "parsed", "NECext", "00 EF 00 00", "B0 4F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("178", "parsed", "NECext", "00 EF 00 00", "B1 4E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("179", "parsed", "NECext", "00 EF 00 00", "B2 4D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("180", "parsed", "NECext", "00 EF 00 00", "B3 4C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("181", "parsed", "NECext", "00 EF 00 00", "B4 4B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("182", "parsed", "NECext", "00 EF 00 00", "B5 4A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("183", "parsed", "NECext", "00 EF 00 00", "B6 49 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("184", "parsed", "NECext", "00 EF 00 00", "B7 48 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("185", "parsed", "NECext", "00 EF 00 00", "B8 47 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("186", "parsed", "NECext", "00 EF 00 00", "B9 46 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("187", "parsed", "NECext", "00 EF 00 00", "BA 45 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("188", "parsed", "NECext", "00 EF 00 00", "BB 44 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("189", "parsed", "NECext", "00 EF 00 00", "BC 43 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("190", "parsed", "NECext", "00 EF 00 00", "BD 42 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("191", "parsed", "NECext", "00 EF 00 00", "BE 41 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("192", "parsed", "NECext", "00 EF 00 00", "BF 40 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("193", "parsed", "NECext", "00 EF 00 00", "C0 3F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("194", "parsed", "NECext", "00 EF 00 00", "C1 3E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("195", "parsed", "NECext", "00 EF 00 00", "C2 3D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("196", "parsed", "NECext", "00 EF 00 00", "C3 3C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("197", "parsed", "NECext", "00 EF 00 00", "C4 3B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("198", "parsed", "NECext", "00 EF 00 00", "C5 3A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("199", "parsed", "NECext", "00 EF 00 00", "C6 39 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("200", "parsed", "NECext", "00 EF 00 00", "C7 38 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("201", "parsed", "NECext", "00 EF 00 00", "C8 37 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("202", "parsed", "NECext", "00 EF 00 00", "C9 36 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("203", "parsed", "NECext", "00 EF 00 00", "CA 35 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("204", "parsed", "NECext", "00 EF 00 00", "CB 34 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("205", "parsed", "NECext", "00 EF 00 00", "CC 33 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("206", "parsed", "NECext", "00 EF 00 00", "CD 32 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("207", "parsed", "NECext", "00 EF 00 00", "CE 31 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("208", "parsed", "NECext", "00 EF 00 00", "CF 30 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("209", "parsed", "NECext", "00 EF 00 00", "D0 2F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("210", "parsed", "NECext", "00 EF 00 00", "D1 2E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("211", "parsed", "NECext", "00 EF 00 00", "D2 2D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("212", "parsed", "NECext", "00 EF 00 00", "D3 2C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("213", "parsed", "NECext", "00 EF 00 00", "D4 2B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("214", "parsed", "NECext", "00 EF 00 00", "D5 2A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("215", "parsed", "NECext", "00 EF 00 00", "D6 29 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("216", "parsed", "NECext", "00 EF 00 00", "D7 28 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("217", "parsed", "NECext", "00 EF 00 00", "D8 27 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("218", "parsed", "NECext", "00 EF 00 00", "D9 26 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("219", "parsed", "NECext", "00 EF 00 00", "DA 25 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("220", "parsed", "NECext", "00 EF 00 00", "DB 24 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("221", "parsed", "NECext", "00 EF 00 00", "DC 23 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("222", "parsed", "NECext", "00 EF 00 00", "DD 22 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("223", "parsed", "NECext", "00 EF 00 00", "DE 21 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("224", "parsed", "NECext", "00 EF 00 00", "DF 20 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("225", "parsed", "NECext", "00 EF 00 00", "E0 1F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("226", "parsed", "NECext", "00 EF 00 00", "E1 1E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("227", "parsed", "NECext", "00 EF 00 00", "E2 1D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("228", "parsed", "NECext", "00 EF 00 00", "E3 1C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("229", "parsed", "NECext", "00 EF 00 00", "E4 1B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("230", "parsed", "NECext", "00 EF 00 00", "E5 1A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("231", "parsed", "NECext", "00 EF 00 00", "E6 19 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("232", "parsed", "NECext", "00 EF 00 00", "E7 18 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("233", "parsed", "NECext", "00 EF 00 00", "E8 17 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("234", "parsed", "NECext", "00 EF 00 00", "E9 16 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("235", "parsed", "NECext", "00 EF 00 00", "EA 15 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("236", "parsed", "NECext", "00 EF 00 00", "EB 14 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("237", "parsed", "NECext", "00 EF 00 00", "EC 13 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("238", "parsed", "NECext", "00 EF 00 00", "ED 12 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("239", "parsed", "NECext", "00 EF 00 00", "EE 11 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("240", "parsed", "NECext", "00 EF 00 00", "EF 10 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("241", "parsed", "NECext", "00 EF 00 00", "F0 0F 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("242", "parsed", "NECext", "00 EF 00 00", "F1 0E 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("243", "parsed", "NECext", "00 EF 00 00", "F2 0D 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("244", "parsed", "NECext", "00 EF 00 00", "F3 0C 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("245", "parsed", "NECext", "00 EF 00 00", "F4 0B 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("246", "parsed", "NECext", "00 EF 00 00", "F5 0A 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("247", "parsed", "NECext", "00 EF 00 00", "F6 09 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("248", "parsed", "NECext", "00 EF 00 00", "F7 08 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("249", "parsed", "NECext", "00 EF 00 00", "F8 07 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("250", "parsed", "NECext", "00 EF 00 00", "F9 06 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("251", "parsed", "NECext", "00 EF 00 00", "FA 05 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("252", "parsed", "NECext", "00 EF 00 00", "FB 04 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("253", "parsed", "NECext", "00 EF 00 00", "FC 03 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("254", "parsed", "NECext", "00 EF 00 00", "FD 02 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("255", "parsed", "NECext", "00 EF 00 00", "FE 01 00 00"));
		this.irLedlighting["LEDStrip"].addButton(new irDeviceButton("256", "parsed", "NECext", "00 EF 00 00", "FF 00 00 00"));
		this.irAll["ledlighting_LEDStrip"] = this.irLedlighting["LEDStrip"];

		this.irLedlighting["LED_44Key"] = new irDevice("LED_44Key");
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Light UP", "parsed", "NEC", "00 00 00 00", "5C 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Light DOWN", "parsed", "NEC", "00 00 00 00", "5D 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Play / Pause", "parsed", "NEC", "00 00 00 00", "41 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Power", "parsed", "NEC", "00 00 00 00", "40 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Red", "parsed", "NEC", "00 00 00 00", "58 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Blue", "parsed", "NEC", "00 00 00 00", "59 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Green", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("White", "parsed", "NEC", "00 00 00 00", "44 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Orange", "parsed", "NEC", "00 00 00 00", "54 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Lime", "parsed", "NEC", "00 00 00 00", "55 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Violet", "parsed", "NEC", "00 00 00 00", "49 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Carnation", "parsed", "NEC", "00 00 00 00", "48 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Tangerine", "parsed", "NEC", "00 00 00 00", "50 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Aquamarine", "parsed", "NEC", "00 00 00 00", "51 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Purple", "parsed", "NEC", "00 00 00 00", "4D 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Carnation", "parsed", "NEC", "00 00 00 00", "4C 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Apricot", "parsed", "NEC", "00 00 00 00", "1C 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Olympic", "parsed", "NEC", "00 00 00 00", "1D 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Lavender", "parsed", "NEC", "00 00 00 00", "1E 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Sea Green", "parsed", "NEC", "00 00 00 00", "1F 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Yellow", "parsed", "NEC", "00 00 00 00", "18 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Teal", "parsed", "NEC", "00 00 00 00", "19 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Pink", "parsed", "NEC", "00 00 00 00", "1A 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Baby Blue", "parsed", "NEC", "00 00 00 00", "1B 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Red UP", "parsed", "NEC", "00 00 00 00", "14 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Green UP", "parsed", "NEC", "00 00 00 00", "15 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Blue UP", "parsed", "NEC", "00 00 00 00", "16 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Quick", "parsed", "NEC", "00 00 00 00", "17 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Red DOWN", "parsed", "NEC", "00 00 00 00", "10 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Green DOWN", "parsed", "NEC", "00 00 00 00", "11 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("Blue DOWN", "parsed", "NEC", "00 00 00 00", "12 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("SLOW", "parsed", "NEC", "00 00 00 00", "13 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 1", "parsed", "NEC", "00 00 00 00", "0C 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 2", "parsed", "NEC", "00 00 00 00", "0D 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 3", "parsed", "NEC", "00 00 00 00", "0E 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("AUTO", "parsed", "NEC", "00 00 00 00", "0F 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 4", "parsed", "NEC", "00 00 00 00", "08 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 5", "parsed", "NEC", "00 00 00 00", "09 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("DIY 6", "parsed", "NEC", "00 00 00 00", "0A 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("FLASH", "parsed", "NEC", "00 00 00 00", "0B 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("JUMP 3", "parsed", "NEC", "00 00 00 00", "04 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("JUMP 7", "parsed", "NEC", "00 00 00 00", "05 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("FADE 3", "parsed", "NEC", "00 00 00 00", "06 00 00 00"));
		this.irLedlighting["LED_44Key"].addButton(new irDeviceButton("FADE 7", "parsed", "NEC", "00 00 00 00", "07 00 00 00"));
		this.irAll["ledlighting_LED_44Key"] = this.irLedlighting["LED_44Key"];

		this.irLedlighting["Light_Strip"] = new irDevice("Light_Strip");
		this.irLedlighting["Light_Strip"].addButton(new irDeviceButton("Lime", "parsed", "NEC", "00 00 00 00", "90 00 00 00"));
		this.irLedlighting["Light_Strip"].addButton(new irDeviceButton("Green_light", "parsed", "NEC", "00 00 00 00", "94 00 00 00"));
		this.irLedlighting["Light_Strip"].addButton(new irDeviceButton("Red_light", "parsed", "NEC", "00 00 00 00", "96 00 00 00"));
		this.irAll["ledlighting_Light_Strip"] = this.irLedlighting["Light_Strip"];

		this.irLedlighting["Practical_Series_2"] = new irDevice("Practical_Series_2");
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Practical_series_2", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("On", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Bright_2", "parsed", "NEC", "00 00 00 00", "46 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Off_3", "parsed", "NEC", "00 00 00 00", "47 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("C_4", "parsed", "NEC", "00 00 00 00", "44 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("5", "parsed", "NEC", "00 00 00 00", "40 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("6", "parsed", "NEC", "00 00 00 00", "43 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("S_7", "parsed", "NEC", "00 00 00 00", "07 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("8", "parsed", "NEC", "00 00 00 00", "15 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("9", "parsed", "NEC", "00 00 00 00", "09 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Red_10", "parsed", "NEC", "00 00 00 00", "16 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Green_11", "parsed", "NEC", "00 00 00 00", "19 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("Blue_12", "parsed", "NEC", "00 00 00 00", "0D 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("13", "parsed", "NEC", "00 00 00 00", "0C 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("14", "parsed", "NEC", "00 00 00 00", "18 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("15", "parsed", "NEC", "00 00 00 00", "5E 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("16", "parsed", "NEC", "00 00 00 00", "08 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("17", "parsed", "NEC", "00 00 00 00", "1C 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("18", "parsed", "NEC", "00 00 00 00", "5A 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("19", "parsed", "NEC", "00 00 00 00", "42 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("20", "parsed", "NEC", "00 00 00 00", "52 00 00 00"));
		this.irLedlighting["Practical_Series_2"].addButton(new irDeviceButton("21", "parsed", "NEC", "00 00 00 00", "4A 00 00 00"));
		this.irAll["ledlighting_Practical_Series_2"] = this.irLedlighting["Practical_Series_2"];

		this.irLedlighting["MonsterIlluminessence_LED"] = new irDevice("MonsterIlluminessence_LED");
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("ON", "parsed", "NECext", "00 EF 00 00", "00 FF 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("OFF", "parsed", "NECext", "00 EF 00 00", "01 FE 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Reset", "parsed", "NECext", "00 EF 00 00", "02 FD 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Cool", "parsed", "NECext", "00 EF 00 00", "04 FB 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Soft", "parsed", "NECext", "00 EF 00 00", "05 FA 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Warm", "parsed", "NECext", "00 EF 00 00", "06 F9 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("DIM_UP", "parsed", "NECext", "00 EF 00 00", "03 FC 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("DIM_DOWN", "parsed", "NECext", "00 EF 00 00", "07 F8 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("RED", "parsed", "NECext", "00 EF 00 00", "08 F7 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Light_RED", "parsed", "NECext", "00 EF 00 00", "09 F6 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Orange", "parsed", "NECext", "00 EF 00 00", "0A F5 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Yellow", "parsed", "NECext", "00 EF 00 00", "0B F4 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Green", "parsed", "NECext", "00 EF 00 00", "0C F3 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Light_Green", "parsed", "NECext", "00 EF 00 00", "0D F2 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Light_Blue", "parsed", "NECext", "00 EF 00 00", "0E F1 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Cyan", "parsed", "NECext", "00 EF 00 00", "0F F0 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Blue", "parsed", "NECext", "00 EF 00 00", "10 EF 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Dark_Blue", "parsed", "NECext", "00 EF 00 00", "11 EE 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Purple", "parsed", "NECext", "00 EF 00 00", "12 ED 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Pink", "parsed", "NECext", "00 EF 00 00", "13 EC 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Flash", "parsed", "NECext", "00 EF 00 00", "14 EB 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Strobe", "parsed", "NECext", "00 EF 00 00", "15 EA 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Fade", "parsed", "NECext", "00 EF 00 00", "16 E9 00 00"));
		this.irLedlighting["MonsterIlluminessence_LED"].addButton(new irDeviceButton("Smooth", "parsed", "NECext", "00 EF 00 00", "17 E8 00 00"));
		this.irAll["ledlighting_MonsterIlluminessence_LED"] = this.irLedlighting["MonsterIlluminessence_LED"];		
	}
	createIrDevicesMiscellaneousDb(){
		this.irMiscellaneous["AMI_Jukebox"] = new irDevice("AMI_Jukebox");
		this.irMiscellaneous["AMI_Jukebox"].addButton(new irDeviceButton("Ami", "parsed", "RC5", "14 00 00 00", "0C 00 00 00"));
		this.irMiscellaneous["AMI_Jukebox"].addButton(new irDeviceButton("Ch_1_vol_up", "parsed", "RC5", "14 00 00 00", "0B 00 00 00"));
		this.irMiscellaneous["AMI_Jukebox"].addButton(new irDeviceButton("Ch_1_vol_down", "parsed", "RC5", "14 00 00 00", "28 00 00 00"));
		this.irMiscellaneous["AMI_Jukebox"].addButton(new irDeviceButton("Ch_2_vol_up", "parsed", "RC5", "14 00 00 00", "11 00 00 00"));
		this.irMiscellaneous["AMI_Jukebox"].addButton(new irDeviceButton("Ch_2_vol_down", "parsed", "RC5", "14 00 00 00", "23 00 00 00"));
		this.irAll["miscellaneous_AMI_Jukebox"] = this.irMiscellaneous["AMI_Jukebox"];

		this.irMiscellaneous["LG"] = new irDevice("LG");
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Power", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Input", "parsed", "NEC", "04 00 00 00", "0B 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Ok", "parsed", "NEC", "04 00 00 00", "44 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Chanel_up", "parsed", "NEC", "04 00 00 00", "00 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Channel_down", "parsed", "NEC", "04 00 00 00", "01 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Up", "parsed", "NEC", "04 00 00 00", "40 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Down", "parsed", "NEC", "04 00 00 00", "41 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Left", "parsed", "NEC", "04 00 00 00", "07 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Right", "parsed", "NEC", "04 00 00 00", "06 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "04 00 00 00", "09 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Volume_up", "parsed", "NEC", "04 00 00 00", "02 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Volume_down", "parsed", "NEC", "04 00 00 00", "03 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Surr_power", "parsed", "NEC", "08 00 00 00", "10 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Surr_up", "parsed", "NEC", "08 00 00 00", "1A 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Surr_down", "parsed", "NEC", "08 00 00 00", "0E 00 00 00"));
		this.irMiscellaneous["LG"].addButton(new irDeviceButton("Surr_mute", "parsed", "NEC", "08 00 00 00", "16 00 00 00"));
		this.irAll["miscellaneous_LG"] = this.irMiscellaneous["LG"];

		this.irMiscellaneous["HDMI_Switch"] = new irDevice("HDMI_Switch");
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Power", "parsed", "NEC", "80 00 00 00", "0C 00 00 00"));
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Hdmi_1", "parsed", "NEC", "80 00 00 00", "01 00 00 00"));
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Hdmi_2", "parsed", "NEC", "80 00 00 00", "03 00 00 00"));
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Hdmi_3", "parsed", "NEC", "80 00 00 00", "07 00 00 00"));
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Hdmi_4", "parsed", "NEC", "80 00 00 00", "09 00 00 00"));
		this.irMiscellaneous["HDMI_Switch"].addButton(new irDeviceButton("Hdmi_5", "parsed", "NEC", "80 00 00 00", "0D 00 00 00"));
		this.irAll["miscellaneous_HDMI_Switch"] = this.irMiscellaneous["HDMI_Switch"];
	}
	createIrDevicesProjectorsDb(){
		this.irProjectors["BenQ"] = new irDevice("BenQ");
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Power", "parsed", "NECext", "40 40 00 00", "0A F5 00 00"));
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Input", "parsed", "NECext", "40 40 00 00", "0C F3 00 00"));
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Vol_u", "parsed", "NECext", "40 40 00 00", "15 EA 00 00"));
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Vol_d", "parsed", "NECext", "40 40 00 00", "1C E3 00 00"));
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Home", "parsed", "NECext", "40 40 00 00", "1A E5 00 00"));
		this.irProjectors["BenQ"].addButton(new irDeviceButton("Back", "parsed", "NECext", "40 40 00 00", "40 BF 00 00"));
		this.irAll["projectors_BenQ"] = this.irProjectors["BenQ"];

		this.irProjectors["LED_Smart_Home_Theater_Projector"] = new irDevice("LED_Smart_Home_Theater_Projector");
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("On", "parsed", "NECext", "08 16 00 00", "87 78 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Src", "parsed", "NECext", "08 16 00 00", "DC 23 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "08 16 00 00", "8A 75 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Back", "parsed", "NECext", "08 16 00 00", "8B 74 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Up", "parsed", "NECext", "08 16 00 00", "84 7B 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Dwn", "parsed", "NECext", "08 16 00 00", "8D 72 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Left", "parsed", "NECext", "08 16 00 00", "BB 44 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Right", "parsed", "NECext", "08 16 00 00", "8E 71 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Ok", "parsed", "NECext", "08 16 00 00", "B2 4D 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Vup", "parsed", "NECext", "08 16 00 00", "89 76 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Vdwn", "parsed", "NECext", "08 16 00 00", "B5 4A 00 00"));
		this.irProjectors["LED_Smart_Home_Theater_Projector"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "08 16 00 00", "C8 37 00 00"));
		this.irAll["projectors_LED_Smart_Home_Theater_Projector"] = this.irProjectors["LED_Smart_Home_Theater_Projector"];

		this.irProjectors["Casio_YT_130"] = new irDevice("Casio_YT_130");
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Power", "parsed", "NECext", "84 F4 00 00", "0B F4 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Input", "parsed", "NECext", "84 F4 00 00", "0A F5 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "84 F4 00 00", "0C F3 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Zoom_up", "parsed", "NECext", "84 F4 00 00", "1B E4 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Zoom_dwn", "parsed", "NECext", "84 F4 00 00", "1A E5 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Focus_up", "parsed", "NECext", "84 F4 00 00", "1D E2 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Focus_dwn", "parsed", "NECext", "84 F4 00 00", "1C E3 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Up", "parsed", "NECext", "84 F4 00 00", "4A B5 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Down", "parsed", "NECext", "84 F4 00 00", "4B B4 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Left", "parsed", "NECext", "84 F4 00 00", "4D B2 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Right", "parsed", "NECext", "84 F4 00 00", "4E B1 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "84 F4 00 00", "4C B3 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Keyst_up", "parsed", "NECext", "84 F4 00 00", "2A D5 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Keyst_d", "parsed", "NECext", "84 F4 00 00", "2D D2 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Auto", "parsed", "NECext", "84 F4 00 00", "5B A4 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Aspect", "parsed", "NECext", "84 F4 00 00", "5C A3 00 00"));
		this.irProjectors["Casio_YT_130"].addButton(new irDeviceButton("Eco", "parsed", "NECext", "84 F4 00 00", "3C C3 00 00"));
		this.irAll["projectors_Casio_YT_130"] = this.irProjectors["Casio_YT_130"];

		this.irProjectors["Epson"] = new irDevice("Epson");
		this.irProjectors["Epson"].addButton(new irDeviceButton("Power", "parsed", "NECext", "83 55 00 00", "90 6F 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Hdmi_1", "parsed", "NECext", "83 55 00 00", "73 8C 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Hdmi_2", "parsed", "NECext", "83 55 00 00", "77 88 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Lan", "parsed", "NECext", "83 55 00 00", "74 8B 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Video", "parsed", "NECext", "83 55 00 00", "70 8F 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Pc", "parsed", "NECext", "83 55 00 00", "9D 62 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Play", "parsed", "NECext", "83 55 00 00", "5E A1 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Pause", "parsed", "NECext", "83 55 00 00", "5B A4 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Stop", "parsed", "NECext", "83 55 00 00", "59 A6 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Vol_down", "parsed", "NECext", "83 55 00 00", "99 66 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Vol_up", "parsed", "NECext", "83 55 00 00", "98 67 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "83 55 00 00", "9A 65 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "83 55 00 00", "85 7A 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Up", "parsed", "NECext", "83 55 00 00", "B0 4F 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Down", "parsed", "NECext", "83 55 00 00", "B2 4D 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Left", "parsed", "NECext", "83 55 00 00", "B3 4C 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Right", "parsed", "NECext", "83 55 00 00", "B1 4E 00 00"));
		this.irProjectors["Epson"].addButton(new irDeviceButton("Home", "parsed", "NECext", "83 55 00 00", "95 6A 00 00"));
		this.irAll["projectors_Epson"] = this.irProjectors["Epson"];
	}
	createIrDevicesSoundbarsDb(){
		this.irSoundbars["Bose_Solo_5"] = new irDevice("Bose_Solo_5");
		this.irSoundbars["Bose_Solo_5"].addButton(new irDeviceButton("Volume_up", "parsed", "NECext", "BA A0 00 00", "03 FC 00 00"));
		this.irSoundbars["Bose_Solo_5"].addButton(new irDeviceButton("Volume_down", "parsed", "NECext", "BA A0 00 00", "02 FD 00 00"));
		this.irSoundbars["Bose_Solo_5"].addButton(new irDeviceButton("Mode_aux", "parsed", "NECext", "BA A0 00 00", "0D F2 00 00"));
		this.irSoundbars["Bose_Solo_5"].addButton(new irDeviceButton("Mode_bt", "parsed", "NECext", "BA A0 00 00", "81 7E 00 00"));
		this.irSoundbars["Bose_Solo_5"].addButton(new irDeviceButton("Power", "parsed", "NECext", "BA A0 00 00", "4C B3 00 00"));
		this.irAll["soundbars_Bose_Solo_5"] = this.irSoundbars["Bose_Solo_5"];

		this.irSoundbars["Amz_snd_bar"] = new irDevice("Amz_snd_bar");
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Power", "parsed", "NEC", "35 00 00 00", "09 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "35 00 00 00", "45 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Vol_dwn", "parsed", "NEC", "35 00 00 00", "1B 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "35 00 00 00", "51 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Play_pause", "parsed", "NEC", "35 00 00 00", "46 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Rca", "parsed", "NEC", "35 00 00 00", "5D 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Aux", "parsed", "NEC", "35 00 00 00", "0E 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Opt", "parsed", "NEC", "35 00 00 00", "0D 00 00 00"));
		this.irSoundbars["Amz_snd_bar"].addButton(new irDeviceButton("Bluetooth", "parsed", "NEC", "35 00 00 00", "10 00 00 00"));
		this.irAll["soundbars_Amz_snd_bar"] = this.irSoundbars["Amz_snd_bar"];

		this.irSoundbars["Soundblasterx"] = new irDevice("Soundblasterx");
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Power", "parsed", "NECext", "83 22 00 00", "08 F7 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "83 22 00 00", "0C F3 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Vol_up", "parsed", "NECext", "83 22 00 00", "0A F5 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Vol_down", "parsed", "NECext", "83 22 00 00", "01 FE 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Play_pause", "parsed", "NECext", "83 22 00 00", "09 F6 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Prev", "parsed", "NECext", "83 22 00 00", "07 F8 00 00"));
		this.irSoundbars["Soundblasterx"].addButton(new irDeviceButton("Next", "parsed", "NECext", "83 22 00 00", "06 F9 00 00"));
		this.irAll["soundbars_Soundblasterx"] = this.irSoundbars["Soundblasterx"];

		this.irSoundbars["Klipsch_Soundbar"] = new irDevice("Klipsch_Soundbar");
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Pwr", "parsed", "NEC", "80 00 00 00", "1E 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "80 00 00 00", "01 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "80 00 00 00", "03 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Vol_dwn", "parsed", "NEC", "80 00 00 00", "06 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Bluetooth", "parsed", "NEC", "80 00 00 00", "0D 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Analog", "parsed", "NEC", "80 00 00 00", "0E 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Digital", "parsed", "NEC", "80 00 00 00", "0C 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("LED", "parsed", "NEC", "80 00 00 00", "1F 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Surround", "parsed", "NEC", "80 00 00 00", "04 00 00 00"));
		this.irSoundbars["Klipsch_Soundbar"].addButton(new irDeviceButton("Dialog", "parsed", "NEC", "80 00 00 00", "2B 00 00 00"));
		this.irAll["soundbars_Klipsch_Soundbar"] = this.irSoundbars["Klipsch_Soundbar"];

		this.irSoundbars["Sony_MHC_GS300AV"] = new irDevice("Sony_MHC_GS300AV");
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Sleep", "parsed", "SIRC15", "10 00 00 00", "60 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Balance Left", "parsed", "SIRC15", "10 00 00 00", "26 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Balance Right", "parsed", "SIRC15", "10 00 00 00", "27 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Power", "parsed", "SIRC15", "10 00 00 00", "15 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Center +", "parsed", "SIRC15", "90 00 00 00", "54 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Center -", "parsed", "SIRC15", "90 00 00 00", "55 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Rear +", "parsed", "SIRC15", "90 00 00 00", "4E 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Rear -", "parsed", "SIRC15", "90 00 00 00", "4F 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Game", "parsed", "SIRC15", "10 00 00 00", "7C 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tape", "parsed", "SIRC15", "10 00 00 00", "23 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Display", "parsed", "SIRC15", "10 00 00 00", "4B 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuning +", "parsed", "SIRC20", "3A 07 00 00", "34 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset +", "parsed", "SIRC20", "3A 07 00 00", "31 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Album +", "parsed", "SIRC15", "11 00 00 00", "67 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Disc +", "parsed", "SIRC15", "11 00 00 00", "3E 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset EQ", "parsed", "SIRC15", "90 00 00 00", "6E 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Groove", "parsed", "SIRC15", "10 00 00 00", "7A 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Vol +", "parsed", "SIRC15", "10 00 00 00", "12 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Vol -", "parsed", "SIRC15", "10 00 00 00", "13 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Surround", "parsed", "SIRC15", "90 00 00 00", "40 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Disc -", "parsed", "SIRC15", "11 00 00 00", "3D 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Album -", "parsed", "SIRC15", "11 00 00 00", "66 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuning -", "parsed", "SIRC20", "3A 07 00 00", "33 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Preset -", "parsed", "SIRC20", "3A 07 00 00", "30 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Play", "parsed", "SIRC20", "3A 07 00 00", "32 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Pause", "parsed", "SIRC20", "3A 07 00 00", "39 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Stop", "parsed", "SIRC20", "3A 07 00 00", "38 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Tuner/Band", "parsed", "SIRC15", "10 00 00 00", "0F 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("CD", "parsed", "SIRC15", "10 00 00 00", "25 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Test Tone", "parsed", "SIRC15", "90 00 00 00", "4A 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("5.1 ch", "parsed", "SIRC15", "10 00 00 00", "7D 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Video (MD)", "parsed", "SIRC15", "10 00 00 00", "22 00 00 00"));
		this.irSoundbars["Sony_MHC_GS300AV"].addButton(new irDeviceButton("Pro Logic", "parsed", "SIRC15", "90 00 00 00", "42 00 00 00"));
		this.irAll["soundbars_Sony_MHC_GS300AV"] = this.irSoundbars["Sony_MHC_GS300AV"];

		this.irSoundbars["Sony_Old_XBR"] = new irDevice("Sony_Old_XBR");
		this.irSoundbars["Sony_Old_XBR"].addButton(new irDeviceButton("Power", "parsed", "SIRC", "01 00 00 00", "15 00 00 00"));
		this.irSoundbars["Sony_Old_XBR"].addButton(new irDeviceButton("Vol_up", "parsed", "SIRC", "01 00 00 00", "12 00 00 00"));
		this.irSoundbars["Sony_Old_XBR"].addButton(new irDeviceButton("Vol_dwn", "parsed", "SIRC", "01 00 00 00", "13 00 00 00"));
		this.irSoundbars["Sony_Old_XBR"].addButton(new irDeviceButton("Mute", "parsed", "SIRC", "01 00 00 00", "14 00 00 00"));
		this.irAll["soundbars_Sony_Old_XBR"] = this.irSoundbars["Sony_Old_XBR"];

		this.irSoundbars["Sony_RDH_GTK33IP"] = new irDevice("Sony_RDH_GTK33IP");
		this.irSoundbars["Sony_RDH_GTK33IP"].addButton(new irDeviceButton("Power", "parsed", "SIRC", "10 00 00 00", "15 00 00 00"));
		this.irSoundbars["Sony_RDH_GTK33IP"].addButton(new irDeviceButton("Vup", "parsed", "SIRC", "10 00 00 00", "12 00 00 00"));
		this.irSoundbars["Sony_RDH_GTK33IP"].addButton(new irDeviceButton("Vdwn", "parsed", "SIRC", "10 00 00 00", "13 00 00 00"));
		this.irSoundbars["Sony_RDH_GTK33IP"].addButton(new irDeviceButton("Func", "parsed", "SIRC15", "90 00 00 00", "69 00 00 00"));
		this.irSoundbars["Sony_RDH_GTK33IP"].addButton(new irDeviceButton("Light", "parsed", "SIRC20", "10 04 00 00", "60 00 00 00"));
		this.irAll["soundbars_Sony_RDH_GTK33IP"] = this.irSoundbars["Sony_RDH_GTK33IP"];

		this.irSoundbars["Vizio_Soundbar"] = new irDevice("Vizio_Soundbar");
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Power", "parsed", "NEC", "00 00 00 00", "40 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Input", "parsed", "NEC", "00 00 00 00", "C9 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Rewind", "parsed", "NEC", "00 00 00 00", "8A 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Play_Pause", "parsed", "NEC", "00 00 00 00", "8E 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "00 00 00 00", "41 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "00 00 00 00", "48 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Vol_dwn", "parsed", "NEC", "00 00 00 00", "45 00 00 00"));
		this.irSoundbars["Vizio_Soundbar"].addButton(new irDeviceButton("Fast_Forward", "parsed", "NEC", "00 00 00 00", "8B 00 00 00"));
		this.irAll["soundbars_Vizio_Soundbar"] = this.irSoundbars["Vizio_Soundbar"];

		this.irSoundbars["Yamaha_RX"] = new irDevice("Yamaha_RX");
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Yamaha_power", "parsed", "NEC", "7E 00 00 00", "2A 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Hdmi_1", "parsed", "NECext", "7A 85 00 00", "47 38 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Hdmi_2", "parsed", "NECext", "7A 85 00 00", "4A 35 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Hdmi_3", "parsed", "NECext", "7A 85 00 00", "4D 32 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Hdmi_4", "parsed", "NECext", "7A 85 00 00", "50 2F 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Hdmi_5", "parsed", "NECext", "7A 85 00 00", "70 0F 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Up", "parsed", "NEC", "7A 00 00 00", "9D 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Left", "parsed", "NEC", "7A 00 00 00", "9F 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Enter", "parsed", "NEC", "7A 00 00 00", "DE 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Right", "parsed", "NEC", "7A 00 00 00", "9E 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Down", "parsed", "NEC", "7A 00 00 00", "9C 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("On_screen", "parsed", "NEC", "7A 00 00 00", "84 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Return", "parsed", "NEC", "7A 00 00 00", "AA 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Option", "parsed", "NECext", "7A 85 00 00", "6B 14 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "7A 00 00 00", "1A 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Vol_down", "parsed", "NEC", "7A 00 00 00", "1B 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "7A 00 00 00", "1C 00 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Pop_upmenu", "parsed", "NECext", "7A 85 00 00", "A4 DB 00 00"));
		this.irSoundbars["Yamaha_RX"].addButton(new irDeviceButton("Display", "parsed", "NECext", "7F 01 00 00", "60 9F 00 00"));
		this.irAll["soundbars_Yamaha_RX"] = this.irSoundbars["Yamaha_RX"];
	}
	createIrDevicesStreamingdevicesDb(){
		this.irStreamingdevices["Apple_TV"] = new irDevice("Apple_TV");
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_ok", "parsed", "NECext", "EE 87 00 00", "04 8E 00 00"));
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_up", "parsed", "NECext", "EE 87 00 00", "0B 8E 00 00"));
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_dwn", "parsed", "NECext", "EE 87 00 00", "0D 8E 00 00"));
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_lft", "parsed", "NECext", "EE 87 00 00", "08 8E 00 00"));
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_right", "parsed", "NECext", "EE 87 00 00", "07 8E 00 00"));
		this.irStreamingdevices["Apple_TV"].addButton(new irDeviceButton("Apple_menu", "parsed", "NECext", "EE 87 00 00", "02 8E 00 00"));
		this.irAll["streamingdevices_Apple_TV"] = this.irStreamingdevices["Apple_TV"];

		this.irStreamingdevices["Roku"] = new irDevice("Roku");
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Power", "parsed", "NECext", "86 05 00 00", "0F F0 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Ok", "parsed", "NECext", "86 05 00 00", "18 E7 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Up", "parsed", "NECext", "86 05 00 00", "42 BD 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Down", "parsed", "NECext", "86 05 00 00", "43 BC 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Left", "parsed", "NECext", "86 05 00 00", "16 E9 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Right", "parsed", "NECext", "86 05 00 00", "15 EA 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("V_up", "parsed", "NECext", "86 05 00 00", "0C F3 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("V_down", "parsed", "NECext", "86 05 00 00", "0D F2 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Back", "parsed", "NECext", "86 05 00 00", "1B E4 00 00"));
		this.irStreamingdevices["Roku"].addButton(new irDeviceButton("Home", "parsed", "NECext", "86 05 00 00", "14 EB 00 00"));
		this.irAll["streamingdevices_Roku"] = this.irStreamingdevices["Roku"];

		this.irStreamingdevices["Roku2"] = new irDevice("Roku2");
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Home", "parsed", "NECext", "EA C2 00 00", "03 FC 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Ok", "parsed", "NECext", "EA C2 00 00", "2A D5 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Left", "parsed", "NECext", "EA C2 00 00", "1E E1 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Right", "parsed", "NECext", "EA C2 00 00", "2D D2 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Up", "parsed", "NECext", "EA C2 00 00", "19 E6 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Down", "parsed", "NECext", "EA C2 00 00", "33 CC 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Rewind", "parsed", "NECext", "EA C2 00 00", "34 CB 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Play", "parsed", "NECext", "EA C2 00 00", "4C B3 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Ff", "parsed", "NECext", "EA C2 00 00", "55 AA 00 00"));
		this.irStreamingdevices["Roku2"].addButton(new irDeviceButton("Back", "parsed", "NECext", "EA C2 00 00", "66 99 00 00"));
		this.irAll["streamingdevices_Roku2"] = this.irStreamingdevices["Roku2"];

		this.irStreamingdevices["Roku_Alternate"] = new irDevice("Roku_Alternate");
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Power", "parsed", "NECext", "EA C7 00 00", "17 E8 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Home", "parsed", "NECext", "EA C7 00 00", "03 FC 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Back", "parsed", "NECext", "EA C7 00 00", "66 99 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Vol_up", "parsed", "NECext", "EA C7 00 00", "0F F0 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Vol_down", "parsed", "NECext", "EA C7 00 00", "10 EF 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "EA C7 00 00", "20 DF 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Up", "parsed", "NECext", "EA C7 00 00", "19 E6 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Down", "parsed", "NECext", "EA C7 00 00", "33 CC 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Left", "parsed", "NECext", "EA C7 00 00", "1E E1 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Right", "parsed", "NECext", "EA C7 00 00", "2D D2 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Ok", "parsed", "NECext", "EA C7 00 00", "2A D5 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Return", "parsed", "NECext", "EA C7 00 00", "78 87 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Star", "parsed", "NECext", "EA C7 00 00", "61 9E 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Rewind", "parsed", "NECext", "EA C7 00 00", "34 CB 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Pause", "parsed", "NECext", "EA C7 00 00", "4C B3 00 00"));
		this.irStreamingdevices["Roku_Alternate"].addButton(new irDeviceButton("Fastforward", "parsed", "NECext", "EA C7 00 00", "55 AA 00 00"));
		this.irAll["streamingdevices_Roku_Alternate"] = this.irStreamingdevices["Roku_Alternate"];
	}
	createIrDevicesTvDb(){
		this.irTv["Hisense_RokuTV"] = new irDevice("Hisense_RokuTV");
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Power", "parsed", "NECext", "86 05 00 00", "0F F0 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Ok", "parsed", "NECext", "86 05 00 00", "18 E7 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Up", "parsed", "NECext", "86 05 00 00", "42 BD 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Down", "parsed", "NECext", "86 05 00 00", "43 BC 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Left", "parsed", "NECext", "86 05 00 00", "16 E9 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Right", "parsed", "NECext", "86 05 00 00", "15 EA 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("V_up", "parsed", "NECext", "86 05 00 00", "0C F3 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("V_down", "parsed", "NECext", "86 05 00 00", "0D F2 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Back", "parsed", "NECext", "86 05 00 00", "1B E4 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Home", "parsed", "NECext", "86 05 00 00", "14 EB 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "04 00 00 00", "09 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Netflix", "parsed", "NEC", "04 00 00 00", "4C 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Hulu", "parsed", "NEC", "04 00 00 00", "5C 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Sleep", "parsed", "NEC", "04 00 00 00", "1A 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Opt", "parsed", "NEC", "04 00 00 00", "0C 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Return", "parsed", "NEC", "04 00 00 00", "41 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Seek_fwd", "parsed", "NEC", "04 00 00 00", "5B 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Rewind", "parsed", "NEC", "04 00 00 00", "4F 00 00 00"));
		this.irTv["Hisense_RokuTV"].addButton(new irDeviceButton("Play", "parsed", "NEC", "04 00 00 00", "42 00 00 00"));
		this.irAll["tv_Hisense_RokuTV"] = this.irTv["Hisense_RokuTV"];

		this.irTv["LG_C1"] = new irDevice("LG_C1");
		this.irTv["LG_C1"].addButton(new irDeviceButton("Power", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Channel_up", "parsed", "NEC", "04 00 00 00", "00 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Channel_dn", "parsed", "NEC", "04 00 00 00", "01 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "04 00 00 00", "02 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Vol_dn", "parsed", "NEC", "04 00 00 00", "03 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Up", "parsed", "NEC", "04 00 00 00", "40 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Down", "parsed", "NEC", "04 00 00 00", "41 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Left", "parsed", "NEC", "04 00 00 00", "07 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Right", "parsed", "NEC", "04 00 00 00", "06 00 00 00"));
		this.irTv["LG_C1"].addButton(new irDeviceButton("Select", "parsed", "NECext", "EE 87 00 00", "5D 00 00 00"));
		this.irAll["tv_LG_C1"] = this.irTv["LG_C1"];

		this.irTv["NEC"] = new irDevice("NEC");
		this.irAll["tv_NEC"] = this.irTv["NEC"];

		this.irTv["Panasonic_TC-P50S2"] = new irDevice("Panasonic_TC-P50S2");
		this.irAll["tv_Panasonic_TC-P50S2"] = this.irTv["Panasonic_TC-P50S2"];

		this.irTv["Philips_32PFL4208T"] = new irDevice("Philips_32PFL4208T");
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Power", "parsed", "RC6", "00 00 00 00", "0C 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Home", "parsed", "RC6", "00 00 00 00", "54 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("1", "parsed", "RC6", "00 00 00 00", "01 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("2", "parsed", "RC6", "00 00 00 00", "02 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("3", "parsed", "RC6", "00 00 00 00", "03 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("4", "parsed", "RC6", "00 00 00 00", "04 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("5", "parsed", "RC6", "00 00 00 00", "05 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("6", "parsed", "RC6", "00 00 00 00", "06 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("7", "parsed", "RC6", "00 00 00 00", "07 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("8", "parsed", "RC6", "00 00 00 00", "08 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("9", "parsed", "RC6", "00 00 00 00", "09 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("0", "parsed", "RC6", "00 00 00 00", "00 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Teletext", "parsed", "RC6", "00 00 00 00", "3C 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Format", "parsed", "RC6", "00 00 00 00", "F5 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Subtitle", "parsed", "RC6", "00 00 00 00", "4B 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Options", "parsed", "RC6", "00 00 00 00", "40 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("SmartTV", "parsed", "RC6", "00 00 00 00", "BE 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Source", "parsed", "RC6", "00 00 00 00", "38 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Rewind", "parsed", "RC6", "00 00 00 00", "2B 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Play", "parsed", "RC6", "00 00 00 00", "2C 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Pause", "parsed", "RC6", "00 00 00 00", "30 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("FastForward", "parsed", "RC6", "00 00 00 00", "28 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Record", "parsed", "RC6", "00 00 00 00", "37 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Stop", "parsed", "RC6", "00 00 00 00", "31 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Menu", "parsed", "RC6", "00 00 00 00", "54 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Exit", "parsed", "RC6", "00 00 00 00", "41 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Vol_Up", "parsed", "RC6", "00 00 00 00", "10 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Vol_Down", "parsed", "RC6", "00 00 00 00", "11 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Ch_Up", "parsed", "RC6", "00 00 00 00", "4C 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Ch_Down", "parsed", "RC6", "00 00 00 00", "4D 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Up", "parsed", "RC6", "00 00 00 00", "58 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Down", "parsed", "RC6", "00 00 00 00", "59 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Left", "parsed", "RC6", "00 00 00 00", "5A 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Right", "parsed", "RC6", "00 00 00 00", "5B 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Mute", "parsed", "RC6", "00 00 00 00", "0D 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Back", "parsed", "RC6", "00 00 00 00", "0A 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("DVR", "parsed", "RC6", "00 00 00 00", "D2 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Guide", "parsed", "RC6", "00 00 00 00", "CC 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Info", "parsed", "RC6", "00 00 00 00", "0F 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Red", "parsed", "RC6", "00 00 00 00", "6D 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Green", "parsed", "RC6", "00 00 00 00", "6E 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Yellow", "parsed", "RC6", "00 00 00 00", "6F 00 00 00"));
		this.irTv["Philips_32PFL4208T"].addButton(new irDeviceButton("Blue", "parsed", "RC6", "00 00 00 00", "70 00 00 00"));
		this.irAll["tv_Philips_32PFL4208T"] = this.irTv["Philips_32PFL4208T"];

		this.irTv["Samsung"] = new irDevice("Samsung");
		this.irTv["Samsung"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "07 00 00 00", "02 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Up", "parsed", "Samsung32", "07 00 00 00", "60 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Left", "parsed", "Samsung32", "07 00 00 00", "65 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Select", "parsed", "Samsung32", "07 00 00 00", "68 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Right", "parsed", "Samsung32", "07 00 00 00", "62 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Down", "parsed", "Samsung32", "07 00 00 00", "61 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Menu", "parsed", "Samsung32", "07 00 00 00", "1A 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Source", "parsed", "Samsung32", "07 00 00 00", "01 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Return", "parsed", "Samsung32", "07 00 00 00", "58 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Exit", "parsed", "Samsung32", "07 00 00 00", "2D 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Vol_up", "parsed", "Samsung32", "07 00 00 00", "07 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Vol_down", "parsed", "Samsung32", "07 00 00 00", "0B 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Mute", "parsed", "Samsung32", "07 00 00 00", "0F 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Smarthub", "parsed", "Samsung32", "07 00 00 00", "79 00 00 00"));
		this.irTv["Samsung"].addButton(new irDeviceButton("Info", "parsed", "Samsung32", "07 00 00 00", "1F 00 00 00"));
		this.irAll["tv_Samsung"] = this.irTv["Samsung"];

		this.irTv["Samsung_BN59"] = new irDevice("Samsung_BN59");
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "07 00 00 00", "E6 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Source", "parsed", "Samsung32", "07 00 00 00", "01 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Up", "parsed", "Samsung32", "07 00 00 00", "60 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Down", "parsed", "Samsung32", "07 00 00 00", "61 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Left", "parsed", "Samsung32", "07 00 00 00", "65 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Right", "parsed", "Samsung32", "07 00 00 00", "62 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("OK", "parsed", "Samsung32", "07 00 00 00", "68 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Return", "parsed", "Samsung32", "07 00 00 00", "58 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Exit", "parsed", "Samsung32", "07 00 00 00", "2D 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Home", "parsed", "Samsung32", "07 00 00 00", "79 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("Mute", "parsed", "Samsung32", "07 00 00 00", "0F 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("VolUp", "parsed", "Samsung32", "07 00 00 00", "07 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("VolDown", "parsed", "Samsung32", "07 00 00 00", "0B 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("ChanUp", "parsed", "Samsung32", "07 00 00 00", "12 00 00 00"));
		this.irTv["Samsung_BN59"].addButton(new irDeviceButton("ChanDown", "parsed", "Samsung32", "07 00 00 00", "10 00 00 00"));
		this.irAll["tv_Samsung_BN59"] = this.irTv["Samsung_BN59"];

		this.irTv["Samsung_BN5901301A"] = new irDevice("Samsung_BN5901301A");
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "07 00 00 00", "02 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Source", "parsed", "Samsung32", "07 00 00 00", "01 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Vol_up", "parsed", "Samsung32", "07 00 00 00", "07 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Vol_dwn", "parsed", "Samsung32", "07 00 00 00", "0B 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Mute", "parsed", "Samsung32", "07 00 00 00", "0F 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Chan_list", "parsed", "Samsung32", "07 00 00 00", "6B 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Chan_up", "parsed", "Samsung32", "07 00 00 00", "12 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Chan_dwn", "parsed", "Samsung32", "07 00 00 00", "10 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Home", "parsed", "Samsung32", "07 00 00 00", "79 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Guide", "parsed", "Samsung32", "07 00 00 00", "4F 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Sleep", "parsed", "Samsung32", "07 00 00 00", "03 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Settings", "parsed", "Samsung32", "07 00 00 00", "1A 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Info", "parsed", "Samsung32", "07 00 00 00", "1F 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Return", "parsed", "Samsung32", "07 00 00 00", "58 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Exit", "parsed", "Samsung32", "07 00 00 00", "2D 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Select", "parsed", "Samsung32", "07 00 00 00", "68 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Up", "parsed", "Samsung32", "07 00 00 00", "60 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Down", "parsed", "Samsung32", "07 00 00 00", "61 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Left", "parsed", "Samsung32", "07 00 00 00", "65 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Right", "parsed", "Samsung32", "07 00 00 00", "62 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("1", "parsed", "Samsung32", "07 00 00 00", "04 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("2", "parsed", "Samsung32", "07 00 00 00", "05 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("3", "parsed", "Samsung32", "07 00 00 00", "06 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("4", "parsed", "Samsung32", "07 00 00 00", "08 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("5", "parsed", "Samsung32", "07 00 00 00", "09 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("6", "parsed", "Samsung32", "07 00 00 00", "0A 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("7", "parsed", "Samsung32", "07 00 00 00", "0C 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("8", "parsed", "Samsung32", "07 00 00 00", "0D 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("9", "parsed", "Samsung32", "07 00 00 00", "0E 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("0", "parsed", "Samsung32", "07 00 00 00", "11 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Dash", "parsed", "Samsung32", "07 00 00 00", "23 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Prev_chan", "parsed", "Samsung32", "07 00 00 00", "13 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("A", "parsed", "Samsung32", "07 00 00 00", "6C 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("B", "parsed", "Samsung32", "07 00 00 00", "14 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("C", "parsed", "Samsung32", "07 00 00 00", "15 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("D", "parsed", "Samsung32", "07 00 00 00", "16 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Play", "parsed", "Samsung32", "07 00 00 00", "47 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Stop", "parsed", "Samsung32", "07 00 00 00", "46 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Pause", "parsed", "Samsung32", "07 00 00 00", "4A 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Rewind", "parsed", "Samsung32", "07 00 00 00", "45 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Fast_fwd", "parsed", "Samsung32", "07 00 00 00", "48 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("CC", "parsed", "Samsung32", "07 00 00 00", "25 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("Pic_size", "parsed", "Samsung32", "07 00 00 00", "3E 00 00 00"));
		this.irTv["Samsung_BN5901301A"].addButton(new irDeviceButton("E_manual", "parsed", "Samsung32", "07 00 00 00", "3F 00 00 00"));
		this.irAll["tv_Samsung_BN5901301A"] = this.irTv["Samsung_BN5901301A"];

		this.irTv["Samsung_E6"] = new irDevice("Samsung_E6");
		this.irTv["Samsung_E6"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "07 00 00 00", "E6 00 00 00"));
		this.irAll["tv_Samsung_E6"] = this.irTv["Samsung_E6"];

		this.irTv["Samsung_TV"] = new irDevice("Samsung_TV");
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Power", "parsed", "Samsung32", "07 00 00 00", "E6 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Source", "parsed", "Samsung32", "07 00 00 00", "01 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Mute", "parsed", "Samsung32", "07 00 00 00", "0F 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Vol_up", "parsed", "Samsung32", "07 00 00 00", "07 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Vol_down", "parsed", "Samsung32", "07 00 00 00", "0B 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_left", "parsed", "Samsung32", "07 00 00 00", "65 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_up", "parsed", "Samsung32", "07 00 00 00", "60 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_right", "parsed", "Samsung32", "07 00 00 00", "62 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_down", "parsed", "Samsung32", "07 00 00 00", "61 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_back", "parsed", "Samsung32", "07 00 00 00", "58 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_home", "parsed", "Samsung32", "07 00 00 00", "79 00 00 00"));
		this.irTv["Samsung_TV"].addButton(new irDeviceButton("Menu_enter", "parsed", "Samsung32", "07 00 00 00", "68 00 00 00"));
		this.irAll["tv_Samsung_TV"] = this.irTv["Samsung_TV"];

		this.irTv["Sharp_Roku_TV"] = new irDevice("Sharp_Roku_TV");
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Power", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Back", "parsed", "NEC", "04 00 00 00", "04 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Home", "parsed", "NEC", "04 00 00 00", "43 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("V+", "parsed", "NEC", "04 00 00 00", "02 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("V-", "parsed", "NEC", "04 00 00 00", "03 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "04 00 00 00", "09 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Up", "parsed", "NEC", "04 00 00 00", "56 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Down", "parsed", "NEC", "04 00 00 00", "57 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Left", "parsed", "NEC", "04 00 00 00", "58 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Right", "parsed", "NEC", "04 00 00 00", "59 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Ok", "parsed", "NEC", "04 00 00 00", "5A 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Again", "parsed", "NEC", "04 00 00 00", "41 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Sleep", "parsed", "NEC", "04 00 00 00", "1A 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Star", "parsed", "NEC", "04 00 00 00", "0C 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Rewind", "parsed", "NEC", "04 00 00 00", "4F 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Play Pause", "parsed", "NEC", "04 00 00 00", "42 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Fast Forward", "parsed", "NEC", "04 00 00 00", "5B 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Netflix", "parsed", "NEC", "04 00 00 00", "4C 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Hulu", "parsed", "NEC", "04 00 00 00", "5C 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Sling", "parsed", "NEC", "04 00 00 00", "45 00 00 00"));
		this.irTv["Sharp_Roku_TV"].addButton(new irDeviceButton("Now", "parsed", "NEC", "04 00 00 00", "67 00 00 00"));
		this.irAll["tv_Sharp_Roku_TV"] = this.irTv["Sharp_Roku_TV"];

		this.irTv["Sony_Bravia"] = new irDevice("Sony_Bravia");
		this.irTv["Sony_Bravia"].addButton(new irDeviceButton("Power", "parsed", "SIRC", "01 00 00 00", "15 00 00 00"));
		this.irTv["Sony_Bravia"].addButton(new irDeviceButton("Vol_up", "parsed", "SIRC", "01 00 00 00", "12 00 00 00"));
		this.irTv["Sony_Bravia"].addButton(new irDeviceButton("Vol_down", "parsed", "SIRC", "01 00 00 00", "13 00 00 00"));
		this.irAll["tv_Sony_Bravia"] = this.irTv["Sony_Bravia"];

		this.irTv["Sony_XBR"] = new irDevice("Sony_XBR");
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("On", "parsed", "SIRC", "01 00 00 00", "2E 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Off", "parsed", "SIRC", "01 00 00 00", "2F 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Menu", "parsed", "SIRC", "01 00 00 00", "60 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Up", "parsed", "SIRC", "01 00 00 00", "74 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Left", "parsed", "SIRC", "01 00 00 00", "34 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Ok", "parsed", "SIRC", "01 00 00 00", "65 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Right", "parsed", "SIRC", "01 00 00 00", "33 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Down", "parsed", "SIRC", "01 00 00 00", "75 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Input", "parsed", "SIRC", "01 00 00 00", "25 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Exit", "parsed", "SIRC15", "97 00 00 00", "23 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Vol_up", "parsed", "SIRC", "01 00 00 00", "12 00 00 00"));
		this.irTv["Sony_XBR"].addButton(new irDeviceButton("Vol_down", "parsed", "SIRC", "01 00 00 00", "13 00 00 00"));
		this.irAll["tv_Sony_XBR"] = this.irTv["Sony_XBR"];

		this.irTv["Sony_XBR_RMT-TX200U"] = new irDevice("Sony_XBR_RMT-TX200U");
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Power", "parsed", "SIRC", "01 00 00 00", "15 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Input", "parsed", "SIRC", "01 00 00 00", "25 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Vol_up", "parsed", "SIRC", "01 00 00 00", "12 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Vol_down", "parsed", "SIRC", "01 00 00 00", "13 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Ch_up", "parsed", "SIRC", "01 00 00 00", "10 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Ch_down", "parsed", "SIRC", "01 00 00 00", "11 00 00 00"));
		this.irTv["Sony_XBR_RMT-TX200U"].addButton(new irDeviceButton("Mute", "parsed", "SIRC", "01 00 00 00", "14 00 00 00"));
		this.irAll["tv_Sony_XBR_RMT-TX200U"] = this.irTv["Sony_XBR_RMT-TX200U"];

		this.irTv["Sunbrite"] = new irDevice("Sunbrite");
		this.irTv["Sunbrite"].addButton(new irDeviceButton("On", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Off", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Menu", "parsed", "NEC", "04 00 00 00", "1D 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Exit", "parsed", "NEC", "04 00 00 00", "49 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Up", "parsed", "NEC", "04 00 00 00", "45 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Left", "parsed", "NEC", "04 00 00 00", "47 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Ok", "parsed", "NEC", "04 00 00 00", "44 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Right", "parsed", "NEC", "04 00 00 00", "48 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Down", "parsed", "NEC", "04 00 00 00", "46 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Source", "parsed", "NEC", "04 00 00 00", "2F 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "02 00 00 00", "1F 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Vol_down", "parsed", "NEC", "02 00 00 00", "1E 00 00 00"));
		this.irTv["Sunbrite"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "02 00 00 00", "1C 00 00 00"));
		this.irAll["tv_Sunbrite"] = this.irTv["Sunbrite"];

		this.irTv["TCL_32S327"] = new irDevice("TCL_32S327");
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Power", "parsed", "NECext", "EA C7 00 00", "17 E8 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Vup", "parsed", "NECext", "EA C7 00 00", "0F F0 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Vdwn", "parsed", "NECext", "EA C7 00 00", "10 EF 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "EA C7 00 00", "2A D5 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Up", "parsed", "NECext", "EA C7 00 00", "19 E6 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Dwn", "parsed", "NECext", "EA C7 00 00", "33 CC 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Rt", "parsed", "NECext", "EA C7 00 00", "2D D2 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Lft", "parsed", "NECext", "EA C7 00 00", "1E E1 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Home", "parsed", "NECext", "EA C7 00 00", "03 FC 00 00"));
		this.irTv["TCL_32S327"].addButton(new irDeviceButton("Exit", "parsed", "NECext", "EA C7 00 00", "66 99 00 00"));
		this.irAll["tv_TCL_32S327"] = this.irTv["TCL_32S327"];

		this.irTv["TCL_UnknownModel1"] = new irDevice("TCL_UnknownModel1");
		this.irAll["tv_TCL_UnknownModel1"] = this.irTv["TCL_UnknownModel1"];

		this.irTv["TCL_UnknownModel2"] = new irDevice("TCL_UnknownModel2");
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Power", "parsed", "NECext", "EA C7 00 00", "17 E8 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Home", "parsed", "NECext", "EA C7 00 00", "03 FC 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Left", "parsed", "NECext", "EA C7 00 00", "1E E1 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Select", "parsed", "NECext", "EA C7 00 00", "2A D5 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Right", "parsed", "NECext", "EA C7 00 00", "2D D2 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "EA C7 00 00", "20 DF 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Vol_up", "parsed", "NECext", "EA C7 00 00", "0F F0 00 00"));
		this.irTv["TCL_UnknownModel2"].addButton(new irDeviceButton("Vol_down", "parsed", "NECext", "EA C7 00 00", "10 EF 00 00"));
		this.irAll["tv_TCL_UnknownModel2"] = this.irTv["TCL_UnknownModel2"];

		this.irTv["Toshiba_32AV502U"] = new irDevice("Toshiba_32AV502U");
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Power", "parsed", "NEC", "40 00 00 00", "12 00 00 00"));
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "40 00 00 00", "1A 00 00 00"));
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Vol_down", "parsed", "NEC", "40 00 00 00", "1E 00 00 00"));
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "40 00 00 00", "10 00 00 00"));
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Info", "parsed", "NEC", "40 00 00 00", "1C 00 00 00"));
		this.irTv["Toshiba_32AV502U"].addButton(new irDeviceButton("Input", "parsed", "NEC", "40 00 00 00", "0F 00 00 00"));
		this.irAll["tv_Toshiba_32AV502U"] = this.irTv["Toshiba_32AV502U"];

		this.irTv["Vizio"] = new irDevice("Vizio");
		this.irTv["Vizio"].addButton(new irDeviceButton("Power", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Input", "parsed", "NEC", "04 00 00 00", "2F 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Vol_up", "parsed", "NEC", "04 00 00 00", "02 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Vol_down", "parsed", "NEC", "04 00 00 00", "03 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Ch_up", "parsed", "NEC", "04 00 00 00", "00 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Ch_down", "parsed", "NEC", "04 00 00 00", "01 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "04 00 00 00", "09 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Up", "parsed", "NEC", "04 00 00 00", "45 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Down", "parsed", "NEC", "04 00 00 00", "46 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Right", "parsed", "NEC", "04 00 00 00", "48 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Left", "parsed", "NEC", "04 00 00 00", "47 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Home", "parsed", "NEC", "04 00 00 00", "2D 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Back", "parsed", "NEC", "04 00 00 00", "4A 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Menu", "parsed", "NEC", "04 00 00 00", "4F 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Previous", "parsed", "NEC", "04 00 00 00", "1A 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Info", "parsed", "NEC", "04 00 00 00", "1B 00 00 00"));
		this.irTv["Vizio"].addButton(new irDeviceButton("Enter", "parsed", "NEC", "04 00 00 00", "44 00 00 00"));
		this.irAll["tv_Vizio"] = this.irTv["Vizio"];

		this.irTv["Westinghouse"] = new irDevice("Westinghouse");
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Power", "parsed", "NECext", "02 7D 00 00", "46 B9 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("V_up", "parsed", "NECext", "02 7D 00 00", "0C F3 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("V_dwn", "parsed", "NECext", "02 7D 00 00", "19 E6 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Up", "parsed", "NECext", "02 7D 00 00", "48 B7 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Dwn", "parsed", "NECext", "02 7D 00 00", "4D B2 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Rt", "parsed", "NECext", "02 7D 00 00", "49 B6 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Lft", "parsed", "NECext", "02 7D 00 00", "4E B1 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Enter", "parsed", "NECext", "02 7D 00 00", "4A B5 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Exit", "parsed", "NECext", "02 7D 00 00", "0D F2 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Mute", "parsed", "NECext", "02 7D 00 00", "4C B3 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Source", "parsed", "NECext", "02 7D 00 00", "4B B4 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "02 7D 00 00", "45 BA 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Ch_up", "parsed", "NECext", "02 7D 00 00", "0F F0 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Ch_dwn", "parsed", "NECext", "02 7D 00 00", "5A A5 00 00"));
		this.irTv["Westinghouse"].addButton(new irDeviceButton("Return", "parsed", "NECext", "02 7D 00 00", "16 E9 00 00"));
		this.irAll["tv_Westinghouse"] = this.irTv["Westinghouse"];

		this.irTv["APEX_LE4643T_TV"] = new irDevice("APEX_LE4643T_TV");
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Input", "parsed", "NECext", "00 7F 00 00", "53 AC 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Up", "parsed", "NECext", "00 7F 00 00", "5E A1 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Right", "parsed", "NECext", "00 7F 00 00", "58 A7 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Left", "parsed", "NECext", "00 7F 00 00", "5B A4 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Down", "parsed", "NECext", "00 7F 00 00", "56 A9 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Center", "parsed", "NECext", "00 7F 00 00", "50 AF 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("2", "parsed", "NECext", "00 7F 00 00", "06 F9 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("5", "parsed", "NECext", "00 7F 00 00", "07 F8 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("8", "parsed", "NECext", "00 7F 00 00", "02 FD 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("0", "parsed", "NECext", "00 7F 00 00", "1A E5 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Power", "parsed", "NECext", "00 7F 00 00", "0A F5 00 00"));
		this.irTv["APEX_LE4643T_TV"].addButton(new irDeviceButton("Menu", "parsed", "NECext", "00 7F 00 00", "5A A5 00 00"));
		this.irAll["tv_APEX_LE4643T_TV"] = this.irTv["APEX_LE4643T_TV"];

		this.irTv["LG_55UN7300AUD"] = new irDevice("LG_55UN7300AUD");
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Power", "parsed", "NEC", "04 00 00 00", "08 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Mute", "parsed", "NEC", "04 00 00 00", "09 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("VolumeDown", "parsed", "NEC", "04 00 00 00", "03 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("VolumeUp", "parsed", "NEC", "04 00 00 00", "02 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Home", "parsed", "NEC", "04 00 00 00", "7C 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Back", "parsed", "NEC", "04 00 00 00", "28 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Guide", "parsed", "NEC", "04 00 00 00", "AB 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Netflix", "parsed", "NEC", "04 00 00 00", "56 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("PrimeVideo", "parsed", "NEC", "04 00 00 00", "5C 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Settings", "parsed", "NEC", "04 00 00 00", "43 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Play", "parsed", "NEC", "04 00 00 00", "B0 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Pause", "parsed", "NEC", "04 00 00 00", "BA 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("ChanUp", "parsed", "NEC", "04 00 00 00", "00 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("ChanDown", "parsed", "NEC", "04 00 00 00", "01 00 00 00"));
		this.irTv["LG_55UN7300AUD"].addButton(new irDeviceButton("Input", "parsed", "NEC", "04 00 00 00", "0B 00 00 00"));
		this.irAll["tv_LG_55UN7300AUD"] = this.irTv["LG_55UN7300AUD"];

		
		
	}


}

	