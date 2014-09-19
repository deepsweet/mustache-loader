'use strict';

var Hogan = require('hogan.js');

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    return 'var H = require("hogan.js");\n' +
           'module.exports = function() { ' +
           'var T = new H.Template(' +
           Hogan.compile(source, { asString: true }) +
           ', ' +
           JSON.stringify(source) +
           ', H); return T.render.apply(T, arguments); };';
};
