// s2-concepts.js  二、概念关卡（4步）
// 数学验算：
// ① -3x²y 系数=-3（负号是数字因数一部分），次数=2+1=3 ✓
// ② x²-2x-3 的各项：x²、-2x、-3，常数项=-3（符号是项的一部分）✓
// ③ 同类项判断：3x²y 与 -2x²y：字母x,y相同 ✓，x指数均2 ✓，y指数均1 ✓ → 是；5ab² 与 -3a²b：字母a,b相同 ✓，但a指数1≠2 ✗ → 不是 ✓
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
    id: 's2',
    title: '二、概念关卡',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：第1题——系数与次数
      {
        narration: '概念关卡，第一题：单项式负三 x 平方 y，系数和次数各是多少？先别急着看答案，给你三十秒独立思考。——好，我们来分析。红色圈住负三：系数等于负三，负号是数字因数的一部分，不能丢！蓝色箭头分别指 x 平方的指数 2 和 y 的指数 1，两个相加：次数等于三。',
        enter: function (anim) {
          S.actor('s2-q1-title', 0, 9.0, '第一题：系数与次数', { color: COOL, size: 19, bold: true });
          S.actor('s2-q1-expr', 0, 7.0, '$-3x^{2}y$ 的系数和次数各是多少？', { color: INK, size: 18 });

          if (!anim) {
            S.actor('s2-coeff-label', -4, 4.5, '系数 $= -3$', { color: WARM, size: 17, bold: true });
            S.actor('s2-coeff-note', -4, 3.2, '（负号是数字因数的一部分，不能丢）', { color: WARM, size: 14 });
            S.actor('s2-exp-x', 1, 5.2, '$x^{2}$ 的指数：2', { color: COOL, size: 16 });
            S.actor('s2-exp-y', 5, 5.2, '$y$ 的指数：1', { color: COOL, size: 16 });
            S.actor('s2-degree-label', 0, 3.0, '次数 $= 2 + 1 = 3$', { color: TEAL, size: 18, bold: true });
            P.renderCard(
              '<b>第一题答案</b><br>' +
              '$-3x^{2}y$：系数 $= -3$，次数 $= 3$<br>' +
              '记住：<b>负号是系数的一部分，带着负号一起取！</b>'
            );
            return null;
          }

          return delay(600).then(function () {
            S.actor('s2-coeff-label', -4, 4.5, '系数 $= -3$', { color: WARM, size: 17, bold: true });
            S.actor('s2-coeff-note', -4, 3.2, '（负号是数字因数的一部分，不能丢）', { color: WARM, size: 14 });
            return delay(600);
          }).then(function () {
            S.actor('s2-exp-x', 1, 5.2, '$x^{2}$ 的指数：2', { color: COOL, size: 16 });
            S.actor('s2-exp-y', 5, 5.2, '$y$ 的指数：1', { color: COOL, size: 16 });
            return delay(600);
          }).then(function () {
            S.actor('s2-degree-label', 0, 3.0, '次数 $= 2 + 1 = 3$', { color: TEAL, size: 18, bold: true });
            return delay(400);
          }).then(function () {
            P.renderCard(
              '<b>第一题答案</b><br>' +
              '$-3x^{2}y$：系数 $= -3$，次数 $= 3$<br>' +
              '记住：<b>负号是系数的一部分，带着负号一起取！</b>'
            );
            return delay(300);
          });
        },
      },

      // Step 2：第2题——项与常数项
      {
        narration: '第二题：多项式 x 平方减 2x 减 3，各项和常数项是什么？——注意，符号是项的一部分！我把它拆开来看：第一项是 x 平方；第二项是负 2x，负号不能丢！第三项也是常数项，是负三，不是正三。',
        enter: function (anim) {
          S.remove('s2-q1-title'); S.remove('s2-q1-expr');
          S.remove('s2-coeff-label'); S.remove('s2-coeff-note');
          S.remove('s2-exp-x'); S.remove('s2-exp-y'); S.remove('s2-degree-label');

          S.actor('s2-q2-title', 0, 9.0, '第二题：项与常数项', { color: COOL, size: 19, bold: true });
          S.actor('s2-q2-expr', 0, 7.2, '$x^{2} - 2x - 3$ 的各项和常数项是什么？', { color: INK, size: 18 });

          if (!anim) {
            S.actor('s2-t1', -5, 5.0, '第一项：$x^{2}$', { color: COOL, size: 16 });
            S.actor('s2-t2', 0, 5.0, '第二项：$-2x$', { color: WARM, size: 16 });
            S.actor('s2-t3', 5, 5.0, '第三项：$-3$（常数项）', { color: ORANGE, size: 16 });
            S.actor('s2-t-warn', 0, 3.2, '符号是项的一部分，$-2x$ 的负号不能丢！', { color: RED, size: 15 });
            S.actor('s2-t-const', 0, 1.8, '常数项 $= -3$（不是 $3$）', { color: WARM, size: 17, bold: true });
            P.renderCard(
              '<b>第二题答案</b><br>' +
              '各项：$x^{2}$、$-2x$、$-3$<br>' +
              '常数项 $= -3$<br>' +
              '记住：<b>符号是项的一部分！</b>'
            );
            return null;
          }

          return delay(500).then(function () {
            S.actor('s2-t1', -5, 5.0, '第一项：$x^{2}$', { color: COOL, size: 16 });
            return delay(400);
          }).then(function () {
            S.actor('s2-t2', 0, 5.0, '第二项：$-2x$', { color: WARM, size: 16 });
            return delay(400);
          }).then(function () {
            S.actor('s2-t3', 5, 5.0, '第三项：$-3$（常数项）', { color: ORANGE, size: 16 });
            return delay(500);
          }).then(function () {
            S.actor('s2-t-warn', 0, 3.2, '符号是项的一部分，$-2x$ 的负号不能丢！', { color: RED, size: 15 });
            S.actor('s2-t-const', 0, 1.8, '常数项 $= -3$（不是 $3$）', { color: WARM, size: 17, bold: true });
            P.renderCard(
              '<b>第二题答案</b><br>' +
              '各项：$x^{2}$、$-2x$、$-3$<br>' +
              '常数项 $= -3$<br>' +
              '记住：<b>符号是项的一部分！</b>'
            );
            return delay(300);
          });
        },
      },

      // Step 3：第3题——同类项判断
      {
        narration: '第三题：同类项判断。两组式子——第一组 3 x 平方 y 和负 2 x 平方 y；第二组 5 ab 平方 和 负 3 a 平方 b。同类项必须同时满足两个条件：字母相同，而且每个字母的指数也对应相同。来，逐组分析。',
        enter: function (anim) {
          S.remove('s2-q2-title'); S.remove('s2-q2-expr');
          S.remove('s2-t1'); S.remove('s2-t2'); S.remove('s2-t3');
          S.remove('s2-t-warn'); S.remove('s2-t-const');

          S.actor('s2-q3-title', 0, 9.0, '第三题：同类项判断', { color: COOL, size: 19, bold: true });
          S.actor('s2-q3-cond', 0, 7.5, '同类项条件：字母相同 且 各字母指数分别相同', { color: INK, size: 15 });

          // 第(1)组
          S.actor('s2-g1-label', -6, 6.2, '第(1)组：', { color: INK, size: 16 });
          S.actor('s2-g1-expr', -6, 5.0, '$3x^{2}y$ 与 $-2x^{2}y$', { color: INK, size: 17 });

          // 第(2)组
          S.actor('s2-g2-label', 4, 6.2, '第(2)组：', { color: INK, size: 16 });
          S.actor('s2-g2-expr', 4, 5.0, '$5ab^{2}$ 与 $-3a^{2}b$', { color: INK, size: 17 });

          if (!anim) {
            S.actor('s2-g1-check1', -6, 3.5, '字母 x, y 相同 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g1-check2', -6, 2.5, 'x 指数均 2 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g1-check3', -6, 1.5, 'y 指数均 1 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g1-result', -6, 0.3, '是同类项 ✓', { color: GREEN, size: 17, bold: true });
            S.actor('s2-g2-check1', 4, 3.5, '字母 a, b 相同 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g2-check2', 4, 2.5, 'a 指数 1 ≠ 2 ✗', { color: RED, size: 14 });
            S.actor('s2-g2-result', 4, 0.3, '不是同类项 ✗', { color: RED, size: 17, bold: true });
            P.renderCard(
              '<b>同类项两条件</b><br>' +
              '① 字母相同<br>' +
              '② 每个字母的指数分别对应相同<br>' +
              '两条同时满足才是同类项，缺一不可！'
            );
            return null;
          }

          return delay(500).then(function () {
            S.actor('s2-g1-check1', -6, 3.5, '字母 x, y 相同 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g1-check2', -6, 2.5, 'x 指数均 2 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g1-check3', -6, 1.5, 'y 指数均 1 ✓', { color: GREEN, size: 14 });
            return delay(500);
          }).then(function () {
            S.actor('s2-g1-result', -6, 0.3, '是同类项 ✓', { color: GREEN, size: 17, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s2-g2-check1', 4, 3.5, '字母 a, b 相同 ✓', { color: GREEN, size: 14 });
            S.actor('s2-g2-check2', 4, 2.5, 'a 指数 1 ≠ 2 ✗', { color: RED, size: 14 });
            return delay(500);
          }).then(function () {
            S.actor('s2-g2-result', 4, 0.3, '不是同类项 ✗', { color: RED, size: 17, bold: true });
            return delay(400);
          }).then(function () {
            P.renderCard(
              '<b>同类项两条件</b><br>' +
              '① 字母相同<br>' +
              '② 每个字母的指数分别对应相同<br>' +
              '两条同时满足才是同类项，缺一不可！'
            );
            return delay(300);
          });
        },
      },

      // Step 4：概念小结三条结论
      {
        narration: '概念关卡三题，三条结论：第一，系数看数字因数，含符号一起取；第二，次数是各字母指数之和；第三，同类项要同时满足字母相同加各字母指数分别对应相同。这三条是本章概念部分最高频的失分点，记牢了！',
        enter: function (anim) {
          S.remove('s2-q3-title'); S.remove('s2-q3-cond');
          S.remove('s2-g1-label'); S.remove('s2-g1-expr');
          S.remove('s2-g2-label'); S.remove('s2-g2-expr');
          S.remove('s2-g1-check1'); S.remove('s2-g1-check2'); S.remove('s2-g1-check3'); S.remove('s2-g1-result');
          S.remove('s2-g2-check1'); S.remove('s2-g2-check2'); S.remove('s2-g2-result');

          S.actor('s2-sum-title', 0, 8.0, '概念小结', { color: COOL, size: 20, bold: true });
          S.actor('s2-sum1', 0, 6.0, '① 系数：看数字因数，含符号一起取', { color: WARM, size: 17 });
          S.actor('s2-sum2', 0, 4.2, '② 次数：各字母指数之和', { color: TEAL, size: 17 });
          S.actor('s2-sum3', 0, 2.4, '③ 同类项：字母相同 + 各字母指数分别对应相同', { color: COOL, size: 17 });

          P.renderCard(
            '<b>概念关卡小结</b><br>' +
            '① 系数：含符号取，$-3x^{2}y$ 系数 $= -3$<br>' +
            '② 次数：各字母指数之和，$-3x^{2}y$ 次数 $= 3$<br>' +
            '③ 同类项：字母同 <b>且</b> 各指数对应同，两条缺一不可',
            'cool'
          );

          return anim ? delay(300) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
