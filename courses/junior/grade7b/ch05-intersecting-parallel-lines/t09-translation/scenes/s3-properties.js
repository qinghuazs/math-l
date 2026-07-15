// s3-properties.js  平移性质探究（5步）★核心
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var CYAN   = '#00838f';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 原三角形 ABC 坐标
  var ax0 = -6, ay0 = 4;
  var bx0 = -3, by0 = 0;
  var cx0 = -7.5, cy0 = 0;

  // 平移量（水平向右）
  var TRANS_DX = 10;
  var TRANS_DY = 0;

  // 终态坐标
  var ax1 = ax0 + TRANS_DX;
  var ay1 = ay0 + TRANS_DY;
  var bx1 = bx0 + TRANS_DX;
  var by1 = by0 + TRANS_DY;
  var cx1 = cx0 + TRANS_DX;
  var cy1 = cy0 + TRANS_DY;

  // 动画偏移（闭包，setup重置）
  var animDx;

  function drawOrigTri() {
    S.addPolygon('tri-orig',
      [[ax0, ay0], [bx0, by0], [cx0, cy0]],
      { fillColor: '#90caf9', fillOpacity: 0.35, strokeColor: '#90caf9', strokeWidth: 2 });
    S.addText('A-lbl', ax0 - 0.6, ay0 + 0.3, 'A', { size: 15, color: '#78909c' });
    S.addText('B-lbl', bx0 + 0.2, by0 - 0.6, 'B', { size: 15, color: '#78909c' });
    S.addText('C-lbl', cx0 - 0.8, cy0 - 0.6, 'C', { size: 15, color: '#78909c' });
  }

  function drawNewTri() {
    S.addPolygon('tri-new',
      [
        [function () { return ax0 + animDx; }, ay1],
        [function () { return bx0 + animDx; }, by1],
        [function () { return cx0 + animDx; }, cy1]
      ],
      { fillColor: BLUE, fillOpacity: 0.75, strokeColor: BLUE, strokeWidth: 3 });
    S.addText('Ap-lbl', function () { return ax0 + animDx - 0.7; }, ay1 + 0.3, "A'", { size: 15, color: BLUE });
    S.addText('Bp-lbl', function () { return bx0 + animDx + 0.2; }, by1 - 0.6, "B'", { size: 15, color: BLUE });
    S.addText('Cp-lbl', function () { return cx0 + animDx - 0.9; }, cy1 - 0.6, "C'", { size: 15, color: BLUE });
  }

  var scene = {
    id: 's3',
    title: '三、平移性质探究',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 5,
    setup: function (stage, panel) {
      S = stage; P = panel;
      animDx = 0;
    },
    steps: [
      {
        // 步骤1：展示原三角形，设置探究目标
        narration: '这一环节我们来深入探究平移的性质。大家看黑板：左边有一个三角形ABC，我们要把它向右平移，得到△A\'B\'C\'。问题是：平移前后的两个三角形，有哪些数学关系？它们的边、角之间有什么联系？带着这个问题来观察动画！',
        enter: function (anim) {
          animDx = 0;
          drawOrigTri();
          P.renderCard(
            '<b>探究目标</b><br><br>' +
            '△ABC 平移后得到 △A\'B\'C\'<br><br>' +
            '探究：<br>' +
            '① 对应点连线有何规律？<br>' +
            '② 对应边有何关系？<br>' +
            '③ 对应角有何关系？'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：拖影动画——原三角形留影，副本平移过去
        narration: '请看！原三角形ABC（淡色留影）保持不动，一个副本正在向右平移——注意每个顶点A、B、C同时移动，移动方向完全相同，移动距离也完全相同，三角形整体"平着移过去"，形状大小没有任何变化！',
        enter: function (anim) {
          animDx = 0;
          // 原影保留
          S.remove('tri-orig');
          drawOrigTri();
          drawNewTri();

          P.renderCard(
            '<b>平移动画</b><br><br>' +
            '淡色 = 原图形 △ABC<br>' +
            '实色 = 平移图形 △A\'B\'C\'<br><br>' +
            '观察：三个顶点同步移动'
          );

          if (!anim) {
            animDx = TRANS_DX;
            S.getBoard().update();
            return;
          }

          return S.animate({
            from: 0, to: TRANS_DX, duration: 1800, easing: 'easeInOutQuart',
            onUpdate: function (v) { animDx = v; S.getBoard().update(); },
          });
        },
      },
      {
        // 步骤3：连接对应点AA'、BB'、CC'，观察平行且相等
        narration: '平移完成了！现在我们连接对应点：AA\'、BB\'、CC\'。仔细观察这三条线段——它们的长度相等（因为每个点移动了相同的距离），而且它们互相平行（因为移动方向相同）！这就是平移性质的第一条：<b>对应点的连线平行且相等</b>！',
        enter: function (anim) {
          // 确保在终态
          animDx = TRANS_DX;
          S.getBoard().update();

          if (!anim) {
            // 快放：直接画出对应连线
            S.addSegment('AA-seg', [ax0, ay0], [ax1, ay1], { color: RED, width: 2, dash: 4 });
            S.addSegment('BB-seg', [bx0, by0], [bx1, by1], { color: GREEN, width: 2, dash: 4 });
            S.addSegment('CC-seg', [cx0, cy0], [cx1, cy1], { color: PURPLE, width: 2, dash: 4 });
            // 长度标注
            S.addText('AA-len', (ax0 + ax1) / 2, (ay0 + ay1) / 2 + 0.5, 'AA\' = BB\' = CC\'', { size: 14, color: RED, anchorX: 'middle' });
            // 平行记号（简单平行号）
            S.addText('par-note', 0, -2.5, 'AA\' ∥ BB\' ∥ CC\'（同方向移动）', { size: 15, color: ORANGE, anchorX: 'middle' });
            P.renderCard(
              '<b>性质①</b><br><br>' +
              '对应点的连线<b>平行且相等</b><br><br>' +
              '即：AA\' ∥ BB\' ∥ CC\'<br>' +
              '且：AA\' = BB\' = CC\'（= 平移距离）'
            );
            return;
          }

          return delay(300).then(function () {
            S.addSegment('AA-seg', [ax0, ay0], [ax1, ay1], { color: RED, width: 2, dash: 4 });
            return delay(500);
          }).then(function () {
            S.addSegment('BB-seg', [bx0, by0], [bx1, by1], { color: GREEN, width: 2, dash: 4 });
            return delay(500);
          }).then(function () {
            S.addSegment('CC-seg', [cx0, cy0], [cx1, cy1], { color: PURPLE, width: 2, dash: 4 });
            return delay(400);
          }).then(function () {
            S.addText('AA-len', (ax0 + ax1) / 2, (ay0 + ay1) / 2 + 0.6, 'AA\' = BB\' = CC\'（= 平移距离）', { size: 14, color: RED, anchorX: 'middle' });
            S.addText('par-note', 0, -2.5, 'AA\' ∥ BB\' ∥ CC\'（三条连线互相平行）', { size: 15, color: ORANGE, anchorX: 'middle' });
            P.renderCard(
              '<b>性质①</b><br><br>' +
              '对应点的连线<b>平行且相等</b><br><br>' +
              '即：AA\' ∥ BB\' ∥ CC\'<br>' +
              '且：AA\' = BB\' = CC\'（= 平移距离）',
              null, 'tada'
            );
          });
        },
      },
      {
        // 步骤4：观察对应边平行相等、对应角相等
        narration: '继续探究！平移前后的两个三角形，不仅对应点连线平行且相等，对应边也有规律：AB和A\'B\'平行且相等，BC和B\'C\'平行且相等，AC和A\'C\'也平行且相等。这是因为平移保持了图形的形状和大小。另外，对应角也完全相等：∠A=∠A\'、∠B=∠B\'、∠C=∠C\'！',
        enter: function (anim) {
          animDx = TRANS_DX;
          // 高亮对应边
          S.addSegment('AB-orig', [ax0, ay0], [bx0, by0], { color: RED, width: 4, dash: 0 });
          S.addSegment('AB-new',  [ax1, ay1], [bx1, by1], { color: RED, width: 4, dash: 0 });
          S.addSegment('BC-orig', [bx0, by0], [cx0, cy0], { color: GREEN, width: 4, dash: 0 });
          S.addSegment('BC-new',  [bx1, by1], [cx1, cy1], { color: GREEN, width: 4, dash: 0 });

          // 角标注
          S.addAngle('angA-orig', [bx0, by0], [ax0, ay0], [cx0, cy0],
            { radius: 0.8, color: ORANGE, label: '\\(\\angle A\\)', opacity: 0.18, labelSize: 13 });
          S.addAngle('angA-new', [bx1, by1], [ax1, ay1], [cx1, cy1],
            { radius: 0.8, color: ORANGE, label: "\\(\\angle A'\\)", opacity: 0.18, labelSize: 13 });

          S.addPolygon('prop-bg',
            [[-9.5, -3.0], [9.5, -3.0], [9.5, -7.2], [-9.5, -7.2]],
            { fillColor: '#f3e5f5', fillOpacity: 0.95, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('prop-t1', 0, -3.6,
            '对应边平行且相等：AB ∥ A\'B\'，AB = A\'B\'',
            { size: 14, color: RED, anchorX: 'middle' });
          S.addText('prop-t2', 0, -4.6,
            '                          BC ∥ B\'C\'，BC = B\'C\'',
            { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('prop-t3', 0, -5.6,
            '对应角相等：∠A = ∠A\'，∠B = ∠B\'，∠C = ∠C\'',
            { size: 14, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>性质② 对应边平行且相等</b><br>' +
            'AB ∥ A\'B\'，且 AB = A\'B\'<br>' +
            'BC ∥ B\'C\'，且 BC = B\'C\'<br><br>' +
            '<b>性质③ 对应角相等</b><br>' +
            '∠A = ∠A\'，∠B = ∠B\'，∠C = ∠C\''
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤5：性质清单总结卡
        narration: '我们来完整总结平移的所有性质！平移前后的两个图形：第一，形状相同，大小相等——两个图形全等；第二，对应点的连线平行且相等——这是平移的"特征指纹"；第三，对应线段平行且相等；第四，对应角相等。总之，平移只改变位置，不改变形状和大小。这些性质在解题中非常重要！',
        enter: function (anim) {
          animDx = TRANS_DX;
          // 清除之前的高亮
          S.remove('AB-orig'); S.remove('AB-new');
          S.remove('BC-orig'); S.remove('BC-new');
          S.remove('angA-orig'); S.remove('angA-new');
          S.remove('prop-bg'); S.remove('prop-t1'); S.remove('prop-t2'); S.remove('prop-t3');
          S.remove('AA-seg'); S.remove('BB-seg'); S.remove('CC-seg');
          S.remove('AA-len'); S.remove('par-note');

          // 画性质清单
          S.addPolygon('sum-bg',
            [[-9.5, -1.0], [9.5, -1.0], [9.5, -7.2], [-9.5, -7.2]],
            { fillColor: '#e8f5e9', fillOpacity: 0.95, strokeColor: GREEN, strokeWidth: 3 });
          S.addText('sum-title', 0, -1.6, '平移的性质（完整清单）', { size: 18, color: GREEN, anchorX: 'middle' });
          S.addText('sum-1', -9.0, -2.5, '① 两图形全等（形状相同、大小相等）', { size: 14, color: INK });
          S.addText('sum-2', -9.0, -3.5, '② 对应点连线  平行且相等', { size: 14, color: RED });
          S.addText('sum-3', -9.0, -4.5, '③ 对应边        平行且相等', { size: 14, color: ORANGE });
          S.addText('sum-4', -9.0, -5.5, '④ 对应角        相等', { size: 14, color: PURPLE });
          S.addText('sum-key', 0, -6.5,
            '核心：平移只改变位置，不改变形状和大小',
            { size: 15, color: BLUE, anchorX: 'middle' });

          P.renderCard(
            '<b>平移性质清单</b><br><br>' +
            '① 两图形<b>全等</b><br>' +
            '② 对应点连线 → <b>平行且相等</b><br>' +
            '③ 对应边 → <b>平行且相等</b><br>' +
            '④ 对应角 → <b>相等</b><br><br>' +
            '平移 = 只改位置，不改形状大小',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
