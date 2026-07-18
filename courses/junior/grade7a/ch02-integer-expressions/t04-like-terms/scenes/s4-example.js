// s4-example.js  四、例题精讲（3步）
// 种子题：4x²+2x+7+3x-8x²-2 = -4x²+5x+5
// 数学验算（已逐项核对）：
//   x² 类：4+(-8)=-4 → -4x²
//   x  类：2+3=5 → 5x
//   常数：7+(-2)=5 → 5
//   代入 x=3 验算：原式=36+6+7+9-72-2=-16；化简式=-36+15+5=-16 ✓
// 三步：①标色找同类项；②逐组合并；③写结果+验算
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：呈现原式，标色找同类项
      {
        narration: '现在我们用今天学的方法来做一道完整例题。合并同类项：4x² 加 2x 加 7 加 3x 减 8x² 减 2。第一步：找同类项，标色区分。红色是 x² 类：4x² 和负 8x²；蓝色是 x 类：2x 和 3x；绿色是常数项：7 和负 2。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.0, '四、例题精讲', { color: COOL, size: 22, bold: true });

          S.actor('s4-orig-label', -9, 5.5, '合并同类项：', { color: INK, size: 18 });
          S.actor('s4-orig', 0, 4.3,
            '$4x^2 + 2x + 7 + 3x - 8x^2 - 2$',
            { color: INK, size: 22, bold: true });

          S.actor('s4-step1', -9, 2.8, '第一步', { color: WARM, size: 17, bold: true });
          S.actor('s4-step1t', -3, 2.8, '找同类项，标色区分', { color: INK, size: 17 });

          // 用颜色标注三组
          S.actor('s4-g1', -7, 1.3,
            '$4x^2$ 与 $-8x^2$',
            { color: RED, size: 19, bold: true });
          S.actor('s4-g1t', -7, 0.3, '（$x^2$ 类，红色）', { color: RED, size: 14 });

          S.actor('s4-g2', 0, 1.3,
            '$2x$ 与 $3x$',
            { color: COOL, size: 19, bold: true });
          S.actor('s4-g2t', 0, 0.3, '（$x$ 类，蓝色）', { color: COOL, size: 14 });

          S.actor('s4-g3', 7, 1.3,
            '$7$ 与 $-2$',
            { color: GREEN, size: 19, bold: true });
          S.actor('s4-g3t', 7, 0.3, '（常数项，绿色）', { color: GREEN, size: 14 });

          P.renderCard(
            '<b>例题：合并同类项</b><br>' +
            '$4x^2 + 2x + 7 + 3x - 8x^2 - 2$<br>' +
            '第一步：找同类项<br>' +
            '<span style="color:#c62828">$x^2$ 类：$4x^2$ 与 $-8x^2$</span><br>' +
            '<span style="color:#1565c0">$x$ 类：$2x$ 与 $3x$</span><br>' +
            '<span style="color:#2e7d32">常数项：$7$ 与 $-2$</span>'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：逐组合并（三行展示）
      {
        narration: '第二步：逐组合并。x² 类：4x² 加上负 8x²，系数 4 加上负 8 等于负 4，得负 4x²；x 类：2x 加 3x，系数 2 加 3 等于 5，得 5x；常数项：7 加上负 2 等于 5。注意：负号是系数的一部分，负 8x² 的系数是负 8，不是正 8！字母和指数一律照抄不动。',
        enter: function (anim) {
          S.remove('s4-step1'); S.remove('s4-step1t');
          S.remove('s4-g1'); S.remove('s4-g1t');
          S.remove('s4-g2'); S.remove('s4-g2t');
          S.remove('s4-g3'); S.remove('s4-g3t');

          S.actor('s4-step2', -9, 2.8, '第二步', { color: TEAL, size: 17, bold: true });
          S.actor('s4-step2t', -3, 2.8, '逐组合并系数', { color: INK, size: 17 });

          S.actor('s4-merge1', 0, 1.5,
            '$4x^2 + (-8x^2) = (4 - 8)x^2 = -4x^2$',
            { color: RED, size: 19 });
          S.actor('s4-merge2', 0, 0.2,
            '$2x + 3x = (2 + 3)x = 5x$',
            { color: COOL, size: 19 });
          S.actor('s4-merge3', 0, -1.1,
            '$7 + (-2) = 5$',
            { color: GREEN, size: 19 });

          S.actor('s4-warn', 0, -2.8,
            '负号是系数的一部分！$-8x^2$ 系数是 $-8$',
            { color: WARM, size: 16, bold: true });

          P.renderCard(
            '<b>第二步：逐组合并</b><br>' +
            '$x^2$ 类：$(4-8)x^2 = -4x^2$<br>' +
            '$x$ 类：$(2+3)x = 5x$<br>' +
            '常数：$7+(-2) = 5$<br>' +
            '<b>注意：$-8x^2$ 的系数是 $-8$（负号归系数！）</b>'
          );

          return anim ? delay(500) : null;
        },
      },

      // Step 3：写出结果 + 数值验算
      {
        narration: '第三步：按降幂排列，写出最终结果。4x² 加 2x 加 7 加 3x 减 8x² 减 2，等于负 4x² 加 5x 加 5。降幂排列：x² 的次数最高写第一，x 次数为 1 写第二，常数项写最后。最后我们代入 x 等于 3 来验算：原式等于 36 加 6 加 7 加 9 减 72 减 2，等于负 16；化简式等于负 36 加 15 加 5，也等于负 16——两者相等，结果正确！',
        enter: function (anim) {
          S.remove('s4-step2'); S.remove('s4-step2t');
          S.remove('s4-merge1'); S.remove('s4-merge2'); S.remove('s4-merge3');
          S.remove('s4-warn');

          S.actor('s4-step3', -9, 2.8, '第三步', { color: COOL, size: 17, bold: true });
          S.actor('s4-step3t', -3, 2.8, '降幂排列，写出结果', { color: INK, size: 17 });

          S.actor('s4-result', 0, 1.5,
            '$4x^2 + 2x + 7 + 3x - 8x^2 - 2$',
            { color: INK, size: 19 });
          S.actor('s4-eq', 0, 0.4, '$= -4x^2 + 5x + 5$', { color: WARM, size: 24, bold: true });

          S.addSegment('s4-div', [-8, -0.6], [8, -0.6], { color: GRAY, width: 1, dash: 2 });

          S.actor('s4-verify-t', -8, -1.5, '验算（$x=3$）：', { color: TEAL, size: 16, bold: true });
          S.actor('s4-verify1', 0, -2.4,
            '原式 $= 36+6+7+9-72-2 = -16$',
            { color: TEAL, size: 16 });
          S.actor('s4-verify2', 0, -3.5,
            '化简式 $= -36+15+5 = -16$ ✓',
            { color: GREEN, size: 16 });

          P.renderCard(
            '<b>结果（降幂排列）</b><br>' +
            '$4x^2 + 2x + 7 + 3x - 8x^2 - 2 = -4x^2 + 5x + 5$<br>' +
            '<b>验算（$x=3$）</b><br>' +
            '原式 $= 36+6+7+9-72-2=-16$<br>' +
            '化简式 $=-36+15+5=-16$ ✓',
            'warm',
            'bounceIn'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
