(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 正方形边长（闭包常量）
  var SIDE = 4;

  var scene = {
    id: 's1',
    title: '一、情境导入',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '今天我们从一个问题出发。有一个面积为 2 平方单位的正方形——就是这张纸上这个正方形，它的边长到底是多少？我们知道边长的平方等于 2，所以边长就是 √2。可是，√2 具体是多大？我们能说出一个确切的数吗？',
        enter: function (anim) {
          // 画正方形：以原点为中心，边长 SIDE（视觉用，标注面积=2）
          var cx = -2, cy = 1;
          var half = SIDE / 2;
          S.addSegment('s1-sq-top',    [cx - half, cy + half], [cx + half, cy + half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s1-sq-right',  [cx + half, cy + half], [cx + half, cy - half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s1-sq-bottom', [cx + half, cy - half], [cx - half, cy - half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s1-sq-left',   [cx - half, cy - half], [cx - half, cy + half], { color: COOL, width: 3, dash: 0 });

          // 面积标注
          S.addText('s1-area', cx - 1.1, cy + 0.3, '面积 = 2', { color: COOL, size: 18 });
          S.addText('s1-unit', cx - 0.7, cy - 0.3, '平方单位', { color: COOL, size: 16 });

          // 问号标注边长
          S.addText('s1-q-top',   cx - 0.3, cy + half + 0.4, '? ', { color: WARM, size: 22 });
          S.addText('s1-q-right', cx + half + 0.2, cy + 0.2, '?', { color: WARM, size: 22 });

          P.renderCard('一个正方形，面积为 $2$ 平方单位。<br>设边长为 $x$，则 $x^2=2$，所以 $x=\\sqrt{2}$。<br><b>$\\sqrt{2}$ 到底是多大？</b>');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '用计算器算一下，√2 = 1.41421356……小数点后面无穷无尽，永远没有规律，不会终止也不会循环。这就是无理数！我们没法写出它的精确值，只能估算——估出它大概在哪个范围内。这节课，我们就来学"估算"这个本领。',
        enter: function (anim) {
          // 展示小数展开（文字在右侧）
          S.addText('s1-sqrt2-label', 3.5, 4.5, '$\\sqrt{2}$  =', { color: WARM, size: 22 });
          S.addText('s1-sqrt2-val',   5.2, 4.5, '1.41421356…', { color: WARM, size: 20 });
          S.addText('s1-inf1', 3.5, 3.0, '小数永不终止', { color: INK, size: 16 });
          S.addText('s1-inf2', 3.5, 2.0, '小数永不循环', { color: INK, size: 16 });
          S.addText('s1-inf3', 3.5, 0.8, '→ 无理数！', { color: WARM, size: 18 });

          // 引出估算
          S.addText('s1-goal', 3.5, -1.2, '目标：估算出', { color: TEAL, size: 17 });
          S.addText('s1-goal2', 3.5, -2.2, '$\\sqrt{2}$ 的近似范围', { color: TEAL, size: 17 });

          P.renderCard('$\\sqrt{2} = 1.41421356\\ldots$（无限不循环小数）<br>无法写出精确值 → 需要<b>估算</b><br><br>估算目标：找到 $\\sqrt{2}$ 所在的整数范围，再逐步精确。');

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
