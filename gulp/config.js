'use strict';

var config = {};

config.paths = { src: {}, dist: {} };

config.paths.src.base   = './src/';
config.paths.src.css    = config.paths.src.base + 'css/';
config.paths.src.js     = config.paths.src.base + 'js/';
config.paths.src.stylus = config.paths.src.base + 'stylus/';

config.paths.dist.base = './dist/';
config.paths.dist.css = config.paths.dist.base + 'css/';
config.paths.dist.js  = config.paths.dist.base + 'js/';

module.exports = config;
