console.log(process.argv);

if(process.argv.length <= 2){
    console.log('Please pass some argument')
}
else{
    var args = process.argv.slice(2);
    console.log(args);

    var action = args[0].split("=");
    var funVar = action[1];
    if(args.length > 1){
        var file = args[1].split("=");
        console.log(funVar);
        eval(funVar)(file[1]);
    }
    else{
        eval(funVar)();
    }
}

function reverse(str){
    console.log('reverse function: ', str);
}

function transform(str){
    console.log('transform function: ', str);
}