express = require('express')
path = require('path')
logger = require('morgan')
bodyParser = require('body-parser')
apiRoutse = require('../routes/api')
app = express()

# uncomment after placing your favicon in /public
#app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRoutse)

# catch 404 and forward to error handler
app.use((req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next(err)
)

# error handlers

# development error handler
# will print stacktrace
if app.get('env') is 'development'
  app.use((err, req, res, next) ->
    res.send(err.status || 500)
    res.render('error', {
      message: err.message
      error: err
    });
  );

# production error handler
# no stacktraces leaked to user
app.use((err, req, res, next) ->
  res.send(err.status || 500)
  res.render('error', {
    message: err.message
    error: {}
  });
);


module.exports = app;
