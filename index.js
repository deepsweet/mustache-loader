'use strict';

var Hogan = require('hogan.js');

module.exports = function(source) {
    this.cacheable && this.cacheable();

    return 'var Hogan = require("hogan.js");' +
           'module.exports = function() {' +
           'var T = new Hogan.Template(' +
           Hogan.compile(source, { asString: true }) +
           ', ' +
           JSON.stringify(source) +
           ', Hogan); return T.render.apply(T, arguments) ;}';
};
