// s2-steps.js  环节二：一般步骤（3步）
// 数学验算：3(2x-y)-2(x-3y) = 6x-3y-2x+6y = 4x+3y  ✓
// （-2)×(-3y)=+6y 符号正确）
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、一般步骤',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：流程图——两步骤
      {
        narration: '整式加减的一般步骤，就两步。第一步：去括号——有括号先处理括号，加号括号符号不变，减号括号各项全变号；第二步：合并同类项——相同字母、相同指数的项系数相加减，字母部分一律不动。两个方框，一支箭头，这就是整式加减的标准流程。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.0, '整式加减一般步骤', { color: COOL, size: 22, bold: true });
          // 流程图：方框用 addPolyline 画矩形轮廓
          // 方框1：去括号 (-6,3.5)~(-1,1.5)
          S.addPolyline('s2-box1', [[-6, 3.5], [-1, 3.5], [-1, 1.5], [-6, 1.5], [-6, 3.5]],
            { color: COOL, width: 3 });
          S.actor('s2-box1-txt', -3.5, 2.5, '第一步：去括号', { color: COOL, size: 19, bold: true });
          // 箭头
          S.addSegment('s2-arrow', [0, 2.5], [1.2, 2.5], { color: INK, width: 2.5, dash: 0 });
          S.actor('s2-arr-head', 1.0, 2.5, '→', { color: INK, size: 20 });
          // 方框2：合并同类项 (1.5,3.5)~(7.5,1.5)
          S.addPolyline('s2-box2', [[1.5, 3.5], [7.5, 3.5], [7.5, 1.5], [1.5, 1.5], [1.5, 3.5]],
            { color: WARM, width: 3 });
          S.actor('s2-box2-txt', 4.5, 2.5, '第二步：合并同类项', { color: WARM, size: 19, bold: true });

          P.renderCard(
            '<b>整式加减一般步骤</b><br>' +
            '第一步：去括号<br>' +
            '第二步：合并同类项<br>' +
            '有括号一定先去括号！'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：去括号两条法则对比
      {
        narration: '去括号的关键，两条法则要记牢。法则一：加号括号，各项符号不变；法则二：减号括号，各项符号全变——一个都不能漏！比如 加号括号里 3x减2y，去括号还是 3x减2y；减号括号里 3x减2y，去括号变成 负3x加2y，两项都要变号！',
        enter: function (anim) {
          S.actor('s2-rule-title', 0, 0.5, '去括号法则', { color: TEAL, size: 20, bold: true });
          // 加号例
          S.actor('s2-plus-label', -5.5, -0.9, '加号括号：', { color: COOL, size: 18 });
          S.actor('s2-plus-ex', -0.5, -0.9,
            '$+(3x - 2y) = 3x - 2y$',
            { color: COOL, size: 18 });
          S.actor('s2-plus-note', 3.5, -1.8, '符号不变', { color: GRAY, size: 15 });
          // 分割线
          S.addSegment('s2-divider', [-9, -2.5], [9, -2.5], { color: GRAY, width: 1, dash: 2 });
          // 减号例
          S.actor('s2-minus-label', -5.5, -3.3, '减号括号：', { color: RED, size: 18 });
          S.actor('s2-minus-ex', -0.5, -3.3,
            '$-(3x - 2y) = -3x + 2y$',
            { color: RED, size: 18 });
          S.actor('s2-minus-note', 3.5, -4.2, '各项全变号！', { color: RED, size: 15, bold: true });

          P.renderCard(
            '<b>去括号法则</b><br>' +
            '$+(3x - 2y) = 3x - 2y$　符号<b>不变</b><br>' +
            '$-(3x - 2y) = -3x + 2y$　符号<b>全变</b><br>' +
            '减号括号：一项都不能漏！'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：口答练习 3(2x-y)-2(x-3y)=4x+3y
      {
        narration: '来一道练习巩固：计算 3乘以括号2x减y，再减去 2乘以括号x减3y。先去括号：3乘括号各项，得 6x减3y；减2乘括号各项，负2乘x得负2x，负2乘负3y得正6y，注意负负得正！展开得 6x减3y减2x加6y。再合并：x项 6x减2x等于4x，y项 负3y加6y等于3y。结果是 4x加3y。',
        enter: function (anim) {
          S.remove('s2-plus-label'); S.remove('s2-plus-ex'); S.remove('s2-plus-note');
          S.remove('s2-divider');
          S.remove('s2-minus-label'); S.remove('s2-minus-ex'); S.remove('s2-minus-note');
          S.remove('s2-rule-title');
          S.actor('s2-practice-title', 0, 0.5, '口答练习', { color: TEAL, size: 20, bold: true });
          S.actor('s2-pq', 0, -0.9,
            '$3(2x - y) - 2(x - 3y)$',
            { color: INK, size: 22 });
          S.actor('s2-p-step1', 0, -2.4,
            '$= 6x - 3y - 2x + 6y$',
            { color: COOL, size: 20 });
          S.actor('s2-p-note', 5, -3.2,
            '$-2 \\times (-3y) = +6y$',
            { color: RED, size: 16 });
          S.actor('s2-p-step2', 0, -4.3,
            '$= 4x + 3y$',
            { color: GREEN, size: 24, bold: true });
          P.renderCard(
            '<b>口答练习</b><br>' +
            '$3(2x - y) - 2(x - 3y)$<br>' +
            '$= 6x - 3y - 2x + 6y$<br>' +
            '$= 4x + 3y$<br>' +
            '关键：$-2 \\times (-3y) = +6y$，负负得正！',
            'cool'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
