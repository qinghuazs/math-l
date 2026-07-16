(function (CW) {
  'use strict';
  // s1 复习与进阶——建模七步回顾，引入本课更复杂的问题类型
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's1',
    title: '一、复习与进阶',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，上节课我们学习了用二元一次方程组解决实际问题的七步建模法。今天先来快速复习这七个步骤。这七步是我们解应用题的固定框架：审题、设元、找关系、列方程组、解方程组、检验、作答。每一步都不能省略，特别是检验——很多同学解出来就直接写答句，这是不规范的。',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.2, '建模七步法——快速回顾', {
            color: BLUE, size: 22, bold: true,
          });

          var steps = [
            ['①审题', '明确已知条件与所求量'],
            ['②设元', '设两个未知数（通常用 $x$、$y$）'],
            ['③找关系', '从题目中挖掘两个独立等量关系'],
            ['④列方程组', '根据关系写出两个方程，联立'],
            ['⑤解方程组', '代入消元法或加减消元法'],
            ['⑥检验', '代回原方程（组）逐一验证'],
            ['⑦作答', '写完整答句，对应题目问法'],
          ];

          var y0 = 5.8;
          var dy = 1.55;
          for (var i = 0; i < steps.length; i++) {
            var col = (i % 2 === 0) ? BLUE : GREEN;
            S.actor('s1-step-num-' + i, -8.5, y0 - i * dy,
              steps[i][0], { color: col, size: 15, bold: true });
            S.actor('s1-step-desc-' + i, 0, y0 - i * dy,
              steps[i][1], { color: INK, size: 13 });
          }

          P.renderCard(
            '<b>建模七步法</b><br>' +
            '①审题 → ②设元 → ③找关系 → ④列方程组<br>' +
            '→ ⑤解方程组 → ⑥检验 → ⑦作答<br>' +
            '每步都有意义，不能跳过！'
          );
        },
      },
      {
        narration: '上节课我们解决的是比较直接的问题——鸡兔同笼、和倍问题、流水行船。今天难度升级！我们要挑战三类更复杂的实际问题：第一类是百分比增长率问题，需要把百分比转化为代数式；第二类是配套问题，隐藏着比例关系；第三类是表格信息题，信息藏在表格的行和列里。这三类题的共同点是：等量关系不那么显眼，需要深入分析题意才能找到。',
        enter: function (anim) {
          S.actor('s1-upgrade-title', 0, 7.0, '本课挑战——三类进阶问题', {
            color: ORANGE, size: 21, bold: true,
          });

          // 三类问题卡片
          S.addPolygon('s1-c1-bg', [
            [-9.5, 5.8], [-0.3, 5.8], [-0.3, 3.0], [-9.5, 3.0],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s1-c1-icon', -4.9, 5.3, '📈 百分比增长率', { color: BLUE, size: 16, bold: true });
          S.actor('s1-c1-hint', -4.9, 4.5,
            '今年比去年多 10%…', { color: INK, size: 13 });
          S.actor('s1-c1-key', -4.9, 3.5,
            '关键：$x \\times (1+10\\%)$', { color: BLUE, size: 14 });

          S.addPolygon('s1-c2-bg', [
            [0.3, 5.8], [9.5, 5.8], [9.5, 3.0], [0.3, 3.0],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s1-c2-icon', 4.9, 5.3, '🔩 配套问题', { color: GREEN, size: 16, bold: true });
          S.actor('s1-c2-hint', 4.9, 4.5,
            '螺栓配螺母，正好成套…', { color: INK, size: 13 });
          S.actor('s1-c2-key', 4.9, 3.5,
            '关键：比例关系 = 等量关系', { color: GREEN, size: 14 });

          S.addPolygon('s1-c3-bg', [
            [-9.5, 2.4], [9.5, 2.4], [9.5, -0.2], [-9.5, -0.2],
          ], { color: RED, opacity: 0.07, borderWidth: 2, strokeColor: RED });
          S.actor('s1-c3-icon', 0, 2.0, '📊 表格信息题', { color: RED, size: 16, bold: true });
          S.actor('s1-c3-hint', 0, 1.1,
            '从表格的行与列读取两个等量关系', { color: INK, size: 13 });
          S.actor('s1-c3-key', 0, 0.2,
            '关键：每行/每列对应一个方程', { color: RED, size: 14 });

          S.actor('s1-slogan', 0, -1.2,
            '找到等量关系 = 解题成功了一半！',
            { color: ORANGE, size: 16, bold: true });

          P.renderCard(
            '<b>本课三类进阶题型</b><br>' +
            '① 百分比增长率：把百分比化为代数式<br>' +
            '② 配套问题：比例关系就是等量关系<br>' +
            '③ 表格信息题：逐行/逐列读方程<br>' +
            '<b>核心：深挖等量关系！</b>'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
