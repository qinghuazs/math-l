(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', BLUE = '#1565c0';

  var ROWS = [];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function putRow(id, y, str, opts) {
    opts = opts || {};
    S.actor(id, 0, y, str, {
      color: opts.color || INK,
      size: opts.size || 22,
      bold: opts.bold || false
    });
    ROWS.push(id);
  }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：五步口诀
      {
        narration: '代入消元法<b>五步口诀</b>：变形 → 代入 → 求解 → 回代 → 写解。<br>每一步都有关键注意事项，牢记口诀，解题不慌！',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s5-kw-t', 7.5, '代入消元法——五步口诀', { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s5-kw1', 5.2, '① 变形：把一个未知数用另一个表示', { color: ORANGE, size: 22 });
              return delay(350);
            }).then(function () {
              putRow('s5-kw2', 3.0, '② 代入：代入另一方程，整体代入加括号', { color: ORANGE, size: 22 });
              return delay(350);
            }).then(function () {
              putRow('s5-kw3', 0.8, '③ 求解：解一元一次方程', { color: BLUE, size: 22 });
              return delay(350);
            }).then(function () {
              putRow('s5-kw4', -1.4, '④ 回代：代入变形式求另一个未知数', { color: BLUE, size: 22 });
              return delay(350);
            }).then(function () {
              putRow('s5-kw5', -3.6, '⑤ 写解：用大括号写出方程组的解', { color: GREEN, size: 22 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>五步口诀</b>：变形 → 代入 → 求解 → 回代 → 写解<br>' +
                '关键：代入加括号！展开注意负号！',
                'warm', 'tada');
            });
          } else {
            putRow('s5-kw-t', 7.5, '代入消元法——五步口诀', { color: PURPLE, size: 26, bold: true });
            putRow('s5-kw1', 5.2, '① 变形：把一个未知数用另一个表示', { color: ORANGE, size: 22 });
            putRow('s5-kw2', 3.0, '② 代入：代入另一方程，整体代入加括号', { color: ORANGE, size: 22 });
            putRow('s5-kw3', 0.8, '③ 求解：解一元一次方程', { color: BLUE, size: 22 });
            putRow('s5-kw4', -1.4, '④ 回代：代入变形式求另一个未知数', { color: BLUE, size: 22 });
            putRow('s5-kw5', -3.6, '⑤ 写解：用大括号写出方程组的解', { color: GREEN, size: 22 });
            P.renderCard(
              '<b>五步口诀</b>：变形 → 代入 → 求解 → 回代 → 写解<br>' +
              '关键：代入加括号！展开注意负号！',
              'warm', 'tada');
          }
        }
      },
      // 步骤2：消元思想总结
      {
        narration: '<b>消元思想</b>：把二元问题转化为一元问题——这是数学中"化难为易、化多为少"的核心思想。<br>代入消元只是开始，下节课我们还会学另一种消元法！',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s5-sum-t', 7, '消元思想', { color: PURPLE, size: 28, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s5-sum1', 4.5, '二元方程组', { color: INK, size: 22 });
              putRow('s5-sum-arrow', 3.0, '$\\xrightarrow{\\text{代入消元}}$', { color: ORANGE, size: 24 });
              putRow('s5-sum2', 1.5, '一元方程', { color: GREEN, size: 22 });
              return delay(600);
            }).then(function () {
              putRow('s5-sum3', -1.0, '化难为易 · 化多为少', { color: BLUE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s5-sum4', -3.5, '代入消元适用：某未知数系数为 $\\pm1$，', { color: INK, size: 20 });
              putRow('s5-sum5', -5.5, '或某方程已是 $y = \\ldots$ 形式。', { color: INK, size: 20 });
              return delay(300);
            }).then(function () {
              P.renderTable({
                head: ['方法', '适用情形', '核心操作'],
                rows: [
                  ['代入消元法', '系数为 ±1，或已有 $y=\\ldots$', '变形 → 代入 → 解一元方程'],
                  ['（下节）加减消元法', '系数较大，不易变形', '两式相加减，直接消去一个未知数']
                ]
              });
            });
          } else {
            putRow('s5-sum-t', 7, '消元思想', { color: PURPLE, size: 28, bold: true });
            putRow('s5-sum1', 4.5, '二元方程组', { color: INK, size: 22 });
            putRow('s5-sum-arrow', 3.0, '$\\xrightarrow{\\text{代入消元}}$', { color: ORANGE, size: 24 });
            putRow('s5-sum2', 1.5, '一元方程', { color: GREEN, size: 22 });
            putRow('s5-sum3', -1.0, '化难为易 · 化多为少', { color: BLUE, size: 24, bold: true });
            putRow('s5-sum4', -3.5, '代入消元适用：某未知数系数为 $\\pm1$，', { color: INK, size: 20 });
            putRow('s5-sum5', -5.5, '或某方程已是 $y = \\ldots$ 形式。', { color: INK, size: 20 });
            P.renderTable({
              head: ['方法', '适用情形', '核心操作'],
              rows: [
                ['代入消元法', '系数为 ±1，或已有 $y=\\ldots$', '变形 → 代入 → 解一元方程'],
                ['（下节）加减消元法', '系数较大，不易变形', '两式相加减，直接消去一个未知数']
              ]
            });
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
