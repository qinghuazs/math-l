// s4-eval.js  四、化简求值关卡（3步）
// 数学验算（出口测试种子题⑤）：
// 化简 2(a²-ab)-(2a²-3ab)
// = 2a²-2ab-2a²+3ab   （展开+去括号，每项变号）
// = (2a²-2a²)+(-2ab+3ab)   （配对合并）
// = 0 + ab = ab   ✓
// 代入 a=2，b=-1：ab = 2×(-1) = -2   ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、化简求值关卡',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展开第一个括号（乘法分配律）
      {
        narration: '化简求值关卡，这是本章最综合的一道题：化简 2 括号 a 平方减 ab 括号减括号 2a 平方减 3ab 括号，再令 a 等于 2、b 等于负 1 求值。先做第一步：展开第一个括号，用乘法分配律。2 乘以 a 平方得 2a 平方；2 乘以负 ab 得负 2ab。飞入中间结果。',
        enter: function (anim) {
          S.actor('s4-title', 0, 9.0, '化简求值关卡', { color: ORANGE, size: 19, bold: true });
          S.actor('s4-problem', 0, 7.5, '化简 $2(a^{2} - ab) - (2a^{2} - 3ab)$', { color: INK, size: 17 });
          S.actor('s4-cond', 0, 6.3, '令 $a = 2$，$b = -1$ 求值', { color: COOL, size: 15 });

          if (!anim) {
            S.actor('s4-s1-label', 0, 4.8, '第一步：展开 $2(a^{2} - ab)$', { color: GREEN, size: 16 });
            S.actor('s4-s1-detail', -4, 3.5, '$2 \\times a^{2} = 2a^{2}$', { color: GREEN, size: 15 });
            S.actor('s4-s1-detail2', 4, 3.5, '$2 \\times (-ab) = -2ab$', { color: GREEN, size: 15 });
            S.actor('s4-s1-result', 0, 2.2, '得：$2a^{2} - 2ab$', { color: GREEN, size: 17 });
            P.renderCard(
              '<b>第一步：展开第一个括号</b><br>' +
              '$2(a^{2} - ab) = 2a^{2} - 2ab$<br>' +
              '（乘法分配律：$2$ 乘括号内每一项）'
            );
            return null;
          }

          return delay(500).then(function () {
            S.actor('s4-s1-label', 0, 4.8, '第一步：展开 $2(a^{2} - ab)$', { color: GREEN, size: 16 });
            return delay(500);
          }).then(function () {
            S.actor('s4-s1-detail', -4, 3.5, '$2 \\times a^{2} = 2a^{2}$', { color: GREEN, size: 15 });
            S.actor('s4-s1-detail2', 4, 3.5, '$2 \\times (-ab) = -2ab$', { color: GREEN, size: 15 });
            return delay(600);
          }).then(function () {
            S.actor('s4-s1-result', 0, 2.2, '得：$2a^{2} - 2ab$', { color: GREEN, size: 17 });
            P.renderCard(
              '<b>第一步：展开第一个括号</b><br>' +
              '$2(a^{2} - ab) = 2a^{2} - 2ab$<br>' +
              '（乘法分配律：$2$ 乘括号内每一项）'
            );
            return delay(400);
          });
        },
      },

      // Step 2：去括号+合并同类项，得结果 ab
      {
        narration: '第二步：去第二个括号，再合并同类项。第二个括号前是负号，括号内两项全部变号：2a 平方变成负 2a 平方，负 3ab 变成正 3ab。写出完整式子：2a 平方减 2ab 减 2a 平方加 3ab。现在配对合并：a 平方项：2a 平方减 2a 平方等于 0，相消！ab 项：负 2ab 加 3ab 等于 ab。化简结果就是 ab！',
        enter: function (anim) {
          S.remove('s4-s1-label'); S.remove('s4-s1-detail'); S.remove('s4-s1-detail2'); S.remove('s4-s1-result');

          if (!anim) {
            S.actor('s4-s2-label', 0, 4.8, '第二步：去括号并合并', { color: RED, size: 16 });
            S.actor('s4-s2-bracket', 0, 3.6, '$-(2a^{2} - 3ab) = -2a^{2} + 3ab$', { color: RED, size: 16 });
            S.actor('s4-s2-full', 0, 2.4, '$2a^{2} - 2ab - 2a^{2} + 3ab$', { color: INK, size: 16 });
            S.actor('s4-s2-pair1', -4, 1.2, '$2a^{2} - 2a^{2} = 0$（相消）', { color: ORANGE, size: 14 });
            S.actor('s4-s2-pair2', 4, 1.2, '$-2ab + 3ab = ab$', { color: ORANGE, size: 14 });
            S.actor('s4-s2-result', 0, -0.3, '化简结果：$ab$', { color: GREEN, size: 20, bold: true });
            P.renderCard(
              '<b>第二步：去括号 + 合并</b><br>' +
              '$2a^{2} - 2ab - 2a^{2} + 3ab$<br>' +
              '$= (2a^{2} - 2a^{2}) + (-2ab + 3ab)$<br>' +
              '$= 0 + ab = ab$'
            );
            return null;
          }

          return delay(300).then(function () {
            S.actor('s4-s2-label', 0, 4.8, '第二步：去括号并合并', { color: RED, size: 16 });
            S.actor('s4-s2-bracket', 0, 3.6, '$-(2a^{2} - 3ab) = -2a^{2} + 3ab$', { color: RED, size: 16 });
            return delay(600);
          }).then(function () {
            S.actor('s4-s2-full', 0, 2.4, '$2a^{2} - 2ab - 2a^{2} + 3ab$', { color: INK, size: 16 });
            return delay(500);
          }).then(function () {
            S.actor('s4-s2-pair1', -4, 1.2, '$2a^{2} - 2a^{2} = 0$（相消）', { color: ORANGE, size: 14 });
            S.actor('s4-s2-pair2', 4, 1.2, '$-2ab + 3ab = ab$', { color: ORANGE, size: 14 });
            return delay(600);
          }).then(function () {
            S.actor('s4-s2-result', 0, -0.3, '化简结果：$ab$', { color: GREEN, size: 20, bold: true });
            P.renderCard(
              '<b>第二步：去括号 + 合并</b><br>' +
              '$2a^{2} - 2ab - 2a^{2} + 3ab$<br>' +
              '$= (2a^{2} - 2a^{2}) + (-2ab + 3ab)$<br>' +
              '$= 0 + ab = ab$'
            );
            return delay(400);
          });
        },
      },

      // Step 3：代值求值，结果 -2
      {
        narration: '第三步：代值求值。化简结果是 ab，现在代入 a 等于 2、b 等于负 1：ab 等于 2 乘以负 1 等于负 2。答：负 2！注意这里有个关键策略：先化简再代值，计算量大减——如果不化简直接把 a 等于 2、b 等于负 1 代进原式，要算好几步；化简到 ab 后只需一步乘法，又快又准！',
        enter: function (anim) {
          S.remove('s4-s2-label'); S.remove('s4-s2-bracket'); S.remove('s4-s2-full');
          S.remove('s4-s2-pair1'); S.remove('s4-s2-pair2'); S.remove('s4-s2-result');

          if (!anim) {
            S.actor('s4-s3-label', 0, 4.8, '第三步：代值求值', { color: COOL, size: 16 });
            S.actor('s4-s3-sub', 0, 3.5, '令 $a = 2$，$b = -1$：', { color: INK, size: 16 });
            S.actor('s4-s3-calc', 0, 2.2, '$ab = 2 \\times (-1) = -2$', { color: WARM, size: 18 });
            S.actor('s4-s3-ans', 0, 0.8, '答：$-2$', { color: GREEN, size: 22, bold: true });
            S.actor('s4-s3-tip', 0, -0.8, '口诀：先化简再代值，计算量最小！', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>第三步：代值</b><br>' +
              '$ab = 2 \\times (-1) = -2$<br>' +
              '<b>答：$-2$</b><br>' +
              '策略：先化简再代值，计算量大减！',
              'teal',
              'tada'
            );
            return null;
          }

          return delay(300).then(function () {
            S.actor('s4-s3-label', 0, 4.8, '第三步：代值求值', { color: COOL, size: 16 });
            S.actor('s4-s3-sub', 0, 3.5, '令 $a = 2$，$b = -1$：', { color: INK, size: 16 });
            return delay(500);
          }).then(function () {
            S.actor('s4-s3-calc', 0, 2.2, '$ab = 2 \\times (-1) = -2$', { color: WARM, size: 18 });
            return delay(600);
          }).then(function () {
            S.actor('s4-s3-ans', 0, 0.8, '答：$-2$', { color: GREEN, size: 22, bold: true });
            S.actor('s4-s3-tip', 0, -0.8, '口诀：先化简再代值，计算量最小！', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>第三步：代值</b><br>' +
              '$ab = 2 \\times (-1) = -2$<br>' +
              '<b>答：$-2$</b><br>' +
              '策略：先化简再代值，计算量大减！',
              'teal',
              'tada'
            );
            return delay(400);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
