(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', RED = '#c62828';
  var IDS = [];

  function clearBoard() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function addLine(id, x, y, str, opts) {
    opts = opts || {};
    S.actor(keep(id), x, y, str, { color: opts.color || INK, size: opts.size || 22, bold: opts.bold || false });
  }

  var scene = {
    id: 's1',
    title: '一、消元思想引入',
    bbox: [-12, 9, 12, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; IDS = [];
    },
    steps: [
      {
        narration: '我们已经学过解一元一次方程。但二元一次方程组有<b>两个未知数</b>，没有现成的"招式"。<br>怎么办？——把"二元"变成"一元"！这就是<b>消元</b>的思想。',
        enter: function (anim) {
          clearBoard();
          var p = Promise.resolve();
          if (anim) {
            p = p.then(function () {
              addLine(keep('s1-title'), 0, 6.5, '二元，太难？ → 变成一元！', { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-two'), -5, 3.5, '$\\begin{cases}x - y = 3 \\\\ 3x - 8y = 14\\end{cases}$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              addLine(keep('s1-arrow'), 0, 3.5, '$\\longrightarrow$', { color: ORANGE, size: 28 });
              return delay(300);
            }).then(function () {
              addLine(keep('s1-one'), 5, 3.5, '$3x - 8(x-3) = 14$', { color: PURPLE, size: 22 });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-hint'), 0, 0.5, '只剩一个未知数 $x$，就会解了！', { color: GREEN, size: 20 });
            });
          } else {
            addLine(keep('s1-title'), 0, 6.5, '二元，太难？ → 变成一元！', { color: PURPLE, size: 26, bold: true });
            addLine(keep('s1-two'), -5, 3.5, '$\\begin{cases}x - y = 3 \\\\ 3x - 8y = 14\\end{cases}$', { color: INK, size: 22 });
            addLine(keep('s1-arrow'), 0, 3.5, '$\\longrightarrow$', { color: ORANGE, size: 28 });
            addLine(keep('s1-one'), 5, 3.5, '$3x - 8(x-3) = 14$', { color: PURPLE, size: 22 });
            addLine(keep('s1-hint'), 0, 0.5, '只剩一个未知数 $x$，就会解了！', { color: GREEN, size: 20 });
          }
          return p;
        }
      },
      {
        narration: '<b>消元</b>：把二元一次方程组转化为一元一次方程的过程，叫作消元。<br>消元的手段有很多，今天学习最直观的一种——<b>代入消元法</b>。',
        enter: function (anim) {
          clearBoard();
          var p = Promise.resolve();
          if (anim) {
            p = p.then(function () {
              addLine(keep('s1-def-t'), 0, 6, '消元——减少未知数的个数', { color: PURPLE, size: 24, bold: true });
              return delay(500);
            }).then(function () {
              addLine(keep('s1-def1'), 0, 3, '把二元方程组 $\\rightarrow$ 一元方程', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-def2'), 0, 0.5, '这个过程叫作"消元"', { color: GREEN, size: 22 });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-def3'), 0, -2.5, '今天学：<b>代入</b>消元法', { color: ORANGE, size: 24, bold: true });
            });
          } else {
            addLine(keep('s1-def-t'), 0, 6, '消元——减少未知数的个数', { color: PURPLE, size: 24, bold: true });
            addLine(keep('s1-def1'), 0, 3, '把二元方程组 $\\rightarrow$ 一元方程', { color: INK, size: 22 });
            addLine(keep('s1-def2'), 0, 0.5, '这个过程叫作"消元"', { color: GREEN, size: 22 });
            addLine(keep('s1-def3'), 0, -2.5, '今天学：<b>代入</b>消元法', { color: ORANGE, size: 24, bold: true });
          }
          return p;
        }
      },
      {
        narration: '"代入"的直觉：如果从①式知道 $y = x - 3$，那 $y$ 就是 $x-3$ 的"化名"。<br>凡是看到 $y$，就把它换成 $x-3$——<b>换人上场</b>！这样②里就只剩 $x$ 了。',
        enter: function (anim) {
          clearBoard();
          var p = Promise.resolve();
          if (anim) {
            p = p.then(function () {
              addLine(keep('s1-sub-t'), 0, 6.5, '"换人"直觉', { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-sub1'), 0, 4, '已知 $y = x - 3$（$y$ 的"化名"）', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              addLine(keep('s1-sub2'), 0, 1.5, '②式：$3x - 8\\underline{y} = 14$', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-sub3'), 0, -1, '把 $y$ 换成 $x-3$：', { color: ORANGE, size: 22 });
              return delay(400);
            }).then(function () {
              addLine(keep('s1-sub4'), 0, -3.5, '$3x - 8(x-3) = 14$　只剩 $x$ ！', { color: GREEN, size: 22, bold: true });
            });
          } else {
            addLine(keep('s1-sub-t'), 0, 6.5, '"换人"直觉', { color: PURPLE, size: 26, bold: true });
            addLine(keep('s1-sub1'), 0, 4, '已知 $y = x - 3$（$y$ 的"化名"）', { color: INK, size: 22 });
            addLine(keep('s1-sub2'), 0, 1.5, '②式：$3x - 8\\underline{y} = 14$', { color: INK, size: 22 });
            addLine(keep('s1-sub3'), 0, -1, '把 $y$ 换成 $x-3$：', { color: ORANGE, size: 22 });
            addLine(keep('s1-sub4'), 0, -3.5, '$3x - 8(x-3) = 14$　只剩 $x$ ！', { color: GREEN, size: 22, bold: true });
          }
          return p;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
