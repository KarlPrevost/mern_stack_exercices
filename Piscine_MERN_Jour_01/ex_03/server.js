// var http = require('http'),
var    fs = require('fs');


// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(4242);
// });



const express = require('express')
const app = express()

app.get('/', function (req, response) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.set("Content-Type", "text/html" );
        response.send(html);
    })
});

app.listen(4242, function () {
    console.log('Listening on port 4242')
})