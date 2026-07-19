// s5-example.js  五、例题精讲（3步）
// 环节五：解方程 3x+7=32-2x，两处移项用不同颜色动画标注
// 数学验算：3x+7=32-2x → 3x+2x=32-7 → 5x=25 → x=5
// 检验：左边=3×5+7=15+7=22；右边=32-2×5=32-10=22；22=22 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：观察分析——标出各项位置，明确移项策略
      {
        narration: '例题：解方程 3x+7=32 减 2x。先观察分析：左边有含 x 的项 3x 和常数项 +7，右边有含 x 的项 -2x 和常数项 32。策略：把含 x 的项都移到左边，常数项都移到右边。具体操作：-2x 移到左边变 +2x；+7 移到右边变 -7。',
        enter: function (anim) {
          S.actor('s5-eq', 0, 6.5, '解方程：$3x+7=32-2x$', { color: INK, size: 24, bold: true });
          if (!anim) {
            S.actor('s5-mark-3x', -7.0, 4.5, '$3x$', { color: WARM, size: 20, bold: true });
            S.actor('s5-mark-7', -4.5, 4.5, '$+7$', { color: COOL, size: 20, bold: true });
            S.actor('s5-mark-32', 1.5, 4.5, '$32$', { color: WARM, size: 20, bold: true });
            S.actor('s5-mark-m2x', 4.5, 4.5, '$-2x$', { color: COOL, size: 20, bold: true });
            S.actor('s5-arrow-l', -5.8, 3.0, '含 $x$ 留左', { color: WARM, size: 15 });
            S.actor('s5-arrow-r', -4.0, 3.0, '常数移右', { color: COOL, size: 15 });
            S.actor('s5-arrow-r2', 3.5, 3.0, '含 $x$ 移左', { color: WARM, size: 15 });
            P.renderCard(
              '<b>移项策略</b>：含 $x$ 的项移左边，常数项移右边<br>' +
              '$-2x$（右）移到左边 $\\Rightarrow$ 变 $+2x$<br>' +
              '$+7$（左）移到右边 $\\Rightarrow$ 变 $-7$'
            );
            return Promise.resolve();
          }
          return delay(400).then(function () {
            S.actor('s5-mark-3x', -7.0, 4.5, '$3x$', { color: WARM, size: 20, bold: true });
            S.actor('s5-mark-7', -4.5, 4.5, '$+7$', { color: COOL, size: 20, bold: true });
            S.actor('s5-mark-32', 1.5, 4.5, '$32$', { color: WARM, size: 20, bold: true });
            S.actor('s5-mark-m2x', 4.5, 4.5, '$-2x$', { color: COOL, size: 20, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s5-arrow-l', -5.8, 3.0, '含 $x$ 留左', { color: WARM, size: 15 });
            S.actor('s5-arrow-r', -4.0, 3.0, '常数移右', { color: COOL, size: 15 });
            S.actor('s5-arrow-r2', 3.5, 3.0, '含 $x$ 移左', { color: WARM, size: 15 });
            P.renderCard(
              '<b>移项策略</b>：含 $x$ 的项移左边，常数项移右边<br>' +
              '$-2x$（右）移到左边 $\\Rightarrow$ 变 $+2x$<br>' +
              '$+7$（左）移到右边 $\\Rightarrow$ 变 $-7$'
            );
            return delay(300);
          });
        },
      },
      // Step 2：移项+合并+除以系数（逐行展示，变号项标红）
      {
        narration: '现在逐步写出解题过程。原方程：3x+7=32 减 2x。移项：-2x 移到左边变 +2x，+7 移到右边变 -7，得 3x+2x=32-7。注意变了号的 +2x 和 -7 用红色标出。合并同类项：5x=25。两边除以 5：x=5。',
        enter: function (anim) {
          S.remove('s5-mark-3x'); S.remove('s5-mark-7'); S.remove('s5-mark-32'); S.remove('s5-mark-m2x');
          S.remove('s5-arrow-l'); S.remove('s5-arrow-r'); S.remove('s5-arrow-r2');

          // 原方程行
          S.actor('s5-row0', 0, 6.5, '$3x+7=32-2x$', { color: INK, size: 24, bold: true });

          if (!anim) {
            // 移项行：变号项标红
            S.actor('s5-row1-a', -5.5, 4.7, '$3x$', { color: INK, size: 22 });
            S.actor('s5-row1-b', -3.5, 4.7, '$+$', { color: INK, size: 22 });
            S.actor('s5-row1-c', -2.0, 4.7, '$2x$', { color: RED, size: 22, bold: true });
            S.actor('s5-row1-d', 0.2, 4.7, '$=$', { color: INK, size: 22 });
            S.actor('s5-row1-e', 2.0, 4.7, '$32$', { color: INK, size: 22 });
            S.actor('s5-row1-f', 4.2, 4.7, '$-$', { color: INK, size: 22 });
            S.actor('s5-row1-g', 5.5, 4.7, '$7$', { color: RED, size: 22, bold: true });
            S.actor('s5-row1-hint', 8.5, 4.7, '（移项）', { color: WARM, size: 14 });
            S.actor('s5-row2', 0, 2.9, '$5x=25$', { color: TEAL, size: 24, bold: true });
            S.actor('s5-row2-hint', 8.5, 2.9, '（合并）', { color: COOL, size: 14 });
            S.actor('s5-row3', 0, 1.1, '$x=5$', { color: GREEN, size: 28, bold: true });
            S.actor('s5-row3-hint', 8.5, 1.1, '（两边除以 $5$）', { color: COOL, size: 14 });
            P.renderCard(
              '<b>变号的两项</b>（红色）：<br>' +
              '$-2x$ 移到左边变 $+2x$<br>' +
              '$+7$ 移到右边变 $-7$<br>' +
              '未移动的 $3x$ 和 $32$ 符号<b>不变</b>'
            );
            return Promise.resolve();
          }

          return delay(500).then(function () {
            // 移项行逐项出现
            S.actor('s5-row1-a', -5.5, 4.7, '$3x$', { color: INK, size: 22 });
            S.actor('s5-row1-b', -3.5, 4.7, '$+$', { color: INK, size: 22 });
            S.actor('s5-row1-c', -2.0, 4.7, '$2x$', { color: RED, size: 22, bold: true });
            S.actor('s5-row1-d', 0.2, 4.7, '$=$', { color: INK, size: 22 });
            S.actor('s5-row1-e', 2.0, 4.7, '$32$', { color: INK, size: 22 });
            S.actor('s5-row1-f', 4.2, 4.7, '$-$', { color: INK, size: 22 });
            S.actor('s5-row1-g', 5.5, 4.7, '$7$', { color: RED, size: 22, bold: true });
            S.actor('s5-row1-hint', 8.5, 4.7, '（移项）', { color: WARM, size: 14 });
            P.renderCard(
              '<b>变号的两项</b>（红色）：<br>' +
              '$-2x$ 移到左边变 $+2x$<br>' +
              '$+7$ 移到右边变 $-7$<br>' +
              '未移动的 $3x$ 和 $32$ 符号<b>不变</b>'
            );
            return delay(600);
          }).then(function () {
            S.actor('s5-row2', 0, 2.9, '$5x=25$', { color: TEAL, size: 24, bold: true });
            S.actor('s5-row2-hint', 8.5, 2.9, '（合并）', { color: COOL, size: 14 });
            return delay(600);
          }).then(function () {
            S.actor('s5-row3', 0, 1.1, '$x=5$', { color: GREEN, size: 28, bold: true });
            S.actor('s5-row3-hint', 8.5, 1.1, '（两边除以 $5$）', { color: COOL, size: 14 });
            return delay(300);
          });
        },
      },
      // Step 3：检验
      {
        narration: '检验：把 x=5 代入原方程。左边等于 3 乘以 5 加 7，等于 15 加 7，等于 22。右边等于 32 减 2 乘以 5，等于 32 减 10，等于 22。左边等于右边，所以 x=5 是原方程的解。',
        enter: function (anim) {
          S.remove('s5-row0'); S.remove('s5-row1-a'); S.remove('s5-row1-b'); S.remove('s5-row1-c');
          S.remove('s5-row1-d'); S.remove('s5-row1-e'); S.remove('s5-row1-f'); S.remove('s5-row1-g');
          S.remove('s5-row1-hint'); S.remove('s5-row2'); S.remove('s5-row2-hint');
          S.remove('s5-row3'); S.remove('s5-row3-hint');

          S.actor('s5-chk-title', 0, 7.0, '检验：把 $x=5$ 代入原方程', { color: TEAL, size: 20, bold: true });
          if (!anim) {
            S.actor('s5-chk-l', 0, 5.2, '左边 $=3\\times5+7=15+7=22$', { color: WARM, size: 19 });
            S.actor('s5-chk-r', 0, 3.4, '右边 $=32-2\\times5=32-10=22$', { color: COOL, size: 19 });
            S.actor('s5-chk-eq', 0, 1.6, '左边 $=$ 右边，所以 $x=5$ 是原方程的解 ✓', { color: GREEN, size: 17, bold: true });
            P.renderCard(
              '<b>口诀</b>：含 $x$ 移左边，常数移右边，<br>移项要变号，合并再除商。',
              'teal'
            );
            return Promise.resolve();
          }
          return delay(400).then(function () {
            S.actor('s5-chk-l', 0, 5.2, '左边 $=3\\times5+7=15+7=22$', { color: WARM, size: 19 });
            return delay(600);
          }).then(function () {
            S.actor('s5-chk-r', 0, 3.4, '右边 $=32-2\\times5=32-10=22$', { color: COOL, size: 19 });
            return delay(600);
          }).then(function () {
            S.actor('s5-chk-eq', 0, 1.6, '左边 $=$ 右边，所以 $x=5$ 是原方程的解 ✓', { color: GREEN, size: 17, bold: true });
            P.renderCard(
              '<b>口诀</b>：含 $x$ 移左边，常数移右边，<br>移项要变号，合并再除商。',
              'teal'
            );
            return delay(300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
