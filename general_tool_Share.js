class generaltoolShare{
	constructor() {
		this.cardSpanName = 'cardtoolShare';
		this.cardCode = `
			<div class="card mb-3">
			  <div class="card-header text-center">
				<h5 class="card-title">File Install/Share (Tool-General)</h5>
			  </div>
			  <div class="card-body">
				<form id="generateToolShare">
				  <div class="mb-3">
					<label for="nameFormToolShare" class="form-label">File Name</label>
					<input type="text" class="form-control" id="nameFormToolShare">
					<div id="nameHelpToolShare" class="form-text">Do not include the file extension. It will be added automatically based on the file extension selected below. A blank name will automatically be named "NoName" for "File Contents" or as the file name from github.</div>
				  </div>
				  <div class="mb-3">
					<label for="filecontentFormToolShare" class="form-label">Sub File Contents</label>
					<textarea class="form-control" id="filecontentFormToolShare" rows="5" placeholder=""></textarea>
					<div id="filecontentHelpToolShare" class="form-text"></div>
				  </div>
				  <div class="mb-3">
					<label for="filetypeFormToolShare" class="form-label">File Type</label>
					<select id="filetypeFormToolShare" class="form-select" aria-label="Default select">
					  <option value="" selected>Select File Type</option>
					</select>
					<div id="filetypeHelpToolShare" class="form-text">Automatically selected when loading from GitHub</div>
				  </div>
				  <center><strong>-OR-</strong></center>
				  <div class="mb-3">
					<label for="githubrepoFormToolShare" class="form-label">GitHub Repo</label>
					<select id="githubrepoFormToolShare" class="form-select" aria-label="Default select">
					</select>
					<div id="githubrepoHelpToolShare" class="form-text"></div>
				  </div>
				  <div class="mb-3">
					<label for="githubrepofileFormToolShare" class="form-label">GitHub Repo File</label>
					<select id="githubrepofileFormToolShare" class="form-select" aria-label="Default select">
					</select>
					<div id="githubrepofileHelpToolShare" class="form-text">List your files here! Send me a message on GitHub, Telegram, Discord, or make a pull request on GitHub.</div>
				  </div>
				  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button id="loadgithubrepofileFormToolShare" type="button" class="btn btn-success btn-sm">Load GitHub File</button>
				  </div>
				  <center><strong>-OR-</strong></center>
				  <div class="mb-3">
					<label for="githuburldirectFormToolShare" class="form-label">GitHub Sub File</label>
					<input type="text" class="form-control" id="githuburldirectFormToolShare" placeholder="https://github.com/.../file.sub">
					<div id="githuburlHelpToolShare" class="form-text"></div>
				  </div>
				  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button id="examplegithubToolShare" type="button" class="btn btn-secondary btn-sm">Example GitHub Url</button>
					<button id="loadgithuburldirectFormToolShare" type="button" class="btn btn-success btn-sm">Load GitHub File</button>
				  </div>
				  <!--<button id="examplefilecontentFormToolShare" type="button" class="btn btn-success">Example File Contents</button>-->
				  <br /><br />
				  <button id="submitToolShare" type="submit" class="btn btn-primary">Generate</button>
				  <button id="resetToolShare" type="reset" class="btn btn-primary">Reset</button>

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
		this.workingFileExtensions = ['sub', 'txt', 'ibtn', 'ir', 'rfid', 'fmf', 'nfc', 'u2f'];
		this.validFileExtensions = ['sub', 'txt', 'ibtn', 'ir', 'rfid', 'fmf', 'nfc', 'u2f'];
		this.filePaths = {'sub': 'subghz', 'txt':'badusb', 'ibtn':'ibutton', 'ir':'infrared', 
						 'rfid':'lfrfid', 'fmf':'music_player', 'nfc':'nfc', 'u2f':'u2f'};
		this.filePathsName = {'sub': 'SubGHz', 'txt':'Bad USB', 'ibtn':'iButton', 'ir':'Infrared', 
						 'rfid':'RFID', 'fmf':'Music Player', 'nfc':'NFC', 'u2f':'U2F'};
		this.githubreposurl = 'https://raw.githubusercontent.com/FlipperMaker/flippermaker.github.io/main/generalShareUrls.txt';
		//var a = this.getTextFromUrl("https://raw.githubusercontent.com/UberGuidoZ/Flipper/main/Sub-GHz/Tesla_charge_AM650.sub");
		//this.getBlobTextFromUrl("https://api.github.com/repos/UberGuidoZ/Flipper/git/blobs/8ebc42d06134572f86b71de161c34fcf9be3cd52");
		
		//console.log(a);
	}
	getTextFromUrl(urlInput){
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				//console.log(file_text)
			});
		});
	}
	loadGithubFile(urlInput){
		if(cleanString(urlInput).length == 0){return;}
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				document.getElementById("generateToolShare").elements["filecontentFormToolShare"].value = file_text;
			});
		});
	}
	loadGithubRepos(urlInput){
		this.clearFormGithubRepoUrls();
		if(cleanString(urlInput).length == 0){return;}
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				var fileLines = file_text.replaceAll('\r','').split('\n');
				fileLines.forEach( i => {
					var fileLine = i;
					var fileLineName = '';
					//var fileLineAuthor = '';
					var fileLineUrl = '';
					if(fileLine.slice(0,1) == '#'){ return; }
					if(fileLine.length < 10 ){ return; }
					if(fileLine.includes('~') ){ 
						fileLine = fileLine.split('~'); 
						if(fileLine.length != 2){ return; }
						fileLineName = fileLine[0];
						fileLineUrl = fileLine[1];
					}else{
						fileLineUrl = fileLine;
						if(fileLine.includes('.com/')){ fileLineName = fileLine.split('.com/')[1].split('/')[0]; }
					}
					
					var opt = document.createElement('option');
					opt.value = fileLineUrl;
					opt.innerHTML = fileLineName;
					document.getElementById("generateToolShare").elements["githubrepoFormToolShare"].appendChild(opt);
				});
			});
		})
		.then((xxx) => {this.clearFormGithubRepoFile();})
		.then((yyy) => {this.loadGithubRepoFiles();});
		
	}
	loadGithubRepoFiles(){
		var urlInput = this.githubUrlToRawUrl(this.getFormGithubRepoUrls(true));
		//console.log("URL: "+urlInput);
		this.clearFormGithubRepoFile();
		if(cleanString(urlInput).length == 0){return;}
		fetch(urlInput).then(function(response) {
			return response.text().then(function(file_text) {
				var fileLines = file_text.replaceAll('\r','').split('\n');
				fileLines.forEach( i => {
					var fileLine = i;
					var fileLineName = '';
					var fileLineAuthor = '';
					var fileLineUrl = '';
					if(fileLine.slice(0,1) == '#'){ return; }
					if(fileLine.length < 10 ){ return; }
					if(fileLine.includes('~') ){ 
						fileLine = fileLine.split('~'); 
						if(fileLine.length > 3){ return; }
						if(fileLine.length == 2){ 
							fileLineName = (fileLine[0].trim().length > 0 ? fileLine[0].trim() : '');
							fileLineUrl = (fileLine[1].trim().length > 0 ? fileLine[1].trim() : '');
						}
						if(fileLine.length == 3){ 
							fileLineName = (fileLine[0].trim().length > 0 ? fileLine[0].trim() : '');
							fileLineAuthor = (fileLine[1].trim().length > 0 ? fileLine[1].trim() : '');
							fileLineUrl = (fileLine[2].trim().length > 0 ? fileLine[2].trim() : '');
						}
						if(fileLineAuthor.trim().length == 0){fileLineAuthor = fileLineUrl.split('.com/')[1].split('/')[0];}
						if(fileLineName.trim().length == 0){fileLineName = fileLineUrl.slice(fileLineUrl.lastIndexOf('/')+1,fileLineUrl.length).toLowerCase();}
						//if(fileLineName.trim().includes('.')){fileLineName = fileLineName.slice(0, fileLineName.lastIndexOf('.'));}
						var fileType = fileLineUrl.trim().slice(fileLineUrl.lastIndexOf('.')+1,fileLineUrl.length).toLowerCase();
						//console.log(fileLineName+'^'+fileLineAuthor+'^'+fileType+'^'+fileLineUrl);
						
					}else{
						fileLineUrl = fileLine;
						if(fileLine.includes('.com/')){ fileLineAuthor = fileLine.split('.com/')[1].split('/')[0]; }
						else{ return; }
						if(fileLineAuthor.trim().length == 0){fileLineAuthor = fileLineUrl.split('.com/')[1].split('/')[0];}
						if(fileLineName.trim().length == 0){fileLineName = fileLineUrl.slice(fileLineUrl.lastIndexOf('/')+1,fileLineUrl.length).toLowerCase();}
						//if(fileLineName.trim().includes('.')){fileLineName = fileLineName.slice(0, fileLineName.lastIndexOf('.'));}
						var fileType = fileLineUrl.trim().slice(fileLineUrl.lastIndexOf('.')+1,fileLineUrl.length).toLowerCase();
						//console.log(fileLineName+'^'+fileLineAuthor+'^'+fileType+'^'+fileLineUrl);
					}
					var hash = '%23';
					var opt = document.createElement('option');
					opt.value = fileLineUrl;
					opt.innerHTML = fileLineName.replace(hash, '#');
					document.getElementById("generateToolShare").elements["githubrepofileFormToolShare"].appendChild(opt);
				});
			});
		});
	}
	getBlobTextFromUrl(urlInput){
		this.getJSON(urlInput, function(err, data) {
			if (err !== null) {
				alert('Something went wrong: ' + err);
			} else {
				const x = new Response(data.content).text()
				//console.log(x);
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
		return document.getElementById("generateToolShare");
	}
	//File Name
	getFormFileName(getValue = false){
		return (getValue ? replaceSpace(this.getForm().elements["nameFormToolShare"].value, "_") : this.getForm().elements["nameFormToolShare"]);
	}
	//File Content
	getFormFileContent(getValue = false){
		return (getValue ? this.getForm().elements["filecontentFormToolShare"].value : this.getForm().elements["filecontentFormToolShare"]);
	}
	//File Type
	getFormFiletype(getValue = false){
		return (getValue ? this.getForm().elements["filetypeFormToolShare"].value : this.getForm().elements["filetypeFormToolShare"]);
	}
	//GitHub Repo Select
	getFormGithubRepoUrls(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["githubrepoFormToolShare"].value) : this.getForm().elements["githubrepoFormToolShare"]);
	}
	//GitHub Repo-File Select
	getFormGithubRepoUrlsFiles(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["githubrepofileFormToolShare"].value) : this.getForm().elements["githubrepofileFormToolShare"]);
	}
	//GitHub Repo Select Load Button
	buttonFormGithubRepoFile(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["loadgithubrepofileFormToolShare"].value) : this.getForm().elements["loadgithubrepofileFormToolShare"]);
	}
	//GitHub Url Direct Text Field
	getFormGithubUrlDirectText(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["githuburldirectFormToolShare"].value) : this.getForm().elements["githuburldirectFormToolShare"]);
	}
	//GitHub Url Direct Text Load Button
	buttonFormLoadGithubUrlDirectText(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["loadgithuburldirectFormToolShare"].value) : this.getForm().elements["loadgithuburldirectFormToolShare"]);
	}
	//GitHub Url Direct Text Example Button
	buttonFormExampleGithub(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["examplegithubToolShare"].value) : this.getForm().elements["examplegithubToolShare"]);
	}
	// Not Used
	getFormExampleButtonFileContent(getValue = false){
		return (getValue ? cleanString(this.getForm().elements["examplefilecontentFormToolShare"].value) : this.getForm().elements["examplefilecontentFormToolShare"]);
	}
	
	
	removeAllOptions(selectElement) {
		var i, L = selectElement.options.length - 1;
		for(i = L; i >= 0; i--) {
			selectElement.remove(i);
		}
	}
	clearAllOptions(){
		this.clearFormGithubRepoUrls();
		this.clearFormGithubRepoFile();
	}
	clearFormGithubRepoUrls(){
		this.removeAllOptions(this.getFormGithubRepoUrls());
	}
	clearFormGithubRepoFile(){
		this.removeAllOptions(this.getFormGithubRepoUrlsFiles());
	}
	
	loadFileTypeOptions(){
		var filePathsArray = dictionaryToArray(this.filePaths);
		//console.log(filePathsArray);
		filePathsArray.forEach( i => {
			var opt = document.createElement('option');
			//opt.value = i.join('.').toLowerCase();
			opt.value = i[0].toLowerCase();
			opt.innerHTML = "." + i[0] + " (" + this.filePathsName[i[0]] + ")";
			this.getFormFiletype().appendChild(opt);
		});
	}
	renderCard(){
		document.getElementById(this.cardSpanName).innerHTML = this.cardCode;
		this.getFormFileContent().placeholder = this.textArea;
		this.loadFileTypeOptions();
		this.loadGithubRepos(this.githubreposurl);
		
		this.buttonFormExampleGithub().addEventListener("click", (event) => {
			event.preventDefault();
			this.getForm().elements["githuburldirectFormToolShare"].value = "https://github.com/UberGuidoZ/Flipper/blob/main/Sub-GHz/Tesla_charge_AM650.sub";
		});
		this.buttonFormLoadGithubUrlDirectText().addEventListener("click", (event) => {
			event.preventDefault();
			document.getElementById("generateToolShare").elements["filecontentFormToolShare"].value = 'Loading...';
			//this.loadGithubFile(this.fixGithubUrl());
			this.getFormFiletype().value = this.getUrlFileExtension(this.getFormGithubUrlDirectText(true));
			this.getFormFileName().value = this.getUrlFileName(this.getFormGithubUrlDirectText(true));
			//this.loadGithubFile(this.githubUrlToRawUrl(this.getFormGithubUrlDirectText(true)));
			var url = this.githubUrlToRawUrl(this.getFormGithubUrlDirectText(true));
			if(url.length > 2){
				this.loadGithubFile(url);
			}else{
				document.getElementById("generateToolShare").elements["filecontentFormToolShare"].value = 'URL Error';
			}
			
		});
		this.buttonFormGithubRepoFile().addEventListener("click", (event) => {
			event.preventDefault();
			document.getElementById("generateToolShare").elements["filecontentFormToolShare"].value = 'Loading...';
			this.getFormFiletype().value = this.getUrlFileExtension(this.getFormGithubRepoUrlsFiles(true));
			this.getFormFileName().value = this.getUrlFileName(this.getFormGithubRepoUrlsFiles(true));
			var url = this.githubUrlToRawUrl(this.getFormGithubRepoUrlsFiles(true));
			if(url.length > 2){
				this.loadGithubFile(url);
			}else{
				document.getElementById("generateToolShare").elements["filecontentFormToolShare"].value = 'URL Error';
			}
			
			
		});
		this.getFormGithubRepoUrls().addEventListener("change", (event) => {
			event.preventDefault();
			this.clearFormGithubRepoFile();
			this.loadGithubRepoFiles();
			
		});
		this.getForm().addEventListener("submit", (event) => {
			event.preventDefault();
			var generateModal = getGenerateModal();
			clearGenerateModal();
			if(this.getFormFileName(true).trim() == ""){
				this.getForm().elements["nameFormToolShare"].value = "NoName";
			}	

			setTextGenerateModal("Name: " + this.getFormFileName(true) + "." + this.getFormFiletype(true));
			var downloadButton = this.genDownloadButton();
			if(this.getFormFileContent(true).trim() == "" || downloadButton.trim() == ""){
				setTextGenerateModal('"Sub File Contents" Can\'t be empty. Please input data or load a GitHub URL.');
				
			}else{
				setButtonGenerateModal(downloadButton);
			}
			
			//setTextGenerateModal("Name: " + this.getFormFileName(true) + ".sub");
			//appendTextGenerateModal("Pin: " + (bruteForce ? "Brute Force" : pinToolShare));
			generateModal.show(); 
		});		
		
	}
	fixGithubUrl(){
		var ret = '';
		var githuburl = this.getFormGithubUrlDirectText(true);
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("https://pastebin.com/raw/")){ return githuburl; }
		if (githuburl.includes("github")){
			if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replaceAll("github.com", "raw.githubusercontent.com"); }
			if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
			if (githuburl.includes("http://")){ githuburl = githuburl.replaceAll("http://", ""); }
			if (githuburl.includes("/blob")){ githuburl = githuburl.replaceAll("/blob", ""); }
			var fileType = githuburl.slice(githuburl.length-4,githuburl.length).toLowerCase();
			if (fileType != ".sub"){ githuburl = ""; }
			var ghFileName = githuburl.slice(githuburl.lastIndexOf('/')+1,githuburl.length).toLowerCase();
			if(this.getFormFileName(true).trim().length == 0){this.getForm().elements["nameFormToolShare"].value = ghFileName.replaceAll('.sub', '');}
			if(this.getFormFileName(true).trim() == "NoName"){this.getForm().elements["nameFormToolShare"].value = ghFileName.replaceAll('.sub', '');}
		}
		return githuburl;
	}
	getUrlFileExtension(inputUrl){
		var githuburl = inputUrl;
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("github")){
			if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replaceAll("github.com", "raw.githubusercontent.com"); }
			if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
			if (githuburl.includes("http://")){ githuburl = githuburl.replaceAll("http://", ""); }
			if (githuburl.includes("/blob")){ githuburl = githuburl.replaceAll("/blob", ""); }
			var fileType = githuburl.slice(githuburl.lastIndexOf('.')+1,githuburl.length).toLowerCase();
		}else{return '';}
		return fileType;
	}
	getUrlFileNameFull(inputUrl){
		var githuburl = inputUrl;
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("github")){
			if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replaceAll("github.com", "raw.githubusercontent.com"); }
			if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
			if (githuburl.includes("http://")){ githuburl = githuburl.replaceAll("http://", ""); }
			if (githuburl.includes("/blob")){ githuburl = githuburl.replaceAll("/blob", ""); }
			var fileName = githuburl.slice(githuburl.lastIndexOf('/')+1,githuburl.length).toLowerCase();
		}else{return '';}
		return fileName;
	}
	getUrlFileName(inputUrl){
		var githuburl = inputUrl;
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("github")){
			if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replaceAll("github.com", "raw.githubusercontent.com"); }
			if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
			if (githuburl.includes("http://")){ githuburl = githuburl.replaceAll("http://", ""); }
			if (githuburl.includes("/blob")){ githuburl = githuburl.replaceAll("/blob", ""); }
			var fileName = githuburl.slice(githuburl.lastIndexOf('/')+1,githuburl.lastIndexOf('.')).toLowerCase();
		}else{return '';}
		return fileName;
	}
	
	githubUrlToRawUrl(inputUrl){
		var githuburl = inputUrl;
		if (githuburl.length == 0){ return ''; }
		if (githuburl.includes("github")){
			if (!githuburl.includes("raw.githubusercontent.com")){ githuburl = githuburl.replaceAll("github.com", "raw.githubusercontent.com"); }
			if (!githuburl.includes("https://")){ githuburl = "https://"+githuburl; }
			if (githuburl.includes("http://")){ githuburl = githuburl.replaceAll("http://", ""); }
			if (githuburl.includes("/blob/")){ githuburl = githuburl.replaceAll("/blob/", "/"); }
		}else{return '';}
		return githuburl;
	}
	parseFileContentsToUrl(){
		var badUrl = false;
		var CR = '%0D';
		var LF = '%0A';
		CR = '%0A';
		var hash = '%23';
		var fc = this.getFormFileContent(true).trim();
		var filePath = this.filePaths[this.getFormFiletype(true)];
		if(fc.length == 0){ return '#'; }
		fc = fc.split('\n');
		var returnUrlCheck = "https://dev.flpr.app/s#path="+filePath+"%2F"+this.getFormFileName(true)+"."+this.getFormFiletype(true);
		var returnUrl = "https://dev.flpr.app/s#path="+filePath+"%2F"+this.getFormFileName(true)+"."+this.getFormFiletype(true);
		var returnUrlParams = '';
		fc.forEach( i => { 
			if(this.getFormFiletype(true) == 'sub'){ 
				if(!i.includes(':')){badUrl = true;} 
				var fcline = i.replaceAll("\r","").split(':');
				var fclineA = fcline[0].trim();
				var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
				//fclineB = fclineB.replaceAll("/","%2F");
				//fclineB = fclineB.replaceAll(" ","%20");
				returnUrl = returnUrl + "&" + fclineA + "=" + fclineB
			}else if(this.getFormFiletype(true) == 'txt'){ 
				var fcline = i.replaceAll("\r","");
				fcline = fcline.trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
				if (returnUrlParams.length > 1){returnUrlParams = returnUrlParams + CR;}
				returnUrlParams = returnUrlParams + fcline;
			}else if(this.getFormFiletype(true) == 'ir'){ //.replaceAll("#","%23")
				if(!i.includes(':') && i.trim().slice(0,1) != '#' && i.trim().length > 0){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else if(this.getFormFiletype(true) == 'ibtn'){
				if(!i.includes(':') && i.trim().slice(0,1) != '#'){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else if(this.getFormFiletype(true) == 'rfid'){
				if(!i.includes(':') && i.trim().slice(0,1) != '#'){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else if(this.getFormFiletype(true) == 'nfc'){
				if(!i.includes(':') && i.trim().slice(0,1) != '#'){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else if(this.getFormFiletype(true) == 'fmf'){
				if(!i.includes(':') && i.trim().slice(0,1) != '#'){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").replaceAll("#",hash).split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else if(this.getFormFiletype(true) == 'u2f'){
				if(!i.includes(':') && i.trim().slice(0,1) != '#'){badUrl = true;} 
				if(i.trim().slice(0,1) == '#'){
					returnUrl = returnUrl + CR + i.trim().replaceAll("#",hash);
				} else {
					var fcline = i.replaceAll("\r","").split(':');
					var fclineA = fcline[0].trim();
					var fclineB = fcline[1].trim().replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
					if(fclineA.length > 0 && i.trim().length > 0){
						returnUrl = returnUrl + "&" + fclineA + "=" + fclineB;
					}
				}
			}else{
				badUrl = true;
				/* if(i.replaceAll("\r","").trim().length > 1){
					var fcline = CR + i.replaceAll("\r","").trim();
					fcline = fcline.replaceAll(': ','%3A%20').replaceAll(':','%3A');
					returnUrlParams = returnUrlParams + fcline.replaceAll("#",hash).replaceAll("+","%2B").replaceAll("-","%2D").replaceAll(" ","+");
				} */
			}
		});
		//if(returnUrlParams.slice(0,3) == CR){returnUrlParams = returnUrlParams.slice(3,returnUrlParams.length);}
		if(returnUrlParams.length > 1){returnUrl = returnUrl+'&'+returnUrlParams;}
		if(badUrl == true){return "";}
		if(returnUrlCheck == returnUrl){return "";}
		return returnUrl + LF;
	}

	
	
	


	genDownloadButton() {
		var shortName = this.getFormFileName(true);
		var url = this.parseFileContentsToUrl();
		//console.log(url);
		if(url == ''){return "";}
		if (shortName.length > 10) {
			shortName = shortName.slice(0, 10) + "..";
		}
		var returnUrl =
			'<a href="'+url+'" class="btn btn-primary" target="_blank">Download ' + shortName + "."+this.getFormFiletype(true)+"</a>";
		return returnUrl;
	}
}

