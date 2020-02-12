const express = require('express');
const app = express();

app.use(require('./routes'));


app.listen(4242, function () {
  console.log('Listening on port 4242');
})