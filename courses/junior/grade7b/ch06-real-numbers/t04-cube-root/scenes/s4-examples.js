(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';
  var INK = '#455a64', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 例题数据
  var EXAMPLES = [
    {
      q: '$\\sqrt[3]{64}$',
      hint: '思路：找数 $x$ 使 $x^3 = 64$，即 $4^3 = 64$',
      ans: '$\\sqrt[3]{64} = 4$',
      check: '$4^3 = 64$ ✓',
      color: WARM
    },
    {
      q: '$\\sqrt[3]{-125}$',
      hint: '思路：$(-5)^3 = -125$，负数立方根为负数',
      ans: '$\\sqrt[3]{-125} = -5$',
      check: '$(-5)^3 = -125$ ✓',
      color: COOL
    },
    {
      q: '$\\sqrt[3]{0}$',
      hint: '思路：$0^3 = 0$',
      ans: '$\\sqrt[3]{0} = 0$',
      check: '$0^3 = 0$ ✓',
      color: GREEN
    },
    {
      q: '$\\sqrt[3]{\\dfrac{8}{27}}$',
      hint: '思路：$\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}$',
      ans: '$\\sqrt[3]{\\dfrac{8}{27}} = \\dfrac{2}{3}$',
      check: '$\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}$ ✓',
      color: PURPLE
    },
  ];

  var scene = {
    id: 's4',
    title: '四、例题练习',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：出示所有题目，遮挡答案
        narration: '接下来做几道例题巩固立方根的求法。核心思路：找一个数，使它的立方等于被开方数。题目如下，请先试着自己解答。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s4-title', 0, 9.2,
            '例题：求下列各数的立方根', { color: INK, size: 20, anchorX: 'middle' });

          var ys = [7.2, 5.2, 3.2, 1.2];
          EXAMPLES.forEach(function (ex, i) {
            S.addText('s4-q' + i, -5.0, ys[i],
              '(' + (i + 1) + ') ' + ex.q + '  = ?', { color: ex.color, size: 17 });
          });

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：逐题揭示（前两题）
        narration: '第(1)题：$\\sqrt[3]{64}$。因为 $4^3 = 4 \\times 4 \\times 4 = 64$，所以 $\\sqrt[3]{64} = 4$。第(2)题：$\\sqrt[3]{-125}$。因为 $(-5)^3 = -125$，负数的立方根是负数，所以 $\\sqrt[3]{-125} = -5$。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s4-title', 0, 9.2,
            '例题：求下列各数的立方根', { color: INK, size: 20, anchorX: 'middle' });

          var ys = [7.2, 5.2, 3.2, 1.2];
          EXAMPLES.forEach(function (ex, i) {
            S.addText('s4-q' + i, -5.0, ys[i],
              '(' + (i + 1) + ') ' + ex.q, { color: ex.color, size: 17 });
          });

          // 揭示前两题答案
          S.addText('s4-a0', 0.2, 7.2,
            EXAMPLES[0].ans, { color: EXAMPLES[0].color, size: 17 });
          S.addText('s4-hint0', 0.2, 6.4,
            EXAMPLES[0].check, { color: '#888', size: 13 });

          S.addText('s4-a1', 0.2, 5.2,
            EXAMPLES[1].ans, { color: EXAMPLES[1].color, size: 17 });
          S.addText('s4-hint1', 0.2, 4.4,
            EXAMPLES[1].check, { color: '#888', size: 13 });

          P.renderCard(
            EXAMPLES[0].hint + '<br>' + EXAMPLES[0].ans + '<br><br>' +
            EXAMPLES[1].hint + '<br>' + EXAMPLES[1].ans,
            'cool', 'fadeInUp'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：揭示后两题
        narration: '第(3)题：$\\sqrt[3]{0}$。$0^3 = 0$，所以 $\\sqrt[3]{0} = 0$，零的立方根是零。第(4)题：$\\sqrt[3]{\\frac{8}{27}}$。因为 $\\left(\\frac{2}{3}\\right)^3 = \\frac{2^3}{3^3} = \\frac{8}{27}$，所以 $\\sqrt[3]{\\frac{8}{27}} = \\frac{2}{3}$。分数同样可以开立方，分子分母分别开立方即可。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s4-title', 0, 9.2,
            '例题：求下列各数的立方根', { color: INK, size: 20, anchorX: 'middle' });

          var ys = [7.2, 5.2, 3.2, 1.2];
          EXAMPLES.forEach(function (ex, i) {
            S.addText('s4-q' + i, -5.0, ys[i],
              '(' + (i + 1) + ') ' + ex.q, { color: ex.color, size: 17 });
          });

          // 全部揭示
          EXAMPLES.forEach(function (ex, i) {
            S.addText('s4-a' + i, 0.2, ys[i],
              ex.ans, { color: ex.color, size: 17 });
            S.addText('s4-hint' + i, 0.2, ys[i] - 0.8,
              ex.check, { color: '#888', size: 13 });
          });

          P.renderCard(
            EXAMPLES[2].hint + '<br>' + EXAMPLES[2].ans + '<br><br>' +
            EXAMPLES[3].hint + '<br>' + EXAMPLES[3].ans,
            'cool', 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
