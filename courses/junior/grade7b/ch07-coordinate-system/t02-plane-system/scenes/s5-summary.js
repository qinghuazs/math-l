(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_Q1 = '#ffccbc';
  var C_Q2 = '#c8e6c9';
  var C_Q3 = '#b3e5fc';
  var C_Q4 = '#f3e5f5';
  var SHADE_OP = 0.28;
  var C_X = '#c62828';
  var C_Y = '#1565c0';
  var C_O = '#6a1b9a';

  var BBOX = [-6, 6, 6, -6];

  function drawFullSystem() {
    // 象限着色
    S.shadeRect('s5-q1', 0, 0, 5.8, 5.8, { color: C_Q1, opacity: SHADE_OP });
    S.shadeRect('s5-q2', -5.8, 0, 0, 5.8, { color: C_Q2, opacity: SHADE_OP });
    S.shadeRect('s5-q3', -5.8, -5.8, 0, 0, { color: C_Q3, opacity: SHADE_OP });
    S.shadeRect('s5-q4', 0, -5.8, 5.8, 0, { color: C_Q4, opacity: SHADE_OP });

    // 象限标号
    S.addText('s5-qi1', 3.5, 3.5, 'Ⅰ', { color: '#bf360c', size: 22 });
    S.addText('s5-qi2', -4.5, 3.5, 'Ⅱ', { color: '#2e7d32', size: 22 });
    S.addText('s5-qi3', -4.5, -3, 'Ⅲ', { color: '#01579b', size: 22 });
    S.addText('s5-qi4', 3.5, -3, 'Ⅳ', { color: '#6a1b9a', size: 22 });

    // 轴标签
    S.addText('s5-xlabel', 5.1, -0.5, '$x$', { color: C_X, size: 18 });
    S.addText('s5-ylabel', 0.25, 5.4, '$y$', { color: C_Y, size: 18 });

    // 原点
    S.dropPoint('s5-origin', 0, 0, { color: C_O, size: 5, name: '' });
    S.addText('s5-oname', 0.2, -0.55, '$O$', { color: C_O, size: 16 });

    // 正方向提示
    S.addText('s5-xdir', 4, 0.3, '→', { color: C_X, size: 16 });
    S.addText('s5-ydir', 0.2, 4.8, '↑', { color: C_Y, size: 16 });
  }

  var scene = {
    id: 's5',
    title: '五、本课小结',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '本节课我们学习了<b>平面直角坐标系</b>。' +
          '核心要素：$x$ 轴（横轴）、$y$ 轴（纵轴）、原点 $O$；' +
          '两轴把平面分成四个象限 Ⅰ Ⅱ Ⅲ Ⅳ（逆时针编号）。' +
          '轴上的点不属于任何象限。',
        enter: function () {
          P.clearExtras();
          drawFullSystem();
          P.renderTable({
            head: ['内容', '关键点'],
            rows: [
              ['$x$ 轴（横轴）', '水平，正方向向右'],
              ['$y$ 轴（纵轴）', '竖直，正方向向上'],
              ['原点 $O$', '两轴交点，坐标 $(0,0)$'],
              ['第一象限 Ⅰ', '$x>0,\\;y>0$'],
              ['第二象限 Ⅱ', '$x<0,\\;y>0$'],
              ['第三象限 Ⅲ', '$x<0,\\;y<0$'],
              ['第四象限 Ⅳ', '$x>0,\\;y<0$'],
              ['轴上的点', '不属于任何象限'],
            ],
          });
        },
      },
      {
        narration: '下一节我们将学习<b>点的坐标</b>：已知点求坐标，已知坐标描点。' +
          '有了平面直角坐标系这个"地图网格"，平面内每个点都能用一对数来精确定位，这就是坐标的力量！',
        enter: function () {
          P.clearExtras();
          drawFullSystem();
          // 示意几个代表点
          S.dropPoint('s5-demo1', 3, 2, { color: '#c62828', size: 5, name: '' });
          S.addText('s5-demo1t', 3.15, 2.25, '$P(3,2)$', { color: '#c62828', size: 14 });
          S.dropPoint('s5-demo2', -2, 3, { color: '#1565c0', size: 5, name: '' });
          S.addText('s5-demo2t', -3.8, 3.25, '$Q(-2,3)$', { color: '#1565c0', size: 14 });
          S.dropPoint('s5-demo3', -3, -2, { color: '#2e7d32', size: 5, name: '' });
          S.addText('s5-demo3t', -5, -1.75, '$R(-3,-2)$', { color: '#2e7d32', size: 14 });

          P.renderCard(
            '<b>下节预告：点的坐标</b><br>' +
            '平面内的点 $P$ 可用有序实数对 $(x,y)$ 唯一确定<br>' +
            '$x$ 为横坐标，$y$ 为纵坐标',
            'cool', 'fadeInUp'
          );
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
