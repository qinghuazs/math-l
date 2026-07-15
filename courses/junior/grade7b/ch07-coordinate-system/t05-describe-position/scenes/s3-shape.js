// s3-shape.js  用坐标表示图形（4步）★核心
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

  // 四边形 ABCD 的顶点（格点）
  var Ax = -3, Ay = 1;
  var Bx =  2, By = 1;
  var Cx =  2, Cy = 4;
  var Dx = -3, Dy = 4;

  // 反向还原用的三角形 PQR（给坐标描点连线）
  var Px = 1,  Py = -1;
  var Qx = 4,  Qy = -1;
  var Rx = 1,  Ry = -4;

  var scene = {
    id: 's3',
    title: '三、用坐标表示图形',
    bbox: [-6, 6, 6, -6],
    board: { grid: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：画出四边形，逐个读出顶点坐标
        narration: '有了坐标系，不仅能描述单个地点，还能描述整个<b>图形</b>！一个图形可以用它所有顶点的坐标来表示。看这个四边形ABCD——我们来逐一读出每个顶点的坐标：A在第二象限，坐标是 $(-3,1)$；B在第一象限，坐标是 $(2,1)$；C是 $(2,4)$；D是 $(-3,4)$。记录下这四个坐标，这个四边形就被完整地"坐标化"了！',
        enter: function (anim) {
          // 先画四边形
          S.addPolygon('quad',
            [[Ax, Ay], [Bx, By], [Cx, Cy], [Dx, Dy]],
            { fillColor: '#bbdefb', fillOpacity: 0.45, strokeColor: BLUE, strokeWidth: 2.5 });

          function dropVerts() {
            S.dropPoint('ptA', Ax, Ay, { color: RED,    name: 'A', size: 4, labelOffset: [-18, -16] });
            S.dropPoint('ptB', Bx, By, { color: ORANGE, name: 'B', size: 4, labelOffset: [6,   -16] });
            S.dropPoint('ptC', Cx, Cy, { color: GREEN,  name: 'C', size: 4, labelOffset: [6,    8] });
            S.dropPoint('ptD', Dx, Dy, { color: PURPLE, name: 'D', size: 4, labelOffset: [-18,  8] });
          }

          if (!anim) {
            dropVerts();
            S.addText('A-coord', Ax - 0.2, Ay - 0.7, '$(-3,1)$', { size: 13, color: RED });
            S.addText('B-coord', Bx + 0.1, By - 0.7, '$(2,1)$',  { size: 13, color: ORANGE });
            S.addText('C-coord', Cx + 0.1, Cy + 0.2, '$(2,4)$',  { size: 13, color: GREEN });
            S.addText('D-coord', Dx - 1.8, Dy + 0.2, '$(-3,4)$', { size: 13, color: PURPLE });
            P.renderCard(
              '<b>四边形ABCD的顶点坐标</b><br><br>' +
              '$A(-3, 1)$<br>' +
              '$B(2, 1)$<br>' +
              '$C(2, 4)$<br>' +
              '$D(-3, 4)$<br><br>' +
              '四个顶点坐标 → 确定图形'
            );
            return;
          }

          dropVerts();
          P.renderCard(
            '<b>四边形ABCD的顶点坐标</b><br><br>' +
            '$A(-3, 1)$<br>' +
            '$B(2, 1)$<br>' +
            '$C(2, 4)$<br>' +
            '$D(-3, 4)$<br><br>' +
            '四个顶点坐标 → 确定图形'
          );

          // 逐个高亮标注坐标
          return delay(400).then(function () {
            S.addText('A-coord', Ax - 0.2, Ay - 0.7, '$(-3,1)$', { size: 13, color: RED });
            return delay(400);
          }).then(function () {
            S.addText('B-coord', Bx + 0.1, By - 0.7, '$(2,1)$', { size: 13, color: ORANGE });
            return delay(400);
          }).then(function () {
            S.addText('C-coord', Cx + 0.1, Cy + 0.2, '$(2,4)$', { size: 13, color: GREEN });
            return delay(400);
          }).then(function () {
            S.addText('D-coord', Dx - 1.8, Dy + 0.2, '$(-3,4)$', { size: 13, color: PURPLE });
            return delay(300);
          });
        },
      },
      {
        // 步骤2：观察特征——这个四边形是什么？
        narration: '观察A、B、C、D四个顶点的坐标，发现什么规律？$A(-3,1)$ 和 $B(2,1)$ 的 $y$ 坐标都是1，说明AB是水平线段；$B(2,1)$ 和 $C(2,4)$ 的 $x$ 坐标都是2，说明BC是竖直线段。水平和竖直的相邻边说明这是一个<b>长方形</b>！宽 $= 2-(-3)=5$，高 $= 4-1=3$。用坐标不仅能描述图形的位置，还能帮我们分析图形的<b>形状和尺寸</b>！',
        enter: function (anim) {
          // 高亮AB段（水平）和BC段（竖直）
          S.addSegment('AB-hl', [Ax, Ay], [Bx, By], { color: RED, width: 4, dash: 0 });
          S.addSegment('BC-hl', [Bx, By], [Cx, Cy], { color: GREEN, width: 4, dash: 0 });

          // 标注边长
          S.addText('AB-len', -0.8, Ay - 0.55, '宽 $= 2-(-3)=5$', { size: 13, color: RED });
          S.addText('BC-len', Cx + 0.15, 2.3,  '高 $= 4-1=3$', { size: 13, color: GREEN });

          // 标注矩形结论
          S.addText('shape-note', 0, -5.2, '长方形 ABCD：宽5，高3', { size: 14, color: BLUE, anchorX: 'middle' });

          P.renderCard(
            '<b>坐标分析图形形状</b><br><br>' +
            '$A,B$ 的 $y$ 坐标同为 $1$ → AB水平<br>' +
            '$B,C$ 的 $x$ 坐标同为 $2$ → BC竖直<br><br>' +
            '→ ABCD 是<b>长方形</b><br>' +
            '宽 $= 2-(-3) = 5$<br>' +
            '高 $= 4-1 = 3$'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：给坐标→描点→作图（作图动画）
        narration: '刚才是"图形→坐标"；现在反过来：给出一组顶点坐标，我们来<b>描点连线，还原图形</b>。已知三角形PQR，三个顶点坐标为 $P(1,-1)$、$Q(4,-1)$、$R(1,-4)$。先在坐标系上找到这三个点，然后依次连接，三角形就画出来了！',
        enter: function (anim) {
          // 清除上一步的高亮
          S.remove('AB-hl'); S.remove('BC-hl');
          S.remove('AB-len'); S.remove('BC-len'); S.remove('shape-note');

          if (!anim) {
            S.dropPoint('ptP', Px, Py, { color: RED,   name: 'P', size: 4, labelOffset: [-16, 8] });
            S.dropPoint('ptQ', Qx, Qy, { color: BLUE,  name: 'Q', size: 4, labelOffset: [6,   8] });
            S.dropPoint('ptR', Rx, Ry, { color: GREEN, name: 'R', size: 4, labelOffset: [-16, -16] });
            S.addText('P-coord', Px - 1.0, Py - 0.6, '$(1,-1)$',  { size: 13, color: RED });
            S.addText('Q-coord', Qx + 0.1, Qy - 0.6, '$(4,-1)$',  { size: 13, color: BLUE });
            S.addText('R-coord', Rx - 1.0, Ry - 0.6, '$(1,-4)$',  { size: 13, color: GREEN });
            S.addPolygon('tri-pqr',
              [[Px, Py], [Qx, Qy], [Rx, Ry]],
              { fillColor: '#a5d6a7', fillOpacity: 0.5, strokeColor: GREEN, strokeWidth: 2.5 });
            P.renderCard(
              '<b>给坐标→描点→作图</b><br><br>' +
              '已知 $\\ P(1,-1)$<br>' +
              '$Q(4,-1)$<br>' +
              '$R(1,-4)$<br><br>' +
              '步骤：找点 → 连线 → 成形'
            );
            return;
          }

          P.renderCard(
            '<b>给坐标→描点→作图</b><br><br>' +
            '已知 $P(1,-1)$<br>' +
            '$Q(4,-1)$<br>' +
            '$R(1,-4)$<br><br>' +
            '步骤：找点 → 连线 → 成形'
          );

          // 动画：逐步描点再连线
          return delay(300).then(function () {
            return S.dropPoint('ptP', Px, Py, { color: RED, name: 'P', size: 4, labelOffset: [-16, 8], animate: true });
          }).then(function () {
            S.addText('P-coord', Px - 1.0, Py - 0.6, '$(1,-1)$', { size: 13, color: RED });
            return delay(400);
          }).then(function () {
            return S.dropPoint('ptQ', Qx, Qy, { color: BLUE, name: 'Q', size: 4, labelOffset: [6, 8], animate: true });
          }).then(function () {
            S.addText('Q-coord', Qx + 0.1, Qy - 0.6, '$(4,-1)$', { size: 13, color: BLUE });
            return delay(400);
          }).then(function () {
            return S.dropPoint('ptR', Rx, Ry, { color: GREEN, name: 'R', size: 4, labelOffset: [-16, -16], animate: true });
          }).then(function () {
            S.addText('R-coord', Rx - 1.0, Ry - 0.6, '$(1,-4)$', { size: 13, color: GREEN });
            return delay(400);
          }).then(function () {
            // 连线成三角形
            S.addPolygon('tri-pqr',
              [[Px, Py], [Qx, Qy], [Rx, Ry]],
              { fillColor: '#a5d6a7', fillOpacity: 0.5, strokeColor: GREEN, strokeWidth: 2.5 });
            return delay(300);
          });
        },
      },
      {
        // 步骤4：分析三角形特征
        narration: '三角形PQR画出来了！分析一下它的特征：$P(1,-1)$ 和 $Q(4,-1)$ 的 $y$ 坐标同为 $-1$，所以PQ是水平线段，长度 $= 4-1 = 3$；$P(1,-1)$ 和 $R(1,-4)$ 的 $x$ 坐标同为 $1$，所以PR是竖直线段，长度 $= |-4-(-1)| = 3$。PQ⊥PR，所以△PQR是<b>等腰直角三角形</b>，直角在P！这就是坐标与图形的完美结合：坐标让图形变得可计算、可描述。',
        enter: function (anim) {
          // 高亮直角
          S.addSegment('PQ-hl', [Px, Py], [Qx, Qy], { color: RED,   width: 4, dash: 0 });
          S.addSegment('PR-hl', [Px, Py], [Rx, Ry], { color: PURPLE, width: 4, dash: 0 });

          // 直角符号（小方块）
          S.addPolygon('rt-mark',
            [[Px, Py], [Px + 0.35, Py], [Px + 0.35, Py - 0.35], [Px, Py - 0.35]],
            { fillColor: 'none', fillOpacity: 0, strokeColor: ORANGE, strokeWidth: 2 });

          S.addText('PQ-len', 2.3, Py - 0.55, '$PQ=3$', { size: 13, color: RED });
          S.addText('PR-len', Px - 1.2, -2.6,  '$PR=3$', { size: 13, color: PURPLE });
          S.addText('tri-note', 0, -5.2,
            '△PQR：等腰直角三角形，直角在 $P$',
            { size: 13, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>坐标分析三角形</b><br><br>' +
            '$P,Q$ 的 $y$ 坐标同 → PQ水平<br>' +
            '$P,R$ 的 $x$ 坐标同 → PR竖直<br>' +
            '$PQ \\perp PR$<br><br>' +
            '$PQ = 4-1 = 3$<br>' +
            '$PR = |-4-(-1)| = 3$<br><br>' +
            '→ 等腰直角三角形'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
