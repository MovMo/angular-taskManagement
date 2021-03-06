#模块引用
app = require('./libs/app')
http = require('http')
config = require('./config/config')

port = config.port
server = http.createServer(app)

onError = (error) ->
  if error.syscall isnt 'listen'
    throw error
  bind = typeof port is 'string' ? 'Pipe ' + port : 'Port ' + port;
  # handle specific listen errors with friendly messages
  switch error.code
    when 'EACCES'
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    when 'EADDRINUSE'
      console.error(bind + ' is already in use')
      process.exit(1)
    else
      throw error


onListening = ->
  addr = server.address()
  bind = typeof addr is 'string' ? 'pipe ' + addr : 'port ' + addr.port
  #debug('Listening on ' + bind)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)


