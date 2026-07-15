(function (CW) {
  'use strict';

  var S, P;

  // 练习一：读坐标——图上已有点，学生写出坐标
  var READ_PTS = [
    [2,  3,  '$A$', '#c62828'],
    [-3, 2,  '$B$', '#1565c0'],
    [-2, -4, '$C$', '#2e7d32'],
    [4,  -1, '$D$', '#7b1fa2'],
  ];

  // 练习二：描点——给定坐标，学生标出点
  var PLOT_PTS = [
    [1,  4,  '$M$', '#c62828'],
    [-4, -2, '$N$', '#1565c0'],
    [3,  -3, '$K$', '#2e7d32'],
    [0,  2,  '$L$', '#7b1fa2'],
  ];

  var C_PROJ = '#90a4ae';   // 辅助投影虚线（灰色）

  // 描点辅助：画两条虚线 + 落下点
  function dropPlotPoint(idx, anim) {
    var pt = PLOT_PTS[idx];
    var px = pt[0], py = pt[1];
    S.addSegment('s4-lx' + idx, [px, 0], [px, py], { color: C_PROJ, width: 1.5, dash: 2 });
    S.addSegment('s4-ly' + idx, [0, py], [px, py], { color: C_PROJ, width: 1.5, dash: 2 });
    return S.dropPoint('s4-pp' + idx, px, py, {
      color: pt[3],
      name: pt[2],
      labelOffset: [8, 8],
      animate: anim
    });
  }

  var scene = {
    id: 's4',
    title: '四、课堂练习',
    bbox: [-6, 6, 6, -6],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '读坐标练习：图中有4个点 $A$、$B$、$C$、$D$，' +
          '请先自己判断各点坐标，然后我们逐一揭示答案。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>练习一：读坐标</b><br>' +
            '写出图中各点的坐标',
            'cool', 'fadeInDown'
          );
          var i, promises = [];
          for (i = 0; i < READ_PTS.length; i++) {
            var pt = READ_PTS[i];
            var p = S.dropPoint('s4-rp' + i, pt[0], pt[1], {
              color: pt[3],
              name: pt[2],
              labelOffset: [8, 8],
              animate: anim
            });
            promises.push(p);
          }
          return anim ? Promise.all(promises) : Promise.resolve();
        },
      },
      {
        narration: '答案揭示：$A(2,\\ 3)$、$B(-3,\\ 2)$、$C(-2,\\ -4)$、$D(4,\\ -1)$。' +
          '看清楚了吗？横坐标由 $x$ 轴读出，纵坐标由 $y$ 轴读出，正负由所在方向决定。',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['点', '横坐标', '纵坐标', '坐标'],
            rows: [
              ['$A$', '$2$',  '$3$',  '$A(2,\\ 3)$'],
              ['$B$', '$-3$', '$2$',  '$B(-3,\\ 2)$'],
              ['$C$', '$-2$', '$-4$', '$C(-2,\\ -4)$'],
              ['$D$', '$4$',  '$-1$', '$D(4,\\ -1)$'],
            ]
          });
          var i;
          for (i = 0; i < READ_PTS.length; i++) {
            var pt = READ_PTS[i];
            S.dropPoint('s4-rp' + i, pt[0], pt[1], {
              color: pt[3], name: pt[2], labelOffset: [8, 8]
            });
            // 在点旁标注坐标文字
            S.addText('s4-ans' + i,
              pt[0] + 0.3, pt[1] + 0.45,
              pt[2] + '(' + pt[0] + ',\\ ' + pt[1] + ')',
              { color: pt[3], size: 12 });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '描点练习：依次描出 $M(1,\\ 4)$、$N(-4,\\ -2)$、$K(3,\\ -3)$、$L(0,\\ 2)$。' +
          '注意先横后纵，辅助线帮助定位，两线交点就是目标点。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>练习二：描点</b><br>' +
            '$M(1,\\ 4)$&emsp;$N(-4,\\ -2)$<br>' +
            '$K(3,\\ -3)$&emsp;$L(0,\\ 2)$',
            'warm', 'fadeInDown'
          );
          var p = Promise.resolve();
          var i;
          for (i = 0; i < PLOT_PTS.length; i++) {
            (function (idx) {
              p = p.then(function () {
                return dropPlotPoint(idx, anim);
              });
            })(i);
          }
          return p;
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
