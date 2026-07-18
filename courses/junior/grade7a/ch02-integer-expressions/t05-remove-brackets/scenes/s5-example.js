// s5-example.js  五、例题精讲——完整化简流程（3步）
// 数学验算：
//   例1：8a+2b+(5a-b) = 8a+2b+5a-b = 13a+b；代入a=1,b=1：左=8+2+(5-1)=14，右=13+1=14 ✓
//   例2：(5a-3b)-3(a²-2b) = 5a-3b-3a²+6b = -3a²+5a+3b；代入a=1,b=1：左=(5-3)-3(1-2)=2+3=5，右=-3+5+3=5 ✓
//   出口题：5x-(2x-3)+(x+1) = 5x-2x+3+x+1 = 4x+4；代入x=2：左=10-(4-3)+(3)=12，右=8+4=12 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：例题1 完整过程
      {
        narration: '例题一：化简 8a 加 2b 加小括号 5a 减 b。第一步，括号前是加号，去掉括号各项不变号，得 8a 加 2b 加 5a 减 b；第二步，合并同类项：a 项 8a 加 5a 等于 13a，b 项 2b 减 b 等于 b；结果 13a 加 b。自检：令 a 等于 1，b 等于 1，左边等于 8 加 2 加小括号 5 减 1 等于 14，右边 13 加 1 等于 14，一致！',
        enter: function (anim) {
          S.actor('s5-ex1-title', 0, 7.2, '例题1：化简', { color: TEAL, size: 20, bold: true });
          S.actor('s5-ex1-q', 0, 6.0, '$8a + 2b + (5a - b)$', { color: INK, size: 22, bold: true });

          S.actor('s5-ex1-s1-lab', -7, 4.4, '第一步：', { color: COOL, size: 17 });
          S.actor('s5-ex1-s1-note', -1, 4.4, '括号前是"+"，去括号各项不变', { color: COOL, size: 16 });
          S.actor('s5-ex1-s1-eq', 0, 3.2, '$= 8a + 2b + 5a - b$', { color: INK, size: 20 });

          S.actor('s5-ex1-s2-lab', -7, 2.0, '第二步：', { color: ORANGE, size: 17 });
          S.actor('s5-ex1-s2-note', -1, 2.0, '合并同类项', { color: ORANGE, size: 16 });
          S.actor('s5-ex1-s2-a', -5, 0.8, '$a$ 项：$8a+5a=13a$', { color: COOL, size: 16 });
          S.actor('s5-ex1-s2-b',  3, 0.8, '$b$ 项：$2b-b=b$', { color: COOL, size: 16 });

          S.addSegment('s5-sep1', [-7, 0.0], [7, 0.0], { color: INK, width: 1, dash: 2 });
          S.actor('s5-ex1-res', 0, -1.0, '$= 13a + b$', { color: WARM, size: 26, bold: true });

          S.actor('s5-ex1-check', 0, -2.6,
            '自检（$a=1, b=1$）：左 $=14$，右 $=14$ ✓',
            { color: GREEN, size: 17 });

          P.renderCard(
            '<b>例题1 解题过程</b><br>' +
            '$8a+2b+(5a-b)$<br>' +
            '$= 8a+2b+5a-b$（去括号，+号不变）<br>' +
            '$= 13a+b$（合并同类项）<br>' +
            '自检 $a=b=1$：$14=14$ ✓'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 2：例题2 完整过程
      {
        narration: '例题二：化简小括号 5a 减 3b 小括号，减，3 乘括号 a 平方减 2b。第一个括号前等价加 1，不变号，得 5a 减 3b；第二项负 3 分配，负 3 乘 a 平方等于负 3a 平方，负 3 乘负 2b 等于正 6b，注意负负得正；展开后 5a 减 3b 减 3a 平方加 6b；合并同类项：-3a 平方不动，a 项只有 5a，b 项 -3b 加 6b 等于 3b；结果 -3a 平方加 5a 加 3b。自检 a 等于 1，b 等于 1，左边等于 2 加 3 等于 5，右边等于 -3 加 5 加 3 等于 5，一致！',
        enter: function (anim) {
          S.remove('s5-ex1-title'); S.remove('s5-ex1-q');
          S.remove('s5-ex1-s1-lab'); S.remove('s5-ex1-s1-note'); S.remove('s5-ex1-s1-eq');
          S.remove('s5-ex1-s2-lab'); S.remove('s5-ex1-s2-note');
          S.remove('s5-ex1-s2-a'); S.remove('s5-ex1-s2-b');
          S.remove('s5-sep1'); S.remove('s5-ex1-res'); S.remove('s5-ex1-check');

          S.actor('s5-ex2-title', 0, 7.2, '例题2：化简', { color: TEAL, size: 20, bold: true });
          S.actor('s5-ex2-q', 0, 6.2,
            '$(5a-3b)-3(a^{2}-2b)$',
            { color: INK, size: 22, bold: true });

          S.actor('s5-ex2-s1-lab', -7, 5.0, '第一步：', { color: COOL, size: 16 });
          S.actor('s5-ex2-s1-note', 0, 5.0,
            '第一括号前等价"$+1$"，不变号',
            { color: COOL, size: 15 });

          S.actor('s5-ex2-s2-lab', -7, 3.8, '第二步：', { color: RED, size: 16 });
          S.actor('s5-ex2-s2-note', 0, 3.8,
            '$-3$ 分配：$(-3)\\times a^{2}=-3a^{2}$，$(-3)\\times(-2b)=+6b$',
            { color: RED, size: 14 });

          S.actor('s5-ex2-expand', 0, 2.7,
            '$= 5a - 3b - 3a^{2} + 6b$',
            { color: ORANGE, size: 20 });

          S.actor('s5-ex2-s3-lab', -7, 1.7, '第三步：', { color: ORANGE, size: 16 });
          S.actor('s5-ex2-s3-note', 0, 1.7, '合并同类项', { color: ORANGE, size: 15 });

          S.addSegment('s5-sep2', [-7, 1.0], [7, 1.0], { color: INK, width: 1, dash: 2 });
          S.actor('s5-ex2-res', 0, 0.0,
            '$= -3a^{2} + 5a + 3b$',
            { color: WARM, size: 24, bold: true });

          S.actor('s5-ex2-check', 0, -1.4,
            '自检（$a=1, b=1$）：左 $=(5-3)-3(1-2)=2+3=5$，右 $=-3+5+3=5$ ✓',
            { color: GREEN, size: 15 });

          P.renderCard(
            '<b>例题2 解题过程</b><br>' +
            '$(5a-3b)-3(a^2-2b)$<br>' +
            '$= 5a-3b-3a^2+6b$（去两个括号）<br>' +
            '$= -3a^2+5a+3b$（合并同类项）<br>' +
            '自检 $a=b=1$：$5=5$ ✓'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 3：出口练习
      {
        narration: '出口练习：化简 5x 减小括号 2x 减 3 加小括号 x 加 1。大家独立完成，两分钟后对答案。第一个括号前减号，变号：5x 减 2x 加 3；第二个括号前加号，不变：加 x 加 1；合并：5x 减 2x 加 x 等于 4x，常数 3 加 1 等于 4，结果 4x 加 4。自检令 x 等于 2：左边 10 减 1 加 3 等于 12，右边 8 加 4 等于 12，一致！',
        enter: function (anim) {
          S.remove('s5-ex2-title'); S.remove('s5-ex2-q');
          S.remove('s5-ex2-s1-lab'); S.remove('s5-ex2-s1-note');
          S.remove('s5-ex2-s2-lab'); S.remove('s5-ex2-s2-note');
          S.remove('s5-ex2-expand');
          S.remove('s5-ex2-s3-lab'); S.remove('s5-ex2-s3-note');
          S.remove('s5-sep2'); S.remove('s5-ex2-res'); S.remove('s5-ex2-check');

          S.actor('s5-exit-title', 0, 7.2, '出口练习（独立完成）', { color: RED, size: 20, bold: true });
          S.actor('s5-exit-q', 0, 6.0,
            '$5x - (2x-3) + (x+1)$',
            { color: INK, size: 24, bold: true });

          S.actor('s5-exit-s1', 0, 4.6,
            '第一括号前"$-$"，变号：$5x - 2x + 3$',
            { color: RED, size: 18 });
          S.actor('s5-exit-s2', 0, 3.4,
            '第二括号前"$+$"，不变：$+ x + 1$',
            { color: COOL, size: 18 });
          S.actor('s5-exit-merge', 0, 2.2,
            '合并：$x$ 项 $5x-2x+x=4x$，常数 $3+1=4$',
            { color: ORANGE, size: 16 });

          S.addSegment('s5-sep3', [-7, 1.4], [7, 1.4], { color: INK, width: 1, dash: 2 });
          S.actor('s5-exit-res', 0, 0.4,
            '$= 4x + 4$',
            { color: WARM, size: 28, bold: true });

          S.actor('s5-exit-check', 0, -1.0,
            '自检（$x=2$）：左 $=10-1+3=12$，右 $=8+4=12$ ✓',
            { color: GREEN, size: 17 });

          P.renderCard(
            '<b>出口练习答案</b><br>' +
            '$5x-(2x-3)+(x+1)$<br>' +
            '$= 5x-2x+3+x+1$<br>' +
            '$= 4x+4$<br>' +
            '自检 $x=2$：$12=12$ ✓',
            'cool'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
