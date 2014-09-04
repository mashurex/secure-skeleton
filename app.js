var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var compression = require('compression');
var csrf = require('csurf');
var helmet = require('helmet');
var routes = require('./routes/index');
var config = require('./config');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.app.cookie.secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.app.session.secret,
    key: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
        // secure: true // (HTTPS only)
    }
}));

app.use(compression({
    // threshold: 512 // Sets the min filesize threshold before compression.
}));

app.use(csrf());

app.use(config.app.path, routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function(err, req, res, next){
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    res.status(403);
    res.send('Session has expired or form has been tempered with!');
});

module.exports = app;
