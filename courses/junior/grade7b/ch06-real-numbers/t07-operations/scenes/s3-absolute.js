(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', BLUE = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', RED = '#c62828';
  var IDS = [];

  function clearAll() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、绝对值与化简',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      IDS = [];
    },
    steps: [
      {
        narration: '绝对值化简的关键：<b>先判断括号内的正负号，再去绝对值</b>。口诀：括号内正，绝对值直接去掉；括号内负，变号取相反数。我们用数轴来辅助判断 $\\sqrt{2}$ 与 1 的大小。',
        enter: function (anim) {
          clearAll();
          // 数轴示意：-10到10，重点标记0,1,sqrt(2)≈1.414
          S.addHLine(keep('s3-axis'), 0, { color: '#90a4ae', width: 2, dash: 0 });

          // 刻度点
          S.dropPoint(keep('s3-p0'), 0, 0, { name: '0', color: INK, size: 3 });
          S.dropPoint(keep('s3-p1'), 2, 0, { name: '1', color: INK, size: 3 });
          // sqrt(2)≈1.414，映射到画板：2*1.414=2.828
          S.dropPoint(keep('s3-psqrt2'), 2.828, 0, { name: '$\\sqrt{2}$', color: RED, size: 4 });

          var p = Promise.resolve();
          if (anim) {
            p = p.then(function () { return delay(500); });
          }
          p = p.then(function () {
            S.actor(keep('s3-cmp'), 0, -2.5, '数轴上：$1 < \\sqrt{2}$，所以 $1 - \\sqrt{2} < 0$', { size: 20, color: BLUE });
            return anim ? delay(500) : null;
          });
          p = p.then(function () {
            S.actor(keep('s3-key'), 0, -4.5, '括号内为负 → 去绝对值要变号', { size: 20, color: RED, bold: true });
            return anim ? delay(500) : null;
          });

          P.renderCard(
            '<b>绝对值化简口诀：</b><br>' +
            '① 先判断括号内表达式的正负<br>' +
            '② 括号内 ≥ 0：直接去掉绝对值符号<br>' +
            '③ 括号内 < 0：去掉绝对值，<b>表达式取反（变号）</b>',
            'warm'
          );
          return p;
        },
      },
      {
        narration: '逐步演算 $|1-\\sqrt{2}|$：第一步比较大小，因为 $\\sqrt{2}\\approx 1.414>1$，所以括号内 $1-\\sqrt{2}<0$；第二步依据"括号内为负则变号"，去掉绝对值得到 $\\sqrt{2}-1$。',
        enter: function (anim) {
          clearAll();
          var rows = [
            ['s3-e1', '$|1-\\sqrt{2}|$', INK, 28],
            ['s3-e2', '因为 $\\sqrt{2}>1$，所以 $1-\\sqrt{2}<0$', BLUE, 20],
            ['s3-e3', '$|1-\\sqrt{2}|=-(1-\\sqrt{2})$', PURPLE, 22],
            ['s3-e4', '$=\\sqrt{2}-1$', GREEN, 30],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 4.5 - i * 2.2, r[1], { size: r[2], color: r[3], bold: i === 3 });
              return anim ? delay(600) : null;
            });
          });
          return p.then(function () {
            P.renderCard('$|1-\\sqrt{2}|=\\sqrt{2}-1$<br><br>结果不含绝对值，化简完成。', 'cool');
          });
        },
      },
      {
        narration: '练习：化简 $|\\sqrt{3}-2|$。先判断：$\\sqrt{3}\\approx 1.732<2$，所以 $\\sqrt{3}-2<0$，括号内为负，变号得 $2-\\sqrt{3}$。注意结果一定是正数，可以用估算检验。',
        enter: function (anim) {
          clearAll();
          S.actor(keep('s3-f0'), 0, 6.0, '练习：$|\\sqrt{3}-2|$', { size: 22, bold: true, color: PURPLE });

          var rows = [
            ['s3-f1', '因为 $\\sqrt{3}\\approx 1.732 < 2$', BLUE, 20],
            ['s3-f2', '所以 $\\sqrt{3}-2 < 0$', RED, 20],
            ['s3-f3', '$|\\sqrt{3}-2|=-(\\sqrt{3}-2)$', PURPLE, 22],
            ['s3-f4', '$=2-\\sqrt{3}$', GREEN, 30],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 3.8 - i * 2.0, r[1], { size: r[2], color: r[3], bold: i === 3 });
              return anim ? delay(600) : null;
            });
          });
          return p.then(function () {
            P.renderCard(
              '绝对值化简总结：<br>' +
              '$|1-\\sqrt{2}|=\\sqrt{2}-1$（因 $1<\\sqrt{2}$）<br>' +
              '$|\\sqrt{3}-2|=2-\\sqrt{3}$（因 $\\sqrt{3}<2$）<br><br>' +
              '<b>结果必须 ≥ 0，可用数值估算验证。</b>',
              'cool'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
