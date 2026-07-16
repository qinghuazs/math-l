(function (CW) {
  'use strict';
  // s4 辨析练习：判断是否是二元一次方程组；给解验证方程组
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's4',
    title: '四、辨析练习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '下面我们来做几个辨析题。判断下列各组方程是否是二元一次方程组，说明理由。',
        enter: function (anim) {
          S.actor('s4-title', 0, 6.8, '判断：哪些是二元一次方程组？', {
            color: BLUE, size: 21, bold: true,
          });

          // 4 个候选（2列2行）
          var items = [
            { id: 'A', x: -5.5, y:  4.5, text: '$\\begin{cases}x+y=5\\\\2x-y=4\\end{cases}$',     color: BLUE },
            { id: 'B', x:  4.5, y:  4.5, text: '$\\begin{cases}x+z=2\\\\x+y=3\\end{cases}$',      color: ORANGE },
            { id: 'C', x: -5.5, y: -0.5, text: '$\\begin{cases}x^2+y=1\\\\x-y=0\\end{cases}$',   color: ORANGE },
            { id: 'D', x:  4.5, y: -0.5, text: '$\\begin{cases}x+y=6\\\\3x-y=2\\end{cases}$',    color: BLUE },
          ];

          var i, item;
          for (i = 0; i < items.length; i++) {
            item = items[i];
            S.addPolygon('s4-box-' + item.id, [
              [item.x - 4.0, item.y + 2.3],
              [item.x + 4.0, item.y + 2.3],
              [item.x + 4.0, item.y - 2.0],
              [item.x - 4.0, item.y - 2.0],
            ], { color: item.color, opacity: 0.07, borderWidth: 2, strokeColor: item.color });
            S.actor('s4-id-' + item.id, item.x, item.y + 1.8, '(' + item.id + ')', {
              color: item.color, size: 15, bold: true,
            });
            S.actor('s4-eq-' + item.id, item.x, item.y + 0.2, item.text, {
              color: INK, size: 16,
            });
          }

          P.renderCard(
            '判断标准：<br>' +
            '① 含 <b>2</b> 个未知数<br>' +
            '② 每个方程中未知数最高次数为 <b>1</b><br>' +
            '③ 由 <b>两个</b> 方程联立'
          );
        },
      },
      {
        narration: '（A）x+y=5 与 2x-y=4：含 x、y 两个未知数，每个方程都是一次方程——是二元一次方程组！（D）x+y=6 与 3x-y=2：同理——也是二元一次方程组！（B）含有 x、y、z 三个未知数——不是！（C）x²+y=1 含二次项——也不是！',
        enter: function (anim) {
          var items = [
            { id: 'A', x: -5.5, y:  4.5, text: '$\\begin{cases}x+y=5\\\\2x-y=4\\end{cases}$',     color: BLUE },
            { id: 'B', x:  4.5, y:  4.5, text: '$\\begin{cases}x+z=2\\\\x+y=3\\end{cases}$',      color: ORANGE },
            { id: 'C', x: -5.5, y: -0.5, text: '$\\begin{cases}x^2+y=1\\\\x-y=0\\end{cases}$',   color: ORANGE },
            { id: 'D', x:  4.5, y: -0.5, text: '$\\begin{cases}x+y=6\\\\3x-y=2\\end{cases}$',    color: BLUE },
          ];
          var i, item;
          for (i = 0; i < items.length; i++) {
            item = items[i];
            S.addPolygon('s4-box-' + item.id, [
              [item.x - 4.0, item.y + 2.3],
              [item.x + 4.0, item.y + 2.3],
              [item.x + 4.0, item.y - 2.0],
              [item.x - 4.0, item.y - 2.0],
            ], { color: item.color, opacity: 0.07, borderWidth: 2, strokeColor: item.color });
            S.actor('s4-id-' + item.id, item.x, item.y + 1.8, '(' + item.id + ')', {
              color: item.color, size: 15, bold: true,
            });
            S.actor('s4-eq-' + item.id, item.x, item.y + 0.2, item.text, {
              color: INK, size: 16,
            });
          }

          // 判断结论标注
          S.actor('s4-ans-A', -5.5, 1.9, '✓ 是', { color: GREEN, size: 18, bold: true });
          S.actor('s4-ans-D',  4.5, 1.9, '✓ 是', { color: GREEN, size: 18, bold: true });
          S.actor('s4-ans-B',  4.5, -3.0, '✗ 三个未知数', { color: RED, size: 15, bold: true });
          S.actor('s4-ans-C', -5.5, -3.0, '✗ 含 $x^2$（二次）', { color: RED, size: 15, bold: true });

          P.renderCard(
            '✓ (A)(D) 是二元一次方程组<br>' +
            '✗ (B) 含 3 个未知数（$x,y,z$），不是<br>' +
            '✗ (C) 含 $x^2$（二次项），不是',
            'cool'
          );
        },
      },
      {
        narration: '再来一个练习：验证 x=3，y=2 是否是方程组 x+y=5 与 2x-y=4 的解。代入第一个方程：3+2=5，成立！代入第二个方程：2×3-2=6-2=4，成立！所以 x=3，y=2 是这个方程组的解。',
        enter: function (anim) {
          S.actor('s4-v-title', 0, 6.8, '验证：$x=3,\\,y=2$ 是否为方程组的解？', {
            color: BLUE, size: 19, bold: true,
          });

          S.addPolygon('s4-v-sys-bg', [
            [-9.5, 5.6], [-1.0, 5.6], [-1.0, 3.2], [-9.5, 3.2],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s4-v-brace', -8.8, 4.4, '{', { color: INK, size: 36 });
          S.actor('s4-v-eq1', -4.7, 4.8, '$x + y = 5$  ···①', { color: BLUE, size: 16, bold: true });
          S.actor('s4-v-eq2', -4.7, 3.7, '$2x - y = 4$  ···②', { color: ORANGE, size: 16, bold: true });

          // 代入过程
          S.addPolygon('s4-v-proc-bg', [
            [-9.5, 2.6], [9.5, 2.6], [9.5, -1.5], [-9.5, -1.5],
          ], { color: INK, opacity: 0.05, borderWidth: 1.5, strokeColor: INK });

          S.actor('s4-v-sub', 0, 2.2, '将 $x=3,\\,y=2$ 代入：', { color: INK, size: 16 });
          S.actor('s4-v-proc1', -3.5, 1.2,
            '代入①：$3+2=5$ ✓', { color: BLUE, size: 15 });
          S.actor('s4-v-proc2',  3.5, 1.2,
            '代入②：$2\\times3-2=4$ ✓', { color: ORANGE, size: 15 });

          S.actor('s4-v-ok', 0, 0.0,
            '两个方程都成立！', { color: GREEN, size: 18, bold: true });

          S.actor('s4-v-conclude', 0, -1.0,
            '$\\begin{cases}x=3\\\\y=2\\end{cases}$ 是方程组的解',
            { color: GREEN, size: 17, bold: true });

          P.renderCard(
            '$x=3,\\,y=2$ 代入方程组：<br>' +
            '①：$3+2=5$ ✓<br>' +
            '②：$2\\times3-2=4$ ✓<br>' +
            '两个都成立 → 是方程组的解！',
            'cool', 'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
