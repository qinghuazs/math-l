(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ─── 数轴参数（bbox: [-2.5, 5, 5.5, -1]，数轴在 y=0，0~3 放大区段）
  // 数轴水平，y=0
  // 0→x=0, 1→x=3, 2→x=6（画面单位）——单位长度3画面单位
  var AXIS_Y = 0;
  var UNIT = 3.0; // 1 数学单位 = 3 画面单位
  function tx(n) { return n * UNIT; } // 数值 n 对应画面 x

  // √2 真实位置
  var SQRT2 = Math.sqrt(2); // ≈ 1.41421
  var SQRT2_X = tx(SQRT2);  // ≈ 4.243

  // 正方形顶点（左下角在原点，边长1数学单位）
  //   A=(0,0)  B=(1,0)  C=(1,1)  D=(0,1)
  // 画面坐标（keepAspect：1数学单位=UNIT画面单位）
  var SQ = {
    A: [tx(0), 0],
    B: [tx(1), 0],
    C: [tx(1), UNIT],   // 高度 = UNIT（等比）
    D: [tx(0), UNIT],
  };
  // 对角线 A→C，长度 √2 数学单位
  // 弧：以原点O为圆心，from = C（对角线端点，定半径√2），逆时针到数轴上方
  // 弧落点：(√2, 0)，即画面 (SQRT2_X, 0)

  // 闭包变量（setup 重置）
  var arcVisible = false;

  var scene = {
    id: 's2',
    title: '二、√2 的数轴落点',
    bbox: [-2.5, 5, 5.5, -1],
    board: { axis: false, keepAspect: true },
    expectSteps: 5,
    setup: function (stage, panel) {
      S = stage; P = panel;
      arcVisible = false;
    },
    steps: [
      // Step 1：画数轴（0~3 区段放大）
      {
        narration: '好，我们把数轴的 0 到 3 这段放大来看。我先画一条水平数轴，标上刻度 0、1、2、3。接下来，我们要用一个非常聪明的几何方法，精确地把 √2 "钉"到数轴上！',
        enter: function (anim) {
          // 数轴主线
          S.addSegment('s2-axis', [-0.4, AXIS_Y], [tx(3) + 0.5, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s2-arr1', [tx(3) + 0.3, AXIS_Y + 0.15], [tx(3) + 0.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s2-arr2', [tx(3) + 0.3, AXIS_Y - 0.15], [tx(3) + 0.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度 0~3
          for (var n = 0; n <= 3; n++) {
            S.addSegment('s2-tick-' + n, [tx(n), AXIS_Y - 0.18], [tx(n), AXIS_Y + 0.18],
              { color: INK, width: 2, dash: 0 });
            S.addText('s2-tlab-' + n, tx(n) - 0.1, AXIS_Y - 0.45, '' + n,
              { color: INK, size: 15 });
          }

          P.renderCard(
            '<b>数轴 0 ~ 3 放大区段</b><br>' +
            '我们知道 $1 \\lt \\sqrt{2} \\lt 2$，$\\sqrt{2}$ 就落在 $1$ 和 $2$ 之间某处。<br>' +
            '接下来用几何方法精确定位！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：在 [0,1] 上作单位正方形
      {
        narration: '现在，我在数轴上 0 到 1 这段区间上，以它为底边，向上作一个单位正方形。正方形的四条边长都是 1。—— 注意，这个正方形的底边 AB 恰好就是数轴上 0 到 1 这段！',
        enter: function (anim) {
          // 正方形边框（四条线段）
          S.addSegment('s2-sq-ab', SQ.A, SQ.B, { color: COOL, width: 2.5, dash: 0 });
          S.addSegment('s2-sq-bc', SQ.B, SQ.C, { color: COOL, width: 2.5, dash: 0 });
          S.addSegment('s2-sq-cd', SQ.C, SQ.D, { color: COOL, width: 2.5, dash: 0 });
          S.addSegment('s2-sq-da', SQ.D, SQ.A, { color: COOL, width: 2.5, dash: 0 });

          // 填充浅蓝色
          S.addPolygon('s2-sq-fill', [SQ.A, SQ.B, SQ.C, SQ.D],
            { color: COOL, opacity: 0.08, borderWidth: 0 });

          // 顶点标注
          S.addText('s2-lab-A', SQ.A[0] - 0.3, SQ.A[1] - 0.28, 'A', { color: COOL, size: 14 });
          S.addText('s2-lab-B', SQ.B[0] + 0.08, SQ.B[1] - 0.28, 'B', { color: COOL, size: 14 });
          S.addText('s2-lab-C', SQ.C[0] + 0.08, SQ.C[1] + 0.05, 'C', { color: COOL, size: 14 });
          S.addText('s2-lab-D', SQ.D[0] - 0.32, SQ.D[1] + 0.05, 'D', { color: COOL, size: 14 });

          // 边长标注
          S.addText('s2-len-bot', tx(0.5) - 0.08, AXIS_Y - 0.7, '1', { color: COOL, size: 14 });
          S.addText('s2-len-right', tx(1) + 0.22, UNIT * 0.5, '1', { color: COOL, size: 14 });

          P.renderCard(
            '<b>作单位正方形</b><br>' +
            '以数轴 $[0, 1]$ 为底边，向上作正方形 $ABCD$。<br>' +
            '四条边长均为 $1$。<br>' +
            '正方形底边 $AB$ 就在数轴上。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：对角线亮起 + 勾股说明
      {
        narration: '正方形有一条对角线，从 A 到 C。根据勾股定理：1的平方加1的平方等于2，所以对角线 AC 的长度等于根号2！——就是我们要找的那个长度！',
        enter: function (anim) {
          // 对角线（红色加粗）
          S.addSegment('s2-diag', SQ.A, SQ.C, { color: WARM, width: 3.5, dash: 0 });

          // 对角线标注 √2
          var midX = (SQ.A[0] + SQ.C[0]) / 2 - 0.5;
          var midY = (SQ.A[1] + SQ.C[1]) / 2 + 0.15;
          S.addText('s2-diag-lab', midX, midY, '$\\sqrt{2}$', { color: WARM, size: 18 });

          // 勾股定理说明卡（左上角）
          S.addText('s2-pyth', -2.2, 4.5, '勾股定理：', { color: TEAL, size: 16 });
          S.addText('s2-pyth2', -2.2, 3.9,
            '$AC = \\sqrt{1^2 + 1^2} = \\sqrt{2}$',
            { color: WARM, size: 18 });

          P.renderCard(
            '<b>对角线 = $\\sqrt{2}$</b><br>' +
            '正方形的对角线 $AC$，由勾股定理：<br>' +
            '$AC = \\sqrt{1^2 + 1^2} = \\sqrt{2}$<br>' +
            '对角线的长度恰好就是 $\\sqrt{2}$！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：以 O 为圆心、对角线为半径画弧，弧交数轴
      {
        narration: '现在是见证奇迹的时刻！我以原点 O 为圆心，以对角线长度——也就是 √2——为半径，画一段圆弧。圆弧从 C 点出发，向下逆时针旋转，一直到与数轴相交。看！弧线落下来了……就在这里！这个交点的到原点的距离，正好等于 √2！',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接画弧 + 落点
            S.addArc('s2-arc',
              [0, 0],          // center = O(原点)
              [SQRT2_X, 0],       // from = 数轴落点（0°，定半径√2）
              [SQ.C[0], SQ.C[1]], // to = C 点方向（45°）——逆时针短弧下扫
              { color: WARM, width: 3, dash: 2 }
            );
            S.dropPoint('s2-sqrt2-pt', SQRT2_X, AXIS_Y,
              { color: WARM, size: 5 });
            S.addText('s2-sqrt2-tick-lab', SQRT2_X - 0.12, AXIS_Y - 0.45,
              '$\\sqrt{2}$', { color: WARM, size: 16 });
            P.renderCard(
              '<b>圆弧落点 = $\\sqrt{2}$！</b><br>' +
              '以 $O$ 为圆心、$\\sqrt{2}$ 为半径画弧，<br>' +
              '弧线交数轴于一点——这就是 $\\sqrt{2}$ 的精确位置！<br>' +
              '$\\sqrt{2} \\approx 1.414$'
            );
            return Promise.resolve();
          }

          // 动画：逐步画弧（用 animate 驱动角度参数画临时曲线）
          // addArc 是静态的，这里用动画延迟后直接显示弧
          // 先显示弧（dash 虚线先出现感觉有动感）
          S.addArc('s2-arc',
            [0, 0],
            [SQRT2_X, 0],
            [SQ.C[0], SQ.C[1]],
            { color: WARM, width: 3, dash: 2 }
          );

          return delay(900).then(function () {
            // 落点 + 脉冲
            return S.dropPoint('s2-sqrt2-pt', SQRT2_X, AXIS_Y,
              { color: WARM, size: 5, animate: true });
          }).then(function () {
            S.addSegment('s2-sqrt2-tick', [SQRT2_X, AXIS_Y - 0.25], [SQRT2_X, AXIS_Y + 0.25],
              { color: WARM, width: 3, dash: 0 });
            S.addText('s2-sqrt2-tick-lab', SQRT2_X - 0.12, AXIS_Y - 0.48,
              '$\\sqrt{2}$', { color: WARM, size: 16 });
            return S.pulse('s2-sqrt2-pt', 3);
          }).then(function () {
            P.renderCard(
              '<b>圆弧落点 = $\\sqrt{2}$！</b><br>' +
              '以 $O$ 为圆心、$\\sqrt{2}$ 为半径画弧，<br>' +
              '弧线交数轴于一点——这就是 $\\sqrt{2}$ 的精确位置！<br>' +
              '$\\sqrt{2} \\approx 1.414$',
              'warm'
            );
            return delay(300);
          });
        },
      },

      // Step 5：结论卡——无理数也能在数轴上精确表示
      {
        narration: '太好了！我们用圆规的"转移距离"方法，把 √2 精确地标在了数轴上。这说明：无理数虽然是无限不循环小数，但它同样有精确的位置，同样能在数轴上找到对应的点。无理数并不"神秘"，它实实在在地住在数轴上！',
        enter: function (anim) {
          // 结论标注（加大弧落点说明）
          S.addText('s2-concl1', -2.2, 3.3, '结论：', { color: TEAL, size: 18 });
          S.addText('s2-concl2', -2.2, 2.7,
            '无理数也能在数轴上',
            { color: TEAL, size: 17 });
          S.addText('s2-concl3', -2.2, 2.15,
            '精确表示对应点！',
            { color: TEAL, size: 17 });

          // √2 ≈ 1.414 标注
          S.addText('s2-approx', SQRT2_X - 0.9, AXIS_Y + 0.65,
            '$\\approx 1.414$', { color: WARM, size: 14 });

          P.renderCard(
            '<b>结论</b><br>' +
            '无理数（如 $\\sqrt{2}$）虽然是无限不循环小数，<br>' +
            '但可以通过几何方法在数轴上找到<b>精确对应的点</b>。<br>' +
            '无理数也属于数轴上的居民！',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
