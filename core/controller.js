'use strict';

var GetCss = require('./getcss');
var MediaQuerieRotine = require('./mediaquerierotine');
var TakePrintScreen = require('./takeprintscreen');
var ReadHtml = require('./readHtml');
var CustomSize = require('./customsize');

var Q = require('q');
var Controller = function () {};

Controller.prototype.go = function (data, callback) {
    var settings = data;
    var readHtml = ReadHtml.getHtmlArray(data);
    var deferred = Q.defer();
    deferred.resolve(readHtml);
    return deferred.promise.then( function(readHtml) {
        var urlMain = GetCss.run(readHtml, settings);
        return urlMain;
    }).then( function(urlMain) {
        var media = '';
        if (data.size === 'auto-sizing') {
            media = MediaQuerieRotine.getBreakPoints(urlMain, settings);
        } else {
            media = CustomSize.getSizes(settings);
        }
        return media;
    }).then( function(mediaQueries) {
        TakePrintScreen.takePics(mediaQueries, settings, function (data) {
           return callback(data);
        });
    });

};

module.exports = new Controller();
