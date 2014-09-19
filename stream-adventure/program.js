var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
  var counts = {};

  var tr = through(
    function write (row) {
      counts[row.country] = (counts[row.country] || 0) + 1;
    },
    function end () {
      counter.setCounts(counts);
    });

  return duplexer(tr, counter);
};
