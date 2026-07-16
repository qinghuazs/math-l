(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32';

  var scene = {
    id: 's1',
    title: '一、情境引入',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，学校想了解全校 2000 名学生的视力情况。如果一个一个去检查，工作量太大了。于是学校决定：从 2000 名学生中，随机抽取 200 名来检查视力。这种方法在数学上叫做<b>抽样调查</b>。',
        enter: function () {
          // 大标题
          S.addText('s1-title', 0, 5.5, '调查全校学生视力情况', { size: 22, color: INK, anchorX: 'middle' });
          // 两个数字
          S.addText('s1-n2000', -4, 2.5, '全校：2000 名学生', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('s1-n200', 4, 2.5, '抽取：200 名学生', { size: 18, color: WARM, anchorX: 'middle' });
          // 箭头说明
          S.addText('s1-arrow', 0, 0.5, '⟶ 抽样调查 ⟶', { size: 16, color: GREEN, anchorX: 'middle' });
          // 底部问题
          P.renderCard('思考：这里的 <b>2000</b> 和 <b>200</b> 分别叫什么？视力又算什么？');
        },
      },
      {
        narration: '今天我们就来学习四个重要概念：<b>总体、个体、样本、样本容量</b>。这四个概念贯穿整个统计学习，必须搞清楚它们各自的含义和区别。',
        enter: function () {
          S.addText('s1-c1', -7, -1.5, '① 总体', { size: 20, color: BLUE, anchorX: 'left' });
          S.addText('s1-c2', -7, -3.0, '② 个体', { size: 20, color: GREEN, anchorX: 'left' });
          S.addText('s1-c3', 1, -1.5, '③ 样本', { size: 20, color: WARM, anchorX: 'left' });
          S.addText('s1-c4', 1, -3.0, '④ 样本容量', { size: 20, color: '#6a1b9a', anchorX: 'left' });
          P.renderCard('今天的核心：<b>总体 · 个体 · 样本 · 样本容量</b><br>牢记这四个概念的含义与区别！');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
