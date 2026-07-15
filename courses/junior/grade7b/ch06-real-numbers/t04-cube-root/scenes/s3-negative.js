(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';
  var INK = '#455a64', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、负数的立方根',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：负数有立方根——与平方根对比
        narration: '负数有没有立方根？答案是<b>有</b>！比如 $\\sqrt[3]{-8} = -2$，因为 $(-2)^3 = -8$。负数的立方根是负数。这一点与平方根完全不同——负数没有平方根，但<b>一定有立方根</b>。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s3-title', 0, 9,
            '负数的立方根', { color: INK, size: 22, anchorX: 'middle' });

          // 对比展示区：左侧平方根，右侧立方根
          S.addText('s3-h1', -4.2, 7.5, '平方根', { color: WARM, size: 18 });
          S.addText('s3-h2', 1.2, 7.5, '立方根', { color: COOL, size: 18 });

          // 正数
          S.addText('s3-r1a', -5.5, 5.8, '$\\sqrt{9} = \\pm 3$', { color: WARM, size: 15 });
          S.addText('s3-r2a', 0.0, 5.8, '$\\sqrt[3]{8} = 2$', { color: COOL, size: 15 });

          // 零
          S.addText('s3-r1b', -5.5, 4.2, '$\\sqrt{0} = 0$', { color: WARM, size: 15 });
          S.addText('s3-r2b', 0.0, 4.2, '$\\sqrt[3]{0} = 0$', { color: COOL, size: 15 });

          // 负数——关键对比
          S.addText('s3-r1c', -5.5, 2.6,
            '$\\sqrt{-9}$ = ？', { color: WARM, size: 15 });
          S.addText('s3-r2c', 0.0, 2.6,
            '$\\sqrt[3]{-8} = -2$', { color: COOL, size: 15 });

          // 分隔线
          S.addSegment('s3-div', [-0.5, 8.2], [-0.5, 1.2],
            { color: '#90a4ae', width: 1.5, dash: 0 });

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：验证 √[3]{-8} = -2，并揭示 √[3]{-9} 无意义 vs 有意义
        narration: '验证：$(-2)^3 = (-2) \\times (-2) \\times (-2) = 4 \\times (-2) = -8$，所以 $\\sqrt[3]{-8} = -2$ ✓。而 $\\sqrt{-9}$ 在实数范围内<b>无意义</b>（没有实数的平方等于负数），但 $\\sqrt[3]{-9}$ <b>有意义</b>，因为每个实数都有唯一立方根。',
        enter: function (anim) {
          S.addText('s3-title', 0, 9,
            '负数的立方根', { color: INK, size: 22, anchorX: 'middle' });
          S.addText('s3-h1', -4.2, 7.5, '平方根', { color: WARM, size: 18 });
          S.addText('s3-h2', 1.2, 7.5, '立方根', { color: COOL, size: 18 });
          S.addText('s3-r1a', -5.5, 5.8, '$\\sqrt{9} = \\pm 3$', { color: WARM, size: 15 });
          S.addText('s3-r2a', 0.0, 5.8, '$\\sqrt[3]{8} = 2$', { color: COOL, size: 15 });
          S.addText('s3-r1b', -5.5, 4.2, '$\\sqrt{0} = 0$', { color: WARM, size: 15 });
          S.addText('s3-r2b', 0.0, 4.2, '$\\sqrt[3]{0} = 0$', { color: COOL, size: 15 });
          // 负数行标红强调
          S.addText('s3-r1c', -5.5, 2.6,
            '$\\sqrt{-9}$：<b>无意义</b>', { color: WARM, size: 15 });
          S.addText('s3-r2c', 0.0, 2.6,
            '$\\sqrt[3]{-8} = -2$ ✓', { color: COOL, size: 15 });
          S.addSegment('s3-div', [-0.5, 8.2], [-0.5, 1.2],
            { color: '#90a4ae', width: 1.5, dash: 0 });

          // 验证步骤
          S.addText('s3-verify', -4.5, 0.5,
            '验证：$(-2)^3 = -8$ ✓', { color: GREEN, size: 16 });

          P.clearExtras();
          P.renderCard(
            '<b>结论</b><br>' +
            '负数<b>没有</b>平方根（实数范围）<br>' +
            '负数<b>有且只有一个</b>立方根，且立方根也是负数',
            'warm', 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：互为相反数性质 ∛(-a) = -∛a
        narration: '立方根还有一个重要性质：$\\sqrt[3]{-a} = -\\sqrt[3]{a}$。比如 $\\sqrt[3]{-8} = -\\sqrt[3]{8} = -2$；$\\sqrt[3]{-27} = -\\sqrt[3]{27} = -3$。这是因为立方运算满足 $(-x)^3 = -(x^3)$，所以负号可以"提"到根号外面。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s3-prop-title', 0, 9,
            '立方根的符号性质', { color: INK, size: 22, anchorX: 'middle' });

          S.addText('s3-prop', -4.5, 7.2,
            '$\\sqrt[3]{-a} = -\\sqrt[3]{a}$', { color: PURPLE, size: 20 });
          S.addText('s3-reason', -4.5, 5.8,
            '原因：$(-x)^3 = -(x^3)$，负号可提出根号', { color: INK, size: 15 });

          S.addText('s3-ex1', -4.5, 4.2,
            '例 1：$\\sqrt[3]{-8} = -\\sqrt[3]{8} = -2$', { color: WARM, size: 16 });
          S.addText('s3-ex2', -4.5, 2.8,
            '例 2：$\\sqrt[3]{-27} = -\\sqrt[3]{27} = -3$', { color: COOL, size: 16 });
          S.addText('s3-ex3', -4.5, 1.4,
            '例 3：$\\sqrt[3]{-125} = -\\sqrt[3]{125} = -5$', { color: GREEN, size: 16 });

          P.renderCard(
            '$\\sqrt[3]{-a} = -\\sqrt[3]{a}$<br>' +
            '负号可以保留在根号内，也可以提到根号外<br>' +
            '<small>注意：平方根没有此性质（$\\sqrt{-a}$ 无意义）</small>',
            'cool', 'fadeInUp'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
