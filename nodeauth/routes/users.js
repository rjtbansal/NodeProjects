var express = require('express');
var router = express.Router();
var multer=require('multer');
var upload=multer({dest:'./uploads'});
var User=require('../models/user');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
  res.render('register',{title:'Register'});
});

router.get('/login', function(req,res,next){
  res.render('login',{title:'Login'});
});

router.post('/login', passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Wrong username and/or password'}),function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.flash('success','You are successfully logged in');
    res.redirect('/');
  });
  
 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
  
  passport.use(new localStrategy(function(username,password,done){
    User.getUserByUsername(username, function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message: 'User not found'});
      }
      
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
        }
        else{
          return done(null,false,{message: 'Password doesnt match our records'});
        }
      });
    });
    
  }));

//body-parser cant handle files..for that we use multer..here upload.single() means upload a single files
//upload.single takes argument which is the name attribute value of that file in register.jade
router.post('/register', upload.single('profile_pic'),function(req,res,next){
    var name=req.body.name;
    var email=req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    var confirm_password=req.body.conf_password;
    
    //note: if we upload multiple files or deal with multiple files we would use 'req.files'
    //we are using multer to deal with files
    if(req.file){
      console.log('Uploading image...');
      var profile_pic=req.file.filename; 
    }
    else{
      console.log('No image uploaded');
      var profile_pic='default.jpg'; //if no profile image uploaded use a default placeholder image
    }
    
    //form validation : we are using express-validator
    req.checkBody('name','Name cannot be empty').notEmpty();
    req.checkBody('email','Email cannot be empty').notEmpty();
    req.checkBody('email','Email is invalid').isEmail();
    req.checkBody('username','Username cannot be empty').notEmpty();
    req.checkBody('password','Password cannot be empty').notEmpty();
    req.checkBody('conf_password','Passwords dont match').equals(password);
    //respond to errors
    var errors=req.validationErrors();
    if(errors){
     // console.log("Errors encountered :");
     res.render('register', {
       errors:errors
     })
    }
    else{
      //console.log("No errors");
      var newUser=new User({
        name: name,
        email: email,
        username: username,
        password: password,
        profile_pic: profile_pic
      });
      
      User.createUser(newUser, function(err, user){
        if(err){
          throw err;
        }
        else{
          console.log(user); 
        }        
      });
      req.flash('success','You are successfully registered. Login to proceed');
      res.redirect('/');
    }
    
});

 router.get('/logout',function(req,res){
   req.logout();
   req.flash('success','You are logged out');
   res.redirect('/users/login'); //redirecting it to login page after logout
 });
module.exports = router;
