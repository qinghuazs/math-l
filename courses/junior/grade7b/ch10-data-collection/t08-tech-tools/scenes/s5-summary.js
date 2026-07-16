(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var scene = {
    id: 's5',
    title: '五、小结与实践',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '本课我们学习了<b>利用信息技术工具画统计图</b>的完整流程：录入数据、公式计算、选中区域、插入图表、美化调整、评价检查。信息技术的优势是快速、精确、美观、便于修改；但图表类型的选择和结论的判断，仍然需要我们用统计思维来完成。工具是手段，思考是核心！',
        enter: function () {
          S.addText('s5-title', 3, 13.5, '本课小结', { size: 18, color: BLUE, anchorX: 'middle' });

          // 完整流程（左半）
          S.addText('s5-flow-hd', 0.2, 12.3, '信息技术画图完整流程', { size: 14, color: BLUE, anchorX: 'left' });
          var flow = [
            '① 录入类别和频数数据',
            '② 用公式计算合计、频率',
            '③ 选中数据区域（拖动高亮）',
            '④ 插入→图表→选择类型',
            '⑤ 添加标题、单位、数据标签',
            '⑥ 评价检查图表质量',
          ];
          var i;
          for (i = 0; i < flow.length; i++) {
            S.addText('s5-f' + i, 0.2, 11.2 - i * 1.6, flow[i], {
              size: 12,
              color: i < 2 ? BLUE : (i < 4 ? GREEN : WARM),
              anchorX: 'left',
            });
          }

          // 分隔线
          S.addSegment('s5-div', [0, 1.5], [6.5, 1.5], { color: '#b0bec5', width: 1, dash: 2 });

          // 三种图表对比表
          P.renderCard(
            '<b>三种统计图选择</b>：<br>' +
            '条形图 → 比较各类别<b>多少</b><br>' +
            '扇形图 → 表示各部分<b>比例</b><br>' +
            '折线图 → 反映数据<b>变化趋势</b>'
          );
        },
      },
      {
        narration: '课后上机实践任务来了！调查本班同学最喜欢的学科，在电子表格中录入数据，计算频率，分别生成<b>条形图</b>和<b>扇形图</b>，比较两种图各自的优势，写出分析结论。别忘记用图表质量七项清单逐项检查！信息技术 + 统计思维，是现代数据分析的强大组合！',
        enter: function () {
          S.addText('s5-practice-title', 3, 13.5, '上机实践任务', { size: 16, color: GREEN, anchorX: 'middle' });
          P.renderTable({
            head: ['任务步骤', '操作要点'],
            rows: [
              ['① 数据收集', '调查本班最喜欢的学科（5-6种）'],
              ['② 录入表格', 'A列：学科名；B列：频数'],
              ['③ 公式计算', '=SUM 合计；=B2/$B$7 频率'],
              ['④ 生成图表', '先条形图，再切换扇形图'],
              ['⑤ 美化图表', '添加标题、单位、数据标签'],
              ['⑥ 写出结论', '哪学科最受欢迎？分析原因'],
              ['⑦ 评价检查', '用七项清单逐项核对'],
            ],
          });
          S.addText('s5-motto', 3, 1.0, '数据会说话，图形让它说得更清楚！',
            { size: 14, color: PURPLE, anchorX: 'middle' });
          S.addText('s5-motto2', 3, -0.3, '信息技术 + 统计思维 = 强大工具',
            { size: 13, color: WARM, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
