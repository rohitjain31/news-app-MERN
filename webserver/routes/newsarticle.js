const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NewsArticle = require('../models/headlinearticlemodel');

router.get('/', isLoggedIn, function(req, res) {
  console.log('step1');
  NewsArticle.find({}, (err, article) => {
    if(err) {
      res.send(err);
    }
    else {
      res.send(article);
    }
  });
})

.get('/id/:id', function(req, res) {
  NewsArticle.findById(req.params.id, (err, article) => {
    if(err) {
      res.send(err);
    }
    else {
      res.send(article);
    }
  });
})
.post('/', isLoggedIn, function(req, res) {
  let article = new NewsArticle(req.body);

  const title = article.title;

  NewsArticle.findOne({title: title}, (err, headline) => {
    if(err) {
      res.send(err);
    }
    else if(headline) {
      res.send('this article is already saved!!!');
    }
    else {
      article.save(function(err) {
        if(err) {
          res.send(err);
        }
        res.json({message: article});
      });
    }
  });
  // console.log(req.body);
})
.put('/:articleId', isLoggedIn, function(req, res) {
  NewsArticle.findOne({articleId: req.params.articleId}, (err, article) => {
    if(err) {
      res.send(err);
    }
    else {
      // update comments here
      article.comments = req.body.comments;
      article.save((error, headline) => {
        if(error) {
          res.send(error);
        }
        else{
          res.send(headline);
        }
      });
    }
  });
})
.delete('/:articleId', isLoggedIn, function(req, res) {
  // console.log(req.body);
  // console.log(req.params.articleId);
  NewsArticle.findOne({articleId: req.params.articleId}, (err, article) => {
    // console.log(req.params.articleId);
    if(err) {
      res.send(err);
    }
    else if(article) {
      article.remove((error) => {
        if(error) {
          res.send(error);
        }
        else {
          res.send('removed successfully...');
        }
      });
    }
    else {
      res.send('article is not saved');
    }
  });
});

function isLoggedIn(req, res, next) {
  console.log('step2');
  if(req.isAuthenticated()) {
    console.log('step3');
    return next();
  }
  console.log('step4');
  res.send('user is not loggedIn!!!');
}

module.exports = router;
