// s5-pitfalls.js  五、易错大扫除（3步）
// 数学验算（五大坑，均已逐项验算）：
// 坑1：-3x²y 系数=-3（不是3，负号是数字因数的一部分）✓
// 坑2：x²+x²=2x²（不是2x⁴；合并同类项加系数1+1=2，字母指数不变）✓
// 坑3：-(2x-3)=-2x+3（不是-2x-3；括号内每项变号，-3→+3）✓
// 坑4：x²-2x-3的常数项=-3（不是3，符号是项的一部分）✓
// 坑5：-a的系数=-1（不是1；-a=(-1)·a）✓
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
    id: 's5',
    title: '五、易错大扫除',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：出示五道判断题，先让学生判断
      {
        narration: '易错大扫除！下面五道判断题，先给你三十秒独立判断对错，写在草稿纸上，然后我们逐条揭晓。五大坑，掉进一个扣分没商量！',
        enter: function (anim) {
          S.actor('s5-title', 0, 9.0, '五、易错大扫除——五大坑判断', { color: RED, size: 19, bold: true });
          S.actor('s5-inst', 0, 7.8, '先独立判断对（✓）或错（✗），再看揭晓！', { color: GRAY, size: 14 });

          S.actor('s5-p1', 0, 6.5, '① $-3x^{2}y$ 的系数是 $3$。', { color: INK, size: 16 });
          S.actor('s5-p2', 0, 5.1, '② $x^{2} + x^{2} = 2x^{4}$。', { color: INK, size: 16 });
          S.actor('s5-p3', 0, 3.7, '③ $-(2x - 3) = -2x - 3$。', { color: INK, size: 16 });
          S.actor('s5-p4', 0, 2.3, '④ 多项式 $x^{2} - 2x - 3$ 的常数项是 $3$。', { color: INK, size: 16 });
          S.actor('s5-p5', 0, 0.9, '⑤ $-a$ 的系数是 $1$。', { color: INK, size: 16 });

          P.renderCard(
            '<b>判断前先想清楚：</b><br>' +
            '① 系数含不含负号？<br>' +
            '② 合并同类项与乘法有何区别？<br>' +
            '③ 去括号时每项都变号了吗？<br>' +
            '④ 常数项的符号是项的一部分吗？<br>' +
            '⑤ $-a$ 的系数到底是多少？'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：揭晓①②③（前三坑）
      {
        narration: '揭晓前三坑。第一坑：负三 x 平方 y 的系数是 3——错误！系数是负三，负号是数字因数的一部分，带着负号一起取。口诀：带着负号一起取。第二坑：x 平方加 x 平方等于 2 x 四次方——错误！合并同类项只加系数：1 加 1 等于 2，字母和指数纹丝不动，结果是 2x 平方；x 四次方是乘法的结果。加法和乘法的法则不能混！第三坑：负号括号 2x 减 3 等于负 2x 减 3——错误！括号内每一项都要变号，负 3 要变成正 3，结果是负 2x 加 3。',
        enter: function (anim) {
          if (!anim) {
            S.actor('s5-a1', 6, 6.5, '✗ 错！系数 $= -3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e1', 0, 5.7, '负号是数字因数的一部分，带着负号一起取', { color: WARM, size: 13 });
            S.actor('s5-a2', 6, 5.1, '✗ 错！$x^{2}+x^{2}=2x^{2}$', { color: RED, size: 14, bold: true });
            S.actor('s5-e2', 0, 4.3, '加法加系数（$1+1=2$），指数不变；$2x^{4}$ 是乘法结果', { color: WARM, size: 13 });
            S.actor('s5-a3', 6, 3.7, '✗ 错！$= -2x + 3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e3', 0, 2.9, '括号内每项都变号：$-3 \\to +3$，不能只变第一项', { color: WARM, size: 13 });
            P.renderCard(
              '<b>前三坑揭晓</b><br>' +
              '坑1：系数 $= -3$，负号不能丢<br>' +
              '坑2：$x^{2}+x^{2}=2x^{2}$（加法不加指数）<br>' +
              '坑3：$-(2x-3)=-2x+3$（每项都变号）',
              'warm',
              'headShake'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s5-a1', 6, 6.5, '✗ 错！系数 $= -3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e1', 0, 5.7, '负号是数字因数的一部分，带着负号一起取', { color: WARM, size: 13 });
            return delay(600);
          }).then(function () {
            S.actor('s5-a2', 6, 5.1, '✗ 错！$x^{2}+x^{2}=2x^{2}$', { color: RED, size: 14, bold: true });
            S.actor('s5-e2', 0, 4.3, '加法加系数（$1+1=2$），指数不变；$2x^{4}$ 是乘法结果', { color: WARM, size: 13 });
            return delay(600);
          }).then(function () {
            S.actor('s5-a3', 6, 3.7, '✗ 错！$= -2x + 3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e3', 0, 2.9, '括号内每项都变号：$-3 \\to +3$，不能只变第一项', { color: WARM, size: 13 });
            P.renderCard(
              '<b>前三坑揭晓</b><br>' +
              '坑1：系数 $= -3$，负号不能丢<br>' +
              '坑2：$x^{2}+x^{2}=2x^{2}$（加法不加指数）<br>' +
              '坑3：$-(2x-3)=-2x+3$（每项都变号）',
              'warm',
              'headShake'
            );
            return delay(400);
          });
        },
      },

      // Step 3：揭晓④⑤ + 五坑汇总结论
      {
        narration: '后两坑揭晓。第四坑：多项式 x 平方减 2x 减 3 的常数项是 3——错误！常数项是负 3，符号是项的一部分，不能把负号扔掉。第五坑：负 a 的系数是 1——错误！负 a 等于负 1 乘以 a，系数是负 1。同理负 ab 的系数也是负 1，不是 1。——五坑全部揭晓！记住这五句话：带着负号一起取；加法不加指数；每项都要变号；符号是项的一部分；前面没有系数也要看有没有负号。',
        enter: function (anim) {
          if (!anim) {
            S.actor('s5-a4', 6, 2.3, '✗ 错！常数项 $= -3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e4', 0, 1.5, '符号是项的一部分，不能只写 $3$', { color: WARM, size: 13 });
            S.actor('s5-a5', 6, 0.9, '✗ 错！系数 $= -1$', { color: RED, size: 14, bold: true });
            S.actor('s5-e5', 0, 0.1, '$-a = (-1) \\times a$，系数是 $-1$，不是 $1$', { color: WARM, size: 13 });
            S.actor('s5-sum-title', 0, -1.3, '五坑全避口诀：', { color: GREEN, size: 16, bold: true });
            S.actor('s5-sum-line', 0, -2.5,
              '①带负号取 ②加法不加指数 ③每项变号 ④符号随项走 ⑤隐系数看负号',
              { color: TEAL, size: 13 });
            P.renderCard(
              '<b>后两坑揭晓</b><br>' +
              '坑4：常数项 $= -3$（符号是项的一部分）<br>' +
              '坑5：$-a$ 系数 $= -1$（$-a=(-1)\\cdot a$）<br>' +
              '<b>五坑全避，稳拿分！</b>',
              'teal'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s5-a4', 6, 2.3, '✗ 错！常数项 $= -3$', { color: RED, size: 14, bold: true });
            S.actor('s5-e4', 0, 1.5, '符号是项的一部分，不能只写 $3$', { color: WARM, size: 13 });
            return delay(600);
          }).then(function () {
            S.actor('s5-a5', 6, 0.9, '✗ 错！系数 $= -1$', { color: RED, size: 14, bold: true });
            S.actor('s5-e5', 0, 0.1, '$-a = (-1) \\times a$，系数是 $-1$，不是 $1$', { color: WARM, size: 13 });
            return delay(600);
          }).then(function () {
            S.actor('s5-sum-title', 0, -1.3, '五坑全避口诀：', { color: GREEN, size: 16, bold: true });
            S.actor('s5-sum-line', 0, -2.5,
              '①带负号取 ②加法不加指数 ③每项变号 ④符号随项走 ⑤隐系数看负号',
              { color: TEAL, size: 13 });
            P.renderCard(
              '<b>后两坑揭晓</b><br>' +
              '坑4：常数项 $= -3$（符号是项的一部分）<br>' +
              '坑5：$-a$ 系数 $= -1$（$-a=(-1)\\cdot a$）<br>' +
              '<b>五坑全避，稳拿分！</b>',
              'teal'
            );
            return delay(400);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
