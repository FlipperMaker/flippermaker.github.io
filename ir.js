renderBaseHtml();
performImports();
window.onload = function() {
	createCardManager();
	cardManagerInstance.showAllCardsOfType('cardsAll', 'ir');
};