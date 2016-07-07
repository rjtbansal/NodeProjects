var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './public/images' }); //for file uploads
var mongo=require('mongodb');
var db=require('monk')('localhost/nodeblog'); //monk alternative to mongoose for mongodb..nodeblog is db name

// endpoint: /posts/add
router.get('/add', function(req, res, next) {
  
  //extracting out categories collection
  var categories=db.get('categories');
  
  //passing categories to our function 
  categories.find({},{},function(err, categories){
  res.render('addpost',{
    'title':'Add Post',
    'categories':categories //passing the collection to addpost page
  });
  });
});

//endpoint : /posts/add 
router.post('/add',upload.single('mainimage'),function(req,res,next){
  
  //extracting form data
  var title=req.body.title; 
  var category=req.body.category;
  var body=req.body.body;
  var author=req.body.author;
  
  //date will be calculated and sent right then
  var date=new Date();
  
  //check to see if file is uploaded 
  if(req.file){
    console.log("file uploaded");
    var mainimage=req.file.filename;
  }else{
    console.log('File not uploaded');
    var mainimage='noimage.jpg';
  }  
  
  //form validation
  req.checkBody('title','Title field is required').notEmpty();
  req.checkBody('body','Body field is required').notEmpty();
 
 //check for errors
  var errors = req.validationErrors();
  
  if (errors) {
    res.render('addpost',{
      "errors":errors
    });
  }else{
    //getting our posts collection
    var posts=db.get('posts');
    
     posts.insert({
       "title":title,
       "body":body,
       "category":category,
       "author":author,
       "date":date,
       "mainimage":mainimage
     }, function(err,post){
        if(err){
          res.send(err);
        }else{
          req.flash('success','Post added successfully');
          res.location('/');
          res.redirect('/');
        }
     });
  } 
});

module.exports = router;
