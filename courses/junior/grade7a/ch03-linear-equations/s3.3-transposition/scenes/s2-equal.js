// s2-equal.js  二、同一个量的两个表达（3步）
// 环节二：设 x 名学生，列出两种表达式，建立方程 3x+20=4x-25
// 数学验算：x=45 时，3×45+20=155，4×45-25=155，两边相等 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、同一个量的两个表达',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：设未知数，写出两种分法的表达式
      {
        narration: '我们设学生有 x 名。第一种分法：每人 3 本，多出 20 本，所以这批书共有 3x 加 20 本。第二种分法：每人 4 本，少了 25 本，说明书不够用，实际书数是 4x 减 25 本。',
        enter: function (anim) {
          S.actor('s2-set', 0, 6.5, '设学生有 $x$ 名', { color: INK, size: 20, bold: true });
          return anim ? delay(400).then(function () {
            S.actor('s2-e1-label', -5, 4.2, '第一种分法：', { color: WARM, size: 18, bold: true });
            S.actor('s2-e1-expr', 3, 4.2, '书共 $3x+20$ 本', { color: WARM, size: 20 });
            return delay(600);
          }).then(function () {
            S.actor('s2-e2-label', -5, 2.0, '第二种分法：', { color: COOL, size: 18, bold: true });
            S.actor('s2-e2-expr', 3, 2.0, '书共 $4x-25$ 本', { color: COOL, size: 20 });
            return delay(400);
          }) : (function () {
            S.actor('s2-e1-label', -5, 4.2, '第一种分法：', { color: WARM, size: 18, bold: true });
            S.actor('s2-e1-expr', 3, 4.2, '书共 $3x+20$ 本', { color: WARM, size: 20 });
            S.actor('s2-e2-label', -5, 2.0, '第二种分法：', { color: COOL, size: 18, bold: true });
            S.actor('s2-e2-expr', 3, 2.0, '书共 $4x-25$ 本', { color: COOL, size: 20 });
            return Promise.resolve();
          })();
        },
      },
      // Step 2：对比表格，强调两式相等
      {
        narration: '我们用表格来对比一下。两种分法给出了两个表达式——$3x+20$ 和 $4x-25$——它们代表的是同一批书的总数，所以必须相等。',
        enter: function (anim) {
          P.renderTable({
            head: ['表达式', '含义'],
            rows: [
              ['$3x+20$', '第一种分法算出的总书数'],
              ['$4x-25$', '第二种分法算出的总书数'],
            ],
          });
          P.renderCard('两式代表同一批书，所以：<b>两式相等！</b>');
          return anim ? delay(300) : Promise.resolve();
        },
      },
      // Step 3：写出方程，标出各项位置
      {
        narration: '因为两种分法代表同一批书，所以我们可以写出方程：3x 加 20 等于 4x 减 25。注意这个方程两边都含有 x——这正是本节课的新挑战！我们接下来要学习"移项"来解决它。',
        enter: function (anim) {
          S.remove('s2-e1-label'); S.remove('s2-e1-expr');
          S.remove('s2-e2-label'); S.remove('s2-e2-expr');
          S.remove('s2-set');
          S.actor('s2-eq', 0, 5.0, '$3x+20=4x-25$', { color: INK, size: 32, bold: true });
          return anim ? delay(600).then(function () {
            S.actor('s2-hint-l', -5.5, 2.8, '含 $x$ 的项', { color: WARM, size: 16 });
            S.actor('s2-hint-c', 0.3, 2.8, '常数项', { color: COOL, size: 16 });
            S.actor('s2-hint-r', 5.5, 2.8, '含 $x$ 的项', { color: WARM, size: 16 });
            S.actor('s2-goal', 0, 0.8,
              '目标：把含 $x$ 的项移到左边，常数项移到右边',
              { color: TEAL, size: 16 });
            return delay(400);
          }) : (function () {
            S.actor('s2-hint-l', -5.5, 2.8, '含 $x$ 的项', { color: WARM, size: 16 });
            S.actor('s2-hint-c', 0.3, 2.8, '常数项', { color: COOL, size: 16 });
            S.actor('s2-hint-r', 5.5, 2.8, '含 $x$ 的项', { color: WARM, size: 16 });
            S.actor('s2-goal', 0, 0.8,
              '目标：把含 $x$ 的项移到左边，常数项移到右边',
              { color: TEAL, size: 16 });
            return Promise.resolve();
          })();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
