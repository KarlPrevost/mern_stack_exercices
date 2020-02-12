var port = 4242;

const express = require('express');
const app = express();
const mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

function insert(data) {
  // Connect to the db
  mongoClient.connect("mongodb://localhost:27042",{useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {

    const db = client.db('mern-pool')
    const collection = db.collection('students');
    collection.insert(data)

    // db.collection('students', function (err, collection) {
    //   if (err) throw err;
    //   collection.insert(data);
    // });

    if (err) throw err;
  });
}

app.get('/', function (req, res) {
  res.set({
    'Access-control-Allow-Origin': '*'
  });
  res.sendFile(__dirname + '/index.html');
})

app.post('/addstudent', function (req, res) {
  var name = req.body.firstName;
  var email = req.body.email;
  var lastname = req.body.lastName;
  var phone = req.body.phone;

  var data = {
    "id": 1,
    "firstname": name,
    "email": email,
    "lastname": lastname,
    "phone": phone,
    "admin": false,
    "validated": "in progress"
  }

  try {
    console.log(data);
    insert(data);
  } catch (err) {
    return res.send("Failed to save the collection");
  }

  return res.send("Collection saved");
})

// lancer le server
app.listen(port, () => {
    console.log("Server listening on port " + port);
  });