## mustache loader for [webpack](https://webpack.github.io/)

[![npm](http://img.shields.io/npm/v/mustache-loader.svg?style=flat-square)](https://www.npmjs.org/package/mustache-loader)
[![deps](http://img.shields.io/david/deepsweet/mustache-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/mustache-loader)
![unicorn approved](http://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat-square)

Compiles [Mustache](https://mustache.github.io/) templates with [Hogan](https://twitter.github.io/hogan.js/).

### install

```sh
npm i -D mustache-loader
```

### usage

```javascript
var template = require('mustache!./file.html');
var html = template({ foo: 'bar' });
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### license
[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)
