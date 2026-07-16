(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var AMBER  = '#f57f17';

  var scene = {
    id: 's1',
    title: '一、统计图会骗人吗',
    board: { axis: false },
    bbox: [-1, 10, 11, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，我们已经学会了条形图、扇形图和折线图。今天这节课非常特别——我们来聊一个问题：<b>统计图会骗人吗？</b>答案是……有可能！同样的数据，不同的画法会给人<b>截然不同</b>的感受。有人会利用这一点来"美化"数据，甚至误导读者！今天我们就来做一名<b>数据侦探</b>，学会识别"有问题"的统计图。',
        enter: function () {
          // 标题
          S.addText('s1-title', 5, 8.5, '统计图会骗人吗？', { size: 22, color: WARM, anchorX: 'middle' });
          S.addText('s1-sub',   5, 7.2, '——数学活动·统计图辨析', { size: 15, color: INK, anchorX: 'middle' });

          // 三条横幅说明
          S.addText('s1-q1', 1, 5.5, '📊 同一组数据，不同画法 →', { size: 14, color: INK });
          S.addText('s1-q2', 1, 4.4, '     给人完全不同的印象！', { size: 14, color: WARM });

          S.addText('s1-q3', 1, 3.0, '常见"误导"手法：', { size: 14, color: BLUE });
          S.addText('s1-q4', 1, 2.0, '① 纵轴不从0开始    ② 柱子不等宽', { size: 13, color: INK });
          S.addText('s1-q5', 1, 1.1, '③ 折线刻度被拉伸   ④ 样本来源单一', { size: 13, color: INK });
          S.addText('s1-q6', 1, 0.1, '⑤ 故意选特殊时间段 ⑥ 只展示有利数据', { size: 13, color: INK });

          P.renderCard(
            '<b>本课目标：</b><br>' +
            '① 识别常见误导性统计图<br>' +
            '② 掌握"读图四看"方法<br>' +
            '③ 做聪明的数据读者'
          );
        },
      },
      {
        narration: '先看一个真实场景：某公司想用统计图向客户展示产品销量增长——他们手里有一组数据，却有两种截然不同的画法！左图看起来增长飞速，右图看起来几乎没变化……但它们用的是<b>完全一样</b>的数据！这就是统计图"骗人"的典型套路。接下来我们逐一揭穿这些把戏，从最常见的一招开始——<b>纵轴不从0开始</b>！',
        enter: function () {
          S.addText('s1-scene-title', 5, 8.5, '同一数据，两种完全不同的图', { size: 18, color: BLUE, anchorX: 'middle' });

          // 左图（"夸张版"：截断纵轴）示意
          S.addText('s1-lbl-left',  2, 7.5, '图A（截断纵轴）', { size: 13, color: WARM, anchorX: 'middle' });
          // 左图两根短柱，高度差很大（示意）
          S.addPolygon('s1-barL1', [[0.7, 1.5], [1.3, 1.5], [1.3, 4.0], [0.7, 4.0]], { color: BLUE, opacity: 0.75 });
          S.addPolygon('s1-barL2', [[1.7, 1.5], [2.3, 1.5], [2.3, 6.5], [1.7, 6.5]], { color: WARM, opacity: 0.75 });
          S.addText('s1-lval1', 1.0, 3.9, '100', { size: 11, color: BLUE,  anchorX: 'middle' });
          S.addText('s1-lval2', 2.0, 6.4, '105', { size: 11, color: WARM,  anchorX: 'middle' });
          S.addText('s1-laxis', 0.5, 1.5, '98', { size: 11, color: INK });
          S.addText('s1-larrow', 2.0, 1.0, '↑ 纵轴从98开始！', { size: 12, color: WARM, anchorX: 'middle' });

          // 右图（"真实版"：纵轴从0开始）示意
          S.addText('s1-lbl-right', 8, 7.5, '图B（纵轴从0开始）', { size: 13, color: GREEN, anchorX: 'middle' });
          // 右图两根高柱，高度差很小
          S.addPolygon('s1-barR1', [[6.5, 0], [7.1, 0], [7.1, 5.0], [6.5, 5.0]], { color: BLUE, opacity: 0.75 });
          S.addPolygon('s1-barR2', [[7.5, 0], [8.1, 0], [8.1, 5.25],[7.5, 5.25]], { color: WARM, opacity: 0.75 });
          S.addText('s1-rval1', 6.8, 4.9,  '100', { size: 11, color: BLUE, anchorX: 'middle' });
          S.addText('s1-rval2', 7.8, 5.15, '105', { size: 11, color: WARM, anchorX: 'middle' });
          S.addText('s1-raxis', 6.2, 0.0, '0', { size: 11, color: INK });
          S.addText('s1-rarrow', 7.8, -0.7, '↑ 纵轴从0开始', { size: 12, color: GREEN, anchorX: 'middle' });

          // 底部结论
          S.addText('s1-concl', 5, -1.2,
            '数据完全相同，印象却截然不同！',
            { size: 15, color: PURPLE, anchorX: 'middle' }
          );

          P.renderCard(
            '<b>数据侦探提示：</b><br>' +
            '同一组数据可以画出<b>夸大</b>差异<br>' +
            '或<b>缩小</b>差异的图形！<br>' +
            '关键在于：<b>怎么画纵轴</b>'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
