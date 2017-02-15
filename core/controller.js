'use strict';

var TakePrintScreen = require('./takeprintscreen');
var Q = require('q');
var Zip = require('./zip');

var Controller = function () {};
const detectBreakPoint = require('detect-media-queries');
const fs = require('fs');

Controller.prototype.go = function (data, callback) {
    var settings = data;
    console.log(settings);
    return new Promise((resolve, reject) =>{
        fs.mkdtemp('./tmp/', (err, folder) => {
            if (!err) {
                resolve(folder);
            } else {
                reject(error);
            }
        });
    }).then((folder) =>{
        console.log('1', folder);
        return new detectBreakPoint().getMedia('http://rccomunicacao.com.br/').then((media)=>{
            console.log('2', media);
            return {'media': media, 'folder': folder, 'settings': settings};
        });
    }).then(res=>{
        console.log('aaa3', res);
        return  TakePrintScreen.takePics(res, data);
    }).then( function (res, x) {
        console.log('4', res, x);
        return Zip.zipFolder(res);
    }).then( function (res) {
        callback(res);
    }).catch(error=>console.log(error));
};

module.exports = new Controller();
