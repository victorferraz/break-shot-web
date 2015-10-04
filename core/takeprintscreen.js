'use strict';

var pageres = require('pageres');
var async = require('async');
var fs = require('fs');
var JSZip = require('jszip');
var zip = new JSZip();
var fs = require('fs');
var zipFile = require('zip');

var TakePrintScreen = function(){
};

TakePrintScreen.prototype.takePics = function (mediaArray, data, callback) {
    this.destiny = data.destiny;
    this.index = 0;
    this.data = data;
    this.medias = mediaArray;
    this.dataNames = [];
    var merged = [];
    var params = mediaArray;
    if (data.size === 'auto-sizing'){
        params = merged.concat.apply(merged, mediaArray);
    }
    return async.eachLimit(mediaArray, 1, this.take.bind(this), function(res){
        callback(res);
    });
};

TakePrintScreen.prototype.onFinished = function(data){
};


TakePrintScreen.prototype.take = function (sizes, callback) {
    var arrayWidth = this.getWidth(sizes);
    var path;
    this.index++;
    var self = this;
    var dir = this.createDir();
    path = this.data.url.replace('http://', '');
    var pgeres = new pageres({delay: 5})
        .src(path, arrayWidth, {'filename': this.data.fileName + '-<%= size %>', 'format': this.data.extension })
        .dest(dir);
    pgeres.run(function(err, streams){
        if (err) {
            throw err;
        }else{
            callback(streams);
        }
    });
};

TakePrintScreen.prototype.createDir = function () {
    var tmpDir = Date.now();
    var dir = __dirname + '/../tmp/' + tmpDir;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    return dir;
};

TakePrintScreen.prototype.getWidth = function (arraySizes) {
    var arrayWidth = [];
    for (var i = 0; i < arraySizes.length; i++) {
        arrayWidth[i] = arraySizes[i].size;
    }
    return arrayWidth;
};

module.exports = new TakePrintScreen();
