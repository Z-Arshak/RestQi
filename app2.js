const http = require('http');
const user = require('./user');
const fs = require('fs')


const express = require('express')
const app = express()



console.log('hello');
console.log(__dirname);
console.log(user(' ArshaK ', 123654));


var server = http.createServer(function (req, res) {

    console.log(req.url)

    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
        myReadStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        var myReadStream = fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
    }

});

server.listen(3000, '127.0.0.1');