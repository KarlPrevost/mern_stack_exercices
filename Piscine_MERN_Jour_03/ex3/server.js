
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

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String
});
var UserModel = mongoose.model('userdb', userSchema);

var produitSchema = new mongoose.Schema({
    titre: String,
    description: String,
    prix: Number
});
var ProduitModel = mongoose.model('produitdb', produitSchema);

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
        var userTest = {
            "email": email,
            "password": pass
        };
        var returnLogin = loginUser(userTest);
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

        // on initialise l'objet data avec les propriété
        var userTest = new UserModel({
            name: name,
            email: email,
            password: pass,
            phone: phone
        });

        var returnLogin = registerUser(userTest);
        returnLogin ? res.send("registered!") : res.send("unregistered!");
    });

app.route("/boutique/:idProduit")
    .get(function (req, res) {
        res.send("1!");
        var produitTest = {"_id":req.params.idProduit};
        console.log(searchProduit(produitTest));
    })

app.route("/boutique")
    .get(function (req, res) {
        var produitTest = {};
        var newProduit = ProduitModel({
            titre: "Test2",
            description: "TestDescrib2",
            prix: 150
        });
        createProduit(newProduit);
        
        searchProduit(produitTest).then(function (result) {
            res.send(result);
        });
        
    })

function loginUser(data) {
    return read(data, UserModel) !== undefined;
}

function registerUser(data) {
    return insert(data);
}

function searchProduit(data) {
    return read(data, ProduitModel).exec();
}

function createProduit(data) {
    return insert(data, ProduitModel);
}

function insert(objectModel) {
    objectModel.save(function (err, fluffy) {
        if (err) {
            console.error(err);
            return false;
        }
    });
    return true;
}

function read(objectModel, model) {
    return model.find(objectModel, function (result) {
        return result;
    });
}

app.listen(4242);

console.log("server listening at port 4242"); 
