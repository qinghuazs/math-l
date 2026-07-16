(function (CW) {
  'use strict';
  var S, P;
  var COOL   = '#1565c0';
  var WARM   = '#e64a19';
  var INK    = '#37474f';
  var GREEN  = '#2e7d32';

  // 鱼的位置（湖里）
  var FISH_PLAIN = [
    [-8.0, -5.0], [-6.5, -4.5], [-5.0, -5.2], [-3.5, -4.8], [-2.0, -5.3],
    [-8.2, -3.5], [-6.8, -3.0], [-5.2, -3.7], [-3.0, -3.2], [-1.5, -3.8],
    [-7.5, -2.0], [-6.0, -1.5], [-4.5, -2.2], [-2.8, -1.8], [-1.2, -2.4],
    [-8.0, -0.5], [-6.3,  0.0], [-4.8, -0.8], [-3.2, -0.3],
    [-7.2,  1.2], [-5.5,  1.6], [-4.0,  0.8],
  ];
  var FISH_MARKED = [
    [-7.8, -4.0], [-6.2, -3.3], [-4.6, -4.1], [-2.5, -2.6], [-7.0, -1.2],
    [-5.3, -1.8], [-3.8, -0.6], [-6.5,  0.5], [-4.9,  1.0], [-2.0, -0.1],
  ];

  // 第二次捕获：200条，5条有标记
  var RECAPTURE_PLAIN_PTS = [
    [1.5, -5.0], [2.3, -4.6], [3.2, -5.1], [4.1, -4.7], [5.0, -5.2], [5.9, -4.9], [6.8, -4.4], [7.5, -4.8],
    [1.3, -3.8], [2.1, -3.4], [3.0, -3.9], [4.0, -3.5], [5.1, -4.0], [6.0, -3.6], [7.0, -4.1],
    [1.6, -2.6], [2.5, -2.2], [3.4, -2.7], [4.3, -2.3], [5.2, -2.8], [6.3, -2.4], [7.3, -2.9],
    [1.4, -1.4], [2.2, -1.0], [3.1, -1.5], [4.2, -1.1], [5.3, -1.6], [6.2, -1.2], [7.1, -1.7],
    [1.7, -0.2], [2.6,  0.2], [3.5, -0.3], [4.4,  0.1], [5.5, -0.4], [6.4,  0.0],
    [1.5,  1.0], [2.4,  1.4], [3.3,  0.9], [4.5,  1.3], [5.6,  0.8], [6.6,  1.2], [7.4,  0.7],
    [1.8,  2.2], [2.7,  2.6], [3.6,  2.1], [4.6,  2.5], [5.7,  2.0], [6.7,  2.4],
  ];
  var RECAPTURE_MARKED_PTS = [
    [3.8, -4.3], [5.5, -3.2], [2.9, -2.0], [6.5, -0.7], [4.0,  1.7],
  ];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、变式与练习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '【变式练习】科学家要估计某湖泊中鱼的总数。第一次捕获 $m=100$ 条鱼，做上标记后放回湖中并充分混合。第二次捕获 $n=200$ 条，其中有标记的 $k=5$ 条。请估计湖中鱼的总数。',
        enter: function (anim) {
          // 绘制湖面（浅蓝椭圆/多边形模拟）
          S.addCircle('s4-lake', -4.5, -1.8, 5.0,
            { color: '#1976d2', width: 2.5, fill: '#e3f2fd', fillOpacity: 0.5 });
          S.addText('s4-lake-lbl', -8.8, 3.8, '湖泊（总体）', { size: 16, color: COOL });

          var p = Promise.resolve();
          // 画普通鱼（用实心小圆代替）
          FISH_PLAIN.forEach(function (pos, i) {
            p = p.then(function () {
              S.addCircle('s4-fp-' + i, pos[0], pos[1], 0.20,
                { color: COOL, fill: COOL, fillOpacity: 0.7, width: 1 });
              return anim ? delay(25) : null;
            });
          });
          // 画标记鱼（红色）
          FISH_MARKED.forEach(function (pos, i) {
            p = p.then(function () {
              S.addCircle('s4-fm-' + i, pos[0], pos[1], 0.20,
                { color: WARM, fill: WARM, fillOpacity: 0.9, width: 1 });
              return anim ? delay(30) : null;
            });
          });
          // 数据卡
          P.renderCard(
            '已知：$m=100$（第一次标记数）<br>' +
            '$n=200$（第二次捕获数）<br>' +
            '$k=5$（第二次中有标记的）<br>' +
            '求：鱼的总数 $N=?$',
            'warm'
          );
          return p;
        },
      },
      {
        narration: '第二次捕获 200 条，其中 5 条有标记（红色圆点）。根据标记重捕法，建立比例方程：$\\dfrac{100}{N} \\approx \\dfrac{5}{200}$，解出 $N$！',
        enter: function (anim) {
          // 右侧展示第二次捕获
          S.addText('s4-r-lbl', 1.0, 6.8, '第二次捕获（$n=200$ 条）', { size: 16, color: INK });
          var p = Promise.resolve();
          RECAPTURE_PLAIN_PTS.forEach(function (pos, i) {
            p = p.then(function () {
              S.addCircle('s4-rp-' + i, pos[0], pos[1], 0.18,
                { color: COOL, fill: COOL, fillOpacity: 0.6, width: 1 });
              return anim ? delay(15) : null;
            });
          });
          RECAPTURE_MARKED_PTS.forEach(function (pos, i) {
            p = p.then(function () {
              S.addCircle('s4-rm-' + i, pos[0], pos[1], 0.22,
                { color: WARM, fill: WARM, fillOpacity: 1.0, width: 1 });
              S.addCircle('s4-rring-' + i, pos[0], pos[1], 0.38,
                { color: WARM, fill: 'none', width: 2 });
              return anim ? delay(50) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '解方程：$\\dfrac{100}{N} \\approx \\dfrac{5}{200}$，交叉相乘得 $5N = 100 \\times 200 = 20000$，所以 $N \\approx 4000$ 条！这与逐条清点相比，效率大大提高。',
        enter: function () {
          P.clearExtras();
          P.renderCard(
            '解题过程：<br>' +
            '$$\\frac{m}{N} \\approx \\frac{k}{n} \\Rightarrow \\frac{100}{N} \\approx \\frac{5}{200}$$' +
            '$$N \\approx \\frac{100 \\times 200}{5} = \\mathbf{4000}\\text{（条）}$$' +
            '估计该湖中约有 <b>4000 条鱼</b>。',
            'cool', 'flipInX'
          );
          S.addText('s4-ans', -4.0, -6.5,
            '$N \\approx 4000$ 条',
            { size: 22, color: GREEN });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
