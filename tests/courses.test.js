'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { loadCW } = require('./helpers/load.js');

// courses.js 是 `window.COURSES = {...}` 形式，vm 沙箱载入
function loadCourses() {
  const window = {};
  const ctx = { window: window };
  vm.createContext(ctx);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'courses.js'), 'utf8'),
    ctx, { filename: 'courses.js' }
  );
  return window.COURSES;
}

function allLessons(C) {
  const out = [];
  C.stages.forEach(function (st) {
    st.books.forEach(function (bk) {
      bk.chapters.forEach(function (ch) {
        (ch.lessons || []).forEach(function (ls) { out.push(ls); });
      });
    });
  });
  return out;
}

test('课程清单结构合法', function () {
  const C = loadCourses();
  assert.ok(Array.isArray(C.stages) && C.stages.length >= 1);
  const ids = new Set();
  allLessons(C).forEach(function (ls) {
    assert.ok(ls.id && ls.title, '课程有 id/title: ' + JSON.stringify(ls.id));
    assert.ok(!ids.has(ls.id), '课程 id 唯一: ' + ls.id);
    ids.add(ls.id);
  });
});

test('已完成课程：文件齐全、场景结构与步数契约成立', function () {
  const C = loadCourses();
  const done = allLessons(C).filter(function (ls) { return ls.status === 'done'; });
  assert.ok(done.length >= 1, '至少一门已完成课程');
  done.forEach(function (ls) {
    assert.ok(ls.path && Array.isArray(ls.scenes) && Array.isArray(ls.expectSteps),
      ls.id + ' 登记完整（path/scenes/expectSteps）');
    assert.equal(ls.scenes.length, ls.expectSteps.length, ls.id + ' scenes 与 expectSteps 等长');
    assert.ok(fs.existsSync(path.join(__dirname, '..', ls.path, 'index.html')),
      ls.id + ' 存在入口 index.html');

    const files = ls.scenes.map(function (s) { return ls.path + 'scenes/' + s; });
    files.forEach(function (f) {
      assert.ok(fs.existsSync(path.join(__dirname, '..', f)), '场景文件存在: ' + f);
    });

    const CW = loadCW(files);
    assert.equal(CW.scenes.length, ls.scenes.length, ls.id + ' 场景注册数');
    const sceneIds = new Set();
    CW.scenes.forEach(function (sc, i) {
      assert.ok(sc.id && !sceneIds.has(sc.id), ls.id + ' 场景 id 唯一: ' + sc.id);
      sceneIds.add(sc.id);
      assert.ok(sc.title, sc.id + ' 有标题');
      assert.ok(Array.isArray(sc.bbox) && sc.bbox.length === 4, sc.id + ' bbox 合法');
      assert.equal(typeof sc.setup, 'function', sc.id + ' 有 setup');
      assert.equal(sc.steps.length, ls.expectSteps[i],
        ls.id + '/' + sc.id + ' 步数=' + ls.expectSteps[i]);
      sc.steps.forEach(function (st, j) {
        assert.ok(st.narration && st.narration.length > 4, sc.id + ' 步 ' + j + ' 有讲解词');
        assert.equal(typeof st.enter, 'function', sc.id + ' 步 ' + j + ' 有 enter');
      });
    });
  });
});
