const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send('Hello World, from express')
});

module.exports = router
