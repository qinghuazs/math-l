(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数（用于应用题夹逼可视化）
  var AXIS_Y  = -4.0;
  var AX_L    = -1.5;
  var TICK_GAP = 1.35;
  function tx(n) { return AX_L + (n - 13) * TICK_GAP; } // 刻度 13~16 映射画面

  // 夹逼区间端点（闭包）
  var sqLeft  = tx(14);
  var sqRight = tx(15);

  var scene = {
    id: 's4',
    title: '四、实际应用',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
      sqLeft  = tx(14);
      sqRight = tx(15);
    },
    steps: [
      // Step 1：题目出示 + 建立方程
      {
        narration: '我们来解决一道实际问题。一个正方形广场的面积是 200 平方米，请问它的边长大约是多少米？同学们，先设边长为 x 米，然后根据面积公式列方程……边长 x 的平方等于 200，所以 x 等于 √200。那 √200 大约等于多少呢？',
        enter: function (anim) {
          sqLeft  = tx(14);
          sqRight = tx(15);

          // 正方形示意图
          var cx = -5, cy = 2.5, half = 2.8;
          S.addSegment('s4-sq-t', [cx - half, cy + half], [cx + half, cy + half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s4-sq-r', [cx + half, cy + half], [cx + half, cy - half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s4-sq-b', [cx + half, cy - half], [cx - half, cy - half], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s4-sq-l', [cx - half, cy - half], [cx - half, cy + half], { color: COOL, width: 3, dash: 0 });

          S.addText('s4-area',  cx - 1.2, cy + 0.4, '面积 = 200 m²', { color: COOL, size: 17 });
          S.addText('s4-side',  cx - 1.0, cy - 0.5, '边长 = x 米',   { color: WARM, size: 17 });
          S.addText('s4-side2', cx - half - 1.8, cy + 0.1, 'x', { color: WARM, size: 22 });

          // 建立方程
          S.addText('s4-eq1', 1.5, 5.8, '设边长为 $x$ 米', { color: INK, size: 18 });
          S.addText('s4-eq2', 1.5, 4.5, '$x^2 = 200$',     { color: COOL, size: 22 });
          S.addText('s4-eq3', 1.5, 3.2, '$x = \\sqrt{200}$', { color: WARM, size: 22 });
          S.addText('s4-eq4', 1.5, 1.8, '（$x \\gt 0$）',   { color: GRAY, size: 16 });

          P.renderCard(
            '<b>题目</b>：正方形广场面积为 200 m²，求边长（精确到 0.1 m）。<br><br>' +
            '设边长为 $x$ 米，则 $x^2 = 200$，所以 $x = \\sqrt{200}$。<br>' +
            '下面用夹逼法估算 $\\sqrt{200}$。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：夹逼估算 √200（含区间收窄动画）
      {
        narration: '现在用夹逼法估算 √200。首先，14 的平方等于 196，比 200 小；15 的平方等于 225，比 200 大。所以 √200 在 14 和 15 之间。进一步精确：14.1 的平方等于 198.81，比 200 小；14.2 的平方等于 201.64，比 200 大。所以 √200 在 14.1 和 14.2 之间，精确到十分位就是约 14.1 米！',
        enter: function (anim) {
          sqLeft  = tx(14);
          sqRight = tx(15);

          // 画局部数轴（13~16 区间）
          S.addSegment('s4-axis', [tx(13) - 0.3, AXIS_Y], [tx(16) + 0.3, AXIS_Y],
            { color: INK, width: 3, dash: 0 });

          var tks = [13, 14, 15, 16];
          for (var i = 0; i < tks.length; i++) {
            var n = tks[i];
            var x = tx(n);
            S.addSegment('s4-tick-' + n, [x, AXIS_Y - 0.22], [x, AXIS_Y + 0.22],
              { color: INK, width: 2, dash: 0 });
            S.addText('s4-tlab-' + n, x - 0.25, AXIS_Y - 0.75, '' + n, { color: INK, size: 15 });
          }

          // 初始高亮 [14, 15]
          S.shadeRect('s4-shade', tx(14), AXIS_Y - 0.28, tx(15), AXIS_Y + 0.28,
            { color: COOL, opacity: 0.2 });

          // 第一轮说明
          S.addText('s4-r1a', -9.0, 5.8, '$14^2 = 196 \\lt 200 \\lt 225 = 15^2$', { color: COOL, size: 17 });
          S.addText('s4-r1b', -9.0, 4.6, '$\\Rightarrow 14 \\lt \\sqrt{200} \\lt 15$', { color: WARM, size: 18 });

          // 第二轮说明
          S.addText('s4-r2a', -9.0, 3.2, '$14.1^2 = 198.81 \\lt 200 \\lt 201.64 = 14.2^2$', { color: TEAL, size: 15 });
          S.addText('s4-r2b', -9.0, 2.0, '$\\Rightarrow 14.1 \\lt \\sqrt{200} \\lt 14.2$', { color: WARM, size: 17 });

          // 目标区间
          var targetL = tx(14.1);
          var targetR = tx(14.2);

          if (!anim) {
            sqLeft  = targetL;
            sqRight = targetR;
            S.shadeRect('s4-shade', sqLeft, AXIS_Y - 0.28, sqRight, AXIS_Y + 0.28,
              { color: TEAL, opacity: 0.35 });
            P.renderCard(
              '<b>夹逼估算 $\\sqrt{200}$</b><br>' +
              '$14^2 = 196 \\lt 200 \\lt 225 = 15^2 \\Rightarrow 14 \\lt \\sqrt{200} \\lt 15$<br>' +
              '$14.1^2 = 198.81 \\lt 200 \\lt 201.64 = 14.2^2$<br>' +
              '$\\Rightarrow 14.1 \\lt \\sqrt{200} \\lt 14.2$<br>' +
              '精确到十分位：$\\sqrt{200} \\approx 14.1$'
            );
            return Promise.resolve();
          }

          // 动画：区间收窄 [14,15] → [14.1, 14.2]
          var initL = tx(14), initR = tx(15);
          return S.animate({
            from: 0, to: 1, duration: 1600, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              sqLeft  = initL + (targetL - initL) * v;
              sqRight = initR + (targetR - initR) * v;
              S.shadeRect('s4-shade', sqLeft, AXIS_Y - 0.28, sqRight, AXIS_Y + 0.28,
                { color: TEAL, opacity: 0.35 });
              S.getBoard().update();
            },
          }).then(function () {
            // 标记 √200 位置
            var sqrt200x = tx(Math.sqrt(200));
            S.dropPoint('s4-pt', sqrt200x, AXIS_Y, { color: WARM, size: 5, animate: true });
            S.addText('s4-pt-lab', sqrt200x - 0.5, AXIS_Y + 0.7, '$\\sqrt{200}$', { color: WARM, size: 16 });
            P.renderCard(
              '<b>夹逼估算 $\\sqrt{200}$</b><br>' +
              '$14^2 = 196 \\lt 200 \\lt 225 = 15^2 \\Rightarrow 14 \\lt \\sqrt{200} \\lt 15$<br>' +
              '$14.1^2 = 198.81 \\lt 200 \\lt 201.64 = 14.2^2$<br>' +
              '$\\Rightarrow 14.1 \\lt \\sqrt{200} \\lt 14.2$<br>' +
              '精确到十分位：$\\sqrt{200} \\approx 14.1$'
            );
            return delay(300);
          });
        },
      },

      // Step 3：写出答案
      {
        narration: '所以，这个正方形广场的边长约为 14.1 米。这道题的完整解题过程是：第一，设边长为 x 米，列方程 x 的平方等于 200；第二，用夹逼法，14 的平方小于 200 小于 225 等于 15 的平方，得到 14 小于 √200 小于 15；第三，精确到十分位，14.1 的平方等于 198.81 小于 200，所以约等于 14.1。写答。',
        enter: function (anim) {
          // 完整解题过程
          S.addText('s4-ans-title', -9.0, 6.8, '【完整解题过程】', { color: TEAL, size: 19 });
          S.addText('s4-ans-1', -9.0, 5.6, '设边长为 $x$ 米，$x^2 = 200$，$x = \\sqrt{200}$',
            { color: INK, size: 15 });
          S.addText('s4-ans-2', -9.0, 4.4, '因为 $14^2 = 196 \\lt 200 \\lt 225 = 15^2$',
            { color: INK, size: 15 });
          S.addText('s4-ans-3', -9.0, 3.2, '所以 $14 \\lt \\sqrt{200} \\lt 15$',
            { color: INK, size: 15 });
          S.addText('s4-ans-4', -9.0, 2.0, '又 $14.1^2 = 198.81 \\lt 200 \\lt 201.64 = 14.2^2$',
            { color: INK, size: 15 });
          S.addText('s4-ans-5', -9.0, 0.8, '所以 $\\sqrt{200} \\approx 14.1$（精确到 0.1 m）',
            { color: WARM, size: 16 });
          S.addText('s4-ans-6', -9.0, -0.5, '答：广场边长约为 $\\mathbf{14.1}$ 米。',
            { color: WARM, size: 18 });

          P.renderCard(
            '<b>解题过程</b><br>' +
            '设边长 $x$ m，$x = \\sqrt{200}$<br>' +
            '$14^2 = 196 \\lt 200 \\lt 225 = 15^2$，$\\Rightarrow 14 \\lt \\sqrt{200} \\lt 15$<br>' +
            '$14.1^2 = 198.81 \\lt 200$，$14.2^2 = 201.64 \\gt 200$<br>' +
            '$\\Rightarrow \\sqrt{200} \\approx 14.1$<br>' +
            '<b>答：广场边长约为 14.1 米。</b>',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
