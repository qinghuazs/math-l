(function (CW) {
  'use strict';
  // s2 二元一次方程的定义与判别
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  // 判别题目数据：题目、是否是二元一次方程、原因
  var JUDGES = [
    { expr: '$x + y = 7$',          ok: true,  reason: '两个未知数，次数均为1，整式方程 ✓' },
    { expr: '$xy = 3$',             ok: false, reason: '含 $xy$ 项，次数为2，不是一次 ✗' },
    { expr: '$x^2 + y = 1$',        ok: false, reason: '含 $x^2$，次数为2，不是一次 ✗' },
    { expr: '$x + \\dfrac{1}{y} = 2$', ok: false, reason: '含分式，不是整式方程 ✗' },
  ];

  var scene = {
    id: 's2',
    title: '二、二元一次方程的定义',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '刚才出现的 x + y = 10 和 2x + y = 16，都含有两个未知数，并且未知数的次数都是1。像这样的方程，就叫作二元一次方程。我们来看它的完整定义。',
        enter: function (anim) {
          // 标题
          S.actor('s2-title', 0, 6.8, '二元一次方程', { color: BLUE, size: 24, bold: true });

          // 定义框
          S.addPolygon('s2-def-bg', [
            [-9.5, 5.8], [9.5, 5.8], [9.5, 2.2], [-9.5, 2.2],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2.5, strokeColor: BLUE });

          S.actor('s2-def-text', 0, 4.8,
            '含有两个未知数，含未知数的项的次数',
            { color: INK, size: 16 });
          S.actor('s2-def-text2', 0, 3.8,
            '都是 1 的整式方程',
            { color: INK, size: 16 });
          S.actor('s2-def-name', 0, 2.8,
            '叫作二元一次方程',
            { color: BLUE, size: 18, bold: true });

          // 一般形式
          S.actor('s2-form-label', 0, 1.4, '一般形式：', { color: INK, size: 15 });
          S.actor('s2-form-eq', 0, 0.4, '$ax + by = c$  （$a$、$b$ 不同时为零）', {
            color: BLUE, size: 17,
          });

          // 三要素标注
          S.actor('s2-k1', -6, -1.2, '① 两个未知数', { color: ORANGE, size: 15, bold: true });
          S.actor('s2-k2', 0, -1.2, '② 次数都是 1', { color: ORANGE, size: 15, bold: true });
          S.actor('s2-k3', 6, -1.2, '③ 整式方程', { color: ORANGE, size: 15, bold: true });

          P.renderCard(
            '<b>二元一次方程</b>三要素：<br>' +
            '① 含<b>两个</b>未知数<br>' +
            '② 含未知数的项次数都是 <b>1</b><br>' +
            '③ 是<b>整式</b>方程（分母不含未知数）'
          );
        },
      },
      {
        narration: '来判断一下！下面4个方程，哪些是二元一次方程，哪些不是？先想一想，然后我们一一揭示答案。',
        enter: function (anim) {
          // 四道判断题
          var i, item;
          for (i = 0; i < JUDGES.length; i++) {
            item = JUDGES[i];
            S.actor('s2-j' + i + '-expr', 0, 4.5 - i * 2.8,
              item.expr,
              { color: INK, size: 18 });
          }
          P.renderCard('判断这4个方程是否为二元一次方程——逐一检查三要素。');
        },
      },
      {
        narration: '现在揭示答案！x+y=7 是二元一次方程；xy=3 含xy次数为2，不是；x的平方加y，含二次项，不是；x加1/y，分母含未知数，是分式方程，不是。判断时始终记住三个要素！',
        enter: function (anim) {
          // 四道题的结论逐个显示
          var i, item, color;
          for (i = 0; i < JUDGES.length; i++) {
            item = JUDGES[i];
            color = item.ok ? GREEN : RED;
            S.actor('s2-j' + i + '-mark', -8.5, 4.5 - i * 2.8,
              item.ok ? '✓' : '✗',
              { color: color, size: 20, bold: true });
            S.actor('s2-j' + i + '-reason', 3, 4.5 - i * 2.8,
              item.reason,
              { color: color, size: 13 });
          }
          P.renderCard(
            '<span style="color:' + GREEN + '">✓ 是：$x+y=7$</span><br>' +
            '<span style="color:' + RED + '">✗ 否：$xy=3$（次数为2）</span><br>' +
            '<span style="color:' + RED + '">✗ 否：$x^2+y=1$（含二次项）</span><br>' +
            '<span style="color:' + RED + '">✗ 否：$x+\\dfrac{1}{y}=2$（分式方程）</span>',
            'cool',
            'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
