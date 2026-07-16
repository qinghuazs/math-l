(function (CW) {
  'use strict';
  // s3 图像视角：两直线的交点 ★本章名场面
  // bbox: [-2, 12, 12, -2]，两直线交点 (6,4) 居中
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var INK    = '#455a64';

  // 方程① x+y=10  => y = 10-x
  var F1 = function (x) { return 10 - x; };
  // 方程② 2x+y=16 => y = 16-2x
  var F2 = function (x) { return 16 - 2 * x; };

  // 方程①上的若干点（x=0,2,4,6,8,10）
  var PTS1 = [
    { x: 0,  label: '$(0,10)$',  off: [-0.2,  0.5] },
    { x: 4,  label: '$(4,6)$',   off: [-0.3,  0.5] },
    { x: 10, label: '$(10,0)$',  off: [ 0.2,  0.5] },
  ];
  // 方程②上的若干点（x=0,4,8）
  var PTS2 = [
    { x: 0, label: '$(0,16)$',  off: [ 0.2,  0.3] },
    { x: 4, label: '$(4,8)$',   off: [ 0.2,  0.5] },
    { x: 8, label: '$(8,0)$',   off: [ 0.2,  0.5] },
  ];

  var scene = {
    id: 's3',
    title: '三、图像视角：两直线的交点',
    bbox: [-2, 12, 12, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在我们从图形的角度来理解方程组的解！以 x 为横坐标、y 为纵坐标建立坐标系。方程①x+y=10 的每一组解，都对应平面上的一个点。把这些点连起来……',
        enter: function (anim) {
          // 描方程①上的点
          var i;
          for (i = 0; i < PTS1.length; i++) {
            S.dropPoint(
              's3-p1-' + i,
              PTS1[i].x, F1(PTS1[i].x),
              { color: BLUE, name: PTS1[i].label, size: 4,
                animate: anim, labelOffset: [PTS1[i].off[0] * 50, PTS1[i].off[1] * 50] }
            );
          }

          P.renderCard(
            '方程① $x+y=10$ 的部分解：<br>' +
            '$(0,10)$、$(4,6)$、$(10,0)$ ···<br>' +
            '每组解对应坐标系中的一个点（蓝色）。'
          );
        },
      },
      {
        narration: '把方程①所有解对应的点连起来，得到一条直线——方程①的图像就是一条直线！同样地，方程②2x+y=16的所有解也排成一条直线。两条直线画出来是什么关系？',
        enter: function (anim) {
          var i;
          for (i = 0; i < PTS1.length; i++) {
            S.dropPoint(
              's3-p1-' + i,
              PTS1[i].x, F1(PTS1[i].x),
              { color: BLUE, name: PTS1[i].label, size: 4,
                labelOffset: [PTS1[i].off[0] * 50, PTS1[i].off[1] * 50] }
            );
          }

          var p1 = S.plotCurve('s3-line1', F1, {
            color: BLUE, animate: anim, duration: 1100,
          });

          // 描方程②的点和直线（快放时直接画）
          for (i = 0; i < PTS2.length; i++) {
            S.dropPoint(
              's3-p2-' + i,
              PTS2[i].x, F2(PTS2[i].x),
              { color: ORANGE, name: PTS2[i].label, size: 4,
                labelOffset: [PTS2[i].off[0] * 50, PTS2[i].off[1] * 50] }
            );
          }
          var p2 = S.plotCurve('s3-line2', F2, {
            color: ORANGE, animate: false,
          });

          S.addText('s3-l1-label', 9.5, 1.8, '$x+y=10$', { color: BLUE, size: 15 });
          S.addText('s3-l2-label', 7.0, 3.2, '$2x+y=16$', { color: ORANGE, size: 15 });

          P.renderCard(
            '蓝色直线：方程① $x+y=10$ 的图像<br>' +
            '橙色直线：方程② $2x+y=16$ 的图像<br>' +
            '两条直线相交了吗？交点在哪里？'
          );

          return anim ? p1 : Promise.resolve();
        },
      },
      {
        narration: '两条直线相交于一点！交点的坐标是 (6,4)，也就是 x=6，y=4。而这正是我们之前验证过的方程组的解！',
        enter: function (anim) {
          var i;
          for (i = 0; i < PTS1.length; i++) {
            S.dropPoint(
              's3-p1-' + i,
              PTS1[i].x, F1(PTS1[i].x),
              { color: BLUE, name: PTS1[i].label, size: 4,
                labelOffset: [PTS1[i].off[0] * 50, PTS1[i].off[1] * 50] }
            );
          }
          for (i = 0; i < PTS2.length; i++) {
            S.dropPoint(
              's3-p2-' + i,
              PTS2[i].x, F2(PTS2[i].x),
              { color: ORANGE, name: PTS2[i].label, size: 4,
                labelOffset: [PTS2[i].off[0] * 50, PTS2[i].off[1] * 50] }
            );
          }
          S.plotCurve('s3-line1', F1, { color: BLUE });
          S.plotCurve('s3-line2', F2, { color: ORANGE });
          S.addText('s3-l1-label', 9.5, 1.8, '$x+y=10$', { color: BLUE, size: 15 });
          S.addText('s3-l2-label', 7.0, 3.2, '$2x+y=16$', { color: ORANGE, size: 15 });

          // 交点高亮
          var drop = S.dropPoint('s3-intersect', 6, 4, {
            color: RED, name: '$(6,4)$', size: 7,
            animate: anim, labelOffset: [12, 15],
          });

          // 辅助虚线
          S.addSegment('s3-vline', [6, 0], [6, 4], { color: RED, width: 1.5, dash: 2 });
          S.addSegment('s3-hline', [0, 4], [6, 4], { color: RED, width: 1.5, dash: 2 });

          P.renderCard(
            '两条直线<b>相交于点 $(6,4)$</b>！<br>' +
            '交点坐标 $(6,4)$ 恰好就是方程组的解：<br>' +
            '$\\begin{cases}x=6\\\\y=4\\end{cases}$',
            'cool', 'tada'
          );

          return anim ? drop : Promise.resolve();
        },
      },
      {
        narration: '这不是偶然！交点满足直线①（因为交点在直线①上），同时也满足直线②（因为交点也在直线②上）。"在直线上"= 坐标满足方程，所以交点坐标就同时满足两个方程，即方程组的解！',
        enter: function (anim) {
          var i;
          for (i = 0; i < PTS1.length; i++) {
            S.dropPoint(
              's3-p1-' + i,
              PTS1[i].x, F1(PTS1[i].x),
              { color: BLUE, name: PTS1[i].label, size: 4,
                labelOffset: [PTS1[i].off[0] * 50, PTS1[i].off[1] * 50] }
            );
          }
          for (i = 0; i < PTS2.length; i++) {
            S.dropPoint(
              's3-p2-' + i,
              PTS2[i].x, F2(PTS2[i].x),
              { color: ORANGE, name: PTS2[i].label, size: 4,
                labelOffset: [PTS2[i].off[0] * 50, PTS2[i].off[1] * 50] }
            );
          }
          S.plotCurve('s3-line1', F1, { color: BLUE });
          S.plotCurve('s3-line2', F2, { color: ORANGE });
          S.addText('s3-l1-label', 9.5, 1.8, '$x+y=10$', { color: BLUE, size: 15 });
          S.addText('s3-l2-label', 7.0, 3.2, '$2x+y=16$', { color: ORANGE, size: 15 });
          S.dropPoint('s3-intersect', 6, 4, {
            color: RED, name: '$(6,4)$', size: 7, labelOffset: [12, 15],
          });
          S.addSegment('s3-vline', [6, 0], [6, 4], { color: RED, width: 1.5, dash: 2 });
          S.addSegment('s3-hline', [0, 4], [6, 4], { color: RED, width: 1.5, dash: 2 });

          // 脉冲强调交点
          var pls = S.pulse('s3-intersect', 3);

          S.addText('s3-key-insight', 1.5, -1.4,
            '解方程组 = 求两直线的交点坐标',
            { color: RED, size: 16 });

          P.renderCard(
            '<b>图像意义</b>：解方程组 = 求两条直线的<b>交点坐标</b>！<br>' +
            '交点在两条直线上 → 坐标同时满足两个方程 → 就是方程组的解。',
            'cool'
          );

          return anim ? pls : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
