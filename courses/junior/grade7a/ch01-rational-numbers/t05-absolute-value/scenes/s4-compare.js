// s4-compare.js  环节四：数轴法比大小（3步）
// 数学验算：2, -3, 0, -1.5, 1/2 从小到大：-3 < -1.5 < 0 < 0.5 < 2
// 练习：-4, 1.5, 0, -0.5, 3 → -4 < -0.5 < 0 < 1.5 < 3
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var AXIS_Y = -0.5;

  // 各数的画面 x 坐标（bbox -5.5~5.5，数轴范围-4到4，scale=1）
  // 2→2, -3→-3, 0→0, -1.5→-1.5, 0.5→0.5
  var NUMS = [
    { val: 2,    label: '2',              x: 2.0  },
    { val: -3,   label: '-3',             x: -3.0 },
    { val: 0,    label: '0',              x: 0.0  },
    { val: -1.5, label: '-1.5',           x: -1.5 },
    { val: 0.5,  label: '$\\dfrac{1}{2}$', x: 0.5  }
  ];

  // 五张卡片的初始排列位置（画面上方）
  var CARD_Y = 2.2;
  var CARD_XS = [-3.5, -1.5, 0, 1.5, 3.5];

  // 各卡 actor 引用
  var cardActors = [];

  var scene = {
    id: 's4',
    title: '四、数轴法比大小',
    bbox: [-5.5, 3.5, 5.5, -2.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      cardActors = [];
    },
    steps: [
      // Step 1：左小右大规则 + 数轴 + 推论链
      {
        narration: '有了数轴，比大小就变得非常直观！规则只有一句：数轴上，左边的数小于右边的数。由此可以推出三条推论：正数大于0，0大于负数，正数大于一切负数。比如：负3比负2比负1比0比1比2比3……从左到右越来越大！',
        enter: function (anim) {
          // 数轴
          S.addSegment('s4-axis', [-4.8, AXIS_Y], [4.8, AXIS_Y], { color: INK, width: 3 });
          S.addSegment('s4-arr-r1', [4.6, AXIS_Y + 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s4-arr-r2', [4.6, AXIS_Y - 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s4-arr-l1', [-4.6, AXIS_Y + 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s4-arr-l2', [-4.6, AXIS_Y - 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });
          for (var n = -4; n <= 4; n++) {
            S.addSegment('s4-tick-' + (n + 4), [n, AXIS_Y - 0.15], [n, AXIS_Y + 0.15], { color: INK, width: 2 });
            if (n !== 0) {
              S.addText('s4-tlab-' + (n + 4), n - 0.1, AXIS_Y - 0.45, '' + n, { color: INK, size: 14 });
            }
          }
          S.addText('s4-zero', -0.08, AXIS_Y - 0.45, '0', { color: INK, size: 14 });

          // 左小右大标注
          S.addText('s4-rule-l', -3.5, AXIS_Y + 0.55, '小', { color: COOL, size: 16 });
          S.addText('s4-rule-r', 3.2, AXIS_Y + 0.55, '大', { color: WARM, size: 16 });
          S.addText('s4-arr-lr', -0.4, AXIS_Y + 0.55, '←—左小右大—→', { color: TEAL, size: 14 });

          // 推论卡
          S.actor('s4-inf1', 0, 2.8, '正数 $\\gt 0 \\gt$ 负数', { color: INK, size: 17 });
          S.actor('s4-inf2', 0, 1.9, '正数 $\\gt$ 一切负数', { color: INK, size: 17 });
          S.actor('s4-chain', 0, 1.1,
            '$\\cdots \\lt -2 \\lt -1 \\lt 0 \\lt 1 \\lt 2 \\lt \\cdots$',
            { color: TEAL, size: 16 });

          P.renderCard(
            '<b>数轴法：左小右大</b><br>' +
            '正数 $\\gt 0 \\gt$ 负数；正数 $\\gt$ 一切负数<br>' +
            '$\\cdots \\lt -2 \\lt -1 \\lt 0 \\lt 1 \\lt 2 \\lt \\cdots$'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 2：五张数字卡片落轴排队动画
      {
        narration: '现在来做个排队动画！五张数字卡片：2、负3、0、负1.5、二分之一，乱序放在上方，接下来它们会一张张"飞"到数轴对应的位置，落定后从左到右自动给出不等号链：负3 小于 负1.5 小于 0 小于 二分之一 小于 2。',
        enter: function (anim) {
          // 清除上步推论文字
          S.remove('s4-inf1'); S.remove('s4-inf2'); S.remove('s4-chain');
          S.remove('s4-rule-l'); S.remove('s4-rule-r'); S.remove('s4-arr-lr');

          var i;
          // 创建五张卡片 actor（初始位置在数轴上方随机排列）
          var labels = ['2', '-3', '0', '-1.5', '$\\dfrac{1}{2}$'];
          var initXs = [-3.5, -1.5, 0, 1.5, 3.5];
          cardActors = [];
          for (i = 0; i < 5; i++) {
            cardActors.push(S.actor('s4-card-' + i, initXs[i], CARD_Y, labels[i], { color: WARM, size: 17, bold: true }));
          }

          if (!anim) {
            // 快放：直接到数轴位置
            for (i = 0; i < 5; i++) {
              cardActors[i].moveTo(NUMS[i].x, AXIS_Y + 0.75, 0);
              S.addSegment('s4-drop-tick-' + i, [NUMS[i].x, AXIS_Y - 0.22], [NUMS[i].x, AXIS_Y + 0.22], { color: WARM, width: 3 });
            }
            // 不等号链
            S.actor('s4-chain2', 0, -1.5,
              '$-3 \\lt -1.5 \\lt 0 \\lt \\dfrac{1}{2} \\lt 2$',
              { color: TEAL, size: 18, bold: true });
            P.renderCard('从小到大：$-3 \\lt -1.5 \\lt 0 \\lt \\dfrac{1}{2} \\lt 2$');
            return null;
          }

          // 动画：依次落轴（按数值从小到大顺序落）
          // 落轴顺序：-3(idx1), -1.5(idx3), 0(idx2), 0.5(idx4), 2(idx0)
          var dropOrder = [1, 3, 2, 4, 0];

          var seq = Promise.resolve();
          for (i = 0; i < 5; i++) {
            (function (idx) {
              seq = seq.then(function () {
                return cardActors[idx].moveTo(NUMS[idx].x, AXIS_Y + 0.75, 700);
              }).then(function () {
                S.addSegment('s4-drop-tick-' + idx,
                  [NUMS[idx].x, AXIS_Y - 0.22], [NUMS[idx].x, AXIS_Y + 0.22],
                  { color: WARM, width: 3 });
                return delay(150);
              });
            })(dropOrder[i]);
          }

          return seq.then(function () {
            return delay(400);
          }).then(function () {
            S.actor('s4-chain2', 0, -1.5,
              '$-3 \\lt -1.5 \\lt 0 \\lt \\dfrac{1}{2} \\lt 2$',
              { color: TEAL, size: 18, bold: true });
            P.renderCard(
              '从小到大：$-3 \\lt -1.5 \\lt 0 \\lt \\dfrac{1}{2} \\lt 2$<br>' +
              '数轴法让排序一目了然！',
              'teal'
            );
            return delay(300);
          });
        }
      },

      // Step 3：课堂练习揭晓（-4, 1.5, 0, -0.5, 3）
      {
        narration: '来一道课堂练习！把这五个数从小到大排列：-4、1.5、0、-0.5、3。大家心里想一下，在数轴上找位置——负4最左，其次-0.5，然后0，再1.5，最后3最右。答案：负4 小于 负0.5 小于 0 小于 1.5 小于 3。',
        enter: function (anim) {
          // 清除上步卡片和落轴内容
          var i;
          for (i = 0; i < 5; i++) {
            S.remove('s4-card-' + i);
            S.remove('s4-drop-tick-' + i);
          }
          S.remove('s4-chain2');

          // 题目
          S.actor('s4-pr-title', 0, 2.8, '课堂练习', { color: TEAL, size: 18, bold: true });
          S.actor('s4-pr-q', 0, 2.0,
            '将 $-4$，$1.5$，$0$，$-0.5$，$3$ 从小到大排列',
            { color: INK, size: 16 });

          // 五个点落轴
          var prNums = [
            { x: -4, label: '-4' },
            { x: 1.5, label: '1.5' },
            { x: 0, label: '0' },
            { x: -0.5, label: '-0.5' },
            { x: 3, label: '3' }
          ];
          for (i = 0; i < 5; i++) {
            S.dropPoint('s4-pr-pt-' + i, prNums[i].x, AXIS_Y, { color: COOL, size: 4 });
            S.addText('s4-pr-lab-' + i, prNums[i].x - 0.2, AXIS_Y + 0.35, prNums[i].label, { color: COOL, size: 13 });
          }

          // 答案
          S.actor('s4-pr-ans', 0, -1.5,
            '$-4 \\lt -0.5 \\lt 0 \\lt 1.5 \\lt 3$',
            { color: WARM, size: 19, bold: true });

          P.renderCard(
            '<b>课堂练习答案</b><br>' +
            '$-4 \\lt -0.5 \\lt 0 \\lt 1.5 \\lt 3$<br>' +
            '技巧：先找负数排左边，再按绝对值大小从大到小；正数排右边。',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
