// s2-solve.js  环节二：逐件算进价——分步建模求解（4步）
// 数学验算：
//   盈利件：x(1+25%)=60 → 1.25x=60 → x=60÷1.25=48（元）；验算：48×1.25=60 ✓
//   亏损件：y(1-25%)=60 → 0.75y=60 → y=60÷0.75=80（元）；验算：80×0.75=60 ✓
//   两件进价：48 ≠ 80，差距悬殊——基数不同！
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、逐件算进价',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：盈利件方程推导
      {
        narration: '先算第一件——盈利件。设盈利件的进价为 x 元。等量关系是：进价乘以（1加 25%）等于售价 60 元。写成方程就是 x 乘以 1.25 等于 60。两边除以 1.25，得 x 等于 48 元。盈利件的进价是 48 元！',
        enter: function (anim) {
          S.actor('s2-t1', -4, 6.8, '第一件（盈利件）', { color: WARM, size: 18, bold: true });
          S.actor('s2-eq1-r', -4, 5.4, '售价 = 进价 $\\times$ (1 + 盈利率)', { color: INK, size: 15 });

          var steps1 = [
            ['s2-eq1a', -4, 4.0, '设进价 $x$ 元', TEAL],
            ['s2-eq1b', -4, 2.8, '$x(1+25\\%) = 60$', INK],
            ['s2-eq1c', -4, 1.6, '$1.25x = 60$', WARM],
            ['s2-eq1d', -4, 0.4, '$x = 60 \\div 1.25 = 48$', WARM],
          ];

          var p = Promise.resolve();
          steps1.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[3], size: 17, bold: it[3] === WARM });
              return anim ? delay(500) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.actor('s2-ans1', -4, -1.0,
              '盈利件进价：48 元',
              { color: WARM, size: 20, bold: true });
            P.renderCard(
              '<b>盈利件求解</b><br>' +
              '设进价 $x$ 元，售价 60 元，盈利 25%：<br>' +
              '$x(1+25\\%) = 60$<br>' +
              '$1.25x = 60$<br>' +
              '$x = \\mathbf{48}$ 元'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 2：亏损件方程推导
      {
        narration: '再算第二件——亏损件。设亏损件的进价为 y 元。等量关系是：进价乘以（1减 25%）等于售价 60 元。方程是 y 乘以 0.75 等于 60。两边除以 0.75，得 y 等于 80 元。亏损件的进价是 80 元！',
        enter: function (anim) {
          S.actor('s2-t2', 4, 6.8, '第二件（亏损件）', { color: COOL, size: 18, bold: true });
          S.actor('s2-eq2-r', 4, 5.4, '售价 = 进价 $\\times$ (1 $-$ 亏损率)', { color: INK, size: 15 });

          var steps2 = [
            ['s2-eq2a', 4, 4.0, '设进价 $y$ 元', TEAL],
            ['s2-eq2b', 4, 2.8, '$y(1-25\\%) = 60$', INK],
            ['s2-eq2c', 4, 1.6, '$0.75y = 60$', COOL],
            ['s2-eq2d', 4, 0.4, '$y = 60 \\div 0.75 = 80$', COOL],
          ];

          var p = Promise.resolve();
          steps2.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[3], size: 17, bold: it[3] === COOL });
              return anim ? delay(500) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.actor('s2-ans2', 4, -1.0,
              '亏损件进价：80 元',
              { color: COOL, size: 20, bold: true });
            P.renderCard(
              '<b>亏损件求解</b><br>' +
              '设进价 $y$ 元，售价 60 元，亏损 25%：<br>' +
              '$y(1-25\\%) = 60$<br>' +
              '$0.75y = 60$<br>' +
              '$y = \\mathbf{80}$ 元'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 3：两件进价对比——核心追问"为什么差这么多"
      {
        narration: '同学们，现在我们看到了！盈利件进价 48 元，亏损件进价 80 元——同样是卖 60 元，同样是 25%，进价却差了整整 32 元！为什么？因为两个 25% 的基数不一样——一个是 48，一个是 80，不能直接比较！',
        enter: function (anim) {
          S.remove('s2-t1'); S.remove('s2-eq1-r');
          S.remove('s2-eq1a'); S.remove('s2-eq1b'); S.remove('s2-eq1c'); S.remove('s2-eq1d');
          S.remove('s2-ans1');
          S.remove('s2-t2'); S.remove('s2-eq2-r');
          S.remove('s2-eq2a'); S.remove('s2-eq2b'); S.remove('s2-eq2c'); S.remove('s2-eq2d');
          S.remove('s2-ans2');

          S.actor('s2-comp-title', 0, 6.5, '两件进价对比', { color: TEAL, size: 20, bold: true });
          S.actor('s2-comp-1', -4, 4.5, '盈利件进价：48 元', { color: WARM, size: 20, bold: true });
          S.actor('s2-comp-2', 4,  4.5, '亏损件进价：80 元', { color: COOL, size: 20, bold: true });

          S.addSegment('s2-neq-line', [-1.5, 4.5], [1.5, 4.5], { color: GRAY, width: 2, dash: 2 });
          S.actor('s2-neq', 0, 4.5, '$48 \\neq 80$', { color: PURPLE, size: 22, bold: true });

          S.actor('s2-explain', 0, 2.5,
            '两个 25% 的基数不同！',
            { color: WARM, size: 18, bold: true });
          S.actor('s2-explain2', 0, 1.2,
            '基数 48 $\\neq$ 基数 80',
            { color: INK, size: 17 });

          P.renderCard(
            '<b>核心发现</b><br>' +
            '盈利件进价 48 元，亏损件进价 80 元，$48 \\neq 80$！<br>' +
            '同样是 25%，基数不同，绝对金额就不同。<br>' +
            '不能用"一赚一亏正好抵消"来判断！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：对比表固化结论
      {
        narration: '我们用一个表格把两件衣服的信息整理清楚。请同学们对照表格，确认进价和方程都写对了。特别注意：盈利件进价 48 元，亏损件进价 80 元，基数不同，结果天差地别！',
        enter: function (anim) {
          S.remove('s2-comp-title'); S.remove('s2-comp-1'); S.remove('s2-comp-2');
          S.remove('s2-neq-line'); S.remove('s2-neq');
          S.remove('s2-explain'); S.remove('s2-explain2');

          P.renderTable({
            head: ['商品', '售价', '盈亏率', '方程', '进价'],
            rows: [
              ['盈利件', '60 元', '+25%', '$1.25x=60$', '<b>48 元</b>'],
              ['亏损件', '60 元', '$-$25%', '$0.75y=60$', '<b>80 元</b>'],
            ]
          });

          P.renderCard(
            '<b>小结</b>：盈利件进价 <b>48 元</b>，亏损件进价 <b>80 元</b>。<br>' +
            '两件合计总进价 = 48 + 80 = <b>128 元</b>；总售价 = 120 元。',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
