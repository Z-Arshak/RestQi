const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//var blogContent = [{ item: 'Content1' }, { item: 'Content2' }, { item: 'Content3' }, { item: 'Content4' }];

const urlencodedParser = bodyParser.urlencoded({ extended: false });


//connect to the database
//mongodb://<dbuser>:<dbpassword>@ds139722.mlab.com:39722/restqi
mongoose.connect("mongodb://user:123456Az@ds139722.mlab.com:39722/restqi", { useNewUrlParser: true, useUnifiedTopology: true });


var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('blogContent', todoSchema);

// var itemOne = Todo({ item: 'blog content1' }).save(function (err) {
//     if (err) throw err;
//     console.log('content is saved')
// });


module.exports = function (app) {

    app.get('/admin', function (req, res) {
        //to find specific item from db
        //Todo.find({item:'buy flowers'})

        //to return all itme
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('admin', { blogContent: data });

        });
    });



    app.post('/admin', urlencodedParser, function (req, res) {
        var saveContent = Todo(req.body).save(function (err, data) {
            //if (err) throw err;
            if (err) return handleError(err);
            //console.log(req.body);
            res.json(data);
        });
    });


    app.delete('/admin/:item', function (req, res) {
        var deleteItem = req.params.item.replace(/\-/g, " ").trim();
        console.log(deleteItem);
        Todo.deleteOne({ item: deleteItem }, function (err, data) {
            if (err) return handleError(err);
            // deleted at most one tank document
            res.json(data)
        });

    });

    // app.delete('/admin/:item', function (req, res) {
    //     Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
    //         if (err) throw err;
    //         res.json(data);
    //     });

    // });

};