// s3-tree.js  环节三：有理数与按定义分类（3步）
// 对应教学设计环节三：概念形成——有理数与按定义分类
// 数学验算：
//   有理数 = 整数 + 分数；共5片叶子（正整数/0/负整数/正分数/负分数）
//   即时练习：-7/4 是负分数（∵ 带负号、分母≠0）；2022 是正整数（∵ 大于0的整数）
//   树形图层次：根→整数/分数→正整数/0/负整数/正分数/负分数
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ──── 树形图节点坐标（bbox [-10,8,10,-5]）────
  // 层0（根）：有理数
  var ROOT_X = 0,   ROOT_Y = 6.8;
  // 层1：整数 / 分数
  var INT_X  = -5,  INT_Y  = 4.2;
  var FRAC_X =  5,  FRAC_Y = 4.2;
  // 层2（整数下三叶）
  var POSINT_X = -8,  POSINT_Y = 1.5;
  var ZERO_X   = -5,  ZERO_Y   = 1.5;
  var NEGINT_X = -2,  NEGINT_Y = 1.5;
  // 层2（分数下两叶）
  var POSFRAC_X =  3.2, POSFRAC_Y = 1.5;
  var NEGFRAC_X =  7.2, NEGFRAC_Y = 1.5;

  // 叶子示例数坐标（层3）
  var EX_POSINT_Y = -0.3;
  var EX_ZERO_Y   = -0.3;
  var EX_NEGINT_Y = -0.3;
  var EX_POSFRAC_Y = -0.3;
  var EX_NEGFRAC_Y = -0.3;

  // 节点绘制辅助（addPolygon 矩形背景 + addText 标签）
  function drawNode(id, cx, cy, w, h, fillColor, labelStr, labelSize) {
    var lsize = labelSize || 15;
    var hw = w / 2, hh = h / 2;
    S.addPolygon(id + '-bg', [
      [cx - hw, cy - hh],
      [cx + hw, cy - hh],
      [cx + hw, cy + hh],
      [cx - hw, cy + hh]
    ], { fillColor: fillColor, opacity: 0.15, strokeColor: fillColor, borderWidth: 2 });
    S.addText(id + '-lbl', cx, cy - 0.08, labelStr,
      { color: fillColor, size: lsize, anchorX: 'middle' });
  }

  var scene = {
    id: 's3',
    title: '三、有理数与按定义分类',
    bbox: [-10, 8, 10, -5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：给出定义 + 树根
      {
        narration: '好，揭晓了！整数和分数这两大家族合在一起，统称有理数。这就是有理数的定义——整数和分数统称有理数。我们刚才整理的那9个数，全部都是有理数。现在来画一棵有理数的分类树，先放上根节点"有理数"。',
        enter: function (anim) {
          drawNode('root', ROOT_X, ROOT_Y, 3.8, 1.0, TEAL, '有 理 数', 18);

          P.renderCard(
            '<b>有理数的定义</b><br>' +
            '整数和分数统称<b>有理数</b>。<br>' +
            '$15, -3.9, 0, \\dfrac{4}{5}, -10, -\\dfrac{2}{3}, 0.1, 128, -80$<br>' +
            '以上9个数全部都是有理数。'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 2：分类树逐层生长
      {
        narration: '分类树从根节点开始生长——有理数先分成整数和分数两枝；整数再长出三片叶子：正整数（15、128）、0、负整数（-10、-80）；分数再长出两片叶子：正分数（4/5、0.1）、负分数（-2/3、-3.9）。整棵树共五片叶子，9个数每人落一个位置，一个都不多、一个都不少——这叫不重不漏！',
        enter: function (anim) {
          if (!anim) {
            // 快放：一次性画全
            // 枝1：根 → 整数
            S.addSegment('s3-br-ri', [ROOT_X, ROOT_Y - 0.5], [INT_X, INT_Y + 0.5],
              { color: COOL, width: 2.5, dash: 0 });
            // 枝2：根 → 分数
            S.addSegment('s3-br-rf', [ROOT_X, ROOT_Y - 0.5], [FRAC_X, FRAC_Y + 0.5],
              { color: GREEN, width: 2.5, dash: 0 });
            // 层1节点
            drawNode('int',  INT_X,  INT_Y,  2.8, 0.9, COOL,  '整  数', 16);
            drawNode('frac', FRAC_X, FRAC_Y, 2.8, 0.9, GREEN, '分  数', 16);
            // 枝：整数 → 三叶
            S.addSegment('s3-br-ipi', [INT_X, INT_Y - 0.45], [POSINT_X, POSINT_Y + 0.45],
              { color: COOL, width: 1.8, dash: 0 });
            S.addSegment('s3-br-i0',  [INT_X, INT_Y - 0.45], [ZERO_X, ZERO_Y + 0.45],
              { color: INK,  width: 1.8, dash: 0 });
            S.addSegment('s3-br-ini', [INT_X, INT_Y - 0.45], [NEGINT_X, NEGINT_Y + 0.45],
              { color: WARM, width: 1.8, dash: 0 });
            // 枝：分数 → 两叶
            S.addSegment('s3-br-fpf', [FRAC_X, FRAC_Y - 0.45], [POSFRAC_X, POSFRAC_Y + 0.45],
              { color: GREEN, width: 1.8, dash: 0 });
            S.addSegment('s3-br-fnf', [FRAC_X, FRAC_Y - 0.45], [NEGFRAC_X, NEGFRAC_Y + 0.45],
              { color: WARM, width: 1.8, dash: 0 });
            // 叶子节点
            drawNode('posint', POSINT_X, POSINT_Y, 2.5, 0.85, COOL,  '正整数', 14);
            drawNode('zero',   ZERO_X,   ZERO_Y,   1.8, 0.85, INK,   '$0$',    14);
            drawNode('negint', NEGINT_X, NEGINT_Y, 2.5, 0.85, WARM,  '负整数', 14);
            drawNode('posfrac', POSFRAC_X, POSFRAC_Y, 2.5, 0.85, GREEN, '正分数', 14);
            drawNode('negfrac', NEGFRAC_X, NEGFRAC_Y, 2.5, 0.85, WARM,  '负分数', 14);
            // 示例数
            S.addText('s3-ex-pi', POSINT_X, EX_POSINT_Y, '$15, 128$', { color: COOL, size: 12, anchorX: 'middle' });
            S.addText('s3-ex-0',  ZERO_X,   EX_ZERO_Y,   '$0$',       { color: INK,  size: 12, anchorX: 'middle' });
            S.addText('s3-ex-ni', NEGINT_X, EX_NEGINT_Y, '$-10,-80$', { color: WARM, size: 12, anchorX: 'middle' });
            S.addText('s3-ex-pf', POSFRAC_X, EX_POSFRAC_Y, '$\\dfrac{4}{5},0.1$', { color: GREEN, size: 11, anchorX: 'middle' });
            S.addText('s3-ex-nf', NEGFRAC_X, EX_NEGFRAC_Y, '$-\\dfrac{2}{3},-3.9$', { color: WARM, size: 11, anchorX: 'middle' });

            P.renderCard(
              '<b>按定义分类</b>：共 5 片叶子<br>' +
              '正整数 / $0$ / 负整数 / 正分数 / 负分数<br>' +
              '9个数各落一处，<b>不重不漏</b>。'
            );
            return null;
          }

          // 动画：逐步长出
          // 先画层1枝和节点
          S.addSegment('s3-br-ri', [ROOT_X, ROOT_Y - 0.5], [INT_X, INT_Y + 0.5],
            { color: COOL, width: 2.5, dash: 0 });
          S.addSegment('s3-br-rf', [ROOT_X, ROOT_Y - 0.5], [FRAC_X, FRAC_Y + 0.5],
            { color: GREEN, width: 2.5, dash: 0 });
          drawNode('int',  INT_X,  INT_Y,  2.8, 0.9, COOL,  '整  数', 16);
          drawNode('frac', FRAC_X, FRAC_Y, 2.8, 0.9, GREEN, '分  数', 16);

          return delay(600).then(function () {
            // 整数 → 三叶
            S.addSegment('s3-br-ipi', [INT_X, INT_Y - 0.45], [POSINT_X, POSINT_Y + 0.45],
              { color: COOL, width: 1.8, dash: 0 });
            S.addSegment('s3-br-i0',  [INT_X, INT_Y - 0.45], [ZERO_X, ZERO_Y + 0.45],
              { color: INK,  width: 1.8, dash: 0 });
            S.addSegment('s3-br-ini', [INT_X, INT_Y - 0.45], [NEGINT_X, NEGINT_Y + 0.45],
              { color: WARM, width: 1.8, dash: 0 });
            drawNode('posint', POSINT_X, POSINT_Y, 2.5, 0.85, COOL,  '正整数', 14);
            drawNode('zero',   ZERO_X,   ZERO_Y,   1.8, 0.85, INK,   '$0$',    14);
            drawNode('negint', NEGINT_X, NEGINT_Y, 2.5, 0.85, WARM,  '负整数', 14);
            return delay(600);
          }).then(function () {
            // 分数 → 两叶
            S.addSegment('s3-br-fpf', [FRAC_X, FRAC_Y - 0.45], [POSFRAC_X, POSFRAC_Y + 0.45],
              { color: GREEN, width: 1.8, dash: 0 });
            S.addSegment('s3-br-fnf', [FRAC_X, FRAC_Y - 0.45], [NEGFRAC_X, NEGFRAC_Y + 0.45],
              { color: WARM, width: 1.8, dash: 0 });
            drawNode('posfrac', POSFRAC_X, POSFRAC_Y, 2.5, 0.85, GREEN, '正分数', 14);
            drawNode('negfrac', NEGFRAC_X, NEGFRAC_Y, 2.5, 0.85, WARM,  '负分数', 14);
            return delay(600);
          }).then(function () {
            // 示例数挂上
            S.addText('s3-ex-pi', POSINT_X, EX_POSINT_Y, '$15, 128$', { color: COOL, size: 12, anchorX: 'middle' });
            S.addText('s3-ex-0',  ZERO_X,   EX_ZERO_Y,   '$0$',       { color: INK,  size: 12, anchorX: 'middle' });
            S.addText('s3-ex-ni', NEGINT_X, EX_NEGINT_Y, '$-10,-80$', { color: WARM, size: 12, anchorX: 'middle' });
            S.addText('s3-ex-pf', POSFRAC_X, EX_POSFRAC_Y, '$\\dfrac{4}{5},0.1$', { color: GREEN, size: 11, anchorX: 'middle' });
            S.addText('s3-ex-nf', NEGFRAC_X, EX_NEGFRAC_Y, '$-\\dfrac{2}{3},-3.9$', { color: WARM, size: 11, anchorX: 'middle' });

            P.renderCard(
              '<b>按定义分类</b>：共 5 片叶子<br>' +
              '正整数 / $0$ / 负整数 / 正分数 / 负分数<br>' +
              '9个数各落一处，<b>不重不漏</b>。',
              'teal'
            );
            return delay(300);
          });
        }
      },

      // Step 3：即时练习
      {
        narration: '来做个即时练习！给你两个新数：负四分之七，和 2022。它们落在树的哪个叶子上？（学生思考）揭晓：负四分之七带负号，是分数，所以它是负分数，落在"负分数"叶子；2022 是大于零的整数，所以它是正整数，落在"正整数"叶子。你说对了吗？',
        enter: function (anim) {
          // 题目：-7/4 和 2022 落在哪个叶子
          S.actor('s3-prac-q', 0, 7.5, '即时练习：$-\\dfrac{7}{4}$ 和 $2022$ 各落哪个叶子？', { color: TEAL, size: 15, bold: true });

          // 高亮 -7/4 → 负分数叶
          S.addSegment('s3-hl-nf', [0, -2.0], [NEGFRAC_X, NEGFRAC_Y - 0.45],
            { color: WARM, width: 2.5, dash: 2 });
          S.actor('s3-ans-nf', 0, -2.5, '$-\\dfrac{7}{4}$ → 负分数', { color: WARM, size: 15, bold: true });

          // 高亮 2022 → 正整数叶
          S.addSegment('s3-hl-pi', [0, -3.5], [POSINT_X, POSINT_Y - 0.45],
            { color: COOL, width: 2.5, dash: 2 });
          S.actor('s3-ans-pi', 0, -4.0, '$2022$ → 正整数', { color: COOL, size: 15, bold: true });

          P.renderCard(
            '<b>即时练习答案</b><br>' +
            '$-\\dfrac{7}{4}$：带负号、是分数 → <b>负分数</b><br>' +
            '$2022$：大于 $0$ 的整数 → <b>正整数</b>',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
