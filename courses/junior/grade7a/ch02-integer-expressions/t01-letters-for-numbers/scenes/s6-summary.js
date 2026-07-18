// s6-summary.js  环节六：六、易错与小结（3步）
// 数学验算：
//   辨析：a÷3→a/3 ✓；3÷a→3/a ✓；a/3 ✓；3/a ✓；a3→3a（错）；3a ✓
//   填空验算：1×m=m ✓；(-1)×n=-n ✓；x÷y=x/y ✓；2½×a=5/2·a ✓（2½=5/2）；b=4时3×4-1=12-1=11 ✓
//   2½=2+1/2=(4+1)/2=5/2 ✓
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
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：辨析六个式子（规范 vs 不规范）
      {
        narration: '进入最后一关，先来一个综合辨析。下面六个式子，请判断哪些是规范写法、哪些要改。好，逐一看：a除以3，含除号，不规范，改写成分数——分子是a，分母是3，写成a/3，读作"3分之a"；3除以a，改成3/a，读作"a分之3"；a/3和3/a，这两个已经是分数，规范；a3，数字在后，不规范，改成3a；3a，数字在前，规范。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.2, '综合辨析', { color: COOL, size: 21, bold: true });

          // 表头
          S.actor('s6-h1', -6.5, 5.8, '式子',   { color: INK, size: 16, bold: true });
          S.actor('s6-h2',  0.0, 5.8, '判断',   { color: INK, size: 16, bold: true });
          S.actor('s6-h3',  6.5, 5.8, '说明',   { color: INK, size: 16, bold: true });
          S.addSegment('s6-tht', [-9.5, 6.3], [9.5, 6.3], { color: INK, width: 2, dash: 0 });
          S.addSegment('s6-thb', [-9.5, 5.2], [9.5, 5.2], { color: INK, width: 1, dash: 0 });

          // 式子1：a÷3 ✗
          S.actor('s6-r1-expr', -6.5, 4.3, '$a \\div 3$',        { color: INK, size: 17 });
          S.actor('s6-r1-judge',  0.0, 4.3, '✗',                 { color: RED, size: 18, bold: true });
          S.actor('s6-r1-note',   6.5, 4.3,
            '含除号，改 $\\dfrac{a}{3}$',
            { color: RED, size: 14 });

          // 式子2：3÷a ✗
          S.actor('s6-r2-expr', -6.5, 3.2, '$3 \\div a$',        { color: INK, size: 17 });
          S.actor('s6-r2-judge',  0.0, 3.2, '✗',                 { color: RED, size: 18, bold: true });
          S.actor('s6-r2-note',   6.5, 3.2,
            '含除号，改 $\\dfrac{3}{a}$',
            { color: RED, size: 14 });

          // 式子3：a/3 ✓
          S.actor('s6-r3-expr', -6.5, 2.1, '$\\dfrac{a}{3}$',   { color: INK, size: 17 });
          S.actor('s6-r3-judge',  0.0, 2.1, '✓',                { color: GREEN, size: 18, bold: true });
          S.actor('s6-r3-note',   6.5, 2.1, '分数形式，规范',   { color: GREEN, size: 14 });

          // 式子4：3/a ✓
          S.actor('s6-r4-expr', -6.5, 0.9, '$\\dfrac{3}{a}$',   { color: INK, size: 17 });
          S.actor('s6-r4-judge',  0.0, 0.9, '✓',                { color: GREEN, size: 18, bold: true });
          S.actor('s6-r4-note',   6.5, 0.9, '分数形式，规范',   { color: GREEN, size: 14 });

          // 式子5：a3 ✗
          S.actor('s6-r5-expr', -6.5, -0.3, '$a3$',             { color: INK, size: 17 });
          S.actor('s6-r5-judge',  0.0, -0.3, '✗',               { color: RED, size: 18, bold: true });
          S.actor('s6-r5-note',   6.5, -0.3, '数字应在前，改 $3a$', { color: RED, size: 14 });

          // 式子6：3a ✓
          S.actor('s6-r6-expr', -6.5, -1.5, '$3a$',             { color: INK, size: 17 });
          S.actor('s6-r6-judge',  0.0, -1.5, '✓',               { color: GREEN, size: 18, bold: true });
          S.actor('s6-r6-note',   6.5, -1.5, '数字在前，规范',  { color: GREEN, size: 14 });

          S.addSegment('s6-tbt', [-9.5, -2.1], [9.5, -2.1], { color: INK, width: 2, dash: 0 });

          P.renderCard(
            '<b>综合辨析</b><br>' +
            '$a \\div 3$ ✗ → $\\dfrac{a}{3}$ ✓<br>' +
            '$3 \\div a$ ✗ → $\\dfrac{3}{a}$ ✓<br>' +
            '$a3$ ✗ → $3a$ ✓'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：填空小结（五道题逐一揭示）
      {
        narration: '再来五道填空，综合复习本节所有知识点。跟着我一起写：1乘m等于m；负1乘n等于-n；x除以y等于x/y；2又二分之一乘a，先化假分数：2又二分之一等于二分之五，再省乘号得二分之五a；最后，当b等于4时，3b减1等于3乘4减1等于12减1等于11。',
        enter: function (anim) {
          // 清上一步
          S.remove('s6-title');
          S.remove('s6-h1'); S.remove('s6-h2'); S.remove('s6-h3');
          S.remove('s6-tht'); S.remove('s6-thb'); S.remove('s6-tbt');
          S.remove('s6-r1-expr'); S.remove('s6-r1-judge'); S.remove('s6-r1-note');
          S.remove('s6-r2-expr'); S.remove('s6-r2-judge'); S.remove('s6-r2-note');
          S.remove('s6-r3-expr'); S.remove('s6-r3-judge'); S.remove('s6-r3-note');
          S.remove('s6-r4-expr'); S.remove('s6-r4-judge'); S.remove('s6-r4-note');
          S.remove('s6-r5-expr'); S.remove('s6-r5-judge'); S.remove('s6-r5-note');
          S.remove('s6-r6-expr'); S.remove('s6-r6-judge'); S.remove('s6-r6-note');

          S.actor('s6-fill-title', 0, 7.2, '填空小结', { color: COOL, size: 21, bold: true });

          // 题1
          S.actor('s6-f1-q', -3.5, 5.8,
            '① $1 \\times m = $ 【？】',
            { color: INK, size: 18 });
          S.actor('s6-f1-a', 5.0, 5.8,
            '$m$',
            { color: TEAL, size: 20, bold: true });

          // 题2
          S.actor('s6-f2-q', -3.5, 4.6,
            '② $(-1) \\times n = $ 【？】',
            { color: INK, size: 18 });
          S.actor('s6-f2-a', 5.0, 4.6,
            '$-n$',
            { color: TEAL, size: 20, bold: true });

          // 题3
          S.actor('s6-f3-q', -3.5, 3.4,
            '③ $x \\div y = $ 【？】',
            { color: INK, size: 18 });
          S.actor('s6-f3-a', 5.0, 3.4,
            '$\\dfrac{x}{y}$',
            { color: TEAL, size: 20, bold: true });

          // 题4
          S.actor('s6-f4-q', -3.5, 2.0,
            '④ $2\\dfrac{1}{2} \\times a = $ 【？】',
            { color: INK, size: 18 });
          S.actor('s6-f4-a', 5.0, 2.0,
            '$\\dfrac{5}{2}a$',
            { color: TEAL, size: 20, bold: true });

          // 题5
          S.actor('s6-f5-q', -3.5, 0.5,
            '⑤ $b=4$ 时，$3b-1 = $ 【？】',
            { color: INK, size: 18 });
          S.actor('s6-f5-a', 5.0, 0.5,
            '$3 \\times 4-1=11$',
            { color: TEAL, size: 18, bold: true });

          P.renderCard(
            '<b>填空小结</b><br>' +
            '① $1 \\times m = m$；② $(-1) \\times n = -n$<br>' +
            '③ $x \\div y = \\dfrac{x}{y}$<br>' +
            '④ $2\\dfrac{1}{2} \\times a = \\dfrac{5}{2}a$<br>' +
            '⑤ $b=4$ 时 $3b-1=11$',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：悬念结尾——这些式子叫什么名字？
      {
        narration: '今天这节课，我们学了用字母表示数的意义、四条书写规范、列式表示数量关系，还有代入求值。大家已经写出了很多含字母的式子——2a、3ab、x/y……同学们，你们知道吗，这些式子都有专门的名字，也有专门的运算法则。下节课，我们将正式给它们命名，并学习它们的运算——大家能猜出来叫什么吗？下节课见！',
        enter: function (anim) {
          // 清上一步
          S.remove('s6-fill-title');
          S.remove('s6-f1-q'); S.remove('s6-f1-a');
          S.remove('s6-f2-q'); S.remove('s6-f2-a');
          S.remove('s6-f3-q'); S.remove('s6-f3-a');
          S.remove('s6-f4-q'); S.remove('s6-f4-a');
          S.remove('s6-f5-q'); S.remove('s6-f5-a');

          S.actor('s6-ep-title', 0, 7.0, '这些式子叫什么名字？', { color: WARM, size: 22, bold: true });

          // 三个式子展示（光晕效果用颜色高亮）
          S.actor('s6-ep-e1', -5.5, 4.8,
            '$2a$',
            { color: COOL, size: 36, bold: true });
          S.actor('s6-ep-e2', 0.0, 4.8,
            '$3ab$',
            { color: TEAL, size: 36, bold: true });
          S.actor('s6-ep-e3', 5.5, 4.8,
            '$\\dfrac{x}{y}$',
            { color: ORANGE, size: 36, bold: true });

          // 本节小结
          S.actor('s6-sum-head', 0, 2.8, '本节回顾', { color: INK, size: 18, bold: true });
          S.actor('s6-sum-1', 0, 1.8,
            '① 字母可代表任意数，使规律具有普遍性',
            { color: INK, size: 15 });
          S.actor('s6-sum-2', 0, 1.0,
            '② 四条书写规范（数字在前/1省略/除改分数/带分数化假分数）',
            { color: INK, size: 15 });
          S.actor('s6-sum-3', 0, 0.2,
            '③ 列式（$2a-b$，$\\dfrac{m}{n}$，$2n$，$2n+1$）',
            { color: INK, size: 15 });
          S.actor('s6-sum-4', 0, -0.6,
            '④ 代入求值——还原乘号，负数加括号',
            { color: INK, size: 15 });

          // 悬念
          S.actor('s6-ep-hint', 0, -2.2,
            '它们有专门的名字，也有专门的运算',
            { color: WARM, size: 18, bold: true });
          S.actor('s6-ep-hint2', 0, -3.4,
            '下节课，我们正式给它们命名！',
            { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>它们有专门的名字！</b><br>' +
            '$2a$、$3ab$、$\\dfrac{x}{y}$——<br>' +
            '下节课 2.2 正式命名，并学习它们的运算。<br>' +
            '你能猜出来叫什么吗？',
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
