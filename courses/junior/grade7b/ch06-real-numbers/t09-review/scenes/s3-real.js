// s3-real.js  实数概念复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴，bbox [-10,7.5,10,-7.5]，画在y=1附近
  function drawNumberLine() {
    var Y = 1.5;
    S.addSegment('ax', [-9.5, Y], [9.5, Y], { color: INK, width: 2.5, dash: 0 });
    // 刻度 0,1,2,3,以及-1,-2
    var ticks = [-3, -2, -1, 0, 1, 2, 3];
    for (var i = 0; i < ticks.length; i++) {
      var x = ticks[i] * 1.8;
      S.addSegment('atk' + i, [x, Y - 0.25], [x, Y + 0.25], { color: INK, width: 1.5, dash: 0 });
      S.addText('atl' + i, x - 0.1, Y - 0.7, '' + ticks[i], { size: 13, color: INK });
    }
    // √2≈1.414，落在数轴上（x=1.414*1.8≈2.545）
    S.dropPoint('ax-sqrt2', 2.55, Y, { color: RED, name: '', size: 3, animate: false });
    S.addText('ax-sqrt2-lbl', 2.3, Y + 0.6, '$\\sqrt{2}$', { size: 14, color: RED });
    // π≈3.14，x=3.14*1.8≈5.65
    S.dropPoint('ax-pi', 5.65, Y, { color: PURPLE, name: '', size: 3, animate: false });
    S.addText('ax-pi-lbl', 5.4, Y + 0.6, '$\\pi$', { size: 14, color: PURPLE });
    // -√5≈-2.236，x=-2.236*1.8≈-4.025
    S.dropPoint('ax-nsqrt5', -4.02, Y, { color: ORANGE, name: '', size: 3, animate: false });
    S.addText('ax-nsqrt5-lbl', -4.6, Y + 0.6, '$-\\sqrt{5}$', { size: 13, color: ORANGE });
    S.addText('ax-note', -1, -0.2, '实数与数轴上的点一一对应', { size: 14, color: TEAL, anchorX: 'middle' });
  }

  var scene = {
    id: 's3',
    title: '三、实数概念复习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：分类快判（含陷阱数）
        narration: '实数概念复习，先来一组"快判"练习——对这组数一一判断有理数还是无理数，里面有几个陷阱：$\\dfrac{22}{7}$ 是分数，是有理数（虽然近似 $\\pi$ 但不等于 $\\pi$）；$\\sqrt{16}=4$，是整数，是有理数（带根号不一定是无理数）；$0.121212\\cdots$ 是循环小数，也是有理数。真正的无理数只有 $\\sqrt{3}$ 和 $\\pi$。',
        enter: function (anim) {
          P.renderTable({
            head: ['数', '分类', '理由'],
            rows: [
              ['$\\sqrt{4}=2$', '有理数（整数）', '结果是整数 $2$'],
              ['$\\sqrt{3}$', '无理数', '无限不循环小数，约$1.732\\cdots$'],
              ['$-\\dfrac{5}{7}$', '有理数（分数）', '分数即有理数'],
              ['$\\pi$', '无理数', '无限不循环小数'],
              ['$\\dfrac{22}{7}$', '有理数（分数）⚠', '$\\dfrac{22}{7}\\neq\\pi$，它是分数'],
              ['$\\sqrt{16}=4$', '有理数（整数）⚠', '带根号≠无理数'],
              ['$0.121212\\cdots$', '有理数（循环小数）⚠', '循环小数是有理数'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：数轴与实数点的一一对应
        narration: '实数与数轴的关系是本章的核心结论：数轴上的每一个点对应一个实数，每一个实数也对应数轴上的一个点，这就叫"一一对应"。请看画板——$\\sqrt{2}$ 约为 $1.414$，落在 $1$ 和 $2$ 之间；$\\pi$ 约为 $3.14$，落在 $3$ 和 $4$ 之间；$-\\sqrt{5}$ 约为 $-2.236$，落在 $-3$ 和 $-2$ 之间。这些无理数实实在在地"住"在数轴上！',
        enter: function (anim) {
          drawNumberLine();
          P.renderCard(
            '<b>实数与数轴：一一对应</b><br>' +
            '每个实数 → 数轴上唯一的点<br>' +
            '数轴上每个点 → 唯一的实数<br><br>' +
            '$1 < \\sqrt{2} < 2$（$\\sqrt{2}\\approx1.414$）<br>' +
            '$3 < \\pi < 4$（$\\pi\\approx3.14$）<br>' +
            '$-3 < -\\sqrt{5} < -2$（$-\\sqrt{5}\\approx-2.236$）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：大小比较例题（√10 vs 3.2）
        narration: '实数比较大小，当两个数都不是整数时，用"平方比较法"。例题：比较 $\\sqrt{10}$ 与 $3.2$ 的大小。因为 $3.2^2=10.24$，而 $10<10.24$，所以 $\\sqrt{10}<\\sqrt{10.24}=3.2$。方法总结：两个正数比大小，先平方，哪个平方大，原数就大——这是本章比较实数大小的标准套路！',
        enter: function (anim) {
          S.addText('cmp-t', -9, 6.5, '例题：比较 $\\sqrt{10}$ 与 $3.2$ 的大小', { size: 16, color: INK });
          S.addText('cmp-s1', -9, 5.4, '方法：平方比较', { size: 15, color: BLUE });
          S.addText('cmp-s2', -9, 4.4, '$3.2^2 = 10.24$', { size: 15, color: ORANGE });
          S.addText('cmp-s3', -9, 3.4, '$10 < 10.24$', { size: 15, color: ORANGE });
          S.addText('cmp-s4', -9, 2.4, '$\\therefore \\sqrt{10} < \\sqrt{10.24} = 3.2$', { size: 15, color: GREEN });

          S.addSegment('cmp-div', [-9, 1.7], [9, 1.7], { color: '#b0bec5', width: 1, dash: 2 });
          S.addText('cmp-gen', -9, 1.1, '一般方法：', { size: 14, color: TEAL });
          S.addText('cmp-g1', -9, 0.2, '正数 $a、b$：若 $a^2 > b^2$ 则 $a > b$', { size: 13, color: TEAL });
          S.addText('cmp-g2', -9, -0.8, '（前提：$a,b$ 均为正数）', { size: 12, color: INK });
          S.addText('cmp-g3', -9, -1.8, '也可估算：$3^2=9,\\;4^2=16$，$3<\\sqrt{10}<4$', { size: 13, color: PURPLE });

          P.renderCard(
            '<b>例题解答</b><br>' +
            '比较 $\\sqrt{10}$ 与 $3.2$<br><br>' +
            '$3.2^2 = 10.24 > 10$<br>' +
            '∴ $\\sqrt{10} < 3.2$<br><br>' +
            '<b>口诀：两正数比大小，平方后谁大谁就大</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
