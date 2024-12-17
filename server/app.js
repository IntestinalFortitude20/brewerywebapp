/*********************************************************
 ******************* IMPORT STATEMENTS ******************* 
 *********************************************************/

'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var axios = require('axios');
var console = require('console');

var routes = require('./routes/index');
var users = require('./routes/users');

// Initialize Express framework
var app = express();

// Set local port
var port = 3050;

// Create a base API url
var baseURL = new URL('https://api.openbrewerydb.org');

// enable CORS
app.use(cors());



/********************************************** 
****************** ENDPOINTS ******************
***********************************************/

// The API returns a list of length 50 by default
//

// LIST ALL BREWERIES = FUNCTIONING
app.get('/breweries', async (req, res) => {
    
    try {
        var response = await axios.get(baseURL + '/breweries');
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch breweries' });
    }
});

// FILTER BREWERIES BY CITY = FUNCTIONING
app.get(`/breweries/by_city/:city`, async (req, res) => {
    var city = req.params.city;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_city=${city}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by city' });
    }
});

// FILTER BREWERIES BY STATE = FUNCTIONING
app.get(`/breweries/by_state/:state`, async (req, res) => {
    var state = req.params.state;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_state=${state}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by state' });
    }
});

// FILTER BREWERIES BY COUNTRY = FUNCTIONING
app.get(`/breweries/by_country/:country`, async (req, res) => {
    var country = req.params.country;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_country=${country}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by country' });
    }
});

// FILTER BREWERIES BY NAME = FUNCTIONING
app.get(`/breweries/by_name/:name`, async (req, res) => {
    var name = req.params.name;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_name=${name}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by name' });
    }
});

// FILTER BREWERIES BY POSTAL CODE
// NOTE: May be filtered by basic (5 digit) postal code or more precisely filtered by postal+4 (9 digit) code.
// NOTE: If filtering by postal+4 the search must include either a hyphen or an underscore.
app.get(`/breweries/by_postal/:postal`, async (req, res) => {
    var postal = req.params.postal;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_postal=${postal}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by postal code' });
    }
});


// FILTER BREWERIES BY TYPE
// MUST BE MICRO, NANO, REGIONAL, BREWPUB, LARGE, PLANNING,
// BAR, CONTRACT, PROPRIETOR, CLOSED
app.get(`/breweries/by_type/:type`, async (req, res) => {
    var type = req.params.type;
    
    try {
      var response = await axios.get(baseURL + `/breweries?by_type=${type}`);
      res.json(response.data);
    }
    catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch breweries by type' });
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//******************************************************
//******************* ERROR HANDLERS *******************
//******************************************************

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//****************************************************
//************** SET WHICH PORT TO USE ***************
//****************************************************

app.set('port', process.env.PORT || port);


//*************************************************
//**************** START THE SERVER ***************
//*************************************************

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port ' + server.address().port);
});
