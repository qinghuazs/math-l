// s1-route.js  用坐标描述路线（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 教材原例：公园路线
  var Ax = 1, Ay = 2;   // A 入口
  var Bx = 5, By = 2;   // B 湖心亭
  var Cx = 5, Cy = 6;   // C 观景台

  var walkerActor = null;

  var scene = {
    id: 's1',
    title: '一、用坐标描述路线',
    bbox: [-8, 7, 8, -7],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      walkerActor = null;
    },
    steps: [
      {
        // 步骤1：情境导入——公园地图
        narration: '同学们，今天我们来学习坐标方法的简单应用。先看这道题：某公园平面图中，以公园中心为原点建立坐标系，$A(1,2)$ 是公园入口，$B(5,2)$ 是湖心亭，$C(5,6)$ 是观景台。请问：从入口走到观景台，经过湖心亭，路线是怎样的？每段走了多远？我们先把这三个地点在坐标系上标出来。',
        enter: function (anim) {
          // 地点背景方块
          S.addPolygon('a-bg', [[0.4,1.4],[1.6,1.4],[1.6,2.6],[0.4,2.6]],
            { fillColor: '#ffcdd2', fillOpacity: 0.7, strokeColor: RED, strokeWidth: 1.5 });
          S.addPolygon('b-bg', [[4.3,1.4],[5.7,1.4],[5.7,2.6],[4.3,2.6]],
            { fillColor: '#bbdefb', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 1.5 });
          S.addPolygon('c-bg', [[4.3,5.4],[5.7,5.4],[5.7,6.6],[4.3,6.6]],
            { fillColor: '#c8e6c9', fillOpacity: 0.7, strokeColor: GREEN, strokeWidth: 1.5 });

          // 地点文字
          S.addText('a-name', 0.42, 2.1, '入口', { size: 12, color: RED });
          S.addText('b-name', 4.35, 2.1, '湖心亭', { size: 12, color: BLUE });
          S.addText('c-name', 4.35, 6.1, '观景台', { size: 12, color: GREEN });

          // 标注坐标点
          S.dropPoint('ptA', Ax, Ay, { color: RED,   name: 'A', size: 4.5, labelOffset: [-16, -18] });
          S.dropPoint('ptB', Bx, By, { color: BLUE,  name: 'B', size: 4.5, labelOffset: [6,  -18] });
          S.dropPoint('ptC', Cx, Cy, { color: GREEN, name: 'C', size: 4.5, labelOffset: [6,    8] });

          S.addText('a-coord', Ax - 1.5, Ay - 0.7, '$A(1,2)$',  { size: 13, color: RED });
          S.addText('b-coord', Bx + 0.2, By - 0.7, '$B(5,2)$',  { size: 13, color: BLUE });
          S.addText('c-coord', Cx + 0.2, Cy + 0.2, '$C(5,6)$',  { size: 13, color: GREEN });

          S.addText('map-title', -7, 6.3, '公园平面图（$x$ 轴向东，$y$ 轴向北）', { size: 13, color: INK });

          P.renderCard(
            '<b>情境：公园路线</b><br><br>' +
            '• $A(1,2)$：入口<br>' +
            '• $B(5,2)$：湖心亭<br>' +
            '• $C(5,6)$：观景台<br><br>' +
            '路线：$A \\to B \\to C$<br>' +
            '问：每段走了多远？方向如何？'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：小人走路动画，A→B→C，边走边留痕
        narration: '好，现在让小明从 $A(1,2)$ 出发，沿路线走到 $C(5,6)$。第一段 $A\\to B$：$x$ 坐标从1增加到5，增加了4；$y$ 坐标不变，仍是2。这说明小明向东走了4个单位。第二段 $B\\to C$：$x$ 坐标不变，仍是5；$y$ 坐标从2增加到6，增加了4。这说明小明向北走了4个单位。结论：向东走则 $x$ 坐标增大；向北走则 $y$ 坐标增大。',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接落终态
            S.addSegment('seg-AB', [Ax, Ay], [Bx, By], { color: RED,   width: 3.5, dash: 0 });
            S.addSegment('seg-BC', [Bx, By], [Cx, Cy], { color: BLUE,  width: 3.5, dash: 0 });
            S.addText('d-AB', 2.8, Ay - 0.65, '向东4格', { size: 13, color: RED });
            S.addText('d-BC', Bx + 0.2, 4.0,  '向北4格', { size: 13, color: BLUE });
            S.addText('d-total', 0, -6.2, '总路程 $= 4+4 = 8$ 格',
              { size: 14, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>路线分析</b><br><br>' +
              '$A\\to B$：$x: 1\\to5$，$y=2$<br>' +
              '向东走 $5-1=4$ 格<br><br>' +
              '$B\\to C$：$y: 2\\to6$，$x=5$<br>' +
              '向北走 $6-2=4$ 格<br><br>' +
              '总路程 $=4+4=\\mathbf{8}$ 格'
            );
            return;
          }

          // 动画：小人沿路线行走
          walkerActor = S.actor('walker', Ax, Ay, '●',
            { size: 22, color: ORANGE, bold: true });

          P.renderCard(
            '<b>路线分析</b><br><br>' +
            '$A\\to B$：$x: 1\\to5$，$y=2$<br>' +
            '向东走 $5-1=4$ 格<br><br>' +
            '$B\\to C$：$y: 2\\to6$，$x=5$<br>' +
            '向北走 $6-2=4$ 格<br><br>' +
            '总路程 $=4+4=\\mathbf{8}$ 格'
          );

          // 第一段 A→B（向东）
          return walkerActor.moveTo(Bx, By, 1000).then(function () {
            S.addSegment('seg-AB', [Ax, Ay], [Bx, By], { color: RED, width: 3.5, dash: 0 });
            S.addText('d-AB', 2.8, Ay - 0.65, '向东4格', { size: 13, color: RED });
            return delay(300);
          // 第二段 B→C（向北）
          }).then(function () {
            return walkerActor.moveTo(Cx, Cy, 1000);
          }).then(function () {
            S.remove('walker');
            S.addSegment('seg-BC', [Bx, By], [Cx, Cy], { color: BLUE, width: 3.5, dash: 0 });
            S.addText('d-BC', Bx + 0.2, 4.0, '向北4格', { size: 13, color: BLUE });
            return delay(300);
          }).then(function () {
            S.addText('d-total', 0, -6.2, '总路程 $= 4+4 = 8$ 格',
              { size: 14, color: PURPLE, anchorX: 'middle' });
          });
        },
      },
      {
        // 步骤3：方向与坐标变化对应规律
        narration: '我们来总结一下方向与坐标变化的对应关系。向东走 $a$ 格：$x$ 坐标增大 $a$，$y$ 不变；向西走 $a$ 格：$x$ 坐标减小 $a$，$y$ 不变；向北走 $b$ 格：$y$ 坐标增大 $b$，$x$ 不变；向南走 $b$ 格：$y$ 坐标减小 $b$，$x$ 不变。记住：$x$ 管东西，$y$ 管南北。有了坐标，路线中每一段走了多远、方向如何，一目了然！',
        enter: function (anim) {
          // 方向箭头示意图（左侧区域）
          // 东
          S.addSegment('arr-e', [-6, 0], [-3, 0], { color: RED, width: 3, dash: 0 });
          S.addText('lbl-e', -4.8, 0.4, '东：$x$ 增大', { size: 13, color: RED });
          // 西
          S.addSegment('arr-w', [-6, -1.5], [-3, -1.5], { color: ORANGE, width: 3, dash: 0 });
          S.addText('lbl-w', -4.8, -1.1, '西：$x$ 减小', { size: 13, color: ORANGE });
          // 北
          S.addSegment('arr-n', [-2, -2], [-2, 1], { color: BLUE, width: 3, dash: 0 });
          S.addText('lbl-n', -1.8, -0.5, '北：$y$ 增大', { size: 13, color: BLUE });
          // 南
          S.addSegment('arr-s', [-1, -2], [-1, 1], { color: GREEN, width: 3, dash: 0 });
          S.addText('lbl-s', -0.8, -0.5, '南：$y$ 减小', { size: 13, color: GREEN });

          S.addText('rule-title', -7, 2.5, '坐标与方向对应规律：', { size: 14, color: PURPLE });
          S.addText('rule1', -7, 1.7, '$x$ 轴方向：$x$ 正对应东，$x$ 负对应西', { size: 13, color: INK });
          S.addText('rule2', -7, 0.9, '$y$ 轴方向：$y$ 正对应北，$y$ 负对应南', { size: 13, color: INK });

          S.addText('formula', 0, -5.8,
            '路线描述 = 方向 + 距离（坐标差）',
            { size: 13, color: BLUE, anchorX: 'middle' });

          P.renderCard(
            '<b>方向与坐标对应</b><br><br>' +
            '向东 $a$ 格：$x+a$<br>' +
            '向西 $a$ 格：$x-a$<br>' +
            '向北 $b$ 格：$y+b$<br>' +
            '向南 $b$ 格：$y-b$<br><br>' +
            '<b>$x$ 管东西，$y$ 管南北</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
