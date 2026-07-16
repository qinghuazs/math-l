(function (CW) {
  'use strict';
  // s5 小结：复杂应用题的等量关系挖掘
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var INK    = '#455a64';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '今天我们攻克了三类进阶应用题，它们的共同难点都是等量关系藏得更深。回顾一下各自的挖掘技巧：百分比问题——注意"比去年多10%"是在原数基础上乘 1.1；配套问题——配套比例本身就是一个方程；表格问题——一行一式逐行翻译。',
        enter: function () {
          S.actor('s5-title', 0, 7.0, '三类进阶题的等量关系挖掘', { color: PURPLE, size: 22, bold: true });
          P.renderTable({
            head: ['题型', '隐藏的等量关系', '翻译技巧'],
            rows: [
              ['百分比/增长率', '今年 = 去年 × (1 + 增长率)', '$x \\to 1.1x$，别忘乘'],
              ['配套问题', '两种零件数量成固定比例', '$1:2$ 配套 → 螺母数 $= 2\\times$螺栓数'],
              ['表格信息', '每一行是一个等量关系', '一行一式、逐行翻译'],
            ],
          });
          S.actor('s5-k1', -5.5, 2.5, '百分比\n×(1+率)', { color: ORANGE, size: 16, bold: true, css: 'background:#fff3e0;border-radius:8px;padding:8px 14px;' });
          S.actor('s5-k2', 0, 2.5, '配套\n看比例', { color: GREEN, size: 16, bold: true, css: 'background:#e8f5e9;border-radius:8px;padding:8px 14px;' });
          S.actor('s5-k3', 5.5, 2.5, '表格\n一行一式', { color: BLUE, size: 16, bold: true, css: 'background:#e3f2fd;border-radius:8px;padding:8px 14px;' });
        },
      },
      {
        narration: '无论题目多复杂，建模的路线不变：审题→设两个未知数→找两个等量关系→列方程组→消元求解→检验→作答。区别只在"找等量关系"这一步需要更细心。下节课，我们把视野再拓宽一步——三个未知数怎么办？',
        enter: function () {
          S.actor('s5-flow', 0, 4.5, '审 → 设 → 找 → 列 → 解 → 验 → 答', { color: INK, size: 20, bold: true });
          P.renderCard('<b>本课要点</b>：复杂应用题 = 建模七步 + 深挖等量关系。<br>百分比乘 $(1+$率$)$、配套看比例、表格一行一式。', 'warm');
          P.renderCard('<b>下节预告</b>：三个未知数的方程组——消元思想还够用吗？', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
