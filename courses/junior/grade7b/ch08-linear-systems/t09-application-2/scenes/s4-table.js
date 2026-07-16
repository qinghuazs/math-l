(function (CW) {
  'use strict';
  // s4 表格信息题
  // 价目表：第一次购 A×2 + B×3 = 32 元；第二次购 A×5 + B×2 = 47 元。求 A、B 单价。
  // ①×2: 4A+6B=64；②×3: 15A+6B=141；相减 11A=77 → A=7；回代①：14+3B=32 → B=6
  // 验算：2×7+3×6=14+18=32 ✓；5×7+2×6=35+12=47 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、表格信息题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第三类进阶题型——从表格中读取信息。生活中很多数据是以表格形式出现的。请看这张购物记录表：第一次买了 2 件 A 商品和 3 件 B 商品，共花 32 元；第二次买了 5 件 A 和 2 件 B，共花 47 元。求 A、B 商品的单价。关键：表格的<b>每一行</b>就是一个等量关系！',
        enter: function () {
          S.actor('s4-title', 0, 7.2, '表格信息题：读行列方程', { color: BLUE, size: 21, bold: true });
          P.renderTable({
            head: ['购买记录', 'A 商品（件）', 'B 商品（件）', '总价（元）'],
            rows: [
              ['第一次', '2', '3', '32'],
              ['第二次', '5', '2', '47'],
            ],
          });
          S.actor('s4-hint', 0, 4.5, '设 A 单价 $x$ 元，B 单价 $y$ 元', { color: INK, size: 17 });
          S.actor('s4-eq1', 0, 3.0, '第一行 → $2x + 3y = 32$ ①', { color: ORANGE, size: 18 });
          S.actor('s4-eq2', 0, 1.6, '第二行 → $5x + 2y = 47$ ②', { color: GREEN, size: 18 });
          P.renderCard('<b>读表列方程</b>：表格一行 = 一个等量关系。<br>两行 → 两个方程 → 方程组！');
        },
      },
      {
        narration: '系数既不相同也不相反，用上节课的方法：先乘再消。消去 y——3 和 2 的最小公倍数是 6：①×2 得 4x+6y=64，②×3 得 15x+6y=141。两式相减：11x=77，x=7。回代①：14+3y=32，3y=18，y=6。',
        enter: function (anim) {
          S.remove('s4-hint'); S.remove('s4-eq1'); S.remove('s4-eq2');
          S.actor('s4-d1', 0, 6.6, '①×2：$4x + 6y = 64$ ③', { color: ORANGE, size: 17 });
          S.actor('s4-d2', 0, 5.4, '②×3：$15x + 6y = 141$ ④', { color: GREEN, size: 17 });
          S.addSegment('s4-line', [-4.5, 4.7], [4.5, 4.7], { color: INK, width: 2, dash: 0 });
          S.actor('s4-d3', 0, 4.0, '④−③：$11x = 77 \\Rightarrow x = 7$', { color: RED, size: 18, bold: true });
          S.actor('s4-d4', 0, 2.6, '回代①：$14 + 3y = 32 \\Rightarrow y = 6$', { color: BLUE, size: 18 });
          P.renderCard('消 $y$：×2 与 ×3 让 $y$ 系数同为 6，相减消元。<br>$x=7$，$y=6$。');
          return anim ? delay(400) : null;
        },
      },
      {
        narration: '检验：第一次 2×7+3×6=14+18=32 元，对；第二次 5×7+2×6=35+12=47 元，也对！所以 A 商品单价 7 元、B 商品单价 6 元。表格题的秘诀就八个字：一行一式、逐行翻译。',
        enter: function () {
          S.remove('s4-d1'); S.remove('s4-d2'); S.remove('s4-line');
          S.remove('s4-d3'); S.remove('s4-d4');
          S.actor('s4-check', 0, 5.5, '检验：$2 \\times 7 + 3 \\times 6 = 32$ ✓  $5 \\times 7 + 2 \\times 6 = 47$ ✓', { color: GREEN, size: 16 });
          S.actor('s4-ans', 0, 3.5, '答：A 单价 7 元，B 单价 6 元', { color: RED, size: 20, bold: true });
          P.renderCard('<b>表格题口诀</b>：一行一式、逐行翻译。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
