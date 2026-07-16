(function (CW) {
  'use strict';
  // s1 复习热身：代入法五步回顾 + 选谁变形决策
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's1',
    title: '一、复习热身',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们好！上节课我们学习了代入消元法。用代入法解方程组，分哪几步？请大家回忆一下。核心是"变形——代入——求解——回代——检验"五个步骤。今天我们来挑战更复杂的情形。',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.0, '代入法五步流程', {
            color: BLUE, size: 22, bold: true,
          });

          // 五个步骤竖排
          var steps = [
            { n: '①', txt: '变形：从一个方程中用含 $y$ 的式子表示 $x$（或含 $x$ 的式子表示 $y$）', col: BLUE },
            { n: '②', txt: '代入：把变形结果代入另一方程，消去一个未知数', col: ORANGE },
            { n: '③', txt: '求解：解一元一次方程，求出一个未知数的值', col: GREEN },
            { n: '④', txt: '回代：把求出的值代回变形方程，求另一个未知数', col: ORANGE },
            { n: '⑤', txt: '检验：把 $x$、$y$ 的值代入原方程组，验证两个方程均成立', col: INK },
          ];

          var yStart = 5.2;
          var dy = 2.0;
          for (var i = 0; i < steps.length; i++) {
            (function (idx) {
              var item = steps[idx];
              var yPos = yStart - idx * dy;
              S.addPolygon('s1-bg' + idx, [
                [-9.5, yPos + 0.7], [9.5, yPos + 0.7],
                [9.5, yPos - 0.7], [-9.5, yPos - 0.7],
              ], { color: item.col, opacity: 0.06, borderWidth: 1.5, strokeColor: item.col });
              S.actor('s1-num' + idx, -8.5, yPos, item.n, {
                color: item.col, size: 20, bold: true,
              });
              S.actor('s1-step' + idx, 0.5, yPos, item.txt, {
                color: INK, size: 14,
              });
            })(i);
          }

          P.renderCard(
            '<b>代入法五步</b>：<br>' +
            '① 变形 → ② 代入 → ③ 求解 → ④ 回代 → ⑤ 检验<br>' +
            '关键在"变形"——选哪个未知数来表示更方便？'
          );
        },
      },
      {
        narration: '快问快答！面对一个方程组，如何判断选哪个方程、用哪个未知数来变形？原则是：优先选系数为 1 或 -1 的未知数——变形后不出现分数，计算最简单。如果没有系数为 1 的，就选系数绝对值最小的那个。',
        enter: function (anim) {
          // 标题
          S.actor('s2-qa-title', 0, 6.8, '快问快答：选谁变形最方便？', {
            color: ORANGE, size: 20, bold: true,
          });

          // 例子1：有系数1的
          S.addPolygon('s2-box1', [
            [-9.5, 5.6], [9.5, 5.6], [9.5, 2.8], [-9.5, 2.8],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-sys1', -5, 4.7,
            '$\\begin{cases}3x + y = 10\\\\2x - 3y = 1\\end{cases}$',
            { color: INK, size: 17 });
          S.actor('s2-ans1', 3, 4.7, '选 ①，用 $y$ 表示 $x$：', { color: BLUE, size: 15 });
          S.actor('s2-ans1b', 3, 3.7, '$y = 10 - 3x$ ← 系数为 1！', { color: GREEN, size: 15, bold: true });

          // 例子2：两个未知数系数都不为1
          S.addPolygon('s2-box2', [
            [-9.5, 2.2], [9.5, 2.2], [9.5, -0.6], [-9.5, -0.6],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s2-sys2', -5, 1.3,
            '$\\begin{cases}2x + 3y = 16\\\\x + 4y = 13\\end{cases}$',
            { color: INK, size: 17 });
          S.actor('s2-ans2', 3, 1.3, '选 ②，用 $x$ 表示 $y$：', { color: ORANGE, size: 15 });
          S.actor('s2-ans2b', 3, 0.3, '$x = 13 - 4y$ ← ②中 $x$ 系数为 1！', { color: GREEN, size: 15, bold: true });

          // 决策规则卡
          S.addPolygon('s2-rule-bg', [
            [-9.5, -1.2], [9.5, -1.2], [9.5, -5.2], [-9.5, -5.2],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2.5, strokeColor: GREEN });
          S.actor('s2-rule-title', 0, -1.8, '变形优先级规则', { color: GREEN, size: 17, bold: true });
          S.actor('s2-rule1', 0, -2.7, '第一优先：系数为 1 或 -1 的未知数（变形后无分数）', { color: INK, size: 14 });
          S.actor('s2-rule2', 0, -3.6, '第二优先：系数绝对值较小的（分数分母小）', { color: INK, size: 14 });
          S.actor('s2-rule3', 0, -4.5, '第三优先：代入后式子较简单的方程', { color: INK, size: 14 });

          P.renderCard(
            '<b>变形优先级</b>：<br>' +
            '系数为 <b>1 或 -1</b> 的未知数 → 变形后不出现分数 → 计算最简！<br>' +
            '这就是今天要解决的核心问题。',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
