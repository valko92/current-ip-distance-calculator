var express = require('express');
var app = express();
var path = require('path');
var request = require('request-promise');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var getdistance = require('./getdistance.js');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://val.kozhynov.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/distance', function (req, res) {
    var origin = req.query.origin;
    var destination = req.query.destination;

    console.log(`GET /distance?origin=${origin}&destination=${destination}`);

    getdistance(origin, destination, function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

var port = process.env.PORT || 8080;
http.listen(port, function() {
    console.log(`listening on ${port}`);
});

module.exports = app;
