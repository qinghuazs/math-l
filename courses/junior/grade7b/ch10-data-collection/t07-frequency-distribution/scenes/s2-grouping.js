(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 身高数据
  var MAX_VAL = 173;
  var MIN_VAL = 147;
  // 6个分组的频数
  var GROUP_LABELS = [
    '$145 \\leq x < 150$',
    '$150 \\leq x < 155$',
    '$155 \\leq x < 160$',
    '$160 \\leq x < 165$',
    '$165 \\leq x < 170$',
    '$170 \\leq x < 175$',
  ];
  var GROUP_PLAIN = ['145~150', '150~155', '155~160', '160~165', '165~170', '170~175'];
  var TALLIES = ['丨丨', '正丨丨', '正正丨丨丨', '正正正丨', '正丨丨丨丨', '丨丨丨'];
  var COUNTS = [2, 7, 13, 16, 9, 3];
  var TOTAL = 50;
  var RATE_STRS = [
    '$\\dfrac{2}{50}=0.04$',
    '$\\dfrac{7}{50}=0.14$',
    '$\\dfrac{13}{50}=0.26$',
    '$\\dfrac{16}{50}=0.32$',
    '$\\dfrac{9}{50}=0.18$',
    '$\\dfrac{3}{50}=0.06$',
  ];

  var scene = {
    id: 's2',
    title: '二、分组的步骤',
    bbox: [-1, 14, 9, -1],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第一步：计算<b>极差</b>。极差 = 最大值 − 最小值，反映数据的整体范围。我们这 50 个身高数据中，最大值是 173 cm，最小值是 147 cm，所以极差 = 173 − 147 = 26。这告诉我们数据跨越了 26 厘米的范围。',
        enter: function () {
          S.addText('s2-step1-title', 4, 13.2, '第一步：计算极差', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('s2-max', 1.5, 11.5, '最大值 = 173 cm', { size: 15, color: WARM, anchorX: 'left' });
          S.addText('s2-min', 1.5, 10.0, '最小值 = 147 cm', { size: 15, color: GREEN, anchorX: 'left' });
          S.addText('s2-formula', 4, 8.2, '$\\text{极差} = 最大值 - 最小值$', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('s2-calc', 4, 6.5, '$= 173 - 147 = 26$', { size: 17, color: BLUE, anchorX: 'middle' });
          P.renderCard('<b>极差</b> = 最大值 − 最小值<br>极差 = $173 - 147 = 26$（cm）<br>反映数据的<b>整体波动范围</b>');
        },
      },
      {
        narration: '第二步：确定<b>组数</b>和<b>组距</b>。组距是每组区间的长度；组数大约等于极差除以组距。极差为 26，我们选择分 6 组，组距 = 26 ÷ 6 ≈ 4.3，为了方便取整数，选<b>组距 = 5</b>，这样 6 组正好覆盖 30 cm，可以容纳所有数据。',
        enter: function () {
          S.addText('s2-step2-title', 4, 13.2, '第二步：确定组数与组距', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('s2-range', 4, 11.8, '极差 = 26', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('s2-decide1', 1.0, 10.2, '选择组数：6 组', { size: 14, color: GREEN, anchorX: 'left' });
          S.addText('s2-decide2', 1.0, 8.8, '初步组距：$26 \\div 6 \\approx 4.3$', { size: 14, color: INK, anchorX: 'left' });
          S.addText('s2-decide3', 1.0, 7.4, '取整为：<b>组距 = 5</b>', { size: 15, color: WARM, anchorX: 'left' });
          S.addText('s2-formula2', 4, 5.8, '$\\text{组数} \\approx \\dfrac{\\text{极差}}{\\text{组距}} = \\dfrac{26}{5} \\approx 6$', { size: 14, color: PURPLE, anchorX: 'middle' });
          S.addText('s2-tip', 4, 3.8, '6 组 × 组距 5 = 30 cm，覆盖全部数据 ✓', { size: 13, color: GREEN, anchorX: 'middle' });
          P.renderCard('<b>组距</b>：每组区间的长度（= 5 cm）<br><b>组数</b>：$\\approx$ 极差 ÷ 组距 $\\approx$ 6<br>组数一般选 5~12，本题取 6 组');
        },
      },
      {
        narration: '第三步：写出各组的<b>分组区间</b>。从最小值 145 开始（取比 147 略小的整数），每组宽度为 5，依次写出：[145, 150)，[150, 155)，……，[170, 175)，共 6 组。注意约定：<b>每组包含左端点，不含右端点</b>——即"上限不在本组内"。这样各组没有重叠，每个数据恰好落入一组。',
        enter: function () {
          S.addText('s2-step3-title', 4, 13.2, '第三步：写出分组区间', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('s2-convention', 4, 12.0, '约定：包含左端点，不含右端点（上限不在本组内）', { size: 12, color: WARM, anchorX: 'middle' });
          var i;
          var colors = ['#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1', '#1a237e'];
          for (i = 0; i < 6; i++) {
            S.addText('s2-grp' + i, 2.5, 10.8 - i * 1.7, GROUP_LABELS[i], { size: 14, color: colors[i], anchorX: 'middle' });
          }
          S.addText('s2-note', 4, 0.5, '各组不重叠，所有数据恰好各归一组', { size: 13, color: GREEN, anchorX: 'middle' });
          P.renderCard('6 个分组区间：<br>' +
            '$145\\leq x<150$，$150\\leq x<155$，$155\\leq x<160$<br>' +
            '$160\\leq x<165$，$165\\leq x<170$，$170\\leq x<175$<br>' +
            '左闭右开，无重叠，无遗漏');
        },
      },
      {
        narration: '第四步：<b>划记统计频数</b>，完成频数分布表。对每个数据逐一划入对应组，用划记法计数，得到每组频数。最后还可以计算频率（频率 = 频数 ÷ 总数）。这张表就是<b>频数分布表</b>，完整记录了数据的分布情况。',
        enter: function () {
          P.renderTable({
            head: ['身高区间 (cm)', '划记', '频数', '频率'],
            rows: [
              [GROUP_PLAIN[0], TALLIES[0], '' + COUNTS[0], RATE_STRS[0]],
              [GROUP_PLAIN[1], TALLIES[1], '' + COUNTS[1], RATE_STRS[1]],
              [GROUP_PLAIN[2], TALLIES[2], '' + COUNTS[2], RATE_STRS[2]],
              [GROUP_PLAIN[3], TALLIES[3], '' + COUNTS[3], RATE_STRS[3]],
              [GROUP_PLAIN[4], TALLIES[4], '' + COUNTS[4], RATE_STRS[4]],
              [GROUP_PLAIN[5], TALLIES[5], '' + COUNTS[5], RATE_STRS[5]],
              ['<b>合计</b>', '—', '<b>50</b>', '<b>1</b>'],
            ],
          });
          S.addText('s2-table-title', 4, 13.2, '频数分布表', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('s2-freq-tip', 4, 1.0, '频率 = 频数 ÷ 总数，所有频率之和 = 1', { size: 13, color: GREEN, anchorX: 'middle' });
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
