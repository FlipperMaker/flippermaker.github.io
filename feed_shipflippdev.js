class feedShipFlippDev{
	constructor() {
		this.cardSpanName = 'cardFeedShipFlippDev';
		this.cardTitle = 'Shipment Updates';
		
		
		
		this.cardCollapseBodyClassCode = cardCollapseEnabled() ? "collapse show" : "";
		this.cardCollapseBodyIdCode = this.cardSpanName+'Body';
		
		this.cardCollapseHeadCode = genCardHeadCode(this.cardTitle, this.cardSpanName);

		this.cardCode = `
		<div class="card mb-3">
			${this.cardCollapseHeadCode}
			<div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">
				<h5>Newest Updates</h5>
				<div class="overflow-auto">
				
				</div>
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
		if (document.location.hash.length === 0) return;
		var infoGeneralCard = document.getElementById(this.cardSpanName);
		infoGeneralCard.innerHTML = this.cardCode;
		showHideCard(this.cardSpanName+'BodyCollapse', '#'+this.cardSpanName+'Body');
		//showHideCardShow('#'+this.cardSpanName+'Body');
		getXMLRSSFeed('https://ship.flipp.dev/rss');
		//getXMLRSSFeed('http://lorem-rss.herokuapp.com/feed');
		//getJSONRSSFeed('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fship.flipp.dev%2Frss');
		
		if (document.location.hash.length > 0) {
			console.log('document.location.hash.length', document.location.hash.length);
			console.log('document.location.href', document.location.href);
			console.log('location.origin', location.origin);
			console.log('document.location.hash.slice(1)', document.location.hash.slice(1).toLowerCase());
			getXMLRSSFeed('https://ship.flipp.dev/rss');
		}
	}
	
	
	
}




