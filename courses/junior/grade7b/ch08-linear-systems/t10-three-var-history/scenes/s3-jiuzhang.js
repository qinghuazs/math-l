// s3-jiuzhang.js  《九章算术》方程术（3步）
// 数学史：汉代《九章算术》第八章"方程"——世界最早的线性方程组系统解法。
// 算筹方阵纵排系数（类似增广矩阵的竖置），"遍乘直除"即加减消元的古代形态。
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

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画一根算筹（竖条小矩形）
  function rod(id, x, y) {
    S.addPolygon(id, [
      [x - 0.06, y - 0.35], [x + 0.06, y - 0.35], [x + 0.06, y + 0.35], [x - 0.06, y + 0.35],
    ], { color: BROWN, opacity: 0.9 });
  }

  // 在 (cx, cy) 处用算筹摆数字 n（1~5 竖排即可，示意用）
  function rodNumber(idPrefix, cx, cy, n) {
    var i;
    for (i = 0; i < n; i++) {
      rod(idPrefix + '-' + i, cx + (i - (n - 1) / 2) * 0.2, cy);
    }
  }

  var scene = {
    id: 's3',
    title: '三、《九章算术》方程术',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在讲一段值得骄傲的数学史。两千年前的汉代，中国数学经典《九章算术》第八章就叫"方程"——这是世界上最早系统解线性方程组的方法！书中的名题：上等禾三束、中等禾二束、下等禾一束共三十九斗；换不同的搭配又得别的斗数……这正是一个三元一次方程组！',
        enter: function () {
          S.actor('s3-title', 0, 7.0, '《九章算术》· 方程第八', { color: BROWN, size: 24, bold: true });
          S.actor('s3-intro', 0, 5.3, '汉代（约公元前 1 世纪）—— 世界最早的线性方程组解法', { color: INK, size: 16 });
          S.addPolygon('s3-book-bg', [
            [-8.5, 4.2], [8.5, 4.2], [8.5, 0.8], [-8.5, 0.8],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s3-heti', 0, 3.2,
            '"上禾三秉，中禾二秉，下禾一秉，实三十九斗……"',
            { color: BROWN, size: 17, bold: true });
          S.actor('s3-heti2', 0, 1.7, '—— 三种禾的产量问题，就是三元一次方程组！', { color: INK, size: 15 });
          P.renderCard('<b>《九章算术》</b>第八章"方程"：用三元一次方程组解禾束产量问题——"方程"一词正源于此！');
        },
      },
      {
        narration: '古人没有字母 x、y、z，怎么表示方程组？用<b>算筹</b>！把每个方程的系数用小竹棍竖着摆成一列，几个方程并排摆成一个方阵——这个"方"阵里的每一列都是一个方"程"，这就是"方程"名字的由来。请看示意：三列算筹，就是三个方程的系数。',
        enter: function (anim) {
          S.remove('s3-title'); S.remove('s3-intro'); S.remove('s3-book-bg');
          S.remove('s3-heti'); S.remove('s3-heti2');
          S.actor('s3-rod-title', 0, 7.0, '算筹方阵：竖列即方程', { color: PURPLE, size: 20, bold: true });
          // 画 3×3 示意方阵（列=方程，行=未知数系数），用 1~3 根算筹示意
          var grid = [
            [3, 2, 1],
            [2, 3, 1],
            [1, 2, 3],
          ];
          var c, r;
          for (c = 0; c < 3; c++) {
            for (r = 0; r < 3; r++) {
              rodNumber('s3-rn-' + c + '-' + r, -3 + c * 3, 4.2 - r * 1.6, grid[r][c]);
            }
            S.actor('s3-col-' + c, -3 + c * 3, -1.2, '方程' + '①②③'.charAt(c), { color: INK, size: 14 });
          }
          S.addPolygon('s3-grid-bg', [
            [-5.2, 5.4], [5.2, 5.4], [5.2, -0.4], [-5.2, -0.4],
          ], { color: BROWN, opacity: 0.05, borderWidth: 2, strokeColor: BROWN });
          S.actor('s3-note', 0, -2.8, '一列一方程，摆成"方"阵 —— "方程"之名由此而来', { color: BROWN, size: 16, bold: true });
          P.renderCard('算筹方阵 ≈ 今天线性代数的<b>增广矩阵</b>（竖置版）——两千年前的抽象！');
          return anim ? delay(400) : null;
        },
      },
      {
        narration: '摆好方阵后怎么解？《九章算术》的口诀叫"<b>遍乘直除</b>"：把某一列整体乘一个数（遍乘），再反复减去另一列（直除），直到某个未知数的系数变成零——同学们发现了吗？这不就是我们刚学的<b>加减消元法</b>吗！先乘再减、消去一元，古今方法完全一致。',
        enter: function () {
          // 清掉步2 算筹方阵（含逐根算筹）
          var c, r, i;
          for (c = 0; c < 3; c++) {
            for (r = 0; r < 3; r++) {
              for (i = 0; i < 3; i++) { S.remove('s3-rn-' + c + '-' + r + '-' + i); }
            }
            S.remove('s3-col-' + c);
          }
          S.remove('s3-rod-title'); S.remove('s3-grid-bg'); S.remove('s3-note');
          S.actor('s3-fa-title', 0, 6.5, '"遍乘直除" = 先乘再减 = 加减消元！', { color: RED, size: 21, bold: true });
          S.actor('s3-fa1', -4.5, 4.2, '遍乘\n（整列×同一数）', { color: ORANGE, size: 16, bold: true, css: 'background:#fff3e0;border-radius:8px;padding:8px 16px;' });
          S.actor('s3-arrow', 0, 4.2, '$\\Rightarrow$', { color: INK, size: 22 });
          S.actor('s3-fa2', 4.5, 4.2, '直除\n（反复相减消元）', { color: GREEN, size: 16, bold: true, css: 'background:#e8f5e9;border-radius:8px;padding:8px 16px;' });
          P.renderCard('<b>遍乘</b>＝方程两边同乘一个数；<b>直除</b>＝两式反复相减。<br>古代算法与现代加减消元<b>本质相同</b>！', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
