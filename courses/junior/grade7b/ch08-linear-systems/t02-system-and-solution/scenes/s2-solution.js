(function (CW) {
  'use strict';
  // s2 方程组的解：试验法逐一检验
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  // 检验表数据：候选解 (x,y)，代入①②是否成立
  // ①: x+y=10，②: 2x+y=16
  // (4,6): ①4+6=10 ✓ ②2*4+6=14≠16 ✗
  // (6,4): ①6+4=10 ✓ ②2*6+4=16 ✓
  // (5,5): ①5+5=10 ✓ ②2*5+5=15≠16 ✗
  var HEAD = ['候选解', '代入① $x+y=10$', '代入② $2x+y=16$', '是否为方程组的解'];

  function makeRows(n) {
    var allRows = [
      ['$x=4,\\,y=6$', '$4+6=10$ ✓', '$2\\times4+6=14\\neq16$ ✗', '✗ 不是'],
      ['$x=6,\\,y=4$', '$6+4=10$ ✓', '$2\\times6+4=16$ ✓',        '✓ 是！'],
      ['$x=5,\\,y=5$', '$5+5=10$ ✓', '$2\\times5+5=15\\neq16$ ✗', '✗ 不是'],
    ];
    return allRows.slice(0, n);
  }

  var scene = {
    id: 's2',
    title: '二、方程组的解：试验检验',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '什么叫做方程组的解？同时满足方程组中每一个方程的一组未知数的值，就叫作这个方程组的解。下面我们用试验法来找方程组的解——逐一检验候选解是否两个方程都满足。',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.8, '方程组的解：同时满足所有方程', {
            color: BLUE, size: 21, bold: true,
          });

          // 方程组展示
          S.addPolygon('s2-sys-bg', [
            [-9.5, 5.5], [-1.5, 5.5], [-1.5, 3.2], [-9.5, 3.2],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-sys-label', -5.5, 5.1, '方程组', { color: BLUE, size: 14, bold: true });
          S.actor('s2-sys-brace', -8.8, 4.2, '{', { color: INK, size: 36 });
          S.actor('s2-sys-eq1', -5.0, 4.6, '$x + y = 10$  ···①', { color: BLUE, size: 16, bold: true });
          S.actor('s2-sys-eq2', -5.0, 3.6, '$2x + y = 16$  ···②', { color: ORANGE, size: 16, bold: true });

          // 定义框
          S.addPolygon('s2-def-bg', [
            [1.0, 5.5], [9.5, 5.5], [9.5, 3.0], [1.0, 3.0],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-def-title', 5.25, 5.1, '方程组的解', { color: GREEN, size: 14, bold: true });
          S.actor('s2-def-text', 5.25, 4.3,
            '同时满足方程组中', { color: INK, size: 14 });
          S.actor('s2-def-text2', 5.25, 3.5,
            '每个方程的一组值', { color: INK, size: 14 });

          // 候选解列表
          S.actor('s2-try-label', 0, 1.8, '试验：哪一组才是方程组的解？', {
            color: INK, size: 16, bold: true,
          });
          S.actor('s2-cand1', -5.0, 0.6, '候选一：$x=4,\\,y=6$', { color: GRAY, size: 15 });
          S.actor('s2-cand2',  0.0, 0.6, '候选二：$x=6,\\,y=4$', { color: GRAY, size: 15 });
          S.actor('s2-cand3',  5.5, 0.6, '候选三：$x=5,\\,y=5$', { color: GRAY, size: 15 });

          P.renderCard(
            '<b>检验方法</b>：把一对数分别代入方程组的每一个方程。<br>' +
            '两个方程<b>都成立</b>才是方程组的解；有一个不成立就不是。'
          );
        },
      },
      {
        narration: '先检验候选一：x=4，y=6。代入方程①：4+6=10，成立！再代入方程②：2×4+6=8+6=14，14≠16，不成立！所以 x=4，y=6 不是方程组的解。',
        enter: function (anim) {
          P.renderTable({ head: HEAD, rows: makeRows(1) });
          P.renderCard('$x=4,\\,y=6$：满足①，但不满足②——<b>不是</b>方程组的解。', 'warm', 'headShake');
        },
      },
      {
        narration: '再检验候选二：x=6，y=4。代入方程①：6+4=10，成立！代入方程②：2×6+4=12+4=16，成立！两个方程都满足，所以 x=6，y=4 就是这个方程组的解！',
        enter: function (anim) {
          P.renderTable({ head: HEAD, rows: makeRows(2) });
          P.renderCard(
            '$x=6,\\,y=4$：①②都满足——<b>就是</b>方程组的解！<br>' +
            '$\\begin{cases}x=6\\\\y=4\\end{cases}$',
            'cool', 'tada'
          );
        },
      },
      {
        narration: '最后检验候选三：x=5，y=5。代入方程①：5+5=10，成立！代入方程②：2×5+5=10+5=15，15≠16，不成立！所以 x=5，y=5 也不是方程组的解。方程组的解是唯一的！',
        enter: function (anim) {
          P.renderTable({ head: HEAD, rows: makeRows(3) });
          P.renderCard(
            '$x=5,\\,y=5$：满足①，不满足②——<b>不是</b>。<br>' +
            '结论：这个方程组<b>只有唯一解</b>：$\\begin{cases}x=6\\\\y=4\\end{cases}$',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
