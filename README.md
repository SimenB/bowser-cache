# bowser-cache
> Cache Bowser lookups in LRU

[![NPM Version][npm-image]][npm-url]
[![Linux build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![Dependency Status][david-image]][david-url]
[![Dev Dependency Status][david-dev-image]][david-dev-url]

## Usage

This module uses [`bowser`][bowser-url] to parse user agent (ua) strings, and puts the result into an [LRU cache][lru-cache-url]. This
cache holds up to 100 cache entries.

## API

The default export caches the raw form returned by `bowser`.

```js
import bowserCache from 'bowser-cache';

const parsedInfo = bowserCache(ua);

// Do something with `parsedInfo`
```

You can also provide a transformation function to massage the data before it's put into the cache.

```js
import { withTransformer } from 'bowser-cache';

const bowserCache = withTransformer(parsedData => ({ isMobile: parsedData.mobile }));

const parsedInfo = bowserCache(ua);

// `parsedInfo` is now just { isMobile: true|false }
```


[travis-url]: https://travis-ci.org/SimenB/bowser-cache
[travis-image]: https://img.shields.io/travis/SimenB/bowser-cache.svg
[coveralls-url]: https://coveralls.io/github/SimenB/bowser-cache
[coveralls-image]: https://img.shields.io/coveralls/SimenB/bowser-cache.svg
[npm-url]: https://npmjs.org/package/bowser-cache
[npm-image]: https://img.shields.io/npm/v/bowser-cache.svg
[david-url]: https://david-dm.org/SimenB/bowser-cache
[david-image]: https://img.shields.io/david/SimenB/bowser-cache.svg
[david-dev-url]: https://david-dm.org/SimenB/bowser-cache#info=devDependencies
[david-dev-image]: https://img.shields.io/david/dev/SimenB/bowser-cache.svg
[bowser-url]: https://github.com/ded/bowser
[lru-cache-url]: https://github.com/isaacs/node-lru-cache
