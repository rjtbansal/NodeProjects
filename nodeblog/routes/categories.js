var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db=require('monk')('localhost/nodeblog'); //monk alternative to mongoose for mongodb..nodeblog is db name

// endpoint: /categories/add
router.get('/add', function(req, res, next) { 
  res.render('addcategory',{
    'title':'Add Category',
  });
});

//endpoint : /categories/add 
router.post('/add',function(req,res,next){
  
  //extracting form data
  var name=req.body.name;
  
  //form validation
  req.checkBody('name','Name field is required').notEmpty();
  
 //check for errors
  var errors = req.validationErrors();
  
  if (errors) {
    res.render('addcategory',{
      "errors":errors
    });
  }else{
    //getting our posts collection
    var categories=db.get('categories');
    
     categories.insert({
       "name":name
     }, function(err,post){
        if(err){
          res.send(err);
        }else{
          req.flash('success','Category added successfully');
          res.location('/');
          res.redirect('/');
        }
     });
  } 
});

module.exports = router;
