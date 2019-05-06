const express  = require('express');
const bodyParser   = require('body-parser');
const path = require('path');
var NodeCouchDb = require('node-couchdb');


const nano = require('nano/lib/nano')('http://admin:group3@172.26.38.76:5984');
const dbNano = nano.use('realtime_tweets');

dbNano.insert(
    {
        "views": {
            "by_token": {
                "map": "function(doc) { \n var emojis = ['🍔', '🍟', '🍕', '🌭', '🍰', '🍫', '🍦', '🍨', '🍩', '🍺', '🍻', '😋', '🤤', '🎂', '🍷', '🍬', '🍪', '🍗', '🍜'] \n var token_list = ['Burger', 'Fast food', 'Fish and chips', 'Ice cream', 'Junk food', 'Beer', 'Soft drink', 'KFC', 'Alcohol', 'McDonald', 'Hungry Jack', 'Chocolate', 'Cake', 'Doughnut', 'Cheess', 'Fried chicken', 'dominos', 'dessert', 'Candy', 'Bubble Tea'] \nfor (var i = 0; i < token_list.length; i++) {\ntoken_list[i] = token_list[i].toLowerCase()\n}\nvar all = token_list.concat(emojis)\nfor (var i = 0; i < all.length; i++) {\nif (doc.text.toLowerCase().indexOf(all[i]) != -1) {\nemit(doc.text, 1);\n}\n}\n}",
                "reduce": "_sum"
            }
        },
        "language": "javascript"
    }, '_design/burTest', function (error, response) {
        console.log("yay");
    });

const couch = new NodeCouchDb({
    host: '172.26.38.76',
    protocol: 'http',
    port: 5984,
    auth:{
        user:'admin',
        password:'group3'
    }
});
const dbName = 'realtime_tweets'
const viewUrl = '_design/burTest/_view/by_token';
couch.listDatabases().then(function(dbs){
    console.log(dbs);
});


const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    couch.get(dbName,viewUrl).then(
        function(data,headers,status){
            res.render('index',{
                temp:data.data.rows[0].value
            });
        },
        function(err){
            res.send(err);
        });
});
app.listen(3000,function(){
   console.log('Server Started On Port 3000');
});
