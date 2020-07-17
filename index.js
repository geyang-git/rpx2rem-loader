module.exports = function (source, map) {
  if (this.query.router && this.query.router.find(item => {return this.resourcePath.includes(item)})) {
    source = source.replace(/rpx/gi, 'rem')
  }
  this.callback(null, source, map)
}
