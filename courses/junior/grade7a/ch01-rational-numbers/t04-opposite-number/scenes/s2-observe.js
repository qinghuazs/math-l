// s2-observe.js  环节二：观察比较（3步）
// 数学验算：
//   5 与 -5：数字部分同为5，符号相反 ✓ 互为相反数
//   2.5 与 -2.5：数字部分同为2.5，符号相反 ✓ 互为相反数
//   7/3 与 -7/3：数字部分同为7/3，符号相反 ✓ 互为相反数
//   反例 +5 与 -3：数字部分5≠3，不是互为相反数
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
    id: 's2',
    title: '二、观察比较',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三对数并排卡片
      {
        narration: '我们来观察三对数，每对数有什么共同点和不同点？第一对：5 和 -5；第二对：2.5 和 -2.5；第三对：七分之三和负七分之三。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.0, '观察：每对数有什么共同点和不同点？',
            { color: INK, size: 18 });

          // 表头
          S.actor('s2-head1', -4, 5.5, '第一个数', { color: GRAY, size: 15 });
          S.actor('s2-head2', 4, 5.5, '第二个数', { color: GRAY, size: 15 });
          S.actor('s2-head-sep', 0, 5.5, '←→', { color: GRAY, size: 15 });

          // 第一对
          S.actor('s2-p1-a', -4, 3.8, '$5$', { color: COOL, size: 22 });
          S.actor('s2-p1-sep', 0, 3.8, '……', { color: GRAY, size: 18 });
          S.actor('s2-p1-b', 4, 3.8, '$-5$', { color: WARM, size: 22 });

          // 第二对
          S.actor('s2-p2-a', -4, 1.5, '$2.5$', { color: COOL, size: 22 });
          S.actor('s2-p2-sep', 0, 1.5, '……', { color: GRAY, size: 18 });
          S.actor('s2-p2-b', 4, 1.5, '$-2.5$', { color: WARM, size: 22 });

          // 第三对
          S.actor('s2-p3-a', -4, -0.8, '$\\dfrac{7}{3}$', { color: COOL, size: 22 });
          S.actor('s2-p3-sep', 0, -0.8, '……', { color: GRAY, size: 18 });
          S.actor('s2-p3-b', 4, -0.8, '$-\\dfrac{7}{3}$', { color: WARM, size: 22 });

          P.renderCard(
            '<b>观察三对数</b><br>' +
            '每对数的<b>数字部分</b>有什么关系？<br>' +
            '<b>符号</b>有什么关系？<br>' +
            '请仔细观察……'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：归纳"数字部分相同、只有符号不同"
      {
        narration: '归纳！每对数的数字部分完全相同——5和5相同，2.5和2.5相同，七分之三和七分之三相同。但符号不同——一个是正数，一个是负数。结论：这三对数的数字部分相同、只有符号不同！',
        enter: function (anim) {
          // 清除省略号，换为归纳标注
          S.remove('s2-p1-sep'); S.remove('s2-p2-sep'); S.remove('s2-p3-sep');
          S.remove('s2-head-sep');

          S.actor('s2-head-sep', 0, 5.5, '符号相反', { color: WARM, size: 14 });

          // 数字部分相同标注
          S.actor('s2-num1', 0, 3.8, '数字部分相同', { color: TEAL, size: 14 });
          S.actor('s2-num2', 0, 1.5, '数字部分相同', { color: TEAL, size: 14 });
          S.actor('s2-num3', 0, -0.8, '数字部分相同', { color: TEAL, size: 14 });

          P.renderCard(
            '<b>归纳</b><br>' +
            '三对数都满足：<br>' +
            '① <b>数字部分完全相同</b><br>' +
            '② <b>符号一正一负（相反）</b><br>' +
            '这就是相反数的本质特征！',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：反例辨析 +5 与 -3（红叉：数字部分不同不算）
      {
        narration: '那 +5 和 -3 算不算这种关系呢？不算！虽然符号一正一负，但数字部分 5 和 3 不同！判断时必须同时满足两个条件：符号相反，而且数字部分完全相同。缺一不可！',
        enter: function (anim) {
          // 清场上一步标注
          S.remove('s2-num1'); S.remove('s2-num2'); S.remove('s2-num3');
          S.remove('s2-head-sep');

          // 反例标题
          S.actor('s2-counter-title', 0, 5.5,
            '反例辨析：$+5$ 与 $-3$ 算吗？',
            { color: RED, size: 17 });

          // 反例展示
          S.actor('s2-ce-a', -3.5, 3.5, '$+5$', { color: COOL, size: 24 });
          S.actor('s2-ce-b', 3.5, 3.5, '$-3$', { color: WARM, size: 24 });

          // 数字部分不同
          S.actor('s2-ce-num', 0, 2.2,
            '数字部分：$5 \\neq 3$  ✗',
            { color: RED, size: 17 });

          // 红叉大字
          S.actor('s2-ce-cross', 0, 0.5,
            '✗ 不是互为相反数！',
            { color: RED, size: 20 });

          // 判断口诀
          S.actor('s2-rule', 0, -2.0,
            '判断条件（<b>缺一不可</b>）：',
            { color: INK, size: 16 });
          S.actor('s2-rule1', 0, -3.2,
            '① 符号相反（一正一负）',
            { color: TEAL, size: 15 });
          S.actor('s2-rule2', 0, -4.4,
            '② 数字部分完全相同',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>反例：$+5$ 与 $-3$ 不是互为相反数</b><br>' +
            '虽然符号一正一负，但数字部分 $5 \\neq 3$！<br>' +
            '<b>判断两个数是否互为相反数：</b><br>' +
            '① 符号相反 ② 数字部分完全相同<br>' +
            '<b>缺一不可！</b>',
            'warm',
            'headShake'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
