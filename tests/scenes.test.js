'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

const SCENE_FILES = [
  'js/scenes/s1-review.js', 'js/scenes/s2-plotting.js', 'js/scenes/s3-symmetry.js',
  'js/scenes/s4-explore.js', 'js/scenes/s5-properties.js', 'js/scenes/s6-compare.js',
  'js/scenes/s7-population.js',
];
const EXPECT_STEPS = [3, 6, 3, 5, 6, 5, 4]; // 设计文档第 6 节分镜

test('7 个场景注册齐全、步数与设计一致、结构完整', function () {
  const CW = loadCW(SCENE_FILES);
  assert.equal(CW.scenes.length, 7);
  const ids = new Set();
  CW.scenes.forEach(function (sc, i) {
    assert.ok(sc.id && !ids.has(sc.id), 'id 唯一: ' + sc.id);
    ids.add(sc.id);
    assert.ok(sc.title, sc.id + ' 有标题');
    assert.ok(Array.isArray(sc.bbox) && sc.bbox.length === 4, sc.id + ' bbox 合法');
    assert.equal(typeof sc.setup, 'function', sc.id + ' 有 setup');
    assert.equal(sc.steps.length, EXPECT_STEPS[i], sc.id + ' 步数=' + EXPECT_STEPS[i]);
    sc.steps.forEach(function (st, j) {
      assert.ok(st.narration && st.narration.length > 4, sc.id + ' 步 ' + j + ' 有讲解词');
      assert.equal(typeof st.enter, 'function', sc.id + ' 步 ' + j + ' 有 enter');
    });
  });
  assert.equal(EXPECT_STEPS.reduce(function (a, b) { return a + b; }, 0), 32, '总步数 32');
});
