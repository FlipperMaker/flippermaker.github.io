function getXMLRSSFeed(rssUrl){
	var headers = {
		'Content-Type': 'application/xml'
		//,'credentials': "same-origin"
		//,'Access-Control-Allow-Origin':'*'
	}
	var method = 'GET';
	var mode = 'no-cors';
	
	fetch(rssUrl, 
		{
			method: method,
			mode: mode,
			headers: headers
		})
		.then(response => response.text())
		.then(x => console.log('x', x))
		//.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => console.log('data', data))
	
}
function getXMLRSSFeedA(rssUrl){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', rssUrl);
	xhr.send();
	xhr.onload = function() {
		if (xhr.status != 200) { // analyze HTTP status of the response
			console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		} else { // show the result
			console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
		}
	};
}

function getJSONRSSFeed(rssUrl){
	var headers = {
		'Content-Type': 'application/xml'
		//,'Access-Control-Allow-Origin':'*'
	}
	var method = 'GET';
	var mode = 'cors';
	
	fetch(rssUrl, 
		{
			method: method,
			mode: mode,
			headers: headers
		})
		.then(response => response.text())
		.then(x => console.log(x))
		//.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => console.log(data))
	
}