(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、开平方与根号记法',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '求一个数的平方根的运算，叫做<b>开平方</b>。开平方用根号 $\\sqrt{\\phantom{0}}$ 表示：$\\sqrt{a}$ 读作"a 的算术平方根"，表示 $a$ 的<b>非负平方根</b>（只取正值那个）。$a$ 的两个平方根合写为 $\\pm\\sqrt{a}$。',
        enter: function (anim) {
          // 展示根号的结构
          S.addText('s4-title', 0, 8.5, '开平方的记号', { color: INK, size: 22, anchorX: 'middle' });

          // 算术平方根
          S.addText('s4-sqrt-label', -5, 6.5, '算术平方根（非负）：', { color: INK, size: 17 });
          S.addText('s4-sqrt-sym', 1.5, 6.5, '$\\sqrt{a}$', { color: COOL, size: 22 });
          S.addText('s4-sqrt-eg', -5, 5.2, '例：$\\sqrt{25} = 5$（只取正值）', { color: COOL, size: 16 });

          // 两个平方根
          S.addText('s4-both-label', -5, 3.8, '两个平方根：', { color: INK, size: 17 });
          S.addText('s4-both-sym', 1.5, 3.8, '$\\pm\\sqrt{a}$', { color: WARM, size: 22 });
          S.addText('s4-both-eg', -5, 2.5, '例：$25$ 的平方根是 $\\pm\\sqrt{25} = \\pm 5$', { color: WARM, size: 16 });

          P.renderCard(
            '<b>根号记法</b><br>' +
            '$\\sqrt{a}$：$a$ 的<b>算术平方根</b>（非负，$a \\geq 0$）<br>' +
            '$-\\sqrt{a}$：$a$ 的负平方根<br>' +
            '$\\pm\\sqrt{a}$：$a$ 的两个平方根合写<br><br>' +
            '特别地：$\\sqrt{0} = 0$'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '开平方与平方是互逆运算——就像加法与减法、乘法与除法一样。对一个非负数先平方再开平方，或先开平方再平方，都回到原数。我们用双向箭头来表示这种关系。',
        enter: function (anim) {
          S.addText('s4-inv-title', 0, 8.5, '平方 与 开平方：互逆运算', { color: INK, size: 20, anchorX: 'middle' });

          // 左侧：x²
          S.addText('s4-box-x', -3.5, 5.5, '$x$（非负）', { color: COOL, size: 18 });
          // 右侧：a
          S.addText('s4-box-a', 2.0, 5.5, '$a = x^2$', { color: WARM, size: 18 });

          // 向右箭头（平方）
          S.addSegment('s4-arr-sq', [-1.8, 5.8], [1.5, 5.8], { color: PURPLE, width: 3, dash: 0 });
          S.addText('s4-lbl-sq', -0.4, 6.3, '平方（$x^2$）', { color: PURPLE, size: 15 });

          // 向左箭头（开平方）
          S.addSegment('s4-arr-sqrt', [1.5, 5.1], [-1.8, 5.1], { color: GREEN, width: 3, dash: 0 });
          S.addText('s4-lbl-sqrt', -0.4, 4.3, '开平方（$\\sqrt{\\phantom{0}}$）', { color: GREEN, size: 15 });

          // 示例
          S.addText('s4-ex1', -5, 2.8, '例 1：$3 \\xrightarrow{\\text{平方}} 9 \\xrightarrow{\\text{开平方}} 3$', { color: COOL, size: 15 });
          S.addText('s4-ex2', -5, 1.5, '例 2：$\\sqrt{16} = 4$，因为 $4^2 = 16$', { color: WARM, size: 15 });

          P.renderCard(
            '<b>互逆运算</b><br>' +
            '平方：$x \\to x^2 = a$<br>' +
            '开平方：$a \\to \\sqrt{a} = x$（$x \\geq 0$）<br><br>' +
            '$\\left(\\sqrt{a}\\right)^2 = a$（$a \\geq 0$）<br>' +
            '$\\sqrt{a^2} = |a|$（注意绝对值！）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '特别注意：$\\sqrt{a^2} = |a|$ 而不是 $a$。因为算术平方根定义为非负数，当 $a$ 为负数时，$\\sqrt{a^2} = \\sqrt{(-a)^2} = -a \\gt 0$，所以必须加绝对值。这是本单元的一个重要易错点。',
        enter: function (anim) {
          S.addText('s4-warn-title', 0, 8.5, '易错提醒', { color: WARM, size: 22, anchorX: 'middle' });

          S.addText('s4-warn1', -5, 6.8, '正确：$\\sqrt{a^2} = |a|$', { color: GREEN, size: 18 });
          S.addText('s4-warn2', -5, 5.5, '错误：$\\sqrt{a^2} = a$（当 $a \\lt 0$ 时不成立）', { color: WARM, size: 15 });

          S.addText('s4-chk1', -5, 4.0, '当 $a = 3$：$\\sqrt{3^2} = \\sqrt{9} = 3 = |3|$ ✓', { color: INK, size: 15 });
          S.addText('s4-chk2', -5, 2.8, '当 $a = -3$：$\\sqrt{(-3)^2} = \\sqrt{9} = 3 = |-3|$ ✓', { color: INK, size: 15 });
          S.addText('s4-chk3', -5, 1.6, '若写成 $\\sqrt{(-3)^2} = -3$ 则错！因为 $-3 \\lt 0$。', { color: WARM, size: 15 });

          P.renderCard(
            '<b>关键公式</b><br>' +
            '$\\left(\\sqrt{a}\\right)^2 = a \\ (a \\geq 0)$<br>' +
            '$\\sqrt{a^2} = |a|$（任意实数 $a$）<br><br>' +
            '口诀：开方结果永远非负！'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
