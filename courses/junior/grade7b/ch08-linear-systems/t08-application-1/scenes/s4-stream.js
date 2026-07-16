(function (CW) {
  'use strict';
  // s4 行程问题（顺逆流）
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's4',
    title: '四、顺逆流问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第三种类型是行程问题，今天看顺流和逆流的情境。题目：一艘轮船在河中航行，顺流速度为每小时20千米，逆流速度为每小时16千米。求轮船在静水中的速度和水流的速度。分析：这道题有两个未知量——船速和水速，分别设为 v 和 w。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '顺逆流问题：求船速与水速', {
            color: BLUE, size: 20, bold: true,
          });

          // 题目框
          S.addPolygon('s4-q-bg', [
            [-9.5, 6.5], [9.5, 6.5], [9.5, 4.5], [-9.5, 4.5],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s4-q1', 0, 6.1,
            '顺流速度：20 km/h', { color: INK, size: 16 });
          S.actor('s4-q2', 0, 5.3,
            '逆流速度：16 km/h', { color: INK, size: 16 });
          S.actor('s4-q3', 0, 4.7,
            '求：轮船静水速度 v 和水流速度 w', { color: ORANGE, size: 15 });

          // 顺逆流示意图
          // 河岸上方线
          S.addSegment('s4-river-top', [-9, 3.2], [9, 3.2], {
            color: BLUE, width: 3, dash: 0,
          });
          // 河岸下方线
          S.addSegment('s4-river-bot', [-9, -0.5], [9, -0.5], {
            color: BLUE, width: 3, dash: 0,
          });

          // 水流标注
          S.actor('s4-water-label', 0, 1.5, '水流方向 →', { color: BLUE, size: 15 });

          // 顺流船（上部，向右走）
          S.addPolygon('s4-boat-down-body', [
            [-5.5, 2.8], [1.5, 2.8], [2.5, 2.2], [-5.5, 2.2],
          ], { color: ORANGE, opacity: 0.7, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s4-down-label', -2, 2.5,
            '顺流 →  $v + w = 20$',
            { color: ORANGE, size: 15, bold: true });

          // 逆流船（下部，向左走）
          S.addPolygon('s4-boat-up-body', [
            [5.5, 0.2], [-1.5, 0.2], [-2.5, -0.3], [5.5, -0.3],
          ], { color: RED, opacity: 0.7, borderWidth: 2, strokeColor: RED });
          S.actor('s4-up-label', 2, -0.1,
            '$v - w = 16$  ← 逆流',
            { color: RED, size: 15, bold: true });

          P.renderCard(
            '设静水速度 $v$，水流速度 $w$（km/h）<br>' +
            '顺流：船速 + 水速 = 实际速度<br>' +
            '逆流：船速 − 水速 = 实际速度'
          );
        },
      },
      {
        narration: '顺流时，水流帮助前进，实际速度等于船速加水速：v+w=20；逆流时，水流阻碍前进，实际速度等于船速减水速：v-w=16。两式联立得方程组，用加减消元法：两式相加，2v=36，v=18；两式相减，2w=4，w=2。',
        enter: function (anim) {
          S.actor('s4-solve-title', 0, 7.2, '列方程组并求解', {
            color: INK, size: 20, bold: true,
          });

          // 方程组来源
          S.addPolygon('s4-sys-src-bg', [
            [-9.5, 6.5], [9.5, 6.5], [9.5, 4.5], [-9.5, 4.5],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s4-src1', 0, 6.1,
            '顺流：$v + w = 20$ ……①',
            { color: ORANGE, size: 17, bold: true });
          S.actor('s4-src2', 0, 5.1,
            '逆流：$v - w = 16$ ……②',
            { color: RED, size: 17, bold: true });

          // 求 v：两式相加
          S.actor('s4-add-label', -6, 3.8, '① + ②：', { color: INK, size: 15 });
          S.actor('s4-add-calc',   3, 3.8,
            '$(v+w)+(v-w) = 20+16$',
            { color: ORANGE, size: 15 });
          S.actor('s4-add-res',    3, 3.0,
            '$2v = 36$',
            { color: ORANGE, size: 17 });
          S.actor('s4-v-res', 0, 2.1,
            '$v = 18$（静水速度 18 km/h）',
            { color: BLUE, size: 19, bold: true });

          // 求 w：两式相减
          S.actor('s4-sub-label', -6, 1.0, '① - ②：', { color: INK, size: 15 });
          S.actor('s4-sub-calc',   3, 1.0,
            '$(v+w)-(v-w) = 20-16$',
            { color: RED, size: 15 });
          S.actor('s4-sub-res',    3, 0.2,
            '$2w = 4$',
            { color: RED, size: 17 });
          S.actor('s4-w-res', 0, -0.8,
            '$w = 2$（水流速度 2 km/h）',
            { color: GREEN, size: 19, bold: true });

          P.renderCard(
            '方程组：$\\begin{cases}v+w=20\\\\v-w=16\\end{cases}$<br>' +
            '两式相加：$2v=36$，$v=18$<br>' +
            '两式相减：$2w=4$，$w=2$'
          );
        },
      },
      {
        narration: '验证：顺流速度 v+w=18+2=20，正确✓；逆流速度 v-w=18-2=16，正确✓。答：轮船在静水中的速度为每小时18千米，水流速度为每小时2千米。这类问题的模型叫"和差型"——两个量的和与差已知，直接加减两式即可消元。',
        enter: function (anim) {
          S.actor('s4-check-title', 0, 7.2, '验证与"和差型"模型总结', {
            color: GREEN, size: 19, bold: true,
          });

          // 验证
          S.addPolygon('s4-ck-bg', [
            [-9.5, 6.5], [9.5, 6.5], [9.5, 5.0], [-9.5, 5.0],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s4-ck1', 0, 6.1,
            '验顺流：$18+2=20$ ✓', { color: GREEN, size: 15 });
          S.actor('s4-ck2', 0, 5.3,
            '验逆流：$18-2=16$ ✓', { color: GREEN, size: 15 });

          // 答句
          S.addPolygon('s4-ans-bg', [
            [-8, 4.4], [8, 4.4], [8, 3.0], [-8, 3.0],
          ], { color: BLUE, opacity: 0.09, borderWidth: 2, strokeColor: BLUE });
          S.actor('s4-ans', 0, 3.7,
            '答：静水速度 18 km/h，水流速度 2 km/h。',
            { color: BLUE, size: 16, bold: true });

          // 模型总结
          S.addPolygon('s4-model-bg', [
            [-9.5, 2.4], [9.5, 2.4], [9.5, -0.5], [-9.5, -0.5],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s4-model-head', 0, 2.0,
            '★ 和差型模型', { color: ORANGE, size: 18, bold: true });
          S.actor('s4-model-t1', 0, 1.2,
            '$\\begin{cases}x+y=A\\\\x-y=B\\end{cases}$  →  两式相加/相减立刻消元',
            { color: INK, size: 16 });
          S.actor('s4-model-t2', -2, 0.1,
            '→ $x = \\dfrac{A+B}{2}$',
            { color: BLUE, size: 16 });
          S.actor('s4-model-t3', 4, 0.1,
            '$y = \\dfrac{A-B}{2}$',
            { color: RED, size: 16 });

          P.renderCard(
            '验：$18+2=20$ ✓，$18-2=16$ ✓<br>' +
            '<b>和差型公式</b>：$x=\\frac{A+B}{2}$，$y=\\frac{A-B}{2}$<br>' +
            '顺逆流、两段路、买卖差价……都是这个模型！',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
