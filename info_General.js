class infoGeneral{
	constructor() {
		this.cardSpanName = 'cardInfoGeneral';
		this.cardTitle = 'General Info';
		
		
		
		this.cardCollapseBodyClassCode = cardCollapseEnabled() ? "collapse show" : "";
		this.cardCollapseBodyIdCode = this.cardSpanName+'Body';
		
		this.cardCollapseHeadCode = genCardHeadCode(this.cardTitle, this.cardSpanName);

		this.cardCode = `
		<div class="card mb-3">
			${this.cardCollapseHeadCode}
			<div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">
				<h5>Newest Updates</h5>
				<ul>
					<li>7/3/2022: BadUSB: Convert strings/text to Alt Code</li>
					<li>6/15/2022: Custom version of dev.flpr.app for downloading files</li>
					<li>6/13/2022: Create NTAG213, NTAG215, and NTAG216! Create NTAG21X NFC files that open a URL. More features coming soon.</li>
					<li><a href="https://github.com/FlipperMaker/flippermaker.github.io/discussions">Older Updates</a></li>
				</ul>
				<h5>Contact Me</h5>
				<p>For help, suggestions, or questions you can reach out to me on...
				<ul>
					<li>Discord: @natehome123#7692</li>
					<li>Telegram: <a href="https://t.me/nhx00">nhx00</a></li>
					<li>Twitter: <a href="https://twitter.com/nhx000">nhx000</a></li>
					<li>GitHub: <a href="https://github.com/natehome">natehome</a></li>
					<li>GitHub: <a href="https://github.com/FlipperMaker/">FlipperMaker</a></li>
					<li>GitHub Discussions: <a href="https://github.com/FlipperMaker/flippermaker.github.io/discussions">FlipperMaker Discussions</a></li>
				</ul>
				</p>
			</div>
		</div>
		`;
	}
	/*
	var buttons = document.querySelectorAll('.btn')
		buttons.forEach(function (button) {
		var button = new bootstrap.Button(button)
		button.toggle()
	})
	*/
	renderCard(){
		var infoGeneralCard = document.getElementById(this.cardSpanName);
		infoGeneralCard.innerHTML = this.cardCode;
		showHideCard(this.cardSpanName+'BodyCollapse', '#'+this.cardSpanName+'Body');
		//showHideCardShow('#'+this.cardSpanName+'Body');
	}
	
	
}




