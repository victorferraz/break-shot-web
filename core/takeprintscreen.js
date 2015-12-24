'use strict';

var pageres = require('pageres');
var async = require('async');
var fs = require('fs');
var JSZip = require('jszip');
var zip = new JSZip();
var fs = require('fs');
var Q = require('q');

var TakePrintScreen = function(){
};

TakePrintScreen.prototype.takePics = function (mediaArray, data, callback) {
    this.destiny = data.destiny;
    this.index = 0;
    this.data = data;
    this.medias = mediaArray;
    this.dataNames = [];
    this.dir = '';
    this.currentFolder = '';
    var merged = [];
    var params = mediaArray;
    if (data.size === 'auto-sizing'){
        params = merged.concat.apply(merged, mediaArray);
    }
    return Q.all(mediaArray.map(this.take.bind(this))).then(this.onFinished.bind(this));
};

TakePrintScreen.prototype.onFinished = function(res) {
    var resObj = {};
    resObj.dir = this.dir;
    resObj.folder = this.currentFolder;
    resObj.imgObj = res;
    return resObj;
};


TakePrintScreen.prototype.take = function (sizes) {
    var arrayWidth = this.getWidth(sizes);
    var path;
    this.index++;
    var self = this;
    this.dir = this.createDir();
    path = this.data.url.replace('http://', '');
    var deferred = Q.defer();
    var pgeres = new pageres({delay: 5})
        .src(path, arrayWidth, {'filename': this.data.fileName + '-<%= size %>', 'format': this.data.extension })
        .dest(this.dir);
    pgeres.run(function(err, streams){
        if (err) {
            throw err;
        }else{
            deferred.resolve(streams);
        }
    });
    return deferred.promise;
};

TakePrintScreen.prototype.createDir = function () {
    this.currentFolder = Date.now();
    var dir = __dirname + '/../tmp/' + this.currentFolder;
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
