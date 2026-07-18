// s2-define.js  环节二：单项式的定义（3步）
// 数学验算：
// 单项式定义：数与字母的积；单独一个数或字母也是
// 典型例：3x（数×字母），-5y²（数×字母²），abc（字母×字母×字母），7（单独数），a（单独字母）
// 快判：5a✓，x✓，-3✓，a-b✗（含减法）
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var GREEN = '#2e7d32';
  var RED   = '#c62828';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、单项式的定义',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义 + 五个典型例展示
      {
        narration: '揭晓！数学把"数与字母的积"这种形式叫做单项式。请大家记住两条：第一，数与字母的积叫单项式；第二，单独的一个数或一个字母——也是单项式！我们来看五个典型的例子，理解一下。',
        enter: function (anim) {
          // 定义框（大文字）
          S.actor('s2-def-title', 0, 7.0,
            '定义：数与字母的积叫做单项式',
            { color: COOL, size: 19, bold: true });
          S.actor('s2-def-note', 0, 5.8,
            '单独的一个数或一个字母，也是单项式。',
            { color: TEAL, size: 17 });

          // 五个典型例（辐射布局，中央→四角+下方）
          S.actor('s2-ex1', -6,  3.5, '$3x$',     { color: WARM, size: 22 });
          S.actor('s2-ex2', -6,  1.0, '$-5y^2$',  { color: WARM, size: 22 });
          S.actor('s2-ex3',  0,  1.5, '$abc$',    { color: WARM, size: 22 });
          S.actor('s2-ex4',  5,  3.5, '$7$',      { color: WARM, size: 22 });
          S.actor('s2-ex5',  5,  1.0, '$a$',      { color: WARM, size: 22 });

          // 说明文字
          S.actor('s2-desc1', -6,  2.7, '数 $3$ 与字母 $x$ 的积',    { color: INK,  size: 13 });
          S.actor('s2-desc2', -6,  0.2, '数 $-5$ 与 $y^2$ 的积',     { color: INK,  size: 13 });
          S.actor('s2-desc3',  0,  0.7, '字母与字母的积',             { color: INK,  size: 13 });
          S.actor('s2-desc4',  5,  2.7, '单独一个数',                 { color: TEAL, size: 13 });
          S.actor('s2-desc5',  5,  0.2, '单独一个字母',               { color: TEAL, size: 13 });

          P.renderCard(
            '<b>单项式定义</b><br>' +
            '<b>数与字母的积</b>叫做单项式；<br>' +
            '单独的一个数或一个字母<b>也是</b>单项式。<br>' +
            '例：$3x$，$-5y^2$，$abc$，$7$，$a$'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 2：三个注意
      {
        narration: '学了定义，还有三个注意点要记一下。第一，乘号通常省略，3x 看起来是两个符号粘在一起，但它的本质是 3 乘以 x，是乘法关系；第二，单独的数如负5也是单项式；第三，单独的字母如 m 也是单项式。单项式不一定要有数有字母，一个人也能构成单项式。',
        enter: function (anim) {
          // 清掉旧的说明文字，保留例子
          S.remove('s2-desc1'); S.remove('s2-desc2'); S.remove('s2-desc3');
          S.remove('s2-desc4'); S.remove('s2-desc5');

          // 三个注意（面板 renderTable）
          P.renderTable({
            head: ['注意点', '说明'],
            rows: [
              ['乘号通常省略', '$3x$ 的本质是 $3 \\times x$，仍是乘法关系'],
              ['单独的数也是单项式', '$-5$、$7$、$0$ 都是单项式'],
              ['单独的字母也是单项式', '$m$、$a$、$x$ 都是单项式'],
            ]
          });

          // 画板补充：强调 3x = 3×x
          S.actor('s2-mul-note', -2, -2,
            '$3x = 3 \\times x$（乘号省略了！）',
            { color: COOL, size: 18 });

          return anim ? delay(300) : null;
        },
      },

      // Step 3：快判四例（5a，x，-3，a-b）揭晓
      {
        narration: '现在来练习一下！我说四个式子，大家判断：5a，是不是单项式？x，是不是？负3，是不是？a减b，是不是？大家心里有答案了吗？来看揭晓！5a——数乘字母，是；x——单独一个字母，是；负3——单独一个数，是；a减b——含有减法，不是单项式！',
        enter: function (anim) {
          // 清掉注意点补充文字
          S.remove('s2-mul-note');
          // 清掉旧例子
          S.remove('s2-ex1'); S.remove('s2-ex2'); S.remove('s2-ex3');
          S.remove('s2-ex4'); S.remove('s2-ex5');

          // 四个式子
          S.actor('s2-q1', -5,  3, '$5a$',  { color: INK, size: 24 });
          S.actor('s2-q2',  0,  3, '$x$',   { color: INK, size: 24 });
          S.actor('s2-q3', -5,  0, '$-3$',  { color: INK, size: 24 });
          S.actor('s2-q4',  0,  0, '$a-b$', { color: INK, size: 24 });

          // 揭晓：绿勾/红叉
          S.actor('s2-ans1', -5,  1.8, '✓ 单项式',     { color: GREEN, size: 16 });
          S.actor('s2-ans2',  0,  1.8, '✓ 单项式',     { color: GREEN, size: 16 });
          S.actor('s2-ans3', -5, -1.2, '✓ 单项式',     { color: GREEN, size: 16 });
          S.actor('s2-ans4',  0, -1.2, '✗ 含减法，不是！', { color: RED,   size: 16 });

          // 旁注
          S.actor('s2-note-ab', 2.2, -1.2, '（含加减→排除）', { color: RED, size: 13 });

          P.renderCard(
            '<b>快速判断</b><br>' +
            '$5a$ ✓ 单项式&emsp;$x$ ✓ 单项式<br>' +
            '$-3$ ✓ 单项式&emsp;$a-b$ ✗ <b>含减法，不是！</b><br>' +
            '含加减运算 → 直接排除',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
