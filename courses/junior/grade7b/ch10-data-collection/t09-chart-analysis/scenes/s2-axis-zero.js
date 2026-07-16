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

  // 数据：两款产品满意度 100 vs 105（差距很小）
  var VAL_A = 100;
  var VAL_B = 105;

  // 画板A（纵轴从0开始）的柱高（单位：坐标单位，满刻度120对应高度12）
  // bbox: [-1, 14, 9, -2]；纵轴范围 0~120 → 刻度单位 = 坐标单位/10
  var SCALE_FULL = 12 / 120;   // 1个数据单位 = SCALE_FULL 个坐标单位（纵轴从0开始）
  // 截断纵轴：纵轴范围 95~110，15个数据单位 → 坐标高度 12
  var YMIN_CUT  = 95;
  var YMAX_CUT  = 110;
  var SCALE_CUT = 12 / (YMAX_CUT - YMIN_CUT); // 1数据单位 = 0.8 坐标单位

  // 闭包变量：两种图各自两根柱的当前高度
  var hA_full = [0, 0];  // 纵轴从0时 A/B 柱高度（坐标）
  var hB_cut  = [0, 0];  // 截断纵轴时 A/B 柱高度（坐标）

  // 左图（纵轴从0）刻度和标签绘制
  function drawLeftAxis() {
    var yticks = [0, 20, 40, 60, 80, 100, 120];
    var i;
    S.addText('s2-la-title', 1.5, 13.5, '图A：纵轴从0开始', { size: 13, color: GREEN, anchorX: 'middle' });
    S.addText('s2-la-yunit', -0.8, 13.2, '（分）', { size: 11, color: INK, anchorX: 'right' });
    for (i = 0; i < yticks.length; i++) {
      var cy = yticks[i] * SCALE_FULL;
      S.addText('s2-la-ytick' + i, -0.7, cy, '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
      // 刻度横线
      S.addSegment('s2-la-ytline' + i, [-0.15, cy], [0, cy], { color: INK, width: 1, dash: 0 });
    }
    S.addText('s2-la-xlabel0', 0.8, -0.9, 'A产品', { size: 12, color: BLUE, anchorX: 'middle' });
    S.addText('s2-la-xlabel1', 2.2, -0.9, 'B产品', { size: 12, color: WARM, anchorX: 'middle' });
  }

  // 右图（截断纵轴）刻度和标签绘制
  function drawRightAxis() {
    var yticks = [95, 98, 100, 102, 105, 108, 110];
    var i;
    S.addText('s2-ra-title', 7.5, 13.5, '图B：纵轴从95开始（截断！）', { size: 13, color: WARM, anchorX: 'middle' });
    S.addText('s2-ra-yunit', 5.2, 13.2, '（分）', { size: 11, color: INK, anchorX: 'right' });
    for (i = 0; i < yticks.length; i++) {
      var cy = (yticks[i] - YMIN_CUT) * SCALE_CUT;
      S.addText('s2-ra-ytick' + i, 5.3, cy, '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
      S.addSegment('s2-ra-ytline' + i, [5.85, cy], [6, cy], { color: INK, width: 1, dash: 0 });
    }
    S.addText('s2-ra-xlabel0', 6.8, -0.9, 'A产品', { size: 12, color: BLUE, anchorX: 'middle' });
    S.addText('s2-ra-xlabel1', 8.2, -0.9, 'B产品', { size: 12, color: WARM, anchorX: 'middle' });
  }

  // 画左图（纵轴从0）两根柱——可动画
  function drawFullBars(anim) {
    var targetA = VAL_A * SCALE_FULL;   // 100 * 0.1 = 10
    var targetB = VAL_B * SCALE_FULL;   // 105 * 0.1 = 10.5

    if (!anim) {
      hA_full[0] = targetA;
      hA_full[1] = targetB;
      S.addBar('s2-full-barA', 0.8, 0.6, function () { return hA_full[0]; }, { color: BLUE });
      S.addBar('s2-full-barB', 2.2, 0.6, function () { return hA_full[1]; }, { color: WARM });
      S.addText('s2-full-lblA', 0.8, targetA + 0.3, '' + VAL_A, { size: 12, color: BLUE, anchorX: 'middle' });
      S.addText('s2-full-lblB', 2.2, targetB + 0.3, '' + VAL_B, { size: 12, color: WARM, anchorX: 'middle' });
      return Promise.resolve();
    }

    hA_full[0] = 0;
    hA_full[1] = 0;
    S.addBar('s2-full-barA', 0.8, 0.6, function () { return hA_full[0]; }, { color: BLUE });
    S.addBar('s2-full-barB', 2.2, 0.6, function () { return hA_full[1]; }, { color: WARM });

    return S.animate({
      from: 0, to: targetA, duration: 700, easing: 'easeOutCubic',
      onUpdate: function (v) { hA_full[0] = v; },
    }).then(function () {
      hA_full[0] = targetA;
      S.addText('s2-full-lblA', 0.8, targetA + 0.3, '' + VAL_A, { size: 12, color: BLUE, anchorX: 'middle' });
    }).then(function () {
      return S.animate({
        from: 0, to: targetB, duration: 700, easing: 'easeOutCubic',
        onUpdate: function (v) { hA_full[1] = v; },
      });
    }).then(function () {
      hA_full[1] = targetB;
      S.addText('s2-full-lblB', 2.2, targetB + 0.3, '' + VAL_B, { size: 12, color: WARM, anchorX: 'middle' });
    });
  }

  // 画右图（截断纵轴）两根柱——可动画
  function drawCutBars(anim) {
    var targetA = (VAL_A - YMIN_CUT) * SCALE_CUT;  // (100-95)*0.8 = 4
    var targetB = (VAL_B - YMIN_CUT) * SCALE_CUT;  // (105-95)*0.8 = 8

    if (!anim) {
      hB_cut[0] = targetA;
      hB_cut[1] = targetB;
      S.addBar('s2-cut-barA', 6.8, 0.6, function () { return hB_cut[0]; }, { color: BLUE });
      S.addBar('s2-cut-barB', 8.2, 0.6, function () { return hB_cut[1]; }, { color: WARM });
      S.addText('s2-cut-lblA', 6.8, targetA + 0.3, '' + VAL_A, { size: 12, color: BLUE, anchorX: 'middle' });
      S.addText('s2-cut-lblB', 8.2, targetB + 0.3, '' + VAL_B, { size: 12, color: WARM, anchorX: 'middle' });
      return Promise.resolve();
    }

    hB_cut[0] = 0;
    hB_cut[1] = 0;
    S.addBar('s2-cut-barA', 6.8, 0.6, function () { return hB_cut[0]; }, { color: BLUE });
    S.addBar('s2-cut-barB', 8.2, 0.6, function () { return hB_cut[1]; }, { color: WARM });

    return S.animate({
      from: 0, to: targetA, duration: 700, easing: 'easeOutCubic',
      onUpdate: function (v) { hB_cut[0] = v; },
    }).then(function () {
      hB_cut[0] = targetA;
      S.addText('s2-cut-lblA', 6.8, targetA + 0.3, '' + VAL_A, { size: 12, color: BLUE, anchorX: 'middle' });
    }).then(function () {
      return S.animate({
        from: 0, to: targetB, duration: 700, easing: 'easeOutCubic',
        onUpdate: function (v) { hB_cut[1] = v; },
      });
    }).then(function () {
      hB_cut[1] = targetB;
      S.addText('s2-cut-lblB', 8.2, targetB + 0.3, '' + VAL_B, { size: 12, color: WARM, anchorX: 'middle' });
    });
  }

  var scene = {
    id: 's2',
    title: '二、误导一：纵轴不从0开始',
    bbox: [-1, 14, 9, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      hA_full = [0, 0];
      hB_cut  = [0, 0];
    },
    steps: [
      {
        narration: '第一种最常见的误导手法——<b>截断纵轴</b>！我们用一个例子来演示。两款产品的满意度：A产品 100分，B产品 105分。差距只有5分，非常小！现在先用<b>正确画法</b>画出来：纵轴从<b>0</b>开始。注意看，我要在画板上搭起坐标系，横轴是产品类别，纵轴是满意度分数。',
        enter: function () {
          drawLeftAxis();
          drawRightAxis();
          P.renderCard(
            '<b>数据：两款产品满意度</b><br>' +
            'A产品：<b style="color:#1565c0">100分</b><br>' +
            'B产品：<b style="color:#e64a19">105分</b><br>' +
            '差距：仅 5 分'
          );
        },
      },
      {
        narration: '左图：纵轴从<b>0</b>开始，来看A产品和B产品的柱子！——两根柱子几乎一样高！差距一眼就能看出来，只有区区5分，真实反映了数据。这就是<b>正确的条形图</b>应该有的样子。',
        enter: function (anim) {
          drawLeftAxis();
          drawRightAxis();
          return drawFullBars(anim);
        },
      },
      {
        narration: '现在右图出场——<b>截断纵轴版本</b>！纵轴不从0开始，从<b>95</b>开始！注意右边这两根柱子……哇！B产品的柱子看起来是A产品的<b>两倍高</b>！可实际上差距只有5分！这就是"截断纵轴"的魔法——通过放大纵轴底部，把微小差距变成视觉上的巨大鸿沟！这是最常见的统计图误导手法！',
        enter: function (anim) {
          drawLeftAxis();
          drawRightAxis();
          drawFullBars(false);
          return drawCutBars(anim).then(function () {
            // 截断标记：锯齿线
            S.addText('s2-cut-warn', 6.0, 0.3, '⚡截断！', { size: 13, color: WARM, anchorX: 'left' });
            S.addText('s2-cut-warn2', 5.5, -1.5,
              '纵轴从95开始，视觉差距严重失真！',
              { size: 12, color: WARM, anchorX: 'left' });
          });
        },
      },
      {
        narration: '对比两张图——完全相同的数据，截然不同的视觉印象！左图真实，右图夸张。读图时，<b>第一眼一定先看纵轴的起点</b>！如果纵轴不从0开始，要格外警惕：差距可能被严重夸大了。这在广告、新闻、报告中非常常见！',
        enter: function () {
          drawLeftAxis();
          drawRightAxis();
          drawFullBars(false);
          drawCutBars(false);

          S.addText('s2-cut-warn', 6.0, 0.3, '⚡截断！', { size: 13, color: WARM, anchorX: 'left' });

          // 对比结论
          S.addText('s2-vs-left',  1.5, 12.5, '✓ 真实反映差距', { size: 13, color: GREEN, anchorX: 'middle' });
          S.addText('s2-vs-right', 7.5, 12.5, '✗ 严重夸大差距！', { size: 13, color: WARM, anchorX: 'middle' });

          P.renderCard(
            '<b>辨析要点一：纵轴起点</b><br>' +
            '✓ 正确：纵轴从 <b>0</b> 开始<br>' +
            '✗ 误导：纵轴从非零值开始<br>' +
            '<b>读图第一步：看纵轴起点！</b>'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
