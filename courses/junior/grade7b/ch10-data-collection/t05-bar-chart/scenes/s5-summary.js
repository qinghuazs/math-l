(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var scene = {
    id: 's5',
    title: '五、小结',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '本节课我们学习了两种描述数据的工具：<b>统计表</b>和<b>条形统计图</b>。统计表精确完整，给出每个频数和频率；条形图直观形象，用高度直接比较多少。两者互补，各有优势，实际应用中常常配合使用。',
        enter: function () {
          S.addText('s5-title', 3, 13.5, '本节小结', { size: 18, color: BLUE, anchorX: 'middle' });

          // 统计表模块
          S.addText('s5-t1-hd', 0.2, 12.2, '统计表', { size: 16, color: BLUE, anchorX: 'left' });
          S.addText('s5-t1a', 0.4, 11.0, '• 精确列出每个频数和频率', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s5-t1b', 0.4, 10.0, '• 频率 = 频数 ÷ 总数', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s5-t1c', 0.4, 9.0,  '• 所有频率之和 = 1',     { size: 13, color: INK, anchorX: 'left' });

          // 分隔线
          S.addSegment('s5-div', [0, 8.2], [6.5, 8.2], { color: '#b0bec5', width: 1, dash: 2 });

          // 条形图模块
          S.addText('s5-t2-hd', 0.2, 7.5, '条形统计图', { size: 16, color: WARM, anchorX: 'left' });
          S.addText('s5-t2a', 0.4, 6.3, '• 高度表示频数，直观比较多少', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s5-t2b', 0.4, 5.3, '• 适合离散类别数据', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s5-t2c', 0.4, 4.3, '• 柱等宽、间隔相等、刻度均匀', { size: 13, color: INK, anchorX: 'left' });

          // 核心公式
          S.addText('s5-formula', 3, 3.0, '频率 = $\\dfrac{\\text{频数}}{\\text{总数}}$',
            { size: 15, color: BLUE, anchorX: 'middle' }
          );

          P.renderCard('核心概念：<b>频数</b>（出现次数）、<b>频率</b>（频数/总数）<br>统计表 → 精确；条形图 → 直观');
        },
      },
      {
        narration: '本单元我们已经学完了原始数据的收集和整理方法。接下来，我们将认识更多统计图形——<b>扇形图</b>适合描述各部分占总体的比例，<b>折线图</b>适合描述数据随时间的变化趋势。统计学习的大门才刚刚打开，期待下节课！',
        enter: function () {
          P.renderTable({
            head: ['统计工具', '适合描述', '核心特点'],
            rows: [
              ['统计表',       '精确数据',     '频数+频率，数字完整'],
              ['条形统计图 ✓', '类别多少比较', '高度→数量，直观易读'],
              ['扇形图（下节）', '各部分占比', '扇形面积→比例'],
              ['折线图（下节）', '变化趋势',  '折线斜率→变化方向'],
            ],
          });
          S.addText('s5-next',  3, 5.5, '下节课：扇形图与折线图 →', { size: 15, color: PURPLE, anchorX: 'middle' });
          S.addText('s5-motto', 3, 4.0, '数据会说话，图形让它说得更清楚！', { size: 14, color: GREEN, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
