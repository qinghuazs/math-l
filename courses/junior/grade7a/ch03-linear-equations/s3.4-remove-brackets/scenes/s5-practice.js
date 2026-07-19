// s5-practice.js  环节五：练习（3步）
// 练习1：3(x+2)-2(x-1)=7  → 3x+6-2x+2=7 → x+8=7 → x=-1
//   验算：左=3(-1+2)-2(-1-1)=3×1-2×(-2)=3+4=7=右 ✓
// 练习2：5(x-3)=2(x+6) → 5x-15=2x+12 → 3x=27 → x=9
//   验算：左=5×6=30；右=2×15=30 ✓
// 出口题：4(x-1)-3(2x+1)=5 → 4x-4-6x-3=5 → -2x-7=5 → -2x=12 → x=-6
//   验算：左=4(-7)-3(-11)=-28+33=5=右 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', RED = '#c62828', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、练习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步1：两道基础练习 + 答案
        narration: '好，现在做两道练习。练习1：解方程 $3(x+2)-2(x-1)=7$。练习2：解方程 $5(x-3)=2(x+6)$。先自己算，给大家 1 分钟。——好，来对答案。练习1：去括号，$3x+6-2x+2=7$；注意 $-2(x-1)=-2x+2$，负号乘 $-1$ 得 $+2$；合并得 $x+8=7$；移项 $x=7-8=-1$。练习2：$5x-15=2x+12$，$3x=27$，$x=9$。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.3, '课堂练习', { color: COOL, size: 21, bold: true });
          S.actor('s5-q1-t', -5, 5.8, '练习1', { color: TEAL, size: 17, bold: true });
          S.actor('s5-q1', -5, 4.5, '$3(x+2)-2(x-1)=7$', { color: INK, size: 19 });
          S.actor('s5-q2-t', 4, 5.8, '练习2', { color: WARM, size: 17, bold: true });
          S.actor('s5-q2', 4, 4.5, '$5(x-3)=2(x+6)$', { color: INK, size: 19 });
          // 解答过程
          S.actor('s5-a1-1', -5.5, 2.8, '去括号：$3x+6-2x+2=7$', { color: INK, size: 15 });
          S.actor('s5-a1-2', -5.5, 1.6, '合并：$x+8=7$', { color: INK, size: 15 });
          S.actor('s5-a1-3', -5.5, 0.4, '$x = -1$', { color: RED, size: 20, bold: true });
          S.actor('s5-a2-1', 4.5, 2.8, '去括号：$5x-15=2x+12$', { color: INK, size: 15 });
          S.actor('s5-a2-2', 4.5, 1.6, '移项：$3x=27$', { color: INK, size: 15 });
          S.actor('s5-a2-3', 4.5, 0.4, '$x = 9$', { color: RED, size: 20, bold: true });
          P.renderCard(
            '<b>练习1</b>：$3(x+2)-2(x-1)=7$<br>' +
            '注意 $-2(x-1)=-2x+2$（负号×负1=正2），$x=-1$<br>' +
            '<b>练习2</b>：$5(x-3)=2(x+6)$，$x=9$'
          );
          if (!anim) { return null; }
          return delay(500);
        },
      },
      {
        // 步2：出口题（分配律完整性检验）
        narration: '再来一道出口题，检验大家是否真正掌握了分配律。解方程 $4(x-1)-3(2x+1)=5$。重点在 $-3(2x+1)$ 这里：系数 $-3$ 要乘到括号内每一项，$-3 \\times 2x=-6x$，$-3 \\times 1=-3$，得 $-6x-3$。去括号：$4x-4-6x-3=5$；合并：$-2x-7=5$；移项：$-2x=12$；除以 $-2$，$x=-6$。',
        enter: function (anim) {
          S.remove('s5-q1-t'); S.remove('s5-q1'); S.remove('s5-q2-t'); S.remove('s5-q2');
          S.remove('s5-a1-1'); S.remove('s5-a1-2'); S.remove('s5-a1-3');
          S.remove('s5-a2-1'); S.remove('s5-a2-2'); S.remove('s5-a2-3');
          S.actor('s5-exit-t', 0, 6.8, '出口题：', { color: ORANGE, size: 18, bold: true });
          S.actor('s5-exit-q', 0, 5.5, '$4(x-1)-3(2x+1)=5$', { color: INK, size: 22, bold: true });
          S.actor('s5-warn', 3.5, 4.0, '注意：$-3(2x+1)$', { color: WARM, size: 16 });
          S.actor('s5-warn2', 3.5, 2.8, '$-3 \\times 2x=-6x$', { color: WARM, size: 16 });
          S.actor('s5-warn3', 3.5, 1.6, '$-3 \\times 1=-3$', { color: WARM, size: 16 });
          S.actor('s5-e1', -3.5, 3.8, '去括号：$4x-4-6x-3=5$', { color: INK, size: 16 });
          S.actor('s5-e2', -3.5, 2.6, '合并：$-2x-7=5$', { color: INK, size: 16 });
          S.actor('s5-e3', -3.5, 1.4, '移项：$-2x=12$', { color: INK, size: 16 });
          S.actor('s5-exit-sol', 0, -0.2, '$x = -6$', { color: RED, size: 30, bold: true });
          P.renderCard(
            '<b>出口题关键</b>：$-3(2x+1)=-6x-3$<br>' +
            '乘数 $-3$ 必须乘到括号内<b>每一项</b>，包括常数项！<br>' +
            '结果：$x=-6$',
            'warm'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步3：矛盾方程（拓展）
        narration: '最后一道思维拓展题，看看会发生什么神奇的事情。解方程 $-(x+4)+3(x-2)=2x-8$。去括号：$-x-4+3x-6=2x-8$；合并左边：$2x-10=2x-8$；两边同时减去 $2x$，得到 $-10=-8$。这……是假的！$-10$ 不等于 $-8$，这个方程无论 $x$ 取什么值都不成立——这样的方程叫做无解的矛盾方程。',
        enter: function (anim) {
          S.remove('s5-exit-t'); S.remove('s5-exit-q'); S.remove('s5-warn'); S.remove('s5-warn2');
          S.remove('s5-warn3'); S.remove('s5-e1'); S.remove('s5-e2'); S.remove('s5-e3');
          S.remove('s5-exit-sol');
          S.actor('s5-contra-t', 0, 7.0, '拓展：矛盾方程', { color: ORANGE, size: 19, bold: true });
          S.actor('s5-contra-q', 0, 5.8, '$-(x+4)+3(x-2)=2x-8$', { color: INK, size: 20 });
          S.actor('s5-c1', 0, 4.3, '去括号：$-x-4+3x-6=2x-8$', { color: INK, size: 17 });
          S.actor('s5-c2', 0, 3.0, '合并左边：$2x-10=2x-8$', { color: INK, size: 17 });
          S.actor('s5-c3', 0, 1.7, '两边减 $2x$：$-10=-8$', { color: RED, size: 20 });
          S.actor('s5-c4', 0, 0.2, '$-10 \\neq -8$，永远不成立！', { color: RED, size: 20, bold: true });
          S.actor('s5-c5', 0, -1.3, '∴ 原方程无解', { color: WARM, size: 22, bold: true });
          P.renderCard(
            '<b>矛盾方程</b>：化简后出现 $-10=-8$ 这样永远不成立的等式<br>' +
            '→ 原方程<b>无解</b><br>' +
            '（这是方程的一种特殊情形，后续会系统学习）',
            'warm'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
