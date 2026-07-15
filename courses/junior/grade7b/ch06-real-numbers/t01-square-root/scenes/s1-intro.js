(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制一个以 (cx,cy) 为左下角、边长 side 的正方形（用 addPolygon）
  function drawSquare(id, cx, cy, side, fillColor, label) {
    S.addPolygon(id, [
      [cx, cy],
      [cx + side, cy],
      [cx + side, cy + side],
      [cx, cy + side]
    ], { fillColor: fillColor, opacity: 0.25, strokeColor: fillColor, borderWidth: 2 });
    // 面积标注放中心
    S.addText(id + '-lbl', cx + side / 2 - 0.3, cy + side / 2, label, { color: fillColor, size: 16 });
  }

  var scene = {
    id: 's1',
    title: '一、情境导入：已知面积求边长',
    bbox: [-6, 11, 6, -3],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们好！我们知道正方形的面积等于边长的平方。现在反过来问：如果已知正方形的面积，能求出边长吗？比如，一块正方形地砖的面积是 $25$ 平方米，它的边长是多少米？请先想一想。',
        enter: function (anim) {
          S.addText('s1-title', 0, 9.5, '已知面积，求边长', { color: INK, size: 24, anchorX: 'middle' });
          S.addText('s1-q', -4.5, 8,
            '正方形面积 = $25$ 平方米，边长 = ？', { color: WARM, size: 18 });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '设边长为 $x$ 米，由面积公式得 $x^2 = 25$。因为 $5^2 = 25$，所以 $x = 5$。但是注意——$(-5)^2 = 25$ 也成立！因此满足 $x^2 = 25$ 的数有两个：$5$ 和 $-5$。这就引出了"平方根"的概念。下面我们用三个正方形来直观感受一下。',
        enter: function (anim) {
          // 绘制面积分别为 9、16、25 的三个正方形示意（边长 3、4、5，缩小比例展示）
          // 比例：用 0.55 缩放显示
          var scale = 0.55;
          var areas = [9, 16, 25];
          var sides = [3, 4, 5];
          var colors = [COOL, GREEN, WARM];
          var startX = [-5.2, -1.3, 3.0];

          var p = Promise.resolve();
          areas.forEach(function (area, i) {
            p = p.then(function () {
              var s = sides[i] * scale;
              var cx = startX[i];
              var cy = 0.5;
              drawSquare('s1-sq' + i, cx, cy, s, colors[i], '$' + area + '$ m²');
              // 边长标注
              S.addText('s1-side' + i, cx + s / 2 - 0.2, cy - 0.6,
                '边长 $' + sides[i] + '$ m', { color: colors[i], size: 14 });
              return anim ? delay(350) : null;
            });
          });
          p = p.then(function () {
            P.renderCard(
              '已知面积求边长：<br>' +
              '$9$ m² → 边长 $\\pm 3$ m<br>' +
              '$16$ m² → 边长 $\\pm 4$ m<br>' +
              '$25$ m² → 边长 $\\pm 5$ m<br>' +
              '<small>（实际边长取正值，数学上两个解都有意义）</small>'
            );
          });
          return p;
        },
      },
      {
        narration: '可以看到，面积 $9$ 对应边长 $3$ 或 $-3$；面积 $16$ 对应 $4$ 或 $-4$；面积 $25$ 对应 $5$ 或 $-5$。这种"已知平方求原数"的问题，就是今天我们要学习的核心内容——<b>平方根</b>与<b>开平方</b>。',
        enter: function (anim) {
          S.addText('s1-concl', -4.5, -1.5,
            '核心问题：已知 $x^2 = a$，求 $x$ 的值', { color: AMBER, size: 17 });
          P.renderCard(
            '<b>今日学习目标</b><br>' +
            '① 平方根的定义<br>' +
            '② 正数、零、负数各自的平方根情况<br>' +
            '③ 开平方运算及符号 $\\sqrt{\\phantom{0}}$'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
