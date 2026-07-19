// s4-scores.js  环节四：球赛积分——建立新情境模型（3步）
// 数学验算：胜积2分，负积1分；设胜x场，负(22-x)场
// 方程：2x + 1×(22-x) = 40 → 2x+22-x=40 → x=18；验算：2×18+4=40 ✓，18+4=22 ✓
// 边界感：全胜22场=44分；全负22场=22分；40在22~44之间，x应在0~22之间
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、球赛积分',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：情境引入与边界感
      {
        narration: '我们换一个场景。足球联赛，某队参加联赛共赛了 22 场，胜一场积 2 分，负一场积 1 分，共积 40 分。问该队胜了几场？先建立边界感：如果 22 场全胜，积分是 22 乘以 2 等于 44 分；如果 22 场全负，积分是 22 乘以 1 等于 22 分。实际积 40 分，夹在 22 到 44 之间，所以胜场数应该在 0 到 22 场之间。',
        enter: function (anim) {
          S.actor('s4-title', 0, 6.8, '球赛积分问题', { color: TEAL, size: 22, bold: true });
          S.actor('s4-cond', 0, 5.4,
            '共赛 22 场，胜积 2 分，负积 1 分，共积 40 分',
            { color: INK, size: 16 });

          var rows = [
            ['s4-r1', 0, 3.8, '全胜 22 场：$2 \\times 22 = 44$ 分', WARM],
            ['s4-r2', 0, 2.6, '全负 22 场：$1 \\times 22 = 22$ 分', COOL],
            ['s4-r3', 0, 1.2, '实际积 40 分，介于 22 ~ 44 之间', TEAL],
          ];

          var p = Promise.resolve();
          rows.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: 16 });
              return anim ? delay(400) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.actor('s4-range', 0, -0.2,
              '胜场数 $x$ 应满足：$0 \\leq x \\leq 22$',
              { color: ORANGE, size: 17, bold: true });
            P.renderCard(
              '<b>球赛积分问题</b><br>' +
              '共赛 22 场，胜积 2 分，负积 1 分，共积 40 分。<br>' +
              '全胜得 44 分，全负得 22 分，实际 40 分在中间。<br>' +
              '设胜 $x$ 场，$x$ 应在 $0 \\sim 22$ 之间。'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 2：积分表格逐行浮现，展示设元策略
      {
        narration: '设胜了 x 场，那负了多少场？总共才 22 场，胜了 x 场，负的就是 22 减 x 场。我们列个积分表：胜了 x 场，每场积 2 分，小计是 2x；负了 22 减 x 场，每场积 1 分，小计是 22 减 x；合计等于 40 分。注意：负场系数"1"要显式写出，这是书写规范！',
        enter: function (anim) {
          S.remove('s4-title'); S.remove('s4-cond');
          S.remove('s4-r1'); S.remove('s4-r2'); S.remove('s4-r3'); S.remove('s4-range');

          S.actor('s4-t2-title', 0, 6.8, '积分表（设元策略）', { color: TEAL, size: 20, bold: true });

          var tableRows = [
            ['s4-tr-head', ['结果', '场次', '每场积分', '小计'], TEAL],
            ['s4-tr-win',  ['胜', '$x$', '2', '$2x$'], WARM],
            ['s4-tr-lose', ['负', '$22-x$', '1（显式！）', '$22-x$'], COOL],
            ['s4-tr-sum',  ['合计', '22', '—', '40'], INK],
          ];

          var ypos = [5.5, 4.2, 2.9, 1.5];
          var xpos = [-6, -2, 2, 6];

          var p = Promise.resolve();
          tableRows.forEach(function (row, ri) {
            p = p.then(function () {
              row[1].forEach(function (cell, ci) {
                S.actor(row[0] + '-c' + ci, xpos[ci], ypos[ri], cell,
                  { color: row[2], size: 16, bold: ri === 0 });
              });
              return anim ? delay(400) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.addSegment('s4-hline1', [-8.5, 5.0], [8.5, 5.0], { color: GRAY, width: 1, dash: 0 });
            S.addSegment('s4-hline2', [-8.5, 2.2], [8.5, 2.2], { color: GRAY, width: 1, dash: 0 });
            P.renderCard(
              '<b>设元策略</b><br>' +
              '设胜 $x$ 场，则负 $22-x$ 场。<br>' +
              '胜场小计：$2x$；负场小计：$1 \\times (22-x)$<br>' +
              '注意：负场系数 <b>1</b> 要显式写出！'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 3：列方程
      {
        narration: '根据积分表，列方程：胜场积分加负场积分等于总积分，就是 2x 加 1 乘以（22 减 x）等于 40。这里特别强调：负场系数"1"不能省略——写成 1 乘以（22 减 x）是规范写法。现在方程已经列好，下一节我们来求解！',
        enter: function (anim) {
          S.remove('s4-t2-title');
          S.remove('s4-tr-head-c0'); S.remove('s4-tr-head-c1'); S.remove('s4-tr-head-c2'); S.remove('s4-tr-head-c3');
          S.remove('s4-tr-win-c0');  S.remove('s4-tr-win-c1');  S.remove('s4-tr-win-c2');  S.remove('s4-tr-win-c3');
          S.remove('s4-tr-lose-c0'); S.remove('s4-tr-lose-c1'); S.remove('s4-tr-lose-c2'); S.remove('s4-tr-lose-c3');
          S.remove('s4-tr-sum-c0');  S.remove('s4-tr-sum-c1');  S.remove('s4-tr-sum-c2');  S.remove('s4-tr-sum-c3');
          S.remove('s4-hline1'); S.remove('s4-hline2');

          S.actor('s4-eq-label', 0, 6.0, '列方程', { color: TEAL, size: 20, bold: true });
          S.actor('s4-eq-word', 0, 4.6,
            '胜场积分 + 负场积分 = 总积分',
            { color: INK, size: 17 });
          S.actor('s4-eq-main', 0, 3.0,
            '$2x + 1 \\times (22 - x) = 40$',
            { color: WARM, size: 24, bold: true });
          S.actor('s4-eq-note', 0, 1.4,
            '负场系数"1"要显式写出！',
            { color: COOL, size: 16 });

          S.actor('s4-eq-stress', 0, -0.2,
            '等量关系：胜场积分 + 负场积分 = 总积分 = 40',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>方程</b>：$2x + 1 \\times (22-x) = 40$<br>' +
            '其中 $x$ = 胜场数，$22-x$ = 负场数。<br>' +
            '负场系数 <b>1</b> 不可省略——书写规范！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
