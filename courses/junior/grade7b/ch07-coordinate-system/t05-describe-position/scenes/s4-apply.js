// s4-apply.js  应用：坐标描述路径与位置关系（3步）
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

  // 路径节点：A(1,1) → B(4,1) → C(4,3) → D(1,3)
  var Ax = 1,  Ay = 1;
  var Bx = 4,  By = 1;
  var Cx = 4,  Cy = 3;
  var Dx = 1,  Dy = 3;

  // 小人（actor）初始在A
  var walkerX = Ax, walkerY = Ay;
  var walkerActor;

  var scene = {
    id: 's4',
    title: '四、应用：坐标描述路线',
    bbox: [-6, 6, 6, -6],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      walkerX = Ax;
      walkerY = Ay;
      walkerActor = null;
    },
    steps: [
      {
        // 步骤1：描述出发点和目标点
        narration: '下面来做一道应用题。小明从 $A(1,1)$ 出发，先走到 $B(4,1)$，再走到 $C(4,3)$，最后到达 $D(1,3)$。我们先在坐标系上标出这四个点，看清楚它们的位置。$A$ 和 $B$ 在同一水平线上（$y$ 坐标都是1）；$B$ 和 $C$ 在同一竖直线上（$x$ 坐标都是4）；$C$ 和 $D$ 又在同一水平线上（$y$ 坐标都是3）。这段路线形成了一个"∩"形。',
        enter: function (anim) {
          S.dropPoint('ptA', Ax, Ay, { color: RED,    name: 'A', size: 4.5, labelOffset: [-16, -16] });
          S.dropPoint('ptB', Bx, By, { color: ORANGE, name: 'B', size: 4.5, labelOffset: [6,   -16] });
          S.dropPoint('ptC', Cx, Cy, { color: GREEN,  name: 'C', size: 4.5, labelOffset: [6,    8] });
          S.dropPoint('ptD', Dx, Dy, { color: PURPLE, name: 'D', size: 4.5, labelOffset: [-16,  8] });

          S.addText('A-lbl', Ax - 0.5, Ay - 0.55, '$(1,1)$',  { size: 13, color: RED });
          S.addText('B-lbl', Bx + 0.1, By - 0.55, '$(4,1)$',  { size: 13, color: ORANGE });
          S.addText('C-lbl', Cx + 0.1, Cy + 0.15, '$(4,3)$',  { size: 13, color: GREEN });
          S.addText('D-lbl', Dx - 1.3, Dy + 0.15, '$(1,3)$',  { size: 13, color: PURPLE });

          S.addText('route-title', -5.5, 5.3, '路线：$A\\to B\\to C\\to D$', { size: 13, color: BLUE });

          P.renderCard(
            '<b>应用题：坐标描述路线</b><br><br>' +
            '出发点 $A(1,1)$<br>' +
            '途经 $B(4,1)$<br>' +
            '途经 $C(4,3)$<br>' +
            '终点 $D(1,3)$<br><br>' +
            '$A\\to B$：水平（$y=1$）<br>' +
            '$B\\to C$：竖直（$x=4$）<br>' +
            '$C\\to D$：水平（$y=3$）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：逐段画路线，计算各段距离
        narration: '现在来逐段画出路线，并计算每段的距离。第一段 $A→B$：水平移动，$y$ 不变，$x$ 从1变到4，距离 $= 4-1 = 3$。第二段 $B→C$：竖直移动，$x$ 不变，$y$ 从1变到3，距离 $= 3-1 = 2$。第三段 $C→D$：水平移动，$y$ 不变，$x$ 从4变到1，距离 $= 4-1 = 3$（向左走）。总路程 $= 3+2+3 = 8$ 格。',
        enter: function (anim) {
          if (!anim) {
            S.addSegment('seg-AB', [Ax, Ay], [Bx, By], { color: RED,    width: 3.5, dash: 0 });
            S.addSegment('seg-BC', [Bx, By], [Cx, Cy], { color: ORANGE, width: 3.5, dash: 0 });
            S.addSegment('seg-CD', [Cx, Cy], [Dx, Dy], { color: GREEN,  width: 3.5, dash: 0 });

            S.addText('d-AB', 2.3, Ay - 0.6, '$=3$', { size: 13, color: RED });
            S.addText('d-BC', Bx + 0.15, 1.9,  '$=2$', { size: 13, color: ORANGE });
            S.addText('d-CD', 2.3, Cy + 0.2, '$=3$', { size: 13, color: GREEN });
            S.addText('d-total', 0, -5.2, '总路程 $= 3+2+3 = 8$',
              { size: 14, color: BLUE, anchorX: 'middle' });

            P.renderCard(
              '<b>各段距离</b><br><br>' +
              '$AB = 4-1 = 3$<br>' +
              '$BC = 3-1 = 2$<br>' +
              '$CD = 4-1 = 3$<br><br>' +
              '总路程 $= 3+2+3 = \\mathbf{8}$'
            );
            return;
          }

          // 动画：小人走路
          walkerActor = S.actor('walker', Ax, Ay, '●',
            { size: 20, color: BLUE, bold: true });

          P.renderCard(
            '<b>各段距离</b><br><br>' +
            '$AB = 4-1 = 3$<br>' +
            '$BC = 3-1 = 2$<br>' +
            '$CD = 4-1 = 3$<br><br>' +
            '总路程 $= 3+2+3 = \\mathbf{8}$'
          );

          // 第一段 A→B
          return walkerActor.moveTo(Bx, By, 900).then(function () {
            S.addSegment('seg-AB', [Ax, Ay], [Bx, By], { color: RED, width: 3.5, dash: 0 });
            S.addText('d-AB', 2.3, Ay - 0.6, '$AB=3$', { size: 13, color: RED });
            return delay(250);
          // 第二段 B→C
          }).then(function () {
            return walkerActor.moveTo(Cx, Cy, 700);
          }).then(function () {
            S.addSegment('seg-BC', [Bx, By], [Cx, Cy], { color: ORANGE, width: 3.5, dash: 0 });
            S.addText('d-BC', Bx + 0.15, 1.9, '$BC=2$', { size: 13, color: ORANGE });
            return delay(250);
          // 第三段 C→D
          }).then(function () {
            return walkerActor.moveTo(Dx, Dy, 900);
          }).then(function () {
            S.remove('walker');
            S.addSegment('seg-CD', [Cx, Cy], [Dx, Dy], { color: GREEN, width: 3.5, dash: 0 });
            S.addText('d-CD', 2.3, Cy + 0.2, '$CD=3$', { size: 13, color: GREEN });
            return delay(300);
          }).then(function () {
            S.addText('d-total', 0, -5.2, '总路程 $= 3+2+3 = 8$',
              { size: 14, color: BLUE, anchorX: 'middle' });
          });
        },
      },
      {
        // 步骤3：位置关系——A和D的关系，A、B、C、D构成的图形
        narration: '再来看看这几个点的位置关系。$A(1,1)$ 和 $D(1,3)$：$x$ 坐标相同，都是1，说明A和D在同一条<b>竖直线</b>上；$A(1,1)$ 和 $B(4,1)$：$y$ 坐标相同，都是1，说明A和B在同一条<b>水平线</b>上。而ABCD这四个点连起来，恰好构成一个<b>长方形</b>！$AB=CD=3$，$BC=AD=2$，这是一个 $3\\times 2$ 的长方形，面积 $= 6$。',
        enter: function (anim) {
          // 补全 AD 段，形成封闭长方形
          S.addSegment('seg-AD', [Ax, Ay], [Dx, Dy], { color: PURPLE, width: 3.5, dash: 2 });
          S.addText('d-AD', Ax - 1.4, 1.9, '$AD=2$', { size: 13, color: PURPLE });

          // 填充长方形
          S.addPolygon('rect-abcd',
            [[Ax, Ay], [Bx, By], [Cx, Cy], [Dx, Dy]],
            { fillColor: '#fffde7', fillOpacity: 0.6, strokeColor: BLUE, strokeWidth: 0 });

          S.addText('area-note', 2.3, 2.1,
            '面积 $= 3\\times2 = 6$',
            { size: 13, color: BLUE });

          S.addText('pos-note', 0, -5.2,
            '$A,D$ 同 $x$ → 竖直；$A,B$ 同 $y$ → 水平',
            { size: 12, color: INK, anchorX: 'middle' });

          P.renderCard(
            '<b>位置关系分析</b><br><br>' +
            '$A(1,1)$, $D(1,3)$：$x$ 相同 → 同竖直线<br>' +
            '$A(1,1)$, $B(4,1)$：$y$ 相同 → 同水平线<br><br>' +
            'ABCD 构成长方形<br>' +
            '$AB=CD=3$，$BC=AD=2$<br>' +
            '面积 $= 3\\times 2 = 6$'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
