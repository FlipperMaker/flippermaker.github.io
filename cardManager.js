class cardManager{
	constructor() {
		this.subghzCards = [];
		this.rfidCards = [];
		this.irCards = [];
		this.unknownCards = [];
	}
	addCard(cardType, cardObject){
		switch(cardType) {
			case 'subghz':
				this.subghzCards.push(cardObject);
				break;
			case 'rfid':
				this.rfidCards.push(cardObject);
				break;
			case 'ir':
				this.irCards.push(cardObject);
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
			case 'rfid':
				return this.rfidCards;
			case 'ir':
				return this.irCards;
			default:
				console.log('Unable to get cards by type. Bad type.');
				return [];
		}
	}
	addSubghzCard(cardObject){
		this.addCard('subghz', cardObject);
	}
	addRfidCard(cardObject){
		this.addCard('rfid', cardObject);
	}
	addIrCard(cardObject){
		this.addCard('ir', cardObject);
	}
	genShowAllCardsRow(cardObj){
		//console.log('<div id="'+cardObj.cardSpanName+'" class="col-sm-4"></div>');
		return '<div id="'+cardObj.cardSpanName+'" class="col-sm-4"></div>';
	}
	showAllCards(targetID){
		var ret = '<div class="row">';
		this.irCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.rfidCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		this.subghzCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		//c => {}
		ret = ret + '</div>';
		document.getElementById(targetID).innerHTML = ret;
		this.renderCards();
	}
	showAllCardsOfType(targetID, cardType){
		var tempCards = this.getCardsByType(cardType)
		var ret = '<div class="row">';
		tempCards.forEach(c => {ret = ret + this.genShowAllCardsRow(c); });
		ret = ret + '</div>';
		document.getElementById(targetID).innerHTML = ret;
		this.renderCardType(cardType);
	}
	renderCardType(cardType){
		var tempCards = this.getCardsByType(cardType)
		tempCards.forEach(c => {c.renderCard();});
	}
	renderCards(){
		this.irCards.forEach(c => {c.renderCard();});
		this.subghzCards.forEach(c => {c.renderCard();});
		this.rfidCards.forEach(c => {c.renderCard();});
		
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