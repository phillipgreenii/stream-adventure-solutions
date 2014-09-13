var concat = require('concat-stream');


process.stdin
    .pipe(concat(function (file) {
        console.log(file.toString().split("").reverse().join(""));
    }));
