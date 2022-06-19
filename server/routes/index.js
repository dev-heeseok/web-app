const express = require('express');
const router = express.Router();
const users = require('./users');

router.use('/users', users);
router.get('/hello', (req, res) => {
  res.send('Hello World');
})

module.exports = router;