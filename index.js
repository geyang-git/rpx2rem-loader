/**
 * @file index.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/11/9
 */
/* global module, require*/

const rem = require('main.js');
const objectAssign =  require('object-assign');
const LOADER_UTILS = require('loader-utils');

const assign = Object.assign
  ? Object.assign
  : objectAssign;

const REM = function (content, file, conf) {
  var defaultConf = {
    rem: 18,
    min: 3,
    dpr: 2,
    fontSize2Rem: true,
    exclude: []
  };
  var cfg = assign({}, defaultConf, conf);

  return rem(content, file, cfg);
};


module.exports = function loader(content) {
    const CONFIG = LOADER_UTILS.getOptions(this);

    return REM(content, null, CONFIG);
};
