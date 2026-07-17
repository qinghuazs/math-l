// s4-contrast.js  四、(-2)^2 与 -2^2 大辨析（3步）
// 数学验算：
//   (-2)^2 = (-2)×(-2) = 4   底数=-2
//   -2^2 = -(2×2) = -4       底数=2（负号是外面的相反数符号）
//   (2/3)^2 = 4/9             底数=2/3
//   2^2/3 = 4/3               底数=2，分母3不参与乘方
//   (-3)^2=9 ✓  -3^2=-9 ✓  (-2)^2=4（≠-4）  -2^2=-4（≠4）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、(-2)^2 与 -2^2 大辨析',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：两式并排 + 对比表（底数辨析）
      {
        narration: '今天的大辨析来了！(-2) 的平方，和 负2 的平方，这两个式子看起来差不多，但有没有觉得哪里不一样？关键在于——括号！括号决定了底数的范围，我们来仔细对比。',
        enter: function (anim) {
          S.actor('s4-vs-title', 0, 7.2, '<b>大辨析：括号决定底数！</b>', { color: WARM, size: 21 });
          S.actor('s4-lhs', -4, 5.5, '$(-2)^{2}$', { color: COOL, size: 32 });
          S.actor('s4-vs', 0, 5.5, '与', { color: INK, size: 22 });
          S.actor('s4-rhs', 4, 5.5, '$-2^{2}$', { color: RED, size: 32 });

          P.renderTable({
            head: ['式子', '底数', '展开', '结果'],
            rows: [
              [
                '$(-2)^{2}$',
                '<span style="color:' + COOL + ';font-weight:bold">$-2$</span>',
                '$(-2)\\times(-2)$',
                '<span style="color:' + COOL + ';font-weight:bold">$4$</span>'
              ],
              [
                '$-2^{2}$',
                '<span style="color:' + RED + ';font-weight:bold">$2$</span>',
                '$-(2\\times 2)$',
                '<span style="color:' + RED + ';font-weight:bold">$-4$</span>'
              ]
            ],
            popRow: false
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：展开计算对比 + 结论标注
      {
        narration: '看清楚了！(-2) 的平方，括号里整个 负2 是底数，做两次方，负负得正，结果是 4。-2 的平方，底数只有 2，负号是外面的"相反数"符号，先算 2 的平方等于 4，再取相反数，结果是 负4。两个式子相差一个符号，结果截然不同！',
        enter: function (anim) {
          S.remove('s4-vs-title'); S.remove('s4-lhs'); S.remove('s4-vs'); S.remove('s4-rhs');

          S.actor('s4-col1-title', -5, 7.2, '$(-2)^{2}$', { color: COOL, size: 26 });
          S.actor('s4-col1-step1', -5, 5.5, '底数 $= -2$（整体）', { color: COOL, size: 16 });
          S.actor('s4-col1-step2', -5, 4.0, '$= (-2) \\times (-2)$', { color: COOL, size: 16 });
          S.actor('s4-col1-step3', -5, 2.5, '负 $\\times$ 负 $=$ 正', { color: COOL, size: 16 });
          S.actor('s4-col1-ans', -5, 1.0, '$= \\mathbf{4}$', { color: GREEN, size: 24 });

          S.addSegment('s4-divline', [0, 7.5], [0, -2], { color: GRAY, width: 2, dash: 1 });

          S.actor('s4-col2-title', 5, 7.2, '$-2^{2}$', { color: RED, size: 26 });
          S.actor('s4-col2-step1', 5, 5.5, '底数 $= 2$（$-$ 在外面）', { color: RED, size: 16 });
          S.actor('s4-col2-step2', 5, 4.0, '$= -(2 \\times 2)$', { color: RED, size: 16 });
          S.actor('s4-col2-step3', 5, 2.5, '先算平方，再取反', { color: RED, size: 16 });
          S.actor('s4-col2-ans', 5, 1.0, '$= \\mathbf{-4}$', { color: RED, size: 24 });

          S.actor('s4-concl', 0, -1.5,
            '结论：$(-2)^{2} \\neq -2^{2}$　括号 = 底数边界！',
            { color: WARM, size: 17 });

          P.renderCard(
            '<b>展开计算对比</b><br>' +
            '$(-2)^{2}$：底数 $-2$，$(-2)\\times(-2)=\\mathbf{4}$（正）<br>' +
            '$-2^{2}$：底数 $2$，$-(2\\times2)=\\mathbf{-4}$（负）<br>' +
            '<b>括号决定底数范围——差一个括号，结果反号！</b>',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：分数底数 + 举牌判断四连
      {
        narration: '分数底数也是同样的道理。三分之二的平方，底数是整个 三分之二，结果是 九分之四。而 2 的平方除以 3，底数只是 2，结果是 三分之四。现在来做四道举牌题，逐一判断对错！',
        enter: function (anim) {
          S.remove('s4-col1-title'); S.remove('s4-col1-step1'); S.remove('s4-col1-step2');
          S.remove('s4-col1-step3'); S.remove('s4-col1-ans');
          S.remove('s4-divline');
          S.remove('s4-col2-title'); S.remove('s4-col2-step1'); S.remove('s4-col2-step2');
          S.remove('s4-col2-step3'); S.remove('s4-col2-ans');
          S.remove('s4-concl');

          // 分数例
          S.actor('s4-frac-title', 0, 7.2, '<b>分数底数辨析</b>', { color: TEAL, size: 19 });
          S.actor('s4-frac1', -4, 5.8,
            '$\\left(\\dfrac{2}{3}\\right)^{2} = \\dfrac{4}{9}$',
            { color: COOL, size: 18 });
          S.actor('s4-frac1-note', -4, 4.5, '底数 $= \\dfrac{2}{3}$', { color: COOL, size: 14 });
          S.actor('s4-frac2', 4, 5.8,
            '$\\dfrac{2^{2}}{3} = \\dfrac{4}{3}$',
            { color: RED, size: 18 });
          S.actor('s4-frac2-note', 4, 4.5, '底数 $= 2$（分母不参与）', { color: RED, size: 14 });

          // 举牌四题
          S.actor('s4-jp-title', 0, 3.2, '<b>举牌判断</b>', { color: WARM, size: 18 });

          var judgeData = [
            { x: -6, y: 1.8, expr: '$(-3)^{2}=9$',  correct: true },
            { x: -2, y: 1.8, expr: '$-3^{2}=-9$',   correct: true },
            { x:  2, y: 1.8, expr: '$(-2)^{2}=-4$', correct: false },
            { x:  6, y: 1.8, expr: '$-2^{2}=4$',    correct: false }
          ];

          for (var i = 0; i < judgeData.length; i++) {
            var d = judgeData[i];
            var mark = d.correct ? '✓' : '✗';
            var col  = d.correct ? GREEN : RED;
            S.actor('s4-jp-' + i + '-q', d.x, d.y, d.expr, { color: INK, size: 14 });
            S.actor('s4-jp-' + i + '-a', d.x, 0.5,
              '<b style="color:' + col + '">' + mark + '</b>',
              { color: col, size: 20 });
          }

          S.actor('s4-jp-exp1', -6, -0.9, '✓ 底数$-3$，偶次幂正', { color: GREEN, size: 12 });
          S.actor('s4-jp-exp2', -2, -0.9, '✓ 底数$2$，取反', { color: GREEN, size: 12 });
          S.actor('s4-jp-exp3',  2, -0.9, '✗ 底数$-2$，应为$4$', { color: RED, size: 12 });
          S.actor('s4-jp-exp4',  6, -0.9, '✗ 底数$2$，应为$-4$', { color: RED, size: 12 });

          P.renderCard(
            '<b>举牌四连答案</b><br>' +
            '$(-3)^{2}=9$ ✓（底数 $-3$，偶次正）<br>' +
            '$-3^{2}=-9$ ✓（底数 $3$，取反负）<br>' +
            '$(-2)^{2}=-4$ ✗（应为 $+4$）<br>' +
            '$-2^{2}=4$ ✗（应为 $-4$）',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
