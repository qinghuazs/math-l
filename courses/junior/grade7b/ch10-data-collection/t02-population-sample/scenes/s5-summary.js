(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '今天我们学习了四个统计核心概念。用一张关系图来总结：总体 = 所有个体的集合；从总体中抽出部分个体 = 样本；样本中个体的个数 = 样本容量。关键易错点记牢：总体和个体都指"数量指标"，不是人或物本身；样本容量是纯数，不带单位！',
        enter: function () {
          // 标题
          S.addText('s5-title', 0, 6.8, '本节课四个核心概念', { size: 20, color: BLUE, anchorX: 'middle' });

          // 大框代表总体
          S.addPolygon('s5-pop-box', [[-9, 5.5], [3, 5.5], [3, -4.5], [-9, -4.5]], {
            color: 'none', fillOpacity: 0.05, fillColor: BLUE,
            borderColor: BLUE, borderWidth: 2.5,
          });
          S.addText('s5-pop-lbl', -3, 6.0, '总  体', { size: 16, color: BLUE, anchorX: 'middle' });

          // 小框代表样本（在大框内）
          S.addPolygon('s5-smp-box', [[-8, 4.5], [2, 4.5], [2, 0.5], [-8, 0.5]], {
            color: 'none', fillOpacity: 0.08, fillColor: WARM,
            borderColor: WARM, borderWidth: 2,
          });
          S.addText('s5-smp-lbl', -3, 5.0, '样  本', { size: 15, color: WARM, anchorX: 'middle' });

          // 个体小点（在总体框内，非样本区域）
          S.actor('s5-ind1', -3, -1.5, '●', { color: '#90a4ae', size: 13 });
          S.actor('s5-ind2', -1, -2.5, '●', { color: '#90a4ae', size: 13 });
          S.actor('s5-ind3', -5, -2.5, '●', { color: '#90a4ae', size: 13 });
          S.addText('s5-ind-lbl', -3, -3.8, '个体（未被抽到）', { size: 13, color: '#90a4ae', anchorX: 'middle' });

          // 样本内的个体点
          S.actor('s5-snd1', -6, 2.5, '●', { color: WARM, size: 13 });
          S.actor('s5-snd2', -3, 2.5, '●', { color: WARM, size: 13 });
          S.actor('s5-snd3', 0, 2.5, '●', { color: WARM, size: 13 });
          S.actor('s5-snd4', -6, 1.2, '●', { color: WARM, size: 13 });
          S.actor('s5-snd5', -3, 1.2, '●', { color: WARM, size: 13 });
          S.addText('s5-snd-lbl', -3, 3.8, '个体（被抽到）', { size: 13, color: WARM, anchorX: 'middle' });

          // 右侧：样本容量标注
          S.addText('s5-n-lbl', 6, 2.5, '样本容量', { size: 16, color: PURPLE, anchorX: 'middle' });
          S.addText('s5-n-val', 6, 1.2, '= 个体数目', { size: 15, color: PURPLE, anchorX: 'middle' });
          S.addText('s5-n-tip', 6, 0, '（纯数，无单位）', { size: 13, color: '#888', anchorX: 'middle' });

          P.renderTable({
            head: ['概念', '定义', '易错提醒'],
            rows: [
              ['总体', '考察对象的全体', '是"指标"，非人/物'],
              ['个体', '总体中每一个考察对象', '也是"指标"'],
              ['样本', '从总体中抽取的一部分', '要有代表性'],
              ['样本容量', '样本中个体的数目', '纯数，无单位'],
            ],
          });
        },
      },
      {
        narration: '作业：课本第十章习题，完成有关总体、个体、样本、样本容量的判断题和填空题。记住三个关键：第一，指出"总体"时必须带上"数量指标"（如"寿命""视力""时间"等）；第二，样本容量是个数，不带单位；第三，随机抽样保证样本的代表性。下节课我们学习如何用统计图来描述数据。',
        enter: function () {
          S.addText('s5-hw-title', 0, 6.5, '课后作业', { size: 20, color: BLUE, anchorX: 'middle' });
          S.addText('s5-hw1', -9, 5.0, '1. 完成课本"总体、个体、样本、样本容量"相关习题', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s5-hw2', -9, 3.5, '2. 课外用抽样调查方法调查班级同学最喜欢的科目，', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s5-hw3', -9, 2.3, '   并指出总体、个体、样本和样本容量', { size: 15, color: INK, anchorX: 'left' });

          S.addText('s5-key1', 0, 0.5, '关键① 总体/个体必须写"数量指标"', { size: 14, color: WARM, anchorX: 'middle' });
          S.addText('s5-key2', 0, -0.8, '关键② 样本容量是纯数，不带单位', { size: 14, color: WARM, anchorX: 'middle' });
          S.addText('s5-key3', 0, -2.1, '关键③ 随机抽样保证样本代表总体', { size: 14, color: WARM, anchorX: 'middle' });

          P.renderCard('下节课预告：<b>数据的整理与统计图</b><br>频率分布表 · 频率直方图 · 折线图');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
