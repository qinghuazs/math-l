// s1-observe.js  观察生活图案（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var TEAL   = '#00695c';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画一个小房子图形，左下角锚点 (ax, ay)，宽 w，高 h（墙）
  // 返回用于 addPolygon 的顶点数组
  function houseWallPts(ax, ay, w, h) {
    return [
      [ax,     ay],
      [ax + w, ay],
      [ax + w, ay + h],
      [ax,     ay + h],
    ];
  }

  function houseRoofPts(ax, ay, w, h, roofH) {
    return [
      [ax,         ay + h],
      [ax + w,     ay + h],
      [ax + w / 2, ay + h + roofH],
    ];
  }

  // 画第 i 个小房子（0-indexed），基点从 (-8, -2) 开始，每隔 4 单位
  function drawHouse(idx, wallColor, roofColor) {
    var ax = -8 + idx * 4;
    var ay = -1.5;
    var w  = 2.8;
    var h  = 2.2;
    var rH = 1.5;
    S.addPolygon('house-wall-' + idx, houseWallPts(ax, ay, w, h),
      { fillColor: wallColor || '#e3f2fd', strokeColor: BLUE, strokeWidth: 2, fillOpacity: 0.9 });
    S.addPolygon('house-roof-' + idx, houseRoofPts(ax, ay, w, h, rH),
      { fillColor: roofColor || ORANGE, strokeColor: ORANGE, strokeWidth: 2, fillOpacity: 0.9 });
    // 小窗户
    S.addPolygon('house-win-' + idx,
      [[ax + 0.5, ay + 0.6], [ax + 1.1, ay + 0.6], [ax + 1.1, ay + 1.2], [ax + 0.5, ay + 1.2]],
      { fillColor: GOLD, strokeColor: '#f57f17', strokeWidth: 1.5, fillOpacity: 0.9 });
    // 小门
    S.addPolygon('house-door-' + idx,
      [[ax + 1.5, ay], [ax + 2.2, ay], [ax + 2.2, ay + 1.0], [ax + 1.5, ay + 1.0]],
      { fillColor: '#5d4037', strokeColor: '#4e342e', strokeWidth: 1.5, fillOpacity: 0.9 });
  }

  var scene = {
    id: 's1',
    title: '一、观察生活图案',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：提问引入
        narration: '同学们好！今天我们来学习"利用平移设计图案"。生活中你有没有注意过这样的图案——瓷砖纹样、花边装饰、包装纸上的连续图案……它们是怎么来的呢？让我们一起来观察！',
        enter: function (anim) {
          // 标题文字
          S.addText('title', 0, 5.5, '生活中的重复图案', { size: 22, color: BLUE, anchorX: 'middle' });
          S.addText('sub1',  0, 4.2, '瓷砖纹样 · 花边 · 民族纹样 · 窗格设计 · 包装纸图案',
            { size: 15, color: INK, anchorX: 'middle' });

          // 示意：4个地砖方块（用不同填色的多边形表示）
          var colors = ['#ef9a9a', '#a5d6a7', '#90caf9', '#fff176'];
          var i;
          for (i = 0; i < 4; i++) {
            S.addPolygon('tile-' + i,
              [[-8 + i*4, -5.5], [-8 + i*4 + 3.5, -5.5],
               [-8 + i*4 + 3.5, -3.0], [-8 + i*4, -3.0]],
              { fillColor: colors[i], strokeColor: '#90a4ae', strokeWidth: 2, fillOpacity: 0.85 });
            // 里面加一个菱形花纹
            S.addPolygon('tile-dia-' + i,
              [[-8 + i*4 + 1.75, -3.4], [-8 + i*4 + 3.0, -4.25],
               [-8 + i*4 + 1.75, -5.1], [-8 + i*4 + 0.5, -4.25]],
              { fillColor: '#ffffff', strokeColor: '#bdbdbd', strokeWidth: 1.5, fillOpacity: 0.5 });
          }

          P.renderCard(
            '<b>观察生活中的图案</b><br><br>' +
            '你发现了什么规律？<br><br>' +
            '<span style="color:#90a4ae">（瓷砖、花边、包装纸……）</span>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：出示一排重复的小房子
        narration: '看这里——我们画出一排小房子。你数一数，一共有几个？它们长得一模一样！大家想一想：这些房子是怎么"复制"出来的？是旋转？还是翻转？还是……平移？',
        enter: function (anim) {
          // 清除地砖
          var i;
          for (i = 0; i < 4; i++) {
            S.remove('tile-' + i);
            S.remove('tile-dia-' + i);
          }
          S.remove('sub1');

          // 重新设置标题
          S.addText('sub2', 0, 4.2, '观察：一排重复的小房子', { size: 16, color: TEAL, anchorX: 'middle' });

          if (!anim) {
            // 快放：直接显示全部房子
            for (i = 0; i < 4; i++) { drawHouse(i, null, null); }
            P.renderCard(
              '<b>重复图案</b><br><br>' +
              '一共 4 个小房子<br><br>' +
              '它们是怎么"复制"出来的？<br>' +
              '旋转？翻转？<b>平移！</b>'
            );
            return;
          }

          // 动画：依次浮现4个房子
          drawHouse(0, null, null);
          return delay(600).then(function () {
            drawHouse(1, null, null);
            return delay(600);
          }).then(function () {
            drawHouse(2, null, null);
            return delay(600);
          }).then(function () {
            drawHouse(3, null, null);
            P.renderCard(
              '<b>重复图案</b><br><br>' +
              '一共 4 个小房子<br><br>' +
              '它们是怎么"复制"出来的？<br>' +
              '旋转？翻转？<b>平移！</b>'
            );
          });
        },
      },
      {
        // 步骤3：提炼问题
        narration: '对！这些小房子，都是把第一个"基本图形"向右平移，每次移动相同的距离，就得到了后面的图案。这就是"利用平移设计图案"的核心思想！接下来，我们来仔细分析一下。',
        enter: function (anim) {
          // 在第1个房子下方加"基本图形"标注
          S.addPolygon('base-box',
            [[-8.3, -2.5], [-4.9, -2.5], [-4.9, -2.0], [-8.3, -2.0]],
            { fillColor: '#e8f5e9', strokeColor: GREEN, strokeWidth: 2, fillOpacity: 0.9 });
          S.addText('base-lbl', -6.6, -2.3, '基本图形', { size: 14, color: GREEN, anchorX: 'middle' });

          // 画右箭头
          S.addSegment('arr-h', [-4.8, 0.5], [6.5, 0.5], { color: PURPLE, width: 3, dash: 0 });
          S.addPolygon('arr-head',
            [[6.5, 0.9], [7.5, 0.5], [6.5, 0.1]],
            { fillColor: PURPLE, strokeColor: PURPLE, strokeWidth: 1 });
          S.addText('arr-lbl', 1.0, 1.1, '向右平移，每次移动相同距离',
            { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>平移复制的思路</b><br><br>' +
            '① 确定<b>基本图形</b>（一个单元）<br>' +
            '② 确定<b>平移方向</b>（向右）<br>' +
            '③ 确定<b>平移距离</b>（每次相同）<br><br>' +
            '重复执行 → 生成花边图案！'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
