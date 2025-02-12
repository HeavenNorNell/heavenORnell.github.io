const async = require('async');
async.series([
    function (callback) {
        callback(null, 'marco');
    },
    function (callback) {
        callback(null, 'polo');

    },
],
    function (err, results) { console.log(results); }
);