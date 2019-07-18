const csvtojson = require("csvtojson");
const fs = require('fs');

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
        console.log('file: ', file);
        eval(funVar)(file[1]);
    }
    else{
        eval(funVar)();
    }
}

function reverse(str){
    console.log('reverse function: ', str);
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    console.log(newString);
}

function transform(){
    console.log('transform function');

    process.stdout.write('Please enter something: ');

    process.stdin.on('data', data => {
        process.stdout.write(data.toString().trim().toUpperCase() + '\n');
    })
}

function outputFile(file){
    console.log('outputFile function');
    var url = './data/'+file;
    var stream = fs.createReadStream(url, {bufferSize: 64 * 1024})
    stream.pipe(process.stdout);
}

function convertFromFile(file){
    console.log('convertFromFile function: ', file);
    var url = './data/'+file;
    csvtojson()
    .fromFile(url)
    .then((jsonObj)=>{
        process.stdout.write(JSON.stringify(jsonObj));
    })
    .error(()=>{
        process.stdout.write('File has been deleted.');
    })
}

function convertToFile(file){
    console.log('convertToFile function');

    var url = './data/'+file;
    var wstream = fs.createWriteStream(url + '.json');
    
    csvtojson()
    .fromFile(url)
    .then((jsonObj)=>{
        wstream.write(JSON.stringify(jsonObj));
        wstream.end(function () { console.log('done'); });
    })
    .error(()=>{
        process.stdout.write('File has been deleted.');
    })
}