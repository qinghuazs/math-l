(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var PURPLE = '#6a1b9a', AMBER = '#f57f17', TEAL = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制一个节点卡：用 addPolygon 做圆角矩形效果（用多边形近似矩形）
  // 返回 actor（可浮现）
  function drawNode(id, cx, cy, w, h, fillColor, labelStr) {
    var hw = w / 2, hh = h / 2;
    S.addPolygon(id + '-bg', [
      [cx - hw, cy - hh],
      [cx + hw, cy - hh],
      [cx + hw, cy + hh],
      [cx - hw, cy + hh]
    ], { fillColor: fillColor, opacity: 0.18, strokeColor: fillColor, borderWidth: 2 });
    S.addText(id + '-lbl', cx, cy - 0.1, labelStr,
      { color: fillColor, size: 15, anchorX: 'middle' });
  }

  // 树结构布局（坐标均在 bbox [-10,7.5,10,-7.5] 下）
  // 层0：实数（根）
  // 层1：有理数、无理数
  // 层2（有理数下）：整数、分数
  // 层3（整数下）：正整数、0、负整数

  var ROOT_X = 0, ROOT_Y = 6.0;
  var RAT_X = -4.5, RAT_Y = 3.5;
  var IRR_X = 4.5, IRR_Y = 3.5;
  var INT_X = -6.2, INT_Y = 1.0;
  var FRAC_X = -2.8, FRAC_Y = 1.0;
  var POSINT_X = -8.2, POSINT_Y = -1.5;
  var ZERO_X = -6.2, ZERO_Y = -1.5;
  var NEGINT_X = -4.2, NEGINT_Y = -1.5;

  // 备注：无理数子节点（无限不循环小数）
  var IRRSUB_X = 4.5, IRRSUB_Y = 1.0;

  var scene = {
    id: 's3',
    title: '三、实数分类树',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '有理数和无理数统称为<b>实数</b>。实数是我们目前学过的所有数的总称。现在来画一棵实数的分类树——先放上根节点"实数"。',
        enter: function (anim) {
          // 根节点
          drawNode('root', ROOT_X, ROOT_Y, 3.5, 1.0, WARM, '实  数');
          P.renderCard('<b>实数</b> = 有理数 + 无理数<br>这是目前我们所学数的完整范围。');
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '实数首先分成两大类：<b>有理数</b>和<b>无理数</b>。从根节点向左引出有理数，向右引出无理数。有理数可以写成分数 $\\dfrac{p}{q}$（$q\\neq 0$）；无理数是无限不循环小数，不能写成这种形式。',
        enter: function (anim) {
          // 树枝：根 → 有理数
          S.addSegment('br-root-rat', [ROOT_X, ROOT_Y - 0.5], [RAT_X, RAT_Y + 0.5],
            { color: COOL, width: 2.5, dash: 0 });
          // 树枝：根 → 无理数
          S.addSegment('br-root-irr', [ROOT_X, ROOT_Y - 0.5], [IRR_X, IRR_Y + 0.5],
            { color: WARM, width: 2.5, dash: 0 });
          // 层1节点
          drawNode('rat', RAT_X, RAT_Y, 3.5, 1.0, COOL, '有理数');
          drawNode('irr', IRR_X, IRR_Y, 3.5, 1.0, WARM, '无理数');

          // 无理数子说明
          S.addSegment('br-irr-sub', [IRR_X, IRR_Y - 0.5], [IRRSUB_X, IRRSUB_Y + 0.5],
            { color: WARM, width: 1.8, dash: 2 });
          drawNode('irr-sub', IRRSUB_X, IRRSUB_Y, 4.2, 0.9, WARM, '无限不循环小数');

          P.clearExtras();
          P.renderCard(
            '有理数：能写成 $\\dfrac{p}{q}$（$q\\neq 0$）<br>' +
            '无理数：无限不循环小数，不能写成分数');
          if (anim) { return delay(500); }
        },
      },
      {
        narration: '有理数还可以继续细分——分为<b>整数</b>和<b>分数</b>两类。整数是没有分数部分的有理数，如 $3$、$0$、$-5$；分数则如 $\\dfrac{1}{2}$、$-\\dfrac{3}{4}$。',
        enter: function (anim) {
          // 有理数 → 整数、分数
          S.addSegment('br-rat-int', [RAT_X, RAT_Y - 0.5], [INT_X, INT_Y + 0.5],
            { color: COOL, width: 2.0, dash: 0 });
          S.addSegment('br-rat-frac', [RAT_X, RAT_Y - 0.5], [FRAC_X, FRAC_Y + 0.5],
            { color: COOL, width: 2.0, dash: 0 });
          drawNode('int', INT_X, INT_Y, 2.8, 0.9, COOL, '整  数');
          drawNode('frac', FRAC_X, FRAC_Y, 2.8, 0.9, GREEN, '分  数');
          P.clearExtras();
          P.renderCard(
            '整数：$\\cdots,-2,-1,0,1,2,3,\\cdots$<br>' +
            '分数：$\\dfrac{1}{2},\\;-\\dfrac{3}{4},\\;0.5$（有限小数也是分数）');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '整数还能再分三小类：<b>正整数</b>（自然数中除0以外）、<b>0</b>、<b>负整数</b>。注意：$0$ 是整数，但既不是正整数也不是负整数。至此，整棵分类树完成！我们来看另一种分法：按正负分——正实数、$0$、负实数。',
        enter: function (anim) {
          // 整数 → 正整数、0、负整数
          S.addSegment('br-int-pos', [INT_X, INT_Y - 0.45], [POSINT_X, POSINT_Y + 0.45],
            { color: COOL, width: 1.8, dash: 0 });
          S.addSegment('br-int-zero', [INT_X, INT_Y - 0.45], [ZERO_X, ZERO_Y + 0.45],
            { color: COOL, width: 1.8, dash: 0 });
          S.addSegment('br-int-neg', [INT_X, INT_Y - 0.45], [NEGINT_X, NEGINT_Y + 0.45],
            { color: COOL, width: 1.8, dash: 0 });
          drawNode('posint', POSINT_X, POSINT_Y, 2.5, 0.85, COOL, '正整数');
          drawNode('zero', ZERO_X, ZERO_Y, 1.8, 0.85, INK, '$0$');
          drawNode('negint', NEGINT_X, NEGINT_Y, 2.5, 0.85, PURPLE, '负整数');

          P.clearExtras();
          // 另一种分类方式——右侧说明框
          P.renderTable({
            head: ['另一种分法（按正负）', '举例'],
            rows: [
              ['正实数', '$1,\\;\\sqrt{2},\\;\\pi$'],
              ['$0$', '$0$'],
              ['负实数', '$-3,\\;-\\sqrt{5}$'],
            ]
          });
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
