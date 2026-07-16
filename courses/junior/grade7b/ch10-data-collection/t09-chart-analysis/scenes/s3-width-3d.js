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

  // 数据：三种产品销量（真实值相同，都是50）
  var VALS = [50, 50, 50];
  var LABELS = ['1月', '2月', '3月'];
  // 不等宽柱：宽度分别为 0.4, 0.8, 1.2（视觉面积差异大）
  var WIDTHS = [0.4, 0.8, 1.2];
  var COLORS = [BLUE, GREEN, WARM];

  // bbox: [-1, 14, 11, -2]
  // 纵轴范围 0~60，刻度单位 = 12/60 = 0.2
  var SCALE = 12 / 60;

  // 柱中心 X 坐标（不等宽，间距调整）
  var CXS = [1.0, 3.2, 5.8];

  function drawAxisLabels() {
    S.addText('s3-title', 4, 13.5, '三种产品销量对比（单位：万件）', { size: 14, color: INK, anchorX: 'middle' });
    S.addText('s3-yunit', -0.8, 13.2, '（万件）', { size: 11, color: INK, anchorX: 'right' });
    var yticks = [0, 10, 20, 30, 40, 50, 60];
    var i;
    for (i = 0; i < yticks.length; i++) {
      var cy = yticks[i] * SCALE;
      S.addText('s3-ytick' + i, -0.7, cy, '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
    }
    for (i = 0; i < LABELS.length; i++) {
      S.addText('s3-xlabel' + i, CXS[i], -0.9, LABELS[i], { size: 12, color: INK, anchorX: 'middle' });
    }
  }

  var scene = {
    id: 's3',
    title: '三、误导二：不等宽/立体变形',
    bbox: [-1, 14, 11, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第二种误导手法：<b>柱子宽度不一样</b>！我们看这道题——三个月的产品销量其实<b>完全相同</b>，都是50万件。但如果我们把三根柱子画成不等宽的……眼睛就会被"骗"了！面积越大，感觉"量"越多，对吗？来看画板——先画出正确等宽版本，再对比。',
        enter: function () {
          drawAxisLabels();
          // 等宽柱（正确版本）
          var i;
          for (i = 0; i < 3; i++) {
            (function (idx) {
              var h = VALS[idx] * SCALE;
              S.addBar('s3-eq-bar' + idx, CXS[idx], 0.6, h, { color: COLORS[idx] });
              S.addText('s3-eq-lbl' + idx, CXS[idx], h + 0.3, '' + VALS[idx], { size: 12, color: COLORS[idx], anchorX: 'middle' });
            })(i);
          }
          S.addText('s3-eq-note', 4, -1.5, '✓ 等宽柱：三根柱子宽度相同，公平直观', { size: 12, color: GREEN, anchorX: 'middle' });
          P.renderCard(
            '<b>数据：三月销量</b><br>' +
            '1月：<b style="color:#1565c0">50万件</b><br>' +
            '2月：<b style="color:#2e7d32">50万件</b><br>' +
            '3月：<b style="color:#e64a19">50万件</b><br>' +
            '三月销量<b>完全相同</b>！'
          );
        },
      },
      {
        narration: '现在换成<b>不等宽</b>的柱子！1月柱子很窄，2月中等，3月特别宽……虽然高度一样，但你的眼睛会觉得3月的柱子"更大"、"更多"！这就是面积错觉——<b>柱子宽度不等，视觉面积就不等，给人完全不同的感受</b>！广告中常用这招让某月数据"显得"更突出。',
        enter: function () {
          drawAxisLabels();
          // 不等宽柱（误导版本）
          var i;
          for (i = 0; i < 3; i++) {
            (function (idx) {
              var h = VALS[idx] * SCALE;
              S.addBar('s3-uw-bar' + idx, CXS[idx], WIDTHS[idx], h, { color: COLORS[idx] });
              S.addText('s3-uw-lbl' + idx, CXS[idx], h + 0.3, '' + VALS[idx], { size: 12, color: COLORS[idx], anchorX: 'middle' });
              S.addText('s3-uw-w' + idx, CXS[idx], -0.4, '宽=' + WIDTHS[idx], { size: 10, color: INK, anchorX: 'middle' });
            })(i);
          }
          S.addText('s3-uw-note', 4, -1.5, '✗ 不等宽柱：宽度不同，视觉面积严重失真！', { size: 12, color: WARM, anchorX: 'middle' });

          // 面积提示
          S.addText('s3-area-tip', 7.5, 8, '3月柱最宽→', { size: 13, color: WARM });
          S.addText('s3-area-tip2', 7.5, 7, '视觉上显得', { size: 13, color: WARM });
          S.addText('s3-area-tip3', 7.5, 6, '"最多"！', { size: 13, color: WARM });

          P.renderCard(
            '<b>面积错觉陷阱</b><br>' +
            '柱子高度相同 → 数据相同<br>' +
            '但宽度不同 → <b>视觉面积</b>不同<br>' +
            '眼睛会被宽度"欺骗"！'
          );
        },
      },
      {
        narration: '还有一种变形：给扇形图加"立体"效果或"倾斜"透视！扇形被倾斜后，离观察者近的扇形看起来更大，远的看起来更小，但实际占比没有变化。辨析要点：<b>统计图必须用二维平面图</b>，立体效果只会制造面积/体积错觉。下次看到立体饼图要格外小心！',
        enter: function () {
          // 示意：扇形图的"立体透视"错觉
          // 画一个标准圆（正视图）
          S.addText('s3-pie-title', 3, 13, '扇形图：正视 vs 透视', { size: 14, color: INK, anchorX: 'middle' });
          // 正视扇形
          S.addSector('s3-sec-a1', [1.5, 8], 2.5, 90,  180, { color: BLUE, fillOpacity: 0.75 });
          S.addSector('s3-sec-a2', [1.5, 8], 2.5, 180, 270, { color: GREEN, fillOpacity: 0.75 });
          S.addSector('s3-sec-a3', [1.5, 8], 2.5, 270, 360, { color: WARM, fillOpacity: 0.75 });
          S.addSector('s3-sec-a4', [1.5, 8], 2.5, 0,   90,  { color: PURPLE, fillOpacity: 0.75 });
          S.addText('s3-pie-lbl-a', 1.5, 5.0, '正视（正确）', { size: 11, color: GREEN, anchorX: 'middle' });
          S.addText('s3-pie-pct1', 0.4, 8.8, '25%', { size: 11, color: BLUE, anchorX: 'middle' });
          S.addText('s3-pie-pct2', 0.4, 7.2, '25%', { size: 11, color: GREEN, anchorX: 'middle' });
          S.addText('s3-pie-pct3', 2.6, 7.2, '25%', { size: 11, color: WARM, anchorX: 'middle' });
          S.addText('s3-pie-pct4', 2.6, 8.8, '25%', { size: 11, color: PURPLE, anchorX: 'middle' });

          // 立体（变形）扇形用椭圆底模拟
          // 用多边形模拟"近大远小"的倾斜饼图
          // 下方橙色扇形被"放大"（近视效果）
          S.addPolygon('s3-3d-back', [[5.5, 7.2], [9.5, 7.2], [9.5, 8.5], [5.5, 8.5]], { color: '#eceff1', opacity: 0.8, borderWidth: 1, borderColor: '#90a4ae' });
          // 下方大扇形（近视，被夸大）
          S.addSector('s3-sec-b1', [7.5, 7.8], 2.2, 200, 340, { color: WARM, fillOpacity: 0.85 });
          // 上方小扇形（远视，被缩小）
          S.addSector('s3-sec-b2', [7.5, 7.8], 2.2, 340, 200, { color: BLUE, fillOpacity: 0.75 });
          S.addText('s3-3d-lbl-b', 7.5, 5.0, '立体透视（误导）', { size: 11, color: WARM, anchorX: 'middle' });
          S.addText('s3-3d-warn',  7.5, 4.2, '近处扇形看起来更大！', { size: 11, color: WARM, anchorX: 'middle' });
          S.addText('s3-3d-arrow', 7.5, 10.0, '⬇ 离眼睛近', { size: 12, color: WARM, anchorX: 'middle' });

          P.renderCard(
            '<b>辨析要点二：形状变形</b><br>' +
            '✗ 柱子<b>不等宽</b> → 面积错觉<br>' +
            '✗ 扇形图<b>立体倾斜</b> → 透视错觉<br>' +
            '✓ 正确：等宽柱、正视扇形'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
