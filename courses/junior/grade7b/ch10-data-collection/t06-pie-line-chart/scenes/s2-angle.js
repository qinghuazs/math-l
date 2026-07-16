(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';

  // 数据：某班40名学生上学方式
  var ITEMS    = ['步行', '骑车', '公交', '家长接送'];
  var COUNTS   = [8, 12, 16, 4];
  var TOTAL    = 40;
  var COLORS   = [BLUE, GREEN, WARM, PURPLE];

  // 计算结果
  var FREQS    = ['8/40', '12/40', '16/40', '4/40'];
  var PERCENTS = ['20%', '30%', '40%', '10%'];
  var DEG      = ['72°', '108°', '144°', '36°'];

  // 扇形图圆心（keepAspect）
  var CX = 0, CY = 0, R = 3.5;
  var startAngles = [];

  function computeStarts() {
    var a = 90;
    var angles = [72, 108, 144, 36];
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      startAngles[i] = a;
      a += angles[i];
    }
  }

  var scene = {
    id: 's2',
    title: '二、百分比与圆心角的计算',
    board: { axis: false, keepAspect: true },
    bbox: [-9, 7, 9, -7],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      computeStarts();
    },
    steps: [
      {
        narration: '画扇形图之前，必须先算出每部分的<b>频率</b>、<b>百分比</b>和<b>圆心角</b>。频率 = 该类别频数 ÷ 总频数；百分比 = 频率 × 100%；圆心角 = 百分比 × 360°。来填写计算表！',
        enter: function () {
          S.addText('s2-f1', -7.5, 5.5, '$\\text{频率} = \\dfrac{\\text{频数}}{\\text{总数}}$', { size: 15, color: BLUE });
          S.addText('s2-f2', -7.5, 3.5, '$\\text{百分比} = \\text{频率} \\times 100\\%$', { size: 15, color: GREEN });
          S.addText('s2-f3', -7.5, 1.5, '$\\text{圆心角} = \\text{百分比} \\times 360°$', { size: 15, color: WARM });
          P.renderTable({
            head: ['方式', '频数', '频率', '百分比', '圆心角'],
            rows: [
              ['步行',     '8',  '8/40', '20%', '72°'],
              ['骑车',     '12', '12/40','30%', '108°'],
              ['公交',     '16', '16/40','40%', '144°'],
              ['家长接送', '4',  '4/40', '10%', '36°'],
              ['合计',     '40', '1',    '100%','360°'],
            ],
          });
        },
      },
      {
        narration: '验算一下：四个圆心角相加 $72° + 108° + 144° + 36° = 360°$，等于整圆。百分比合计 $20\\% + 30\\% + 40\\% + 10\\% = 100\\%$。两个验证都通过！这说明我们的计算是正确的。扇形图就是用这些圆心角画出来的。',
        enter: function () {
          S.addText('s2-check1', -7.5, 5.0,
            '$72° + 108° + 144° + 36° = 360°$ ✓', { size: 14, color: WARM, anchorX: 'left' });
          S.addText('s2-check2', -7.5, 3.2,
            '$20\\% + 30\\% + 40\\% + 10\\% = 100\\%$ ✓', { size: 14, color: GREEN, anchorX: 'left' });
          // 右侧画完整扇形图
          var angles = [72, 108, 144, 36];
          var i;
          for (i = 0; i < ITEMS.length; i++) {
            S.addSector('s2-sec' + i, [CX + 3, CY - 1], R,
              startAngles[i], startAngles[i] + angles[i],
              { color: COLORS[i], fillOpacity: 0.75 });
          }
          S.addText('s2-pie-title', CX + 3, 4.0, '扇形统计图', { size: 14, color: INK, anchorX: 'middle' });
          // 图例
          var lblAngles = [126, 234, 342, 54]; // 中间角
          for (i = 0; i < ITEMS.length; i++) {
            var mid = (startAngles[i] + angles[i] / 2) * Math.PI / 180;
            var lx = (CX + 3) + (R + 1.1) * Math.cos(mid);
            var ly = (CY - 1) + (R + 1.1) * Math.sin(mid);
            S.addText('s2-lbl' + i, lx, ly,
              ITEMS[i] + ' ' + PERCENTS[i],
              { size: 12, color: COLORS[i], anchorX: 'middle' });
          }
          P.renderCard('<b>扇形统计图</b>适合表示：<br>· 各部分占总体的<b>比例</b><br>· 构成与结构<br>不适合：精确比较接近数值');
        },
      },
      {
        narration: '扇形统计图的关键在于——整个圆代表<b>总体</b>（100%），每个扇形代表一个部分，扇形的圆心角大小就是该部分的比例。圆心角越大，占比越大。记住这个关系：$圆心角 : 360° = 该部分 : 总体$。',
        enter: function () {
          S.addText('s2-key', 0, 4.5, '$\\dfrac{圆心角}{360°} = \\dfrac{该部分}{总体}$', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('s2-eg1', -6, 2.0, '例：公交 16 人占 40 人', { size: 14, color: INK });
          S.addText('s2-eg2', -6, 0.5, '$\\dfrac{16}{40} = 40\\%$', { size: 16, color: WARM });
          S.addText('s2-eg3', -6, -1.2, '$40\\% \\times 360° = 144°$', { size: 16, color: WARM });
          var angles = [72, 108, 144, 36];
          var i;
          for (i = 0; i < ITEMS.length; i++) {
            S.addSector('s2-sec' + i, [CX + 3, CY - 2], R,
              startAngles[i], startAngles[i] + angles[i],
              { color: COLORS[i], fillOpacity: 0.75 });
          }
          // 标记公交圆心角
          var mid2 = (startAngles[2] + 72) * Math.PI / 180;
          S.addText('s2-144', (CX + 3) + 0.55 * R * Math.cos(mid2),
            (CY - 2) + 0.55 * R * Math.sin(mid2),
            '$144°$', { size: 14, color: '#fff', anchorX: 'middle' });
          P.renderCard('扇形图核心公式：<br>$\\dfrac{圆心角}{360°} = 百分比$<br><br>公交：$\\dfrac{144°}{360°} = 40\\%$');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
