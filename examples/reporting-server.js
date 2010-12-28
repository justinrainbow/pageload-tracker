var VERSION = '0.1',
    DEFAULTS = {
      port   : 8124,
      host   : '127.0.0.1',
      dbhost : '127.0.0.1',
      dbport : 6379,
      url    : 'localhost:8124'
    },
    
    // include all the modules
    opts = require('opts'),
    sys = require('sys'),
    fs = require('fs'),
    url = require('url'),
    http = require('http')
    redis = require('redis-node'),
    querystring = require('querystring'),
    
    client = redis.createClient();


var options = [
  { short       : 'v',
    long        : 'version',
    description : 'Show version and exit',
    callback    : function() {
      console.log("The version is: \033[32mv" + VERSION + "\033[0m\n");
      process.exit(0);
    }
  },
  { short       : 'p',
    long        : 'port',
    description : 'Port to bind to',
    value       : true
  },
  { long        : 'host',
    description : 'The hostname to use',
    value       : true
  },
  { long        : 'url',
    description : 'Hostname that should be used to connect to this server',
    value       : true
  },
  { short       : 'h',
    long        : 'help',
    description : 'Display this help message',
    callback    : opts.help
  }
];

opts.parse(options);

var cfg = {};
for (var key in DEFAULTS) {
  cfg[key] = opts.get(key) || DEFAULTS[key];
};

console.dir(cfg);

client.select(2);

var getClientCode = function(){
  var code;
  return function(){
    if (!code) {
      code = fs.readFileSync('../src/web-timer.js').toString().replace('localhost:8124', cfg.url);
    }
    return code;
  };
}();

var server = http.createServer(function(request, response) {
  var u  = url.parse(request.url);
  
  response.writeHead(200, {'Content-Type':'text/javascript'});
  
  if (u.pathname == '/client.js')  {
    response.end(getClientCode());
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
});

server.listen(cfg.port, cfg.host);

console.log('Server running at http://'+cfg.host+':'+cfg.port+'/');

