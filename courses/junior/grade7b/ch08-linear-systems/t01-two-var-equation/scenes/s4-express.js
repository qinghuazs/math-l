(function (CW) {
  'use strict';
  // s4 解的表示与检验
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's4',
    title: '四、解的表示与检验',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '既然 x+y=7 有无数组解，我们可以用一个未知数表示另一个。从 x+y=7 移项得 y = 7 - x。这样，只要给 x 一个值，y 就能算出来了！这叫"用含 x 的式子表示 y"。',
        enter: function (anim) {
          // 标题
          S.actor('s4-title', 0, 7.0, '用一个未知数表示另一个', {
            color: BLUE, size: 21, bold: true,
          });

          // 原式
          S.actor('s4-eq-orig', -5, 5.2, '原方程：$x + y = 7$', {
            color: INK, size: 17,
          });

          // 箭头提示
          S.actor('s4-arrow', -5, 4.0, '移项 →', { color: GRAY, size: 16 });

          // 结果
          S.actor('s4-eq-result', -5, 2.8, '$y = 7 - x$', {
            color: BLUE, size: 22, bold: true,
          });

          // 说明
          S.actor('s4-note', 0, 1.4,
            '给 $x$ 取任意值，就得到 $y$ 的对应值',
            { color: INK, size: 15 });

          // 举例：x=3.5 时
          S.addPolygon('s4-eg-bg', [
            [-9.5, 0.5], [9.5, 0.5], [9.5, -1.0], [-9.5, -1.0],
          ], { color: BLUE, opacity: 0.07, borderWidth: 1.5, strokeColor: BLUE });
          S.actor('s4-eg', 0, -0.2,
            '如：$x=3.5$  时  $y = 7-3.5 = 3.5$，解为 $\\begin{cases}x=3.5\\\\y=3.5\\end{cases}$',
            { color: BLUE, size: 15 });

          P.renderCard(
            '由 $x+y=7$ 移项得 $y=7-x$。<br>' +
            '给 $x$ 任意赋值，$y$ 就唯一确定——这就是解的<b>参数表示</b>。'
          );
        },
      },
      {
        narration: '学会了表示解，还要会检验。方法是：把一对数代入方程，看等式是否成立。例如检验 x=3，y=4 是否为 x+y=7 的解：左边 = 3+4 = 7 = 右边，成立，所以是解。再检验 x=2，y=4：左边 = 2+4 = 6 ≠ 7，不成立，不是解。',
        enter: function (anim) {
          // 检验标题
          S.actor('s4-chk-title', 0, 7.0, '检验一对数是否为方程的解', {
            color: ORANGE, size: 19, bold: true,
          });

          // 检验步骤框
          S.addPolygon('s4-chk-bg', [
            [-9.5, 6.0], [9.5, 6.0], [9.5, 4.2], [-9.5, 4.2],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 1.5, strokeColor: ORANGE });
          S.actor('s4-chk-step', 0, 5.5,
            '方法：将 $x$、$y$ 代入方程，计算左边值，看是否等于右边',
            { color: ORANGE, size: 14 });
          S.actor('s4-chk-step2', 0, 4.6,
            '左边 = 右边 → 是解；左边 ≠ 右边 → 不是解',
            { color: ORANGE, size: 14 });

          // 例1：是解
          S.addPolygon('s4-eg1-bg', [
            [-9.5, 3.6], [0, 3.6], [0, 1.2], [-9.5, 1.2],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s4-eg1-cond', -4.75, 3.15,
            '$\\begin{cases}x=3\\\\y=4\\end{cases}$',
            { color: INK, size: 15 });
          S.actor('s4-eg1-calc', -4.75, 2.0,
            '左边 = 3+4 = 7 = 右边  ✓',
            { color: GREEN, size: 14, bold: true });
          S.actor('s4-eg1-ans', -4.75, 1.3, '是解', { color: GREEN, size: 15, bold: true });

          // 例2：不是解
          S.addPolygon('s4-eg2-bg', [
            [0.2, 3.6], [9.5, 3.6], [9.5, 1.2], [0.2, 1.2],
          ], { color: RED, opacity: 0.08, borderWidth: 2, strokeColor: RED });
          S.actor('s4-eg2-cond', 4.85, 3.15,
            '$\\begin{cases}x=2\\\\y=4\\end{cases}$',
            { color: INK, size: 15 });
          S.actor('s4-eg2-calc', 4.85, 2.0,
            '左边 = 2+4 = 6 ≠ 7  ✗',
            { color: RED, size: 14, bold: true });
          S.actor('s4-eg2-ans', 4.85, 1.3, '不是解', { color: RED, size: 15, bold: true });

          P.renderCard(
            '检验方法：代入方程，比较左右两边。<br>' +
            '<span style="color:#2e7d32">$x=3,y=4$：$3+4=7$ ✓ 是解</span><br>' +
            '<span style="color:#c62828">$x=2,y=4$：$2+4=6\\neq7$ ✗ 不是解</span>',
            'cool'
          );
        },
      },
      {
        narration: '特别注意：二元一次方程的解必须同时给出两个未知数的值，用大括号写成联立形式。不能只写 x=3，少了 y=4 就不完整。写解时格式要规范！',
        enter: function (anim) {
          // 格式强调
          S.actor('s4-fmt-title', 0, -1.5, '解的书写格式（重要！）', {
            color: BLUE, size: 18, bold: true,
          });

          // 正确写法
          S.addPolygon('s4-right-bg', [
            [-9.5, -2.4], [0, -2.4], [0, -5.2], [-9.5, -5.2],
          ], { color: GREEN, opacity: 0.09, borderWidth: 2, strokeColor: GREEN });
          S.actor('s4-right-label', -4.75, -2.8, '✓ 正确写法', {
            color: GREEN, size: 15, bold: true,
          });
          S.actor('s4-right-eq', -4.75, -3.9,
            '$\\begin{cases}x=3\\\\y=4\\end{cases}$',
            { color: GREEN, size: 18 });

          // 错误写法
          S.addPolygon('s4-wrong-bg', [
            [0.2, -2.4], [9.5, -2.4], [9.5, -5.2], [0.2, -5.2],
          ], { color: RED, opacity: 0.09, borderWidth: 2, strokeColor: RED });
          S.actor('s4-wrong-label', 4.85, -2.8, '✗ 不完整写法', {
            color: RED, size: 15, bold: true,
          });
          S.actor('s4-wrong-eq1', 4.85, -3.7, '$x=3$（缺少 $y$ 的值）', {
            color: RED, size: 15,
          });
          S.actor('s4-wrong-eq2', 4.85, -4.7, '$x=3,y=4$（缺大括号）', {
            color: RED, size: 14,
          });

          P.renderCard(
            '<b>格式要求</b>：一组解必须<b>同时给出两个未知数的值</b>，用大括号联立书写。<br>' +
            '只写 $x=3$ 不完整；必须写 $\\begin{cases}x=3\\\\y=4\\end{cases}$。',
            'cool',
            'headShake'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
