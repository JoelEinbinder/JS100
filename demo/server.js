var express = require('express');
var app = express()
var bodyParser = require('body-parser')

/********** Middleware *********/
app.use(express.static('public'))

app.use(function(err, req, res, next) {
    console.error( err.stack );
    res.status(500).send("Something broke!");
});
app.use(bodyParser.json());

/********** Routing *********/
app.all('*', function(req, res, next) {
    console.log('\t| Request Url:', req.originalUrl);
    console.log('\t| Request Type:', req.method);
    next();
});

/** GET **/
app.get('/', function(req, res) {
    res.send('dummyPage.html');
});
app.get('/profile', function(req, res) {
    res.send("profile.html");
});

/*** Server ***/
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listneing at http://%s:%s', host, port);
});
