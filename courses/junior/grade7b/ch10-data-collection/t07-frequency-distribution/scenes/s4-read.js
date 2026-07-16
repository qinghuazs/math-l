(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 同 s3 的数据和参数
  var COUNTS = [2, 7, 13, 16, 9, 3];
  var GROUP_PLAIN = ['145~150', '150~155', '155~160', '160~165', '165~170', '170~175'];
  var COLORS = ['#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1', '#1a237e'];
  var W = 5;
  var CXS = [147.5, 152.5, 157.5, 162.5, 167.5, 172.5];
  var TOTAL = 50;

  function drawAxisLabels() {
    var i;
    S.addText('s4-yunit', 141, 18.5, '频数（人）', { size: 11, color: INK, anchorX: 'left' });
    var xTicks = [145, 150, 155, 160, 165, 170, 175];
    for (i = 0; i < xTicks.length; i++) {
      S.addText('s4-xtick' + i, xTicks[i], -0.8, '' + xTicks[i], { size: 10, color: INK, anchorX: 'middle' });
    }
    var yTicks = [2, 4, 6, 8, 10, 12, 14, 16];
    for (i = 0; i < yTicks.length; i++) {
      S.addText('s4-ytick' + i, 141.5, yTicks[i], '' + yTicks[i], { size: 10, color: INK, anchorX: 'right' });
    }
    S.addText('s4-chart-title', 158, 18.0, '50名同学身高频数分布直方图', { size: 13, color: INK, anchorX: 'middle' });
    S.addText('s4-xunit', 158, -1.5, '身高 (cm)', { size: 12, color: INK, anchorX: 'middle' });
  }

  function drawAllBars() {
    var i;
    for (i = 0; i < COUNTS.length; i++) {
      S.addBar('s4-bar' + i, CXS[i], W, COUNTS[i], { color: COLORS[i] });
      S.addText('s4-label' + i, CXS[i], COUNTS[i] + 0.5, '' + COUNTS[i],
        { size: 12, color: COLORS[i], anchorX: 'middle' }
      );
    }
  }

  var scene = {
    id: 's4',
    title: '四、从直方图读信息',
    bbox: [140, 19, 178, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '看这幅已经画好的频数分布直方图，我们能读出哪些信息？第一问：<b>哪个区间的人数最多？</b>——看哪根柱最高。160~165 cm 的柱最高，高度为 16，说明这个区间有<b>16 人</b>，是人数最多的区间。这就是"众数区间"。',
        enter: function () {
          drawAxisLabels();
          drawAllBars();
          // 高亮最高柱
          S.addPolygon('s4-hl1', [
            [CXS[3] - W / 2 - 0.3, 0],
            [CXS[3] + W / 2 + 0.3, 0],
            [CXS[3] + W / 2 + 0.3, COUNTS[3]],
            [CXS[3] - W / 2 - 0.3, COUNTS[3]],
          ], { color: '#fff59d', opacity: 0.45, borderWidth: 2, borderColor: '#f9a825' });
          S.addText('s4-q1-tip', CXS[3], 17.0, '人数最多！（16人）', { size: 12, color: WARM, anchorX: 'middle' });
          P.renderCard('<b>读图问1</b>：哪组人数最多？<br>→ 看最高的柱：<b>160~165 cm，共 16 人</b><br>该区间称为"众数区间"');
        },
      },
      {
        narration: '第二问：<b>身高在 155~165 cm 之间的同学有多少人？占总数的多少？</b>把 155~160 和 160~165 两组的频数加起来：13 + 16 = 29 人。占总数的比例：29 ÷ 50 = 0.58，即 58%。超过一半的同学身高落在这个范围！',
        enter: function () {
          drawAxisLabels();
          drawAllBars();
          // 高亮两组（idx=2,3）
          S.addPolygon('s4-hl2', [
            [CXS[2] - W / 2 - 0.3, 0],
            [CXS[3] + W / 2 + 0.3, 0],
            [CXS[3] + W / 2 + 0.3, COUNTS[3]],
            [CXS[2] - W / 2 - 0.3, COUNTS[3]],
          ], { color: '#e8f5e9', opacity: 0.55, borderWidth: 2, borderColor: '#2e7d32' });
          S.addText('s4-q2-tip', 158, 17.0, '13 + 16 = 29 人 = 58%', { size: 13, color: GREEN, anchorX: 'middle' });
          P.renderTable({
            head: ['区间', '频数', '小计'],
            rows: [
              ['155~160', '13', ''],
              ['160~165', '16', ''],
              ['<b>合计</b>', '', '<b>29人 (58%)</b>'],
            ],
          });
        },
      },
      {
        narration: '第三问：<b>描述数据的分布特征</b>。观察整个直方图的形状：从 145 cm 开始，频数逐渐增大，到 160~165 cm 达到峰值（16人），然后逐渐减小到 175 cm。这种"中间高、两端低"的分布形态，说明全班大多数同学的身高<b>集中在 155~170 cm 之间</b>，两端极高或极矮的同学较少。',
        enter: function () {
          drawAxisLabels();
          drawAllBars();
          // 标注趋势箭头（用文字模拟）
          S.addText('s4-trend1', 143, 13.0, '↗ 递增', { size: 12, color: BLUE, anchorX: 'left' });
          S.addText('s4-trend2', 163, 14.5, '↘ 递减', { size: 12, color: PURPLE, anchorX: 'left' });
          S.addText('s4-peak', 157, 17.2, '峰值（160~165 cm）', { size: 11, color: WARM, anchorX: 'middle' });
          // 标注集中区间
          S.addPolygon('s4-main', [
            [CXS[1] - W / 2, 0],
            [CXS[4] + W / 2, 0],
            [CXS[4] + W / 2, 0.5],
            [CXS[1] - W / 2, 0.5],
          ], { color: '#ffe082', opacity: 0.8, borderWidth: 0 });
          S.addText('s4-main-label', 160, 1.5, '← 数据集中区间（155~170 cm）→', { size: 11, color: WARM, anchorX: 'middle' });
          P.renderCard('<b>分布特征描述</b>：<br>• 中间高、两端低（近似钟形）<br>• 数据集中在 155~170 cm<br>• 两端（<150 或 ≥170）人数较少');
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
