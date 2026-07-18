// s3-rules.js  环节三：三、书写规范（4步）
// 数学验算：
//   规范①：3×a=3a（数字在前省乘号）；a3 是错误写法
//   规范②：1×a=a（数字1省略）；(-1)×a=-a（-1的1省略，负号保留）
//   规范③：a÷b=a/b（除法改分数）
//   规范④：1又3/4×a → (4+3)/4×a = 7/4×a（带分数先化假分数）
//   门诊验算：a3→3a；1a→a；-1b→-b；a÷5→a/5 ✓
//   带分数：2又1/3=7/3，7/3×x=7/3·x ✓
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
    id: 's3',
    title: '三、书写规范',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：规范一、二（数字在前省乘号；1和-1的"1"省略）
      {
        narration: '用字母表示数，有四条书写规范，我们一条一条来看。规范一：数字与字母相乘，要省略乘号，而且数字写在字母前面——3乘a写成3a，不能写成a3！规范二：数字1或-1与字母相乘时，"1"这个数字必须省掉——1乘a写成a，不写1a；负1乘a写成-a，不写-1a。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.2, '书写规范一、二', { color: COOL, size: 21, bold: true });

          // 规范一
          S.actor('s3-r1-head', 0, 5.8, '规范一：数字在前，省乘号', { color: COOL, size: 18, bold: true });

          S.actor('s3-r1-a-op',    -5.0, 4.4, '$3 \\times a$',  { color: INK, size: 18 });
          S.actor('s3-r1-a-arrow', -1.0, 4.4, '→',              { color: GRAY, size: 18 });
          S.actor('s3-r1-a-ok',     1.5, 4.4, '$3a$ ✓',         { color: GREEN, size: 19, bold: true });
          S.actor('s3-r1-a-wrong',  5.5, 4.4, '$a3$ ✗',         { color: RED, size: 19, bold: true });

          // 分隔线
          S.addSegment('s3-sep1', [-9, 3.5], [9, 3.5], { color: GRAY, width: 1, dash: 2 });

          // 规范二
          S.actor('s3-r2-head', 0, 2.8, '规范二：1 和 -1 的"1"省略', { color: COOL, size: 18, bold: true });

          S.actor('s3-r2-a-op',    -5.0, 1.6, '$1 \\times a$',   { color: INK, size: 18 });
          S.actor('s3-r2-a-arrow', -1.0, 1.6, '→',               { color: GRAY, size: 18 });
          S.actor('s3-r2-a-ok',     1.5, 1.6, '$a$ ✓',           { color: GREEN, size: 19, bold: true });
          S.actor('s3-r2-a-wrong',  5.5, 1.6, '$1a$ ✗',          { color: RED, size: 19, bold: true });

          S.actor('s3-r2-b-op',    -5.0, 0.3, '$(-1) \\times a$', { color: INK, size: 18 });
          S.actor('s3-r2-b-arrow', -1.0, 0.3, '→',                { color: GRAY, size: 18 });
          S.actor('s3-r2-b-ok',     1.5, 0.3, '$-a$ ✓',           { color: GREEN, size: 19, bold: true });
          S.actor('s3-r2-b-wrong',  5.5, 0.3, '$-1a$ ✗',          { color: RED, size: 19, bold: true });

          // 口诀
          S.actor('s3-kouque1', 0, -1.5,
            '口诀：数字在前省乘号；1 和 -1 的"1"必须省',
            { color: TEAL, size: 16, bold: true });

          P.renderCard(
            '<b>规范一、二</b><br>' +
            '① $3 \\times a$ 写 $3a$（数字在前）；$a3$ 是错误写法<br>' +
            '② $1 \\times a$ 写 $a$（不写 $1a$）<br>' +
            '② $(-1) \\times a$ 写 $-a$（不写 $-1a$）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：规范三、四（除法改分数；带分数先化假分数）
      {
        narration: '规范三：字母与字母相除，或数与字母相除，要把除号改写成分数线——a除以b写成b分之a（即a在上、b在下的分数），不能用除号。规范四：带分数与字母相乘，必须先把带分数化成假分数再省乘号——1又四分之三乘a，先化成四分之七，再省乘号写成四分之七a，不能直接写1又四分之三a。',
        enter: function (anim) {
          // 清上一步
          S.remove('s3-title'); S.remove('s3-r1-head');
          S.remove('s3-r1-a-op'); S.remove('s3-r1-a-arrow'); S.remove('s3-r1-a-ok'); S.remove('s3-r1-a-wrong');
          S.remove('s3-sep1');
          S.remove('s3-r2-head');
          S.remove('s3-r2-a-op'); S.remove('s3-r2-a-arrow'); S.remove('s3-r2-a-ok'); S.remove('s3-r2-a-wrong');
          S.remove('s3-r2-b-op'); S.remove('s3-r2-b-arrow'); S.remove('s3-r2-b-ok'); S.remove('s3-r2-b-wrong');
          S.remove('s3-kouque1');

          S.actor('s3-title2', 0, 7.2, '书写规范三、四', { color: COOL, size: 21, bold: true });

          // 规范三
          S.actor('s3-r3-head', 0, 5.8, '规范三：除法改写为分数', { color: COOL, size: 18, bold: true });

          S.actor('s3-r3-op',    -5.0, 4.4, '$a \\div b$',          { color: INK, size: 18 });
          S.actor('s3-r3-arrow', -1.0, 4.4, '→',                    { color: GRAY, size: 18 });
          S.actor('s3-r3-ok',     1.5, 4.4, '$\\dfrac{a}{b}$ ✓',   { color: GREEN, size: 19, bold: true });
          S.actor('s3-r3-wrong',  6.0, 4.4, '$a \\div b$ ✗',       { color: RED, size: 19, bold: true });

          // 分隔线
          S.addSegment('s3-sep2', [-9, 3.5], [9, 3.5], { color: GRAY, width: 1, dash: 2 });

          // 规范四
          S.actor('s3-r4-head', 0, 2.8, '规范四：带分数先化假分数', { color: COOL, size: 18, bold: true });

          S.actor('s3-r4-op',    -5.5, 1.4, '$1\\dfrac{3}{4} \\times a$', { color: INK, size: 18 });
          S.actor('s3-r4-arr1',  -0.5, 1.4, '化假分数',                   { color: GRAY, size: 14 });
          S.actor('s3-r4-mid',    2.0, 1.4, '$\\dfrac{7}{4} \\times a$',  { color: ORANGE, size: 18 });
          S.actor('s3-r4-arr2',   5.5, 1.4, '省乘号',                     { color: GRAY, size: 14 });
          S.actor('s3-r4-ok',     7.8, 1.4, '$\\dfrac{7}{4}a$ ✓',        { color: GREEN, size: 18, bold: true });

          S.actor('s3-r4-wrong', 0, -0.2,
            '错误写法：$1\\dfrac{3}{4}a$ ✗（带分数不能直接与字母相乘）',
            { color: RED, size: 15 });

          // 口诀
          S.actor('s3-kouque2', 0, -1.8,
            '口诀：除法改分数；带分数先化假分数',
            { color: TEAL, size: 16, bold: true });

          P.renderCard(
            '<b>规范三、四</b><br>' +
            '③ $a \\div b$ 写 $\\dfrac{a}{b}$（消除除号）<br>' +
            '④ $1\\dfrac{3}{4} \\times a$：先化 $\\dfrac{7}{4}$，再写 $\\dfrac{7}{4}a$<br>' +
            '带分数不能直接与字母合写！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：门诊辨析——错误写法判断
      {
        narration: '现在来个"门诊"环节！下面四个病例，请同学们先自己判断，哪个写错了、应该怎么改。好，看诊断：第一个a3，数字应在字母前，正确写法是3a；第二个1a，数字1必须省，正确是a；第三个-1b，"1"省掉、负号留着，正确是-b；第四个a除以5，含除号，改写成分数——分子是a，分母是5，写成a/5，读作"5分之a"。',
        enter: function (anim) {
          // 清上一步
          S.remove('s3-title2'); S.remove('s3-r3-head');
          S.remove('s3-r3-op'); S.remove('s3-r3-arrow'); S.remove('s3-r3-ok'); S.remove('s3-r3-wrong');
          S.remove('s3-sep2');
          S.remove('s3-r4-head'); S.remove('s3-r4-op'); S.remove('s3-r4-arr1');
          S.remove('s3-r4-mid'); S.remove('s3-r4-arr2'); S.remove('s3-r4-ok'); S.remove('s3-r4-wrong');
          S.remove('s3-kouque2');

          S.actor('s3-clinic-title', 0, 7.2, '错误写法门诊', { color: RED, size: 22, bold: true });

          // 表头
          S.actor('s3-col-h1', -6.0, 5.8, '病例写法',  { color: INK, size: 16, bold: true });
          S.actor('s3-col-h2',  0.0, 5.8, '诊断',      { color: INK, size: 16, bold: true });
          S.actor('s3-col-h3',  6.0, 5.8, '正确写法',  { color: INK, size: 16, bold: true });
          S.addSegment('s3-cl-ht', [-9.5, 6.3], [9.5, 6.3], { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-cl-hb', [-9.5, 5.2], [9.5, 5.2], { color: INK, width: 1, dash: 0 });

          // 病例1：a3
          S.actor('s3-p1-case',    -6.0, 4.3, '$a3$',          { color: RED, size: 18 });
          S.actor('s3-p1-diag',     0.0, 4.3, '✗ 数字应在前',  { color: RED, size: 15 });
          S.actor('s3-p1-fix',      6.0, 4.3, '$3a$',          { color: GREEN, size: 18, bold: true });

          // 病例2：1a
          S.actor('s3-p2-case',    -6.0, 3.1, '$1a$',          { color: RED, size: 18 });
          S.actor('s3-p2-diag',     0.0, 3.1, '✗ "1"须省略',  { color: RED, size: 15 });
          S.actor('s3-p2-fix',      6.0, 3.1, '$a$',           { color: GREEN, size: 18, bold: true });

          // 病例3：-1b
          S.actor('s3-p3-case',    -6.0, 1.9, '$-1b$',         { color: RED, size: 18 });
          S.actor('s3-p3-diag',     0.0, 1.9, '✗ "1"须省略',  { color: RED, size: 15 });
          S.actor('s3-p3-fix',      6.0, 1.9, '$-b$',          { color: GREEN, size: 18, bold: true });

          // 病例4：a÷5
          S.actor('s3-p4-case',    -6.0, 0.7, '$a \\div 5$',       { color: RED, size: 18 });
          S.actor('s3-p4-diag',     0.0, 0.7, '✗ 除法改分数',      { color: RED, size: 15 });
          S.actor('s3-p4-fix',      6.0, 0.7, '$\\dfrac{a}{5}$',   { color: GREEN, size: 18, bold: true });

          S.addSegment('s3-cl-bt', [-9.5, 0.1], [9.5, 0.1], { color: INK, width: 2, dash: 0 });

          P.renderCard(
            '<b>错误写法门诊</b><br>' +
            '$a3$ → $3a$（数字在前）<br>' +
            '$1a$ → $a$，$-1b$ → $-b$（"1"须省略）<br>' +
            '$a \\div 5$ → $\\dfrac{a}{5}$（除法改分数）',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：带分数练习 2又1/3×x
      {
        narration: '最后一个练习，巩固规范四。2又三分之一乘x，如何规范写出？第一步：把带分数化成假分数，2又三分之一等于三分之七（2乘3加1等于7，分母不变）。第二步：省略乘号，三分之七x。这就是规范写法。注意：绝对不能写成2又三分之一x，那是错误写法！',
        enter: function (anim) {
          // 清上一步
          S.remove('s3-clinic-title');
          S.remove('s3-col-h1'); S.remove('s3-col-h2'); S.remove('s3-col-h3');
          S.remove('s3-cl-ht'); S.remove('s3-cl-hb'); S.remove('s3-cl-bt');
          S.remove('s3-p1-case'); S.remove('s3-p1-diag'); S.remove('s3-p1-fix');
          S.remove('s3-p2-case'); S.remove('s3-p2-diag'); S.remove('s3-p2-fix');
          S.remove('s3-p3-case'); S.remove('s3-p3-diag'); S.remove('s3-p3-fix');
          S.remove('s3-p4-case'); S.remove('s3-p4-diag'); S.remove('s3-p4-fix');

          S.actor('s3-prac-title', 0, 7.0, '带分数练习', { color: COOL, size: 21, bold: true });

          S.actor('s3-prac-q', 0, 5.2,
            '化简：$2\\dfrac{1}{3} \\times x$',
            { color: INK, size: 22 });

          // 过程展示
          S.actor('s3-step1-label', -4.0, 3.2, '第一步：化假分数', { color: ORANGE, size: 16, bold: true });
          S.actor('s3-step1-calc',   3.5, 3.2,
            '$2\\dfrac{1}{3} = \\dfrac{7}{3}$',
            { color: ORANGE, size: 20 });

          S.actor('s3-step2-label', -4.0, 1.5, '第二步：省乘号', { color: TEAL, size: 16, bold: true });
          S.actor('s3-step2-calc',   3.5, 1.5,
            '$\\dfrac{7}{3} \\times x = \\dfrac{7}{3}x$',
            { color: TEAL, size: 20 });

          S.actor('s3-answer', 0, -0.2,
            '规范写法：$\\dfrac{7}{3}x$ ✓',
            { color: GREEN, size: 24, bold: true });

          S.actor('s3-wrong2', 0, -1.8,
            '错误写法：$2\\dfrac{1}{3}x$ ✗',
            { color: RED, size: 18 });

          S.actor('s3-concl', 0, -3.4,
            '规范书写，数学才严谨',
            { color: TEAL, size: 19, bold: true });

          P.renderCard(
            '<b>带分数练习</b><br>' +
            '$2\\dfrac{1}{3} \\times x$<br>' +
            '① 化假分数：$2\\dfrac{1}{3} = \\dfrac{7}{3}$<br>' +
            '② 省乘号：$\\dfrac{7}{3}x$ ✓（不能写 $2\\dfrac{1}{3}x$）',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
