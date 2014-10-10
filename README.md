## Mustache loader for [webpack](https://webpack.github.io/)

[![travis](http://img.shields.io/travis/deepsweet/mustache-loader.svg?style=flat-square)](https://travis-ci.org/deepsweet/mustache-loader)
[![npm](http://img.shields.io/npm/v/mustache-loader.svg?style=flat-square)](https://www.npmjs.org/package/mustache-loader)
[![peer deps](http://img.shields.io/david/peer/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader#info=peerDependencies)
[![dev deps](http://img.shields.io/david/dev/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader#info=devDependencies)
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
    } ]
}
```

```javascript
var template = require('./template.html');
var html = template({ foo: 'bar' });
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### License
[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)
