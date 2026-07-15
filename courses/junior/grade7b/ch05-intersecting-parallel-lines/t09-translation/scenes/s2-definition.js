// s2-definition.js  平移的定义与两要素（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 三角形顶点（原位）
  var ax0 = -6, ay0 = 3;
  var bx0 = -4, by0 = 0;
  var cx0 = -8, cy0 = 0;

  // 平移量（闭包变量，在setup重置）
  var dx;

  // 绘制原三角形（淡色留影）
  function drawGhost() {
    S.addPolygon('tri-ghost',
      [[ax0, ay0], [bx0, by0], [cx0, cy0]],
      { fillColor: '#90caf9', fillOpacity: 0.25, strokeColor: '#90caf9', strokeWidth: 2 });
    S.addText('A-ghost', ax0 - 0.5, ay0 + 0.3, 'A', { size: 14, color: '#90caf9' });
    S.addText('B-ghost', bx0 + 0.2, by0 - 0.5, 'B', { size: 14, color: '#90caf9' });
    S.addText('C-ghost', cx0 - 0.7, cy0 - 0.5, 'C', { size: 14, color: '#90caf9' });
  }

  // 绘制动态三角形（跟随dx偏移）
  function drawMovingTri() {
    S.addPolygon('tri-move',
      [
        [function () { return ax0 + dx; }, ay0],
        [function () { return bx0 + dx; }, by0],
        [function () { return cx0 + dx; }, cy0]
      ],
      { fillColor: BLUE, fillOpacity: 0.75, strokeColor: BLUE, strokeWidth: 2 });
    S.addText('A-move', function () { return ax0 + dx - 0.5; }, ay0 + 0.3, "A'",
      { size: 14, color: BLUE });
    S.addText('B-move', function () { return bx0 + dx + 0.2; }, by0 - 0.5, "B'",
      { size: 14, color: BLUE });
    S.addText('C-move', function () { return cx0 + dx - 0.7; }, cy0 - 0.5, "C'",
      { size: 14, color: BLUE });
  }

  // 绘制平移方向向量箭头（从原三角形重心到新位置重心）
  function drawVector(targetDx) {
    var gcx = (ax0 + bx0 + cx0) / 3;
    var gcy = (ay0 + by0 + cy0) / 3;
    S.addSegment('vec-line', [gcx, gcy], [gcx + targetDx, gcy],
      { color: ORANGE, width: 3, dash: 0 });
    // 箭头头部
    S.addPolygon('vec-head',
      [
        [gcx + targetDx - 0.5, gcy + 0.35],
        [gcx + targetDx + 0.3, gcy],
        [gcx + targetDx - 0.5, gcy - 0.35]
      ],
      { fillColor: ORANGE, fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 1 });
    S.addText('vec-lbl', gcx + targetDx / 2, gcy + 0.7, '平移向量', { size: 13, color: ORANGE, anchorX: 'middle' });
  }

  var scene = {
    id: 's2',
    title: '二、平移的定义与两要素',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
      dx = 0;
    },
    steps: [
      {
        // 步骤1：给出平移定义卡
        narration: '我们来给平移下一个精确的定义。在平面内，将一个图形沿某个方向移动一定的距离，这种图形变换叫作<b>平移</b>。注意三个关键词：方向、距离、整体移动。平移之后，图形的形状和大小都不改变，只是位置发生了变化。',
        enter: function (anim) {
          // 画定义背景框
          S.addPolygon('def-bg',
            [[-9.5, 6.5], [9.5, 6.5], [9.5, 2.5], [-9.5, 2.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.95, strokeColor: BLUE, strokeWidth: 3 });
          S.addText('def-title', 0, 5.9, '定义', { size: 20, color: BLUE, anchorX: 'middle' });
          S.addText('def-text', 0, 4.8,
            '在平面内，将一个图形沿某个方向',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('def-text2', 0, 3.8,
            '移动一定的距离，这种图形变换',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('def-text3', 0, 2.9,
            '叫作  平移（Translation）',
            { size: 17, color: BLUE, anchorX: 'middle' });

          // 画一个简单示意图（三角形 + 箭头 + 新三角形）
          S.addPolygon('ex-tri-orig',
            [[-7, 1.5], [-5, -1.5], [-9, -1.5]],
            { fillColor: '#90caf9', fillOpacity: 0.4, strokeColor: BLUE, strokeWidth: 2 });
          S.addSegment('ex-arr', [-6, 0.2], [-1, 0.2], { color: ORANGE, width: 3, dash: 0 });
          S.addPolygon('ex-arr-hd',
            [[-1.5, 0.55], [-0.6, 0.2], [-1.5, -0.15]],
            { fillColor: ORANGE, fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 1 });
          S.addPolygon('ex-tri-new',
            [[-2, 1.5], [0, -1.5], [-4, -1.5]],
            { fillColor: '#1565c0', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 2 });

          S.addText('ex-orig-lbl', -7.3, 1.8, 'A', { size: 14, color: BLUE });
          S.addText('ex-new-lbl', -2.3, 1.8, "A'", { size: 14, color: BLUE });

          P.renderCard(
            '<b>平移的定义</b><br><br>' +
            '在平面内，将一个图形沿<b>某个方向</b><br>' +
            '移动<b>一定的距离</b>，这种图形变换<br>' +
            '叫作<b>平移</b>。<br><br>' +
            '• 形状不变 &nbsp; • 大小不变<br>' +
            '• 位置改变'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：演示动画——三角形沿箭头方向滑动
        narration: '现在我们来演示平移的过程。看黑板：左边有一个三角形ABC（浅蓝色留影），它要沿水平向右方向平移。请仔细观察——三角形整体向右滑动，每个顶点都移动了相同的距离！淡影是原位，实色三角形是平移后的结果，我们分别叫做"原图形"和"平移图形"，对应顶点加撇号 A\'B\'C\'。',
        enter: function (anim) {
          var targetDx = 8;
          dx = 0;
          drawGhost();
          drawMovingTri();

          // 方向箭头（提前显示，指示方向）
          S.addSegment('dir-arr', [ax0 - 1, ay0 + 1.5], [ax0 + targetDx - 1, ay0 + 1.5],
            { color: ORANGE, width: 3, dash: 0 });
          S.addPolygon('dir-arr-hd',
            [
              [ax0 + targetDx - 1.5, ay0 + 1.9],
              [ax0 + targetDx - 0.2, ay0 + 1.5],
              [ax0 + targetDx - 1.5, ay0 + 1.1]
            ],
            { fillColor: ORANGE, fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 1 });
          S.addText('dir-lbl', ax0 + targetDx / 2 - 1, ay0 + 2.2, '平移方向 →', { size: 14, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>平移演示</b><br><br>' +
            '△ABC 沿水平向右方向<br>' +
            '平移一段距离到 △A\'B\'C\'<br><br>' +
            '观察：每个顶点移动距离<b>相同</b><br>' +
            '形状大小<b>不变</b>'
          );

          if (!anim) {
            dx = targetDx;
            S.getBoard().update();
            return;
          }

          return S.animate({
            from: 0, to: targetDx, duration: 1600, easing: 'easeInOutQuart',
            onUpdate: function (v) { dx = v; S.getBoard().update(); },
          });
        },
      },
      {
        // 步骤3：两要素卡片
        narration: '很好！通过这个动画，我们发现平移有两个决定性的要素：<b>第一是方向</b>——三角形向哪个方向移动？今天的例子是水平向右。<b>第二是距离</b>——移动了多远？这两个要素缺一不可！方向不同，移到的位置不同；距离不同，移到的位置也不同。确定了方向和距离，平移就唯一确定了！',
        enter: function (anim) {
          var targetDx = 8;
          // 确保三角形在终态
          dx = targetDx;
          S.getBoard().update();
          // 清除方向箭头，改用平移向量
          S.remove('dir-arr'); S.remove('dir-arr-hd'); S.remove('dir-lbl');
          drawVector(targetDx);

          // 两要素标注框
          S.addPolygon('elem-bg',
            [[-9.5, -2.5], [9.5, -2.5], [9.5, -7.0], [-9.5, -7.0]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: '#f9a825', strokeWidth: 2 });
          S.addText('elem-title', 0, -3.1, '平移的两个要素', { size: 18, color: '#f9a825', anchorX: 'middle' });
          // 要素1
          S.addPolygon('elem1-bg',
            [[-9.0, -3.8], [-0.5, -3.8], [-0.5, -5.8], [-9.0, -5.8]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('elem1-num', -8.2, -4.3, '① 方向', { size: 16, color: BLUE });
          S.addText('elem1-desc', -8.2, -5.2, '沿哪个方向移动', { size: 14, color: INK });
          // 要素2
          S.addPolygon('elem2-bg',
            [[0.5, -3.8], [9.0, -3.8], [9.0, -5.8], [0.5, -5.8]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('elem2-num', 1.3, -4.3, '② 距离', { size: 16, color: GREEN });
          S.addText('elem2-desc', 1.3, -5.2, '移动多远', { size: 14, color: INK });
          S.addText('elem-note', 0, -6.3,
            '方向 + 距离 = 平移向量（完全确定一次平移）',
            { size: 14, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>平移的两要素</b><br><br>' +
            '① <b>方向</b>：沿哪个方向移动<br>' +
            '② <b>距离</b>：移动多远<br><br>' +
            '两要素缺一不可！<br>' +
            '合称"<b>平移向量</b>"（箭头表示）',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
