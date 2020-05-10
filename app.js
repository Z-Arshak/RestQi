const express = require('express');
const app = express();

const path = require('path');


app.set('view engine', 'ejs');


//for normal html file  with sendFile
//app.get(['/', '/home', '/index'], (req, res) => res.sendFile(__dirname + '/index.html'));

//vor asset folder-i meji faylerin karoxanam kpnem
app.use('/assets', express.static('assets'));

//not to allow external users digg into my files
app.get('/assets/*', function (req, res) {
    res.render('index')
});


app.get(['/', '/home', '/index'], function (req, res) {
    res.render('index')
});

app.get('/products', function (req, res) {
    res.render('products')
});

app.get('/contact', function (req, res) {
    res.render('contact')
});


//for ejs with render
app.get(['/blog', '/blog/:name'], function (req, res) {
    console.log(req.query)
    var data = { age: 25, sex: 'male', hobbies: ['fishing', 'camping', 'horse riding'] }
    res.render('blog', { header: req.params.name, data: data })

    //res.send('You requested blog ' + req.params.name)

});



//in case the page does not exists. This should be at the end
app.get('*', function (req, res) {
    res.render('404');
});



app.listen(3000);