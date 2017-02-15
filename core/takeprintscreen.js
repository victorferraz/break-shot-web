'use strict';

const Pageres = require('pageres');
const async = require('async');
const fs = require('fs');
const Q = require('q');

var TakePrintScreen = function(){};

TakePrintScreen.prototype.takePics = function (data, callback) {
    this.destiny = data.folder;
    this.data = data.settings;
    this.medias = data.media;
    this.dir = '';
    this.currentFolder = '';

    let path = this.data.url.replace('http://', '');
    let deferred = Q.defer();
    let dir = __dirname + '/../' + this.destiny;

    async.each(this.medias, (item,z) =>{
    console.log(item, callback);
        const pageres = new Pageres({delay: 250})
        .src(path, item)
        .dest(dir)
        .on('warning', err => console.log(err))
        .run()
        .then(() => callback());
    }, (err) =>{
        console.log(err);
    });


};

module.exports = new TakePrintScreen();
