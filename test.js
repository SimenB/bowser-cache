/* eslint-env jest */

'use strict';

const m = require('./');

const {
  withTransformer,
  withCacheCapacity,
  withTransformerAndCacheCapacity,
} = m;

const ua =
  'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36';

test('throws on invalid us', () => {
  expect(() => m('')).toThrow();
});

test('parse a valid ua', () => {
  const res = m(ua);

  expect(res.browser.name).toEqual('Chrome');
  expect(res.browser.version.startsWith('48.0')).toBe(true);
});

test('accept custom transform method', () => {
  const res = withTransformer(parsedData => ({
    isMobile: parsedData.platform.type === 'mobile',
  }))(ua);

  expect(res).toEqual({ isMobile: true });
});

test('should cache lookups', () => {
  const spy = jest.fn();
  const transformerSpy = withTransformer(spy);

  expect(spy).not.toHaveBeenCalled();

  transformerSpy(ua);

  expect(spy).toHaveBeenCalledTimes(1);

  transformerSpy(ua);

  expect(spy).toHaveBeenCalledTimes(1);

  transformerSpy(`${ua}1`);

  expect(spy).toHaveBeenCalledTimes(2);
});

test('`withCacheCapacity` validation', () => {
  expect(() => withCacheCapacity()).toThrow(
    'Missing `cacheCapacity`, either give a number or use another export.'
  );
  expect(() => withCacheCapacity(() => {})).toThrow(
    'Missing `cacheCapacity`, either give a number or use another export.'
  );
  expect(() => withCacheCapacity(42)).not.toThrow();
});

test('`withTransformer` validation', () => {
  expect(() => withTransformer()).toThrow(
    '`transformer` must be a function, did you use the wrong export?'
  );
  expect(() => withTransformer(42)).toThrow(
    '`transformer` must be a function, did you use the wrong export?'
  );
  expect(() => withTransformer(() => {})).not.toThrow();
});

test('`withTransformerAndCacheCapacity` validation', () => {
  expect(() => withTransformerAndCacheCapacity()).toThrow(
    '`transformer` must be a function, did you use the wrong export?'
  );
  expect(() => withTransformerAndCacheCapacity(42)).toThrow(
    '`transformer` must be a function, did you use the wrong export?'
  );
  expect(() => withTransformerAndCacheCapacity(() => {})).toThrow(
    'Missing `cacheCapacity`, either give a number or use another export.'
  );
  expect(() => withTransformerAndCacheCapacity(() => {}, 42)).not.toThrow();
});
