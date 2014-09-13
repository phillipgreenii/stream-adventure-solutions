var http = require('http'),
    through = require('through');

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(through(function(buf){
          this.queue(buf.toString().toUpperCase())
        })).pipe(res);
    } else {
        res.end('beep boop\n');
    }
});
server.listen(process.argv[2]);
