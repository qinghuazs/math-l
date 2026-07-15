(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_Q1 = '#ffccbc';
  var C_Q2 = '#c8e6c9';
  var C_Q3 = '#b3e5fc';
  var C_Q4 = '#f3e5f5';
  var SHADE_OP = 0.25;

  // 点的颜色
  var C_PA = '#c62828';
  var C_PB = '#1565c0';
  var C_PC = '#2e7d32';
  var C_PD = '#6a1b9a';
  var C_PE = '#e65100';
  var C_PF = '#37474f';

  var BBOX = [-6, 6, 6, -6];

  // 练习题各点
  var POINTS = [
    { id: 'pa', x: 3, y: 2, color: C_PA, label: '$A(3,2)$', answer: '第一象限', q: 'Ⅰ' },
    { id: 'pb', x: -2, y: 4, color: C_PB, label: '$B(-2,4)$', answer: '第二象限', q: 'Ⅱ' },
    { id: 'pc', x: -4, y: -1, color: C_PC, label: '$C(-4,-1)$', answer: '第三象限', q: 'Ⅲ' },
    { id: 'pd', x: 5, y: -3, color: C_PD, label: '$D(5,-3)$', answer: '第四象限', q: 'Ⅳ' },
    { id: 'pe', x: 0, y: 3, color: C_PE, label: '$E(0,3)$', answer: '不在任何象限（$y$ 轴上）', q: null },
    { id: 'pf', x: -2, y: 0, color: C_PF, label: '$F(-2,0)$', answer: '不在任何象限（$x$ 轴上）', q: null },
  ];

  function shadeBg() {
    S.shadeRect('s4-q1bg', 0, 0, 5.8, 5.8, { color: C_Q1, opacity: SHADE_OP });
    S.shadeRect('s4-q2bg', -5.8, 0, 0, 5.8, { color: C_Q2, opacity: SHADE_OP });
    S.shadeRect('s4-q3bg', -5.8, -5.8, 0, 0, { color: C_Q3, opacity: SHADE_OP });
    S.shadeRect('s4-q4bg', 0, -5.8, 5.8, 0, { color: C_Q4, opacity: SHADE_OP });
    // 象限标号
    S.addText('s4-qi1', 4.5, 4.5, 'Ⅰ', { color: '#bf360c', size: 18 });
    S.addText('s4-qi2', -5, 4.5, 'Ⅱ', { color: '#2e7d32', size: 18 });
    S.addText('s4-qi3', -5, -4.5, 'Ⅲ', { color: '#01579b', size: 18 });
    S.addText('s4-qi4', 4.5, -4.5, 'Ⅳ', { color: '#6a1b9a', size: 18 });
  }

  function dropAllPoints(anim) {
    var p = Promise.resolve();
    POINTS.forEach(function (pt) {
      p = p.then(function () {
        return S.dropPoint('s4-' + pt.id, pt.x, pt.y, {
          color: pt.color, size: 5, name: '', animate: anim,
        });
      }).then(function () {
        S.addText('s4-lbl-' + pt.id, pt.x + 0.15, pt.y + 0.3, pt.label, { color: pt.color, size: 14 });
        if (anim) {
          return new Promise(function (res) { setTimeout(res, 150); });
        }
      });
    });
    return p;
  }

  function revealAnswers() {
    POINTS.forEach(function (pt) {
      var ansColor = pt.q ? '#c62828' : '#e65100';
      var ansText = pt.q ? ('→ ' + pt.q) : '→ 轴上';
      S.addText('s4-ans-' + pt.id, pt.x + 0.15, pt.y - 0.5, ansText, { color: ansColor, size: 13 });
    });
  }

  var scene = {
    id: 's4',
    title: '四、判断象限归属',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '练习：根据坐标判断下列点在第几象限（或在哪条轴上）？' +
          '先自己判断，再看揭示。<br>' +
          '$A(3,2)$，$B(-2,4)$，$C(-4,-1)$，$D(5,-3)$，$E(0,3)$，$F(-2,0)$',
        enter: function (anim) {
          P.clearExtras();
          shadeBg();
          P.renderCard(
            '<b>判断技巧</b><br>' +
            '$x>0,y>0$ → 第一象限 Ⅰ<br>' +
            '$x<0,y>0$ → 第二象限 Ⅱ<br>' +
            '$x<0,y<0$ → 第三象限 Ⅲ<br>' +
            '$x>0,y<0$ → 第四象限 Ⅳ<br>' +
            '$x=0$ 或 $y=0$ → 轴上，无象限',
            'cool', 'fadeIn'
          );
          return dropAllPoints(anim);
        },
      },
      {
        narration: '答案揭示：<br>' +
          '$A(3,2)$：$x>0,y>0$ → <b>第一象限 Ⅰ</b><br>' +
          '$B(-2,4)$：$x<0,y>0$ → <b>第二象限 Ⅱ</b><br>' +
          '$C(-4,-1)$：$x<0,y<0$ → <b>第三象限 Ⅲ</b><br>' +
          '$D(5,-3)$：$x>0,y<0$ → <b>第四象限 Ⅳ</b><br>' +
          '$E(0,3)$：$x=0$ → <b>$y$ 轴上，无象限</b><br>' +
          '$F(-2,0)$：$y=0$ → <b>$x$ 轴上，无象限</b>',
        enter: function () {
          P.clearExtras();
          shadeBg();
          dropAllPoints(false);
          revealAnswers();
          P.renderTable({
            head: ['点', '坐标', '象限/轴'],
            rows: [
              ['$A$', '$(3,2)$', '第一象限 Ⅰ'],
              ['$B$', '$(-2,4)$', '第二象限 Ⅱ'],
              ['$C$', '$(-4,-1)$', '第三象限 Ⅲ'],
              ['$D$', '$(5,-3)$', '第四象限 Ⅳ'],
              ['$E$', '$(0,3)$', '$y$ 轴上（无象限）'],
              ['$F$', '$(-2,0)$', '$x$ 轴上（无象限）'],
            ],
          });
        },
      },
      {
        narration: '<b>轴上点的特殊性</b>：当点的 $x$ 坐标为 $0$，点在 $y$ 轴上；' +
          '当点的 $y$ 坐标为 $0$，点在 $x$ 轴上；' +
          '这类点<b>不属于任何象限</b>，这是判断的易错点，请牢记！',
        enter: function () {
          P.clearExtras();
          shadeBg();
          dropAllPoints(false);
          revealAnswers();
          // 强调轴上的两点
          S.dropPoint('s4-emp-e', 0, 3, { color: '#e65100', size: 8, name: '' });
          S.dropPoint('s4-emp-f', -2, 0, { color: '#e65100', size: 8, name: '' });
          P.renderCard(
            '<b>易错提示</b><br>' +
            'x 坐标为 0 → 在 $y$ 轴上<br>' +
            'y 坐标为 0 → 在 $x$ 轴上<br>' +
            '以上均<b>不属于任何象限</b>',
            'warm', 'tada'
          );
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
