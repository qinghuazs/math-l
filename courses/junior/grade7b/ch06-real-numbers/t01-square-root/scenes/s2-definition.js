(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', INK = '#455a64', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // y = x^2
  var FQ = function (x) { return x * x; };

  var scene = {
    id: 's2',
    title: '二、平方根的定义',
    bbox: [-6, 30, 6, -6],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '我们借助函数图像来直观理解平方根。先画出抛物线 $y = x^2$，观察它与水平线的交点，就能看出"哪些数的平方等于某个值"。',
        enter: function (anim) {
          return S.plotCurve('s2-parab', FQ, {
            color: COOL, animate: anim, duration: 1400,
            domain: [-5.5, 5.5]
          }).then(function () {
            S.addText('s2-lbl-curve', 3.2, 22, '$y = x^2$', { color: COOL, size: 17 });
          });
        },
      },
      {
        narration: '现在画出水平线 $y = 25$。它与抛物线有两个交点——这两个交点的横坐标，就是满足 $x^2 = 25$ 的两个解。',
        enter: function (anim) {
          return S.plotCurve('s2-parab', FQ, {
            color: COOL, domain: [-5.5, 5.5]
          }).then(function () {
            S.addText('s2-lbl-curve', 3.2, 22, '$y = x^2$', { color: COOL, size: 17 });
            S.addHLine('s2-hline25', 25, { color: WARM, width: 2, dash: 2 });
            S.addText('s2-lbl-h25', 3.8, 25.8, '$y = 25$', { color: WARM, size: 16 });
            if (anim) { return delay(500); }
          });
        },
      },
      {
        narration: '两个交点落下：横坐标 $5$ 和 $-5$。因为 $5^2 = 25$，$(-5)^2 = 25$，所以 $5$ 和 $-5$ 都是 $25$ 的平方根。它们互为相反数，合写为 $\\pm 5$。',
        enter: function (anim) {
          return S.plotCurve('s2-parab', FQ, {
            color: COOL, domain: [-5.5, 5.5]
          }).then(function () {
            S.addText('s2-lbl-curve', 3.2, 22, '$y = x^2$', { color: COOL, size: 17 });
            S.addHLine('s2-hline25', 25, { color: WARM, width: 2, dash: 2 });
            S.addText('s2-lbl-h25', 3.8, 25.8, '$y = 25$', { color: WARM, size: 16 });
            var pa = S.dropPoint('s2-pt-p5', 5, 25, { color: WARM, name: '', animate: anim });
            var pb = S.dropPoint('s2-pt-n5', -5, 25, { color: WARM, name: '', animate: anim });
            return Promise.all([pa, pb]).then(function () {
              S.addText('s2-lbl-p5', 5.1, 23.5, '$x = 5$', { color: WARM, size: 15 });
              S.addText('s2-lbl-n5', -5.8, 23.5, '$x = -5$', { color: WARM, size: 15 });
              // 向 x 轴作投影虚线
              S.addSegment('s2-proj-p5', [5, 25], [5, 0], { color: WARM, width: 1, dash: 2 });
              S.addSegment('s2-proj-n5', [-5, 25], [-5, 0], { color: WARM, width: 1, dash: 2 });
              if (anim) { return delay(200); }
            });
          });
        },
      },
      {
        narration: '这就是平方根的定义：如果一个数 $x$ 的平方等于 $a$，即 $x^2 = a$，那么 $x$ 叫做 $a$ 的<b>平方根</b>，也叫做<b>二次方根</b>。求一个数的平方根的运算，叫做<b>开平方</b>。',
        enter: function (anim) {
          return S.plotCurve('s2-parab', FQ, {
            color: COOL, domain: [-5.5, 5.5]
          }).then(function () {
            S.addText('s2-lbl-curve', 3.2, 22, '$y = x^2$', { color: COOL, size: 17 });
            S.addHLine('s2-hline25', 25, { color: WARM, width: 2, dash: 2 });
            S.addText('s2-lbl-h25', 3.8, 25.8, '$y = 25$', { color: WARM, size: 16 });
            S.dropPoint('s2-pt-p5', 5, 25, { color: WARM, name: '' });
            S.dropPoint('s2-pt-n5', -5, 25, { color: WARM, name: '' });
            S.addText('s2-lbl-p5', 5.1, 23.5, '$x = 5$', { color: WARM, size: 15 });
            S.addText('s2-lbl-n5', -5.8, 23.5, '$x = -5$', { color: WARM, size: 15 });
            S.addSegment('s2-proj-p5', [5, 25], [5, 0], { color: WARM, width: 1, dash: 2 });
            S.addSegment('s2-proj-n5', [-5, 25], [-5, 0], { color: WARM, width: 1, dash: 2 });
            P.renderCard(
              '<b>平方根的定义</b><br>' +
              '若 $x^2 = a$，则 $x$ 叫做 $a$ 的<b>平方根</b>（二次方根）。<br><br>' +
              '例：$5^2 = 25$ 且 $(-5)^2 = 25$<br>' +
              '∴ $25$ 的平方根是 $\\pm 5$<br><br>' +
              '求平方根的运算叫做<b>开平方</b>'
            );
            if (anim) { return delay(300); }
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
