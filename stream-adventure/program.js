var zlib = require('zlib');
var crypto = require('crypto');
var tar = require('tar');
var through = require('through');
var combiner = require('stream-combiner');
var concat = require('concat-stream');



var tarParser = tar.Parse();
tarParser.on('entry', function (e) {
  //console.dir(e);
  tarParser.emit('data', {entry:e});
});

var app = combiner(
  crypto.createDecipher(process.argv[2], process.argv[3]),//decrypt
  zlib.createGunzip(),//decompress
  tarParser,//extract files
  through(function(container){
    var t = this;
    if (container.entry && container.entry.type === 'File') {
      container.entry.pipe(crypto.createHash('md5', { encoding: 'hex' })).pipe(concat(function (hash) {
        t.queue(hash.toString() + " " + container.entry.path+"\n");
      }));
    }
  })
);


process.stdin.pipe(app).pipe(process.stdout);
