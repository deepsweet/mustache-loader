## Mustache loader for [webpack](https://webpack.github.io/)

[![travis](http://img.shields.io/travis/deepsweet/mustache-loader.svg?style=flat-square)](https://travis-ci.org/deepsweet/mustache-loader)
[![npm](http://img.shields.io/npm/v/mustache-loader.svg?style=flat-square)](https://www.npmjs.org/package/mustache-loader)
[![peer deps](http://img.shields.io/david/peer/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader#info=peerDependencies)
[![dev deps](http://img.shields.io/david/dev/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader#info=devDependencies)
![unicorn approved](http://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat-square)

Compiles [Mustache](https://mustache.github.io/) templates with [Hogan](https://twitter.github.io/hogan.js/).

### Install

```sh
npm i -S mustache-loader
```

### Usage

```javascript
{
    ...
    module: {
        loaders: [ {
            test: /\.html$/,
            loader: 'mustache-loader'
        } ]
    },
    ...
}
```

```javascript
var template = require('./template.html');
var html = template({ foo: 'bar' });
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### License
[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)
