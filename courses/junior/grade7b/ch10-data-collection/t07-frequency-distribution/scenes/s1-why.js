(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32';

  // 模拟 50 名同学的身高原始数据（145~174cm，各不相同以体现"杂乱"）
  var RAW_DATA = [
    163, 158, 172, 155, 161, 168, 150, 157, 165, 170,
    154, 162, 147, 160, 167, 153, 159, 166, 171, 156,
    164, 149, 158, 161, 168, 155, 163, 170, 152, 159,
    166, 148, 162, 157, 165, 151, 160, 169, 154, 163,
    158, 173, 156, 164, 149, 161, 167, 153, 162, 170,
  ];

  var scene = {
    id: 's1',
    title: '一、为什么要分组',
    bbox: [-1, 14, 9, -1],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，假设我们调查了全班 50 名同学的身高，得到下面这些原始数据。单位是厘米，从 145 到 174 厘米不等——这 50 个数据每个都不一样，看起来密密麻麻！如果要一一对比，非常麻烦，更看不出整体规律。',
        enter: function () {
          var i, r, c, val;
          S.addText('s1-title', 4, 13.5, '50名同学身高原始数据（cm）', { size: 15, color: INK, anchorX: 'middle' });
          for (i = 0; i < RAW_DATA.length; i++) {
            r = Math.floor(i / 10);
            c = i % 10;
            val = RAW_DATA[i];
            S.addText('s1-raw' + i,
              -0.5 + c * 0.95,
              11.8 - r * 2.2,
              '' + val,
              { size: 12, color: (val >= 160 && val < 165 ? WARM : INK), anchorX: 'left' }
            );
          }
          P.renderCard('<b>原始数据</b>：50个身高值，各不相同。<br>直接逐一比较非常麻烦，<b>看不出整体分布规律</b>。');
        },
      },
      {
        narration: '如果我们想知道：全班身高主要集中在哪个范围？哪个区间的同学最多？光看这 50 个散乱的数字，根本无从下手。这就是问题所在——<b>连续数据太分散</b>，必须想办法归类整理！',
        enter: function () {
          var i, r, c, val;
          S.addText('s1-title', 4, 13.5, '50名同学身高原始数据（cm）', { size: 15, color: INK, anchorX: 'middle' });
          for (i = 0; i < RAW_DATA.length; i++) {
            r = Math.floor(i / 10);
            c = i % 10;
            val = RAW_DATA[i];
            S.addText('s1-raw' + i,
              -0.5 + c * 0.95,
              11.8 - r * 2.2,
              '' + val,
              { size: 12, color: '#bdbdbd', anchorX: 'left' }
            );
          }
          // 问题框
          S.addText('s1-q1', 4, 1.8, '哪个区间的同学最多？', { size: 14, color: WARM, anchorX: 'middle' });
          S.addText('s1-q2', 4, 0.5, '身高主要集中在哪里？', { size: 14, color: BLUE, anchorX: 'middle' });
          P.renderCard('面对 50 个散乱数据，这些问题<b>无法直接回答</b>！<br>解决方案：把数据<b>按区间分组</b>，统计每组的频数。');
        },
      },
      {
        narration: '解决方法就是——<b>按区间分组统计</b>！把身高按一定间隔划分成若干组，统计每组有多少人，这就叫做<b>频数分布</b>。分组后数据立刻变得清晰有序，规律一目了然。接下来我们就学习如何科学分组。',
        enter: function () {
          S.addText('s1-arrow', 4, 12.5, '散乱数据', { size: 15, color: '#bdbdbd', anchorX: 'middle' });
          S.addText('s1-arrow2', 4, 11.0, '↓  按区间分组  ↓', { size: 15, color: BLUE, anchorX: 'middle' });
          // 示意分组结果
          var groups = [
            '[145, 150)', '[150, 155)', '[155, 160)',
            '[160, 165)', '[165, 170)', '[170, 175)',
          ];
          var cnts = [2, 7, 13, 16, 9, 3];
          var colors = ['#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1', '#1a237e'];
          var i;
          for (i = 0; i < groups.length; i++) {
            S.addText('s1-grp' + i, 1.0, 9.2 - i * 1.6, groups[i], { size: 13, color: colors[i], anchorX: 'left' });
            S.addText('s1-cnt' + i, 6.0, 9.2 - i * 1.6, cnts[i] + ' 人', { size: 13, color: colors[i], anchorX: 'left' });
          }
          S.addText('s1-label-g', 1.0, 10.0, '分组区间', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s1-label-c', 6.0, 10.0, '频数', { size: 13, color: INK, anchorX: 'left' });
          P.renderCard('<b>频数分布</b>：将数据分组，统计每组出现的次数（频数）。<br>连续数据分组统计，规律清晰可见！');
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
