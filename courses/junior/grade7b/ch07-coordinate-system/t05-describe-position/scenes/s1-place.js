// s1-place.js  用坐标描述地点（3步）
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

  // 校园地标：[id, x, y, 名称, 颜色, 标签偏移]
  var PLACES = [
    ['lib',   2,  3, '图书馆',  BLUE,   [6,   8]],
    ['cafe', -1,  2, '食  堂',  ORANGE, [-72, 8]],
    ['gym',   3, -1, '操  场',  GREEN,  [6,   8]],
    ['gate',  0, -3, '校  门',  RED,    [6,  -18]],
    ['teach', -3, 1, '教学楼',  PURPLE, [-72, 8]],
  ];

  var scene = {
    id: 's1',
    title: '一、用坐标描述地点',
    bbox: [-6, 6, 6, -6],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：展示校园平面情境，提出问题
        narration: '同学们，大家看这幅校园平面图。校园里有图书馆、食堂、操场、校门、教学楼等地方。如果我想告诉你"图书馆在哪儿"，我应该怎么说？用"左边""右边"不够精确——有没有一种方法，能用数字精确描述每个地点的位置？答案就是：建立<b>平面直角坐标系</b>！',
        enter: function (anim) {
          S.addText('s1-title', 0, 5.3, '校园平面图', { size: 16, color: BLUE, anchorX: 'middle' });
          // 画几个简单的地标方块示意
          S.addPolygon('lib-bg',   [[1.4, 2.5], [2.6, 2.5], [2.6, 3.5], [1.4, 3.5]],
            { fillColor: '#bbdefb', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 1.5 });
          S.addPolygon('cafe-bg',  [[-1.6, 1.5], [-0.4, 1.5], [-0.4, 2.5], [-1.6, 2.5]],
            { fillColor: '#ffe0b2', fillOpacity: 0.7, strokeColor: ORANGE, strokeWidth: 1.5 });
          S.addPolygon('gym-bg',   [[2.2, -1.6], [3.8, -1.6], [3.8, -0.4], [2.2, -0.4]],
            { fillColor: '#c8e6c9', fillOpacity: 0.7, strokeColor: GREEN, strokeWidth: 1.5 });
          S.addPolygon('gate-bg',  [[-0.6, -3.6], [0.6, -3.6], [0.6, -2.4], [-0.6, -2.4]],
            { fillColor: '#ffcdd2', fillOpacity: 0.7, strokeColor: RED, strokeWidth: 1.5 });
          S.addPolygon('teach-bg', [[-3.6, 0.4], [-2.4, 0.4], [-2.4, 1.6], [-3.6, 1.6]],
            { fillColor: '#e1bee7', fillOpacity: 0.7, strokeColor: PURPLE, strokeWidth: 1.5 });

          // 地标名称文字
          S.addText('lib-lbl',   1.45, 2.9, '图书馆', { size: 12, color: BLUE });
          S.addText('cafe-lbl', -1.55, 1.9, '食 堂',  { size: 12, color: ORANGE });
          S.addText('gym-lbl',   2.25, -1.1, '操 场',  { size: 12, color: GREEN });
          S.addText('gate-lbl', -0.55, -3.1, '校 门',  { size: 12, color: RED });
          S.addText('teach-lbl',-3.55, 0.9, '教学楼', { size: 12, color: PURPLE });

          P.renderCard(
            '<b>情境：校园平面图</b><br><br>' +
            '图中有：图书馆、食堂、操场、<br>校门、教学楼<br><br>' +
            '问题：怎样用数字<b>精确</b>描述<br>每个地点的位置？'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：建立坐标系，标注坐标轴
        narration: '我们在校园图上建立一个平面直角坐标系。选校园中心为原点，向右为 $x$ 轴正方向，向上为 $y$ 轴正方向，以100米为一个单位长度。坐标系建立之后，每个地点的位置都能用一个坐标 $(x, y)$ 来唯一确定！这就是坐标的强大之处。',
        enter: function (anim) {
          // 保留地标背景，显示原点标记
          S.dropPoint('origin', 0, 0, { color: RED, name: 'O', size: 5, labelOffset: [-16, -16] });
          S.addText('s1-note', 0, -5.2, '原点O：校园中心；单位：100米', { size: 13, color: INK, anchorX: 'middle' });
          S.addText('s1-x-lbl', 5.5, 0.3, '$x$', { size: 16, color: BLUE });
          S.addText('s1-y-lbl', 0.2, 5.5, '$y$', { size: 16, color: BLUE });
          P.renderCard(
            '<b>建立坐标系</b><br><br>' +
            '• 原点 $O$：校园中心<br>' +
            '• $x$ 轴正方向：向右<br>' +
            '• $y$ 轴正方向：向上<br>' +
            '• 单位长度：100米<br><br>' +
            '建系后，每个地点有<b>唯一坐标</b>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：逐个标注地标点及其坐标
        narration: '现在来读出各地点的坐标。图书馆在 $x$ 轴正方向2格、$y$ 轴正方向3格的位置，坐标是 $(2,3)$。食堂在 $(-1,2)$。操场在 $(3,-1)$。校门在 $(0,-3)$——注意它在 $y$ 轴上，$x$ 坐标为0！教学楼在 $(-3,1)$。同一幅图，建好坐标系之后，每个地点都对应一个且仅一个坐标，非常精确！',
        enter: function (anim) {
          var i;
          function dropAll() {
            for (i = 0; i < PLACES.length; i++) {
              var pl = PLACES[i];
              S.dropPoint(pl[0] + '-pt', pl[1], pl[2],
                { color: pl[4], name: '', size: 4 });
              S.addText(pl[0] + '-coord',
                pl[1] + 0.15, pl[2] + 0.35,
                '$(' + pl[1] + ',' + pl[2] + ')$',
                { size: 13, color: pl[4] });
            }
          }

          if (!anim) {
            dropAll();
            P.renderCard(
              '<b>各地点坐标</b><br><br>' +
              '图书馆 $(2, 3)$<br>' +
              '食 堂 $(-1, 2)$<br>' +
              '操 场 $(3, -1)$<br>' +
              '校 门 $(0, -3)$<br>' +
              '教学楼 $(-3, 1)$'
            );
            return;
          }

          // 动画：逐个落点，间隔300ms
          var idx = 0;
          function dropNext() {
            if (idx >= PLACES.length) { return Promise.resolve(); }
            var pl = PLACES[idx++];
            S.dropPoint(pl[0] + '-pt', pl[1], pl[2],
              { color: pl[4], name: '', size: 4, animate: true });
            S.addText(pl[0] + '-coord',
              pl[1] + 0.15, pl[2] + 0.35,
              '$(' + pl[1] + ',' + pl[2] + ')$',
              { size: 13, color: pl[4] });
            return delay(350).then(dropNext);
          }

          P.renderCard(
            '<b>各地点坐标</b><br><br>' +
            '图书馆 $(2, 3)$<br>' +
            '食 堂 $(-1, 2)$<br>' +
            '操 场 $(3, -1)$<br>' +
            '校 门 $(0, -3)$<br>' +
            '教学楼 $(-3, 1)$'
          );
          return dropNext();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
