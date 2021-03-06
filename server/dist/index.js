// Generated by CoffeeScript 1.10.0
(function() {
  var app, config, http, onError, onListening, port, server;

  app = require('./libs/app');

  http = require('http');

  config = require('./config/config');

  port = config.port;

  server = http.createServer(app);

  onError = function(error) {
    var bind, ref;
    if (error.syscall !== 'listen') {
      throw error;
    }
    bind = (ref = typeof port === 'string') != null ? ref : 'Pipe ' + {
      port: 'Port ' + port
    };
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        return process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        return process.exit(1);
      default:
        throw error;
    }
  };

  onListening = function() {
    var addr, bind, ref;
    addr = server.address();
    return bind = (ref = typeof addr === 'string') != null ? ref : 'pipe ' + {
      addr: 'port ' + addr.port
    };
  };

  server.listen(port,function(){
  	console.log(port);
  });

  server.on('error', onError);

  server.on('listening', onListening);

}).call(this);

//# sourceMappingURL=index.js.map
