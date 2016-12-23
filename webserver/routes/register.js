const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserInformation = require('../models/registerusermodel');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
})
  .post('/', function(req, res) {
    let userInfo = new UserInformation(req.body);
    const username = userInfo.userName;
    // console.log(userInfo);

    UserInformation.findOne({userName: username}, (err, user) => {
      if(err) {
        res.send(err);
      }
      else if(user) {
        res.send('user name is already taken!!');
      }
      else {
        userInfo.save(function(error) {
          if(error) {
            res.send(error);
          }
          else{
            res.send('user information saved to database');
          }
        });
      }
    });
  });

module.exports = router;
