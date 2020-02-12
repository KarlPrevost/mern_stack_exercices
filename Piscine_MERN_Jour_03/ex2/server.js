
/** on fait le lien avec les dependances */
var express = require("express");
var bodyParser = require("body-parser");
/**on se connecte à mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27042/', { useNewUrlParser: true, useUnifiedTopology: true  });
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

/* on initialise et on prépare notre serveur express**/
var app = express()

/**on défini la config de notre serveur  */
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

/* on défini le comportement de la route "/", sur un get on execute returnForm */
app.route('/login')
    .get(function (req, res) {
        res.set({
            'Acess-control-Allow-Origin': '*'
        });
        res.sendFile(__dirname + '/login.html')
    })
    .post(function (req, res) {
        //on récupére les éléments de notre form 
        var email = req.body.email;
        var pass = req.body.password;

        // on initialise l'objet data avec les propriétés
        var data = {
            "email": email,
            "password": pass
        }
        var returnLogin = login(data);
        returnLogin ? res.send("logged!") : res.send("not logged try again!");
    });

app.route('/register')
    .get(function (req, res) {
        res.set({
            'Acess-control-Allow-Origin': '*'
        });
        res.sendFile(__dirname + '/register.html')
    })
    .post(function (req, res) {
        //on récupére les éléments de notre form 
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;
        var phone = req.body.phone;

        // on initialise l'objet data avec les propriétés
        var data = {
            "name": name,
            "email": email,
            "password": pass,
            "phone": phone

        }

        var returnLogin = register(data);
        returnLogin ? res.send("registered!") : res.send("unregistered!");
    });

function login(data) {
    db.collection('users').find(data,function(err,collection){
        if (err){
            return false;
        }
    });
    return true ;
}
function register(data) {
    db.collection('users').insertOne(data, function (err, collection) {
        if (err) {
             //throw err ;
            return false;
        }
    });
    return true;
}

app.listen(4242);

console.log("server listening at port 4242"); 
