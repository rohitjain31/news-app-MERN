const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userInformation = require('../models/registerusermodel');
const passport = require('passport');
/* GET users listing. */

router.post('/', passport.authenticate('login-strategy'),
 function(req, res) {
  res.send('successfully loggedIn!!!');
});

module.exports = router;
