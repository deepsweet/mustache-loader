'use strict';
var loaderUtils = require('loader-utils');
var Hogan = require('hogan.js');
var minifier = require('html-minifier');
var extend = require('xtend');

// https://github.com/kangax/html-minifier#options-quick-reference
var minifierDefaults = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    caseSensitive: true
};

module.exports = function(source) {
    var query = loaderUtils.getOptions(this) || {};
    var hoganOpts = extend(query, { asString: true });
    delete hoganOpts.minify;
    delete hoganOpts.noShortcut;

    if (this.cacheable) {
        this.cacheable();
    }

    // minify?
    if (query.minify) {
        // `?minify`
        var minifierOptions = minifierDefaults;

        // `?{minify:{...}}`
        if (Object.prototype.toString.call(query.minify) === '[object Object]') {
            minifierOptions = extend(minifierOptions, query.minify);
        }

        source = minifier.minify(source, minifierOptions);
    }

    var suffix;
    if (query.noShortcut) {
        suffix = 'return T; }();';
    } else {
        suffix = 'return T.render.apply(T, arguments); };';
    }

    return 'var H = require("hogan.js");\n' +
           'module.exports = function() { ' +
           'var T = new H.Template(' +
           Hogan.compile(source, hoganOpts) +
           ', ' +
           JSON.stringify(source) +
           ', H);' + suffix;
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    if (remainingRequest.indexOf('!') >= 0) {
        var query = loaderUtils.getOptions(this) || {};
        var hoganOpts = extend(query);
        delete hoganOpts.minify;
        delete hoganOpts.noShortcut;
        if (this.cacheable) {
            this.cacheable();
        }
        var suffix;
        if (query.noShortcut) {
            suffix = 'return T; }();';
        } else {
            suffix = 'return T.render.apply(T, arguments); };';
        }
        return 'var result = require(' + loaderUtils.stringifyRequest(this, '!!' + remainingRequest) + ')\n' +
            'var H = require("hogan.js");\n' +
            'window.Hogan = H;\n' +
            'module.exports = function() {\n' +
            'var T = H.compile(result, ' + JSON.stringify(hoganOpts) + ');\n' +
            suffix;
    }
};
