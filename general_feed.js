async function getXMLRSSFeed(rssUrl){
	var headers = {
		'Content-Type': 'application/xml'
		//,'credentials': "same-origin"
		//,'Access-Control-Allow-Origin':'*'
	}
	var method = 'GET';
	var mode = 'cors';
	
	await fetch(rssUrl, 
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