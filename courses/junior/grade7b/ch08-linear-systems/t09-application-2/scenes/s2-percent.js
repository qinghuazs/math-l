(function (CW) {
  'use strict';
  // s2 百分比增长率问题
  // 题目：某校去年共植树500棵，今年男生组比去年多种10%、女生组比去年多种20%，今年共570棵。
  // 设去年男生组植树x棵，女生组y棵。
  // 方程①：x + y = 500
  // 方程②：1.1x + 1.2y = 570  即 11x + 12y = 5700（两边×10）
  // 解：由①得 y = 500-x，代入②：11x + 12(500-x) = 5700
  //    11x + 6000 - 12x = 5700 → -x = -300 → x = 300，y = 200
  // 验算：300+200=500 ✓；1.1×300+1.2×200=330+240=570 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's2',
    title: '二、增长率/百分比问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第一个进阶题型——百分比增长率问题。题目：某校去年共植树500棵，今年男生组比去年多种10%、女生组比去年多种20%，今年两组合计共种570棵。问：去年男生组和女生组各植树多少棵？同学们注意，题目说的是"今年比去年多种10%"，这个百分比是以去年的数量为基准的——这是关键！',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '植树问题（增长率）', {
            color: BLUE, size: 22, bold: true,
          });

          // 题目背景框
          S.addPolygon('s2-q-bg', [
            [-9.5, 6.3], [9.5, 6.3], [9.5, 2.8], [-9.5, 2.8],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 2, strokeColor: ORANGE });

          S.actor('s2-q1', 0, 5.9,
            '某校去年共植树 $500$ 棵',
            { color: INK, size: 16 });
          S.actor('s2-q2', 0, 5.0,
            '今年男生组比去年多种 $10\\%$，女生组比去年多种 $20\\%$',
            { color: INK, size: 15 });
          S.actor('s2-q3', 0, 4.1,
            '今年两组合计共种 $570$ 棵',
            { color: INK, size: 16 });
          S.actor('s2-q-ask', 0, 3.1,
            '去年男生组、女生组各植树多少棵？',
            { color: ORANGE, size: 17, bold: true });

          // 关键提示：百分比的基准
          S.addPolygon('s2-tip-bg', [
            [-8, 2.0], [8, 2.0], [8, 0.3], [-8, 0.3],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-tip-text', 0, 1.55,
            '关键：比去年多 $10\\%$ → 今年 $= $ 去年 $\\times 1.1$',
            { color: BLUE, size: 15, bold: true });
          S.actor('s2-tip-base', 0, 0.75,
            '百分比的基准是"去年的数量"！',
            { color: BLUE, size: 14 });

          // 示意图（去年→今年）
          S.actor('s2-arrow-m', -4, -0.8, '男生去年 $x$ 棵  →  今年 $1.1x$ 棵', { color: INK, size: 14 });
          S.actor('s2-arrow-f',  4, -0.8, '女生去年 $y$ 棵  →  今年 $1.2y$ 棵', { color: INK, size: 14 });

          P.renderCard(
            '<b>植树问题（增长率）</b><br>' +
            '去年总量：500棵<br>' +
            '今年男生多10%，女生多20%，今年共570棵<br>' +
            '<b>关键：多10% = 今年是去年的1.1倍</b>'
          );
        },
      },
      {
        narration: '现在按七步法来解。第一步审题完成，第二步设元：设去年男生组植树 x 棵，女生组植树 y 棵。第三步找等量关系。关系①：去年两组合计是500棵，所以 x 加 y 等于500。关系②：今年男生组植了 1.1x 棵，今年女生组植了 1.2y 棵，合计570棵，所以 1.1x 加 1.2y 等于570。为了消去小数，两边乘以10，得 11x 加 12y 等于5700。',
        enter: function (anim) {
          S.actor('s2-set-title', 0, 7.2, '设元与列方程组', {
            color: BLUE, size: 20, bold: true,
          });

          // 设元
          S.addPolygon('s2-set-bg', [
            [-9.5, 6.5], [9.5, 6.5], [9.5, 5.5], [-9.5, 5.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-set-x', -2.5, 6.0,
            '设去年男生组植树 $x$ 棵', { color: BLUE, size: 15, bold: true });
          S.actor('s2-set-y',  5.0, 6.0,
            '女生组 $y$ 棵', { color: BLUE, size: 15, bold: true });

          // 关系①
          S.addPolygon('s2-r1-bg', [
            [-9.5, 5.0], [9.5, 5.0], [9.5, 3.2], [-9.5, 3.2],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-r1-label', -7, 4.6, '关系①', { color: GREEN, size: 15, bold: true });
          S.actor('s2-r1-cond', 0, 4.6,
            '去年合计 $500$ 棵', { color: INK, size: 14 });
          S.actor('s2-r1-eq', 0, 3.6,
            '$x + y = 500$', { color: GREEN, size: 20, bold: true });

          // 关系②
          S.addPolygon('s2-r2-bg', [
            [-9.5, 2.7], [9.5, 2.7], [9.5, 0.4], [-9.5, 0.4],
          ], { color: RED, opacity: 0.07, borderWidth: 2, strokeColor: RED });
          S.actor('s2-r2-label', -7, 2.3, '关系②', { color: RED, size: 15, bold: true });
          S.actor('s2-r2-cond', 0, 2.3,
            '今年合计 $570$ 棵（含增长）', { color: INK, size: 14 });
          S.actor('s2-r2-eq1', 0, 1.5,
            '$1.1x + 1.2y = 570$', { color: RED, size: 18 });
          S.actor('s2-r2-x10', 0, 0.7,
            '两边 $\\times 10$：$11x + 12y = 5700$', { color: RED, size: 17, bold: true });

          // 方程组
          S.addPolygon('s2-sys-bg', [
            [-5, -0.0], [5, -0.0], [5, -2.0], [-5, -2.0],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-sys-label', 0, -0.3, '联立方程组：', { color: BLUE, size: 14 });
          S.actor('s2-sys-eq', 0, -1.2,
            '$\\begin{cases}x+y=500\\\\11x+12y=5700\\end{cases}$',
            { color: BLUE, size: 18, bold: true });

          P.renderCard(
            '设去年男生 $x$ 棵，女生 $y$ 棵<br>' +
            '关系①（去年合计）：$x+y=500$<br>' +
            '关系②（今年合计）：$1.1x+1.2y=570$<br>' +
            '整理得：$11x+12y=5700$'
          );
        },
      },
      {
        narration: '用代入消元法来解。由方程①得 y 等于 500 减 x，代入②：11x 加 12 乘以括号500减x 等于5700，展开：11x 加 6000 减 12x 等于5700，合并：负x 等于 负300，所以 x 等于 300。再代回方程①：300 加 y 等于500，所以 y 等于200。解出来了：去年男生组植树300棵，女生组植树200棵。',
        enter: function (anim) {
          S.actor('s2-solve-title', 0, 7.2, '解方程组（代入消元）', {
            color: INK, size: 20, bold: true,
          });

          S.actor('s2-step1', -1, 6.4,
            '由①：$y = 500 - x$', { color: GREEN, size: 16 });

          S.actor('s2-step2-label', -7.5, 5.4, '代入②：', { color: ORANGE, size: 14 });
          S.actor('s2-step2-eq', 2, 5.4,
            '$11x + 12(500 - x) = 5700$', { color: ORANGE, size: 16 });

          S.actor('s2-step3-label', -7.5, 4.4, '展开：', { color: INK, size: 14 });
          S.actor('s2-step3-eq', 1.5, 4.4,
            '$11x + 6000 - 12x = 5700$', { color: INK, size: 16 });

          S.actor('s2-step4-label', -7.5, 3.4, '合并：', { color: INK, size: 14 });
          S.actor('s2-step4-eq', 0, 3.4,
            '$-x = -300$', { color: INK, size: 16 });

          S.actor('s2-x-res', 0, 2.4,
            '$x = 300$（男生组去年 $300$ 棵）',
            { color: BLUE, size: 19, bold: true });

          S.addSegment('s2-div-line', [-9, 1.8], [9, 1.8], {
            color: GRAY, width: 1, dash: 1,
          });

          S.actor('s2-step5-label', -7.5, 1.2, '代回①：', { color: INK, size: 14 });
          S.actor('s2-step5-eq', 1.5, 1.2,
            '$300 + y = 500$', { color: INK, size: 16 });

          S.actor('s2-y-res', 0, 0.2,
            '$y = 200$（女生组去年 $200$ 棵）',
            { color: GREEN, size: 19, bold: true });

          P.renderCard(
            '由①得 $y=500-x$，代入②<br>' +
            '$11x+6000-12x=5700$<br>' +
            '$\\Rightarrow x=300,\\; y=200$<br>' +
            '男生组 300 棵，女生组 200 棵'
          );
        },
      },
      {
        narration: '解出来了，还要检验！把 x=300、y=200 代回两个方程：验关系①：300 加 200 等于 500，满足✓；验关系②：1.1乘以300 加 1.2乘以200 等于 330 加 240 等于 570，满足✓。检验通过！写答句：去年男生组植树300棵，女生组植树200棵。同学们注意，检验要代回最原始的方程，这里用 1.1x+1.2y=570 检验，不要用整理后的版本来检验原题。',
        enter: function (anim) {
          S.actor('s2-check-title', 0, 7.2, '检验与作答', {
            color: GREEN, size: 21, bold: true,
          });

          S.addPolygon('s2-ck1-bg', [
            [-9.5, 6.3], [9.5, 6.3], [9.5, 5.0], [-9.5, 5.0],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-ck1-label', -6, 5.7, '验关系①：', { color: INK, size: 15 });
          S.actor('s2-ck1-calc', 3, 5.7,
            '$300 + 200 = 500$ ✓', { color: GREEN, size: 16, bold: true });

          S.addPolygon('s2-ck2-bg', [
            [-9.5, 4.4], [9.5, 4.4], [9.5, 3.1], [-9.5, 3.1],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-ck2-label', -6, 3.8, '验关系②：', { color: INK, size: 15 });
          S.actor('s2-ck2-calc', 2, 3.8,
            '$1.1\\times300 + 1.2\\times200 = 330+240 = 570$ ✓',
            { color: GREEN, size: 14, bold: true });

          // 答句
          S.addPolygon('s2-ans-bg', [
            [-8, 2.3], [8, 2.3], [8, 0.8], [-8, 0.8],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-ans', 0, 1.6,
            '答：去年男生组植树 $300$ 棵，女生组植树 $200$ 棵。',
            { color: BLUE, size: 16, bold: true });

          // 思维小结
          S.actor('s2-insight-label', 0, -0.2,
            '百分比题的核心思路：', { color: ORANGE, size: 14, bold: true });
          S.actor('s2-insight-1', -3, -1.0,
            '多 $p\\%$ → 今年 $= $ 去年 $\\times(1+p\\%)$', { color: ORANGE, size: 14 });
          S.actor('s2-insight-2',  4, -1.0,
            '小数方程 → 整体 $\\times 10$（或100）', { color: ORANGE, size: 14 });

          P.renderCard(
            '检验：$300+200=500$ ✓<br>' +
            '$1.1\\times300+1.2\\times200=570$ ✓<br>' +
            '<b>答：男生组 300 棵，女生组 200 棵。</b>',
            'cool',
            'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
