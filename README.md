## Mustache loader for [webpack](https://webpack.github.io/)

[![npm](http://img.shields.io/npm/v/mustache-loader.svg?style=flat-square)](https://www.npmjs.org/package/mustache-loader)
[![travis](http://img.shields.io/travis/deepsweet/mustache-loader.svg?style=flat-square)](https://travis-ci.org/deepsweet/mustache-loader)
[![climate](http://img.shields.io/codeclimate/github/deepsweet/mustache-loader.svg?style=flat-square)](https://codeclimate.com/github/deepsweet/mustache-loader/code)
[![peer deps](http://img.shields.io/david/peer/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader#info=peerDependencies)
[![gratipay](http://img.shields.io/gratipay/deepsweet.svg?style=flat-square)](https://gratipay.com/deepsweet/)

Compiles [Mustache](https://mustache.github.io/) templates with [Hogan](https://twitter.github.io/hogan.js/) and optionally [html-minifier](https://github.com/kangax/html-minifier).

### Install

```sh
$ npm i -S mustache-loader
```

### Usage

```javascript
module: {
    loaders: [ {
        test: /\.html$/,
        loader: 'mustache'
        // loader: 'mustache?minify'
        // loader: 'mustache?{ minify: { removeComments: false } }'
        // loader: 'mustache?noShortcut'
    } ]
}
```

```javascript
var template = require('./template.html');
var html = template({ foo: 'bar' });
```

If `noShortcut` is passed, then Hogan compiled template is returned instead, so
you can pass it as partial.

```javascript
var template = require('./template.html');
var template2 = require('./template2.html');
var html = template({ foo: 'bar' }, {partial: template2});
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### License
[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)
