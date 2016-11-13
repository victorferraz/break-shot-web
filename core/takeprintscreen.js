'use strict';

var pageres = require('pageres');
var fs = require('fs');
var Q = require('q');
var throat = require('throat');

var TakePrintScreen = function(){};

TakePrintScreen.prototype.takePics = function (mediaArray, data, callback) {
    console.log('start take');
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
    return Q.all(mediaArray.map(  throat(this.take.bind(this), 1) )).then(this.onFinished.bind(this));
};

TakePrintScreen.prototype.onFinished = function(res) {
    var resObj = {};
    resObj.dir = this.dir;
    resObj.folder = this.currentFolder;
    resObj.imgObj = res;
    return resObj;
};

TakePrintScreen.prototype.take = function (sizes) {
    console.log('---', sizes);
    var arrayWidth = this.getWidth(sizes);
    var params = {};
    var path;
    this.index++;
    var self = this;
    this.dir = this.createDir();
    params.path = this.data.url.replace('http://', '');
    var deferred = Q.defer();
    params = {'dir': this.dir,  'filename': this.data.fileName + '-<%= size %>', 'format': this.data.extension };
    this.print(params);
};

TakePrintScreen.prototype.print = function (obj) {
    var pgeres = new pageres({delay: 5})
        .src(obj.path, obj.arrayWidth, {'filename': obj.data.fileName + '-<%= size %>', 'format': obj.data.extension })
        .dest(obj.dir)
        .run()
        .then(function(streams){
            console.log('pass');
            console.log(streams);
            deferred.resolve(streams);
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
