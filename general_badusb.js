async function getRSSFeedProxy(rssUrl){
	var headers = {
		'Content-Type': 'application/xml'
		//,'credentials': "same-origin"
		//,'Access-Control-Allow-Origin':'*'
	}
	var method = 'GET';
	var mode = 'no-cors';
	var ret = null;
	rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);
	return await fetch(rssUrl, 
		{
			method: method,
			//mode: mode,
			//headers: headers
		})
		.then(response => response.json())
		.then(responseData =>  {return responseData;});
		//.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		//.then(data => console.log('data', data))
	return null;
}
// function getXMLRSSFeedA(rssUrl){
	// let xhr = new XMLHttpRequest();
	// xhr.open('GET', rssUrl);
	// xhr.send();
	// xhr.onload = function() {
		// if (xhr.status != 200) console.log(`Error ${xhr.status}: ${xhr.statusText}`);
		// else console.log(`Done, got ${xhr.response.length} bytes`);
	// };
// }
