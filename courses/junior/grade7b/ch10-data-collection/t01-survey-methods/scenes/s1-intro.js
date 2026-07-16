(function (CW) {
  'use strict';
  // s1 情境导入：引出"统计调查"概念
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var CARD_W = 8.5;  // 卡片半宽（近似，用于多边形）
  var CARD_H = 1.6;  // 卡片半高

  // 绘制带圆角外观的矩形色块（用 addPolygon 模拟卡片底色）
  function drawCard(id, cx, cy, color) {
    S.addPolygon(id, [
      [cx - CARD_W, cy - CARD_H],
      [cx + CARD_W, cy - CARD_H],
      [cx + CARD_W, cy + CARD_H],
      [cx - CARD_W, cy + CARD_H],
    ], { color: color, opacity: 0.10, borderWidth: 2, strokeColor: color });
  }

  var scene = {
    id: 's1',
    title: '一、情境导入：我们怎样获取数据？',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，学校准备调整食堂菜单，想了解全校学生<b>最喜欢的午餐种类</b>。你觉得应该怎样获取这个信息呢？',
        enter: function (anim) {
          // 主问题标题
          S.actor('s1-q-title', 0, 5.5, '学校食堂改菜单……怎样了解同学的偏好？', {
            color: BLUE, size: 21, bold: true,
          });
          // 四个学生的方案气泡（矩形底色 + 文字）
          var plans = [
            { id: 'p1', cx: -5.5, cy: 2.2,  color: BLUE,   text: '询问每一位同学' },
            { id: 'p2', cx:  5.5, cy: 2.2,  color: GREEN,  text: '随机调查部分同学' },
            { id: 'p3', cx: -5.5, cy: -1.2, color: ORANGE, text: '只调查本班同学' },
            { id: 'p4', cx:  5.5, cy: -1.2, color: INK,    text: '网络投票' },
          ];
          var i, pp;
          for (i = 0; i < plans.length; i++) {
            pp = plans[i];
            drawCard(pp.id + '-bg', pp.cx, pp.cy, pp.color);
            S.actor(pp.id + '-txt', pp.cx, pp.cy, pp.text, { color: pp.color, size: 18, bold: true });
          }
          P.renderCard('生活中需要了解数据时，你会怎么做？先说说你的想法。');
        },
      },
      {
        narration: '大家提出了好几种方案。无论哪种，我们都需要有目的地<b>收集数据</b>——这个过程就叫作<b>统计调查</b>。今天我们重点研究两种调查方式。',
        enter: function (anim) {
          // 高亮"统计调查"核心词
          S.actor('s1-def', 0, -4.5, '统计调查：有目的地收集数据的活动', {
            color: BLUE, size: 20, bold: true,
          });
          S.addSegment('s1-underline', [-7.2, -5.1], [7.2, -5.1], {
            color: BLUE, width: 3, dash: 0,
          });
          P.renderCard('<b>统计调查</b>：为了解决某个问题，有目的地收集数据的活动。<br>主要有两种方式：<b>全面调查</b>与<b>抽样调查</b>。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
