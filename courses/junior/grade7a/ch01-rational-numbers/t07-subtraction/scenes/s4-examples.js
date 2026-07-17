// s4-examples.js  四、例题精讲（4步）
// 数学验算：
//   例1：(-3)-(-5) = (-3)+(+5) = 2 ✓
//   例2：0-7 = 0+(-7) = -7 ✓
//   例3：7.2-(-4.8) = 7.2+4.8 = 12 ✓
//   例4：(-1/2)-1/4 = (-1/2)+(-1/4) = -2/4-1/4 = -3/4 ✓
//   当堂练：(-5)-(+3) = (-5)+(-3) = -8 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

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
      // Step 1：例1（含负数减法）
      {
        narration: '例题第一题：(-3)-(-5)。被减数是 -3，减数是 -5。两变：减号变加号，减数 -5 变相反数 +5。所以 (-3)-(-5) 等于 (-3)+(+5) 等于 2。整数减法搞定！',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.3, '例题精讲——四种数型全覆盖', { color: COOL, size: 18, bold: true });

          S.actor('s4-eg1-lbl', 0, 6.0, '例 1（整数减法）', { color: INK, size: 15 });
          S.actor('s4-eg1-q', 0, 5.0,
            '$(-3) - (-5)$',
            { color: INK, size: 24 });
          S.actor('s4-eg1-s1', 0, 3.8,
            '$= (-3) + (+5)$',
            { color: TEAL, size: 22 });
          S.actor('s4-eg1-note', 0, 2.8,
            '减号→加号；$-5$→相反数$+5$',
            { color: GRAY, size: 14 });
          S.actor('s4-eg1-ans', 0, 1.7,
            '$= 2$',
            { color: GREEN, size: 26, bold: true });

          P.renderCard(
            '<b>例 1</b>：$(-3) - (-5)$<br>' +
            '$= (-3) + (+5)$<br>' +
            '$= 2$<br>' +
            '两变：减号→加号，$-5$→相反数$+5$。'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：例2（0作被减数）+ 例3（小数）
      {
        narration: '第二题：0-7。被减数是 0，减数是 7。两变：减号变加号，7 变相反数 -7。0+(-7)=-7。第三题：7.2-(-4.8)。减数是 -4.8，相反数是 4.8，两变后变成 7.2+4.8=12。小数减法一样适用！',
        enter: function (anim) {
          S.remove('s4-eg1-lbl');
          S.remove('s4-eg1-q');
          S.remove('s4-eg1-s1');
          S.remove('s4-eg1-note');
          S.remove('s4-eg1-ans');

          // 例2
          S.actor('s4-eg2-lbl', -4, 6.5, '例 2（0 作被减数）', { color: INK, size: 14 });
          S.actor('s4-eg2-q', -4, 5.5,
            '$0 - 7$',
            { color: INK, size: 24 });
          S.actor('s4-eg2-s1', -4, 4.3,
            '$= 0 + (-7)$',
            { color: TEAL, size: 21 });
          S.actor('s4-eg2-ans', -4, 3.2,
            '$= -7$',
            { color: GREEN, size: 24, bold: true });

          // 分隔线
          S.addSegment('s4-vline', [0, 6.8], [0, 2.5], { color: GRAY, width: 1, dash: 2 });

          // 例3
          S.actor('s4-eg3-lbl', 4, 6.5, '例 3（小数减法）', { color: INK, size: 14 });
          S.actor('s4-eg3-q', 4, 5.5,
            '$7.2 - (-4.8)$',
            { color: INK, size: 22 });
          S.actor('s4-eg3-s1', 4, 4.3,
            '$= 7.2 + 4.8$',
            { color: TEAL, size: 21 });
          S.actor('s4-eg3-ans', 4, 3.2,
            '$= 12$',
            { color: GREEN, size: 24, bold: true });

          // 共同说明
          S.actor('s4-note23', 0, 1.8,
            '法则对整数、$0$、小数都适用！',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>例 2</b>：$0 - 7 = 0 + (-7) = -7$<br>' +
            '<b>例 3</b>：$7.2 - (-4.8) = 7.2 + 4.8 = 12$<br>' +
            '法则对所有数型通用。'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：例4（分数）+ 强调"减正数也要两变"
      {
        narration: '第四题是分数，也是最容易忽视的一种情况：(-1/2) 减 1/4。注意！这里减的是正数 1/4，不是负数。照样用两变：减号变加号，正数 1/4 变相反数 -1/4。所以变成 (-1/2)+(-1/4)，通分得 -2/4-1/4=-3/4。减法法则对所有减数，无论正负，都适用！',
        enter: function (anim) {
          S.remove('s4-eg2-lbl');
          S.remove('s4-eg2-q');
          S.remove('s4-eg2-s1');
          S.remove('s4-eg2-ans');
          S.remove('s4-vline');
          S.remove('s4-eg3-lbl');
          S.remove('s4-eg3-q');
          S.remove('s4-eg3-s1');
          S.remove('s4-eg3-ans');
          S.remove('s4-note23');

          S.actor('s4-eg4-lbl', 0, 6.8, '例 4（分数减法）', { color: INK, size: 16 });
          S.actor('s4-eg4-q', 0, 5.7,
            '$\\left(-\\dfrac{1}{2}\\right) - \\dfrac{1}{4}$',
            { color: INK, size: 26 });
          S.actor('s4-eg4-s1', 0, 4.3,
            '$= \\left(-\\dfrac{1}{2}\\right) + \\left(-\\dfrac{1}{4}\\right)$',
            { color: TEAL, size: 22 });
          S.actor('s4-eg4-s2', 0, 2.9,
            '$= -\\dfrac{2}{4} - \\dfrac{1}{4}$',
            { color: INK, size: 20 });
          S.actor('s4-eg4-ans', 0, 1.7,
            '$= -\\dfrac{3}{4}$',
            { color: GREEN, size: 26, bold: true });

          // 关键提示：减正数也要两变
          S.actor('s4-eg4-warn', 0, 0.3,
            '减数 $\\dfrac{1}{4}$ 是<b>正数</b>，相反数是 $-\\dfrac{1}{4}$',
            { color: WARM, size: 15 });
          S.actor('s4-eg4-remind', 0, -0.9,
            '法则不只用于"减负数"，减正数一样两变！',
            { color: RED, size: 14, bold: true });

          P.renderCard(
            '<b>例 4</b>：$\\left(-\\dfrac{1}{2}\\right) - \\dfrac{1}{4}$<br>' +
            '$= \\left(-\\dfrac{1}{2}\\right) + \\left(-\\dfrac{1}{4}\\right) = -\\dfrac{3}{4}$<br>' +
            '减数是<b>正数</b>也要两变：$\\dfrac{1}{4}$ 的相反数是 $-\\dfrac{1}{4}$。',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 4：当堂练习 (-5)-(+3)=?  揭晓
      {
        narration: '当堂练习时间！请同学们独立完成：(-5) 减 (+3) 等于多少？给大家30秒。……时间到，来揭晓答案。(-5)-(+3)，两变：减号变加号，+3 变相反数 -3。所以等于 (-5)+(-3)=-8。有没有同学写错的？记住：减正数，相反数是负数！',
        enter: function (anim) {
          S.remove('s4-title');
          S.remove('s4-eg4-lbl');
          S.remove('s4-eg4-q');
          S.remove('s4-eg4-s1');
          S.remove('s4-eg4-s2');
          S.remove('s4-eg4-ans');
          S.remove('s4-eg4-warn');
          S.remove('s4-eg4-remind');

          S.actor('s4-prac-title', 0, 7.2, '当堂练习', { color: COOL, size: 20, bold: true });
          S.actor('s4-prac-q', 0, 5.8,
            '$(-5) - (+3) = $ 【？】',
            { color: INK, size: 28 });
          S.actor('s4-prac-hint', 0, 4.5,
            '试写出完整步骤……', { color: GRAY, size: 15 });

          // 揭晓
          S.actor('s4-prac-sep', 0, 3.2, '── 揭晓答案 ──', { color: GRAY, size: 14 });
          S.actor('s4-prac-s1', 0, 2.1,
            '$= (-5) + (-3)$', { color: TEAL, size: 22 });
          S.actor('s4-prac-note', 0, 1.1,
            '两变：$+3$ 的相反数是 $-3$', { color: WARM, size: 15 });
          S.actor('s4-prac-ans', 0, -0.2,
            '$= -8$', { color: GREEN, size: 30, bold: true });

          // 四例汇总小框
          S.actor('s4-sum', 0, -2.0,
            '四例：整数2 · 零-7 · 小数12 · 分数-3/4',
            { color: TEAL, size: 14 });
          S.actor('s4-sum2', 0, -3.1,
            '法则通杀一切数型 ✓',
            { color: GREEN, size: 15, bold: true });

          P.renderCard(
            '<b>当堂练习揭晓</b><br>' +
            '$(-5) - (+3) = (-5) + (-3) = -8$<br>' +
            '两变：$+3$ 的相反数是 $-3$。<br>' +
            '法则对正数减数同样适用！',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
