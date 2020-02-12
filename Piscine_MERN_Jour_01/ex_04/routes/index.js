const express = require('express');
const router = express.Router();

router.get('/name', (req, res) => {
    res.send('Hello unknown');
});

router.get('/name/:name', (req, res) => {
    res.send('Hello '+ req.params.name);
});

router.get('/', function (req, res) {
    res.send('Great ! It works.')
  })


module.exports = router;