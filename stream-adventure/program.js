var fs = require('fs'),
    inFile = process.argv[2];


fs.createReadStream(inFile).pipe(process.stdout);
