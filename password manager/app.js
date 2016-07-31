console.log("Starting password manager");

var storage=require('node-persist');
var argv=require('yargs')
        .command('create','Create user account', function(yargs){
            return yargs.options({
                name:{
                    demand: true,
                    alias: 'n' ,//lets us use it as option like -n instead of --n but multiple letters alias will work with double hyphens
                    description: 'Name of the organization',
                    type: 'string'

            },
            username: {
                demand:true,
                alias:'u',
                description: 'Select your username',
                type:'string'
            },
            password: {
                demand:true,
                alias:'p',
                description: 'Choose your password',
                type:'string'
            }
            });
        })
        .command('get','Get user account details',function(yargs){
            return yargs.options({
                name:{
                    demand:true,
                    alias:'n',
                    description:'Enter name of the organization',
                    type:'string'
                }
            });
        })
        .help('help')
        .argv;

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

var command=argv._[0];
if(command === 'create'){
    var createdAccount=createAccount({name: argv.name, username: argv.username, password: argv.password});
    console.log(createdAccount);
}else if(command === 'get'){
    console.log(getAccount(argv.name));
}


