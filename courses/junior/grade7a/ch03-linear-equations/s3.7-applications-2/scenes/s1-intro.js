// s1-intro.js  环节一：赚了还是亏了？——情境投票与直觉挑战（3步）
// 数学验算：两件衣服各卖60元，盈利件1.25x=60→x=48，亏损件0.75y=60→y=80
// 总进价48+80=128 > 总售价120，亏8元（直觉"不赚不亏"是错的）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、赚了还是亏了？',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：情境呈现——两件衣服各卖60元
      {
        narration: '今天我们来看一道经典的生活题。某商贩卖出两件衣服，每件都卖了 60 元。其中一件盈利了 25%，另一件亏损了 25%。这两件衣服卖出去，商贩总体上是赚了、还是亏了？',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '销售盈亏问题', { color: INK, size: 22, bold: true });

          S.actor('s1-c1-label', -4.5, 4.5, '第一件衣服', { color: WARM, size: 18, bold: true });
          S.actor('s1-c1-price', -4.5, 3.2, '售价：60 元', { color: INK, size: 17 });
          S.actor('s1-c1-rate',  -4.5, 2.0, '盈利 25%', { color: WARM, size: 17, bold: true });

          S.actor('s1-c2-label', 4.5, 4.5, '第二件衣服', { color: COOL, size: 18, bold: true });
          S.actor('s1-c2-price', 4.5, 3.2, '售价：60 元', { color: INK, size: 17 });
          S.actor('s1-c2-rate',  4.5, 2.0, '亏损 25%', { color: COOL, size: 17, bold: true });

          S.addSegment('s1-div', [0, 5.5], [0, 0.5], { color: GRAY, width: 2, dash: 2 });

          P.renderCard(
            '<b>销售盈亏问题</b><br>' +
            '两件衣服各卖 <b>60 元</b>，一件盈利 25%，一件亏损 25%。<br>' +
            '总体上，这笔生意是赚了还是亏了？'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：全班直觉投票
      {
        narration: '同学们，先别急着算，凭直觉来投个票！A——总体盈利；B——总体亏损；C——不赚不亏。举手！—— 没错，大多数同学猜的是 C，不赚不亏。毕竟一个赚 25%、一个亏 25%，感觉正好抵消了！到底是不是这样？我们用方程来验证直觉！',
        enter: function (anim) {
          S.actor('s1-vote-title', 0, 0.2, '投票结果', { color: TEAL, size: 18, bold: true });
          S.actor('s1-vote-a', -6, -1.2, 'A. 盈利', { color: GREEN, size: 16 });
          S.actor('s1-vote-b', 0,  -1.2, 'B. 亏损', { color: WARM,  size: 16 });
          S.actor('s1-vote-c', 6,  -1.2, 'C. 不赚不亏', { color: COOL, size: 16 });

          S.actor('s1-majority', 0, -2.8,
            '多数同学猜：C——不赚不亏',
            { color: COOL, size: 18, bold: true });

          S.actor('s1-reason', 0, -4.2,
            '"一赚 25%、一亏 25%，正好抵消"',
            { color: GRAY, size: 15 });

          P.renderCard(
            '<b>直觉 vs 数学</b><br>' +
            '多数人的直觉：一赚一亏，"正好抵消"，不赚不亏。<br>' +
            '直觉对吗？我们用方程来验证！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：引出方程框架，暗示"用方程来验证"
      {
        narration: '验证直觉的方法就是列方程——分别算出两件衣服的进价，再比较总进价和总售价。关键等量关系是：售价等于进价乘以（1加减盈亏率）。下面我们来逐件计算！',
        enter: function (anim) {
          S.actor('s1-eq-title', 0, -5.6, '等量关系', { color: TEAL, size: 17, bold: true });
          S.actor('s1-eq1', -3.5, -6.5,
            '盈利件：进价 $\\times$ (1+25%) = 60',
            { color: WARM, size: 15 });
          S.actor('s1-eq2', 3.5, -6.5,
            '亏损件：进价 $\\times$ (1$-$25%) = 60',
            { color: COOL, size: 15 });

          P.renderCard(
            '<b>解题思路</b><br>' +
            '分别设两件衣服的进价为 $x$ 元和 $y$ 元，<br>' +
            '利用：售价 = 进价 $\\times$ (1 $\\pm$ 盈亏率) 列方程求解。',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
