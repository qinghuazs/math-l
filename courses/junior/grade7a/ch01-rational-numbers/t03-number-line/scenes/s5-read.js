// s5-read.js  五、读点（3步）
// 数学说明：
//   数轴 -4~4，UNIT=1.6，AXIS_Y=0
//   tx(n) = n * UNIT
//   读点：
//     A 在 tx(-3)=-4.8（原点左3格）→ -3
//     B 在 tx(2.5)=4.0（原点右2.5格，2与3中间偏左）→ 2.5
//     C 在 tx(0)=0（原点）→ 0
//   中点题：D 在 -1 与 -2 正中间 → tx(-1.5)=-2.4
//     验算：(-1.4+(-2.8))/2……实际 tx(-1)=-1.6, tx(-2)=-3.2，中点x=(-1.6+-3.2)/2=-2.4=tx(-1.5) ✓
//   bbox [-9, 7, 9, -4]，axis:false，keepAspect:false
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var UNIT   = 1.6;
  var AXIS_Y = 0;
  function tx(n) { return n * UNIT; }

  // 绘制数轴 -5~5（含所有标记）
  function drawAxis() {
    S.addSegment('s5-main', [tx(-5) - 0.4, AXIS_Y], [tx(5) + 0.8, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    S.addSegment('s5-arr1', [tx(5) + 0.6, AXIS_Y + 0.18], [tx(5) + 0.9, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    S.addSegment('s5-arr2', [tx(5) + 0.6, AXIS_Y - 0.18], [tx(5) + 0.9, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    S.addText('s5-ellip-r', tx(5) + 0.95, AXIS_Y - 0.2, '···', { color: INK, size: 16 });
    S.addText('s5-ellip-l', tx(-5) - 0.9, AXIS_Y - 0.2, '···', { color: INK, size: 16 });
    var n;
    for (n = -5; n <= 5; n++) {
      S.addSegment('s5-tick-' + (n + 5),
        [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
        { color: INK, width: 2, dash: 0 });
      if (n === 0) {
        S.addText('s5-tlab-O', tx(0) + 0.06, AXIS_Y + 0.4, 'O', { color: INK, size: 14 });
        S.addText('s5-tlab-0', tx(0) - 0.1, AXIS_Y - 0.55, '0', { color: INK, size: 14 });
      } else {
        S.addText('s5-tlab-' + (n + 5), tx(n) - 0.12, AXIS_Y - 0.55,
          '' + n, { color: INK, size: 14 });
      }
    }
  }

  var scene = {
    id: 's5',
    title: '五、读点',
    bbox: [-9, 7, 9, -4],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：先亮点 A/B/C，后揭数
      {
        narration: '现在换一个方向：数轴上已经有三个点 A、B、C，你能读出它们各对应什么数吗？先看点的位置，再说出对应的数。——A 在原点左边 3 格，所以 A 对应 -3；B 在 2 和 3 之间的中间，所以 B 对应 2.5；C 就在原点，C 对应 0！',
        enter: function (anim) {
          drawAxis();

          // 先只画点（悬念）
          S.dropPoint('s5-ptA', tx(-3), AXIS_Y, { color: WARM, size: 4 });
          S.addText('s5-labA-letter', tx(-3) - 0.08, AXIS_Y + 0.8, 'A',
            { color: WARM, size: 15, bold: true });

          S.dropPoint('s5-ptB', tx(2.5), AXIS_Y, { color: COOL, size: 4 });
          S.addText('s5-labB-letter', tx(2.5) - 0.08, AXIS_Y + 0.8, 'B',
            { color: COOL, size: 15, bold: true });

          S.dropPoint('s5-ptC', tx(0), AXIS_Y, { color: GREEN, size: 4 });
          S.addText('s5-labC-letter', tx(0) + 0.12, AXIS_Y + 0.8, 'C',
            { color: GREEN, size: 15, bold: true });

          P.renderCard(
            '<b>读点：A、B、C 各对应什么数？</b><br>' +
            '方法：看点在原点哪一侧，数几格<br>' +
            '右边为正，左边为负'
          );

          if (!anim) {
            // 快放：直接揭示答案
            S.addText('s5-labA-num', tx(-3) - 0.3, AXIS_Y - 1.1,
              'A = -3', { color: WARM, size: 14, bold: true });
            S.addText('s5-labB-num', tx(2.5) - 0.35, AXIS_Y - 1.1,
              'B = 2.5', { color: COOL, size: 14, bold: true });
            S.addText('s5-labC-num', tx(0) + 0.1, AXIS_Y - 1.1,
              'C = 0', { color: GREEN, size: 14, bold: true });
            P.renderCard(
              '<b>读点结果</b><br>' +
              'A 在原点左 3 格 → <b>A = -3</b><br>' +
              'B 在 2 与 3 中间 → <b>B = 2.5</b><br>' +
              'C 在原点 → <b>C = 0</b>'
            );
            return null;
          }

          // 动画：延迟后逐个揭示答案
          return delay(800).then(function () {
            S.addText('s5-labA-num', tx(-3) - 0.3, AXIS_Y - 1.1,
              'A = -3', { color: WARM, size: 14, bold: true });
            return S.pulse('s5-ptA', 2);
          }).then(function () {
            S.addText('s5-labB-num', tx(2.5) - 0.35, AXIS_Y - 1.1,
              'B = 2.5', { color: COOL, size: 14, bold: true });
            return S.pulse('s5-ptB', 2);
          }).then(function () {
            S.addText('s5-labC-num', tx(0) + 0.1, AXIS_Y - 1.1,
              'C = 0', { color: GREEN, size: 14, bold: true });
            return S.pulse('s5-ptC', 2);
          }).then(function () {
            P.renderCard(
              '<b>读点结果</b><br>' +
              'A 在原点左 3 格 → <b>A = -3</b><br>' +
              'B 在 2 与 3 中间 → <b>B = 2.5</b><br>' +
              'C 在原点 → <b>C = 0</b>'
            );
            return delay(200);
          });
        }
      },

      // Step 2：D 中点题（-1 与 -2 正中间 → -1.5 = -3/2）
      {
        narration: '提高一题：数轴上有一点 D，它在 -1 与 -2 正中间（到两端距离相等），D 对应什么数？——先确认 D 在负半轴；再看它在 -1 与 -2 之间，且距两端相等，说明它是中点；中点的坐标 = (-1+(-2)) ÷ 2 = -1.5 = $-\\frac{3}{2}$。',
        enter: function (anim) {
          // 补画 D 点（中点）
          S.addSegment('s5-midD-help', [tx(-2), AXIS_Y + 0.5], [tx(-1), AXIS_Y + 0.5],
            { color: TEAL, width: 1.5, dash: 2 });
          S.addText('s5-midD-lab', tx(-1.5) - 0.18, AXIS_Y + 0.75,
            '中点', { color: TEAL, size: 12 });

          if (!anim) {
            S.dropPoint('s5-ptD', tx(-1.5), AXIS_Y, { color: WARM, size: 4 });
            S.addText('s5-labD-letter', tx(-1.5) - 0.08, AXIS_Y + 1.2,
              'D', { color: WARM, size: 15, bold: true });
            S.addText('s5-labD-num', tx(-1.5) - 0.6, AXIS_Y - 1.1,
              'D = -1.5', { color: WARM, size: 14, bold: true });
            P.renderCard(
              '<b>中点题：D 在 -1 与 -2 正中间</b><br>' +
              '$D = \\dfrac{-1 + (-2)}{2} = -\\dfrac{3}{2} = -1.5$<br>' +
              '在负半轴，距原点 1.5 格'
            );
            return null;
          }

          return S.dropPoint('s5-ptD', tx(-1.5), AXIS_Y,
            { color: WARM, size: 4, animate: true }
          ).then(function () {
            S.addText('s5-labD-letter', tx(-1.5) - 0.08, AXIS_Y + 1.2,
              'D', { color: WARM, size: 15, bold: true });
            return S.pulse('s5-ptD', 2);
          }).then(function () {
            S.addText('s5-labD-num', tx(-1.5) - 0.6, AXIS_Y - 1.1,
              'D = -1.5', { color: WARM, size: 14, bold: true });
            P.renderCard(
              '<b>中点题：D 在 -1 与 -2 正中间</b><br>' +
              '$D = \\dfrac{-1 + (-2)}{2} = -\\dfrac{3}{2} = -1.5$<br>' +
              '在负半轴，距原点 1.5 格'
            );
            return delay(300);
          });
        }
      },

      // Step 3：归纳读点/描点互逆口诀（renderCard）
      {
        narration: '总结一下读点和描点的关系：描点是从数出发找点的位置；读点是从点出发说出对应的数。两者互逆！记住：右边几格就是正几，左边几格就是负几；小数和分数也能在刻度之间准确找到。',
        enter: function (anim) {
          S.actor('s5-sum-title', 0, 5.5, '读点 ↔ 描点 互逆', { color: COOL, size: 18, bold: true });
          S.actor('s5-sum1', 0, 4.0,
            '<b>描点</b>：由数 → 找点（正数向右，负数向左，按格数落点）',
            { color: WARM, size: 14 });
          S.actor('s5-sum2', 0, 2.8,
            '<b>读点</b>：由点 → 说数（看方向，数格子，右正左负）',
            { color: COOL, size: 14 });

          P.renderCard(
            '<b>口诀</b><br>' +
            '描点：从数出发，判断正负定方向，<br>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;按单位长度数格子，落点。<br>' +
            '读点：从点出发，看在原点哪一侧，<br>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数几格——右边是正，左边是负。<br>' +
            '<b>两者互逆，数与点一一对应！</b>',
            'cool'
          );

          return anim ? delay(300) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
