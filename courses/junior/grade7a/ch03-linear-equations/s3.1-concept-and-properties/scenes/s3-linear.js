(function (CW) {
  'use strict';
  var S, P;
  var GREEN = '#2e7d32', RED = '#c62828', INK = '#455a64', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // [id, 式子(HTML), x, y, 合格?, 标注]
  var EQS = [
    ['q1', '2x + 3 = 9', -5, 3.2, true, '一个未知数，一次 ✓'],
    ['q2', 'x + y = 10', 5, 3.2, false, '两个未知数 ✗'],
    ['q3', 'x<sup>2</sup> = 16', -5, -0.8, false, '未知数是二次 ✗'],
    ['q4', 'x/4 + 1 = 5', 5, -0.8, true, '一个未知数，一次 ✓'],
  ];

  var scene = {
    id: 's3',
    title: '三、认识一元一次方程',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '都是方程，但"长相"不同。逐个观察：每个方程含<b>几个未知数</b>？未知数的<b>最高次数</b>是多少？',
        enter: function (anim) {
          var p = Promise.resolve();
          EQS.forEach(function (q) {
            p = p.then(function () {
              S.actor('s3-' + q[0], q[2], q[3], q[1], { color: INK, size: 27, bold: true });
              return anim ? delay(240) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '把"一个未知数、并且未知数次数都是 1"的挑出来——这样的方程叫作<b>一元一次方程</b>。',
        enter: function (anim) {
          var p = Promise.resolve();
          EQS.forEach(function (q) {
            p = p.then(function () {
              S.actor('s3-m' + q[0], q[2], q[3] - 1.4, q[5], { color: q[4] ? GREEN : RED, size: 15 });
              return anim ? delay(260) : null;
            });
          });
          return p.then(function () {
            P.renderCard('<b>一元</b>：只含一个未知数；<b>一次</b>：未知数的最高次数是 1；<br>并且等号两边都是<b>整式</b>（未知数不能出现在分母里）。', 'warm');
          });
        },
      },
      {
        narration: '一元一次方程整理后都能写成一个统一的<b>一般形式</b>。注意 $a\\neq 0$——不然未知数就消失了。',
        enter: function () {
          S.actor('s3-gen', 0, -4.6, 'ax + b = 0（a ≠ 0）', { color: PURPLE, size: 30, bold: true });
          P.renderCard('一般形式：$ax+b=0$（$a\\neq 0$）<br>如 $2x+3=9$ 整理为 $2x-6=0$。', 'cool');
        },
      },
      {
        narration: '快速判断：下面 6 个式子，哪些是一元一次方程？',
        enter: function () {
          P.renderTable({
            head: ['式子', '是？', '原因'],
            rows: [
              ['$3x+2=8$', '✓', ''],
              ['$x^2-1=0$', '✗', '次数是 2'],
              ['$2x+y=7$', '✗', '两个未知数'],
              ['$\\frac{x}{5}=3$', '✓', ''],
              ['$\\frac{2}{x}=4$', '✗', '未知数在分母'],
              ['$0x+3=5$', '✗', '系数为 0，实际不含未知数'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
