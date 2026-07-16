// s4-comparison.js  古今对照与数学自信（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var BROWN  = '#5d4037';

  var scene = {
    id: 's4',
    title: '四、古今对照',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '把古今方法放在一起对照：《九章算术》的算筹方阵对应今天的系数排列，"遍乘"对应方程两边同乘，"直除"对应两式相减消元。而欧洲要到 17、18 世纪才由莱布尼茨等人系统研究线性方程组——中国的方程术领先了一千五百多年！',
        enter: function () {
          S.actor('s4-title', 0, 7.0, '古今对照：领先 1500 多年', { color: RED, size: 22, bold: true });
          P.renderTable({
            head: ['《九章算术》（汉代）', '现代方法'],
            rows: [
              ['算筹方阵（列为方程）', '方程组 / 增广矩阵'],
              ['遍乘（整列同乘一数）', '方程两边同乘一数'],
              ['直除（两列反复相减）', '加减消元'],
              ['约公元前 1 世纪', '欧洲 17-18 世纪系统化'],
            ],
          });
          S.actor('s4-left', -4.8, 2.2, '算筹 · 遍乘直除\n（约公元前 1 世纪）', { color: BROWN, size: 16, bold: true, css: 'background:#efebe9;border-radius:8px;padding:10px 16px;' });
          S.actor('s4-eq', 0, 2.2, '$=$', { color: INK, size: 26 });
          S.actor('s4-right', 4.8, 2.2, '加减消元法\n（今天课堂所学）', { color: BLUE, size: 16, bold: true, css: 'background:#e3f2fd;border-radius:8px;padding:10px 16px;' });
          P.renderCard('同一个数学思想，跨越两千年<b>殊途同归</b>——这是中国古代数学的高峰之一。', 'warm');
        },
      },
      {
        narration: '更重要的是方法背后的思想：不管是二元、三元，还是将来大学里的 n 元方程组，核心永远是<b>消元</b>——把未知数一个一个减少，化繁为简、化未知为已知。这个思想两千年前的中国古人就掌握了，今天仍是线性代数的基石。',
        enter: function () {
          S.remove('s4-left'); S.remove('s4-eq'); S.remove('s4-right');
          S.actor('s4-chain', 0, 5.0, '$n$ 元 $\\to \\cdots \\to$ 三元 $\\to$ 二元 $\\to$ 一元', { color: PURPLE, size: 22, bold: true });
          S.actor('s4-core', 0, 2.5, '消元：化繁为简，化未知为已知', { color: GREEN, size: 20, bold: true });
          P.renderCard('<b>消元思想的普适性</b>：从初中方程组到大学线性代数，一脉相承。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
