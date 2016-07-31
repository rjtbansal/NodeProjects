console.log("Starting password manager");

var storage=require('node-persist');
storage.initSync(); //to initialize variable storage

//setItemSync allows to save variables to our server: arg1: var name; arg2: value..its like key val pair
//storage.setItemSync('name','rajat');
// var name=storage.getItemSync('name'); //getting saved item
// console.log("Saved name: "+name);

//storage.setItemSync('accounts',[{username: 'rajat', balance:20000}]);

//storage.setItemSync('accounts',[{username:'raghav',balance:10000}]);
//var accounts=storage.getItemSync('accounts');
// accounts.push({username:'rajat',balance:20000});
// storage.setItemSync('accounts',accounts);
//console.log(accounts);

function createAccount(account) {
    var accounts=storage.getItemSync('accounts');
    if(typeof accounts==='undefined'){
        accounts=[];
    }
    accounts.push(account);
    storage.setItemSync('accounts',accounts);
    return account;
}

function getAccount(accountName) {
    var accounts=storage.getItemSync('accounts');
    var matchedAccount;
    accounts.forEach(function(account) {
        if(account.name === accountName){
            matchedAccount=account;
        }
    });

    return matchedAccount;
}

//storage.setItemSync('accounts',[{name:"rajat",username:'rjtbansal',password:'rjt123'}]);
//createAccount({name:'facebook',username:'fb123',password:'password123'});
//createAccount({name:'rajat',username:'rjtbansal',password:'password123'});


var retrieveAccount=getAccount('facebook');
console.log(retrieveAccount);

