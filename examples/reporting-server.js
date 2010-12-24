var sys = require('sys'),
		fs = require('fs'),
		url = require('url'),
		http = require('http')
		redis = require('redis-node'),
		querystring = require('querystring'),
		
		client = redis.createClient(),
		
		js_code = fs.readFileSync('../src/web-timer.js');

client.select(2);

http.createServer(function(request, response) {
	var u  = url.parse(request.url);
	
	response.writeHead(200, {'Content-Type':'text/javascript'});
	
	if (u.pathname == '/client.js')  {
		response.end(js_code);
	}
	else {
		var q = querystring.parse(u.query),
				data = {
					headers: request.headers,
					timing:  q
				};
		client.lpush('requests', JSON.stringify(data));
	
		response.end('alert("Request took: '+ (q.loadEventEnd - q.navigationStart) +'")');
	}
}).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');