var express=require('express');
var app=express();
var body_parser=require('body-parser');
var todos=[];
var todo_next_id=0;
var _=require('underscore');
var PORT=process.env.PORT || 3000; 

app.use(body_parser.json()); //attaching middleware to our app 
app.get('/',function(req,res){
    res.send('Todo app');
});

//api: GET todos
app.get('/todos',function(req,res){
    res.json(todos);
});

//api: GET todos/:id
app.get('/todos/:id',function(req,res){
    //by default it will treat todo_id as string so it needs to be converted to int, 2nd arg 10 is base
    var todo_id=parseInt(req.params.id, 10);
    var matched=_.findWhere(todos,{id:todo_id});

    // todos.forEach(function(todo){
    //     if(todo_id === todo.id){
    //         matched=todo;
    //     }
    // });

    if(matched){
        res.json(matched);
    }else{
        res.status(404).send();
    }
    

    //res.send('Todo requested by id: '+req.params.id);
});

//api: post todo
app.post('/todos',function(req,res){
    //var body=req.body;

    //_.pick lets me filter fields..from req.body we will only show 'description' and 'completed'
    var body=_.pick(req.body, 'description', 'completed');

    if( !_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){ //if completed isnt boolean and description isnt string then return 400
        return res.status(400).send(); 
    }

    //trim will delete trailing and leading spaces
    body.description=body.description.trim();
    body.id=todo_next_id;
    todo_next_id++;

    todos.push(body);
    res.json(body);
});

//api: delete todo
app.delete('/todos/:id',function(req,res){
    var todo_id=parseInt(req.params.id,10); 
    var matched=_.findWhere(todos,{id:todo_id});
    if(!matched){
        res.status(404).json({"error":"No todo found with that id"});
    }
    else{
    todos=_.without(todos, matched);
    res.json(matched);
}   
});

//api : update todo
app.put('/todos/:id', function(req, res){
   var todo_id=parseInt(req.params.id, 10);
   var matched=_.findWhere(todos,{id:todo_id});
   if(!matched){
       res.status(404).json({"error":"No todo found with that id"});
   }
   else{
       var body=_.pick(req.body, 'description', 'completed');
       var valid_attributes = {}; 

       //if completed property exists and its of type boolean then attributes are valid and we can add them to valid_attributes object
       if(body.hasOwnProperty('completed')  && _.isBoolean(body.completed)){
           valid_attributes.completed = body.completed;
       }
       //if property exists but isnt boolean then its bad
       else if(body.hasOwnProperty('completed')){
           res.status(400).send();
       }else{

       }

       if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
           valid_attributes.description = body.description;
       }
       else if(body.hasOwnProperty('description')){
           res.status(400).send();
       }else{

       }

       //underscore extend allows objects to be copied. Here we are overriding matched with content in valid_attributes
       _.extend(matched, valid_attributes);
       res.json(matched);
   } 
});

app.listen(PORT, function(){
    console.log('Express listening on port '+PORT);
});