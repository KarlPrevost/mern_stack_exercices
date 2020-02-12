
const express = require('express')
const app = express()


app.get('/', function (req, res) {
    res.send('Great ! It works.')
})

app.get('/name', (req, res) => {
    res.send('Hello unknown I don\'t know your agre');
});

app.get('/name/:id', function (req, res) {
    if(req.query.age != undefined){ 
        res.send('Hello '+ req.params.id+' You are '+ req.query.age+ ' yo')
    }else{
        res.send('Hello '+ req.params.id+' '+ 'I don\'t know your age')

    }
})

app.listen(4242, function () {
  console.log('Listening on port 4242')
})