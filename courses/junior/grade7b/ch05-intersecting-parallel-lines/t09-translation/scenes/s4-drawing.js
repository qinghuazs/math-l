// s4-drawing.js  网格上的平移作图（4步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 网格 bbox 使格点对齐整数：[-8, 6, 8, -6] 横向16格、纵向12格
  // 原三角形 ABC（格点坐标）
  var ax0 = -6, ay0 = 4;
  var bx0 = -3, by0 = 4;
  var cx0 = -5, cy0 = 1;

  // 平移量：右4上2
  var TX = 4, TY = 2;

  // 新三角形 A'B'C' 坐标
  var ax1 = ax0 + TX, ay1 = ay0 + TY;
  var bx1 = bx0 + TX, by1 = by0 + TY;
  var cx1 = cx0 + TX, cy1 = cy0 + TY;

  // 动画各顶点当前位置（actor用）
  var curAx, curAy, curBx, curBy, curCx, curCy;
  var showAp, showBp, showCp;

  function drawOrigTri() {
    S.addPolygon('tri-orig',
      [[ax0, ay0], [bx0, by0], [cx0, cy0]],
      { fillColor: '#90caf9', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 2 });
    S.dropPoint('ptA', ax0, ay0, { color: RED, name: 'A', size: 4, labelOffset: [-18, 8] });
    S.dropPoint('ptB', bx0, by0, { color: RED, name: 'B', size: 4, labelOffset: [6, 8] });
    S.dropPoint('ptC', cx0, cy0, { color: RED, name: 'C', size: 4, labelOffset: [6, -16] });
  }

  var scene = {
    id: 's4',
    title: '四、网格上的平移作图',
    // 网格 bbox 使格点落在整数坐标
    bbox: [-8, 6, 8, -6],
    board: { axis: false, grid: true, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage; P = panel;
      curAx = ax0; curAy = ay0;
      curBx = bx0; curBy = by0;
      curCx = cx0; curCy = cy0;
      showAp = false; showBp = false; showCp = false;
    },
    steps: [
      {
        // 步骤1：显示网格与原三角形，说明平移任务
        narration: '下面我们来学习在网格纸上作平移图。大家看网格黑板——已知三角形ABC，要求将它向右平移4格，再向上平移2格，画出平移后的三角形A\'B\'C\'。作图思路很简单：分别对每个顶点进行平移，然后连接对应点。现在先看清楚原三角形ABC的位置。',
        enter: function (anim) {
          curAx = ax0; curAy = ay0;
          curBx = bx0; curBy = by0;
          curCx = cx0; curCy = cy0;
          showAp = false; showBp = false; showCp = false;
          drawOrigTri();
          // 标注坐标提示
          S.addText('task-title', 0, 5.3, '任务：△ABC 向右平移4格、向上平移2格', { size: 14, color: ORANGE, anchorX: 'middle' });
          P.renderCard(
            '<b>网格作图任务</b><br><br>' +
            '△ABC 向右平移<b>4格</b>、向上平移<b>2格</b><br><br>' +
            '作图步骤：<br>' +
            '① 确定方向和距离<br>' +
            '② 逐顶点作对应点<br>' +
            '③ 顺次连接对应点'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：动画演示 A→A'
        narration: '第一步：找顶点A的对应点A\'。从A出发，向右数4格，再向上数2格，到达A\'。注意在网格上数格子时要沿格线走，不能斜着量！我们用动画来看A点的移动轨迹。',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接画出A'
            S.dropPoint('ptAp', ax1, ay1, { color: PURPLE, name: "A'", size: 4, labelOffset: [-22, 8] });
            S.addSegment('AA-arr', [ax0, ay0], [ax1, ay1], { color: PURPLE, width: 2, dash: 4 });
            P.renderCard(
              '<b>作 A\'（A的对应点）</b><br><br>' +
              '从 A 出发：<br>' +
              '→ 向右 4 格<br>' +
              '↑ 向上 2 格<br>' +
              '到达 A\''
            );
            return;
          }

          // 动画：先水平移，再垂直移（折线动画）
          var midX = ax0 + TX;
          var midY = ay0;
          // 用actor来制作移动点
          var movPt = S.actor('ptA-anim', ax0, ay0, '●',
            { size: 18, color: PURPLE, bold: true });

          // 水平辅助线
          S.addSegment('path-h', [ax0, ay0], [ax0, ay0], { color: PURPLE, width: 2, dash: 6 });

          P.renderCard(
            '<b>作 A\'（A的对应点）</b><br><br>' +
            '从 A 出发：<br>' +
            '→ 向右 4 格<br>' +
            '↑ 向上 2 格<br>' +
            '到达 A\''
          );

          return movPt.moveTo(midX, midY, 800).then(function () {
            S.remove('path-h');
            S.addSegment('path-h', [ax0, ay0], [midX, ay0], { color: PURPLE, width: 2, dash: 6 });
            S.addSegment('path-v', [midX, midY], [midX, midY], { color: PURPLE, width: 2, dash: 6 });
            return movPt.moveTo(ax1, ay1, 600);
          }).then(function () {
            S.remove('path-v');
            S.addSegment('path-v', [midX, midY], [ax1, ay1], { color: PURPLE, width: 2, dash: 6 });
            S.remove('ptA-anim');
            S.dropPoint('ptAp', ax1, ay1, { color: PURPLE, name: "A'", size: 4, labelOffset: [-22, 8] });
            S.addSegment('AA-arr', [ax0, ay0], [ax1, ay1], { color: PURPLE, width: 2, dash: 4 });
            return delay(200);
          });
        },
      },
      {
        // 步骤3：动画演示 B→B'，C→C'
        narration: '接下来找B\'和C\'。规则一样：从B向右4格向上2格得到B\'；从C向右4格向上2格得到C\'。大家注意——三个顶点移动的方向完全相同，距离完全相同，这是平移的本质要求！',
        enter: function (anim) {
          if (!anim) {
            S.dropPoint('ptBp', bx1, by1, { color: GREEN, name: "B'", size: 4, labelOffset: [6, 8] });
            S.addSegment('BB-arr', [bx0, by0], [bx1, by1], { color: GREEN, width: 2, dash: 4 });
            S.dropPoint('ptCp', cx1, cy1, { color: ORANGE, name: "C'", size: 4, labelOffset: [6, -16] });
            S.addSegment('CC-arr', [cx0, cy0], [cx1, cy1], { color: ORANGE, width: 2, dash: 4 });
            P.renderCard(
              '<b>作 B\' 和 C\'</b><br><br>' +
              'B → 右4↑2 → B\'<br>' +
              'C → 右4↑2 → C\'<br><br>' +
              '三顶点：同方向，同距离'
            );
            return;
          }

          // B的移动
          var movB = S.actor('ptB-anim', bx0, by0, '●', { size: 18, color: GREEN, bold: true });
          P.renderCard(
            '<b>作 B\' 和 C\'</b><br><br>' +
            'B → 右4↑2 → B\'<br>' +
            'C → 右4↑2 → C\'<br><br>' +
            '三顶点：同方向，同距离'
          );
          return movB.moveTo(bx0 + TX, by0, 700).then(function () {
            return movB.moveTo(bx1, by1, 500);
          }).then(function () {
            S.remove('ptB-anim');
            S.dropPoint('ptBp', bx1, by1, { color: GREEN, name: "B'", size: 4, labelOffset: [6, 8] });
            S.addSegment('BB-arr', [bx0, by0], [bx1, by1], { color: GREEN, width: 2, dash: 4 });
            return delay(300);
          }).then(function () {
            // C的移动
            var movC = S.actor('ptC-anim', cx0, cy0, '●', { size: 18, color: ORANGE, bold: true });
            return movC.moveTo(cx0 + TX, cy0, 700).then(function () {
              return movC.moveTo(cx1, cy1, 500);
            }).then(function () {
              S.remove('ptC-anim');
              S.dropPoint('ptCp', cx1, cy1, { color: ORANGE, name: "C'", size: 4, labelOffset: [6, -16] });
              S.addSegment('CC-arr', [cx0, cy0], [cx1, cy1], { color: ORANGE, width: 2, dash: 4 });
            });
          });
        },
      },
      {
        // 步骤4：连接对应点，完成新三角形
        narration: '最后一步：顺次连接A\'、B\'、C\'，得到△A\'B\'C\'！这就是平移后的三角形。和原三角形比较一下：形状完全相同，大小完全相等，位置向右移了4格向上移了2格。对应边AB和A\'B\'平行且相等，对应角也相等。平移作图完成！记住口诀：<b>①定方向距离，②逐点平移，③连接成形</b>！',
        enter: function (anim) {
          // 连接A'B'C'
          S.addPolygon('tri-new',
            [[ax1, ay1], [bx1, by1], [cx1, cy1]],
            { fillColor: '#a5d6a7', fillOpacity: 0.55, strokeColor: GREEN, strokeWidth: 3 });
          // 添加步骤说明
          S.addPolygon('step-bg',
            [[-7.8, -0.5], [7.8, -0.5], [7.8, -5.5], [-7.8, -5.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('step-title', 0, -1.1, '平移作图三步骤', { size: 16, color: ORANGE, anchorX: 'middle' });
          S.addText('step-1', -7.5, -2.0, '① 确定方向和距离（右4上2）', { size: 14, color: BLUE });
          S.addText('step-2', -7.5, -3.0, '② 逐顶点平移：A→A\'  B→B\'  C→C\'', { size: 14, color: PURPLE });
          S.addText('step-3', -7.5, -4.0, '③ 顺次连接 A\'B\'C\'，得到△A\'B\'C\'', { size: 14, color: GREEN });
          S.addText('step-note', 0, -5.0, '（检验：对应边平行且相等，对应角相等）', { size: 13, color: INK, anchorX: 'middle' });

          P.renderCard(
            '<b>平移作图完成！</b><br><br>' +
            '口诀：<br>' +
            '① 定方向距离<br>' +
            '② 逐点平移<br>' +
            '③ 连接成形<br><br>' +
            '△ABC ≅ △A\'B\'C\'（全等）',
            null, 'tada'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
