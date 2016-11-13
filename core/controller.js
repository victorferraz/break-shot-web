'use strict';

var GetCss = require('./getcss');
var MediaQuerieRotine = require('./mediaquerierotine');
var TakePrintScreen = require('./takeprintscreen');
var ReadHtml = require('./readhtml');
var CustomSize = require('./customsize');
var Q = require('q');
var Zip = require('./zip');

var Controller = function () {};

Controller.prototype.go = function (data, callback) {
    console.log(data);
    var settings = data;
    var readHtml = ReadHtml.getHtmlArray(data);
    var deferred = Q.defer();
    deferred.resolve(readHtml);
    deferred.promise.then( function(readHtml) {
        console.log('readHtml');
        var urlMain = GetCss.run(readHtml, settings);
        return urlMain;
    }).then( function(urlMain) {
        console.log('urlMain');
        var media = '';
        if (data.size === 'auto-sizing') {
            media = MediaQuerieRotine.getBreakPoints(urlMain, settings);
        } else {
            media = CustomSize.getSizes(settings);
        }
        return media;
    }).then( function(mediaQueries) {
        console.log('mediaQueries');
        return TakePrintScreen.takePics(mediaQueries, settings);
    }).then( function (res) {
        return Zip.zipFolder(res);
    }).then( function (res) {
        console.log('finished');
        callback(res);
    });
};

module.exports = new Controller();
