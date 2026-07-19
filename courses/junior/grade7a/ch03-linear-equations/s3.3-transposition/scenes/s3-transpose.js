// s3-transpose.js  三、移项：搬家要变号（4步）
// 环节三：移项定义+依据、天平演示、+20飞越等号变-20动画、+4x移到左边变-4x
// 数学验算：3x+20=4x-25，两边同减20得 3x=4x-45，再两边同减4x得 -x=-45，两边除以-1得 x=45
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 天平参数
  var tiltAngle = 0;

  function buildBalance() {
    tiltAngle = 0;
    // 支点三角形
    S.addPolygon('s3-pivot', [[-0.5, -4.8], [0.5, -4.8], [0, -3.0]], { color: GRAY });
    // 底座
    S.addSegment('s3-base', [-2.0, -4.8], [2.0, -4.8], { color: INK, width: 5, dash: 0 });
    // 横梁（函数坐标跟随倾角）
    S.addSegment('s3-beam',
      [-5.0, function () { return -2.8 + tiltAngle; }],
      [5.0,  function () { return -2.8 - tiltAngle; }],
      { color: INK, width: 4, dash: 0 });
    // 左盘
    S.addSegment('s3-panL',
      [-6.2, function () { return -2.6 + tiltAngle; }],
      [-3.8, function () { return -2.6 + tiltAngle; }],
      { color: GRAY, width: 3, dash: 0 });
    // 右盘
    S.addSegment('s3-panR',
      [3.8,  function () { return -2.6 - tiltAngle; }],
      [6.2,  function () { return -2.6 - tiltAngle; }],
      { color: GRAY, width: 3, dash: 0 });
    // 左盘标注 3x+20
    S.addText('s3-wL', -5.0, function () { return -1.9 + tiltAngle; },
      '$3x+20$', { color: WARM, size: 18 });
    // 右盘标注 4x-25
    S.addText('s3-wR', 4.0, function () { return -1.9 - tiltAngle; },
      '$4x-25$', { color: COOL, size: 18 });
  }

  var scene = {
    id: 's3',
    title: '三、移项：搬家要变号',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      tiltAngle = 0;
    },
    steps: [
      // Step 1：移项定义与依据
      {
        narration: '我们要解方程 3x 加 20 等于 4x 减 25。核心技能叫做"移项"。什么是移项？把等式一边的某项变号后移到另一边，叫做移项。它的依据是等式性质1——等式两边同时加上或减去同一个数，结果仍是等式。',
        enter: function (anim) {
          S.actor('s3-eq', 0, 6.5, '$3x+20=4x-25$', { color: INK, size: 28, bold: true });
          return anim ? delay(400).then(function () {
            S.actor('s3-def-title', 0, 4.5, '移项定义', { color: TEAL, size: 20, bold: true });
            S.actor('s3-def', 0, 3.0,
              '把等式一边的某项变号后移到另一边，叫做移项',
              { color: INK, size: 17 });
            return delay(400);
          }).then(function () {
            S.actor('s3-basis-title', 0, 1.2, '依据：等式性质 1', { color: COOL, size: 18, bold: true });
            S.actor('s3-basis', 0, -0.3,
              '等式两边同时加上（或减去）同一个数，结果仍是等式',
              { color: COOL, size: 16 });
            return delay(300);
          }) : (function () {
            S.actor('s3-def-title', 0, 4.5, '移项定义', { color: TEAL, size: 20, bold: true });
            S.actor('s3-def', 0, 3.0,
              '把等式一边的某项变号后移到另一边，叫做移项',
              { color: INK, size: 17 });
            S.actor('s3-basis-title', 0, 1.2, '依据：等式性质 1', { color: COOL, size: 18, bold: true });
            S.actor('s3-basis', 0, -0.3,
              '等式两边同时加上（或减去）同一个数，结果仍是等式',
              { color: COOL, size: 16 });
            return Promise.resolve();
          })();
        },
      },
      // Step 2：天平演示——两盘同减 20，天平保持平衡
      {
        narration: '我们用天平来直观理解移项的依据。左盘放 3x+20，右盘放 4x-25，天平平衡——这就是我们的方程。现在两边同时减去 20，天平保持平衡——这就是等式性质1的含义。',
        enter: function (anim) {
          S.remove('s3-def-title'); S.remove('s3-def');
          S.remove('s3-basis-title'); S.remove('s3-basis');
          buildBalance();
          return anim ? delay(500).then(function () {
            // 同减 20 标注
            S.actor('s3-minus20', 0, 0.5, '两边同时减去 $20$', { color: WARM, size: 18, bold: true });
            return delay(400);
          }).then(function () {
            // 更新左盘标注
            S.remove('s3-wL');
            S.addText('s3-wL2', -5.0, function () { return -1.9 + tiltAngle; },
              '$3x$', { color: WARM, size: 18 });
            // 更新右盘标注
            S.remove('s3-wR');
            S.addText('s3-wR2', 4.0, function () { return -1.9 - tiltAngle; },
              '$4x-25-20$', { color: COOL, size: 16 });
            S.actor('s3-balanced', 0, -0.8, '天平仍然平衡 ✓', { color: GREEN, size: 17, bold: true });
            return delay(300);
          }) : (function () {
            S.actor('s3-minus20', 0, 0.5, '两边同时减去 $20$', { color: WARM, size: 18, bold: true });
            S.remove('s3-wL');
            S.addText('s3-wL2', -5.0, function () { return -1.9 + tiltAngle; },
              '$3x$', { color: WARM, size: 18 });
            S.remove('s3-wR');
            S.addText('s3-wR2', 4.0, function () { return -1.9 - tiltAngle; },
              '$4x-25-20$', { color: COOL, size: 16 });
            S.actor('s3-balanced', 0, -0.8, '天平仍然平衡 ✓', { color: GREEN, size: 17, bold: true });
            return Promise.resolve();
          })();
        },
      },
      // Step 3：+20 飞越等号动画——跨过等号符号翻转变红
      {
        narration: '现在看核心动画！方程 3x+20=4x-25 中，把 +20 这一项移到右边。看——+20 沿弧线飞越等号，落地后变成了 -20，字体放大变红！这就是"移项必须变号"的直观展示：正项跨过等号变负项！',
        enter: function (anim) {
          S.remove('s3-minus20'); S.remove('s3-wL2'); S.remove('s3-wR2');
          S.remove('s3-balanced'); S.remove('s3-pivot'); S.remove('s3-base');
          S.remove('s3-beam'); S.remove('s3-panL'); S.remove('s3-panR');
          S.remove('s3-wL'); S.remove('s3-wR');

          // 重新显示原方程
          S.remove('s3-eq');
          S.actor('s3-eq2', 0, 6.5, '$3x+20=4x-25$', { color: INK, size: 28, bold: true });
          // 高亮 +20
          var mover = S.actor('s3-mv20', -3.5, 6.5, '+20', { color: WARM, size: 28, bold: true });

          if (!anim) {
            // 快放：直接显示终态（移项后的方程）
            S.remove('s3-eq2');
            S.remove('s3-mv20');
            S.actor('s3-rule', 0, 4.2, '$3x = 4x-45$', { color: TEAL, size: 24, bold: true });
            P.renderCard(
              '<b>移项变号：+20 飞过等号变 -20</b><br>' +
              '$3x+20=4x-25$<br>' +
              '把 $+20$ 移到右边 $\\Rightarrow$ $3x=4x-25-20=4x-45$<br>' +
              '<b>正项过等号变负项！</b>',
              'warm'
            );
            return Promise.resolve();
          }

          // 动画路径：+20 先飞上去经过等号上方，再落到右边变色
          return mover.moveTo(0.3, 8.2, 700).then(function () {
            return mover.moveTo(6.0, 6.5, 700);
          }).then(function () {
            // 落地：变为 -20 红色
            mover.obj.setText('-20');
            mover.obj.setAttribute({ color: RED });
            S.getBoard().update();
            // 脉冲放大效果（用 animate 驱动字号）
            var obj = mover.obj;
            function setSize(v) {
              if (obj) { obj.setAttribute({ fontSize: Math.round(v) }); }
            }
            return S.animate({ from: 28, to: 40, duration: 250, easing: 'easeOut', onUpdate: setSize });
          }).then(function () {
            var obj = mover.obj;
            function setSize(v) {
              if (obj) { obj.setAttribute({ fontSize: Math.round(v) }); }
            }
            return S.animate({ from: 40, to: 28, duration: 250, onUpdate: setSize });
          }).then(function () {
            // 显示整理后的方程
            S.actor('s3-rule', 0, 4.2, '$3x = 4x-45$', { color: TEAL, size: 24, bold: true });
            P.renderCard(
              '<b>移项变号：+20 飞过等号变 -20</b><br>' +
              '$3x+20=4x-25$<br>' +
              '把 $+20$ 移到右边 $\\Rightarrow$ $3x=4x-25-20=4x-45$<br>' +
              '<b>正项过等号变负项！</b>',
              'warm'
            );
            return delay(300);
          });
        },
      },
      // Step 4：再移 +4x 到左边——负项过等号变正项，总结口诀
      {
        narration: '接下来把右边的 +4x 移到左边。正项 +4x 过了等号，变成 -4x。两个含 x 的项都到了左边：3x 减 4x 等于 -45，合并同类项得 -x=-45。口诀：移项必变号，正变负、负变正；没移动的项，符号绝对不变！',
        enter: function (anim) {
          S.remove('s3-rule');
          S.remove('s3-res-left'); S.remove('s3-res-eq'); S.remove('s3-res-right'); S.remove('s3-mv20-land');
          S.remove('s3-eq2'); S.remove('s3-mv20');

          S.actor('s3-step2-eq', 0, 6.5, '$3x = 4x-45$', { color: INK, size: 26, bold: true });

          if (!anim) {
            S.actor('s3-step2-res', 0, 4.5, '$3x-4x=-45$', { color: TEAL, size: 26, bold: true });
            S.actor('s3-step2-hint', 5.5, 4.5, '（移项）', { color: WARM, size: 16 });
            S.actor('s3-step2-merge', 0, 2.5, '$-x=-45$', { color: TEAL, size: 26, bold: true });
            S.actor('s3-step2-hint2', 5.5, 2.5, '（合并同类项）', { color: COOL, size: 15 });
            P.renderCard(
              '<b>口诀</b>：移项必变号，正变负、负变正；<br>没移动的项，符号绝对不变！<br>' +
              '$+4x$ 移到左边变 $-4x$：$3x-4x=-45$，即 $-x=-45$'
            );
            return Promise.resolve();
          }

          return delay(400).then(function () {
            S.actor('s3-step2-res', 0, 4.5, '$3x-4x=-45$', { color: TEAL, size: 26, bold: true });
            S.actor('s3-step2-hint', 5.5, 4.5, '（移项）', { color: WARM, size: 16 });
            return delay(500);
          }).then(function () {
            S.actor('s3-step2-merge', 0, 2.5, '$-x=-45$', { color: TEAL, size: 26, bold: true });
            S.actor('s3-step2-hint2', 5.5, 2.5, '（合并同类项）', { color: COOL, size: 15 });
            P.renderCard(
              '<b>口诀</b>：移项必变号，正变负、负变正；<br>没移动的项，符号绝对不变！<br>' +
              '$+4x$ 移到左边变 $-4x$：$3x-4x=-45$，即 $-x=-45$'
            );
            return delay(300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
