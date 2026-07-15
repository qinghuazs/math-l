// s2-find.js  找基本图形与平移规律（4步）
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
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 箭头形状（向右的五边形），锚点左侧中心 (ax, ay)，宽 w 高 h
  function arrowPts(ax, ay, w, h) {
    var hw = h / 2;
    var bodyW = w * 0.65;
    var bodyH = h * 0.5;
    return [
      [ax,          ay + bodyH / 2],
      [ax + bodyW,  ay + bodyH / 2],
      [ax + bodyW,  ay + hw],
      [ax + w,      ay],
      [ax + bodyW,  ay - hw],
      [ax + bodyW,  ay - bodyH / 2],
      [ax,          ay - bodyH / 2],
    ];
  }

  // 每个箭头宽4，高2，间距4.2，共4个
  var ARROW_W = 3.6;
  var ARROW_H = 2.0;
  var STEP_X  = 4.2;
  var BASE_X  = -8.5;
  var BASE_Y  = 1.5;

  // 闭包变量（setup重置）
  var highlighted;

  function drawArrow(idx, fillColor, strokeColor, sw) {
    var ax = BASE_X + idx * STEP_X;
    S.addPolygon('arrow-' + idx, arrowPts(ax, BASE_Y, ARROW_W, ARROW_H),
      { fillColor: fillColor || '#90caf9',
        strokeColor: strokeColor || BLUE,
        strokeWidth: sw == null ? 2 : sw,
        fillOpacity: 0.85 });
  }

  var scene = {
    id: 's2',
    title: '二、找基本图形与平移规律',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage; P = panel;
      highlighted = false;
    },
    steps: [
      {
        // 步骤1：出示一排箭头，找基本图形
        narration: '我们换一种图形来分析——这是一排箭头形状的图案，一共 4 个。现在请你找一找：哪一个是"基本图形"？也就是说，哪一个是最开始的那一个单元？',
        enter: function (anim) {
          S.addText('title', 0, 6.2, '分析：找基本图形和平移规律', { size: 20, color: BLUE, anchorX: 'middle' });
          var i;
          for (i = 0; i < 4; i++) { drawArrow(i, null, null, null); }
          // 编号标注
          for (i = 0; i < 4; i++) {
            S.addText('arrow-num-' + i,
              BASE_X + i * STEP_X + ARROW_W / 2,
              BASE_Y - ARROW_H / 2 - 0.5,
              '(' + (i + 1) + ')',
              { size: 13, color: INK, anchorX: 'middle' });
          }
          P.renderCard(
            '<b>识别基本图形</b><br><br>' +
            '这排箭头图案共 4 个<br><br>' +
            '哪一个是<b>基本图形</b>？<br>' +
            '<span style="color:#90a4ae">（最小的重复单元）</span>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：高亮第1个（基本图形），描边加粗
        narration: '就是第 ① 个！它就是我们的"基本图形"——整个图案的最小重复单元。看，我把它的边框加粗、变色来突出显示。记住这个基本图形的形状、大小，接下来它要"旅行"了！',
        enter: function (anim) {
          // 高亮第0个：填色加深，描边加粗变色
          S.remove('arrow-0');
          S.addPolygon('arrow-0', arrowPts(BASE_X, BASE_Y, ARROW_W, ARROW_H),
            { fillColor: '#ffcc02', strokeColor: ORANGE, strokeWidth: 4, fillOpacity: 0.95 });

          // 加"基本图形"标注
          S.addPolygon('base-label-bg',
            [[BASE_X - 0.3, BASE_Y - ARROW_H/2 - 1.8],
             [BASE_X + ARROW_W + 0.3, BASE_Y - ARROW_H/2 - 1.8],
             [BASE_X + ARROW_W + 0.3, BASE_Y - ARROW_H/2 - 0.9],
             [BASE_X - 0.3, BASE_Y - ARROW_H/2 - 0.9]],
            { fillColor: '#fff8e1', strokeColor: ORANGE, strokeWidth: 2, fillOpacity: 1 });
          S.addText('base-label', BASE_X + ARROW_W/2, BASE_Y - ARROW_H/2 - 1.5,
            '基本图形', { size: 14, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>基本图形</b><br><br>' +
            '第 ① 个箭头就是基本图形<br><br>' +
            '特征：<br>' +
            '• 形状确定<br>' +
            '• 大小固定<br>' +
            '• 方向不变（平移不改变方向）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：标出平移向量（方向+距离）
        narration: '现在来找平移规律！从第 ① 个移到第 ② 个，移动的方向是向右，移动的距离是多少呢？我们用一个箭头来表示这个"平移向量"——方向水平向右，长度就是两个图形对应点之间的距离，大约是 4.2 格！',
        enter: function (anim) {
          // 画平移向量箭头（从第0个到第1个，用对应点：左顶点连到右对应顶点）
          var x0 = BASE_X;
          var x1 = BASE_X + STEP_X;
          var vecY = BASE_Y + ARROW_H / 2 + 0.8;

          S.addSegment('vec-line', [x0, vecY], [x1, vecY],
            { color: PURPLE, width: 3, dash: 0 });
          S.addPolygon('vec-head',
            [[x1, vecY + 0.35], [x1 + 0.6, vecY], [x1, vecY - 0.35]],
            { fillColor: PURPLE, strokeColor: PURPLE, strokeWidth: 1 });
          S.addText('vec-lbl', (x0 + x1 + 0.6) / 2, vecY + 0.65,
            '平移向量：向右 4.2 格', { size: 13, color: PURPLE, anchorX: 'middle' });

          // 在第0、1个之间标注"每次右移"
          S.addText('step-lbl', BASE_X + STEP_X / 2, BASE_Y - ARROW_H / 2 - 1.5,
            '4.2 格', { size: 13, color: PURPLE, anchorX: 'middle' });
          S.addSegment('step-seg',
            [BASE_X, BASE_Y - ARROW_H / 2 - 1.3],
            [BASE_X + STEP_X, BASE_Y - ARROW_H / 2 - 1.3],
            { color: PURPLE, width: 2, dash: 0 });

          P.renderCard(
            '<b>平移向量</b><br><br>' +
            '方向：向右（水平方向）<br>' +
            '距离：每次移动 4.2 格<br><br>' +
            '对应点连线 = 平移向量<br>' +
            '<span style="color:#90a4ae">（长度相等，方向相同）</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤4：依次"点亮"2、3、4号，高亮+间距标注
        narration: '现在来看后面几个副本是怎么来的！——第 ② 个：把基本图形向右平移一次得到；第 ③ 个：再平移一次；第 ④ 个：再平移一次。每一次平移，方向一样、距离一样，图案就这样一个一个地"蹦"出来了！',
        enter: function (anim) {
          // 去掉旧的间距标注
          S.remove('step-lbl');
          S.remove('step-seg');

          if (!anim) {
            // 快放：直接高亮所有并标注
            var i;
            for (i = 1; i < 4; i++) {
              S.remove('arrow-' + i);
              S.addPolygon('arrow-' + i, arrowPts(BASE_X + i * STEP_X, BASE_Y, ARROW_W, ARROW_H),
                { fillColor: '#c8e6c9', strokeColor: GREEN, strokeWidth: 3, fillOpacity: 0.9 });
              S.addText('copy-lbl-' + i,
                BASE_X + i * STEP_X + ARROW_W / 2,
                BASE_Y + ARROW_H / 2 + 0.5,
                '副本' + i, { size: 12, color: GREEN, anchorX: 'middle' });
            }
            P.renderCard(
              '<b>平移规律总结</b><br><br>' +
              '基本图形 → 副本①②③<br>' +
              '每次向右平移相同距离<br><br>' +
              '特点：<br>' +
              '• 形状不变<br>' +
              '• 大小不变<br>' +
              '• 方向不变'
            );
            return;
          }

          // 动画：逐个点亮副本
          var lightUp = function (i) {
            S.remove('arrow-' + i);
            S.addPolygon('arrow-' + i, arrowPts(BASE_X + i * STEP_X, BASE_Y, ARROW_W, ARROW_H),
              { fillColor: '#c8e6c9', strokeColor: GREEN, strokeWidth: 3, fillOpacity: 0.9 });
            S.addText('copy-lbl-' + i,
              BASE_X + i * STEP_X + ARROW_W / 2,
              BASE_Y + ARROW_H / 2 + 0.5,
              '副本' + i, { size: 12, color: GREEN, anchorX: 'middle' });
          };

          return delay(400).then(function () {
            lightUp(1);
            return delay(700);
          }).then(function () {
            lightUp(2);
            return delay(700);
          }).then(function () {
            lightUp(3);
            P.renderCard(
              '<b>平移规律总结</b><br><br>' +
              '基本图形 → 副本①②③<br>' +
              '每次向右平移相同距离<br><br>' +
              '特点：<br>' +
              '• 形状不变<br>' +
              '• 大小不变<br>' +
              '• 方向不变'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
