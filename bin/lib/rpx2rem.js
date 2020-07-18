/**
 * @file rpx2rem
 * @author ienix(ienix@foxmail.com)
 *
 * @since 16/5/26
 */

"use strict";

module.exports = function (str, conf) {
    return str.replace(/\b([\d\.]+)rpx\b/g, function(s, rpx) {
        rpx = +rpx;
        if (Math.abs(rpx) >= conf.min) {
            return (rpx / conf.rem).toFixed(4) + 'rem/* @source-size: ' + rpx + 'rpx; */';
        }
        return s;
    });
};
