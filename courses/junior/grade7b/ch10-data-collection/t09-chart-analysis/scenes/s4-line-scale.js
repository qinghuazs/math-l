(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var AMBER  = '#f57f17';

  // 折线数据：某班5年学习成绩（缓慢增长）
  var MONTHS = ['1月', '2月', '3月', '4月', '5月'];
  var SCORES = [60, 62, 63, 65, 67];

  // bbox: [-1, 14, 11, -2]
  // 横轴：月份，x = 1,2,3,4,5
  var XS = [1, 2.5, 4, 5.5, 7];

  // 图A：纵轴范围 0~100，缩放比例 = 12/100
  var SCALE_WIDE = 12 / 100;
  // 图B：纵轴范围 55~70，缩放比例 = 12/15（拉伸）
  var YMIN_ZOOM = 55;
  var YMAX_ZOOM = 70;
  var SCALE_ZOOM = 12 / (YMAX_ZOOM - YMIN_ZOOM);

  // 闭包变量：左图和右图折线的各点当前Y坐标
  var ptsA = [];
  var ptsB = [];
  var i;
  for (i = 0; i < SCORES.length; i++) {
    ptsA.push([XS[i], 0]);
    ptsB.push([XS[i] + 9, 0]);   // 右图X偏移9个单位（右侧区域）
  }

  function drawLeftAxisWide() {
    S.addText('s4-la-title', 4, 13.5, '图A：纵轴0~100（平缓）', { size: 13, color: GREEN, anchorX: 'middle' });
    S.addText('s4-la-yunit', -0.8, 13.2, '（分）', { size: 11, color: INK, anchorX: 'right' });
    var yticks = [0, 20, 40, 60, 80, 100];
    var j;
    for (j = 0; j < yticks.length; j++) {
      var cy = yticks[j] * SCALE_WIDE;
      S.addText('s4-la-ytick' + j, -0.7, cy, '' + yticks[j], { size: 11, color: INK, anchorX: 'right' });
      S.addSegment('s4-la-ytline' + j, [-0.15, cy], [0, cy], { color: INK, width: 1, dash: 0 });
    }
    for (j = 0; j < MONTHS.length; j++) {
      S.addText('s4-la-xlabel' + j, XS[j], -0.9, MONTHS[j], { size: 11, color: INK, anchorX: 'middle' });
    }
  }

  function drawRightAxisZoom() {
    var offsetX = 9;
    S.addText('s4-ra-title', 4 + offsetX, 13.5, '图B：纵轴55~70（拉伸！）', { size: 13, color: WARM, anchorX: 'middle' });
    S.addText('s4-ra-yunit', -0.8 + offsetX, 13.2, '（分）', { size: 11, color: INK, anchorX: 'right' });
    var yticks = [55, 58, 60, 62, 65, 67, 70];
    var j;
    for (j = 0; j < yticks.length; j++) {
      var cy = (yticks[j] - YMIN_ZOOM) * SCALE_ZOOM;
      S.addText('s4-ra-ytick' + j, -0.7 + offsetX, cy, '' + yticks[j], { size: 11, color: INK, anchorX: 'right' });
      S.addSegment('s4-ra-ytline' + j, [-0.15 + offsetX, cy], [offsetX, cy], { color: INK, width: 1, dash: 0 });
    }
    for (j = 0; j < MONTHS.length; j++) {
      S.addText('s4-ra-xlabel' + j, XS[j] + offsetX, -0.9, MONTHS[j], { size: 11, color: INK, anchorX: 'middle' });
    }
  }

  // 画左图折线（纵轴0~100）
  function drawLeftLine(anim) {
    var pts = [];
    var j;
    for (j = 0; j < SCORES.length; j++) {
      pts.push([XS[j], SCORES[j] * SCALE_WIDE]);
    }

    if (!anim) {
      S.addPolyline('s4-lineA', pts, { color: GREEN, width: 3 });
      for (j = 0; j < pts.length; j++) {
        S.addText('s4-ptA' + j, pts[j][0], pts[j][1] + 0.3, '' + SCORES[j], { size: 11, color: GREEN, anchorX: 'middle' });
      }
      return Promise.resolve();
    }

    // 逐段连线动画
    var p = Promise.resolve();
    for (j = 0; j < pts.length - 1; j++) {
      (function (k) {
        p = p.then(function () {
          var from = pts[k];
          var to   = pts[k + 1];
          var cx = from[0];
          var cy = from[1];
          var seg = [];
          seg.push(from);
          var lineId = 's4-lineA-seg' + k;
          // 先画点
          S.addText('s4-ptA' + k, from[0], from[1] + 0.3, '' + SCORES[k], { size: 11, color: GREEN, anchorX: 'middle' });
          return S.animate({
            from: 0, to: 1, duration: 500, easing: 'easeInOutQuad',
            onUpdate: function (v) {
              cx = from[0] + (to[0] - from[0]) * v;
              cy = from[1] + (to[1] - from[1]) * v;
              S.addPolyline(lineId, [from, [cx, cy]], { color: GREEN, width: 3 });
            },
          }).then(function () {
            S.addPolyline(lineId, [from, to], { color: GREEN, width: 3 });
          });
        });
      })(j);
    }
    p = p.then(function () {
      S.addText('s4-ptA' + (pts.length - 1), pts[pts.length - 1][0], pts[pts.length - 1][1] + 0.3,
        '' + SCORES[pts.length - 1], { size: 11, color: GREEN, anchorX: 'middle' });
    });
    return p;
  }

  // 画右图折线（纵轴55~70，拉伸）
  function drawRightLine(anim) {
    var offsetX = 9;
    var pts = [];
    var j;
    for (j = 0; j < SCORES.length; j++) {
      pts.push([XS[j] + offsetX, (SCORES[j] - YMIN_ZOOM) * SCALE_ZOOM]);
    }

    if (!anim) {
      S.addPolyline('s4-lineB', pts, { color: WARM, width: 3 });
      for (j = 0; j < pts.length; j++) {
        S.addText('s4-ptB' + j, pts[j][0], pts[j][1] + 0.3, '' + SCORES[j], { size: 11, color: WARM, anchorX: 'middle' });
      }
      return Promise.resolve();
    }

    var p = Promise.resolve();
    for (j = 0; j < pts.length - 1; j++) {
      (function (k) {
        p = p.then(function () {
          var from = pts[k];
          var to   = pts[k + 1];
          var cx = from[0];
          var cy = from[1];
          var lineId = 's4-lineB-seg' + k;
          S.addText('s4-ptB' + k, from[0], from[1] + 0.3, '' + SCORES[k], { size: 11, color: WARM, anchorX: 'middle' });
          return S.animate({
            from: 0, to: 1, duration: 500, easing: 'easeInOutQuad',
            onUpdate: function (v) {
              cx = from[0] + (to[0] - from[0]) * v;
              cy = from[1] + (to[1] - from[1]) * v;
              S.addPolyline(lineId, [from, [cx, cy]], { color: WARM, width: 3 });
            },
          }).then(function () {
            S.addPolyline(lineId, [from, to], { color: WARM, width: 3 });
          });
        });
      })(j);
    }
    p = p.then(function () {
      S.addText('s4-ptB' + (pts.length - 1), pts[pts.length - 1][0], pts[pts.length - 1][1] + 0.3,
        '' + SCORES[pts.length - 1], { size: 11, color: WARM, anchorX: 'middle' });
    });
    return p;
  }

  var scene = {
    id: 's4',
    title: '四、误导三：折线图纵轴缩放',
    bbox: [-1, 14, 19, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      ptsA = [];
      ptsB = [];
      var j;
      for (j = 0; j < SCORES.length; j++) {
        ptsA.push([XS[j], 0]);
        ptsB.push([XS[j] + 9, 0]);
      }
    },
    steps: [
      {
        narration: '第三种误导手法：<b>折线图纵轴缩放</b>！折线图最容易被纵轴"操纵"——同一组增长数据，纵轴刻度拉伸就显得"暴涨"，纵轴压缩就显得"几乎没变"。我们来看同一组成绩数据：1月到5月，分数从60分增长到67分，缓慢稳定增长。先搭好两张图的坐标轴。',
        enter: function () {
          drawLeftAxisWide();
          drawRightAxisZoom();
          P.renderCard(
            '<b>数据：某班月考成绩</b><br>' +
            '1月：60分 · 2月：62分<br>' +
            '3月：63分 · 4月：65分<br>' +
            '5月：67分<br>' +
            '增幅：<b>7分</b>（缓慢增长）'
          );
        },
      },
      {
        narration: '左图：纵轴从<b>0到100</b>，范围很大——画出来的折线非常平缓，几乎是一条水平线！看这张图，你会觉得成绩"基本没变化"……但实际上增加了7分呢！',
        enter: function (anim) {
          drawLeftAxisWide();
          drawRightAxisZoom();
          return drawLeftLine(anim);
        },
      },
      {
        narration: '右图：纵轴只显示<b>55到70</b>这一小段，刻度被大幅拉伸——同样的数据，画出来的折线陡峭无比！看这张图，你会觉得成绩"飞速暴涨"！其实两张图的数据完全一样，只是纵轴刻度不同。<b>折线的"陡峭度"完全被纵轴刻度操控了！</b>',
        enter: function (anim) {
          drawLeftAxisWide();
          drawRightAxisZoom();
          drawLeftLine(false);
          return drawRightLine(anim).then(function () {
            S.addText('s4-warn-zoom', 9, -1.5, '⚡ 纵轴拉伸：55~70，让增长看起来更陡！', { size: 12, color: WARM, anchorX: 'left' });
          });
        },
      },
      {
        narration: '对比两张图——左边平缓，右边陡峭，数据却完全相同！这种手法在新闻报道中非常常见：股价"暴涨"或"暴跌"的图表，很多时候只是纵轴被"操控"了。辨析要点：<b>看折线图时，一定要注意纵轴的范围和刻度间距</b>！如果范围很小（截断），折线会显得更陡；范围很大，折线会显得更平。',
        enter: function () {
          drawLeftAxisWide();
          drawRightAxisZoom();
          drawLeftLine(false);
          drawRightLine(false);

          S.addText('s4-warn-zoom', 9, -1.5, '⚡ 纵轴拉伸：55~70，让增长看起来更陡！', { size: 12, color: WARM, anchorX: 'left' });
          S.addText('s4-vs-left',  4, 12.5, '✓ 纵轴范围宽→趋势平缓', { size: 12, color: GREEN, anchorX: 'middle' });
          S.addText('s4-vs-right', 13, 12.5, '✗ 纵轴范围窄→趋势"暴涨"', { size: 12, color: WARM, anchorX: 'middle' });

          P.renderCard(
            '<b>辨析要点三：折线图纵轴</b><br>' +
            '✓ 看纵轴范围，是否从0开始<br>' +
            '✓ 注意刻度间距是否均匀<br>' +
            '✗ 范围越窄 → 折线越"陡"<br>' +
            '<b>陡峭≠增长快！先看纵轴！</b>'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
