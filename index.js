'use strict';

const { _detect: bowserDetect } = require('bowser');

const LRU = require('lru-cache');

const returnInput = x => x;

const doDetection = transformer => {
  const cache = LRU(100);

  return ua => {
    if (!cache.has(ua)) {
      const res = bowserDetect(ua);

      cache.set(ua, transformer(res));
    }

    return cache.get(ua);
  };
};

module.exports = doDetection(returnInput);
module.exports.withTransformer = doDetection;
