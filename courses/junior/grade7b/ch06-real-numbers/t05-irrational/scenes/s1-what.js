(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、$\\sqrt{2}$ 是什么数',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们好！上节课我们学了平方根，知道 $\\sqrt{2}$ 是满足 $x^2=2$ 的正数。那 $\\sqrt{2}$ 到底等于多少？它是一个分数吗？是一个有限小数吗？请先想一想。',
        enter: function (anim) {
          // 正方形：边长1，对角线 = sqrt(2)
          S.addPolygon('sq', [[-2, -2.5], [2, -2.5], [2, 1.5], [-2, 1.5]],
            { fillColor: COOL, opacity: 0.12, strokeColor: COOL, borderWidth: 2 });
          S.addText('sq-label', 0, -0.5, '面积 $= 2$', { color: COOL, size: 16, anchorX: 'middle' });
          // 边长标注
          S.addText('side-b', 0, -3.0, '边长 $= 1$', { color: COOL, size: 15, anchorX: 'middle' });
          // 对角线
          S.addSegment('diag', [-2, -2.5], [2, 1.5], { color: WARM, width: 3, dash: 0 });
          S.addText('diag-q', 0.8, -0.6, '对角线 $=\\,?$', { color: WARM, size: 15 });
          P.renderCard('正方形边长为 $1$<br>对角线满足 $x^2 = 1^2 + 1^2 = 2$<br>所以对角线 $= \\sqrt{2}$');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '用计算器计算可以得到：$\\sqrt{2} = 1.41421356\\cdots$ 小数点后的数字永远不会终止，也永远不会出现循环的节。我们来对比一下——$\\frac{1}{3}$ 的小数展开是 $0.333\\cdots$，是无限循环小数，可以写成分数。但 $\\sqrt{2}$ 呢？',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['数', '小数形式', '特点'],
            rows: [
              ['$\\dfrac{1}{3}$', '$0.333\\cdots$', '无限<b>循环</b>'],
              ['$0.25$', '$0.25$', '有限小数'],
              ['$\\sqrt{2}$', '$1.41421356\\cdots$', '无限<b>不循环</b>？'],
            ]
          });
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '关键问题来了：$\\sqrt{2}$ 能写成分数 $\\dfrac{p}{q}$（$p$、$q$ 为整数，$q\\neq 0$）吗？数学上可以严格证明：<b>不能！</b> $\\sqrt{2}$ 是一个无限不循环小数，它不是有理数。那它是什么数？这就是我们今天要揭晓的答案。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '$\\sqrt{2} = 1.41421356\\cdots$<br>' +
            '<b>无限</b>：小数位永不终止<br>' +
            '<b>不循环</b>：没有重复的节<br>' +
            '<span style="color:#e64a19">不能写成分数形式！</span>', 'warm');
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
