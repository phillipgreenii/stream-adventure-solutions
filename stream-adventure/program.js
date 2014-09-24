var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  var current_genre,
      books = [];
  function dumpBooks(stream) {
    if (current_genre) {
      var result = {
        name: current_genre,
        books: books
      };
      stream.queue(JSON.stringify(result)+"\n");
    }
  }
  return combine(
    split(),
    through(
      function write(line){
        if (line.length === 0) {
          return;
        }
        var json = JSON.parse(line);
        if (json.type == 'genre') {
          dumpBooks(this);
          current_genre = json.name;
          books = [];
        } else if (json.type == 'book') {
          books.push(json.name);
        } else {
          // FIXME should throw error
        }
      },
      function end(){
        dumpBooks(this);
        this.queue(null);
      }),
    zlib.createGzip()
  );
};
