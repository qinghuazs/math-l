(function (CW) {
  'use strict';
  // s4 整体代入技巧
  // 例1：a+b=3, 2(a+b)+c=10 → 把a+b整体视为3代入：2×3+c=10 → 6+c=10 → c=4
  // 验算：a+b=3, 2×3+4=6+4=10 ✓
  // 例2：x+y=5, 3(x+y)-2m=7 → 3×5-2m=7 → 15-2m=7 → 2m=8 → m=4
  // 验算：x+y=5, 3×5-2×4=15-8=7 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var TEAL   = '#00695c';

  var scene = {
    id: 's4',
    title: '四、整体代入技巧',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '代入法还有一个高级技巧——整体代入！当某个方程组中出现了 x+y 这样的"整体"作为一个单元出现在另一个方程里时，我们不必把 x、y 分别求出来，直接把整体的值代进去，一步就能求出另一个未知数！来看第一个例子。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '进阶技巧：整体代入思想', {
            color: TEAL, size: 21, bold: true,
          });

          // 标题说明
          S.addPolygon('s4-intro-bg', [
            [-9.5, 6.4], [9.5, 6.4], [9.5, 4.8], [-9.5, 4.8],
          ], { color: TEAL, opacity: 0.07, borderWidth: 2, strokeColor: TEAL });
          S.actor('s4-intro', 0, 5.8,
            '当"整体" $(a+b)$ 或 $(x+y)$ 出现在另一个方程中',
            { color: INK, size: 15 });
          S.actor('s4-intro2', 0, 5.1,
            '→ 直接把整体的已知值代入，无需逐个求 $x$、$y$',
            { color: TEAL, size: 15, bold: true });

          // 例1原题
          S.addPolygon('s4-ex1-bg', [
            [-9.5, 4.2], [9.5, 4.2], [9.5, 2.0], [-9.5, 2.0],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });
          S.actor('s4-ex1-title', 0, 4.0, '例1', { color: BLUE, size: 16, bold: true });
          S.actor('s4-brace1', -7, 3.1, '{', { color: INK, size: 40 });
          S.actor('s4-ex1-eq1', 0, 3.5, '$a + b = 3$ ···①', { color: BLUE, size: 18, bold: true });
          S.actor('s4-ex1-eq2', 0, 2.5, '$2(a + b) + c = 10$ ···②', { color: ORANGE, size: 18, bold: true });

          // 观察：整体在哪
          S.addPolygon('s4-obs-bg', [
            [-9.5, 1.6], [9.5, 1.6], [9.5, -0.4], [-9.5, -0.4],
          ], { color: GREEN, opacity: 0.07, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s4-obs', 0, 1.3, '观察方程②：含有 $(a + b)$ 作为整体！', {
            color: GREEN, size: 16, bold: true,
          });
          S.actor('s4-obs2', 0, 0.5, '方程①告诉我们：$a + b = 3$', { color: INK, size: 15 });
          S.actor('s4-obs3', 0, -0.1, '→ 直接把 3 代入②中的 $(a+b)$！', { color: TEAL, size: 15, bold: true });

          P.renderCard(
            '整体代入思想：<br>' +
            '若 $a+b=3$，且另一方程含 $(a+b)$，<br>' +
            '直接把 $a+b$ 的值 <b>3</b> 代入——一步求解！'
          );
        },
      },
      {
        narration: '整体代入：把方程①的"a+b=3"整体代入方程②。方程②是 2(a+b)+c=10，把 a+b 换成 3：2×3+c=10，得 6+c=10，解得 c=4。整个过程不需要分别求 a 和 b！检验：a+b=3（条件①成立），2×3+4=6+4=10（条件②成立）✓',
        enter: function (anim) {
          // 保留原题
          S.actor('s4-brace1', -7, 6.5, '{', { color: INK, size: 32 });
          S.actor('s4-ex1-eq1', 0, 6.9, '$a + b = 3$ ···①', { color: BLUE, size: 16, bold: true });
          S.actor('s4-ex1-eq2', 0, 6.2, '$2(a + b) + c = 10$ ···②', { color: ORANGE, size: 16, bold: true });

          // 整体代入过程
          S.addPolygon('s4-proc-bg', [
            [-9.5, 5.6], [9.5, 5.6], [9.5, 1.0], [-9.5, 1.0],
          ], { color: TEAL, opacity: 0.06, borderWidth: 2, strokeColor: TEAL });
          S.actor('s4-proc-title', 0, 5.3, '整体代入：将 $a+b=3$ 代入②', { color: TEAL, size: 16, bold: true });
          S.actor('s4-proc1', 0, 4.5, '$2(a + b) + c = 10$', { color: ORANGE, size: 17 });
          S.actor('s4-proc2', 0, 3.7,
            '把 $(a+b)$ 换成 $3$：',
            { color: INK, size: 15 });
          S.actor('s4-proc3', 0, 2.9,
            '$2 \\times 3 + c = 10$',
            { color: TEAL, size: 20, bold: true });
          S.actor('s4-proc4', 0, 2.1, '$6 + c = 10$', { color: INK, size: 17 });
          S.actor('s4-proc5', 0, 1.3, '$c = 4$', { color: GREEN, size: 22, bold: true });

          // 检验
          S.addPolygon('s4-chk-bg', [
            [-9.5, 0.6], [9.5, 0.6], [9.5, -2.0], [-9.5, -2.0],
          ], { color: INK, opacity: 0.04, borderWidth: 1.5, strokeColor: '#90a4ae' });
          S.actor('s4-chk-title', 0, 0.3, '检验', { color: INK, size: 15, bold: true });
          S.actor('s4-chk1', 0, -0.5, '①：$a + b = 3$ ✓（条件已知）', { color: BLUE, size: 14 });
          S.actor('s4-chk2', 0, -1.4, '②：$2 \\times 3 + 4 = 6 + 4 = 10$ ✓', { color: ORANGE, size: 14 });

          P.renderCard(
            '整体代入 ②：$2 \\times 3 + c = 10$<br>' +
            '$6 + c = 10$<br>' +
            '$\\Rightarrow c = 4$<br>' +
            '无需单独求 $a$、$b$，整体思想省步骤！',
            'cool'
          );
        },
      },
      {
        narration: '再来一道练习整体代入的题目：已知 x+y=5，且 3(x+y)-2m=7，求 m 的值。同样，方程中有"x+y"这个整体，而我们已经知道 x+y=5，直接代入：3×5-2m=7，得 15-2m=7，解得 2m=8，m=4。',
        enter: function (anim) {
          S.actor('s4-title2', 0, 7.2, '例2：整体代入求参数', { color: PURPLE, size: 21, bold: true });

          // 原题
          S.addPolygon('s4-ex2-bg', [
            [-9.5, 6.4], [9.5, 6.4], [9.5, 4.8], [-9.5, 4.8],
          ], { color: PURPLE, opacity: 0.07, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s4-ex2-given', 0, 6.1, '已知 $x + y = 5$，且 $3(x + y) - 2m = 7$，求 $m$。', {
            color: INK, size: 16,
          });

          // 分析
          S.actor('s4-ex2-obs', 0, 4.3, '方程含 $(x+y)$ 整体，已知 $x+y=5$，直接代入！', {
            color: TEAL, size: 15, bold: true,
          });

          // 求解过程
          S.addPolygon('s4-ex2-proc-bg', [
            [-9.5, 3.6], [9.5, 3.6], [9.5, -1.5], [-9.5, -1.5],
          ], { color: PURPLE, opacity: 0.06, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s4-ex2-proc1', 0, 3.3, '把 $(x+y)$ 换成 $5$：', { color: INK, size: 15, bold: true });
          S.actor('s4-ex2-proc2', 0, 2.5,
            '$3(x + y) - 2m = 7$',
            { color: ORANGE, size: 18 });
          S.actor('s4-ex2-proc3', 0, 1.7,
            '$3 \\times 5 - 2m = 7$',
            { color: PURPLE, size: 20, bold: true });
          S.actor('s4-ex2-proc4', 0, 0.9, '$15 - 2m = 7$', { color: INK, size: 17 });
          S.actor('s4-ex2-proc5', 0, 0.1, '$-2m = 7 - 15 = -8$', { color: INK, size: 17 });
          S.actor('s4-ex2-proc6', 0, -0.8, '$m = 4$', { color: GREEN, size: 22, bold: true });

          // 对比
          S.addPolygon('s4-contrast-bg', [
            [-9.5, -2.0], [9.5, -2.0], [9.5, -5.0], [-9.5, -5.0],
          ], { color: ORANGE, opacity: 0.06, borderWidth: 1.5, strokeColor: ORANGE });
          S.actor('s4-contrast-title', 0, -2.3, '整体代入 vs 逐个求解', { color: ORANGE, size: 15, bold: true });
          S.actor('s4-contrast1', 0, -3.1,
            '整体代入：$x+y=5 \\Rightarrow 3\\times5-2m=7 \\Rightarrow m=4$（3步）',
            { color: TEAL, size: 14, bold: true });
          S.actor('s4-contrast2', 0, -4.0,
            '逐个求：需先知 $x$、$y$ 各自的值，再代入（步骤更多）',
            { color: INK, size: 13 });

          P.renderCard(
            '整体代入：$(x+y)=5$ 代入 $3(x+y)-2m=7$<br>' +
            '$3 \\times 5 - 2m = 7$<br>' +
            '$15 - 2m = 7$<br>' +
            '$\\Rightarrow m = 4$',
            'cool', 'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
