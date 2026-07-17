// s2-explore.js  二、数轴六连走（4步）
// 数学验算（六情形）：
//   ①(+5)+(+3) = +8   同向东，5+3=8
//   ②(-5)+(-3) = -8   同向西，5+3=8，取负
//   ③(+5)+(-3) = +2   异号，|+5|>|-3|，取正，5-3=2
//   ④(-5)+(+3) = -2   异号，|-5|>|+3|，取负，5-3=2
//   ⑤(+5)+(-5) = 0    相反数，0
//   ⑥(-4)+0   = -4   加0不变
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数
  // bbox: [-2, 5, 12, -3]，数轴在 y=0，范围 -6~+9
  // 1数学单位 = 1画面单位（keepAspect:false，直接映射）
  var AXIS_Y = 0;
  // 在画面上数轴原点对应 x=3（留左边2单位给标注）
  var OX = 3; // 原点画面x坐标
  function px(n) { return OX + n; } // 数值n → 画面x

  // 闭包变量——setup时重置
  var prevIds = [];

  function clearPrev() {
    for (var i = 0; i < prevIds.length; i++) {
      S.remove(prevIds[i]);
    }
    prevIds = [];
  }

  // 绘制数轴主体（含刻度 -6~+9）
  function drawAxis() {
    S.addSegment('s2-axis', [px(-6) - 0.3, AXIS_Y], [px(9) + 0.5, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    // 箭头
    S.addSegment('s2-arr1', [px(9) + 0.3, AXIS_Y + 0.12], [px(9) + 0.6, AXIS_Y],
      { color: INK, width: 2, dash: 0 });
    S.addSegment('s2-arr2', [px(9) + 0.3, AXIS_Y - 0.12], [px(9) + 0.6, AXIS_Y],
      { color: INK, width: 2, dash: 0 });
    // 刻度 -6~+9
    for (var n = -6; n <= 9; n++) {
      var x = px(n);
      S.addSegment('s2-tick-' + (n + 10), [x, AXIS_Y - 0.15], [x, AXIS_Y + 0.15],
        { color: INK, width: 1.5, dash: 0 });
      if (n >= -6 && n <= 9 && n % 2 === 0) {
        S.addText('s2-lab-' + (n + 10), x - 0.12, AXIS_Y - 0.45, '' + n,
          { color: INK, size: 13 });
      }
    }
    // 原点标0
    S.addText('s2-lab-0', px(0) - 0.08, AXIS_Y - 0.45, '0', { color: INK, size: 13 });
    // 方向标注
    S.addText('s2-dir-e', px(8.5), AXIS_Y + 0.45, '东(+)', { color: COOL, size: 13 });
    S.addText('s2-dir-w', px(-5.5), AXIS_Y + 0.45, '西(−)', { color: WARM, size: 13 });
  }

  // 画一段水平箭头（从x1到x2，y高度，颜色）
  function drawArrow(id, x1, x2, yBase, color) {
    var y = yBase;
    var len = x2 - x1;
    var dir = len >= 0 ? 1 : -1;
    // 主线
    S.addSegment(id + '-line', [x1, y], [x2, y], { color: color, width: 3, dash: 0 });
    // 箭头
    var ax = x2 - dir * 0.25;
    S.addSegment(id + '-ah1', [ax, y + 0.12], [x2, y], { color: color, width: 2.5, dash: 0 });
    S.addSegment(id + '-ah2', [ax, y - 0.12], [x2, y], { color: color, width: 2.5, dash: 0 });
    prevIds.push(id + '-line', id + '-ah1', id + '-ah2');
  }

  // 画起点竖线
  function drawVLine(id, x, color) {
    S.addSegment(id, [x, AXIS_Y - 0.2], [x, AXIS_Y + 0.2],
      { color: color, width: 2.5, dash: 0 });
    prevIds.push(id);
  }

  // 标注文字
  function drawLabel(id, x, y, text, color, size) {
    S.actor(id, x, y, text, { color: color, size: size || 15 });
    prevIds.push(id);
  }

  var scene = {
    id: 's2',
    title: '二、数轴六连走',
    bbox: [-2, 5, 12, -3],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      prevIds = [];
    },
    steps: [
      // Step 1：情形①②（同号）
      {
        narration: '规定向东为正，向西为负。一个人从原点出发，先走一段再走一段，落点坐标就是两数之和。情形①：先向东走5步，再向东走3步，落在+8。情形②：先向西走5步，再向西走3步，落在-8。两次同向，结果绝对值相加，方向不变。',
        enter: function (anim) {
          drawAxis();
          // ① 上方：y=1.0
          drawArrow('s2-c1-a', px(0), px(5), 1.0, COOL);
          drawArrow('s2-c1-b', px(5), px(8), 1.0, COOL);
          drawVLine('s2-c1-end', px(8), GREEN);
          drawLabel('s2-c1-lab', px(4), 1.6, '①(+5)+(+3) = <b>+8</b>', COOL, 15);
          drawLabel('s2-c1-pt', px(8), -0.6, '+8', GREEN, 14);

          // ② 下方：y=-1.0
          drawArrow('s2-c2-a', px(0), px(-5), -1.0, WARM);
          drawArrow('s2-c2-b', px(-5), px(-8), -1.0, WARM);
          drawVLine('s2-c2-end', px(-8), WARM);
          drawLabel('s2-c2-lab', px(-4), -1.6, '②(-5)+(-3) = <b>-8</b>', WARM, 15);
          drawLabel('s2-c2-pt', px(-8), -0.6, '-8', WARM, 14);

          P.renderCard(
            '<b>情形①②：同号两数相加</b><br>' +
            '①$(+5)+(+3)$：两次向东，落在 <b>+8</b><br>' +
            '②$(-5)+(-3)$：两次向西，落在 <b>-8</b><br>' +
            '同向：结果绝对值 <b>相加</b>，方向不变。'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      // Step 2：情形③④（异号，重点对比）
      {
        narration: '情形③：先向东走5步，再向西走3步，东边走得更远，落在+2。情形④：先向西走5步，再向东走3步，西边走得更远，落在-2。关键：符号跟着走得更远的方向走，绝对值用较大的减去较小的。',
        enter: function (anim) {
          clearPrev();
          // ③ 上方：y=1.0
          drawArrow('s2-c3-a', px(0), px(5), 1.0, COOL);
          drawArrow('s2-c3-b', px(5), px(2), 1.0, WARM);
          drawVLine('s2-c3-end', px(2), GREEN);
          drawLabel('s2-c3-lab', px(3), 1.8, '③(+5)+(-3) = <b>+2</b>', COOL, 15);
          drawLabel('s2-c3-note', px(3), 2.5, '|+5|=5 &gt; |-3|=3，取正', TEAL, 13);
          drawLabel('s2-c3-pt', px(2), -0.6, '+2', GREEN, 14);

          // ④ 下方：y=-1.0
          drawArrow('s2-c4-a', px(0), px(-5), -1.0, WARM);
          drawArrow('s2-c4-b', px(-5), px(-2), -1.0, COOL);
          drawVLine('s2-c4-end', px(-2), WARM);
          drawLabel('s2-c4-lab', px(-3), -1.8, '④(-5)+(+3) = <b>-2</b>', WARM, 15);
          drawLabel('s2-c4-note', px(-3), -2.5, '|-5|=5 &gt; |+3|=3，取负', TEAL, 13);
          drawLabel('s2-c4-pt', px(-2), -0.6, '-2', WARM, 14);

          P.renderCard(
            '<b>情形③④：异号两数相加（重点！）</b><br>' +
            '③$(+5)+(-3)$：东边远，取正，$5-3=2$，结果 <b>+2</b><br>' +
            '④$(-5)+(+3)$：西边远，取负，$5-3=2$，结果 <b>-2</b><br>' +
            '<b>符号跟着绝对值较大的加数走！绝对值相减！</b>',
            'warm'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      // Step 3：情形⑤⑥（特殊情形）
      {
        narration: '情形⑤：向东5步再向西5步，恰好回到原点，结果0！两个互为相反数，和为0。情形⑥：向西走4步，然后不动（加0），停在-4，与0相加不变。',
        enter: function (anim) {
          clearPrev();
          // ⑤ 上方
          drawArrow('s2-c5-a', px(0), px(5), 1.0, COOL);
          drawArrow('s2-c5-b', px(5), px(0), 1.0, WARM);
          drawVLine('s2-c5-end', px(0), TEAL);
          drawLabel('s2-c5-lab', px(2.5), 1.8, '⑤(+5)+(-5) = <b>0</b>', TEAL, 15);
          drawLabel('s2-c5-note', px(2.5), 2.5, '互为相反数，恰好回原点', TEAL, 13);

          // ⑥ 下方
          drawArrow('s2-c6-a', px(0), px(-4), -1.0, WARM);
          // 不动：只画一个点
          drawVLine('s2-c6-end', px(-4), WARM);
          drawLabel('s2-c6-lab', px(-2), -1.8, '⑥(-4)+0 = <b>-4</b>', WARM, 15);
          drawLabel('s2-c6-note', px(-2), -2.5, '第二步不动，加0结果不变', INK, 13);
          drawLabel('s2-c6-pt', px(-4), -0.6, '-4', WARM, 14);

          P.renderCard(
            '<b>情形⑤⑥：特殊情形</b><br>' +
            '⑤$(+5)+(-5) = 0$：互为相反数，和为 <b>0</b><br>' +
            '⑥$(-4)+0 = -4$：与0相加，结果 <b>不变</b>'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      // Step 4：六情形列表归纳
      {
        narration: '六种情形都走完了。我们把结果列成一张表，归纳规律。同学们看，能分几类？同号两种、异号两种、特殊两种——共三类，对应三条法则，下一环节我们来总结。',
        enter: function (anim) {
          clearPrev();
          P.renderTable({
            head: ['情形', '算式', '结果', '规律'],
            rows: [
              ['①', '$(+5)+(+3)$', '<b>+8</b>', '同号：绝对值相加，取同号'],
              ['②', '$(-5)+(-3)$', '<b>-8</b>', '同号：绝对值相加，取同号'],
              ['③', '$(+5)+(-3)$', '<b>+2</b>', '异号：绝对值相减，取大号'],
              ['④', '$(-5)+(+3)$', '<b>-2</b>', '异号：绝对值相减，取大号'],
              ['⑤', '$(+5)+(-5)$', '<b>0</b>',  '相反数：和为0'],
              ['⑥', '$(-4)+0$',    '<b>-4</b>', '加0：结果不变'],
            ],
          });
          P.renderCard(
            '<b>六情形归纳</b><br>' +
            '三类规律已浮现：同号→绝对值相加；异号→绝对值相减；特殊→相反数/加0。<br>' +
            '下一环节正式提炼三条法则！',
            'teal'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
