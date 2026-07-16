(function (CW) {
  'use strict';
  // s5 小结：变形优先级 + 整体代入思想 + 作业卡
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';
  var TEAL   = '#00695c';
  var PURPLE = '#6a1b9a';

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
        narration: '今天我们学习了代入法的综合应用，核心是两个突破：一是"变形优先级"——选最方便的未知数变形，避免分数；二是"整体代入"——当某表达式整体出现时，直接把已知值代入，省去多步计算。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '代入法综合应用  课堂小结', {
            color: BLUE, size: 21, bold: true,
          });

          // 核心一：变形优先级
          S.addPolygon('s5-box1', [
            [-9.5, 6.2], [9.5, 6.2], [9.5, 2.2], [-9.5, 2.2],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 2.5, strokeColor: ORANGE });
          S.actor('s5-k1-title', 0, 5.9, '核心一：变形优先级', { color: ORANGE, size: 17, bold: true });

          // 三级优先
          S.addPolygon('s5-p1-bg', [
            [-9, 5.4], [-0.3, 5.4], [-0.3, 4.8], [-9, 4.8],
          ], { color: GREEN, opacity: 0.15, borderWidth: 1, strokeColor: GREEN });
          S.actor('s5-p1', -4.6, 5.1, '第一优先：系数为 1 或 -1（无分数，最简）', {
            color: GREEN, size: 13, bold: true,
          });

          S.addPolygon('s5-p2-bg', [
            [-9, 4.4], [-0.3, 4.4], [-0.3, 3.8], [-9, 3.8],
          ], { color: BLUE, opacity: 0.10, borderWidth: 1, strokeColor: BLUE });
          S.actor('s5-p2', -4.6, 4.1, '第二优先：系数绝对值较小（分母小）', {
            color: BLUE, size: 13,
          });

          S.addPolygon('s5-p3-bg', [
            [-9, 3.4], [-0.3, 3.4], [-0.3, 2.8], [-9, 2.8],
          ], { color: INK, opacity: 0.08, borderWidth: 1, strokeColor: GRAY });
          S.actor('s5-p3', -4.6, 3.1, '第三优先：代入后运算较简便', {
            color: INK, size: 13,
          });

          // 小数处理
          S.addPolygon('s5-dec-bg', [
            [0, 5.4], [9.5, 5.4], [9.5, 2.6], [0, 2.6],
          ], { color: PURPLE, opacity: 0.07, borderWidth: 1.5, strokeColor: PURPLE });
          S.actor('s5-dec-title', 4.75, 5.1, '含小数：先化整再消元', { color: PURPLE, size: 14, bold: true });
          S.actor('s5-dec1', 4.75, 4.4, '小数系数 × 10 / ×100', { color: PURPLE, size: 13 });
          S.actor('s5-dec2', 4.75, 3.8, '→ 化为整系数方程', { color: INK, size: 13 });
          S.actor('s5-dec3', 4.75, 3.1, '检验须代入原方程！', { color: RED, size: 13, bold: true });

          // 核心二：整体代入
          S.addPolygon('s5-box2', [
            [-9.5, 1.8], [9.5, 1.8], [9.5, -1.2], [-9.5, -1.2],
          ], { color: TEAL, opacity: 0.07, borderWidth: 2.5, strokeColor: TEAL });
          S.actor('s5-k2-title', 0, 1.5, '核心二：整体代入思想', { color: TEAL, size: 17, bold: true });
          S.actor('s5-k2-1', 0, 0.8, '若已知 $a+b=k$，另一方程含 $(a+b)$', { color: INK, size: 14 });
          S.actor('s5-k2-2', 0, 0.1, '→ 直接以 $k$ 替换 $(a+b)$，省去逐个求解', { color: TEAL, size: 14, bold: true });
          S.actor('s5-k2-eg', 0, -0.7,
            '例：$a+b=3$，$2(a+b)+c=10$ $\\Rightarrow$ $c=4$',
            { color: GREEN, size: 14 });

          // 易错提示
          S.addPolygon('s5-warn-bg', [
            [-9.5, -1.6], [9.5, -1.6], [9.5, -3.8], [-9.5, -3.8],
          ], { color: RED, opacity: 0.06, borderWidth: 2, strokeColor: RED });
          S.actor('s5-warn-title', 0, -1.9, '易错警示：代入时括号问题', { color: RED, size: 15, bold: true });
          S.actor('s5-warn1', 0, -2.7,
            '正确：$3x - 2(7 - 2x) = 3x - 14 + 4x$',
            { color: GREEN, size: 14 });
          S.actor('s5-warn2', 0, -3.5,
            '错误：$3x - 2 \\times 7 - 2x$（漏乘 $-2x$）',
            { color: RED, size: 14 });

          P.renderCard(
            '<b>今日两个核心</b>：<br>' +
            '① <b>变形优先级</b>：系数1/-1 &gt; 系数小 &gt; 含小数先化整<br>' +
            '② <b>整体代入</b>：$(a+b)$ 整体已知值直接替换<br>' +
            '易错点：代入时括号前的系数要乘到括号内每一项！'
          );
        },
      },
      {
        narration: '最后布置今天的作业。请同学们课后完成这三道练习，注意检验步骤不能省略！第一道：2x+y=7，3x-2y=4（参考教材易错辨析）；第二道：含小数的方程组；第三道：整体代入综合。希望同学们认真完成，下节课我们检查。',
        enter: function (anim) {
          S.actor('s5-hw-title', 0, 7.2, '课后作业', { color: BLUE, size: 22, bold: true });

          // 第一题
          S.addPolygon('s5-hw1-bg', [
            [-9.5, 6.4], [9.5, 6.4], [9.5, 4.0], [-9.5, 4.0],
          ], { color: BLUE, opacity: 0.07, borderWidth: 1.5, strokeColor: BLUE });
          S.actor('s5-hw1-n', -8.5, 5.5, '①', { color: BLUE, size: 18, bold: true });
          S.actor('s5-hw1-brace', -6.5, 5.5, '{', { color: INK, size: 36 });
          S.actor('s5-hw1-e1', 0, 6.0, '$2x + y = 7$', { color: BLUE, size: 17 });
          S.actor('s5-hw1-e2', 0, 5.0, '$3x - 2y = 4$', { color: BLUE, size: 17 });
          S.actor('s5-hw1-hint', 0, 4.3, '（提示：由①变形，$y = 7 - 2x$，代入②）', { color: GRAY, size: 12 });

          // 第二题
          S.addPolygon('s5-hw2-bg', [
            [-9.5, 3.5], [9.5, 3.5], [9.5, 1.1], [-9.5, 1.1],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 1.5, strokeColor: ORANGE });
          S.actor('s5-hw2-n', -8.5, 2.5, '②', { color: ORANGE, size: 18, bold: true });
          S.actor('s5-hw2-brace', -6.5, 2.5, '{', { color: INK, size: 36 });
          S.actor('s5-hw2-e1', 0, 3.0, '$x + 2y = 10$', { color: ORANGE, size: 17 });
          S.actor('s5-hw2-e2', 0, 2.0, '$0.3x + 0.1y = 1.5$', { color: ORANGE, size: 17 });
          S.actor('s5-hw2-hint', 0, 1.4, '（提示：②×10 化整，再由①变形代入）', { color: GRAY, size: 12 });

          // 第三题
          S.addPolygon('s5-hw3-bg', [
            [-9.5, 0.6], [9.5, 0.6], [9.5, -2.0], [-9.5, -2.0],
          ], { color: TEAL, opacity: 0.07, borderWidth: 1.5, strokeColor: TEAL });
          S.actor('s5-hw3-n', -8.5, -0.5, '③', { color: TEAL, size: 18, bold: true });
          S.actor('s5-hw3-q', 0, 0.3,
            '已知 $x + y = 6$，且 $5(x+y) - 3k = 12$，求 $k$。',
            { color: TEAL, size: 16 });
          S.actor('s5-hw3-hint', 0, -1.6, '（提示：整体代入，$x+y=6$ 直接替换）', { color: GRAY, size: 12 });

          // 加油语
          S.addPolygon('s5-cheer-bg', [
            [-9.5, -2.5], [9.5, -2.5], [9.5, -4.2], [-9.5, -4.2],
          ], { color: GREEN, opacity: 0.10, borderWidth: 2, strokeColor: GREEN });
          S.actor('s5-cheer', 0, -3.3,
            '每道题都要写检验步骤，熟能生巧！',
            { color: GREEN, size: 17, bold: true });

          P.renderCard(
            '<b>课后三道练习</b>：<br>' +
            '① 需先变形：$\\begin{cases}2x+y=7\\\\3x-2y=4\\end{cases}$<br>' +
            '② 先化整再代入（含小数）<br>' +
            '③ 整体代入：$x+y=6$，$5(x+y)-3k=12$，求 $k$',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
