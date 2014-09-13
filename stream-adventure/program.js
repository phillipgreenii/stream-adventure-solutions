var through = require('through'),
    split = require('split');

function lineCounter() {
  var current = 0;
  return through(function(line) {
    this.queue([line, ++current]);
  });
}

process.stdin
    .pipe(split())
    .pipe(lineCounter())
    .pipe(through(function (parts) {
        line = parts[0];
        count = parts[1];
        if (count % 2 === 0) {
          this.queue(line.toUpperCase() +"\n");
        } else {
          this.queue(line.toLowerCase() +"\n");
        }
    }))
    .pipe(process.stdout);
