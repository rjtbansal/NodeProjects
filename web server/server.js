var express=require('express');
var app=express();

//express get request
//1st arg is path and 2nd arg is callback function with 2 args- req(request) to recieve urls and data and 'res'(response) to send data from our side
// app.get('/',function(req,res){
//     res.send('<h1>Welcome to my express website</h1>'); //sending a response(res)
// });

/**middleware allow us to do certain tasks in the application. They are of 2 types: application level and route level
 * 
 * 
 */
var middleware={
    requireAuth: function(req,res,next){  //next calls the 'next' middleware function in the stack
        console.log('private route hit');
        next();
    },
    logger: function(req, res, next){
            console.log('Requested: '+req.method+' '+req.originalUrl+' on '+ (new Date()).toString());
            next();
    }
}

/*we use app.use to expose our middleware. where we place that middleware in the code is extremely important*/
//below is app level middleware
//app.use(middleware.requireAuth); 

app.use(middleware.logger);
var PORT=3000; //convention: all caps to specify const vars
app.listen(PORT,function(){
    console.log('Express Listening on port '+PORT);

}); //listen on port no. (3000 in this case)..callback function is executed after server is executed successfully

//challenge section

//below is route level middleware...we pass the middleware as 2nd argument
app.get('/about', middleware.requireAuth,function(req,res){
    res.send('<h2>About Me</h2>');
});

//exposing our public folder for use in website
//public folder contains all our front end files and images
//this will be used as default path..localhost:3000 will display by default index.html under public folder
//__dirname ensures that it dynamically pics our path to project route
app.use(express.static(__dirname+'/public'));