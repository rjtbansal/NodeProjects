console.log("Starting password manager");

var storage=require('node-persist');
storage.initSync(); //to initialize variable storage

//setItemSync allows to save variables to our server: arg1: var name; arg2: value..its like key val pair
//storage.setItemSync('name','rajat');
// var name=storage.getItemSync('name'); //getting saved item
// console.log("Saved name: "+name);

//storage.setItemSync('accounts',[{username: 'rajat', balance:20000}]);

//storage.setItemSync('accounts',[{username:'raghav',balance:10000}]);
var accounts=storage.getItemSync('accounts');
// accounts.push({username:'rajat',balance:20000});
// storage.setItemSync('accounts',accounts);
console.log(accounts);