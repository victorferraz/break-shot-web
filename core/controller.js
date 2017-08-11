'use strict';

const TakePrintScreen = require('./takeprintscreen');
const Q = require('q');
const Zip = require('./zip');

const Controller = function () {};
const detectBreakPoint = require('detect-media-queries');
const fs = require('fs');

Controller.prototype.go = function (data, callback) {
    const settings = data;
    return new Promise((resolve, reject) =>{
        fs.mkdtemp('./tmp/', (err, folder) => {
            if (!err) {
                resolve(folder);
            } else {
                reject(error);
            }
        });
    }).then((folder) =>{
        return this.detect(folder, settings);
    }).then(res=>{
        return  TakePrintScreen.takePics(res, data);
    }).then( function (res) {
        return Zip.zipFolder(res);
    }).then( function (res) {
        callback(res);
    }).catch(error=>console.log(error));
};

Controller.prototype.detect = (folder, settings) => {
    return new detectBreakPoint()
        .getMedia(settings.url, (err) => {
            console.log(err)
        }).then((media)=>{
            return {'media': media, 'folder': folder, 'settings': settings};
        });
};

module.exports = new Controller();
