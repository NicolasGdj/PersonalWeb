'use strict';

let express = require('express');
let app = express();
const fs = require('fs');

let config = require('./config.js');


const options = {
  key: fs.readFileSync(config.ssl.key_path),
  cert: fs.readFileSync(config.ssl.cert_path)
};
let http = require('https').createServer(options, app);

//let http = require('http').createServer(app);
let bodyParser = require('body-parser');

//Moteur de template
app.set('view engine', 'ejs');

// Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('*', (request, response) => {
    response.render('index')
});

http.listen(config.port, () => {
    console.log("Server listening on *:" + config.port);
});