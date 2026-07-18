// s5-value.js  环节五：五、代入求值（3步）
// 数学验算：
//   例1：a=3时，2a+1 = 2×3+1 = 6+1 = 7 ✓
//   例2：x=2,y=-1时，3x-2y = 3×2-2×(-1) = 6-(-2) = 6+2 = 8 ✓
//   例3：a=-2时，a² = (-2)² = (-2)×(-2) = 4 ✓；错误写法：-2²=-4（先算指数再取负）
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
    title: '五、代入求值',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：正整数代入 a=3，2a+1=7
      {
        narration: '用字母表示数有一个重要应用：把具体数代入含字母的式子求值。例1：当a等于3时，2a加1等于多少？注意：代入时要先还原省略的乘号！2a等于2乘a，代入a=3，变成2乘3，等于6，再加1，得7。所以当a等于3时，2a+1的值是7。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '代入求值', { color: COOL, size: 21, bold: true });

          // 例1题目
          S.actor('s5-e1-q', 0, 5.6,
            '例1：当 $a=3$ 时，求 $2a+1$ 的值',
            { color: INK, size: 18 });

          // 解题过程
          S.actor('s5-e1-s1', 0, 4.0,
            '$2a+1$',
            { color: INK, size: 22 });

          S.actor('s5-e1-s2', 0, 2.6,
            '$= 2 \\times 3 + 1$',
            { color: ORANGE, size: 22 });
          S.actor('s5-e1-note2', 5.5, 2.6,
            '还原乘号',
            { color: ORANGE, size: 14 });

          S.actor('s5-e1-s3', 0, 1.2,
            '$= 6 + 1$',
            { color: INK, size: 22 });

          S.actor('s5-e1-s4', 0, -0.2,
            '$= 7$',
            { color: TEAL, size: 26, bold: true });

          // 强调
          S.actor('s5-e1-key', 0, -2.0,
            '代入时先还原省略的乘号：$2a \\rightarrow 2 \\times 3$',
            { color: WARM, size: 16, bold: true });

          P.renderCard(
            '<b>例1：代入正整数</b><br>' +
            '$a=3$ 时，$2a+1$<br>' +
            '$= 2 \\times 3 + 1$（还原乘号）<br>' +
            '$= 6 + 1 = 7$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：负数代入 x=2,y=-1，3x-2y=8（括号关键）
      {
        narration: '例2：当x等于2，y等于负1时，求3x减2y的值。代入时，x换成2没问题；y换成负1时，要给负1加括号！3x减2y，等于3乘2减2乘括号负1，等于6减括号负2，等于6加2，等于8。这里关键就是：代入负数必须加括号，否则减号和负号混在一起就算错了！',
        enter: function (anim) {
          // 清上一步
          S.remove('s5-title'); S.remove('s5-e1-q');
          S.remove('s5-e1-s1'); S.remove('s5-e1-s2'); S.remove('s5-e1-note2');
          S.remove('s5-e1-s3'); S.remove('s5-e1-s4'); S.remove('s5-e1-key');

          S.actor('s5-title2', 0, 7.2, '代入负数——括号关键！', { color: RED, size: 21, bold: true });

          S.actor('s5-e2-q', 0, 5.6,
            '例2：$x=2$，$y=-1$ 时，求 $3x-2y$ 的值',
            { color: INK, size: 18 });

          S.actor('s5-e2-s1', 0, 4.1,
            '$3x-2y$',
            { color: INK, size: 22 });

          S.actor('s5-e2-s2', 0, 2.7,
            '$= 3 \\times 2 - 2 \\times (-1)$',
            { color: ORANGE, size: 22 });
          S.actor('s5-e2-note2', 6.5, 2.7, '括号！', { color: RED, size: 15, bold: true });

          S.actor('s5-e2-s3', 0, 1.3,
            '$= 6 - (-2)$',
            { color: INK, size: 22 });

          S.actor('s5-e2-s4', 0, -0.1,
            '$= 6 + 2 = 8$',
            { color: TEAL, size: 26, bold: true });

          S.actor('s5-e2-key', 0, -1.9,
            '代入负数必须加括号——这是关键！',
            { color: RED, size: 17, bold: true });

          P.renderCard(
            '<b>例2：代入负数</b><br>' +
            '$x=2$，$y=-1$ 时，$3x-2y$<br>' +
            '$= 3 \\times 2 - 2 \\times (-1)$（负数加括号）<br>' +
            '$= 6-(-2) = 6+2 = 8$',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：乘方代入 a=-2，a²=4（正误对比）
      {
        narration: '例3，也是最难的一例：当a等于负2时，a的平方等于多少？a等于负2代入，a²等于括号负2的平方，等于括号负2乘以括号负2，等于4，因为负负得正。现在看这个错误：有同学写-2²=-4，这是错的！因为-2²按运算顺序是先算2²=4，再取负得-4，而我们要的是负2的整体去平方，必须写(-2)²=4。结论：代入负数，乘方更要记得加括号！',
        enter: function (anim) {
          // 清上一步
          S.remove('s5-title2'); S.remove('s5-e2-q');
          S.remove('s5-e2-s1'); S.remove('s5-e2-s2'); S.remove('s5-e2-note2');
          S.remove('s5-e2-s3'); S.remove('s5-e2-s4'); S.remove('s5-e2-key');

          S.actor('s5-title3', 0, 7.2, '代入乘方——括号更重要！', { color: RED, size: 20, bold: true });

          S.actor('s5-e3-q', 0, 5.8,
            '例3：$a=-2$ 时，求 $a^{2}$ 的值',
            { color: INK, size: 18 });

          // 正确过程（左半）
          S.actor('s5-e3-ok-head', -4.0, 4.4, '正确写法：', { color: GREEN, size: 16, bold: true });
          S.actor('s5-e3-ok1', -4.0, 3.2,
            '$a^{2} = (-2)^{2}$',
            { color: GREEN, size: 21 });
          S.actor('s5-e3-ok2', -4.0, 2.0,
            '$= (-2) \\times (-2)$',
            { color: GREEN, size: 21 });
          S.actor('s5-e3-ok3', -4.0, 0.8,
            '$= 4$ ✓',
            { color: GREEN, size: 24, bold: true });
          S.actor('s5-e3-ok-note', -4.0, -0.4,
            '负负得正',
            { color: GREEN, size: 14 });

          // 分隔线
          S.addSegment('s5-sep', [1.5, 5.0], [1.5, -1.0], { color: GRAY, width: 2, dash: 2 });

          // 错误对比（右半）
          S.actor('s5-e3-err-head', 5.5, 4.4, '错误写法：', { color: RED, size: 16, bold: true });
          S.actor('s5-e3-err1', 5.5, 3.2,
            '$-2^{2}$',
            { color: RED, size: 21 });
          S.actor('s5-e3-err2', 5.5, 2.0,
            '$= -(2^{2}) = -4$',
            { color: RED, size: 21 });
          S.actor('s5-e3-err3', 5.5, 0.8,
            '✗ 错误！',
            { color: RED, size: 18, bold: true });
          S.actor('s5-e3-err-note', 5.5, -0.4,
            '未给负2加括号',
            { color: RED, size: 14 });

          // 结论
          S.actor('s5-e3-concl', 0, -2.0,
            '代入负数必须加括号；负数偶次幂得正数',
            { color: WARM, size: 17, bold: true });

          P.renderCard(
            '<b>例3：乘方代入负数</b><br>' +
            '$a=-2$ 时，$a^{2} = (-2)^{2} = 4$ ✓<br>' +
            '错误：$-2^{2} = -4$ ✗（未加括号）<br>' +
            '<b>代入负数必须加括号；负数偶次幂得正数。</b>',
            'warm',
            'headShake'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
