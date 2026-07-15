(function (CW) {
  'use strict';
  var S, P;
  var GREEN = '#2e7d32', RED = '#c62828', INK = '#455a64', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // [id, 式子(HTML), y, 是否方程, 原因]
  var ITEMS = [
    ['e1', '3x + 5', 4.6, false, '没有等号'],
    ['e2', '3x + 5 = 11', 2.3, true, '含未知数的等式'],
    ['e3', '2 + 6 = 8', 0, false, '不含未知数'],
    ['e4', 'y − 4 ＞ 3', -2.3, false, '是不等式，不是等式'],
    ['e5', '5a = 20', -4.6, true, '含未知数的等式'],
  ];

  var scene = {
    id: 's2',
    title: '二、什么是方程',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '这里有 5 个式子。它们当中，哪些是<b>方程</b>？先观察，心里给它们分分类。',
        enter: function (anim) {
          var p = Promise.resolve();
          ITEMS.forEach(function (it) {
            p = p.then(function () {
              S.actor('s2-' + it[0], -3.5, it[2], it[1], { color: INK, size: 26, bold: true });
              return anim ? delay(220) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '逐个判定：是方程的打 ✓，不是的打 ✗——判定的依据是什么？',
        enter: function (anim) {
          var p = Promise.resolve();
          ITEMS.forEach(function (it) {
            p = p.then(function () {
              S.actor('s2-m' + it[0], 1.6, it[2], it[3] ? '✓' : '✗', { color: it[3] ? GREEN : RED, size: 28, bold: true });
              S.actor('s2-r' + it[0], 5.6, it[2], it[4], { color: it[3] ? GREEN : RED, size: 15 });
              return anim ? delay(320) : null;
            });
          });
          return p.then(function () {
            P.renderTable({
              head: ['式子', '是方程？', '原因'],
              rows: [
                ['$3x+5$', '✗', '没有等号'],
                ['$3x+5=11$', '✓', '含未知数的等式'],
                ['$2+6=8$', '✗', '不含未知数'],
                ['$y-4\\gt 3$', '✗', '不等式'],
                ['$5a=20$', '✓', '含未知数的等式'],
              ],
            });
          });
        },
      },
      {
        narration: '归纳定义：<b>含有未知数的等式叫作方程</b>。判断时抓住两个关键词，缺一不可。',
        enter: function () {
          P.renderCard('方程 = <b>未知数</b> + <b>等式</b><br>① 必须含有未知数；② 必须是等式（有等号）。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
