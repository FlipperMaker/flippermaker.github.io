//https://github.com/travisgoodspeed/goodwatch/blob/e4da908f0d872edcfc6c9f4ef529755184933ea2/firmware/apps/jukebox.c
class subghzSubghzShare{
	constructor() {
		this.cardSpanName = 'cardtoolSubghzShare';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">Subghz Share</h5>
			  </div>
			  <div class="card-body">
				<form id="generateSubghzShare">
				  <div class="mb-3">
					<label for="nameSubghzShare" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameSubghzShare">
					<div id="nameHelpSubghzShare" class="form-text">Do not include ".sub" It will be added automatically. A blank name will automatically be named "NoName" for "File Contents" or as the file name from github.</div>
				  </div>
				  <div class="mb-3">
					<label for="filecontentSubghzShare" class="form-label">Sub File Contents</label>
					<textarea class="form-control" id="filecontentSubghzShare" rows="5" placeholder=""></textarea>
					<div id="filecontentHelpSubghzShare" class="form-text"></div>
				  </div>
				  <center><strong>-OR-</strong></center>
				  <div class="mb-3">
					<label for="githuburlSubghzShare" class="form-label">GitHub Sub File</label>
					<input type="text" class="form-control" id="githuburlSubghzShare" placeholder="https://github.com/.../file.sub">
					<div id="githuburlHelpSubghzShare" class="form-text"></div>
				  </div>
				  <button id="loadgithubSubghzShare" type="button" class="btn btn-success">Load GitHub</button>
				  <button id="examplegithubSubghzShare" type="button" class="btn btn-secondary">Example GitHub</button>
				  <!--<button id="examplefilecontentSubghzShare" type="button" class="btn btn-success">Example File Contents</button>-->
				  <br /><br />
				  <button id="generateSubghzShare" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetSubghzShare" type="reset" class="btn btn-primary">Reset</button>

				</form>
			  </div>
			</div>		
		`;
		this.textArea = `Filetype: Flipper SubGhz RAW File
Version: 1
Frequency: 318000000
Preset: FuriHalSubGhzPresetOok650Async
Protocol: RAW
RAW_Data: -754 361 -17246 131 -8734 65 -71908...
		`;
		
		
		//var a = this.getTextFromUrl("https://raw.githubusercontent.com/UberGuidoZ/Flipper/main/Sub-GHz/Tesla_charge_AM650.sub");
		//this.getBlobTextFromUrl("https://api.github.com/repos/UberGuidoZ/Flipper/git/blobs/8ebc42d06134572f86b71de161c34fcf9be3cd52");
		
		//console.log(a);
	}
	getTextFromUrl(urlInput){
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				console.log(file_text)
			});
		});
	}
	loadGithubFile(urlInput){
		if(cleanString(urlInput).length == 0){return;}
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				document.getElementById("generateSubghzShare").elements["filecontentSubghzShare"].value = file_text;
			});
		});
	}
	getBlobTextFromUrl(urlInput){
		this.getJSON(urlInput, function(err, data) {
			if (err !== null) {
				alert('Something went wrong: ' + err);
			} else {
				const x = new Response(data.content).text()
				console.log(x);
			}
		});
	}
	logBlob(){
		
	}
	getJSON(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
		  var status = xhr.status;
		  if (status === 200) {
			callback(null, xhr.response);
		  } else {
			callback(status, xhr.response);
		  }
		};
		xhr.send();
	}
	
	getForm(){
		return document.getElementById("generateSubghzShare");
	}
	getFormFileName(getValue = false){
		return (getValue ? replaceSpace(this.getForm().elements["nameSubghzShare"].value, "_") : this.getForm().elements["nameSubghzShare"]);
	}
	getFormFileContent(getValue = false){
		return (getValue ? this.getForm().elements["filecontentSubghzShare"].value : this.getForm().elements["filecontentSubghzShare"]);
	}
	getFormGithubUrl(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["githuburlSubghzShare"].value) : this.getForm().elements["githuburlSubghzShare"]);
	}
	getFormLoadButtonGithub(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["loadgithubSubghzShare"].value) : this.getForm().elements["loadgithubSubghzShare"]);
	}
	getFormExampleButtonGithub(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["examplegithubSubghzShare"].value) : this.getForm().elements["examplegithubSubghzShare"]);
	}
	getFormExampleButtonFileContent(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["examplefilecontentSubghzShare"].value) : this.getForm().elements["examplefilecontentSubghzShare"]);
	}
	
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.getFormFileContent().placeholder = this.textArea;
		this.getFormExampleButtonGithub().addEventListener("click", (event) => {
			event.preventDefault();
			this.getForm().elements["githuburlSubghzShare"].value = "https://github.com/UberGuidoZ/Flipper/blob/main/Sub-GHz/Tesla_charge_AM650.sub";
		});
		this.getFormLoadButtonGithub().addEventListener("click", (event) => {
			document.getElementById("generateSubghzShare").elements["filecontentSubghzShare"].value = 'Loading...';
			event.preventDefault();
			this.loadGithubFile(this.fixGithubUrl());
			
		});
		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			if(this.getFormFileName(true).trim() == ""){
				this.getForm().elements["nameSubghzShare"].value = "NoName";
			}	

			setTextGenerateModal("Name: " + this.getFormFileName(true) + ".sub");
			var downloadButton = this.genDownloadButton();
			if(this.getFormFileContent(true).trim() == "" || downloadButton.trim() == ""){
				setTextGenerateModal('"Sub File Contents" Can\'t be empty. Please input data or load a GitHub URL.');
				
			}else{
				setButtonGenerateModal(downloadButton);
			}
			
			//setTextGenerateModal("Name: " + this.getFormFileName(true) + ".sub");
			//appendTextGenerateModal("Pin: " + (bruteForce ? "Brute Force" : pinSubghzShare));
			generateModal.show(); 
		});		
		
	}
	fixGithubUrl(){
		var ret = '';
		var githuburl = this.getFormGithubUrl(true);
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("https://pastebin.com/raw/")){ return githuburl; }
		if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replace("github.com", "raw.githubusercontent.com"); }
		if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
		if (githuburl.includes("http://")){ githuburl = githuburl.replace("http://", ""); }
		if (githuburl.includes("/blob")){ githuburl = githuburl.replace("/blob", ""); }
		var fileType = githuburl.slice(githuburl.length-4,githuburl.length).toLowerCase();
		if (fileType != ".sub"){ console.log('bad type'); githuburl = ""; }
		var ghFileName = githuburl.slice(githuburl.lastIndexOf('/')+1,githuburl.length).toLowerCase();
		if(this.getFormFileName(true).trim().length == 0){this.getForm().elements["nameSubghzShare"].value = ghFileName.replace('.sub', '');}
		if(this.getFormFileName(true).trim() == "NoName"){this.getForm().elements["nameSubghzShare"].value = ghFileName.replace('.sub', '');}
		return githuburl;
	}
	parseFileContentsToUrl(){
		var fc = this.getFormFileContent(true).trim();
		if(fc.length == 0){ return '#'; }
		fc = fc.split('\n');
		var returnUrlCheck = "https://dev.flpr.app/s#path=subghz%2F"+this.getFormFileName(true)+".sub";
		var returnUrl = "https://dev.flpr.app/s#path=subghz%2F"+this.getFormFileName(true)+".sub";
		fc.forEach( i => {
			if(!i.includes(':')){return ""}
			var fcline = i.split(':');
			var fclineA = fcline[0].trim();
			var fclineB = fcline[1].trim();
			fclineB = fclineB.replaceAll("+","%2B");
			fclineB = fclineB.replaceAll("-","%2D");
			//fclineB = fclineB.replaceAll("/","%2F");
			//fclineB = fclineB.replaceAll(" ","%20");
			fclineB = fclineB.replaceAll(" ","+");
			returnUrl = returnUrl + "&" + fclineA + "=" + fclineB
		});
		if(returnUrlCheck == returnUrl){return "";}
		return returnUrl;
	}

	getButtonSub(nameSubghzShare, ook){
		var ret = ookToSubRaw(nameSubghzShare, "Flipper SubGhz RAW File", 1, 433920000, "FuriHalSubGhzPresetOok650Async", "RAW", 566, 566, 1, 0, ook);
		return ret;
	}
	
	genUrlSubghzShare(keyNameInput, btnInput){
		//keyName, fileType, version, frequency, preset, protocol, rawDataFormatted_Array, prefix = "RAW_Data"
		var url = genUrlSub_Raw(keyNameInput, btnInput.subghzFiletype, btnInput.subghzVersion, 
								btnInput.subghzFrequency, btnInput.subghzPreset, btnInput.subghzProtocol, 
								btnInput.subghzRAW_Data_ArrayChunkedFormatted);
		return url;
	}


	genDownloadButton() {
		var shortName = this.getFormFileName(true);
		var url = this.parseFileContentsToUrl();
		console.log(url);
		if(url == ''){return "";}
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		var returnUrl =
			'<a href="'+url+'" class="btn btn-primary" target="_blank">Download ' + shortName + ".sub</a>";
		return returnUrl;
	}
}

