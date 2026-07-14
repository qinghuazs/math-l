'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

test('easings 数学性质', function () {
  const CW = loadCW(['js/tween.js']);
  const e = CW.tween.easings;
  assert.equal(e.linear(0.5), 0.5);
  assert.equal(e.easeInOut(0), 0);
  assert.equal(e.easeInOut(1), 1);
  assert.equal(e.easeOut(1), 1);
  assert.ok(e.easeInOut(0.3) < e.easeInOut(0.7), 'easeInOut 单调递增');
});

test('tween 从 0 到 10 收敛到终值且进度回调递增', async function () {
  const CW = loadCW(['js/tween.js']);
  let last = null;
  const seen = [];
  await new Promise(function (done) {
    CW.tween({ from: 0, to: 10, duration: 30, onUpdate: function (v, p) { last = v; seen.push(p); }, onDone: done });
  });
  assert.equal(last, 10);
  assert.ok(seen.length >= 1);
  assert.equal(seen[seen.length - 1], 1);
});

test('cancel 后不再触发 onDone', async function () {
  const CW = loadCW(['js/tween.js']);
  let doneCalled = false;
  const h = CW.tween({ from: 0, to: 1, duration: 50, onUpdate: function () {}, onDone: function () { doneCalled = true; } });
  h.cancel();
  await new Promise(function (r) { setTimeout(r, 80); });
  assert.equal(doneCalled, false);
});
