// s3-shape.js  图形的平移（4步）★核心
(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 原三角形顶点 A(1,2) B(3,2) C(2,4)
  var ax0 = 1, ay0 = 2;
  var bx0 = 3, by0 = 2;
  var cx0 = 2, cy0 = 4;

  // 平移量：向右2，向下3
  var SHIFT_X = 2;   // 右移
  var SHIFT_Y = -3;  // 下移

  // 终态坐标：A'(3,-1) B'(5,-1) C'(4,1)
  var ax1 = ax0 + SHIFT_X;  // 3
  var ay1 = ay0 + SHIFT_Y;  // -1
  var bx1 = bx0 + SHIFT_X;  // 5
  var by1 = by0 + SHIFT_Y;  // -1
  var cx1 = cx0 + SHIFT_X;  // 4
  var cy1 = cy0 + SHIFT_Y;  // 1

  // 动画闭包变量（setup 重置）
  var animDx;  // x 方向累积偏移（0→SHIFT_X）
  var animDy;  // y 方向累积偏移（0→SHIFT_Y）

  function drawOrigTri() {
    S.addPolygon('tri-orig',
      [[ax0, ay0], [bx0, by0], [cx0, cy0]],
      { fillColor: '#ef9a9a', fillOpacity: 0.35, strokeColor: '#ef9a9a', strokeWidth: 2 }
    );
    S.addText('lbl-A', ax0 - 0.9, ay0 + 0.2, '$A(1,2)$', { size: 14, color: '#90a4ae' });
    S.addText('lbl-B', bx0 + 0.2, by0 - 0.6, '$B(3,2)$', { size: 14, color: '#90a4ae' });
    S.addText('lbl-C', cx0 - 1.0, cy0 + 0.2, '$C(2,4)$', { size: 14, color: '#90a4ae' });
  }

  function drawMovingTri() {
    S.addPolygon('tri-move',
      [
        [function () { return ax0 + animDx; }, function () { return ay0 + animDy; }],
        [function () { return bx0 + animDx; }, function () { return by0 + animDy; }],
        [function () { return cx0 + animDx; }, function () { return cy0 + animDy; }]
      ],
      { fillColor: BLUE, fillOpacity: 0.75, strokeColor: BLUE, strokeWidth: 3 }
    );
    S.addText('lbl-Ap', function () { return ax0 + animDx - 1.1; }, function () { return ay0 + animDy - 0.6; }, "$A'$", { size: 14, color: BLUE });
    S.addText('lbl-Bp', function () { return bx0 + animDx + 0.2; }, function () { return by0 + animDy - 0.6; }, "$B'$", { size: 14, color: BLUE });
    S.addText('lbl-Cp', function () { return cx0 + animDx - 1.0; }, function () { return cy0 + animDy + 0.2; }, "$C'$", { size: 14, color: BLUE });
  }

  var scene = {
    id: 's3',
    title: '三、图形的平移',
    bbox: [-8, 7, 8, -7],
    board: { axis: true, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      animDx = 0;
      animDy = 0;
    },
    steps: [
      {
        // 步骤1：展示原三角形 ABC
        narration: '点的平移规律已经掌握了！现在更进一步——把整个图形平移。大家看坐标系中有一个三角形 $ABC$，三个顶点分别是 $A(1,2)$、$B(3,2)$、$C(2,4)$。我们要将这个三角形先向右平移 $2$ 个单位，再向下平移 $3$ 个单位。问题来了：平移后每个顶点坐标怎么变？三角形的形状大小会改变吗？先观察原图形！',
        enter: function (anim) {
          P.clearExtras();
          animDx = 0;
          animDy = 0;

          drawOrigTri();

          P.renderCard(
            '<b>原三角形 $\\triangle ABC$</b><br><br>' +
            '$A(1,\\ 2)$<br>' +
            '$B(3,\\ 2)$<br>' +
            '$C(2,\\ 4)$<br><br>' +
            '任务：向右平移 $2$，再向下平移 $3$',
            'cool', 'fadeInDown'
          );

          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：向右平移2单位动画（animDx: 0→2）
        narration: '第一步：向右平移 $2$ 个单位！观察动画——三个顶点 $A$、$B$、$C$ 同时向右移动，整个三角形"平着"滑过去，形状和大小完全不变！每个顶点横坐标都增加了 $2$，纵坐标不变。$A(1,2) \\to A\'(3,2)$，$B(3,2) \\to B\'(5,2)$，$C(2,4) \\to C\'(4,4)$。记住：所有顶点遵循<b>完全相同</b>的平移规律！',
        enter: function (anim) {
          P.clearExtras();

          // 确保原图在初始位置
          animDy = 0;
          S.remove('tri-orig'); S.remove('lbl-A'); S.remove('lbl-B'); S.remove('lbl-C');
          drawOrigTri();
          S.remove('tri-move'); S.remove('lbl-Ap'); S.remove('lbl-Bp'); S.remove('lbl-Cp');
          animDx = 0;
          drawMovingTri();

          P.renderCard(
            '<b>向右平移 $2$ 个单位</b><br><br>' +
            '$A(1,2) \\to A\'(3,2)$<br>' +
            '$B(3,2) \\to B\'(5,2)$<br>' +
            '$C(2,4) \\to C\'(4,4)$<br><br>' +
            '规律：横坐标 $+2$，纵坐标不变',
            'warm', 'fadeInDown'
          );

          if (!anim) {
            animDx = SHIFT_X;
            S.getBoard().update();
            return;
          }

          return S.animate({
            from: 0, to: SHIFT_X, duration: 1500, easing: 'easeInOutQuart',
            onUpdate: function (v) { animDx = v; S.getBoard().update(); }
          });
        },
      },
      {
        // 步骤3：再向下平移3单位（animDy: 0→-3）
        narration: '第二步：在向右 $2$ 单位之后，再向下平移 $3$ 个单位！看动画——三角形从当前位置向下滑动。每个顶点纵坐标都减少 $3$，横坐标不变。最终：$A\'\'(3,-1)$、$B\'\'(5,-1)$、$C\'\'(4,1)$。这就是两步平移叠加的结果！',
        enter: function (anim) {
          P.clearExtras();

          // 确保 animDx 已到位
          animDx = SHIFT_X;
          S.getBoard().update();

          P.renderCard(
            '<b>再向下平移 $3$ 个单位</b><br><br>' +
            "$A'(3,2) \\to A''(3,-1)$<br>" +
            "$B'(5,2) \\to B''(5,-1)$<br>" +
            "$C'(4,4) \\to C''(4,1)$<br><br>" +
            '规律：横坐标不变，纵坐标 $-3$',
            'cool', 'fadeInDown'
          );

          if (!anim) {
            animDy = SHIFT_Y;
            S.getBoard().update();
            // 更新标签为终态坐标
            S.remove('lbl-Ap'); S.remove('lbl-Bp'); S.remove('lbl-Cp');
            S.addText('lbl-Ap', ax1 - 1.4, ay1 - 0.6, "$A''(3,-1)$", { size: 13, color: BLUE });
            S.addText('lbl-Bp', bx1 + 0.2, by1 - 0.6, "$B''(5,-1)$", { size: 13, color: BLUE });
            S.addText('lbl-Cp', cx1 - 1.3, cy1 + 0.2, "$C''(4,1)$",  { size: 13, color: BLUE });
            return;
          }

          return S.animate({
            from: 0, to: SHIFT_Y, duration: 1500, easing: 'easeInOutQuart',
            onUpdate: function (v) { animDy = v; S.getBoard().update(); }
          }).then(function () {
            S.remove('lbl-Ap'); S.remove('lbl-Bp'); S.remove('lbl-Cp');
            S.addText('lbl-Ap', ax1 - 1.4, ay1 - 0.6, "$A''(3,-1)$", { size: 13, color: BLUE });
            S.addText('lbl-Bp', bx1 + 0.2, by1 - 0.6, "$B''(5,-1)$", { size: 13, color: BLUE });
            S.addText('lbl-Cp', cx1 - 1.3, cy1 + 0.2, "$C''(4,1)$",  { size: 13, color: BLUE });
          });
        },
      },
      {
        // 步骤4：对应顶点坐标对照表 + 强调规律
        narration: '完美！现在让我们用表格来整理全部结果，逐一对比每个顶点的坐标变化——横坐标统一 $+2$（右移$2$），纵坐标统一 $-3$（下移$3$）。这就是图形平移的精髓：<b>图形中每一个点，都遵循完全相同的平移规律</b>！图形平移后形状和大小不变，只是位置变了。两个图形全等！',
        enter: function (anim) {
          P.clearExtras();

          // 确保在终态
          animDx = SHIFT_X;
          animDy = SHIFT_Y;
          S.getBoard().update();

          P.renderTable({
            head: ['顶点', '原坐标', '平移后坐标', '变化规律'],
            rows: [
              ['$A$', '$(1,\\ 2)$',  "$A''(3,\\ -1)$", '横 $+2$，纵 $-3$'],
              ['$B$', '$(3,\\ 2)$',  "$B''(5,\\ -1)$", '横 $+2$，纵 $-3$'],
              ['$C$', '$(2,\\ 4)$',  "$C''(4,\\ 1)$",  '横 $+2$，纵 $-3$'],
            ]
          });

          P.renderCard(
            '<b>核心结论</b><br><br>' +
            '图形平移 $=$ 每个点<b>按同一规律</b>平移<br><br>' +
            '平移不改变形状和大小<br>' +
            '平移前后两图形<b>全等</b>',
            'cool', 'tada'
          );

          if (anim) { return delay(300); }
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
