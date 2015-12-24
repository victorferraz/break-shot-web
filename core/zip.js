var fs = require('fs');
var archiver = require('archiver');
var archive = archiver('zip');
var Q = require('q');

var Zip = function () {};

Zip.prototype.zipFolder = function (obj, callback) {
    var response = {};
    response.obj = obj;
    var zipName = obj.dir + '.zip';
    var output = fs.createWriteStream(zipName);
    response.zipName = zipName;
    output.on('close', function() {});
    archive.on('error', function(err) {
      throw err;
    });
    console.log('start zip');

    var deferred = Q.defer();
    archive
      .directory(obj.dir)
      .finalize();
    deferred.resolve(response);
    return deferred.promise;
};

module.exports = new Zip();
