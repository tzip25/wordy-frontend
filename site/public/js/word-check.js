(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (__dirname){
var fs = require('fs');

var words = function(language){
    var possibleLanguages = ['de', 'en', 'es', 'fr'];

    language = language && language.toLowerCase() || 'en';

    if(possibleLanguages.indexOf(language) == -1) throw new Error(language + " is not valid language");
    return {
        check : function(word){
            var content = fs.readFileSync(__dirname + '/words/'+language+'.txt');
            var regex = new RegExp('\n' + word +'\n');
            if ( content.toString('utf-8').match(regex)) {
                return true;
            }
            return false;
        }
    };
};


module.exports = words;
}).call(this,"/node_modules/check-word")
},{"fs":1}]},{},[2]);


var checkWord = require('check-word'),
    words     = checkWord('en');
