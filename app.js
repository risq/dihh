// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var config = require('./config/config.json');

global.twitter = require('./app/twitter');

// configuration ===============================================================
mongoose.connect(process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://' + config.database.url); // connect to our database

require('./app/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/client/views');

// required for passport
app.use(session({ 
	secret: config.secret,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// app.use('/public', express.static(__dirname + '/public/dist'));
app.use(express.static(__dirname + '/public/app'));

app.use('/uploads', express.static(__dirname + '/public/uploads', { maxAge: 2592000000 }));

// DEBUG ONLY
app.locals.inspect = require('util').inspect;

// routes ======================================================================
require('./app/routes/public')(app);
require('./app/routes/admin')(app, passport);
require('./app/routes/digs')(app, passport);

// helpers =====================================================================
require('./app/helpers')(app, config);

// twitter =====================================================================
twitter.init(config.twitter);

// launch ======================================================================

var server = require('http').createServer(app);

server.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;

