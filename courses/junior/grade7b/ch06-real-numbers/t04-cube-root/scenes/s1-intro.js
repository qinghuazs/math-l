(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 等轴测正方体示意：绘制三个面的平行四边形
  // 正面 (front)、顶面 (top)、右侧面 (right)
  // 以 (ox, oy) 为左前下角，边长 s
  function drawCube(ox, oy, s) {
    var dx = s * 0.55, dy = s * 0.32; // 等轴测偏移量
    // 正面（左下矩形）
    S.addPolygon('s1-front', [
      [ox, oy],
      [ox + s, oy],
      [ox + s, oy + s],
      [ox, oy + s]
    ], { fillColor: COOL, opacity: 0.25, strokeColor: COOL, borderWidth: 2 });
    // 顶面（平行四边形，正面上边往右上偏移）
    S.addPolygon('s1-top', [
      [ox, oy + s],
      [ox + s, oy + s],
      [ox + s + dx, oy + s + dy],
      [ox + dx, oy + s + dy]
    ], { fillColor: COOL, opacity: 0.18, strokeColor: COOL, borderWidth: 2 });
    // 右侧面（平行四边形）
    S.addPolygon('s1-right', [
      [ox + s, oy],
      [ox + s + dx, oy + dy],
      [ox + s + dx, oy + s + dy],
      [ox + s, oy + s]
    ], { fillColor: COOL, opacity: 0.12, strokeColor: COOL, borderWidth: 2 });
  }

  var scene = {
    id: 's1',
    title: '一、情境导入',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们好！上节课我们学习了平方根——已知正方形面积求边长。今天换一个问题：一个正方体的体积是 $27$ 立方厘米，它的棱长是多少厘米？请先想一想。',
        enter: function (anim) {
          S.addText('s1-title', 0, 8.8,
            '已知体积，求棱长', { color: INK, size: 24, anchorX: 'middle' });
          S.addText('s1-q', -4, 7.2,
            '正方体体积 $= 27$ 立方厘米，棱长 $= ?$', { color: WARM, size: 18 });
          drawCube(-1.8, 1.2, 3.2);
          S.addText('s1-vol', -0.3, -0.6,
            '体积 $= 27$ cm³', { color: COOL, size: 16 });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '设棱长为 $x$ 厘米，由体积公式得 $x^3 = 27$。因为 $3^3 = 27$，所以 $x = 3$。注意：这里只有一个答案！负数的立方仍是负数，$(-3)^3 = -27 \\neq 27$，所以 $-3$ 不是解。这和平方根的情况不同。我们把"已知数的立方求原数"的运算叫作<b>开立方</b>，结果叫作<b>立方根</b>（或<b>三次方根</b>）。',
        enter: function (anim) {
          drawCube(-1.8, 1.2, 3.2);
          S.addText('s1-vol', -0.3, -0.6,
            '体积 $= 27$ cm³', { color: COOL, size: 16 });
          S.addText('s1-eq', -4, 7.2,
            '$x^3 = 27 \\Rightarrow x = 3$（棱长 $= 3$ 厘米）', { color: WARM, size: 18 });
          S.addText('s1-side', 1.4, 2.4,
            '$3$ cm', { color: GREEN, size: 17 });
          P.renderCard(
            '设棱长为 $x$ cm：<br>' +
            '$x^3 = 27$，$x = 3$<br>' +
            '<b>这就引出今天的核心概念——立方根</b>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
    expectSteps: 2,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
