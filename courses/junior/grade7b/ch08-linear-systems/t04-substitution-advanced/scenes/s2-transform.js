(function (CW) {
  'use strict';
  // s2 需要先变形的方程组：2x+3y=16，x+4y=13
  // 验算：由②x=13-4y代入①：2(13-4y)+3y=16 → 26-8y+3y=16 → -5y=-10 → y=2
  // 回代：x=13-4×2=13-8=5
  // 检验①：2×5+3×2=10+6=16 ✓  检验②：5+4×2=5+8=13 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var RED    = '#c62828';

  var scene = {
    id: 's2',
    title: '二、需要先变形的方程组',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在来解一个两个方程都没有"现成"系数为1的未知数的方程组：左边系数2x+3y=16，右边x+4y=13。仔细观察——虽然两个方程都没有"y="或"x="形式，但方程②中 x 的系数是1，这就是最佳切入口！',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '例题：需要先变形再代入', {
            color: BLUE, size: 21, bold: true,
          });

          // 原方程组展示
          S.addPolygon('s2-sys-bg', [
            [-9.5, 6.2], [9.5, 6.2], [9.5, 3.5], [-9.5, 3.5],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-sys-label', 0, 6.0, '原方程组', { color: BLUE, size: 15, bold: true });
          S.actor('s2-brace', -7, 4.9, '{', { color: INK, size: 40 });
          S.actor('s2-eq1', 0, 5.3, '$2x + 3y = 16$ ···①', { color: BLUE, size: 19, bold: true });
          S.actor('s2-eq2', 0, 4.2, '$x + 4y = 13$ ···②', { color: ORANGE, size: 19, bold: true });

          // 观察分析
          S.addPolygon('s2-obs-bg', [
            [-9.5, 3.0], [9.5, 3.0], [9.5, 1.0], [-9.5, 1.0],
          ], { color: GREEN, opacity: 0.07, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s2-obs', 0, 2.3, '观察：方程②中 $x$ 的系数为 1 ← 变形最方便！', {
            color: GREEN, size: 16, bold: true,
          });
          S.actor('s2-obs2', 0, 1.5, '策略：由②变形，得 $x$ 关于 $y$ 的表达式，再代入①', {
            color: INK, size: 15,
          });

          // 决策箭头
          S.addSegment('s2-arrow-line', [0.8, 4.2], [0.8, 2.8], { color: ORANGE, width: 2, dash: 0 });

          P.renderCard(
            '解 $\\begin{cases}2x+3y=16\\\\x+4y=13\\end{cases}$<br>' +
            '两个方程都没有 <b>y=…</b> 或 <b>x=…</b> 的现成形式，<br>' +
            '但 ② 中 $x$ 系数为 <b>1</b>，选它变形！'
          );
        },
      },
      {
        narration: '第一步：由方程②变形，把 x 用 y 表示。方程②是 x+4y=13，两边减去4y，得 x=13-4y，记为③。注意：这就是我们的"跳板"方程。',
        enter: function (anim) {
          // 保留原方程组
          S.actor('s2-eq1', 0, 5.3, '$2x + 3y = 16$ ···①', { color: BLUE, size: 19, bold: true });
          S.actor('s2-eq2', 0, 4.2, '$x + 4y = 13$ ···②', { color: ORANGE, size: 19, bold: true });
          S.actor('s2-brace', -7, 4.9, '{', { color: '#455a64', size: 40 });

          // 变形步骤
          S.addPolygon('s2-step1-bg', [
            [-9.5, 3.2], [9.5, 3.2], [9.5, 0.4], [-9.5, 0.4],
          ], { color: '#e65100', opacity: 0.07, borderWidth: 2, strokeColor: '#e65100' });
          S.actor('s2-step1-title', 0, 2.9, '第一步：由②变形', { color: ORANGE, size: 16, bold: true });
          S.actor('s2-step1-process', 0, 2.1,
            '由 $x + 4y = 13$',
            { color: INK, size: 16 });
          S.actor('s2-step1-arrow', 0, 1.4, '两边减去 $4y$ ↓', { color: ORANGE, size: 15 });
          S.actor('s2-step1-result', 0, 0.7,
            '$x = 13 - 4y$ ···③',
            { color: RED, size: 20, bold: true });

          P.renderCard(
            '由 ② 变形：<br>' +
            '$x + 4y = 13$<br>' +
            '$\\Rightarrow x = 13 - 4y$ ···③<br>' +
            '③ 是"跳板"——下一步代入 ① 消去 $x$。'
          );
        },
      },
      {
        narration: '第二步：把③代入方程①。用"13-4y"替换①中的x，得到 2(13-4y)+3y=16。注意括号！2乘以整个括号内的每一项：2×13=26，2×(-4y)=-8y，所以展开得 26-8y+3y=16，合并同类项得 -5y=-10，解得 y=2。',
        enter: function (anim) {
          // 保留原题
          S.actor('s2-eq1', 0, 5.3, '$2x + 3y = 16$ ···①', { color: BLUE, size: 19, bold: true });
          S.actor('s2-eq2', 0, 4.2, '$x + 4y = 13$ ···②', { color: ORANGE, size: 19, bold: true });
          S.actor('s2-brace', -7, 4.9, '{', { color: '#455a64', size: 40 });
          S.actor('s2-step1-result', 0, 3.4, '$x = 13 - 4y$ ···③', { color: RED, size: 18, bold: true });

          // 代入展开过程
          S.addPolygon('s2-step2-bg', [
            [-9.5, 2.8], [9.5, 2.8], [9.5, -5.5], [-9.5, -5.5],
          ], { color: GREEN, opacity: 0.06, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-step2-title', 0, 2.5, '第二步：③代入①（消去 $x$）', { color: GREEN, size: 16, bold: true });

          S.actor('s2-sub1', 0, 1.7,
            '将 $x = 13 - 4y$ 代入 $2x + 3y = 16$：',
            { color: INK, size: 15 });
          S.actor('s2-sub2', 0, 0.9,
            '$2(13 - 4y) + 3y = 16$',
            { color: BLUE, size: 18, bold: true });

          // 标注去括号
          S.actor('s2-note-bracket', 7, 0.3, '← 注意括号！', { color: RED, size: 13 });

          S.actor('s2-sub3', 0, 0.0,
            '去括号：$26 - 8y + 3y = 16$',
            { color: INK, size: 16 });
          S.actor('s2-sub4', 0, -0.9,
            '合并同类项：$26 + (-8y + 3y) = 16$',
            { color: INK, size: 16 });
          S.actor('s2-sub5', 0, -1.8,
            '$26 - 5y = 16$',
            { color: BLUE, size: 17 });
          S.actor('s2-sub6', 0, -2.7,
            '$-5y = 16 - 26$',
            { color: INK, size: 16 });
          S.actor('s2-sub7', 0, -3.6,
            '$-5y = -10$',
            { color: BLUE, size: 17 });
          S.actor('s2-sub8', 0, -4.6,
            '$y = 2$',
            { color: GREEN, size: 22, bold: true });

          P.renderCard(
            '代入 ①：$2(13-4y)+3y=16$<br>' +
            '去括号：$26-8y+3y=16$<br>' +
            '合并：$26-5y=16$<br>' +
            '$-5y=-10$<br>' +
            '$\\Rightarrow y=2$'
          );
        },
      },
      {
        narration: '第三步：把 y=2 代回③式，得 x=13-4×2=13-8=5。所以方程组的解是 x=5，y=2。最后别忘记检验：代入方程①：2×5+3×2=10+6=16，等于16，正确！代入方程②：5+4×2=5+8=13，等于13，正确！方程组的解是 x=5，y=2。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '回代 + 检验', { color: GREEN, size: 21, bold: true });

          // 已知 y=2
          S.addPolygon('s2-y2-bg', [
            [-9.5, 6.4], [9.5, 6.4], [9.5, 5.4], [-9.5, 5.4],
          ], { color: GREEN, opacity: 0.10, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s2-y2', 0, 5.9, '已解出 $y = 2$', { color: GREEN, size: 17, bold: true });

          // 回代③
          S.addPolygon('s2-back-bg', [
            [-9.5, 5.0], [9.5, 5.0], [9.5, 3.0], [-9.5, 3.0],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 1.5, strokeColor: ORANGE });
          S.actor('s2-back-title', 0, 4.7, '回代③：$x = 13 - 4y$', { color: ORANGE, size: 16, bold: true });
          S.actor('s2-back1', 0, 4.0, '$x = 13 - 4 \\times 2 = 13 - 8 = 5$', { color: ORANGE, size: 17 });

          // 解
          S.addPolygon('s2-sol-bg', [
            [-9.5, 2.6], [9.5, 2.6], [9.5, 1.0], [-9.5, 1.0],
          ], { color: GREEN, opacity: 0.12, borderWidth: 2.5, strokeColor: GREEN });
          S.actor('s2-brace2', -7.5, 1.8, '{', { color: GREEN, size: 32 });
          S.actor('s2-sol-x', 0, 2.2, '$x = 5$', { color: GREEN, size: 20, bold: true });
          S.actor('s2-sol-y', 0, 1.4, '$y = 2$', { color: GREEN, size: 20, bold: true });

          // 检验
          S.addPolygon('s2-check-bg', [
            [-9.5, 0.5], [9.5, 0.5], [9.5, -4.0], [-9.5, -4.0],
          ], { color: '#455a64', opacity: 0.05, borderWidth: 1.5, strokeColor: '#90a4ae' });
          S.actor('s2-check-title', 0, 0.2, '检验（代入原方程组）', { color: INK, size: 15, bold: true });
          S.actor('s2-check1', 0, -0.6,
            '代入①：$2 \\times 5 + 3 \\times 2 = 10 + 6 = 16$ ✓',
            { color: BLUE, size: 15 });
          S.actor('s2-check2', 0, -1.5,
            '代入②：$5 + 4 \\times 2 = 5 + 8 = 13$ ✓',
            { color: '#e65100', size: 15 });
          S.actor('s2-check3', 0, -2.5, '两个方程均成立！', { color: GREEN, size: 16, bold: true });
          S.actor('s2-final', 0, -3.4,
            '方程组的解：$\\begin{cases}x=5\\\\y=2\\end{cases}$',
            { color: GREEN, size: 18, bold: true });

          P.renderCard(
            '回代 ③：$x = 13 - 4 \\times 2 = 5$<br>' +
            '方程组的解：$\\begin{cases}x=5\\\\y=2\\end{cases}$<br>' +
            '检验 ①：$10+6=16$ ✓ &nbsp; 检验 ②：$5+8=13$ ✓',
            'cool', 'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
