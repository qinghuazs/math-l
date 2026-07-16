(function (CW) {
  'use strict';
  // s5 小结：概念梳理 + 引出消元
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '我们来回顾本节课的核心内容。第一：二元一次方程组的概念——含两个未知数、每个方程最高次数为一次的方程组，用大括号联立。第二：方程组的解——同时满足方程组中所有方程的一组未知数的值。第三：图像意义——方程组的解就是两条直线的交点坐标，解方程组等价于求交点。',
        enter: function (anim) {
          S.actor('s5-title', 0, 6.8, '本节小结', {
            color: BLUE, size: 22, bold: true,
          });

          // 三个知识块
          // 块1：概念
          S.addPolygon('s5-box1', [
            [-9.5, 5.6], [-0.3, 5.6], [-0.3, 2.2], [-9.5, 2.2],
          ], { color: BLUE, opacity: 0.09, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-k1-label', -4.9, 5.2, '① 二元一次方程组', { color: BLUE, size: 15, bold: true });
          S.actor('s5-k1-text1', -4.9, 4.3,
            '两个未知数，各方程一次', { color: INK, size: 14 });
          S.actor('s5-k1-text2', -4.9, 3.4,
            '大括号联立', { color: INK, size: 14 });
          S.actor('s5-k1-eg', -4.9, 2.5,
            '$\\begin{cases}x+y=10\\\\2x+y=16\\end{cases}$',
            { color: BLUE, size: 14 });

          // 块2：解
          S.addPolygon('s5-box2', [
            [0.3, 5.6], [9.5, 5.6], [9.5, 2.2], [0.3, 2.2],
          ], { color: GREEN, opacity: 0.09, borderWidth: 2, strokeColor: GREEN });
          S.actor('s5-k2-label', 4.9, 5.2, '② 方程组的解', { color: GREEN, size: 15, bold: true });
          S.actor('s5-k2-text1', 4.9, 4.3,
            '同时满足所有方程', { color: INK, size: 14 });
          S.actor('s5-k2-text2', 4.9, 3.4,
            '的一组未知数的值', { color: INK, size: 14 });
          S.actor('s5-k2-eg', 4.9, 2.5,
            '$\\begin{cases}x=6\\\\y=4\\end{cases}$',
            { color: GREEN, size: 14 });

          // 块3：图像意义
          S.addPolygon('s5-box3', [
            [-9.5, 1.6], [9.5, 1.6], [9.5, -1.8], [-9.5, -1.8],
          ], { color: RED, opacity: 0.08, borderWidth: 2, strokeColor: RED });
          S.actor('s5-k3-label', 0, 1.2, '③ 图像意义', { color: RED, size: 15, bold: true });
          S.actor('s5-k3-text', 0, 0.3,
            '解方程组 = 求两条直线的交点坐标',
            { color: RED, size: 15, bold: true });
          S.actor('s5-k3-text2', 0, -0.7,
            '交点在两直线上 → 坐标同时满足两个方程',
            { color: INK, size: 13 });
          S.actor('s5-k3-text3', 0, -1.5,
            '→ 就是方程组的解',
            { color: INK, size: 13 });

          P.renderCard(
            '<b>三大核心</b>：<br>' +
            '① <b>方程组概念</b>：多个含相同未知数的一次方程联立<br>' +
            '② <b>方程组的解</b>：同时满足所有方程的一组值<br>' +
            '③ <b>图像意义</b>：解 = 两直线交点坐标',
            'cool'
          );
        },
      },
      {
        narration: '今天我们学会了什么是二元一次方程组、什么是方程组的解，还从图像上看到了"解方程组等价于求两条直线的交点"。但图像法不够精确，下节课我们学习更实用的方法——消元法，通过代数运算精确求解方程组！',
        enter: function (anim) {
          S.actor('s5-next-title', 0, -2.8, '下节预告', {
            color: ORANGE, size: 19, bold: true,
          });

          S.addPolygon('s5-next-bg', [
            [-9.0, -2.2], [9.0, -2.2], [9.0, -5.8], [-9.0, -5.8],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2.5, strokeColor: ORANGE });

          S.actor('s5-next-q', 0, -3.0,
            '图像法不够精确——', { color: ORANGE, size: 16 });
          S.actor('s5-next-q2', 0, -3.9,
            '如何精确计算方程组的解？', { color: ORANGE, size: 17, bold: true });
          S.actor('s5-next-ans', 0, -4.8,
            '消元法（代入法 / 加减法）→ 下节课见！', { color: INK, size: 15 });

          P.renderCard(
            '今天掌握：<br>' +
            '✓ 二元一次方程组的概念与识别<br>' +
            '✓ 用检验法判断方程组的解<br>' +
            '✓ 图像中两直线的交点 = 方程组的解<br><br>' +
            '<b>下节</b>：消元法精确求解！',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
