var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');
var db=mongoose.connection;

//user schema
var UserSchema=mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    name:{
        type: String
    },
    profile_pic:{
        type: String
    }
    
});

//'User' will be our model name and UserSchema is passed as schema for 2nd arg
var User=module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById=function(id,callback){ 
    User.findById(id,callback);     
}

module.exports.getUserByUsername=function(username,callback){
    var query={username:username};
    User.findOne(query, callback);
}

module.exports.comparePassword=function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null,isMatch);
  });
}
//so that createUser is available outside this module for usage
module.exports.createUser=function(newUser,callback){
   
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        newUser.password=hash;
        newUser.save(callback);     
    });
});
    
}