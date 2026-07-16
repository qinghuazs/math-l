(function (CW) {
  'use strict';
  var S, P;
  var BOTTLE = '#5d4037';      // 瓶身棕色
  var BEAN   = '#8d6e63';      // 普通豆子色
  var INK    = '#37474f';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制瓶子：用多边形近似——瓶底、瓶身、瓶肩、瓶颈、瓶口
  function drawBottle() {
    // 瓶身主体（矩形填充）
    S.addPolygon('s1-body', [
      [-3.2, -6.5], [3.2, -6.5], [3.2, 2.0], [-3.2, 2.0]
    ], { color: '#a1887f', opacity: 0.30, borderColor: BOTTLE, borderWidth: 3 });
    // 瓶肩（梯形）
    S.addPolygon('s1-shoulder', [
      [-3.2, 2.0], [3.2, 2.0], [2.0, 4.0], [-2.0, 4.0]
    ], { color: '#a1887f', opacity: 0.30, borderColor: BOTTLE, borderWidth: 3 });
    // 瓶颈（细矩形）
    S.addPolygon('s1-neck', [
      [-2.0, 4.0], [2.0, 4.0], [2.0, 6.2], [-2.0, 6.2]
    ], { color: '#bcaaa4', opacity: 0.40, borderColor: BOTTLE, borderWidth: 3 });
    // 瓶口
    S.addPolygon('s1-mouth', [
      [-2.4, 6.2], [2.4, 6.2], [2.4, 7.0], [-2.4, 7.0]
    ], { color: '#6d4c41', opacity: 0.80, borderColor: BOTTLE, borderWidth: 3 });
  }

  // 在瓶身区域撒满小豆子（addCircle）
  var BEAN_POSITIONS = [
    [-2.5, -5.8], [-1.3, -5.6], [0.2, -5.9], [1.5, -5.7], [2.6, -5.5],
    [-2.7,  -4.8], [-1.8, -4.5], [-0.5, -4.7], [0.8, -4.6], [2.0, -4.9], [2.8, -4.4],
    [-2.4,  -3.8], [-1.2, -3.6], [0.3, -3.9], [1.6, -3.7], [2.5, -3.5],
    [-2.8,  -2.8], [-1.7, -2.5], [-0.4, -2.7], [0.9, -2.9], [2.1, -2.6], [2.7, -2.3],
    [-2.3,  -1.8], [-1.0, -1.6], [0.4, -1.9], [1.7, -1.7], [2.6, -1.5],
    [-2.6,  -0.8], [-1.5, -0.6], [0.1, -0.9], [1.3, -0.7], [2.4, -0.5],
    [-2.0,   0.2], [-0.7,  0.4], [0.6,  0.1], [1.8,  0.3],
    [-2.2,   1.2], [-0.9,  1.4], [0.5,  1.1], [1.6,  1.3]
  ];

  function addBeans(anim) {
    var p = Promise.resolve();
    BEAN_POSITIONS.forEach(function (pos, i) {
      p = p.then(function () {
        S.addCircle('s1-bean-' + i, pos[0], pos[1], 0.28,
          { color: BEAN, fill: BEAN, fillOpacity: 0.9, width: 1 });
        return anim ? delay(35) : null;
      });
    });
    return p;
  }

  var scene = {
    id: 's1',
    title: '一、问题提出',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '老师这里有一瓶豆子，同学们觉得里面大约有多少粒？如果让你们逐粒倒出来数，需要多长时间？有没有更<b>聪明的方法</b>来估计总数？',
        enter: function (anim) {
          drawBottle();
          S.addText('s1-title', -9.2, 6.8, '瓶子里有多少粒豆子？', { size: 20, color: INK });
          return addBeans(anim);
        },
      },
      {
        narration: '面对大量豆子，逐粒清点耗时耗力。生活中有很多类似问题——估计鱼塘里鱼的数量、调查某地区植物种类……今天我们学习一种巧妙的<b>估算方法</b>：<b>标记重捕法</b>。',
        enter: function () {
          P.renderCard(
            '核心问题：不数完，能否估计出<b>总数</b>？<br>' +
            '方法：<b>标记重捕法</b>（mark-recapture method）',
            'cool', 'flipInX'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
