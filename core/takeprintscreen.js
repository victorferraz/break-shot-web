'use strict';

const Pageres = require('pageres');
const async = require('async');
const fs = require('fs');
const Q = require('q');

var TakePrintScreen = function(){};

TakePrintScreen.prototype.takePics = function (data, callback) {
    let path = data.settings.url.replace('http://', '');
    data.savedFiles = __dirname + '/../' + data.folder;
    let deferred = Q.defer();
    async.every(data.media, function(item, cb) {
        const pageres = new Pageres({delay: 10})
            .src(path, [item], {crop: true})
            .dest(data.savedFiles)
            .on('warning', error => console.log(error))
            .run()
            .then(() => cb(null, true));
    }, function(err, result) {
        console.log('err', err);
        console.log('finished', result);
        deferred.resolve(data);
    });
    return deferred.promise;
};

module.exports = new TakePrintScreen();
