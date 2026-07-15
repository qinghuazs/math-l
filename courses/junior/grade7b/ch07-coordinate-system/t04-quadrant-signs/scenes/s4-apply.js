(function (CW) {
  'use strict';
  var S, P;
  var C_Q1 = '#e53935';
  var C_Q2 = '#1e88e5';
  var C_Q3 = '#43a047';
  var C_Q4 = '#8e24aa';
  var C_AXIS = '#ff6f00';
  var C_SHADE1 = '#ffccbc';
  var C_SHADE2 = '#bbdefb';
  var C_SHADE3 = '#c8e6c9';
  var C_SHADE4 = '#e1bee7';
  var BBOX = [-6, 6, 6, -6];

  function shadeAll() {
    S.shadeRect('s4-q1bg', 0, 0, 6, 6, { color: C_SHADE1, opacity: 0.2 });
    S.shadeRect('s4-q2bg', -6, 0, 0, 6, { color: C_SHADE2, opacity: 0.2 });
    S.shadeRect('s4-q3bg', -6, -6, 0, 0, { color: C_SHADE3, opacity: 0.2 });
    S.shadeRect('s4-q4bg', 0, -6, 6, 0, { color: C_SHADE4, opacity: 0.2 });
  }

  var scene = {
    id: 's4',
    title: '四、应用判断',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '练习：判断下列各点在哪里——' +
          '$A(3,4)$、$B(-2,5)$、$C(-4,-1)$、$D(5,-3)$、$E(5,0)$、$F(0,-5)$。' +
          '特别注意 $E$ 和 $F$，看看它们在哪里——它们都在坐标轴上！',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          S.dropPoint('s4-A', 3, 4, { color: C_Q1, name: '$A(3,4)$', size: 4, animate: anim, labelOffset: [8, 6] });
          S.dropPoint('s4-B', -2, 5, { color: C_Q2, name: '$B(-2,5)$', size: 4, animate: anim, labelOffset: [8, 6] });
          S.dropPoint('s4-C', -4, -1, { color: C_Q3, name: '$C(-4,-1)$', size: 4, animate: anim, labelOffset: [-90, 6] });
          S.dropPoint('s4-D', 5, -3, { color: C_Q4, name: '$D(5,-3)$', size: 4, animate: anim, labelOffset: [8, -18] });
          S.dropPoint('s4-E', 5, 0, { color: C_AXIS, name: '$E(5,0)$', size: 4.5, animate: anim, labelOffset: [8, -18] });
          S.dropPoint('s4-F', 0, -5, { color: C_AXIS, name: '$F(0,-5)$', size: 4.5, animate: anim, labelOffset: [8, -18] });
          P.renderTable({
            head: ['点', '坐标', '位置'],
            rows: [
              ['$A$', '$(3,4)$', '第一象限'],
              ['$B$', '$(-2,5)$', '第二象限'],
              ['$C$', '$(-4,-1)$', '第三象限'],
              ['$D$', '$(5,-3)$', '第四象限'],
              ['$E$', '$(5,0)$', '$x$ 轴上（非象限）'],
              ['$F$', '$(0,-5)$', '$y$ 轴上（非象限）'],
            ],
          });
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 500); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '反向练习：已知坐标符号，判断象限。' +
          '陷阱题：点 $(-2, 0)$ 满足横坐标为负——但它不在第二象限，而在 $x$ 轴负半轴上！' +
          '因为 $y=0$ 意味着它在坐标轴上，坐标轴上的点不在任何象限。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          S.dropPoint('s4-trap1', -2, 0, { color: '#e91e63', size: 5, name: '$(-2,0)$', animate: anim, labelOffset: [8, -18] });
          S.dropPoint('s4-trap2', 0, 3, { color: '#e91e63', size: 5, name: '$(0,3)$', animate: anim, labelOffset: [8, 6] });
          P.renderTable({
            head: ['符号条件', '位置判断'],
            rows: [
              ['$a>0,\\ b>0$', '第一象限'],
              ['$a<0,\\ b>0$', '第二象限'],
              ['$a<0,\\ b<0$', '第三象限'],
              ['$a>0,\\ b<0$', '第四象限'],
              ['$b=0$（任意 $a$）', '$x$ 轴上，非象限'],
              ['$a=0$（任意 $b$）', '$y$ 轴上，非象限'],
            ],
          });
          P.renderCard(
            '<b>陷阱：</b> $(-2,0)$ 在 $x$ 轴上，不在第二象限！<br>' +
            '$y=0$ 说明它在 $x$ 轴，不属于任何象限。',
            'warm', 'tada'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 400); });
          }
          return Promise.resolve();
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
