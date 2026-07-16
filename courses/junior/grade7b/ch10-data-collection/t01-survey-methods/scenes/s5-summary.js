(function (CW) {
  'use strict';
  // s5 课时小结 + 引出下节
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var INK    = '#455a64';

  var scene = {
    id: 's5',
    title: '五、课时小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '本节课我们学习了两种统计调查方式。来复习一下：<b>全面调查</b>对每一个个体都调查，数据准确，适合对象少、无破坏的情形；<b>抽样调查</b>只调查一部分，省时省力，适合总体大或有破坏性的情形。选择时综合考虑目的、规模、成本、破坏性。',
        enter: function (anim) {
          // 标题
          S.actor('s5-title', 0, 6.5, '本节小结', { color: BLUE, size: 24, bold: true });

          // 结构图：两条路径
          // 中心："统计调查"
          S.addPolygon('s5-center-bg', [
            [-2.8, 5.4], [2.8, 5.4], [2.8, 4.2], [-2.8, 4.2],
          ], { color: BLUE, opacity: 0.15, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-center', 0, 4.8, '统计调查', { color: BLUE, size: 18, bold: true });

          // 左支：全面调查
          S.addSegment('s5-left-line', [-1.5, 4.2], [-5.5, 2.5], { color: BLUE, width: 2, dash: 0 });
          S.addPolygon('s5-left-bg', [
            [-9, 2.5], [-2, 2.5], [-2, 1.2], [-9, 1.2],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-left-lbl', -5.5, 1.85, '全面调查（普查）', { color: BLUE, size: 16, bold: true });

          S.actor('s5-left-t1', -5.5, 0.4, '· 每个个体都调查', { color: INK, size: 14 });
          S.actor('s5-left-t2', -5.5, -0.4, '· 结果准确', { color: GREEN, size: 14 });
          S.actor('s5-left-t3', -5.5, -1.2, '· 成本高、耗时', { color: ORANGE, size: 14 });
          S.actor('s5-left-t4', -5.5, -2.0, '· 适用：对象少、无破坏', { color: INK, size: 14 });

          // 右支：抽样调查
          S.addSegment('s5-right-line', [1.5, 4.2], [5.5, 2.5], { color: PURPLE, width: 2, dash: 0 });
          S.addPolygon('s5-right-bg', [
            [2, 2.5], [9, 2.5], [9, 1.2], [2, 1.2],
          ], { color: PURPLE, opacity: 0.10, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s5-right-lbl', 5.5, 1.85, '抽样调查', { color: PURPLE, size: 16, bold: true });

          S.actor('s5-right-t1', 5.5, 0.4, '· 抽取部分个体调查', { color: INK, size: 14 });
          S.actor('s5-right-t2', 5.5, -0.4, '· 省时省力', { color: GREEN, size: 14 });
          S.actor('s5-right-t3', 5.5, -1.2, '· 有一定误差', { color: ORANGE, size: 14 });
          S.actor('s5-right-t4', 5.5, -2.0, '· 适用：总体大、有破坏', { color: INK, size: 14 });

          // 选择要素
          S.addSegment('s5-div', [-9, -2.8], [9, -2.8], { color: '#cfd8dc', width: 1, dash: 2 });
          S.actor('s5-choose-lbl', 0, -3.4, '选择依据：目的 · 规模 · 成本 · 破坏性', {
            color: ORANGE, size: 15, bold: true,
          });

          P.renderCard('<b>本节回顾</b><br>统计调查：有目的地收集数据<br>全面调查（普查）：每个都查，准确但成本高<br>抽样调查：抽部分，省力但有误差<br>选择时：综合考虑目的、规模、成本与破坏性');
        },
      },
      {
        narration: '这节课我们认识了两种调查方式。下节课我们将深入学习与抽样调查相关的三个核心概念：<b>总体、个体和样本</b>——弄清这三个概念，才能更好地理解抽样的原理。请提前思考：全校学生近视率调查中，谁是总体？谁是个体？谁是样本？',
        enter: function (anim) {
          // 预告下节课
          S.addPolygon('s5-next-bg', [
            [-9.5, -4.6], [9.5, -4.6], [9.5, -7.2], [-9.5, -7.2],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-next-title', 0, -5.1, '下节预告：总体、个体、样本', {
            color: BLUE, size: 17, bold: true,
          });
          S.actor('s5-next-q', 0, -5.9,
            '调查全校学生近视率——',
            { color: INK, size: 15 });
          S.actor('s5-next-q1', -4.5, -6.7, '总体 = ？', { color: BLUE, size: 15, bold: true });
          S.actor('s5-next-q2', 0,   -6.7, '个体 = ？', { color: PURPLE, size: 15, bold: true });
          S.actor('s5-next-q3', 4.5, -6.7, '样本 = ？', { color: ORANGE, size: 15, bold: true });

          P.renderCard('下节课：<b>总体、个体、样本</b><br>思考：调查全校近视率时，谁是总体？谁是样本？', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
