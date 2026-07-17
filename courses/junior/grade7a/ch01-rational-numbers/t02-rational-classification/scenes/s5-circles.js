// s5-circles.js  环节五：数的集合圈——把数放回家（3步）
// 对应教学设计环节五：数的集合圈——把数放回家
// 数学验算：
//   第一组（按定义）：最外圈"有理数"，内分"整数圈"（含正整数区/0区/负整数区）
//                   和"分数圈"（含正分数区/负分数区）
//   各数归属：15→正整数区；0→0区；-10→负整数区；128→正整数区；-80→负整数区
//            4/5→正分数区；0.1→正分数区；-2/3→负分数区；-3.9→负分数区
//   追问：-3.9 → 负分数区（∵ -3.9 是负分数，不是负整数）
//   NOTE: 此场景画集合圈，必须 board:{axis:false, keepAspect:true} 防圆被拉成椭圆
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

  // bbox [-8.5, 8.5, 8.5, -8.5]（正方形，keepAspect）
  // 有理数圈（最外）：圆心(0,0)，半径 7.5
  // 整数圈（左半）：圆心(-2.5, 0.5)，半径 4.2
  // 分数圈（右半）：圆心(3.0, 0.0)，半径 3.2

  var scene = {
    id: 's5',
    title: '五、数的集合圈',
    bbox: [-8.5, 8.5, 8.5, -8.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：画嵌套集合圈（按定义分类）
      {
        narration: '现在我们用集合圈来表示有理数的家族。最外边这个大圈代表所有有理数；大圈里面分两个小圈——左边是整数圈，右边是分数圈。整数圈里再细分三个区：正整数区、0区、负整数区；分数圈里再细分两个区：正分数区、负分数区。',
        enter: function (anim) {
          // 有理数大圈（最外层）
          S.addCircle('s5-outer', 0, 0.5, 7.8,
            { color: TEAL, fill: TEAL, fillOpacity: 0.08, width: 3 });
          S.addText('s5-outer-lbl', 0, 8.0, '有  理  数',
            { color: TEAL, size: 18, anchorX: 'middle' });

          // 整数圈（左，较大）
          S.addCircle('s5-int', -2.5, 0.5, 4.5,
            { color: COOL, fill: COOL, fillOpacity: 0.10, width: 2.5 });
          S.addText('s5-int-lbl', -2.5, 5.2, '整 数',
            { color: COOL, size: 15, anchorX: 'middle' });

          // 分数圈（右）
          S.addCircle('s5-frac', 3.2, 0.5, 3.4,
            { color: GREEN, fill: GREEN, fillOpacity: 0.10, width: 2.5 });
          S.addText('s5-frac-lbl', 3.2, 4.1, '分 数',
            { color: GREEN, size: 15, anchorX: 'middle' });

          // 整数圈内三区标注（用小椭圆多边形或直接文字标区）
          // 正整数区（左上）
          S.addPolygon('s5-posint-bg', [
            [-5.5, 3.0], [-2.5, 3.0], [-2.5, 1.5], [-5.5, 1.5]
          ], { fillColor: COOL, opacity: 0.12, strokeColor: COOL, borderWidth: 1.5 });
          S.addText('s5-posint-lbl', -4.0, 2.5, '正整数', { color: COOL, size: 13, anchorX: 'middle' });

          // 0区（中）
          S.addPolygon('s5-zero-bg', [
            [-4.0, 1.2], [-2.0, 1.2], [-2.0, 0.0], [-4.0, 0.0]
          ], { fillColor: INK, opacity: 0.10, strokeColor: INK, borderWidth: 1.5 });
          S.addText('s5-zero-lbl', -3.0, 0.7, '0区', { color: INK, size: 13, anchorX: 'middle' });

          // 负整数区（左下）
          S.addPolygon('s5-negint-bg', [
            [-5.5, -0.2], [-2.5, -0.2], [-2.5, -1.8], [-5.5, -1.8]
          ], { fillColor: WARM, opacity: 0.12, strokeColor: WARM, borderWidth: 1.5 });
          S.addText('s5-negint-lbl', -4.0, -0.8, '负整数', { color: WARM, size: 13, anchorX: 'middle' });

          // 正分数区（右上）
          S.addPolygon('s5-posfrac-bg', [
            [1.5, 2.8], [4.8, 2.8], [4.8, 1.2], [1.5, 1.2]
          ], { fillColor: GREEN, opacity: 0.12, strokeColor: GREEN, borderWidth: 1.5 });
          S.addText('s5-posfrac-lbl', 3.2, 2.1, '正分数', { color: GREEN, size: 13, anchorX: 'middle' });

          // 负分数区（右下）
          S.addPolygon('s5-negfrac-bg', [
            [1.5, 0.8], [4.8, 0.8], [4.8, -0.8], [1.5, -0.8]
          ], { fillColor: WARM, opacity: 0.12, strokeColor: WARM, borderWidth: 1.5 });
          S.addText('s5-negfrac-lbl', 3.2, 0.1, '负分数', { color: WARM, size: 13, anchorX: 'middle' });

          P.renderCard(
            '<b>集合圈（按定义分类）</b><br>' +
            '最外：有理数圈<br>' +
            '└ 整数圈：正整数区 / 0区 / 负整数区<br>' +
            '└ 分数圈：正分数区 / 负分数区'
          );
          return anim ? delay(500) : null;
        }
      },

      // Step 2：卡片逐一入圈
      {
        narration: '现在把9张卡片逐一放入对应的区域。15 放进正整数区，0 放进 0 区，-10 放进负整数区，128 也进正整数区，-80 进负整数区；4/5 进正分数区，0.1 也进正分数区；-2/3 进负分数区，-3.9 进负分数区。每个数都找到了自己的家！',
        enter: function (anim) {
          // 各区放入数字（actor 直接摆位）
          // 正整数区：15, 128
          S.actor('s5-v-15',  -5.2, 2.8, '15',   { color: COOL, size: 14 });
          S.actor('s5-v-128', -3.2, 2.2, '128',  { color: COOL, size: 14 });

          // 0 区
          S.actor('s5-v-0', -3.0, 0.65, '0', { color: INK, size: 16, bold: true });

          // 负整数区：-10, -80
          S.actor('s5-v-n10', -5.2, -0.4, '$-10$', { color: WARM, size: 14 });
          S.actor('s5-v-n80', -3.2, -1.2, '$-80$', { color: WARM, size: 14 });

          // 正分数区：4/5, 0.1
          S.actor('s5-v-45', 2.2, 2.4, '$\\dfrac{4}{5}$', { color: GREEN, size: 14 });
          S.actor('s5-v-01', 4.0, 2.3, '$0.1$',           { color: GREEN, size: 14 });

          // 负分数区：-2/3, -3.9（先放 -2/3，-3.9 在追问时高亮）
          S.actor('s5-v-n23', 2.2, 0.45, '$-\\dfrac{2}{3}$', { color: WARM, size: 14 });
          S.actor('s5-v-n39', 4.0, 0.3,  '$-3.9$',            { color: WARM, size: 14 });

          P.renderCard(
            '9 个数全部入圈：<br>' +
            '正整数区：$15, 128$<br>' +
            '0区：$0$<br>' +
            '负整数区：$-10, -80$<br>' +
            '正分数区：$\\dfrac{4}{5}, 0.1$<br>' +
            '负分数区：$-\\dfrac{2}{3}, -3.9$',
            'teal'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 3：追问 -3.9 该进哪个圈
      {
        narration: '追问一下：-3.9 到底落在"负有理数圈"还是"负整数区"？很多同学第一反应是"它有负号，是负的，应该进负整数区"——但注意！-3.9 等于负十分之三十九，它是分数，不是整数，所以它只能进负分数区，而不是负整数区！这个问题很容易错，请大家牢记！',
        enter: function (anim) {
          // 高亮 -3.9 并标注
          S.remove('s5-v-n39');
          // 重新放入并加高亮框
          S.actor('s5-v-n39b', 4.0, 0.3, '$-3.9$', { color: ORANGE, size: 16, bold: true });
          S.addPolygon('s5-hl-n39', [
            [3.4, 0.7], [5.5, 0.7], [5.5, -0.15], [3.4, -0.15]
          ], { fillColor: ORANGE, opacity: 0.20, strokeColor: ORANGE, borderWidth: 2.5 });

          // 错误指向：不能进负整数区
          S.addSegment('s5-wrong-arr', [4.0, 0.1], [-3.5, -0.8],
            { color: WARM, width: 2, dash: 2 });
          S.actor('s5-wrong-lbl', -0.5, -2.5,
            '✗ 不是负整数区！', { color: WARM, size: 16, bold: true });

          // 正确归属
          S.actor('s5-correct', 3.2, -1.5,
            '✓ 负分数区', { color: GREEN, size: 16, bold: true });

          P.renderCard(
            '<b>追问：$-3.9$ 进哪个区？</b><br>' +
            '$-3.9 = -\\dfrac{39}{10}$ 是<b>分数</b>，不是整数<br>' +
            '→ 进 <b>负分数区</b>，<b>不是负整数区</b>！<br>' +
            '看到负号别慌，先判断是整数还是分数。',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
