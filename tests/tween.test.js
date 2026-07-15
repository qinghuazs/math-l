'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

test('easings 数学性质', function () {
  const CW = loadCW(['shared/core/tween.js']);
  const e = CW.tween.easings;
  assert.equal(e.linear(0.5), 0.5);
  assert.equal(e.easeInOut(0), 0);
  assert.equal(e.easeInOut(1), 1);
  assert.equal(e.easeOut(1), 1);
  assert.ok(e.easeInOut(0.3) < e.easeInOut(0.7), 'easeInOut 单调递增');
});

test('新增缓动：端点精确与曲线特征', function () {
  const CW = loadCW(['shared/core/tween.js']);
  const e = CW.tween.easings;
  ['easeOutBack', 'easeOutElastic', 'easeOutBounce', 'easeInOutQuart', 'easeOutExpo'].forEach(function (name) {
    assert.equal(typeof e[name], 'function', name + ' 应存在');
    assert.ok(Math.abs(e[name](0)) < 1e-6, name + '(0) 应为 0');
    assert.ok(Math.abs(e[name](1) - 1) < 1e-6, name + '(1) 应为 1');
  });
  // 回弹类缓动必须越过终值（回弹感的来源）
  const maxOf = function (fn) {
    let m = -Infinity;
    for (let t = 0.01; t < 1; t += 0.01) m = Math.max(m, fn(t));
    return m;
  };
  assert.ok(maxOf(e.easeOutBack) > 1.05, 'easeOutBack 应有过冲');
  assert.ok(maxOf(e.easeOutElastic) > 1.05, 'easeOutElastic 应有过冲');
  // easeOutBounce 弹跳但不越界
  for (let t = 0; t <= 1; t += 0.01) {
    const v = e.easeOutBounce(t);
    assert.ok(v >= -1e-9 && v <= 1 + 1e-9, 'easeOutBounce(' + t + ') 越界: ' + v);
  }
  // easeInOutQuart 中点过 0.5、起步慢于线性
  assert.ok(Math.abs(e.easeInOutQuart(0.5) - 0.5) < 1e-9, 'easeInOutQuart(0.5) 应为 0.5');
  assert.ok(e.easeInOutQuart(0.25) < 0.25, 'easeInOutQuart 起步应慢于线性');
  // easeOutExpo 单调递增
  assert.ok(e.easeOutExpo(0.2) < e.easeOutExpo(0.6), 'easeOutExpo 应单调递增');
});

test('过冲缓动的 tween 结束帧仍精确落在终值', async function () {
  const CW = loadCW(['shared/core/tween.js']);
  let last = null;
  await new Promise(function (done) {
    CW.tween({ from: 2, to: 8, duration: 30, easing: 'easeOutBack', onUpdate: function (v) { last = v; }, onDone: done });
  });
  assert.equal(last, 8);
});

test('tween 从 0 到 10 收敛到终值且进度回调递增', async function () {
  const CW = loadCW(['shared/core/tween.js']);
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
  const CW = loadCW(['shared/core/tween.js']);
  let doneCalled = false;
  const h = CW.tween({ from: 0, to: 1, duration: 50, onUpdate: function () {}, onDone: function () { doneCalled = true; } });
  h.cancel();
  await new Promise(function (r) { setTimeout(r, 80); });
  assert.equal(doneCalled, false);
});

test('duration 为 0 时立即完成且终值精确', async function () {
  const CW = loadCW(['shared/core/tween.js']);
  let last = null, lastP = null, updates = 0;
  await new Promise(function (done) {
    CW.tween({ from: 3, to: 7, duration: 0, onUpdate: function (v, p) { last = v; lastP = p; updates++; }, onDone: done });
  });
  assert.equal(last, 7);
  assert.equal(lastP, 1);
  assert.equal(updates, 1);
});

test('未知 easing 名回退到 easeInOut 并正常完成', async function () {
  const CW = loadCW(['shared/core/tween.js']);
  let last = null;
  await new Promise(function (done) {
    CW.tween({ from: 0, to: 5, duration: 20, easing: 'nope', onUpdate: function (v) { last = v; }, onDone: done });
  });
  assert.equal(last, 5);
});
