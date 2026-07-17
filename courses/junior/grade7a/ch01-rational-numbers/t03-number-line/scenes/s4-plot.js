// s4-plot.js  四、描点（3步）
// 数学说明：
//   数轴范围 -5~5，UNIT=1.4画面单位，AXIS_Y=0
//   tx(n) = n * UNIT（数值n→画面x坐标）
//   描点位置：
//     0  → tx(0)=0
//     4  → tx(4)=5.6
//     -2 → tx(-2)=-2.8
//     1.5 → tx(1.5)=2.1（1与2中间）
//     -1.5 → tx(-1.5)=-2.1（-1与-2中间）
//   -3/2=-1.5，落在 tx(-1)=-1.4 与 tx(-2)=-2.8 之间中点：(-1.4+-2.8)/2=-2.1 ✓
//   错误位置（红叉示意）：tx(-2.5)=-3.5（-2与-3之间）
//   bbox [-8, 6, 8, -4]，axis:false，keepAspect:false
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

  var UNIT   = 1.4;
  var AXIS_Y = 0;
  function tx(n) { return n * UNIT; }

  // 绘制标准数轴 -5 ~ 5
  function drawAxis() {
    S.addSegment('s4-main', [tx(-5) - 0.5, AXIS_Y], [tx(5) + 0.8, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    // 右箭头
    S.addSegment('s4-arr1', [tx(5) + 0.6, AXIS_Y + 0.18], [tx(5) + 0.9, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    S.addSegment('s4-arr2', [tx(5) + 0.6, AXIS_Y - 0.18], [tx(5) + 0.9, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    // 省略号
    S.addText('s4-ellip-r', tx(5) + 0.95, AXIS_Y - 0.2, '···', { color: INK, size: 16 });
    S.addText('s4-ellip-l', tx(-5) - 0.9, AXIS_Y - 0.2, '···', { color: INK, size: 16 });
    // 刻度 -5~5
    var n;
    for (n = -5; n <= 5; n++) {
      S.addSegment('s4-tick-' + (n + 5),
        [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
        { color: INK, width: 2, dash: 0 });
      if (n === 0) {
        S.addText('s4-tlab-O', tx(0) + 0.06, AXIS_Y + 0.38, 'O',
          { color: INK, size: 14 });
        S.addText('s4-tlab-0', tx(0) - 0.1, AXIS_Y - 0.52, '0',
          { color: INK, size: 14 });
      } else {
        S.addText('s4-tlab-' + (n + 5), tx(n) - 0.12, AXIS_Y - 0.52,
          '' + n, { color: INK, size: 14 });
      }
    }
    // 单位长度标注
    S.addSegment('s4-unit-line', [tx(0), AXIS_Y + 0.55], [tx(1), AXIS_Y + 0.55],
      { color: TEAL, width: 1.5, dash: 0 });
    S.addText('s4-unit-lab', tx(0.5) - 0.45, AXIS_Y + 0.85,
      '单位长度', { color: TEAL, size: 12 });
  }

  var scene = {
    id: 's4',
    title: '四、描点',
    bbox: [-8, 6, 8, -4],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：描 0、4、-2（dropPoint 依次落点）
      {
        narration: '接下来把几个数请到数轴上来！先描 0——它就在原点，直接标在 O 处。再描 4——原点右边4格。然后描 -2——原点左边2格。',
        enter: function (anim) {
          drawAxis();

          if (!anim) {
            S.dropPoint('s4-pt0', tx(0), AXIS_Y, { color: TEAL, size: 4 });
            S.addText('s4-lab-0pt', tx(0) + 0.1, AXIS_Y + 1.0, 'E(0)', { color: TEAL, size: 14 });
            S.dropPoint('s4-pt4', tx(4), AXIS_Y, { color: COOL, size: 4 });
            S.addText('s4-lab-4pt', tx(4) - 0.1, AXIS_Y + 1.0, 'A(4)', { color: COOL, size: 14 });
            S.dropPoint('s4-ptm2', tx(-2), AXIS_Y, { color: WARM, size: 4 });
            S.addText('s4-lab-m2pt', tx(-2) - 0.2, AXIS_Y + 1.0, 'B(-2)', { color: WARM, size: 14 });
            P.renderCard(
              '<b>描点示范（一）</b><br>' +
              'E(0) → 原点处<br>' +
              'A(4) → 原点右边 4 格<br>' +
              'B(-2) → 原点左边 2 格'
            );
            return null;
          }

          // 动画：依次落点
          return S.dropPoint('s4-pt0', tx(0), AXIS_Y,
            { color: TEAL, size: 4, animate: true }
          ).then(function () {
            S.addText('s4-lab-0pt', tx(0) + 0.1, AXIS_Y + 1.0, 'E(0)',
              { color: TEAL, size: 14 });
            return delay(500);
          }).then(function () {
            return S.dropPoint('s4-pt4', tx(4), AXIS_Y,
              { color: COOL, size: 4, animate: true });
          }).then(function () {
            S.addText('s4-lab-4pt', tx(4) - 0.1, AXIS_Y + 1.0, 'A(4)',
              { color: COOL, size: 14 });
            return delay(500);
          }).then(function () {
            return S.dropPoint('s4-ptm2', tx(-2), AXIS_Y,
              { color: WARM, size: 4, animate: true });
          }).then(function () {
            S.addText('s4-lab-m2pt', tx(-2) - 0.2, AXIS_Y + 1.0, 'B(-2)',
              { color: WARM, size: 14 });
            P.renderCard(
              '<b>描点示范（一）</b><br>' +
              'E(0) → 原点处<br>' +
              'A(4) → 原点右边 4 格<br>' +
              'B(-2) → 原点左边 2 格'
            );
            return delay(300);
          });
        }
      },

      // Step 2：描 1.5 与 -1.5（强调中点；指出左右对称，埋悬念）
      {
        narration: '再描 1.5 和 -1.5。1.5 在 1 和 2 之间，找到它们的中点，就是 1.5 的位置。同理，-1.5 在 -1 和 -2 之间的中点。——有趣吧，这两个点，一个在原点右边 1.5 格，一个在原点左边 1.5 格，关于原点左右对称！它们之间有什么秘密，我们下节课再揭晓。',
        enter: function (anim) {
          if (!anim) {
            // 中点辅助线
            S.addSegment('s4-mid15', [tx(1), AXIS_Y + 0.4], [tx(2), AXIS_Y + 0.4],
              { color: TEAL, width: 1.5, dash: 2 });
            S.addText('s4-mid15-lab', tx(1.5) - 0.15, AXIS_Y + 0.7,
              '中点', { color: TEAL, size: 12 });
            S.dropPoint('s4-pt15', tx(1.5), AXIS_Y,
              { color: GREEN, size: 4 });
            S.addText('s4-lab-15pt', tx(1.5) - 0.1, AXIS_Y + 1.0, 'C(1.5)',
              { color: GREEN, size: 14 });

            S.addSegment('s4-midm15', [tx(-2), AXIS_Y + 0.4], [tx(-1), AXIS_Y + 0.4],
              { color: TEAL, width: 1.5, dash: 2 });
            S.addText('s4-midm15-lab', tx(-1.5) - 0.15, AXIS_Y + 0.7,
              '中点', { color: TEAL, size: 12 });
            S.dropPoint('s4-ptm15', tx(-1.5), AXIS_Y,
              { color: GREEN, size: 4 });
            S.addText('s4-lab-m15pt', tx(-1.5) - 0.25, AXIS_Y + 1.0, 'D(-1.5)',
              { color: GREEN, size: 14 });

            // 对称标注
            S.addText('s4-sym', 0, -1.5, '← C、D 关于原点左右对称 →',
              { color: COOL, size: 14 });

            P.renderCard(
              '<b>描点示范（二）</b><br>' +
              'C(1.5)：$1$ 与 $2$ 的中点，原点右 1.5 格<br>' +
              'D(-1.5)：$-1$ 与 $-2$ 的中点，原点左 1.5 格<br>' +
              '<b>C、D 关于原点左右对称——有何秘密？下节课揭晓！</b>'
            );
            return null;
          }

          // 动画
          S.addSegment('s4-mid15', [tx(1), AXIS_Y + 0.4], [tx(2), AXIS_Y + 0.4],
            { color: TEAL, width: 1.5, dash: 2 });
          S.addText('s4-mid15-lab', tx(1.5) - 0.15, AXIS_Y + 0.7,
            '中点', { color: TEAL, size: 12 });

          return S.dropPoint('s4-pt15', tx(1.5), AXIS_Y,
            { color: GREEN, size: 4, animate: true }
          ).then(function () {
            S.addText('s4-lab-15pt', tx(1.5) - 0.1, AXIS_Y + 1.0, 'C(1.5)',
              { color: GREEN, size: 14 });
            return delay(400);
          }).then(function () {
            S.addSegment('s4-midm15', [tx(-2), AXIS_Y + 0.4], [tx(-1), AXIS_Y + 0.4],
              { color: TEAL, width: 1.5, dash: 2 });
            S.addText('s4-midm15-lab', tx(-1.5) - 0.15, AXIS_Y + 0.7,
              '中点', { color: TEAL, size: 12 });
            return S.dropPoint('s4-ptm15', tx(-1.5), AXIS_Y,
              { color: GREEN, size: 4, animate: true });
          }).then(function () {
            S.addText('s4-lab-m15pt', tx(-1.5) - 0.25, AXIS_Y + 1.0, 'D(-1.5)',
              { color: GREEN, size: 14 });
            S.addText('s4-sym', 0, -1.5, '← C、D 关于原点左右对称 →',
              { color: COOL, size: 14 });
            P.renderCard(
              '<b>描点示范（二）</b><br>' +
              'C(1.5)：$1$ 与 $2$ 的中点，原点右 1.5 格<br>' +
              'D(-1.5)：$-1$ 与 $-2$ 的中点，原点左 1.5 格<br>' +
              '<b>C、D 关于原点左右对称——有何秘密？下节课揭晓！</b>'
            );
            return delay(300);
          });
        }
      },

      // Step 3：-3/2 描点警示（先化 -1.5，找中点，错误位置画红叉）
      {
        narration: '最后来一个易错题：把 $-\\frac{3}{2}$ 描在数轴上。第一步先把它化成小数：$-\\frac{3}{2} = -1.5$。确认它在 $-1$ 和 $-2$ 之间。——但有同学会把分子 3 当成位置，错描到 $-2$ 和 $-3$ 之间，那是大错！看，红叉就是错误位置，绿点才是正确的。',
        enter: function (anim) {
          // 错误位置红叉
          S.addText('s4-wrong-x1', tx(-2.5) - 0.18, AXIS_Y + 0.7,
            '<b>×</b>', { color: RED, size: 20 });
          S.addText('s4-wrong-lab', tx(-2.5) - 0.5, AXIS_Y - 1.0,
            '错！不是这里', { color: RED, size: 13 });
          // 箭头指向错位
          S.addSegment('s4-wrong-arr', [tx(-2.5), AXIS_Y - 0.8], [tx(-2.5), AXIS_Y - 0.1],
            { color: RED, width: 2, dash: 2 });

          // 正确位置
          S.addText('s4-correct-lab', tx(-1.5) - 0.3, AXIS_Y - 1.8,
            '$-\\frac{3}{2} = -1.5$，在这里 ✓', { color: GREEN, size: 14 });

          // 公式说明框
          S.actor('s4-formula', 2, 3.5,
            '$-\\dfrac{3}{2} = -1.5$',
            { color: TEAL, size: 18 });
          S.actor('s4-formula2', 2, 2.2,
            '在 $-1$ 与 $-2$ 之间', { color: TEAL, size: 15 });

          if (anim) {
            return S.pulse('s4-ptm15', 3).then(function () {
              P.renderCard(
                '<b>易错警示：$-\\dfrac{3}{2}$ 的描点</b><br>' +
                '先化：$-\\dfrac{3}{2} = -1.5$<br>' +
                '位置：$-1$ 和 $-2$ 之间的中点<br>' +
                '<b style="color:#c62828">常见错误：</b>把分子 3 当成位置，错放到 $-2$ 和 $-3$ 之间！',
                'warm'
              );
              return delay(200);
            });
          }

          P.renderCard(
            '<b>易错警示：$-\\dfrac{3}{2}$ 的描点</b><br>' +
            '先化：$-\\dfrac{3}{2} = -1.5$<br>' +
            '位置：$-1$ 和 $-2$ 之间的中点<br>' +
            '<b style="color:#c62828">常见错误：</b>把分子 3 当成位置，错放到 $-2$ 和 $-3$ 之间！',
            'warm'
          );
          return null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
