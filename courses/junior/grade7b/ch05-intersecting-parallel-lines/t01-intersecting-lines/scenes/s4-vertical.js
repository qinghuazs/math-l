(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', GREEN = '#2e7d32';
  var CSS_KEY = 'background:#f3e5f5;border:2.5px solid #6a1b9a;border-radius:8px;padding:6px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 旋转角度，用于对顶角相等的动态演示
  var theta = Math.PI / 3; // 初始 60°

  function buildBase() {
    S.addSegment('s4-cd', [-8, 0], [8, 0], { color: COOL, width: 3, dash: 0 });
    S.addSegment('s4-ab',
      [function () { return 8 * Math.cos(theta); }, function () { return 8 * Math.sin(theta); }],
      [function () { return -8 * Math.cos(theta); }, function () { return -8 * Math.sin(theta); }],
      { color: WARM, width: 3, dash: 0 });
    S.addText('s4-lbl-o', 0.2, -0.6, 'O', { size: 16, color: INK });
    S.addText('s4-lbl-c', -8.5, 0.3, 'C', { size: 16, color: COOL });
    S.addText('s4-lbl-d', 8.1, 0.3, 'D', { size: 16, color: COOL });
    S.addText('s4-lbl-a',
      function () { return 8 * Math.cos(theta) + 0.4; },
      function () { return 8 * Math.sin(theta) + 0.3; },
      'A', { size: 16, color: WARM });
    S.addText('s4-lbl-b',
      function () { return -8 * Math.cos(theta) - 0.6; },
      function () { return -8 * Math.sin(theta) - 0.4; },
      'B', { size: 16, color: WARM });
  }

  function buildA1A3() {
    // ∠1：∠AOC（OC 与 OA 之间，第二象限方向）
    S.addAngle('s4-a1',
      [-3, 0],
      [0, 0],
      [function () { return 3 * Math.cos(theta); }, function () { return 3 * Math.sin(theta); }],
      { radius: 1.6, color: WARM, label: '∠1', opacity: 0.3 });
    // ∠3：∠BOD（OD 与 OB 之间，第三象限反向）
    S.addAngle('s4-a3',
      [3, 0],
      [0, 0],
      [function () { return -3 * Math.cos(theta); }, function () { return -3 * Math.sin(theta); }],
      { radius: 1.6, color: PURPLE, label: '∠3', opacity: 0.3 });
  }

  function buildDegTexts() {
    S.addText('s4-deg1',
      function () { return -3.2 + 2.0 * Math.cos(theta / 2 + Math.PI / 2); },
      function () { return 2.0 * Math.sin(theta / 2 + Math.PI / 2) + 0.2; },
      function () {
        var deg = Math.round((Math.PI - theta) * 180 / Math.PI);
        return '∠1=' + deg + '°';
      },
      { size: 14, color: WARM });
    S.addText('s4-deg3',
      function () { return 3.2 - 2.0 * Math.cos(theta / 2 + Math.PI / 2); },
      function () { return -2.0 * Math.sin(theta / 2 + Math.PI / 2) - 0.2; },
      function () {
        var deg = Math.round((Math.PI - theta) * 180 / Math.PI);
        return '∠3=' + deg + '°';
      },
      { size: 14, color: PURPLE });
  }

  var scene = {
    id: 's4',
    title: '四、对顶角：定义、推导与相等',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      theta = Math.PI / 3;
    },
    steps: [
      {
        narration: '现在我们来看另一对角：∠1 和 ∠3。∠1 是 ∠AOC，∠3 是 ∠BOD——它们的顶点都是 O，但两边互相"对着"，没有公共边。这样的两个角叫作<b>对顶角</b>。请注意和邻补角的区别：邻补角有公共边，对顶角没有。',
        enter: function (anim) {
          theta = Math.PI / 3;
          buildBase();
          buildA1A3();
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '对顶角有一个非常重要的性质：<b>对顶角相等</b>。我们来用邻补角的性质推导这个结论。由于 ∠1 和 ∠2 是邻补角，所以 ∠1 + ∠2 = 180°；由于 ∠3 和 ∠2 也是邻补角，所以 ∠3 + ∠2 = 180°。两式相减，就得到 ∠1 = ∠3。',
        enter: function (anim) {
          P.renderCard('<b>对顶角相等的推导：</b><br>因为 ∠1 和 ∠2 是邻补角，所以 $\\angle 1 + \\angle 2 = 180^\\circ$<br>因为 ∠3 和 ∠2 是邻补角，所以 $\\angle 3 + \\angle 2 = 180^\\circ$<br>两式相减：$\\angle 1 - \\angle 3 = 0$，即 $\\angle 1 = \\angle 3$<br><br><b>结论：对顶角相等。</b>', 'cool');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '让我们用动画来验证这个结论。现在直线 AB 绕 O 旋转，注意盯住 ∠1 和 ∠3 的度数——无论转到哪里，它们始终相等。这就是"对顶角相等"的直观感受。',
        enter: function (anim) {
          buildDegTexts();
          if (!anim) {
            theta = 5 * Math.PI / 12;
            S.getBoard().update();
            P.renderCard('✓ 旋转验证：∠1 = ∠3 始终成立——<b>对顶角相等</b>是普遍规律，不是特例。');
            return;
          }
          return S.animate({
            from: Math.PI / 3,
            to: 5 * Math.PI / 12,
            duration: 2000,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { theta = v; S.getBoard().update(); },
          }).then(function () {
            P.renderCard('✓ 旋转验证：∠1 = ∠3 始终成立——<b>对顶角相等</b>是普遍规律，不是特例。');
          });
        },
      },
      {
        narration: '再旋转一次，加深印象。同学们可以用手指遮住 ∠3，猜一下现在 ∠1 的度数，然后看答案——总是和 ∠3 一样的。这就是对顶角最直观的特征。',
        enter: function (anim) {
          if (!anim) {
            theta = Math.PI / 4;
            S.getBoard().update();
            return;
          }
          return S.animate({
            from: 5 * Math.PI / 12,
            to: Math.PI / 4,
            duration: 1600,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { theta = v; S.getBoard().update(); },
          }).then(function () {
            S.actor('s4-equal', 0, -4.5, '∠1 = ∠3（对顶角相等）', { color: PURPLE, size: 20, bold: true, css: CSS_KEY });
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
