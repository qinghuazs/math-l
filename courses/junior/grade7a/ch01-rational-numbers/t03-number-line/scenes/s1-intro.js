// s1-intro.js  一、温度计与站牌（3步）
// 数学说明：
//   温度计竖向，y轴方向，中心x=0，刻度 -3~5
//   bbox [-6, 9, 6, -4]（宽12，高13），keepAspect:false
//   温度计外框：矩形左x=-0.5 右x=0.5，底y=-3.5 顶y=5.5（稍超刻度范围）
//   刻度线：y=n（n=-3..5），左x=-0.4 右x=0.4
//   液柱：矩形 x=-0.25~0.25，底y=-3.5，顶从y=-3动画升到y=5
//   站牌情境：水平线y=-1.5，原点x=0，树x=3（+3），电线杆x=-2（-2），单位长度1画面单位
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 温度计参数
  var TC_X   = 0;       // 温度计中心x
  var TC_L   = -0.5;    // 温度计左边界
  var TC_R   = 0.5;     // 温度计右边界
  var TC_BOT = -3.5;    // 底部（含灯泡）
  var TC_TOP = 5.5;     // 顶部

  // 液柱参数
  var LIQ_L = -0.25;
  var LIQ_R =  0.25;
  var LIQ_START = -3;   // 液柱初始顶y（-3度）
  var LIQ_END   =  5;   // 液柱终止顶y（5度）
  var LIQ_BOT   = -3.5; // 液柱底部（固定）

  // 液柱多边形：底矩形4点
  function liqPts(topY) {
    return [[LIQ_L, LIQ_BOT], [LIQ_R, LIQ_BOT], [LIQ_R, topY], [LIQ_L, topY]];
  }

  var scene = {
    id: 's1',
    title: '一、温度计与站牌',
    bbox: [-6, 9, 6, -4],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：竖直温度计 + 液柱动画从 -3 升到 5
      {
        narration: '同学们，冬天我们常看到温度计。现在气温从 -3℃ 升高到 5℃，上升了几度？我们来看温度计怎么告诉我们答案。——看，液柱从 -3℃ 一路上升到 5℃！',
        enter: function (anim) {
          // 外框
          S.addSegment('s1-tc-left',  [TC_L, TC_BOT], [TC_L, TC_TOP],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s1-tc-right', [TC_R, TC_BOT], [TC_R, TC_TOP],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s1-tc-top',   [TC_L, TC_TOP], [TC_R, TC_TOP],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s1-tc-bot',   [TC_L, TC_BOT], [TC_R, TC_BOT],
            { color: INK, width: 2.5, dash: 0 });

          // 刻度线与标签 -3 ~ 5
          var n;
          for (n = -3; n <= 5; n++) {
            S.addSegment('s1-tick-' + (n + 3),
              [TC_L - 0.12, n], [TC_R + 0.12, n],
              { color: INK, width: 1.5, dash: 0 });
            S.addText('s1-tlab-' + (n + 3), TC_R + 0.28, n - 0.18,
              '' + n + '℃', { color: INK, size: 13 });
          }

          // 液柱（初始在 -3）
          S.addPolygon('s1-liq', liqPts(LIQ_START),
            { color: WARM, opacity: 0.85, borderWidth: 0, fillColor: WARM, fillOpacity: 0.85 });

          // 标注起点终点
          S.addText('s1-lab-start', TC_L - 1.5, -3, '-3℃ 起点', { color: COOL, size: 13 });
          S.addText('s1-lab-end',   TC_L - 1.5,  5, '+5℃ 终点', { color: WARM, size: 13 });

          if (!anim) {
            // 快放：液柱直接显示在 5
            S.addPolygon('s1-liq', liqPts(LIQ_END),
              { color: WARM, opacity: 0.85, borderWidth: 0, fillColor: WARM, fillOpacity: 0.85 });
            P.renderCard(
              '<b>温度计读数</b><br>' +
              '从 <b style="color:#1565c0">-3℃</b> 升高到 <b style="color:#e64a19">+5℃</b><br>' +
              '从 $-3$ 到 $5$ 共上升 $8$ 度（数格可得）'
            );
            return null;
          }

          // 动画：用 animate 让液柱顶部从 -3 升到 5
          return S.animate({
            from: LIQ_START,
            to: LIQ_END,
            duration: 1600,
            onUpdate: function (v) {
              S.remove('s1-liq');
              S.addPolygon('s1-liq', liqPts(v),
                { color: WARM, opacity: 0.85, borderWidth: 0, fillColor: WARM, fillOpacity: 0.85 });
            }
          }).then(function () {
            P.renderCard(
              '<b>温度计读数</b><br>' +
              '从 <b style="color:#1565c0">-3℃</b> 升高到 <b style="color:#e64a19">+5℃</b><br>' +
              '从 $-3$ 到 $5$ 共上升 $8$ 度（数格可得）'
            );
            return delay(200);
          });
        }
      },

      // Step 2：站牌情境——水平直线 + 图文 actor
      {
        narration: '再换一个情境：公交站牌在中间，作为 0 号基准点；向东第1棵树在 +3 的位置；向西第1根电线杆在 -2 的位置。我们能在一条线上把它们都标出来吗？——你们来试试！',
        enter: function (anim) {
          // 清除温度计
          var ids = ['s1-tc-left','s1-tc-right','s1-tc-top','s1-tc-bot','s1-liq','s1-lab-start','s1-lab-end'];
          var n;
          for (n = 0; n < 9; n++) { S.remove('s1-tick-' + n); S.remove('s1-tlab-' + n); }
          for (n = 0; n < ids.length; n++) { S.remove(ids[n]); }

          // 水平道路线
          var ROAD_Y = 1.0;
          var UNIT1  = 1.5; // 画面单位
          function rx(num) { return num * UNIT1; }

          S.addSegment('s1-road', [-4, ROAD_Y], [5, ROAD_Y],
            { color: INK, width: 3, dash: 0 });

          // 刻度 -2 ~ 3
          var marks = [-2, -1, 0, 1, 2, 3];
          for (n = 0; n < marks.length; n++) {
            S.addSegment('s1-rtick-' + n, [rx(marks[n]), ROAD_Y - 0.18], [rx(marks[n]), ROAD_Y + 0.18],
              { color: INK, width: 2, dash: 0 });
            S.addText('s1-rtlab-' + n, rx(marks[n]) - 0.1, ROAD_Y - 0.5,
              '' + marks[n], { color: INK, size: 14 });
          }

          // 站牌（0位置）
          S.actor('s1-sign', rx(0), ROAD_Y + 1.5, '🚏 站牌 (0)', { color: TEAL, size: 15 });
          // 树（+3位置）
          S.actor('s1-tree', rx(3), ROAD_Y + 1.5, '🌳 树 (+3)', { color: GREEN, size: 15 });
          // 电线杆（-2位置）
          S.actor('s1-pole', rx(-2), ROAD_Y + 1.5, '⚡ 电线杆 (-2)', { color: WARM, size: 15 });

          // 竖线连接图标与刻度
          S.addSegment('s1-conn0', [rx(0), ROAD_Y + 0.18], [rx(0), ROAD_Y + 1.1],
            { color: TEAL, width: 1.5, dash: 2 });
          S.addSegment('s1-conn3', [rx(3), ROAD_Y + 0.18], [rx(3), ROAD_Y + 1.1],
            { color: GREEN, width: 1.5, dash: 2 });
          S.addSegment('s1-connm2', [rx(-2), ROAD_Y + 0.18], [rx(-2), ROAD_Y + 1.1],
            { color: WARM, width: 1.5, dash: 2 });

          // 方向标注
          S.actor('s1-east', 3.5, ROAD_Y - 1.2, '向东 →', { color: COOL, size: 13 });
          S.actor('s1-west', -3.0, ROAD_Y - 1.2, '← 向西', { color: COOL, size: 13 });

          P.renderCard(
            '<b>站牌情境</b><br>' +
            '以站牌为基准 <b>0</b>，向东为正，向西为负。<br>' +
            '树在 <b style="color:#2e7d32">+3</b>，电线杆在 <b style="color:#e64a19">-2</b>。<br>' +
            '用一条直线就能标出所有位置！'
          );

          return anim ? delay(300) : null;
        }
      },

      // Step 3：追问——两图共同点
      {
        narration: '同学们想想：温度计和站牌这两幅图有什么共同点？——是的，它们都有一个基准点（温度计的 0℃，站牌的 0 号）；都规定了方向（温度计向上是正，站牌向东是正）。没有基准、没有方向，我们就不知道"正负"从哪算起！',
        enter: function (anim) {
          // 叠加追问信息框
          S.actor('s1-q-title', 0, 7.5, '两图共同点？', { color: COOL, size: 18, bold: true });
          S.actor('s1-q1', 0, 6.2, '① 都有一个<b>基准点</b>（0 所在的位置）', { color: TEAL, size: 15 });
          S.actor('s1-q2', 0, 5.0, '② 都规定了<b>正方向</b>（向上 / 向东）', { color: WARM, size: 15 });
          S.actor('s1-q3', 0, 3.8, '③ 都用<b>等距刻度</b>标出各数的位置', { color: GREEN, size: 15 });

          P.renderCard(
            '<b>共同点</b><br>' +
            '两图都需要：<br>' +
            '&nbsp;&nbsp;• <b>基准点</b>——正负数的"起点"<br>' +
            '&nbsp;&nbsp;• <b>正方向</b>——分清正负的方向<br>' +
            '&nbsp;&nbsp;• <b>等距刻度</b>——保证位置准确<br>' +
            '这正是数轴的三个核心要素！',
            'cool'
          );

          return anim ? delay(300) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
