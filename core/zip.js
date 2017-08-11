const fs = require('fs');
const archiver = require('archiver');
const archive = archiver('zip');
const Q = require('q');
const Zip = function () {};

Zip.prototype.zipFolder = function (obj, callback) {
    console.log('zip files', obj);
    const response = {};
    response.obj = obj;
    response.zipName =  `${__dirname}/../tmp/${Date.now()}.zip`;
    const  output = fs.createWriteStream(response.zipName);
    output.on('close', function() {});
    archive.on('error', function(err) {
      throw err;
    });
    console.log('start zip');

    const deferred = Q.defer();
    archive
      .directory(obj.savedFiles)
      .finalize();
    deferred.resolve(response);
    return deferred.promise;
};

module.exports = new Zip();
