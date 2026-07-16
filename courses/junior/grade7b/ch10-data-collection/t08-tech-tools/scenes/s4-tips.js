(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var scene = {
    id: 's4',
    title: '四、数据处理小技巧',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '电子表格不只是用来画图——它还有很多<b>数据处理功能</b>！第一个技巧：<b>常用公式函数</b>。=SUM 求和，=AVERAGE 求平均，=MAX 求最大值，=MIN 求最小值；计算频率时，用"=B2/$B$7"，其中 $B$7 是绝对引用，下拉填充时分母不变，非常方便！',
        enter: function () {
          S.addText('s4-title', 3, 13.5, '常用公式函数', { size: 16, color: BLUE, anchorX: 'middle' });
          P.renderTable({
            head: ['函数公式', '功能', '本例结果'],
            rows: [
              ['=SUM(B2:B6)',     '求合计频数',         '40'],
              ['=AVERAGE(B2:B6)', '求平均值',           '8'],
              ['=MAX(B2:B6)',     '求最大值',           '12'],
              ['=MIN(B2:B6)',     '求最小值',           '4'],
              ['=B2/$B$7',       '计算频率（绝对引用）', '0.30'],
              ['=B2/$B$7*100',   '计算百分比',         '30%'],
            ],
          });
          S.addText('s4-abs-tip', 3, 3.2,
            '$\\$B\\$7$：绝对引用，下拉填充时不变',
            { size: 12, color: WARM, anchorX: 'middle' });
        },
      },
      {
        narration: '第二个技巧：<b>排序功能</b>！选中数据区域，点击"数据→降序排列"，软件自动按频数从大到小重新排列。排好序后，最受欢迎的项目自动排第一，插入条形图就得到"从高到低"的漂亮图表！数据分析时，排序能帮你快速找出冠军和末尾。',
        enter: function () {
          S.addText('s4-sort-title', 3, 13.5, '排序后的数据（降序）', { size: 15, color: GREEN, anchorX: 'middle' });
          P.renderTable({
            head: ['排名', '体育项目', '频数（人）', '频率'],
            rows: [
              ['① 最多', '篮球',   '12', '30%'],
              ['②',     '羽毛球', '10', '25%'],
              ['③',     '足球',   '8',  '20%'],
              ['④',     '乒乓球', '6',  '15%'],
              ['⑤ 最少', '其他',   '4',  '10%'],
              ['合计',   '—',     '40', '100%'],
            ],
          });
          S.addText('s4-sort-op', 3, 3.5, '操作：选中数据 → 数据 → 降序排列', { size: 12, color: GREEN, anchorX: 'middle' });
          S.addText('s4-sort-res', 3, 2.3, '排序后图表：柱子从高到低，清晰美观', { size: 12, color: BLUE, anchorX: 'middle' });
        },
      },
      {
        narration: '第三个技巧：<b>图表质量检查清单</b>！用软件生成图表后，必须检查：图表类型合适吗？标题写清楚了吗？坐标轴有单位吗？y 轴从 0 开始吗？有没有选错数据区域？图例是否易读？——信息技术只是工具，<b>统计判断仍然靠人</b>！',
        enter: function () {
          S.addText('s4-check-title', 3, 13.5, '图表质量检查清单（七项）', { size: 14, color: PURPLE, anchorX: 'middle' });
          var checks = [
            { text: '① 图表类型是否适合数据特点？', ok: true },
            { text: '② 标题是否清楚完整？', ok: true },
            { text: '③ 坐标轴是否标注单位？', ok: true },
            { text: '④ y 轴是否从 0 开始？（条形图）', ok: true },
            { text: '⑤ 数据区域是否选择正确？', ok: true },
            { text: '⑥ 图例是否必要且易读？', ok: true },
            { text: '⑦ 结论是否符合图表实际？', ok: true },
          ];
          var i;
          for (i = 0; i < checks.length; i++) {
            S.addText('s4-chk' + i, 0.2, 11.5 - i * 1.75, checks[i].text, {
              size: 12, color: i % 2 === 0 ? PURPLE : INK, anchorX: 'left',
            });
          }
          P.renderCard('软件生图快，但<b>判断对不对</b>要靠你！<br>图表评价是统计学习的核心能力。');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
