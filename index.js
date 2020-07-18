var rem = require('./bin/main.js')
var objectAssign = require('object-assign')
var assign = Object.assign
  ? Object.assign
  : objectAssign

const LOADER_UTILS = require('loader-utils')

module.exports = function (content, file, conf) {
  const CONFIG = LOADER_UTILS.getOptions(this)
  const route = CONFIG.route
  if (route && route.find(item => {return this.resourcePath.includes(item)})) {
    var defaultConf = {
      rem: 18,
      min: 3,
      dpr: 2,
      fontSize2Rem: true,
      exclude: []
    }
    var cfg = assign({}, defaultConf, conf)
    //解析template部分
    var reg = /\sstyle\s*=\s*('([^']*)'|"([^"]*)")/g
    var res = reg.exec(content)
    if (res) {
      content = content.replace(reg, function (a, b, c, d) {
        if (c) {
          context = '.{' + c + '}'
        } else {
          context = '.{' + d + '}'
        }
        context = rem(context, file, cfg).replace('.{', '').replace('}', '')
        if (c) {
          return a.replace(c, context)
        } else {
          return a.replace(d, context)
        }
      })
    }

    //对<style>内的rpx进行替换
    var reg = /<(style)(?:[^>]*)?>([\s\S]*?)(?:<\/\1>[^\"\']|<\/\1>$)/ig
    var res = reg.exec(content)
    if (res) {
      content = content.replace(reg, function (first, second, thired) {
        return first.replace(thired, rem(thired, file, cfg))
      })
    }
    // console.log(content)
  }
  this.callback(null, content, file)
}
