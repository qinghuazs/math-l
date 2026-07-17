// s2-define.js  二、乘方的定义与读写（3步）
// 数学验算：
//   2×2×2 = 8 = 2^3（底数2，指数3，幂8）
//   (-3)×(-3)×(-3)×(-3) = (-3)^4 = 81
//   (-1/2)^2 = (-1/2)×(-1/2) = 1/4
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、乘方的定义与读写',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：2^3 三要素标注——底数/指数/幂
      {
        narration: '我们以 2 的 3 次方为例来认识乘方。2×2×2，3 个 2 相乘，写成 2 的 3 次方，也就是 2 上面右边写个小小的 3。这里有三个重要的名字：底数——被连乘的数 2；指数——连乘的个数 3；幂——运算结果 8，也叫 2 的 3 次幂。',
        enter: function (anim) {
          S.actor('s2-eq', 0, 6.0, '$2 \\times 2 \\times 2 = 2^{3} = 8$', { color: INK, size: 26 });

          // 底数标注
          S.actor('s2-base-label', -4.5, 3.5, '底数', { color: COOL, size: 18, bold: true });
          S.actor('s2-base-desc', -4.5, 2.3, '被连乘的数：$2$', { color: COOL, size: 15 });
          S.addSegment('s2-base-line', [-3.0, 3.5], [-1.2, 5.5], { color: COOL, width: 2, dash: 2 });

          // 指数标注
          S.actor('s2-exp-label', 2.5, 3.5, '指数', { color: WARM, size: 18, bold: true });
          S.actor('s2-exp-desc', 2.5, 2.3, '连乘个数：$3$', { color: WARM, size: 15 });
          S.addSegment('s2-exp-line', [2.5, 4.2], [1.5, 5.8], { color: WARM, width: 2, dash: 2 });

          // 幂标注
          S.actor('s2-pow-label', 0, 0.0, '幂（运算结果）：$8$', { color: TEAL, size: 17 });

          // 定义框
          S.actor('s2-def', 0, -2.5,
            '$n$ 个 $a$ 相乘：$\\underbrace{a \\times a \\times \\cdots \\times a}_{n} = a^{n}$',
            { color: INK, size: 17 });
          S.actor('s2-def2', 0, -4.0, '读作：$a$ 的 $n$ 次幂（或 $n$ 次方）', { color: TEAL, size: 16 });

          P.renderCard(
            '<b>乘方的三要素</b><br>' +
            '$2^{3}$ 中：<br>' +
            '· <b>底数</b>：$2$（被连乘的数）<br>' +
            '· <b>指数</b>：$3$（连乘的次数）<br>' +
            '· <b>幂</b>：$8$（运算结果，也叫"$2$ 的 $3$ 次幂"）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：读法约定——平方/立方/n次方
      {
        narration: '乘方的读法有约定：a 的 2 次方叫"a 的平方"，因为正方形面积公式是边长的 2 次方；a 的 3 次方叫"a 的立方"，因为正方体体积是边长的 3 次方；从 4 次方起，就直接叫"a 的 n 次方"。',
        enter: function (anim) {
          S.remove('s2-eq'); S.remove('s2-base-label'); S.remove('s2-base-desc'); S.remove('s2-base-line');
          S.remove('s2-exp-label'); S.remove('s2-exp-desc'); S.remove('s2-exp-line');
          S.remove('s2-pow-label'); S.remove('s2-def'); S.remove('s2-def2');

          S.actor('s2-read-title', 0, 6.5, '<b>读法约定</b>', { color: COOL, size: 21 });
          S.actor('s2-r1', 0, 4.8, '$a^{2}$　读作：$a$ 的<b>平方</b>（面积 = 边长²）', { color: TEAL, size: 18 });
          S.actor('s2-r2', 0, 3.0, '$a^{3}$　读作：$a$ 的<b>立方</b>（体积 = 边长³）', { color: TEAL, size: 18 });
          S.actor('s2-r3', 0, 1.2, '$a^{n}$（$n \\geq 4$）　读作：$a$ 的 $n$ <b>次方</b>或 $n$ <b>次幂</b>', { color: TEAL, size: 18 });

          S.actor('s2-tip', 0, -1.5,
            '特别地：$a^{1} = a$（1次方就是自身）',
            { color: ORANGE, size: 16 });

          P.renderCard(
            '<b>读法口诀</b><br>' +
            '2 次方 → <b>平方</b>（$a^2$）<br>' +
            '3 次方 → <b>立方</b>（$a^3$）<br>' +
            '4 次及以上 → <b>n 次方</b>（$a^n$）<br>' +
            '$a^{1} = a$：1 次幂就是底数本身'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：口练两题（互逆转化）
      {
        narration: '来做两道口练。第一题：把 负3 的四个连乘写成乘方形式——底数是括号里的 负3，指数是 4，所以写成 负3 的 4 次方。第二题：把 负二分之一 的平方展开计算——两个 负二分之一 相乘，负号相消，得 正四分之一。',
        enter: function (anim) {
          S.remove('s2-read-title'); S.remove('s2-r1'); S.remove('s2-r2'); S.remove('s2-r3'); S.remove('s2-tip');

          S.actor('s2-pr-title', 0, 7.0, '<b>口练两题</b>', { color: WARM, size: 21 });

          // 题目1
          S.actor('s2-p1-q', 0, 5.2,
            '① $(-3) \\times (-3) \\times (-3) \\times (-3) = $【？】',
            { color: INK, size: 17 });

          // 题目2
          S.actor('s2-p2-q', 0, 3.2,
            '② $\\left(-\\dfrac{1}{2}\\right)^{2}$ 展开计算 $=$ 【？】',
            { color: INK, size: 17 });

          // 揭晓答案
          S.actor('s2-p1-a', 0, 1.5,
            '① $= (-3)^{4}$　（底数 $-3$，指数 $4$）',
            { color: GREEN, size: 17 });
          S.actor('s2-p2-a', 0, -0.2,
            '② $= \\left(-\\dfrac{1}{2}\\right) \\times \\left(-\\dfrac{1}{2}\\right) = \\dfrac{1}{4}$',
            { color: GREEN, size: 17 });

          S.actor('s2-key', 0, -2.5,
            '关键：负数和分数作底数时必须加括号！',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>互逆转化</b><br>' +
            '连乘 → 乘方：$(-3)^{4}$（底数 $-3$，指数 $4$）<br>' +
            '乘方 → 计算：$\\left(-\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}$<br>' +
            '两个负数相乘 → 正数！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
