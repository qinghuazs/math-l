// 环节三：三、分段决策
// 数学验算：
//   折线A：过 (0,15) 和 (250,40)，斜率 = (40-15)/250 = 0.1（对应每分钟0.1元）
//   折线B：过 (0,0) 和 (250,50)，斜率 = 50/250 = 0.2（对应每分钟0.2元）
//   交点：15+0.1t=0.2t → t=150，费用=30
//   bbox: t轴[0,250]，费用轴[0,50]，用 bbox:[-20,55,270,-5] 留边距
// 画板坐标系：t→x轴（0~250），费用→y轴（0~50）
// addPolyline: 方案A点列 [[0,15],[250,40]]，方案B点列 [[0,0],[250,50]]
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、分段决策',
    bbox: [-20, 58, 270, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '我们用折线图直观地看两个方案的费用随通话时间的变化。横轴表示月通话时间 t（分钟），纵轴表示费用（元）。暖色折线是方案 A，从 (0, 15) 出发，斜率为 0.1；冷色折线是方案 B，从原点出发，斜率为 0.2。两条线会在某个点相交，那个交点就是临界点！',
        enter: function (anim) {
          // 坐标轴
          S.addSegment('s3-xaxis', [0, 0], [260, 0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-yaxis', [0, 0], [0, 52], { color: INK, width: 2, dash: 0 });
          // 箭头 x
          S.addSegment('s3-xarr1', [258, 1.2], [262, 0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-xarr2', [258, -1.2], [262, 0], { color: INK, width: 2, dash: 0 });
          // 箭头 y
          S.addSegment('s3-yarr1', [-1.2, 50.5], [0, 52.5], { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-yarr2', [1.2, 50.5], [0, 52.5], { color: INK, width: 2, dash: 0 });
          // 轴标签
          S.addText('s3-xlabel', 260, -4, '$t$（分钟）', { color: INK, size: 14 });
          S.addText('s3-ylabel', 2, 53, '费用（元）', { color: INK, size: 14 });
          // 刻度 t轴
          var txvals = [50, 100, 150, 200, 250];
          for (var i = 0; i < txvals.length; i++) {
            S.addSegment('s3-tx-' + txvals[i], [txvals[i], -1.5], [txvals[i], 1.5],
              { color: INK, width: 1, dash: 0 });
            S.addText('s3-txl-' + txvals[i], txvals[i] - 5, -4.5, '' + txvals[i],
              { color: INK, size: 12 });
          }
          // 刻度 费用轴
          var tyvals = [10, 20, 30, 40, 50];
          for (var j = 0; j < tyvals.length; j++) {
            S.addSegment('s3-ty-' + tyvals[j], [-1.5, tyvals[j]], [1.5, tyvals[j]],
              { color: INK, width: 1, dash: 0 });
            S.addText('s3-tyl-' + tyvals[j], -14, tyvals[j] - 1, '' + tyvals[j],
              { color: INK, size: 12 });
          }
          // 方案A折线：(0,15) → (250,40)
          S.addPolyline('s3-lineA', [[0, 15], [250, 40]], { color: WARM, width: 3 });
          S.addText('s3-labA', 200, 37, '方案 A', { color: WARM, size: 15 });
          // 方案B折线：(0,0) → (250,50)
          S.addPolyline('s3-lineB', [[0, 0], [250, 50]], { color: COOL, width: 3 });
          S.addText('s3-labB', 200, 46, '方案 B', { color: COOL, size: 15 });
          P.renderCard(
            '<b>折线图</b><br>' +
            '暖色：方案 A，费用 $= 15 + 0.1t$（从 15 元起步）<br>' +
            '冷色：方案 B，费用 $= 0.2t$（从 0 元起步，涨更快）<br>' +
            '两线将在某处相交——临界点就在那里！'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      {
        narration: '在交点 (150, 30) 处，我们画一个圆点标注，再画一条竖线 t 等于 150。这个点的横坐标 150 恰好就是我们用方程求出来的解——图形和代数互相验证！交点左侧，方案 B 费用线更低；交点右侧，方案 A 费用线更低。',
        enter: function (anim) {
          // 竖线 t=150
          S.addSegment('s3-vline', [150, 0], [150, 32], { color: GRAY, width: 2, dash: 2 });
          // 交点标注
          S.dropPoint('s3-cross', 150, 30, { color: TEAL, size: 6 });
          S.addText('s3-crosslab', 153, 32, '交点 (150, 30)', { color: TEAL, size: 14 });
          S.addText('s3-t150lab', 150, -4.5, '150', { color: TEAL, size: 13 });
          P.renderCard(
            '<b>交点 $(150, 30)$</b><br>' +
            '横坐标 $t=150$ = 方程的解<br>' +
            '纵坐标 $30$ 元 = 两方案在临界点的共同费用<br>' +
            '折线交点的横坐标，恰好是方程的解——<b>图形验证代数！</b>',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '现在来看三段决策。t 小于 150 时，方案 B 的蓝色线在下面，选方案 B 更省钱；t 等于 150 时，两方案等价；t 大于 150 时，方案 A 的橙色线在下面，选方案 A 更省钱。记住：三段缺一不可，只说"t 等于 150 选 A 或 B"是不完整的！',
        enter: function (anim) {
          S.actor('s3-zoneB', 60, 14, '选方案 B', { color: COOL, size: 15, bold: true });
          S.actor('s3-zoneEq', 143, 18, '等价', { color: PURPLE, size: 13, bold: true });
          S.actor('s3-zoneA', 210, 26, '选方案 A', { color: WARM, size: 15, bold: true });
          P.renderCard(
            '<b>三段决策（缺一不可）</b><br>' +
            '$t \\lt 150$ 分钟：方案 B 更省钱，选方案 B<br>' +
            '$t = 150$ 分钟：两方案等价，任选<br>' +
            '$t \\gt 150$ 分钟：方案 A 更省钱，选方案 A<br>' +
            '常见错误：只写 $t=150$ 等价，漏掉两侧！',
            'warm'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '最后，把三段决策整理成表格，直观清晰。折线图告诉我们的"直觉"和方程给我们的"精确答案"，完全一致——这就是方程的力量！',
        enter: function (anim) {
          P.renderTable({
            head: ['通话时间 $t$', '决策', '依据'],
            rows: [
              ['$t \\lt 150$ 分钟', '选方案 B', '方案B费用 $\\lt$ 方案A费用'],
              ['$t = 150$ 分钟', '两方案等价', '费用均为 30 元'],
              ['$t \\gt 150$ 分钟', '选方案 A', '方案A费用 $\\lt$ 方案B费用'],
            ],
          });
          P.renderCard(
            '<b>数学建模总结</b><br>' +
            '生活情境 → 设未知数 → 列方程 → 求解 → 分析三段 → 给出决策<br>' +
            '折线图直观呈现，方程精确计算，相辅相成。',
            'cool'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
