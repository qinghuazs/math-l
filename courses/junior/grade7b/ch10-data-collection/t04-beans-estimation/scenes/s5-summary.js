(function (CW) {
  'use strict';
  var S, P;
  var COOL   = '#1565c0';
  var WARM   = '#e64a19';
  var INK    = '#37474f';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';

  // 场景5：小结（2步）
  // 步骤1：标记重捕/比例估计法流程小结（用 actor 绘制流程图）
  // 步骤2：数学思想（样本估计总体）升华

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '今天学习了<b>标记重捕法</b>：第一次取出 $m$ 粒标记放回→摇匀→第二次取 $n$ 粒→数出标记粒数 $k$→建立比例→估计总数 $N \\approx \\dfrac{mn}{k}$。关键是前提：随机抽样、充分混合！',
        enter: function () {
          // 绘制流程图用 actor + 连线文字
          var steps = [
            { x: -7.5, y:  3.5, txt: '第一次取出 $m$ 粒',     color: WARM   },
            { x: -7.5, y:  1.0, txt: '做标记，放回摇匀',      color: WARM   },
            { x: -7.5, y: -1.5, txt: '第二次取出 $n$ 粒',     color: COOL   },
            { x: -7.5, y: -4.0, txt: '数出标记粒数 $k$',      color: COOL   },
            { x:  2.5, y: -4.0, txt: '建立比例方程',          color: PURPLE },
            { x:  2.5, y: -1.5, txt: '$N\\approx\\dfrac{mn}{k}$', color: GREEN  },
          ];
          steps.forEach(function (s, i) {
            S.actor('s5-step-' + i, s.x, s.y, s.txt, { color: s.color, size: 17 });
          });
          // 竖向箭头（用 addSegment 虚线）
          S.addSegment('s5-arr1', [-7.5, 3.0], [-7.5, 1.5],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s5-arr2', [-7.5, 0.5], [-7.5, -1.0],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s5-arr3', [-7.5, -2.0], [-7.5, -3.5],
            { color: INK, width: 2, dash: 0 });
          // 横向箭头（折向右侧）
          S.addSegment('s5-arr4', [-7.5, -4.0], [1.8, -4.0],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s5-arr5', [2.5, -3.5], [2.5, -2.2],
            { color: INK, width: 2, dash: 0 });

          // 误差注意
          S.addText('s5-warn', -0.5, 2.5,
            '注意：混合不充分、样本太小→误差增大',
            { size: 15, color: WARM });

          P.renderTable({
            head: ['步骤', '操作', '数据'],
            rows: [
              ['①', '第一次取出并标记', '$m$ 粒'],
              ['②', '放回，充分摇匀', '—'],
              ['③', '第二次随机取出', '$n$ 粒'],
              ['④', '数出标记粒数', '$k$ 粒'],
              ['⑤', '计算估计值', '$N\\approx\\frac{mn}{k}$'],
            ],
          });
        },
      },
      {
        narration: '这节课的<b>数学思想</b>：用<b>样本</b>估计<b>总体</b>——我们不可能调查所有对象时，通过有代表性的样本推断总体。这种思想在统计学、生态学、社会调查中无处不在！',
        enter: function () {
          P.clearExtras();
          P.renderCard(
            '<b>本节数学思想</b><br>' +
            '用<b>样本</b>估计<b>总体</b><br><br>' +
            '• 样本比例 $\\approx$ 总体比例<br>' +
            '• 随机抽样是关键<br>' +
            '• 样本容量越大，估计越精确<br><br>' +
            '<b>公式：</b>$N \\approx \\dfrac{mn}{k}$',
            'cool', 'flipInX'
          );
          // 黑板左侧画"总体—样本"示意
          S.addCircle('s5-c-total', -5.0, -1.0, 4.0,
            { color: COOL, width: 3, fill: COOL, fillOpacity: 0.07 });
          S.addCircle('s5-c-sample', -5.0, -1.0, 1.8,
            { color: WARM, width: 3, fill: WARM, fillOpacity: 0.15 });
          S.actor('s5-lbl-t', -5.0, 2.5,  '总体', { color: COOL, size: 18 });
          S.actor('s5-lbl-s', -5.0, -1.0, '样本', { color: WARM, size: 18 });
          S.addText('s5-arrow-lbl', -5.0, -5.8,
            '样本比例 $\\approx$ 总体比例 → 推断总数',
            { size: 16, color: GREEN });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
