(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数：bbox [-8, 5, 8, -3]，数轴在 y=0，整数刻度 -3~5
  var AXIS_Y = 0;
  var AX_L = -7.0;
  var AX_R = 7.0;
  var TICK_GAP = 1.4; // 每个整数单位宽度（画面单位）
  function tx(n) { return n * TICK_GAP; }

  var scene = {
    id: 's1',
    title: '一、问题引入',
    bbox: [-8, 5, 8, -3],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：有理数都能标在数轴上
      {
        narration: '同学们好！我们学过，数轴上的每一个点都对应一个有理数——整数、分数，全都能在数轴上找到自己的位置。让我们回顾一下：这里是一条数轴，标上几个熟悉的有理数点。-2、-1、0、1/2、1、2……每个有理数都能精确落在数轴上某一个点。这一点大家都没问题，对吧？',
        enter: function (anim) {
          // 画数轴
          S.addSegment('s1-axis', [AX_L - 0.2, AXIS_Y], [AX_R + 0.2, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s1-arr1', [AX_R + 0.0, AXIS_Y + 0.15], [AX_R + 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr2', [AX_R + 0.0, AXIS_Y - 0.15], [AX_R + 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度与标注 -3~5（整数）
          var ticks = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
          for (var i = 0; i < ticks.length; i++) {
            var n = ticks[i];
            var x = tx(n);
            if (x < AX_L - 0.1 || x > AX_R + 0.1) continue;
            S.addSegment('s1-tick-' + (n + 10), [x, AXIS_Y - 0.2], [x, AXIS_Y + 0.2],
              { color: INK, width: 2, dash: 0 });
            if (n !== 0) {
              S.addText('s1-tlab-' + (n + 10), x - 0.12, AXIS_Y - 0.55, '' + n,
                { color: INK, size: 14 });
            }
          }
          // 原点 0
          S.addText('s1-tlab-0', tx(0) - 0.08, AXIS_Y - 0.55, '0', { color: INK, size: 14 });

          // 标一些有理数点：-2, -1, 0, 1/2, 1, 2
          var rationals = [
            { v: -2, label: '-2', dy: 0.55 },
            { v: -1, label: '-1', dy: 0.55 },
            { v: 0,  label: '0',  dy: 0.55 },
            { v: 0.5, label: '$\\dfrac{1}{2}$', dy: 0.65 },
            { v: 1,  label: '1',  dy: 0.55 },
            { v: 2,  label: '2',  dy: 0.55 },
          ];
          for (var j = 0; j < rationals.length; j++) {
            var r = rationals[j];
            S.dropPoint('s1-rpt-' + j, tx(r.v), AXIS_Y, { color: COOL, size: 4 });
            S.addText('s1-rlab-' + j, tx(r.v) - 0.2, AXIS_Y + r.dy, r.label,
              { color: COOL, size: 14 });
          }

          // 标题卡
          S.addText('s1-title', -7.5, 4.2, '有理数与数轴', { color: TEAL, size: 22 });
          S.addText('s1-sub', -7.5, 3.3,
            '每一个有理数都对应数轴上一个点',
            { color: INK, size: 16 });

          P.renderCard(
            '<b>有理数与数轴</b><br>' +
            '整数、分数……每一个有理数都能在数轴上找到对应点。<br>' +
            '例如：$-2,\\ -1,\\ 0,\\ \\dfrac{1}{2},\\ 1,\\ 2$ ……'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：√2 藏在数轴哪里？抛出问题
      {
        narration: '好，问题来了——我们刚学过无理数，比如根号2。它等于多少？1.41421356……是个无限不循环小数，写不完、表示不出分数。那么，根号2 这个数，能在数轴上找到对应的点吗？它到底"藏"在数轴的哪个位置？这节课，我们就来解决这个问题！',
        enter: function (anim) {
          // 在 1 和 2 之间画一个问号区域
          S.shadeRect('s1-q-shade', tx(1), AXIS_Y - 0.3, tx(2), AXIS_Y + 0.3,
            { color: WARM, opacity: 0.15 });

          // 问号动画文字
          S.addText('s1-qmark', tx(1.42) - 0.2, AXIS_Y + 1.1, '$\\sqrt{2}$ = ?',
            { color: WARM, size: 24 });
          S.addText('s1-qsub', tx(1.42) - 1.8, AXIS_Y + 1.9,
            '无理数能在数轴上找到位置吗？',
            { color: WARM, size: 16 });

          // 范围提示：1 < √2 < 2
          S.addText('s1-hint', -7.5, 2.3,
            '$1 \\lt \\sqrt{2} \\lt 2$，它在 $1$ 和 $2$ 之间——',
            { color: INK, size: 16 });
          S.addText('s1-hint2', -7.5, 1.5,
            '但到底在哪一点？',
            { color: WARM, size: 18 });

          P.renderCard(
            '<b>问题：$\\sqrt{2}$ 在数轴上吗？</b><br>' +
            '$\\sqrt{2} = 1.41421356\\ldots$（无限不循环小数）<br>' +
            '已知 $1 \\lt \\sqrt{2} \\lt 2$，它在 $1$ 和 $2$ 之间。<br>' +
            '<span style="color:#e64a19"><b>但精确位置在哪里？能在数轴上找到吗？</b></span>',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
