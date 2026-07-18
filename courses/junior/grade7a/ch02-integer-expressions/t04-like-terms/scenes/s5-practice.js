// s5-practice.js  五、练习与求值（3步）
// 题目1：5x-3y+2x+y → 7x-2y（验算 x=4,y=2：原=20-6+8+2=24；化简=28-4=24 ✓）
// 题目2：3a²-2ab+5a²+3ab-1 → 8a²+ab-1
// 题目3：先化简再代入 a=2,b=-1：8×4+2×(-1)-1=32-2-1=29
// 验算题目2：3×4-2×2×(-1)+5×4+3×2×(-1)-1=12+4+20-6-1=29 ✓
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
    id: 's5',
    title: '五、练习与求值',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：基础化简 5x-3y+2x+y → 7x-2y
      {
        narration: '现在来做练习。第一题：合并同类项 5x 减 3y 加 2x 加 y。按三步法：找——x 类有 5x 和 2x，y 类有负 3y 和 y（注意 y 的系数是正 1）；合——x 类：5 加 2 等于 7，y 类：负 3 加 1 等于负 2；抄——结果是 7x 减 2y。代入 x 等于 4，y 等于 2 验算：原式等于 20 减 6 加 8 加 2 等于 24；化简式 7 乘以 4 减 2 乘以 2 等于 28 减 4 等于 24——正确！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.0, '五、练习与求值', { color: COOL, size: 22, bold: true });

          S.actor('s5-q1-t', -8, 5.5, '题1 合并同类项：', { color: INK, size: 18 });
          S.actor('s5-q1', 0, 4.4,
            '$5x - 3y + 2x + y$',
            { color: INK, size: 24, bold: true });

          S.actor('s5-a1-x', -4, 2.8,
            '$x$ 类：$5x + 2x = 7x$',
            { color: COOL, size: 18 });
          S.actor('s5-a1-y', 4, 2.8,
            '$y$ 类：$-3y + y = -2y$',
            { color: WARM, size: 18 });

          S.actor('s5-a1-res', 0, 1.4,
            '结果：$7x - 2y$',
            { color: GREEN, size: 22, bold: true });

          S.addSegment('s5-div1', [-7, 0.4], [7, 0.4], { color: GRAY, width: 1, dash: 2 });

          S.actor('s5-v1-t', -8, -0.5, '验算（$x=4,y=2$）：', { color: TEAL, size: 15 });
          S.actor('s5-v1-a', 0, -1.5,
            '原式 $= 20-6+8+2=24$；化简式 $=28-4=24$ ✓',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>题 1：$5x - 3y + 2x + y$</b><br>' +
            '$x$ 类：$(5+2)x = 7x$<br>' +
            '$y$ 类：$(-3+1)y = -2y$<br>' +
            '结果：$7x - 2y$<br>' +
            '验算（$x=4, y=2$）：原式 $=24$，化简式 $=24$ ✓'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：双字母+常数项 3a²-2ab+5a²+3ab-1 → 8a²+ab-1
      {
        narration: '第二题：合并同类项 3a² 减 2ab 加 5a² 加 3ab 减 1。这次有两种字母组合：a² 类和 ab 类，还有常数项。找同类项：a² 类有 3a² 和 5a²，ab 类有负 2ab 和 3ab，常数项就是负 1 单独一个；合并系数：a² 类 3 加 5 等于 8，ab 类负 2 加 3 等于 1；抄字母：结果是 8a² 加 ab 减 1。ab 的系数是 1，习惯上省略不写。',
        enter: function (anim) {
          S.remove('s5-q1-t'); S.remove('s5-q1');
          S.remove('s5-a1-x'); S.remove('s5-a1-y');
          S.remove('s5-a1-res'); S.remove('s5-div1');
          S.remove('s5-v1-t'); S.remove('s5-v1-a');

          S.actor('s5-q2-t', -8, 5.5, '题2 合并同类项：', { color: INK, size: 18 });
          S.actor('s5-q2', 0, 4.4,
            '$3a^2 - 2ab + 5a^2 + 3ab - 1$',
            { color: INK, size: 22, bold: true });

          S.actor('s5-a2-a2', -4, 2.8,
            '$a^2$ 类：$3a^2+5a^2=8a^2$',
            { color: COOL, size: 17 });
          S.actor('s5-a2-ab', 4, 2.8,
            '$ab$ 类：$-2ab+3ab=ab$',
            { color: WARM, size: 17 });
          S.actor('s5-a2-c', 0, 1.8,
            '常数项：$-1$（仅此一项，直接保留）',
            { color: GREEN, size: 16 });

          S.actor('s5-a2-res', 0, 0.5,
            '结果：$8a^2 + ab - 1$',
            { color: GREEN, size: 22, bold: true });

          P.renderCard(
            '<b>题 2：$3a^2 - 2ab + 5a^2 + 3ab - 1$</b><br>' +
            '$a^2$ 类：$(3+5)a^2 = 8a^2$<br>' +
            '$ab$ 类：$(-2+3)ab = ab$<br>' +
            '常数项 $-1$ 单独保留<br>' +
            '结果：$8a^2 + ab - 1$'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 3：先化简再代入 a=2,b=-1
      {
        narration: '第三步：先化简，再代入求值。题目要求代入 a 等于 2，b 等于负 1，求上面那个式子的值。化简后是 8a² 加 ab 减 1，代入：8 乘以 2² 加 2 乘以负 1 减 1，等于 8 乘以 4 加负 2 减 1，等于 32 减 2 减 1，等于 29。如果不先化简直接代入，步骤要多很多，而且容易算错。所以口诀记住：先化简，再代入——既简便又准确！',
        enter: function (anim) {
          S.remove('s5-q2-t'); S.remove('s5-q2');
          S.remove('s5-a2-a2'); S.remove('s5-a2-ab');
          S.remove('s5-a2-c'); S.remove('s5-a2-res');

          S.actor('s5-sv-t', 0, 6.5,
            '先化简，再代入（$a=2, b=-1$）',
            { color: COOL, size: 20, bold: true });

          S.actor('s5-sv-orig', -7, 5.0, '化简结果：', { color: INK, size: 17 });
          S.actor('s5-sv-simp', 2, 5.0, '$8a^2 + ab - 1$', { color: INK, size: 20, bold: true });

          S.actor('s5-sv-sub', 0, 3.5,
            '代入：$8 \\times 2^2 + 2 \\times (-1) - 1$',
            { color: WARM, size: 19 });
          S.actor('s5-sv-calc1', 0, 2.3,
            '$= 8 \\times 4 + (-2) - 1$',
            { color: WARM, size: 19 });
          S.actor('s5-sv-calc2', 0, 1.1,
            '$= 32 - 2 - 1$',
            { color: WARM, size: 19 });
          S.actor('s5-sv-res', 0, -0.1,
            '$= 29$',
            { color: GREEN, size: 26, bold: true });

          S.actor('s5-sv-motto', 0, -2.0,
            '先化简，再代入——既简便又准确！',
            { color: COOL, size: 18, bold: true });

          P.renderCard(
            '<b>先化简，再代入</b><br>' +
            '化简得 $8a^2+ab-1$，代入 $a=2, b=-1$：<br>' +
            '$8 \\times 4 + 2 \\times (-1) - 1 = 32 - 2 - 1 = 29$<br>' +
            '<b>直接代入原式步骤多，易出错！</b>',
            'cool',
            'headShake'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
