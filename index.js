renderBaseHtml();
performImports();
window.onload = function() {
	createCardManager();
	cardManagerInstance.showAllCards('cardsAll');
};