class feedShipFlippDev{
	constructor() {
		this.cardSpanName = 'cardFeedShipFlippDev';
		this.cardTitle = 'Latest Shipment Update';//'Shipment Updates';
		
		this.cardCollapseBodyClassCode = cardCollapseEnabled() ? "collapse" : "";
		this.cardCollapseBodyIdCode = this.cardSpanName+'Body';
		
		this.cardCollapseHeadCode = genCardHeadCode(this.cardTitle, this.cardSpanName);
		
		this.feed = null;
		this.maxUpdates = 1;

		this.cardCode = `
		<div class="card mb-3">
			${this.cardCollapseHeadCode}
			<div class="card-body ${this.cardCollapseBodyClassCode}" id="${this.cardCollapseBodyIdCode}">
				<!--<h5>Newest Updates</h5>-->
				<div id="feedShipFlippDev_body" class="overflow-auto">
				</div>
			</div>
		</div>
		`;
	}
	feedAppend = (x) => { this.feed.innerHTML = this.feed.innerHTML.trim() + (this.feed.innerHTML.trim() == '' ? '' : '<br />'+(false ? '~'.repeat(10) : '')+'<br />' ) + x; }
	
	async renderCard(){
		var infoGeneralCard = document.getElementById(this.cardSpanName);
		infoGeneralCard.innerHTML = this.cardCode;
		this.feed = document.getElementById('feedShipFlippDev_body');
		showHideCard(this.cardSpanName+'BodyCollapse', '#'+this.cardSpanName+'Body');
		let items = await getRSSFeedProxy('https://ship.flipp.dev/rss');
		items = items.items;
		var cntrMax = this.maxUpdates;
		var cntr = 0;
		items.forEach(x => {
			if(cntr < cntrMax){
				let date = x.pubDate.replace(' ','T')+ '-00:00';
				//var DateTime = luxon.DateTime;
				//console.log('x.pubDate',x.pubDate.replace(' ','T')+ '-00:00');
				//console.log(DateTime.fromISO(x.pubDate.replace(' ','T')+ '-00:00'));
				date = new Date(date);
				date = date.toLocaleDateString("en-US")
				let content = x.content;
				content = content.trim();
				content = this.toUnicode(content).replaceAll('\\uD83C\\uDDEC\\uD83C\\uDDE7', '<br /><b>UK:</b> ')
				.replaceAll('\\uD83C\\uDDEA\\uD83C\\uDDFA', '<br /><b>EU:</b> ')
				.replaceAll('\\uD83C\\uDDF7\\uD83C\\uDDFA', '<br /><b>RU:</b> ')
				.replaceAll('\\uD83C\\uDDFA\\uD83C\\uDDF8', '<br /><b>USA:</b> ');
				content = this.toNormalString(content);
				content = content.replaceAll('\n', '')
				.replaceAll('\r', '')
				.replaceAll('<br>', '')
				.replaceAll('<strong>- </strong>', '');
				while(content.includes('<strong> ')) content = content.replaceAll('<strong> ', '<strong>');
				while(content.includes(' </strong>')) content = content.replaceAll(' </strong>', '</strong>');
				content = content.replaceAll('</strong>', '</strong> ');
				while(content.includes('  ')) content = content.replaceAll('  ', ' ');
				if (content.indexOf('<br>') == 0) content = content.slice(4);
				if (content.indexOf('<br />') == 0) content = content.slice(6);
				content = `<center><h5>${date}</h5></center>${content}`;
				while(content.includes('<br /><br />')) content = content.replaceAll('<br /><br />', '<br />');
				this.feedAppend(content);
			}
			cntr++;
		});
		updateMasonryLayout();
	}
	toNormalString(str) {
		while(str.includes('\\u')) str = this.unicodeToChar(str);
		return str
	}
	unicodeToChar(x) {
		return x.replace(/\\u[\dA-F]{4}/gi, 
			function (match) {
				return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
		});
	}
	toUnicode(str) {
		return str.split('').map(function (value, index, array) {
			var temp = value.charCodeAt(0).toString(16).toUpperCase();
			if (temp.length > 2) return '\\u' + pad(temp,4);
			return value;
		}).join('');
	}
}




