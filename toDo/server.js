var express=require('express');
var app=express();
var body_parser=require('body-parser');
var todos=[];
var todo_next_id=0;

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
    var matched;
    todos.forEach(function(todo){
        if(todo_id === todo.id){
            matched=todo;
        }
    });

    if(matched){
        res.json(matched);
    }else{
        res.status(404).send();
    }
    

    res.send('Todo requested by id: '+req.params.id);
});

//api: post todo
app.post('/todos',function(req,res){
    var body=req.body;
    body.id=todo_next_id;
    todo_next_id++;
    todos.push(body);
    res.json(body);
});

app.listen(PORT, function(){
    console.log('Express listening on port '+PORT);
});