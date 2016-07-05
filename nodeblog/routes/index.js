var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db=require('monk')('localhost/nodeblog'); //monk alternative to mongoose for mongodb

/* GET home page. */
router.get('/', function(req, res, next) {
  var db=req.db; //getting connection
  var posts=db.get('posts'); //getting posts collection
  posts.find({},{},function(err, posts){
      res.render('index', { posts: posts }); //passing the collection to index
  });
});

module.exports = router;
