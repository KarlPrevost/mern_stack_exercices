
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Great ! It works.')
})

app.listen(4242, function () {
  console.log('Listening on port 4242')
})