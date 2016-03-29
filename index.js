'use strict';

var loaderUtils = require('loader-utils');
var Hogan = require('hogan.js');
var minifier = require('html-minifier');
var attrParse = require("./lib/attributesParser");
var url = require("url")

// https://github.com/kangax/html-minifier#options-quick-reference
var minifierDefaults = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    caseSensitive: true
};

// :)
var extend = function(target, source) {
    target = JSON.parse(JSON.stringify(target));

    Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });

    return target;
};

var randomIdent = function () {
	return "xxxHTMLLINKxxx" + Math.random() + Math.random() + "xxx";
}

module.exports = function(source) {
    var query = loaderUtils.parseQuery(this.query);
    var attributes = ["img:src"];
    var data = {};
    var links;

    if (this.cacheable) {
        this.cacheable();
    }

    links = attrParse(source, function(tag, attr) {
        return attributes.indexOf(tag + ":" + attr) >= 0;
    });
    links.reverse();
    source = [source];
    links.forEach(function(link) {
        if(!loaderUtils.isUrlRequest(link.value, root)) return;

        var uri = url.parse(link.value);
        if (uri.hash !== null && uri.hash !== undefined) {
            uri.hash = null;
            link.value = uri.format();
            link.length = link.value.length;
        }

        do {
            var ident = randomIdent();
        } while(data[ident]);
        data[ident] = link.value;
        var x = source.pop();
        source.push(x.substr(link.start + link.length));
        source.push(ident);
        source.push(x.substr(0, link.start));
    });
    source.reverse();
    source = source.join("");

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

    source = source.replace(/xxxHTMLLINKxxx[0-9\.]+xxx/g, function(match) {
		if(!data[match]) return match;
		return '" + require(' + JSON.stringify(loaderUtils.urlToRequest(data[match], root)) + ') + "';
	});

    return 'var H = require("hogan.js");\n' +
           'module.exports = function() { ' +
           'var T = new H.Template(' +
           Hogan.compile(source, { asString: true }) +
           ', ' +
           JSON.stringify(source) +
           ', H);' + suffix;
};
