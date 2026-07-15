'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

function makeEnv() {
  const log = [];
  function scene(id, n) {
    return {
      id: id, title: id, bbox: null,
      setup: function () { log.push(id + ':setup'); },
      steps: Array.from({ length: n }, function (_, i) {
        return {
          narration: id + '-' + i,
          enter: function (anim) { log.push(id + ':' + i + ':' + (anim ? 'anim' : 'fast')); },
        };
      }),
    };
  }
  const CW = loadCW(['shared/core/director.js']);
  const win = { location: { hash: '' }, addEventListener: function () {} };
  const stage = { reset: function () { log.push('reset'); } };
  const panel = {
    setScene: function () {}, setNarration: function (n) { log.push('narr:' + n); },
    clearExtras: function () {}, setControls: function () {},
  };
  const scenes = [scene('a', 2), scene('b', 3)];
  const d = CW.createDirector({ scenes: scenes, stage: stage, panel: panel, win: win });
  return { d: d, log: log, win: win };
}

test('start 后位于 (0,0)，只快放第 0 步', async function () {
  const env = makeEnv();
  await env.d.start();
  assert.deepEqual(env.d.getState(), { s: 0, k: 0 });
  assert.ok(env.log.includes('a:0:fast'));
  assert.equal(env.win.location.hash, '#1/1');
});

test('next 逐步带动画推进，跨环节时重置并快放新环节第 0 步', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.next(); // a:1 anim
  assert.deepEqual(env.d.getState(), { s: 0, k: 1 });
  assert.ok(env.log.includes('a:1:anim'));
  await env.d.next(); // 进入场景 b
  assert.deepEqual(env.d.getState(), { s: 1, k: 0 });
  assert.ok(env.log.includes('b:setup'));
  assert.ok(env.log.includes('b:0:anim'));
  assert.equal(env.win.location.hash, '#2/1');
});

test('prev 用重置+快放回退；环节首步再 prev 回上环节末步', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.next();
  await env.d.next(); // (1,0)
  await env.d.prev(); // 回 (0,1)
  assert.deepEqual(env.d.getState(), { s: 0, k: 1 });
  // 完整证据链：重置 -> setup -> 快放步0 -> 快放步1（含面板讲解词写入）
  assert.deepEqual(env.log.slice(-6),
    ['reset', 'a:setup', 'narr:a-0', 'a:0:fast', 'narr:a-1', 'a:1:fast']);
  assert.ok(env.log.filter(function (x) { return x === 'a:setup'; }).length >= 2);
});

test('jump 任意跳转 + parseHash 解析与越界钳制', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.jump(1, 2);
  assert.deepEqual(env.d.getState(), { s: 1, k: 2 });
  assert.equal(env.win.location.hash, '#2/3');
  assert.deepEqual(env.d.parseHash('#2/2'), { s: 1, k: 1 });
  assert.deepEqual(env.d.parseHash('#2/99'), { s: 1, k: 2 }); // 步越界钳到末步
  assert.equal(env.d.parseHash('#9/1'), null);   // 环节越界
  assert.equal(env.d.parseHash('bad'), null);
});

test('enter 同步抛异常不死锁：busy 释放、光标不前移、后续操作可用', async function () {
  const log = [];
  const CW = loadCW(['shared/core/director.js']);
  const win = { location: { hash: '' }, addEventListener: function () {}, console: { error: function () { log.push('err'); } } };
  const stage = { reset: function () { log.push('reset'); } };
  const panel = { setScene: function () {}, setNarration: function () {}, clearExtras: function () {}, setControls: function () {} };
  const scenes = [{
    id: 'a', title: 'a', bbox: null, setup: function () {},
    steps: [
      { narration: '0', enter: function () {} },
      { narration: '1', enter: function () { throw new Error('boom'); } },
      { narration: '2', enter: function () {} },
    ],
  }];
  const d = CW.createDirector({ scenes: scenes, stage: stage, panel: panel, win: win });
  await d.start();
  await d.next(); // 步1 同步炸
  assert.deepEqual(d.getState(), { s: 0, k: 0 }); // 光标未前移
  assert.ok(log.includes('err'));
  await d.jump(0, 0); // busy 已释放，仍可操作
  assert.ok(log.filter(function (x) { return x === 'reset'; }).length >= 2);
});

test('enter 返回 reject 的 Promise：replay 释放 busy、导演仍可操作', async function () {
  const log = [];
  const CW = loadCW(['shared/core/director.js']);
  const win = { location: { hash: '' }, addEventListener: function () {}, console: { error: function () { log.push('err'); } } };
  const stage = { reset: function () { log.push('reset'); } };
  const panel = { setScene: function () {}, setNarration: function () {}, clearExtras: function () {}, setControls: function () {} };
  const scenes = [
    { id: 'a', title: 'a', bbox: null, setup: function () {}, steps: [{ narration: '0', enter: function () {} }] },
    { id: 'b', title: 'b', bbox: null, setup: function () {},
      steps: [{ narration: '0', enter: function () { return Promise.reject(new Error('bad')); } }] },
  ];
  const d = CW.createDirector({ scenes: scenes, stage: stage, panel: panel, win: win });
  await d.start();
  await d.jump(1, 0); // replay 内 reject
  assert.ok(log.includes('err'));
  await d.jump(0, 0); // busy 已释放，仍可操作
  assert.ok(log.filter(function (x) { return x === 'reset'; }).length >= 3);
});
