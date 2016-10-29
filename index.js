'use strict';

const { _detect: bowserDetect } = require('bowser');

const LRU = require('lru-cache');

const returnInput = x => x;
const defaultCacheCapacity = 100;

const doDetection = (transformer, cacheCapacity) => {
  if (typeof transformer !== 'function') {
    throw new TypeError('`transformer` must be a function, did you use the wrong export?');
  }

  if (typeof cacheCapacity !== 'number') {
    throw new TypeError('Missing `cacheCapacity`, either give a number or use another export.');
  }

  const cache = LRU(cacheCapacity);

  return ua => {
    if (!cache.has(ua)) {
      const res = bowserDetect(ua);

      cache.set(ua, transformer(res));
    }

    return cache.get(ua);
  };
};

module.exports = doDetection(returnInput, defaultCacheCapacity);
module.exports.withCacheCapacity = cacheCapacity => doDetection(returnInput, cacheCapacity);
module.exports.withTransformer = transformer => doDetection(transformer, defaultCacheCapacity);
module.exports.withTransformerAndCacheCapacity = doDetection;
