// s2-build-system.js  建立坐标系解决实际问题（3步）
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

  // 社区各地点（以学校为原点时的坐标）
  // 学校 S (0,0)，医院 H (3,2)，超市 M (3,-2)，公园 P (-4,1)
  var scene = {
    id: 's2',
    title: '二、建立坐标系解决问题',
    bbox: [-8, 7, 8, -7],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：展示社区地图（尚无坐标系标记），提出建系问题
        narration: '现在来看一道实际问题。如图是一个社区的平面示意图，社区里有学校、医院、超市和公园四个地点。已知它们的相对位置关系：医院在学校东边3格、北边2格；超市在学校东边3格、南边2格；公园在学校西边4格、北边1格。请同学们思考：如果要用坐标来表示这些地点，你会怎么建立坐标系？原点选哪里最合适？',
        enter: function (anim) {
          // 建系前：只画地点方块，不显示坐标系数字标注
          S.addPolygon('s-bg', [[-0.7,-0.6],[0.7,-0.6],[0.7,0.6],[-0.7,0.6]],
            { fillColor: '#bbdefb', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 1.5 });
          S.addPolygon('h-bg', [[2.3,1.4],[3.7,1.4],[3.7,2.6],[2.3,2.6]],
            { fillColor: '#ffcdd2', fillOpacity: 0.7, strokeColor: RED, strokeWidth: 1.5 });
          S.addPolygon('m-bg', [[2.3,-2.6],[3.7,-2.6],[3.7,-1.4],[2.3,-1.4]],
            { fillColor: '#c8e6c9', fillOpacity: 0.7, strokeColor: GREEN, strokeWidth: 1.5 });
          S.addPolygon('p-bg', [[-4.7,0.4],[-3.3,0.4],[-3.3,1.6],[-4.7,1.6]],
            { fillColor: '#e1bee7', fillOpacity: 0.7, strokeColor: PURPLE, strokeWidth: 1.5 });

          S.addText('s-name', -0.6, 0.1, '学校', { size: 13, color: BLUE });
          S.addText('h-name', 2.4, 2.0, '医院', { size: 13, color: RED });
          S.addText('m-name', 2.4, -2.0, '超市', { size: 13, color: GREEN });
          S.addText('p-name', -4.6, 1.0, '公园', { size: 13, color: PURPLE });

          // 相对位置描述
          S.addText('rel1', -7, 5.9, '• 医院：学校东3格，北2格', { size: 13, color: RED });
          S.addText('rel2', -7, 5.1, '• 超市：学校东3格，南2格', { size: 13, color: GREEN });
          S.addText('rel3', -7, 4.3, '• 公园：学校西4格，北1格', { size: 13, color: PURPLE });

          P.renderCard(
            '<b>社区平面图</b><br><br>' +
            '• 医院：学校东3格，北2格<br>' +
            '• 超市：学校东3格，南2格<br>' +
            '• 公园：学校西4格，北1格<br><br>' +
            '<b>问：</b>选哪里为原点最合适？<br>' +
            '如何建立坐标系？'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：以学校为原点建系，读出各点坐标
        narration: '方案一：以学校为原点，向东为 $x$ 轴正方向，向北为 $y$ 轴正方向建立坐标系。这样学校坐标就是 $S(0,0)$，特别简单！然后根据相对位置，可以立刻读出：医院 $H(3,2)$，超市 $M(3,-2)$，公园 $P(-4,1)$。注意超市在学校南边，$y$ 坐标是负数；公园在学校西边，$x$ 坐标是负数。',
        enter: function (anim) {
          // 在学校原点标记坐标点
          S.dropPoint('ptS', 0, 0, { color: BLUE,   name: 'S', size: 5, labelOffset: [-18, -18] });
          S.dropPoint('ptH', 3, 2, { color: RED,    name: 'H', size: 4.5, labelOffset: [6, 8] });
          S.dropPoint('ptM', 3, -2,{ color: GREEN,  name: 'M', size: 4.5, labelOffset: [6, -18] });
          S.dropPoint('ptP', -4, 1,{ color: PURPLE, name: 'P', size: 4.5, labelOffset: [-18, 8] });

          S.addText('cs-lbl', 0.2, 0.2, '$(0,0)$',  { size: 12, color: BLUE });
          S.addText('ch-lbl', 3.2, 2.2, '$(3,2)$',  { size: 12, color: RED });
          S.addText('cm-lbl', 3.2,-2.4, '$(3,-2)$', { size: 12, color: GREEN });
          S.addText('cp-lbl',-5.6, 1.2, '$(-4,1)$', { size: 12, color: PURPLE });

          S.addText('origin-note', 0, -6.0,
            '原点 = 学校，学校坐标最简单',
            { size: 13, color: BLUE, anchorX: 'middle' });

          P.renderCard(
            '<b>方案一：以学校为原点</b><br><br>' +
            '$S(0,0)$ 学校<br>' +
            '$H(3,2)$ 医院<br>' +
            '$M(3,-2)$ 超市<br>' +
            '$P(-4,1)$ 公园<br><br>' +
            '选学校为原点：坐标简洁，<br>$H$、$M$ 关于 $x$ 轴对称'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：换原点对比，说明建系原则
        narration: '我们再来看方案二：换一个原点——以超市为原点。超市坐标变为 $M(0,0)$，而学校在超市西3格、北2格，所以 $S(-3,2)$；医院在超市北4格，$H(0,4)$；公园在超市西7格、北3格，$P(-7,3)$。比较两个方案：方案一数字小，有负有正但对称美观；方案二某些点坐标变大了。建系原则：让尽量多的关键点坐标简单，通常选对称中心或主要地点为原点。',
        enter: function (anim) {
          // 删除方案一的标注，展示方案二（以超市为原点）
          S.remove('ptS'); S.remove('ptH'); S.remove('ptM'); S.remove('ptP');
          S.remove('cs-lbl'); S.remove('ch-lbl'); S.remove('cm-lbl'); S.remove('cp-lbl');
          S.remove('origin-note');

          // 以超市(3,-2)为原点时各点的坐标标注（显示在实际画板位置处）
          S.dropPoint('new-M', 3, -2, { color: GREEN,  name: "M", size: 5, labelOffset: [6, -18] });
          S.dropPoint('new-S', 0, 0,  { color: BLUE,   name: "S", size: 4.5, labelOffset: [-18, -18] });
          S.dropPoint('new-H', 3, 2,  { color: RED,    name: "H", size: 4.5, labelOffset: [6, 8] });
          S.dropPoint('new-P', -4, 1, { color: PURPLE, name: "P", size: 4.5, labelOffset: [-18, 8] });

          // 方案二坐标标注（相对超市的坐标）
          S.addText('nm-lbl', 3.2, -2.4, '$(0,0)$',   { size: 12, color: GREEN });
          S.addText('ns-lbl', 0.2,  0.2, '$(-3,2)$',  { size: 12, color: BLUE });
          S.addText('nh-lbl', 3.2,  2.2, '$(0,4)$',   { size: 12, color: RED });
          S.addText('np-lbl',-5.6,  1.2, '$(-7,3)$',  { size: 12, color: PURPLE });

          // 对比说明
          S.addText('cmp-title', -7, 6.2, '两种方案对比：', { size: 14, color: ORANGE });
          S.addText('cmp1', -7, 5.4, '方案一（学校原点）：$S(0,0), H(3,2), M(3,-2), P(-4,1)$', { size: 12, color: BLUE });
          S.addText('cmp2', -7, 4.6, '方案二（超市原点）：$M(0,0), H(0,4), S(-3,2), P(-7,3)$', { size: 12, color: GREEN });
          S.addText('cmp-rule', 0, -6.0,
            '建系原则：让关键点坐标尽量简单',
            { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>方案二：以超市为原点</b><br><br>' +
            '$M(0,0)$ 超市<br>' +
            '$H(0,4)$ 医院<br>' +
            '$S(-3,2)$ 学校<br>' +
            '$P(-7,3)$ 公园<br><br>' +
            '<b>建系原则：</b><br>' +
            '选让坐标最简单的点为原点<br>' +
            '（通常选对称中心或主要点）'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
