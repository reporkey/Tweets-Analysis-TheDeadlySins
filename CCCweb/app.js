const express  = require('express');
const bodyParser   = require('body-parser');
const path = require('path');
const router = require("./router");
const PORT = process.env.PORT || 3000;
app = express();

//
// const dbIP = process.argv[2];

// init db: create view and run once (async)
const db = require("./couchDB");
db.creatView();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(router);
app.use(function(req, res, next){
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
    }
});

app.listen(PORT);
console.log('Express listening on port ' + PORT);