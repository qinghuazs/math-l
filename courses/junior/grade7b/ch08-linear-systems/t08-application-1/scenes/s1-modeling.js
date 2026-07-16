(function (CW) {
  'use strict';
  // s1 用方程组建模的流程
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's1',
    title: '一、方程组建模流程',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们好！从今天开始，我们来学习如何用二元一次方程组解决实际问题。解应用题，关键是会"建模"——就是把实际问题翻译成数学方程。用方程组解题，一共分七个步骤，我们先把它们记清楚。',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.2, '用方程组解应用题——七步法', {
            color: BLUE, size: 22, bold: true,
          });

          // 七步流程
          var steps = [
            ['①', '审题', '明确哪些是已知量，哪些是未知量', BLUE],
            ['②', '设元', '设两个未知数（用 x、y 分别代表两个量）', GREEN],
            ['③', '找关系', '从题目中找出两个独立的相等关系', ORANGE],
            ['④', '列方程组', '用两个方程联立，写大括号', RED],
            ['⑤', '解方程组', '选择消元法（加减或代入）', INK],
            ['⑥', '验检', '把解代回原方程和实际条件验证', INK],
            ['⑦', '作答', '用完整的语言写出答句', GRAY],
          ];

          var yStart = 5.8;
          var yStep = 1.85;
          for (var i = 0; i < steps.length; i++) {
            var item = steps[i];
            var y = yStart - i * yStep;
            S.actor('s1-num-' + i, -9, y, item[0], { color: item[3], size: 17, bold: true });
            S.actor('s1-key-' + i, -7.5, y, item[1], { color: item[3], size: 17, bold: true });
            S.actor('s1-desc-' + i, -1.5, y, item[2], { color: INK, size: 15 });
          }

          P.renderCard(
            '<b>七步建模法</b><br>' +
            '① 审题 → ② 设元 → ③ 找关系<br>' +
            '→ ④ 列方程组 → ⑤ 解 → ⑥ 验 → ⑦ 答'
          );
        },
      },
      {
        narration: '你可能要问：为什么用两个未知数，而不是用一个？我们来对比一下。一元方程要先用一个量表示另一个量，步骤多；二元方程组直接设两个量，每个条件写一个方程，更自然，更清晰。来看关键区别：',
        enter: function (anim) {
          // 对比：一元 vs 二元
          S.addPolygon('s1-cmp-title-bg', [
            [-9.5, -3.0], [9.5, -3.0], [9.5, -4.2], [-9.5, -4.2],
          ], { color: INK, opacity: 0.06, borderWidth: 0, strokeColor: 'none' });
          S.actor('s1-cmp-title', 0, -3.55, '一元 vs 二元：对比两种思路', {
            color: INK, size: 18, bold: true,
          });

          // 一元
          S.addPolygon('s1-one-bg', [
            [-9.5, -4.5], [0, -4.5], [0, -7.6], [-9.5, -7.6],
          ], { color: GRAY, opacity: 0.10, borderWidth: 2, strokeColor: GRAY });
          S.actor('s1-one-title', -4.75, -4.9, '【一元方程】', { color: INK, size: 16, bold: true });
          S.actor('s1-one-t1', -4.75, -5.7, '设一个量 x，', { color: INK, size: 14 });
          S.actor('s1-one-t2', -4.75, -6.4, '另一个量用 x 的式子表示', { color: INK, size: 14 });
          S.actor('s1-one-t3', -4.75, -7.2, '→ 思路较绕', { color: RED, size: 14 });

          // 二元
          S.addPolygon('s1-two-bg', [
            [0.2, -4.5], [9.5, -4.5], [9.5, -7.6], [0.2, -7.6],
          ], { color: BLUE, opacity: 0.09, borderWidth: 2, strokeColor: BLUE });
          S.actor('s1-two-title', 4.85, -4.9, '【二元方程组】', { color: BLUE, size: 16, bold: true });
          S.actor('s1-two-t1', 4.85, -5.7, '设两个量 x、y，', { color: INK, size: 14 });
          S.actor('s1-two-t2', 4.85, -6.4, '每个条件直接列一个方程', { color: INK, size: 14 });
          S.actor('s1-two-t3', 4.85, -7.2, '→ 思路自然直接！', { color: GREEN, size: 14 });

          P.renderCard(
            '<b>核心思想</b>：找到<b>两个等量关系</b>，是列方程组的关键！<br>' +
            '有几个独立的关系，就能设几个未知数。'
          );
        },
      },
      {
        narration: '第三步"找关系"是最重要的。所谓"两个独立的相等关系"，就是题目中出现的两句不同的等量约束——比如"总数"是一个关系，"总价"是另一个关系。两个关系必须来自不同的信息，不能是同一句话的重复。记住这一点，我们就可以来解题了！',
        enter: function (anim) {
          S.addPolygon('s1-key-bg', [
            [-9, -3.5], [9, -3.5], [9, -5.8], [-9, -5.8],
          ], { color: ORANGE, opacity: 0.10, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s1-key-head', 0, -3.9, '★ 关键提醒', { color: ORANGE, size: 19, bold: true });
          S.actor('s1-key-line1', 0, -4.65,
            '两个方程必须来自两个不同的等量关系！',
            { color: RED, size: 16, bold: true });
          S.actor('s1-key-line2', 0, -5.4,
            '不能两个方程说的是同一件事。',
            { color: INK, size: 15 });

          P.renderCard(
            '<b>找关系诀窍</b>：<br>' +
            '问题中有几个"总量"信息？每一个就是一个等量关系。<br>' +
            '例：总只数 → 一个方程；总腿数 → 另一个方程'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
