// s3-plot-shape.js  描点与图形复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 描点练习：逐步揭示 4 个点
  function dropExPoints(anim) {
    var pts = [
      { id: 'pp-a', x: 2, y: 3, color: BLUE, name: 'A(2,3)' },
      { id: 'pp-b', x: -3, y: 1, color: ORANGE, name: 'B(-3,1)' },
      { id: 'pp-c', x: -2, y: -4, color: RED, name: 'C(-2,-4)' },
      { id: 'pp-d', x: 4, y: -2, color: PURPLE, name: 'D(4,-2)' },
    ];
    if (anim) {
      return pts.reduce(function (p, pt) {
        return p.then(function () {
          return S.dropPoint(pt.id, pt.x, pt.y, {
            color: pt.color, name: pt.name, size: 3.5, animate: true
          });
        }).then(function () { return delay(250); });
      }, Promise.resolve());
    } else {
      pts.forEach(function (pt) {
        S.dropPoint(pt.id, pt.x, pt.y, { color: pt.color, name: pt.name, size: 3.5, animate: false });
      });
    }
  }

  // 图形复习：已知矩形四顶点，还原图形
  function drawRectExample() {
    // 矩形四顶点 A(1,4) B(-3,4) C(-3,-2) D(1,-2)
    var verts = [[1, 4], [-3, 4], [-3, -2], [1, -2]];
    var colors = [BLUE, ORANGE, RED, PURPLE];
    var names  = ['A(1,4)', 'B(-3,4)', 'C(-3,-2)', 'D(1,-2)'];
    for (var i = 0; i < verts.length; i++) {
      S.dropPoint('rv-p' + i, verts[i][0], verts[i][1], {
        color: colors[i], name: names[i], size: 3.5, animate: false
      });
    }
    // 连边
    S.addSegment('rv-s1', verts[0], verts[1], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('rv-s2', verts[1], verts[2], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('rv-s3', verts[2], verts[3], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('rv-s4', verts[3], verts[0], { color: BLUE, width: 2.5, dash: 0 });
    // 尺寸标注
    S.addText('rv-w', -1, -2.7, '宽 $= |1-(-3)|=4$', { size: 12, color: INK, anchorX: 'middle' });
    S.addText('rv-h', 1.8, 1, '高 $= |4-(-2)|=6$', { size: 12, color: INK });
    S.addText('rv-area', -1, 1, '面积 $= 4\\times6=24$', { size: 13, color: GREEN, anchorX: 'middle' });
  }

  var scene = {
    id: 's3',
    title: '三、描点与图形复习',
    bbox: [-6, 6, 6, -6],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：描点双向练习（描点 + 读坐标）
        narration: '这一环节复习描点与读坐标！描点是正向：给坐标，在坐标系中找到对应点。读坐标是逆向：给点的位置，写出它的坐标。这两个方向要双向打通。请看画板：我们来描出四个点——A(2,3)、B(-3,1)、C(-2,-4)、D(4,-2)。描点步骤：先沿 x 轴方向数横坐标，再沿 y 轴方向数纵坐标，交叉处就是该点！',
        enter: function (anim) {
          P.renderTable({
            head: ['点', '横坐标（先）', '纵坐标（后）', '所在象限'],
            rows: [
              ['A(2,3)', '$x=2$（向右2）', '$y=3$（向上3）', '第一象限'],
              ['B(-3,1)', '$x=-3$（向左3）', '$y=1$（向上1）', '第二象限'],
              ['C(-2,-4)', '$x=-2$（向左2）', '$y=-4$（向下4）', '第三象限'],
              ['D(4,-2)', '$x=4$（向右4）', '$y=-2$（向下2）', '第四象限'],
            ],
          });
          return dropExPoints(anim);
        },
      },
      {
        // 步骤2：用坐标表示图形（给顶点坐标还原矩形）
        narration: '进入图形复习！给定矩形的四个顶点坐标：A(1,4)、B(-3,4)、C(-3,-2)、D(1,-2)，在坐标系中描出这四个顶点，依次连接，就能还原出这个矩形。观察规律：AB 边上两点纵坐标相同（都是4），说明 AB 是水平边，宽度 = |1-(-3)| = 4；AD 边上两点横坐标相同（都是1），说明 AD 是竖直边，高度 = |4-(-2)| = 6。面积 = 4×6 = 24 平方单位！',
        enter: function (anim) {
          drawRectExample();
          P.renderCard(
            '<b>用坐标表示图形的规律</b><br>' +
            '两点<b>纵坐标相同</b> → 连线平行于 x 轴（水平边）<br>' +
            '两点<b>横坐标相同</b> → 连线平行于 y 轴（竖直边）<br>' +
            '水平距离 $= |x_1 - x_2|$（横坐标差的绝对值）<br>' +
            '竖直距离 $= |y_1 - y_2|$（纵坐标差的绝对值）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：综合：读坐标 + 判断图形类型
        narration: '再来一道综合练习：已知三角形三顶点为 P(0,5)、Q(-4,0)、R(4,0)，判断该三角形的类型。首先，Q 和 R 的纵坐标都是 0，在 x 轴上，底边 QR 长 = |4-(-4)| = 8；P 在 y 轴上，纵坐标 5，高 = 5。对称性：P 在 y 轴上，Q 和 R 关于 y 轴对称（横坐标互为相反数）。所以 PQ = PR，这是一个等腰三角形，且底边 QR 在 x 轴上！坐标方法让我们不用量角度，光凭计算就能判断图形性质。',
        enter: function (anim) {
          // 三角形
          S.dropPoint('tr-p', 0, 5, { color: BLUE, name: 'P(0,5)', size: 3.5, animate: false });
          S.dropPoint('tr-q', -4, 0, { color: ORANGE, name: 'Q(-4,0)', size: 3.5, animate: false });
          S.dropPoint('tr-r', 4, 0, { color: ORANGE, name: 'R(4,0)', size: 3.5, animate: false });
          S.addSegment('tr-s1', [0, 5], [-4, 0], { color: BLUE, width: 2.5, dash: 0 });
          S.addSegment('tr-s2', [-4, 0], [4, 0], { color: ORANGE, width: 2.5, dash: 0 });
          S.addSegment('tr-s3', [4, 0], [0, 5], { color: BLUE, width: 2.5, dash: 0 });
          // 高线
          S.addSegment('tr-h', [0, 5], [0, 0], { color: GREEN, width: 1.5, dash: 2 });
          S.addText('tr-hl', 0.3, 2.5, '高$=5$', { size: 12, color: GREEN });
          S.addText('tr-bl', 0, -0.5, '底$=|4-(-4)|=8$', { size: 12, color: ORANGE, anchorX: 'middle' });
          S.addText('tr-sym', 0, 4, 'P 在 y 轴上\n关于 y 轴对称', { size: 11, color: PURPLE, anchorX: 'middle' });
          P.renderCard(
            '<b>等腰三角形的坐标特征</b><br>' +
            'P(0,5)、Q(-4,0)、R(4,0)<br>' +
            '底边 QR：纵坐标均为 $0$，在 $x$ 轴上，长 $= 8$<br>' +
            'Q、R 横坐标互为相反数 → 关于 $y$ 轴对称<br>' +
            '∴ $PQ=PR$，△PQR 是<b>等腰三角形</b><br>' +
            '面积 $= \\dfrac{1}{2}\\times 8\\times 5 = 20$'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
