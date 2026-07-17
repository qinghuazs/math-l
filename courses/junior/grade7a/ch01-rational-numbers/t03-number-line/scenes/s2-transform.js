// s2-transform.js  二、从温度计到数轴（3步）
// 数学说明：
//   步1：先呈现竖向温度计（简化版），然后快速过渡到横向刻度线
//         快放路径直接呈现横向；动画路径先显竖版（0.6s）再淡出→呈现横版
//   步2：横向数轴向两端无限延伸，补画双箭头与省略号文字
//   步3：归纳卡
//   bbox [-9, 7, 9, -3]，axis:false，keepAspect:false
//   横向数轴：y=0，刻度 -4~5，UNIT=1.4画面单位
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var UNIT = 1.4;        // 1 数学单位 = 1.4 画面单位
  var AXIS_Y = 0;
  function tx(n) { return n * UNIT; }

  // 绘制横向数轴（-4 ~ 5，带刻度，两端省略号由step2补）
  function drawHAxis(prefix, arrowRight) {
    // 主线 -5 ~ 6
    S.addSegment(prefix + '-haxis', [-5.8, AXIS_Y], [6.8, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    // 右箭头（单箭头）
    if (arrowRight) {
      S.addSegment(prefix + '-arr1', [6.6, AXIS_Y + 0.18], [6.9, AXIS_Y],
        { color: INK, width: 2, dash: 0 });
      S.addSegment(prefix + '-arr2', [6.6, AXIS_Y - 0.18], [6.9, AXIS_Y],
        { color: INK, width: 2, dash: 0 });
    }
    // 刻度 -4 ~ 5
    var n;
    for (n = -4; n <= 5; n++) {
      S.addSegment(prefix + '-tick-' + (n + 4),
        [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
        { color: INK, width: 2, dash: 0 });
      S.addText(prefix + '-tlab-' + (n + 4),
        tx(n) - 0.12, AXIS_Y - 0.5,
        '' + n, { color: INK, size: 14 });
    }
    // 原点标注
    S.addText(prefix + '-origin-o', tx(0) + 0.05, AXIS_Y + 0.4, 'O', { color: INK, size: 14 });
  }

  // 绘制简化竖向温度计（-3~5，快速显示）
  function drawVThermo() {
    var VX = 0;    // 中心x
    S.addSegment('s2-vtc-l', [VX - 0.3, -3.2], [VX - 0.3, 5.3],
      { color: INK, width: 2, dash: 0 });
    S.addSegment('s2-vtc-r', [VX + 0.3, -3.2], [VX + 0.3, 5.3],
      { color: INK, width: 2, dash: 0 });
    S.addSegment('s2-vtc-top', [VX - 0.3, 5.3], [VX + 0.3, 5.3],
      { color: INK, width: 2, dash: 0 });
    S.addSegment('s2-vtc-bot', [VX - 0.3, -3.2], [VX + 0.3, -3.2],
      { color: INK, width: 2, dash: 0 });
    // 液柱（红色满柱到5）
    S.addPolygon('s2-vtc-liq',
      [[VX - 0.15, -3.2], [VX + 0.15, -3.2], [VX + 0.15, 5.0], [VX - 0.15, 5.0]],
      { color: WARM, fillColor: WARM, fillOpacity: 0.8, opacity: 0.8, borderWidth: 0 });
    var n;
    for (n = -3; n <= 5; n++) {
      S.addSegment('s2-vtick-' + (n + 3),
        [VX - 0.45, n], [VX + 0.45, n],
        { color: INK, width: 1.5, dash: 0 });
      S.addText('s2-vtlab-' + (n + 3), VX + 0.55, n - 0.2,
        '' + n, { color: INK, size: 12 });
    }
  }

  function removeVThermo() {
    S.remove('s2-vtc-l'); S.remove('s2-vtc-r');
    S.remove('s2-vtc-top'); S.remove('s2-vtc-bot');
    S.remove('s2-vtc-liq');
    var n;
    for (n = 0; n < 9; n++) {
      S.remove('s2-vtick-' + n);
      S.remove('s2-vtlab-' + n);
    }
  }

  var scene = {
    id: 's2',
    title: '二、从温度计到数轴',
    bbox: [-9, 7, 9, -3],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：温度计"旋转横放"演化
      {
        narration: '现在我们把温度计横过来！——原来竖着的刻度，"躺平"变成了一条水平线，-3 到 5 的刻度还在，只是从竖方向换成了横方向。',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接画横向数轴
            drawHAxis('s2', false);
            S.addText('s2-hint', 0, 5.5, '温度计横放 → 水平刻度线', { color: TEAL, size: 16 });
            P.renderCard(
              '<b>温度计横放</b><br>' +
              '竖向刻度 → 横向刻度线<br>' +
              '-3℃ 在左，+5℃ 在右，0℃ 在中间。'
            );
            return null;
          }
          // 动画路径：先显竖版，短暂停顿，再切横版
          drawVThermo();
          S.addText('s2-vtitle', -5, 6.5, '温度计（竖）', { color: TEAL, size: 16 });
          P.renderCard('<b>把温度计横过来……</b><br>观察刻度如何从竖变横。');

          return delay(700).then(function () {
            removeVThermo();
            S.remove('s2-vtitle');
            drawHAxis('s2', false);
            S.addText('s2-hint', 0, 5.5, '温度计横放 → 水平刻度线', { color: TEAL, size: 16 });
            P.renderCard(
              '<b>温度计横放</b><br>' +
              '竖向刻度 → 横向刻度线<br>' +
              '-3℃ 在左，+5℃ 在右，0℃ 在中间。'
            );
            return delay(300);
          });
        }
      },

      // Step 2：向两端无限延伸，补画箭头与省略号
      {
        narration: '但温度计有边界——最低 -3℃，最高只有几十度。数学上我们需要能表示所有有理数的工具！所以，我们去掉边界，让这条线向两端无限延伸……在右端画箭头，表示正方向；在两端写省略号，表示无限延伸。',
        enter: function (anim) {
          S.remove('s2-hint');
          // 移除之前的临时提示，补画右箭头
          S.addSegment('s2-arr1', [6.6, AXIS_Y + 0.18], [6.9, AXIS_Y],
            { color: WARM, width: 2.5, dash: 0 });
          S.addSegment('s2-arr2', [6.6, AXIS_Y - 0.18], [6.9, AXIS_Y],
            { color: WARM, width: 2.5, dash: 0 });
          // 省略号文字
          S.addText('s2-ellip-r', 7.1, AXIS_Y - 0.2, '···', { color: INK, size: 18 });
          S.addText('s2-ellip-l', -6.8, AXIS_Y - 0.2, '···', { color: INK, size: 18 });
          // 注释
          S.addText('s2-ann-inf', 3.5, 2.5, '无限延伸', { color: WARM, size: 15 });
          S.addSegment('s2-ann-arr', [4.8, 2.3], [6.5, AXIS_Y + 0.1],
            { color: WARM, width: 1.5, dash: 2 });

          P.renderCard(
            '<b>去掉边界，向两端延伸</b><br>' +
            '数轴不像温度计有最高最低刻度——<br>' +
            '它向两端<b>无限延伸</b>，可以表示任意有理数！<br>' +
            '右端箭头指示<b>正方向</b>。'
          );

          return anim ? delay(400) : null;
        }
      },

      // Step 3：归纳——数轴是横放、去边界、无限延长的温度计
      {
        narration: '我们做个归纳：数轴，就是把温度计横放、去掉边界、让它向两端无限延长之后得到的工具。一句话记住它：横放、去边界、无限延长的温度计！',
        enter: function (anim) {
          // 叠加归纳文字
          S.actor('s2-sum-title', 0, 5.5, '归纳', { color: COOL, size: 20, bold: true });
          S.actor('s2-sum1', 0, 4.0, '数轴 = 横放的温度计', { color: TEAL, size: 17 });
          S.actor('s2-sum2', 0, 2.8, '+ 去掉两端边界', { color: TEAL, size: 17 });
          S.actor('s2-sum3', 0, 1.6, '+ 向两端无限延长', { color: TEAL, size: 17 });

          P.renderCard(
            '<b>数轴的由来</b><br>' +
            '温度计（竖）<br>' +
            '&nbsp;&nbsp;→ 横放<br>' +
            '&nbsp;&nbsp;→ 去掉边界<br>' +
            '&nbsp;&nbsp;→ 无限延长<br>' +
            '&nbsp;&nbsp;= <b>数轴</b>',
            'teal'
          );

          return anim ? delay(300) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
