(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 手工画图步骤（左列）
  var MANUAL_STEPS = [
    '① 收集原始数据',
    '② 划记法整理频数',
    '③ 计算频率（手算）',
    '④ 在纸上画坐标轴',
    '⑤ 用直尺量刻度、画柱',
    '⑥ 标注标题、单位、图例',
    '⑦ 修改时须重新画！',
  ];

  // 软件步骤（右列）
  var TECH_STEPS = [
    '① 录入数据到单元格',
    '② 选中数据区域',
    '③ 点击"插入图表"',
    '④ 选择图表类型',
    '⑤ 软件自动生成！',
    '⑥ 一键修改、调整',
  ];

  var scene = {
    id: 's1',
    title: '一、手工 vs 电子表格',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，我们之前已经学会了手工画条形图、扇形图和折线图。但手工画图有什么不便之处呢？——步骤多、计算量大、容易出错，而且一旦数据有修改就要重新画。信息技术工具——比如 Excel、WPS 表格——可以帮我们<b>自动完成这些繁琐的工作</b>！',
        enter: function () {
          var i;
          // 左侧标题
          S.addText('s1-manual-hd', 1.5, 13.5, '手工画图', { size: 15, color: WARM, anchorX: 'middle' });
          // 左侧分隔框
          S.addPolygon('s1-manual-bg', [
            [-0.8, 14.0],
            [3.0, 14.0],
            [3.0, 0.5],
            [-0.8, 0.5],
          ], { color: '#fff3e0', opacity: 0.6, borderWidth: 1.5, borderColor: WARM });
          for (i = 0; i < MANUAL_STEPS.length; i++) {
            S.addText('s1-m' + i, 0.1, 12.5 - i * 1.7, MANUAL_STEPS[i], {
              size: 12, color: i === 6 ? WARM : INK, anchorX: 'left',
            });
          }
          // 右侧标题
          S.addText('s1-tech-hd', 5.2, 13.5, '电子表格软件', { size: 15, color: BLUE, anchorX: 'middle' });
          // 右侧分隔框
          S.addPolygon('s1-tech-bg', [
            [3.3, 14.0],
            [7.0, 14.0],
            [7.0, 0.5],
            [3.3, 0.5],
          ], { color: '#e3f2fd', opacity: 0.6, borderWidth: 1.5, borderColor: BLUE });
          for (i = 0; i < TECH_STEPS.length; i++) {
            S.addText('s1-t' + i, 3.5, 12.5 - i * 2.0, TECH_STEPS[i], {
              size: 12, color: i >= 4 ? BLUE : INK, anchorX: 'left',
            });
          }
          P.renderCard('手工画图：步骤繁琐，需要手算、手绘<br>电子表格：<b>录入→选中→插入图表</b>，三步完成！');
        },
      },
      {
        narration: '信息技术工具有哪些优势？<b>第一，自动计算</b>——软件帮你算频率、百分比；<b>第二，快速生成</b>——三步就能得到精美统计图；<b>第三，便于修改</b>——数据改了图表自动更新；<b>第四，图表类型多</b>——条形、扇形、折线随意切换；<b>第五，美观整洁</b>——颜色、标题都可以自定义！',
        enter: function () {
          S.addText('s1-adv-title', 3, 13.5, '信息技术工具的五大优势', { size: 15, color: BLUE, anchorX: 'middle' });
          var advs = [
            '① 自动计算频率、百分比、求和',
            '② 快速生成图表（三步完成）',
            '③ 数据更新，图表自动刷新',
            '④ 条形图 / 扇形图 / 折线图随意切换',
            '⑤ 美观整洁，适合展示与汇报',
          ];
          var i;
          for (i = 0; i < advs.length; i++) {
            S.addPolygon('s1-adv-bg' + i, [
              [-0.6, 11.8 - i * 2.4],
              [6.8,  11.8 - i * 2.4],
              [6.8,  10.5 - i * 2.4],
              [-0.6, 10.5 - i * 2.4],
            ], { color: i % 2 === 0 ? '#e8f5e9' : '#e3f2fd', opacity: 0.7, borderWidth: 0 });
            S.addText('s1-adv' + i, 0.3, 11.3 - i * 2.4, advs[i], {
              size: 13, color: i % 2 === 0 ? BLUE : GREEN, anchorX: 'left',
            });
          }
          S.addSegment('s1-warn-div', [0, 0.3], [6.5, 0.3], { color: '#b0bec5', width: 1, dash: 2 });
          P.renderCard('<b>记住</b>：信息技术是<b>工具</b>，<br>但统计思考（选图、判断）仍需自己来！');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
