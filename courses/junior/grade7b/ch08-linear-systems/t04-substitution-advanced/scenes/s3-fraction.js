(function (CW) {
  'use strict';
  // s3 含小数系数的方程组：x+y=8, 0.5x+0.2y=2.5
  // 先化整：②×10 → 5x+2y=25
  // 由①y=8-x代入化整后②：5x+2(8-x)=25 → 5x+16-2x=25 → 3x=9 → x=3
  // 回代：y=8-3=5
  // 检验①：3+5=8 ✓  检验②：0.5×3+0.2×5=1.5+1=2.5 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';

  var scene = {
    id: 's3',
    title: '三、含小数系数的方程组',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '遇到含小数系数的方程组，如果直接代入，计算会很麻烦。今天的例题：方程组由 x+y=8 和 0.5x+0.2y=2.5 组成。方程②含有小数，怎么办？策略是：先把含小数的方程两边同乘以10，化成整系数再处理！',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.2, '例题：含小数系数的方程组', {
            color: PURPLE, size: 21, bold: true,
          });

          // 原方程组
          S.addPolygon('s3-sys-bg', [
            [-9.5, 6.2], [9.5, 6.2], [9.5, 3.5], [-9.5, 3.5],
          ], { color: PURPLE, opacity: 0.07, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s3-sys-label', 0, 6.0, '原方程组', { color: PURPLE, size: 15, bold: true });
          S.actor('s3-brace', -7, 4.9, '{', { color: INK, size: 40 });
          S.actor('s3-eq1', 0, 5.3, '$x + y = 8$ ···①', { color: BLUE, size: 19, bold: true });
          S.actor('s3-eq2', 0, 4.2, '$0.5x + 0.2y = 2.5$ ···②', { color: ORANGE, size: 19, bold: true });

          // 策略分析
          S.addPolygon('s3-strategy-bg', [
            [-9.5, 3.1], [9.5, 3.1], [9.5, 0.8], [-9.5, 0.8],
          ], { color: PURPLE, opacity: 0.07, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s3-str-title', 0, 2.8, '策略：先化整，再消元', { color: PURPLE, size: 17, bold: true });
          S.actor('s3-str1', 0, 2.1, '方程②含小数 → 两边 × 10 → 化为整系数', { color: INK, size: 15 });
          S.actor('s3-str2', 0, 1.3, '方程①中 $x$ 系数为 1 → 直接变形消元', { color: INK, size: 15 });

          // 化整演示
          S.addPolygon('s3-int-bg', [
            [-9.5, 0.4], [9.5, 0.4], [9.5, -1.4], [-9.5, -1.4],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s3-int-label', 0, 0.1, '②×10 化整：', { color: ORANGE, size: 16, bold: true });
          S.actor('s3-int-process', 0, -0.7, '$0.5x \\times 10 + 0.2y \\times 10 = 2.5 \\times 10$', { color: INK, size: 15 });
          S.actor('s3-int-result', 0, -1.1, '$5x + 2y = 25$ ···②\'', { color: RED, size: 19, bold: true });

          P.renderCard(
            '解 $\\begin{cases}x+y=8\\\\ 0.5x+0.2y=2.5\\end{cases}$<br>' +
            '策略：<b>先化整再消元</b><br>' +
            '② $\\times 10$：$5x+2y=25$ ···②\''
          );
        },
      },
      {
        narration: '方程①中 x 的系数是1，变形最方便。由①得 y=8-x，记为③。然后把③代入化整后的②\'：5x+2(8-x)=25。去括号：5x+16-2x=25，合并：3x+16=25，解得 3x=9，x=3。',
        enter: function (anim) {
          // 化整后方程组
          S.addPolygon('s3-sys2-bg', [
            [-9.5, 7.2], [9.5, 7.2], [9.5, 5.8], [-9.5, 5.8],
          ], { color: INK, opacity: 0.05, borderWidth: 1.5, strokeColor: '#90a4ae' });
          S.actor('s3-brace2', -7, 6.5, '{', { color: INK, size: 32 });
          S.actor('s3-ceq1', 0, 6.8, '$x + y = 8$ ···①', { color: BLUE, size: 16, bold: true });
          S.actor('s3-ceq2', 0, 6.1, '$5x + 2y = 25$ ···②\'', { color: ORANGE, size: 16, bold: true });

          // 变形步骤
          S.addPolygon('s3-vf-bg', [
            [-9.5, 5.4], [9.5, 5.4], [9.5, 3.6], [-9.5, 3.6],
          ], { color: BLUE, opacity: 0.07, borderWidth: 1.5, strokeColor: BLUE });
          S.actor('s3-vf-title', 0, 5.1, '由①变形：$y = 8 - x$ ···③', { color: BLUE, size: 16, bold: true });

          // 代入过程
          S.addPolygon('s3-sub-bg', [
            [-9.5, 3.2], [9.5, 3.2], [9.5, -3.0], [-9.5, -3.0],
          ], { color: GREEN, opacity: 0.06, borderWidth: 2, strokeColor: GREEN });
          S.actor('s3-sub-title', 0, 2.9, '③ 代入②\'（消去 $y$）', { color: GREEN, size: 16, bold: true });
          S.actor('s3-sub1', 0, 2.1, '将 $y = 8 - x$ 代入 $5x + 2y = 25$：', { color: INK, size: 15 });
          S.actor('s3-sub2', 0, 1.3,
            '$5x + 2(8 - x) = 25$',
            { color: BLUE, size: 18, bold: true });
          S.actor('s3-sub3', 0, 0.4, '去括号：$5x + 16 - 2x = 25$', { color: INK, size: 16 });
          S.actor('s3-sub4', 0, -0.5, '合并同类项：$3x + 16 = 25$', { color: INK, size: 16 });
          S.actor('s3-sub5', 0, -1.4, '$3x = 25 - 16 = 9$', { color: BLUE, size: 17 });
          S.actor('s3-sub6', 0, -2.3, '$x = 3$', { color: GREEN, size: 22, bold: true });

          P.renderCard(
            '由 ①：$y = 8 - x$ ···③<br>' +
            '代入 ②\'：$5x + 2(8-x) = 25$<br>' +
            '去括号：$5x + 16 - 2x = 25$<br>' +
            '$3x = 9 \\Rightarrow x = 3$'
          );
        },
      },
      {
        narration: '把 x=3 代回③：y=8-3=5。方程组的解是 x=3，y=5。检验：代入原方程①：3+5=8，正确！代入原方程②（原来含小数的那个）：0.5×3+0.2×5=1.5+1=2.5，也正确！记住：检验要代回原方程，不是化整后的方程！',
        enter: function (anim) {
          S.actor('s3-title2', 0, 7.2, '回代 + 检验', { color: GREEN, size: 21, bold: true });

          // 已知 x=3
          S.addPolygon('s3-x3-bg', [
            [-9.5, 6.4], [9.5, 6.4], [9.5, 5.4], [-9.5, 5.4],
          ], { color: GREEN, opacity: 0.10, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s3-x3', 0, 5.9, '已解出 $x = 3$', { color: GREEN, size: 17, bold: true });

          // 回代③
          S.addPolygon('s3-back-bg', [
            [-9.5, 5.0], [9.5, 5.0], [9.5, 3.4], [-9.5, 3.4],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 1.5, strokeColor: ORANGE });
          S.actor('s3-back-title', 0, 4.7, '回代③：$y = 8 - x$', { color: ORANGE, size: 16, bold: true });
          S.actor('s3-back1', 0, 4.0, '$y = 8 - 3 = 5$', { color: ORANGE, size: 18 });

          // 解
          S.addPolygon('s3-sol-bg', [
            [-9.5, 3.0], [9.5, 3.0], [9.5, 1.4], [-9.5, 1.4],
          ], { color: GREEN, opacity: 0.12, borderWidth: 2.5, strokeColor: GREEN });
          S.actor('s3-brace3', -7.5, 2.2, '{', { color: GREEN, size: 32 });
          S.actor('s3-sol-x', 0, 2.6, '$x = 3$', { color: GREEN, size: 20, bold: true });
          S.actor('s3-sol-y', 0, 1.8, '$y = 5$', { color: GREEN, size: 20, bold: true });

          // 检验（代回原方程！）
          S.addPolygon('s3-check-bg', [
            [-9.5, 1.0], [9.5, 1.0], [9.5, -4.2], [-9.5, -4.2],
          ], { color: INK, opacity: 0.04, borderWidth: 1.5, strokeColor: '#90a4ae' });
          S.actor('s3-check-title', 0, 0.7, '检验（代入原方程组）', { color: INK, size: 15, bold: true });
          S.actor('s3-check1', 0, -0.1,
            '代入原①：$3 + 5 = 8$ ✓',
            { color: BLUE, size: 15 });
          S.actor('s3-check2', 0, -1.1,
            '代入原②：$0.5 \\times 3 + 0.2 \\times 5 = 1.5 + 1 = 2.5$ ✓',
            { color: ORANGE, size: 15 });
          S.actor('s3-warn', 0, -2.2, '注意：检验要代入原方程（含小数的），不是化整后的！', {
            color: RED, size: 13, bold: true,
          });
          S.actor('s3-final', 0, -3.4,
            '方程组的解：$\\begin{cases}x=3\\\\y=5\\end{cases}$',
            { color: GREEN, size: 18, bold: true });

          P.renderCard(
            '回代 ③：$y = 8 - 3 = 5$<br>' +
            '解：$\\begin{cases}x=3\\\\y=5\\end{cases}$<br>' +
            '检验原①：$3+5=8$ ✓ &nbsp; 原②：$1.5+1=2.5$ ✓<br>' +
            '<b>检验须代入原方程！</b>',
            'cool', 'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
