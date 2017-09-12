var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var Path = require('path');
var compression = require('compression');

var listen_IP = '127.0.0.1';

listen_IP = process.env.SERVER_IP || listen_IP;


var port = process.env.PORT || 8000;

app.use(express.static(__dirname));
app.use(compression({
    level: 6
})); //6 is default

app.use(bodyParser.json());

app.use((req, res, next) => {
    if (!req.originalUrl.includes('/dist/', 0)) {
        res.sendFile(`${__dirname}/index.html`);
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(process.env.PORT || port, function () {
    console.info('Our app is running on http://localhost:' + port);
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});