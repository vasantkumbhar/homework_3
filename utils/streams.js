var fs = require('fs')
var csvParse = require('csv-parse')

fs.createReadStream('./utils/data.csv')
    .pipe(csvParse({ auto_parse: true }))
    .on('data', function(record) {
        console.log(JSON.stringify(record))
    })