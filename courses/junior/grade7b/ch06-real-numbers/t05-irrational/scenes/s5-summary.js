(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '今天我们学习了无理数与实数。最核心的关系是：<b>实数 = 有理数 + 无理数</b>。有理数可以写成分数或有限（无限循环）小数；无理数是无限不循环小数，不能写成分数。这两大类合在一起，构成了完整的实数体系。',
        enter: function (anim) {
          // 大总结示意图：三个层次的矩形套叠
          // 外层：实数
          S.addPolygon('sum-real', [
            [-9, -5.5], [9, -5.5], [9, 6.5], [-9, 6.5]
          ], { fillColor: AMBER, opacity: 0.07, strokeColor: AMBER, borderWidth: 2.5 });
          S.addText('sum-real-lbl', 0, 6.0,
            '实数', { color: AMBER, size: 20, anchorX: 'middle' });

          // 左侧：有理数
          S.addPolygon('sum-rat', [
            [-8.5, -5.0], [-0.5, -5.0], [-0.5, 5.5], [-8.5, 5.5]
          ], { fillColor: COOL, opacity: 0.10, strokeColor: COOL, borderWidth: 2 });
          S.addText('sum-rat-lbl', -4.5, 5.0,
            '有理数', { color: COOL, size: 17, anchorX: 'middle' });

          // 有理数内：整数
          S.addPolygon('sum-int', [
            [-8.0, -4.5], [-3.0, -4.5], [-3.0, 1.5], [-8.0, 1.5]
          ], { fillColor: COOL, opacity: 0.13, strokeColor: COOL, borderWidth: 1.5 });
          S.addText('sum-int-lbl', -5.5, 1.1,
            '整数', { color: COOL, size: 15, anchorX: 'middle' });
          S.addText('sum-int-eg', -5.5, -0.5,
            '$-2,-1,0,1,2,3$', { color: INK, size: 13, anchorX: 'middle' });
          S.addText('sum-int-note', -5.5, -2.0,
            '正整数、$0$、负整数', { color: COOL, size: 13, anchorX: 'middle' });

          // 有理数内：分数
          S.addPolygon('sum-frac', [
            [-2.8, -4.5], [-0.8, -4.5], [-0.8, 1.5], [-2.8, 1.5]
          ], { fillColor: GREEN, opacity: 0.13, strokeColor: GREEN, borderWidth: 1.5 });
          S.addText('sum-frac-lbl', -1.8, 1.1,
            '分数', { color: GREEN, size: 15, anchorX: 'middle' });
          S.addText('sum-frac-eg', -1.8, -0.5,
            '$\\dfrac{1}{2},-\\dfrac{2}{3}$', { color: INK, size: 13, anchorX: 'middle' });

          // 右侧：无理数
          S.addPolygon('sum-irr', [
            [0.3, -5.0], [8.5, -5.0], [8.5, 5.5], [0.3, 5.5]
          ], { fillColor: WARM, opacity: 0.10, strokeColor: WARM, borderWidth: 2 });
          S.addText('sum-irr-lbl', 4.4, 5.0,
            '无理数', { color: WARM, size: 17, anchorX: 'middle' });
          S.addText('sum-irr-def', 4.4, 3.5,
            '无限不循环小数', { color: INK, size: 14, anchorX: 'middle' });
          S.addText('sum-irr-eg', 4.4, 2.0,
            '$\\sqrt{2},\\;\\sqrt{3},\\;\\pi,\\;2\\pi$', { color: INK, size: 14, anchorX: 'middle' });
          S.addText('sum-irr-eg2', 4.4, 0.5,
            '$0.101001\\cdots$', { color: INK, size: 13, anchorX: 'middle' });

          P.renderCard(
            '<b>实数 = 有理数 ∪ 无理数</b><br>' +
            '两者没有交集，合在一起是全部实数');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '最后送给大家三句判断口诀：① <b>看小数形式</b>——有限小数、无限循环→有理数；无限不循环→无理数。② <b>看根号</b>——开得尽（如 $\\sqrt{9}=3$）是有理数；开不尽是无理数。③ <b>看 $\\pi$</b>——含 $\\pi$ 的通常是无理数，但含 $\\pi$ 的有理倍（如 $0\\cdot\\pi=0$）要具体分析。记住这三条，再难的分类题也难不倒你！',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['判断口诀', '举例', '结论'],
            rows: [
              ['有限 / 无限循环', '$0.25$、$0.\\overline{3}$', '有理数'],
              ['无限不循环', '$\\sqrt{2}$、$\\pi$', '无理数'],
              ['根号开得尽', '$\\sqrt{9}=3$、$\\sqrt{4}=2$', '有理数'],
              ['根号开不尽', '$\\sqrt{7}$、$\\sqrt{3}$', '无理数'],
            ]
          });
          P.renderCard(
            '<b>本课核心</b><br>' +
            '实数 = 有理数 + 无理数<br>' +
            '无理数 = 无限不循环小数<br>' +
            '带根号 ≠ 一定是无理数！', 'warm');
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
