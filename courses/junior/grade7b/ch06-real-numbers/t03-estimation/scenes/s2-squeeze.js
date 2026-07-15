(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数
  var AXIS_Y  = -3.5;   // 数轴所在 y 坐标
  var AX_L    = -1.0;   // 数轴左端（画面坐标 x）
  var AX_R    =  9.5;   // 数轴右端（画面坐标 x）
  // 刻度 0~3 映射到画面 x：tick(n) = AX_L + n * 3.16
  var TICK_GAP = 3.16;
  function tx(n) { return AX_L + n * TICK_GAP; } // 数值 n → 画面 x

  // 夹逼区间端点（闭包，由 animate 驱动）
  var sqLeft  = tx(1);   // 左端画面 x
  var sqRight = tx(2);   // 右端画面 x

  // 真值位置
  var SQRT2_X = AX_L + Math.sqrt(2) * TICK_GAP; // 约 tx(1.414)

  var scene = {
    id: 's2',
    title: '二、夹逼估算',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 5,
    setup: function (stage, panel) {
      S = stage; P = panel;
      // 重置闭包变量
      sqLeft  = tx(1);
      sqRight = tx(2);
    },
    steps: [
      // Step 1：画数轴 + 刻度
      {
        narration: '我们先在数轴上定位。画一条水平数轴，范围从 0 到 3。首先，1 的平方等于 1，2 的平方等于 4——而我们要找的数的平方是 2，介于 1 和 4 之间。所以 √2 一定介于 1 和 2 之间！这是第一轮夹逼。',
        enter: function (anim) {
          sqLeft  = tx(1);
          sqRight = tx(2);

          // 画数轴（线段+箭头感）
          S.addSegment('s2-axis', [AX_L - 0.3, AXIS_Y], [AX_R + 0.3, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头端点（用短竖线代替）
          S.addSegment('s2-arr', [AX_R + 0.1, AXIS_Y + 0.18], [AX_R + 0.4, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s2-arr2', [AX_R + 0.1, AXIS_Y - 0.18], [AX_R + 0.4, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度 0/1/2/3
          var ticks = [0, 1, 2, 3];
          for (var i = 0; i < ticks.length; i++) {
            var n = ticks[i];
            var x = tx(n);
            S.addSegment('s2-tick-' + n, [x, AXIS_Y - 0.25], [x, AXIS_Y + 0.25],
              { color: INK, width: 2, dash: 0 });
            S.addText('s2-tlab-' + n, x - 0.15, AXIS_Y - 0.7, '' + n,
              { color: INK, size: 16 });
          }

          // 第一轮夹逼：1 < √2 < 2，高亮 [1,2]
          S.shadeRect('s2-shade1',
            tx(1), AXIS_Y - 0.3,
            tx(2), AXIS_Y + 0.3,
            { color: COOL, opacity: 0.18 }
          );

          // 标注 1²=1 < 2 < 4=2²
          S.addText('s2-r1-a', -8.5, 5.5, '$1^2 = 1 \\lt 2 \\lt 4 = 2^2$', { color: COOL, size: 20 });
          S.addText('s2-r1-b', -8.5, 4.0, '$\\Rightarrow 1 \\lt \\sqrt{2} \\lt 2$', { color: WARM, size: 20 });

          // 区间括号标注
          S.addText('s2-bra-l', tx(1) - 0.15, AXIS_Y + 1.0, '[', { color: WARM, size: 24 });
          S.addText('s2-bra-r', tx(2) - 0.15, AXIS_Y + 1.0, ']', { color: WARM, size: 24 });
          S.addText('s2-bra-label', tx(1.5) - 0.4, AXIS_Y + 1.8,
            '$\\sqrt{2}$ 在此区间', { color: WARM, size: 15 });

          P.renderCard(
            '<b>第一轮夹逼</b><br>' +
            '$1^2 = 1 \\lt 2 \\lt 4 = 2^2$<br>' +
            '$\\Rightarrow 1 \\lt \\sqrt{2} \\lt 2$<br>' +
            '已知 $\\sqrt{2}$ 在整数 $1$ 和 $2$ 之间。'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：第二轮夹逼（区间收窄动画）
      {
        narration: '现在进一步精确。我们在 1 和 2 之间试几个数：1.4 的平方等于 1.96，比 2 小；1.5 的平方等于 2.25，比 2 大。所以 √2 在 1.4 和 1.5 之间！看数轴上，区间从 [1,2] 收窄到 [1.4,1.5]——',
        enter: function (anim) {
          // 移除旧括号标注（用新坐标重建）
          S.remove('s2-bra-l');
          S.remove('s2-bra-r');
          S.remove('s2-bra-label');

          // 目标：收窄到 [1.4, 1.5]
          var targetL = tx(1.4);
          var targetR = tx(1.5);

          // 第二轮文字
          S.addText('s2-r2-a', -8.5, 2.5, '$1.4^2 = 1.96 \\lt 2 \\lt 2.25 = 1.5^2$', { color: TEAL, size: 17 });
          S.addText('s2-r2-b', -8.5, 1.2, '$\\Rightarrow 1.4 \\lt \\sqrt{2} \\lt 1.5$', { color: WARM, size: 18 });

          if (!anim) {
            sqLeft  = targetL;
            sqRight = targetR;
            S.shadeRect('s2-shade1', sqLeft, AXIS_Y - 0.3, sqRight, AXIS_Y + 0.3,
              { color: TEAL, opacity: 0.28 });
            S.addText('s2-bra-l2', sqLeft - 0.15,  AXIS_Y + 1.0, '[', { color: TEAL, size: 22 });
            S.addText('s2-bra-r2', sqRight - 0.15, AXIS_Y + 1.0, ']', { color: TEAL, size: 22 });
            P.renderCard(
              '<b>第二轮夹逼（收窄）</b><br>' +
              '$1.4^2 = 1.96 \\lt 2 \\lt 2.25 = 1.5^2$<br>' +
              '$\\Rightarrow 1.4 \\lt \\sqrt{2} \\lt 1.5$<br>' +
              '区间从 $[1,2]$ 收窄到 $[1.4, 1.5]$！'
            );
            return Promise.resolve();
          }

          // 动画：区间左端从 tx(1)→tx(1.4)，右端从 tx(2)→tx(1.5)，同步收窄
          var initL = tx(1), initR = tx(2);
          return S.animate({
            from: 0, to: 1, duration: 1600, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              sqLeft  = initL + (targetL - initL) * v;
              sqRight = initR + (targetR - initR) * v;
              S.shadeRect('s2-shade1', sqLeft, AXIS_Y - 0.3, sqRight, AXIS_Y + 0.3,
                { color: TEAL, opacity: 0.28 });
              S.getBoard().update();
            },
          }).then(function () {
            S.addText('s2-bra-l2', sqLeft - 0.15,  AXIS_Y + 1.0, '[', { color: TEAL, size: 22 });
            S.addText('s2-bra-r2', sqRight - 0.15, AXIS_Y + 1.0, ']', { color: TEAL, size: 22 });
            P.renderCard(
              '<b>第二轮夹逼（收窄）</b><br>' +
              '$1.4^2 = 1.96 \\lt 2 \\lt 2.25 = 1.5^2$<br>' +
              '$\\Rightarrow 1.4 \\lt \\sqrt{2} \\lt 1.5$<br>' +
              '区间从 $[1,2]$ 收窄到 $[1.4, 1.5]$！'
            );
            return delay(300);
          });
        },
      },

      // Step 3：第三轮夹逼 [1.41, 1.42]
      {
        narration: '再精确一位：1.41 的平方等于 1.9881，比 2 小；1.42 的平方等于 2.0164，比 2 大。所以 √2 在 1.41 和 1.42 之间！区间继续收窄——看，数轴上这个蓝色区间越来越窄，正在逼近 √2 的真实位置。',
        enter: function (anim) {
          S.remove('s2-bra-l2');
          S.remove('s2-bra-r2');

          var targetL = tx(1.41);
          var targetR = tx(1.42);

          S.addText('s2-r3-a', -8.5, -0.2, '$1.41^2 = 1.9881 \\lt 2 \\lt 2.0164 = 1.42^2$', { color: PURPLE, size: 15 });
          S.addText('s2-r3-b', -8.5, -1.5, '$\\Rightarrow 1.41 \\lt \\sqrt{2} \\lt 1.42$', { color: WARM, size: 17 });

          if (!anim) {
            sqLeft  = targetL;
            sqRight = targetR;
            S.shadeRect('s2-shade1', sqLeft, AXIS_Y - 0.3, sqRight, AXIS_Y + 0.3,
              { color: PURPLE, opacity: 0.35 });
            S.addText('s2-bra-l3', sqLeft - 0.15,  AXIS_Y + 1.0, '[', { color: PURPLE, size: 20 });
            S.addText('s2-bra-r3', sqRight - 0.15, AXIS_Y + 1.0, ']', { color: PURPLE, size: 20 });
            P.renderCard(
              '<b>第三轮夹逼</b><br>' +
              '$1.41^2 = 1.9881 \\lt 2 \\lt 2.0164 = 1.42^2$<br>' +
              '$\\Rightarrow 1.41 \\lt \\sqrt{2} \\lt 1.42$'
            );
            return Promise.resolve();
          }

          var initL = sqLeft, initR = sqRight;
          return S.animate({
            from: 0, to: 1, duration: 1400, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              sqLeft  = initL + (targetL - initL) * v;
              sqRight = initR + (targetR - initR) * v;
              S.shadeRect('s2-shade1', sqLeft, AXIS_Y - 0.3, sqRight, AXIS_Y + 0.3,
                { color: PURPLE, opacity: 0.35 });
              S.getBoard().update();
            },
          }).then(function () {
            S.addText('s2-bra-l3', sqLeft - 0.15,  AXIS_Y + 1.0, '[', { color: PURPLE, size: 20 });
            S.addText('s2-bra-r3', sqRight - 0.15, AXIS_Y + 1.0, ']', { color: PURPLE, size: 20 });
            P.renderCard(
              '<b>第三轮夹逼</b><br>' +
              '$1.41^2 = 1.9881 \\lt 2 \\lt 2.0164 = 1.42^2$<br>' +
              '$\\Rightarrow 1.41 \\lt \\sqrt{2} \\lt 1.42$'
            );
            return delay(300);
          });
        },
      },

      // Step 4：数轴上 √2 位置点渐显
      {
        narration: '经过三轮夹逼，我们知道 √2 大约在 1.414 左右。现在在数轴上标出 √2 的位置——就在这里！这个点无法用分数精确表示，是无理数，但我们通过夹逼法，已经把它精确到了百分位。',
        enter: function (anim) {
          // 标出 √2 真实位置
          S.dropPoint('s2-sqrt2-pt', SQRT2_X, AXIS_Y, { color: WARM, size: 6, animate: anim });
          S.addText('s2-sqrt2-lab', SQRT2_X - 0.2, AXIS_Y + 0.8, '$\\sqrt{2}$', { color: WARM, size: 20 });
          S.addSegment('s2-sqrt2-tick', [SQRT2_X, AXIS_Y - 0.35], [SQRT2_X, AXIS_Y + 0.35],
            { color: WARM, width: 3, dash: 0 });
          S.addText('s2-sqrt2-val', SQRT2_X - 0.9, AXIS_Y - 1.0, '≈ 1.414', { color: WARM, size: 15 });

          P.renderCard(
            '数轴上标出 $\\sqrt{2}$ 的位置！<br>' +
            '夹逼三轮后：$1.41 \\lt \\sqrt{2} \\lt 1.42$<br>' +
            '精确到千分位：$\\sqrt{2} \\approx 1.414$'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 5：夹逼法总结卡
      {
        narration: '好，我们来总结一下"夹逼法"。第一步：找到与被开方数相邻的两个完全平方数，得到整数范围；第二步：在整数范围内试小数，进一步收窄到十分位；第三步：继续试，收窄到百分位……每轮试算一次，精度就提高一位。这就是夹逼法的精髓！',
        enter: function (anim) {
          // 在画面左侧上方展示方法总结
          S.addText('s2-sum-title', -9.0, 6.8, '【夹逼法步骤】', { color: TEAL, size: 19 });
          S.addText('s2-sum-1', -9.0, 5.5, '① 找相邻完全平方数 → 整数范围', { color: INK, size: 15 });
          S.addText('s2-sum-2', -9.0, 4.3, '② 试十分位小数 → 十分位范围',    { color: INK, size: 15 });
          S.addText('s2-sum-3', -9.0, 3.1, '③ 试百分位小数 → 百分位范围',    { color: INK, size: 15 });
          S.addText('s2-sum-4', -9.0, 1.9, '④ ……每轮精度 +1 位',            { color: INK, size: 15 });

          P.renderCard(
            '<b>夹逼法总结</b><br>' +
            '① 找相邻完全平方数 $\\Rightarrow$ 整数范围<br>' +
            '② 试十分位 $\\Rightarrow$ 十分位范围<br>' +
            '③ 试百分位 $\\Rightarrow$ 百分位范围<br>' +
            '规律：每轮试算一次，精度提高一位！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
