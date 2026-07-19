// s3-solve.js  环节三：合并与系数化1——天平复现与求解（3步）
// 数学验算：7x=140，两边÷7，x=20；检验：20+40+80=140 ✓；天平沿用s3.1的CSS_X/CSS_B样式
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a', GREEN = '#2e7d32';

  // 沿用 s3.1 天平 CSS 记号（等式性质 2 与 3.1 视觉语言一致）
  var CSS_X = 'background:#f3e5f5;border:2.5px solid #6a1b9a;border-radius:8px;padding:6px 16px;';
  var CSS_B = 'background:#e3f2fd;border:2.5px solid #1565c0;border-radius:8px;padding:6px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 天平砝码句柄
  var wLeft = null, wRight = null;

  // 静态天平（横梁 + 托盘）
  function buildScale() {
    S.addPolygon('s3-pivot', [[-0.6, -3.8], [0.6, -3.8], [0, -0.5]], { color: '#78909c' });
    S.addSegment('s3-base', [-2, -3.8], [2, -3.8], { color: INK, width: 6, dash: 0 });
    S.addSegment('s3-beam', [-4.5, -0.5], [4.5, -0.5], { color: INK, width: 5, dash: 0 });
    S.addSegment('s3-panL', [-5.5, -0.35], [-3.5, -0.35], { color: '#78909c', width: 4, dash: 0 });
    S.addSegment('s3-panR', [3.5, -0.35], [5.5, -0.35], { color: '#78909c', width: 4, dash: 0 });
  }

  var scene = {
    id: 's3',
    title: '三、合并与系数化1',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      wLeft = null;
      wRight = null;
      buildScale();
    },
    steps: [
      // Step 1：天平复现——左盘 7x，右盘 140
      {
        narration: '我们请出 3.1 中的老朋友——天平！现在方程是 7x 等于 140：左盘放着 7 个 x，右盘放着 140。天平平衡，说明两边相等。现在问题是——怎样让左盘只剩 1 个 x？',
        enter: function (anim) {
          S.actor('s3-eq', 0, 7.2,
            '$7x = 140$',
            { color: PURPLE, size: 32, bold: true });

          if (!anim) {
            wLeft = S.actor('s3-left', -4.5, 0.35, '7x', { color: INK, size: 26, bold: true, css: CSS_X });
            wRight = S.actor('s3-right', 4.5, 0.35, '140', { color: INK, size: 24, bold: true, css: CSS_B });
            P.renderCard(
              '<b>天平复现</b>（沿用 3.1 视觉语言）<br>' +
              '左盘：$7x$（7 个 $x$）<br>' +
              '右盘：$140$<br>' +
              '天平平衡 → 两边相等。<br>' +
              '目标：让左盘只剩 <b>1 个 $x$</b>。'
            );
            return Promise.resolve();
          }

          wLeft = S.actor('s3-left', -4.5, 9, '7x', { color: INK, size: 26, bold: true, css: CSS_X });
          wRight = S.actor('s3-right', 4.5, 9, '140', { color: INK, size: 24, bold: true, css: CSS_B });

          return wLeft.moveTo(-4.5, 0.35, 600).then(function () {
            return wRight.moveTo(4.5, 0.35, 600);
          }).then(function () {
            P.renderCard(
              '<b>天平复现</b>（沿用 3.1 视觉语言）<br>' +
              '左盘：$7x$（7 个 $x$）<br>' +
              '右盘：$140$<br>' +
              '天平平衡 → 两边相等。<br>' +
              '目标：让左盘只剩 <b>1 个 $x$</b>。'
            );
            return delay(300);
          });
        },
      },

      // Step 2：两边除以7——等式性质2
      {
        narration: '两边同时除以 7——这是等式性质 2：天平两盘必须同步操作！左盘 7x 除以 7 得 x；右盘 140 除以 7 得 20。注意：一定是两边同时除以 7，只改一边天平就歪了！',
        enter: function (anim) {
          // 更新方程显示
          S.remove('s3-eq');
          S.actor('s3-eq', 0, 7.2,
            '$7x \\div 7 = 140 \\div 7$',
            { color: PURPLE, size: 26, bold: true });

          // 更新天平托盘内容
          S.remove('s3-left'); S.remove('s3-right');

          if (!anim) {
            wLeft = S.actor('s3-left', -4.5, 0.35, 'x', { color: INK, size: 30, bold: true, css: CSS_X });
            wRight = S.actor('s3-right', 4.5, 0.35, '20', { color: INK, size: 30, bold: true, css: CSS_B });
            S.actor('s3-prop2', 0, 5.2,
              '等式性质 2：两边同除以同一个不为 0 的数',
              { color: TEAL, size: 16 });
            P.renderCard(
              '<b>等式性质 2（3.1 已学）</b><br>' +
              '两边同时除以同一个<b>不为 0</b> 的数，等式仍成立。<br>' +
              '$7x \\div 7 = 140 \\div 7$<br>' +
              '→ $x = 20$<br>' +
              '关键：天平两盘<b>必须同步</b>！'
            );
            return Promise.resolve();
          }

          wLeft = S.actor('s3-left', -4.5, 9, 'x', { color: INK, size: 30, bold: true, css: CSS_X });
          wRight = S.actor('s3-right', 4.5, 9, '20', { color: INK, size: 30, bold: true, css: CSS_B });

          return wLeft.moveTo(-4.5, 0.35, 600).then(function () {
            return wRight.moveTo(4.5, 0.35, 600);
          }).then(function () {
            S.actor('s3-prop2', 0, 5.2,
              '等式性质 2：两边同除以同一个不为 0 的数',
              { color: TEAL, size: 16 });
            P.renderCard(
              '<b>等式性质 2（3.1 已学）</b><br>' +
              '两边同时除以同一个<b>不为 0</b> 的数，等式仍成立。<br>' +
              '$7x \\div 7 = 140 \\div 7$<br>' +
              '→ $x = 20$<br>' +
              '关键：天平两盘<b>必须同步</b>！'
            );
            return delay(300);
          });
        },
      },

      // Step 3：答案还原与检验
      {
        narration: '解出来了！x 等于 20。把它还原到实际问题：前年购买 20 台，后年 40 台，大后年 80 台。现在代入原方程检验：20 加 40 加 80 等于 140，等于右边，检验正确！',
        enter: function (anim) {
          S.remove('s3-eq'); S.remove('s3-prop2');
          S.remove('s3-left'); S.remove('s3-right');

          S.actor('s3-ans', 0, 7.0,
            '$x = 20$',
            { color: PURPLE, size: 40, bold: true });
          S.actor('s3-restore', 0, 5.0,
            '前年 20 台，后年 40 台，大后年 80 台',
            { color: COOL, size: 17 });
          S.actor('s3-check', 0, 3.2,
            '检验：$20 + 40 + 80 = 140 = $ 右边',
            { color: GREEN, size: 18 });
          S.actor('s3-tick', 0, 1.8, '✓', { color: GREEN, size: 30, bold: true });

          P.renderCard(
            '<b>解：$x = 20$</b><br>' +
            '还原：前年 20 台，后年 40 台，大后年 80 台<br><br>' +
            '<b>检验（代入原方程）：</b><br>' +
            '左边 $= 20 + 40 + 80 = 140 =$ 右边 ✓',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
