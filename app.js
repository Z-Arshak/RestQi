const express = require('express');


//for handling POST requests
const bodyParser = require('body-parser');

const app = express();

const todoController = require('./controller/todoController');

//const path = require('path');


app.set('view engine', 'ejs');

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//for normal html file  with sendFile
//app.get(['/', '/home', '/index'], (req, res) => res.sendFile(__dirname + '/index.html'));

//fire cntrollers
todoController(app);

//static files
//vor asset folder-i meji faylerin karoxanam kpnem
//app.use('/assets', express.static('assets'));
app.use(express.static('./assets'));



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


// POST /login gets urlencoded bodies
app.post('/contact', urlencodedParser, function (req, res) {
    //res.send('welcome, ' + req.body.username)
    console.log(req.body);
    console.log(req.body.firstName);
    res.render('verify', { data: req.body });
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




// use port 3000 unless there exists a preconfigured port
app.listen(process.env.PORT || 3000);