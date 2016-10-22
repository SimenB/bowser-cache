/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */

import test from 'ava';
import sinon from 'sinon';

import m, { withTransformer } from '../';

const ua = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36';

test('x is true on unknown ua', t => {
  t.true(m('').x);
});

test('parse a valid ua', t => {
  const res = m(ua);

  t.true(res.x === undefined);
  t.true(res.chrome);
  t.true(res.version === '48.0');
});

test('accept custom transform method', t => {
  const res = withTransformer(parsedData => ({ isMobile: parsedData.mobile }))(ua);

  t.deepEqual(res, { isMobile: true });
});

test('should cache lookups', t => {
  const spy = sinon.spy();
  const transformerSpy = withTransformer(spy);

  t.true(!spy.called);

  transformerSpy(ua);

  t.true(spy.calledOnce);

  transformerSpy(ua);

  t.true(spy.calledOnce);

  transformerSpy(`${ua}1`);

  t.true(spy.calledTwice);
});
