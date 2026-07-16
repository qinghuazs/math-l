(function (CW) {
  'use strict';
  // s3 和倍问题
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's3',
    title: '三、和倍问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '再来看第二种类型——和差倍分问题。题目：两个数的和是 36，大数是小数的 2 倍，求这两个数。这道题的两个未知量是大数和小数，我们设大数为 x，小数为 y。现在从题目中找出两个等量关系：',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.2, '和倍问题：两数之和为 36，大数是小数的 2 倍', {
            color: BLUE, size: 18, bold: true,
          });

          // 题目框
          S.addPolygon('s3-q-bg', [
            [-9, 6.0], [9, 6.0], [9, 4.0], [-9, 4.0],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s3-q1', 0, 5.55,
            '两个数的和是 36，', { color: INK, size: 17 });
          S.actor('s3-q2', 0, 4.55,
            '大数是小数的 2 倍，', { color: INK, size: 17 });

          // 设元
          S.addPolygon('s3-set-bg', [
            [-9, 3.4], [9, 3.4], [9, 2.2], [-9, 2.2],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-set-text', 0, 2.8,
            '设大数为 $x$，小数为 $y$',
            { color: BLUE, size: 18, bold: true });

          // 关系①——句子→方程对应
          S.addPolygon('s3-c1-bg', [
            [-9.5, 1.6], [9.5, 1.6], [9.5, -0.2], [-9.5, -0.2],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-c1-sent', -2, 1.2,
            '条件①："两数的和是 36"', { color: BLUE, size: 15 });
          S.actor('s3-c1-arrow', -9, 0.35, '→', { color: BLUE, size: 20 });
          S.actor('s3-c1-eq',     2, 0.35,
            '$x + y = 36$', { color: BLUE, size: 19, bold: true });

          // 关系②——句子→方程对应
          S.addPolygon('s3-c2-bg', [
            [-9.5, -0.8], [9.5, -0.8], [9.5, -2.6], [-9.5, -2.6],
          ], { color: RED, opacity: 0.07, borderWidth: 2, strokeColor: RED });
          S.actor('s3-c2-sent', -2, -1.2,
            '条件②："大数是小数的 2 倍"', { color: RED, size: 15 });
          S.actor('s3-c2-arrow', -9, -2.0, '→', { color: RED, size: 20 });
          S.actor('s3-c2-eq',     2, -2.0,
            '$x = 2y$', { color: RED, size: 19, bold: true });

          P.renderCard(
            '设大数 $x$，小数 $y$<br>' +
            '条件①（和）：$x + y = 36$<br>' +
            '条件②（倍）：$x = 2y$'
          );
        },
      },
      {
        narration: '方程组列好了，现在来解。方程②告诉我们 x 等于 2y，把它代入方程①：2y 加 y 等于 36，3y 等于 36，y 等于 12。再求 x：x 等于 2 乘以 12，等于 24。检验：24 加 12 等于 36，正确；24 等于 2 倍的 12，正确。答：这两个数是 24 和 12。',
        enter: function (anim) {
          S.actor('s3-solve-title', 0, 7.2, '代入法求解', {
            color: INK, size: 20, bold: true,
          });

          // 方程组
          S.addPolygon('s3-sys-bg', [
            [-4, 6.2], [4, 6.2], [4, 4.8], [-4, 4.8],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s3-sys', 0, 5.55,
            '$\\begin{cases}x+y=36\\\\x=2y\\end{cases}$',
            { color: GREEN, size: 19, bold: true });

          // 代入步骤
          S.actor('s3-step1-label', -7, 4.0, '将 $x=2y$ 代入①：', { color: INK, size: 15 });
          S.actor('s3-step1-calc',   4, 4.0, '$2y + y = 36$', { color: ORANGE, size: 17 });

          S.actor('s3-step2-label', -7, 3.0, '化简：', { color: INK, size: 15 });
          S.actor('s3-step2-calc',   4, 3.0, '$3y = 36$', { color: ORANGE, size: 17 });

          S.actor('s3-y-res', 0, 2.0,
            '$y = 12$（小数为 12）',
            { color: GREEN, size: 19, bold: true });

          S.actor('s3-sub-label', -7, 1.0, '求 $x$：', { color: INK, size: 15 });
          S.actor('s3-sub-calc',   4, 1.0, '$x = 2 \\times 12 = 24$', { color: BLUE, size: 17 });

          S.actor('s3-x-res', 0, 0.0,
            '$x = 24$（大数为 24）',
            { color: BLUE, size: 19, bold: true });

          // 检验与答
          S.addPolygon('s3-ck-bg', [
            [-9.5, -1.0], [9.5, -1.0], [9.5, -2.2], [-9.5, -2.2],
          ], { color: GREEN, opacity: 0.07, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s3-ck-text', 0, -1.55,
            '验：$24+12=36$ ✓，$24=2\\times12$ ✓',
            { color: GREEN, size: 15 });

          S.addPolygon('s3-ans-bg', [
            [-6, -2.8], [6, -2.8], [6, -4.0], [-6, -4.0],
          ], { color: BLUE, opacity: 0.09, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-ans', 0, -3.4,
            '答：这两个数是 24 和 12。',
            { color: BLUE, size: 18, bold: true });

          P.renderCard(
            '将 $x=2y$ 代入：$3y=36$，$y=12$<br>' +
            '$x=2\\times12=24$<br>' +
            '验：$24+12=36$ ✓，$24=2\\times12$ ✓<br>' +
            '<b>答：这两个数是 24 和 12。</b>',
            'cool'
          );
        },
      },
      {
        narration: '注意每道应用题都要将题目中的每句话对应到一个方程，这叫"句子到方程的翻译"。"两数之和为36"→ x+y=36；"大数是小数的2倍"→ x=2y。这种和倍问题用代入法特别方便，因为其中一个方程已经是"x=……"的形式，直接代入即可。',
        enter: function (anim) {
          S.actor('s3-model-title', 0, 7.0, '和倍问题解题模型', {
            color: ORANGE, size: 20, bold: true,
          });

          // 模型总结框
          S.addPolygon('s3-model-bg', [
            [-9.5, 6.2], [9.5, 6.2], [9.5, 3.5], [-9.5, 3.5],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s3-m1', 0, 5.8,
            '"两数之和为 S" → $x + y = S$',
            { color: BLUE, size: 16 });
          S.actor('s3-m2', 0, 5.0,
            '"大数是小数的 n 倍" → $x = ny$',
            { color: RED, size: 16 });
          S.actor('s3-m3', 0, 4.2,
            '代入法：将 $x=ny$ 代入和的方程，解出 $y$',
            { color: GREEN, size: 15 });

          // 推广
          S.addPolygon('s3-ext-bg', [
            [-9, 2.8], [9, 2.8], [9, 1.0], [-9, 1.0],
          ], { color: GRAY, opacity: 0.08, borderWidth: 1.5, strokeColor: GRAY });
          S.actor('s3-ext-title', 0, 2.4, '常见变形', { color: INK, size: 15, bold: true });
          S.actor('s3-ext-t1', 0, 1.6,
            '"大数比小数多 k" → $x - y = k$（差的关系）',
            { color: INK, size: 14 });

          P.renderCard(
            '<b>和倍问题模型</b><br>' +
            '和：$x+y=S$<br>' +
            '倍：$x=ny$<br>' +
            '→ 代入消元，解出结果'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
