renderBaseHtml();
performImports();
window.onload = function() {
	createCardManager();
	cardManagerInstance.showAllCards('cardsAll');
/* 	var $grid = document.querySelector('.row');
	console.log($grid);
	var msnry = new Masonry($grid, {
		//itemSelector: '.col-sm-4',
		percentPosition: true
	});
	msnry.layout(); */
	
/* 	var divs = document.querySelectorAll('.container');
	[].forEach.call(divs, function(div) {
		console.log(div);
		var msnry = new Masonry(div, {
			itemSelector: '.col-sm-4',
			percentPosition: true
			
		});
		msnry.layout();
	}); */
	var msnry = new Masonry( '.row', {
		//columnWidth: 200,
		//itemSelector: '.col-sm-4'
		percentPosition: true
	});
	msnry.layout();
	
};
/* reportWindowSize();
window.onresize = reportWindowSize;
function reportWindowSize() {

	var w = window.innerWidth;
	if (w < 576) {
		console.log('xs');
	}
	else if (w >= 576 &&  w < 768) {
		console.log('sm');
	}
	else if (w >= 768 &&  w < 992) {
		console.log('md');
	}
	else if (w >= 992 &&  w < 1200) {
		console.log('lg');
	}
	else if (w >= 1200 &&  w < 1400) {
		console.log('xl');
	}
	else if (w >= 1400) {
		console.log('xxl');
	}
	else  {
		console.log('Width Error');
	}
} */
