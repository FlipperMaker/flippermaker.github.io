var FLIPPERMAKER_VERSION = '6_15_2022_2';
function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onreadystatechange = callback;
	script.onload = callback;
	document.head.appendChild(script);
}

//NOTE: Modify when adding new card///////////////////////////////////////////////////////////////////////////////
function performImports(){
	[
	'general.js',
	'general_subghz.js',
	'general_rfid.js',
	'general_ir.js',
	'general_nfc.js',
	'subghz_Touchtunes.js',
	'subghz_tool_OokToSub.js',
	'general_tool_Share.js',
	'subghz_Firefly.js',
	'subghz_Megacode.js',
	'nfc_tool_create.js',
	'rfid_H10301.js',
	'ir_device.js',
	'cardManager.js'
	].forEach(function(src) {
	loadScript(src, function() {});
	});
}

//NOTE: Modify when adding new card///////////////////////////////////////////////////////////////////////////////
function createCardManager(){
	cardManagerInstance = new cardManager();
	cardManagerInstance.addSubghzCard(new subghzTouchTunes());
	cardManagerInstance.addGeneraltoolCard(new generaltoolShare());
	cardManagerInstance.addSubghztoolCard(new subghztoolOokToSub());
	cardManagerInstance.addSubghzCard(new subghzMegaCode());
	cardManagerInstance.addRfidCard(new rfidH10301());
	cardManagerInstance.addSubghzCard(new subghzFirefly());
	cardManagerInstance.addIrCard(new irGeneric());
	cardManagerInstance.addNfcCard(new nfctoolCreate());
}
function renderBaseHtml(){
	renderGenericTopBar();
	renderGenericNavBar();
	renderGenericModalBar();
	renderGenericFooterBar();
}

function getGenerateModal() {
	var generateModal = new bootstrap.Modal(
		document.getElementById("generateModal"), {}
	);
	return generateModal;
}

function clearGenerateModal() {
	document.getElementById("generateMessageModal").innerHTML = "";
	document.getElementById("generateButtonModal").innerHTML = "";
}

function setTextGenerateModal(message) {
	document.getElementById("generateMessageModal").innerHTML =
		"<p>" + message + "</p>";
}

function setButtonGenerateModal(linkAddress) {
	document.getElementById("generateButtonModal").innerHTML = linkAddress;
}

function appendTextGenerateModal(message) {
	document.getElementById("generateMessageModal").innerHTML =
		getHtmlGenerateModal() + "<p>" + message + "</p>";
}

function getHtmlGenerateModal() {
	return document.getElementById("generateMessageModal").innerHTML.toString();
}




function renderGenericTopBar(){
	var topBarCode = `
		<h1>Flipper Maker</h1>
		<h4>Generate Flipper Files!</h4>
		<div>On your phone: When you download the files the Flipper Zero app will automatically open and download the file to your Flipper Zero
		<div class="d-inline d-none d-lg-block">On your PC option 1: Download the generated file, then use qFlipper to download the file to your Flipper Zero.<br />
		On your PC option 2: Download the generated file, then copy the file to the correct directory on your Flipper Zero's SD Card.</div></div>`;
		document.getElementById('topBar').innerHTML = topBarCode;
}
function renderGenericFooterBar(){
	var footerBarCode = `
    <div class="container">
      <span class="text-muted" id="flippermaker_version">Flipper Maker</span>
    </div>`;
		document.getElementById('footerBar').innerHTML = footerBarCode;
		document.getElementById('flippermaker_version').innerHTML = "Version: " + FLIPPERMAKER_VERSION;
}

function renderGenericModalBar(){
	var modalCode = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="generateModalLabel">Output</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="generateMessageModal"></div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <div id="generateButtonModal">asdf</div>
        </div>
      </div>
    </div>`;
		document.getElementById('generateModal').innerHTML = modalCode;
}

function renderGenericNavBar(){
	var navBarCode = `
<div class="container-fluid">
  <a class="navbar-brand" href="#">
	<img src="https://raw.githubusercontent.com/FlipperMaker/flippermaker.github.io/main/flipperLogo.jpg" alt="" width="25" height="25" class="d-inline-block align-text-top">
	<span class="text-white">Flipper Maker</span>
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	<span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
	<ul class="navbar-nav">
	  <li class="nav-item">
		<a class="nav-link active" aria-current="page" href="#">Home</a>
	  </li>
	  <li class="nav-item">
		<a class="nav-link" href="https://github.com/FlipperMaker/flippermaker.github.io" target="_blank">GitHub</a>
	  </li>
	  <li class="nav-item">
		<a class="nav-link" href="https://t.me/nhx00" target="_blank">Telegram</a>
	  </li>
	  <li class="nav-item">
		<a class="nav-link" href="https://discordapp.com/users/509949298859835407" target="_blank">Discord</a>
	  </li>
	  <li class="nav-item">
		<a class="nav-link" href="https://forum.flipperzero.one/u/nhx0" target="_blank">Flipper Forum</a>
	  </li>
	</ul>
  </div>
</div>`;
		document.getElementById('navBar').innerHTML = navBarCode;
}
