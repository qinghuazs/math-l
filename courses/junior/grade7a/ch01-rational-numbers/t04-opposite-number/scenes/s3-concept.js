// s3-concept.js  环节三：定义与 0 的规定（3步）
// 数学验算：
//   -2.5 的相反数 = +2.5（符号反转，数字相同）
//   3/4 的相反数 = -3/4
//   0 的相反数 = 0（特殊规定）
//   -7/3 的相反数 = 7/3
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
    id: 's3',
    title: '三、定义与 0 的规定',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：给出定义，强调"互为"二字
      {
        narration: '有了刚才的观察，我们可以给相反数下定义了。一般地，只有符号不同的两个数，叫作互为相反数。注意"互为"两个字——相反数是成对出现的，不能说"某个数是相反数"，要说"某两个数互为相反数"。',
        enter: function (anim) {
          // 定义标题
          S.actor('s3-def-title', 0, 6.5, '相反数的定义', { color: COOL, size: 21 });

          // 定义框
          S.actor('s3-def-box', 0, 4.5,
            '只有符号不同的两个数，叫作<b>互为相反数</b>。',
            { color: INK, size: 17 });

          // 三个例子
          S.actor('s3-ex1', 0, 2.5,
            '$5$ 与 $-5$ <b>互为相反数</b>',
            { color: TEAL, size: 16 });
          S.actor('s3-ex2', 0, 1.0,
            '$2.5$ 的相反数是 $-2.5$',
            { color: TEAL, size: 16 });
          S.actor('s3-ex3', 0, -0.5,
            '$-\\dfrac{7}{3}$ 的相反数是 $\\dfrac{7}{3}$',
            { color: TEAL, size: 16 });

          // 强调"互为"
          S.actor('s3-mutual', 0, -2.5,
            '注意：<b>互为</b> = 成对出现，两个数互相是对方的相反数',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>相反数定义</b><br>' +
            '只有符号不同的两个数，叫作<b>互为相反数</b>。<br>' +
            '重点："<b>互为</b>"——成对出现，缺一不可。<br>' +
            '不能说"$5$ 是相反数"，<br>' +
            '要说"$5$ 与 $-5$ 互为相反数"。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：0 的相反数是 0（两个机器人都停原点的比喻）
      {
        narration: '那 0 有相反数吗？0 既不是正数也不是负数，和谁互为相反数？我们规定：0 的相反数是 0。可以这样理解：两个机器人都停在原点不动，方向"相反"但落点相同，所以 0 与自己互为相反数。',
        enter: function (anim) {
          // 清场上一步部分内容，保留定义
          S.remove('s3-mutual');
          S.remove('s3-ex1'); S.remove('s3-ex2'); S.remove('s3-ex3');

          // 0 的特殊规定
          S.actor('s3-zero-q', 0, 2.0, '问：$0$ 有相反数吗？', { color: INK, size: 17 });

          // 两个机器人停在原点示意
          S.actor('s3-robot-l', -1.2, 0.2, '◀', { color: WARM, size: 22 });
          S.actor('s3-robot-r', 0.8, 0.2, '▶', { color: COOL, size: 22 });
          S.actor('s3-origin-label', -0.2, -1.0, 'O（原点）', { color: INK, size: 14 });

          S.actor('s3-zero-ans', 0, -2.5,
            '规定：$0$ 的相反数是 $0$',
            { color: RED, size: 20 });

          S.actor('s3-zero-tip', 0, -4.2,
            '（$0$ 与自身互为相反数）',
            { color: GRAY, size: 14 });

          P.renderCard(
            '<b>特别规定：$0$ 的相反数是 $0$</b><br>' +
            '两个机器人都停在原点——方向相反，但落点相同。<br>' +
            '$0$ 既不是正数也不是负数，<br>' +
            '规定 $0$ 与自身互为相反数。',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：口答四连（逐一揭晓）
      {
        narration: '好，来做口答练习！四个问题：-2.5 的相反数是多少？四分之三的相反数是多少？0 的相反数是多少？负七分之三的相反数是多少？答案是：2.5、负四分之三、0、七分之三。',
        enter: function (anim) {
          // 清场
          S.remove('s3-zero-q'); S.remove('s3-robot-l'); S.remove('s3-robot-r');
          S.remove('s3-origin-label'); S.remove('s3-zero-ans'); S.remove('s3-zero-tip');

          S.actor('s3-qa-title', 0, 6.5, '口答练习：求相反数', { color: COOL, size: 19 });

          // 四题问题 + 答案
          S.actor('s3-q1', -3, 4.5,
            '① $-2.5$ 的相反数', { color: INK, size: 16 });
          S.actor('s3-a1', 4, 4.5,
            '= $2.5$', { color: GREEN, size: 16 });

          S.actor('s3-q2', -3, 2.5,
            '② $\\dfrac{3}{4}$ 的相反数', { color: INK, size: 16 });
          S.actor('s3-a2', 4, 2.5,
            '= $-\\dfrac{3}{4}$', { color: GREEN, size: 16 });

          S.actor('s3-q3', -3, 0.2,
            '③ $0$ 的相反数', { color: INK, size: 16 });
          S.actor('s3-a3', 4, 0.2,
            '= $0$', { color: RED, size: 16 });

          S.actor('s3-q4', -3, -2.2,
            '④ $-\\dfrac{7}{3}$ 的相反数', { color: INK, size: 16 });
          S.actor('s3-a4', 4, -2.2,
            '= $\\dfrac{7}{3}$', { color: GREEN, size: 16 });

          P.renderCard(
            '<b>口答答案</b><br>' +
            '① $-2.5$ 的相反数 $= 2.5$<br>' +
            '② $\\dfrac{3}{4}$ 的相反数 $= -\\dfrac{3}{4}$<br>' +
            '③ $0$ 的相反数 $= 0$（别忘了！）<br>' +
            '④ $-\\dfrac{7}{3}$ 的相反数 $= \\dfrac{7}{3}$',
            'teal',
            'tada'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
