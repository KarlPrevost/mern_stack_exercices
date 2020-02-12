var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27042/mern-pool', { useUnifiedTopology: true }, function (err, db) {
	if (err) {
        console.log("Connection failed");
		throw err;
	} else {
		console.log("Connection successfull");
	}
	db.close();
});
