class cardManager{
	constructor() {
		this.subghzCards = [];
		this.subghzToolCards = [];
		this.generalToolCards = [];
		this.rfidCards = [];
		this.irCards = [];
		this.nfcCards = [];
		this.infoCards = [];
		this.badusbCards = [];
		this.feedCards = [];
		this.unknownCards = [];
		//this.cardRowCode = `<div class="row" data-masonry= '{"percentPosition": true }'>`;
		this.cardRowCode = `<div class="row" >`;
		//this.cardRowCode = `<div class="row" data-masonry= '{"percentPosition": true, "itemSelector": ".row" }'>`;
	}
	addCard(cardType, cardObject){
		switch(cardType) {
			case 'subghz':
				this.subghzCards.push(cardObject);
				break;
			case 'subghztool':
				this.subghzToolCards.push(cardObject);
				break;
			case 'rfid':
				this.rfidCards.push(cardObject);
				break;
			case 'ir':
				this.irCards.push(cardObject);
				break;
			case 'nfc':
				this.nfcCards.push(cardObject);
				break;
			case 'generaltool':
				this.generalToolCards.push(cardObject);
				break;
			case 'info':
				this.infoCards.push(cardObject);
				break;
			case 'badusb':
				this.badusbCards.push(cardObject);
				break;
			case 'feed':
				this.feedCards.push(cardObject);
				break;
			default:
				this.unknownCards.push(cardObject);
				return;
		}
	}
	getCardsByType(cardType){
		switch(cardType) {
			case 'subghz':
				return this.subghzCards;
			case 'subghztool':
				return this.subghzToolCards;
			case 'rfid':
				return this.rfidCards;
			case 'ir':
				return this.irCards;
			case 'nfc':
				return this.nfcCards;
			case 'info':
				return this.infoCards;
			case 'feed':
				return this.feedCards;
			case 'badusb':
				return this.badusbCards;
			case 'generaltool':
				return this.generalToolCards;
			default:
				console.log('Unable to get cards by type. Bad type.');
				return [];
		}
	}
	addSubghzCard(cardObject){
		this.addCard('subghz', cardObject);
	}
	addSubghztoolCard(cardObject){
		this.addCard('subghztool', cardObject);
	}
	addGeneraltoolCard(cardObject){
		this.addCard('generaltool', cardObject);
	}
	addRfidCard(cardObject){
		this.addCard('rfid', cardObject);
	}
	addIrCard(cardObject){
		this.addCard('ir', cardObject);
	}
	addNfcCard(cardObject){
		this.addCard('nfc', cardObject);
	}
	addInfoCard(cardObject){
		this.addCard('info', cardObject);
	}
	addBadUSBCard(cardObject){
		this.addCard('badusb', cardObject);
	}
	addFeedCard(cardObject){
		this.addCard('feed', cardObject);
	}
	genShowAllCardsRow(cardObj){
		//console.log('<div id="'+cardObj.cardSpanName+'" class="col-sm-4"></div>');
		return '<div id="'+cardObj.cardSpanName+'" class="col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" col-xxl-2"></div>';
	}
/*  	showAllCards2(targetID){ //NOTE: Render order for index///////////////////////////////////////////////////////////////////////////////
		var ret = '';
		var rows = [];
		var cntr = 0;
		this.irCards.forEach(c => {rows.push(this.genShowAllCardsRow(c)); });
		this.subghzCards.forEach(c => {rows.push(this.genShowAllCardsRow(c)); });
		this.rfidCards.forEach(c => {rows.push(this.genShowAllCardsRow(c)); });
		this.generalToolCards.forEach(c => {rows.push(this.genShowAllCardsRow(c)); });
		this.subghzToolCards.forEach(c => {rows.push(this.genShowAllCardsRow(c)); });
		rows.forEach(c => {
			if(cntr == 0){ret = ret + this.cardRowCode;}
			ret = ret + c;
			if(cntr == 2){
				cntr = 0;
				ret = ret + '</div>';
			}else{
				cntr += 1;
			}
			
		});
		if(ret.slice(ret.length-6, ret.length) == '</div>'){ret = ret + '</div>';}
		//c => {}
		
		document.getElementById(targetID).innerHTML = ret;
		this.renderCards();
	} */ 
	showAllCards(targetID){ //NOTE: Render order for index///////////////////////////////////////////////////////////////////////////////
		var ret = this.cardRowCode;
		this.infoCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.feedCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.irCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.subghzCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.rfidCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.nfcCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.generalToolCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.subghzToolCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.badusbCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		//c => {}
		ret = ret + '</div>';
		document.getElementById(targetID).innerHTML = ret;
		this.renderCards();
	}
	showAllCardsOfType(targetID, cardType){
		var tempCards = this.getCardsByType(cardType)
		var ret = this.cardRowCode;
		tempCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		ret = ret + '</div>';
		document.getElementById(targetID).innerHTML = ret;
		this.renderCardType(cardType);
	}
	renderCardType(cardType){
		var tempCards = this.getCardsByType(cardType)
		tempCards.forEach(c => {c.renderCard();});
	}
	renderCards(){ //NOTE: Render cards///////////////////////////////////////////////////////////////////////////////
		this.infoCards.forEach(c => {c.renderCard();});
		this.feedCards.forEach(c => {c.renderCard();});
		this.irCards.forEach(c => {c.renderCard();});
		this.subghzCards.forEach(c => {c.renderCard();});
		this.generalToolCards.forEach(c => {c.renderCard();});
		this.subghzToolCards.forEach(c => {c.renderCard();});
		this.rfidCards.forEach(c => {c.renderCard();});
		this.nfcCards.forEach(c => {c.renderCard();});
		this.badusbCards.forEach(c => {c.renderCard();});
		
	}
	
}

/*
    <div class="row">
	  <div id="cardH10301" class="col-sm-4"></div>
	  <div id="cardMegaCode" class="col-sm-4"></div>
	  <div id="cardFirefly" class="col-sm-4"></div>
    </div>
*/

/* cardManagerInstance = new cardManager();

//subghzFireflyInstance = new subghzFirefly();
cardManagerInstance.addSubghzCard(new subghzFirefly());

//subghzMegaCodeInstance = new subghzMegaCode();
cardManagerInstance.addSubghzCard(new subghzMegaCode());

//rfidH10301Instance = new rfidH10301();
cardManagerInstance.addSubghzCard(new rfidH10301());

if(document.getElementById(targetID) != null){
	cardManagerInstance.showAllCards('indexCards');
}
 */



/* for (let i = 0; i < fLen.length; i++) {
  text += "<li>" + fruits[i] + "</li>";
} */