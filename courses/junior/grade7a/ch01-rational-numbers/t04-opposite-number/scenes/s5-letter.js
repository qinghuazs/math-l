// s5-letter.js  环节五：字母登场 -a（3步）
// 数学验算：
//   a=3  → -a=-3（负数）
//   a=-3 → -a=-(-3)=3（正数！-a 不一定是负数）
//   a=0  → -a=0（零）
// 及时练习：
//   a=5  → -a=-5
//   a=-2 → -a=2
//   a=0  → -a=0
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、字母登场 -a',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：a 的相反数记 -a（读法，-a 不一定是负数）
      {
        narration: '如果一个数叫 a，它的相反数怎么用字母表示？在 a 前面加一个负号，写成 -a。注意：-a 读作"a 的相反数"，而不是读成"负 a"。而且 -a 不一定是负数——当 a 本身是负数时，-a 反而是正数！',
        enter: function (anim) {
          S.actor('s5-title', 0, 6.8, '字母表示相反数', { color: COOL, size: 21 });

          S.actor('s5-formula', 0, 5.0,
            '$a$ 的相反数是 $-a$',
            { color: INK, size: 24 });

          S.actor('s5-read', 0, 3.2,
            '读作：$a$ 的相反数（不读"负 $a$"）',
            { color: TEAL, size: 16 });

          // 关键强调
          S.actor('s5-warn-box', 0, 1.2,
            '⚠ 注意：$-a$ <b>不一定是负数</b>！',
            { color: WARM, size: 18 });

          S.actor('s5-warn-tip', 0, -0.5,
            '当 $a$ 是负数时，$-a$ 是<b>正数</b>！',
            { color: RED, size: 16 });

          P.renderCard(
            '<b>$a$ 的相反数是 $-a$</b><br>' +
            '读作"$a$ 的相反数"。<br>' +
            '⚠ $-a$ <b>不一定是负数</b>：<br>' +
            '· 当 $a=3$（正数）时，$-a=-3$（负数）<br>' +
            '· 当 $a=-3$（负数）时，$-a=3$（正数！）<br>' +
            '· 当 $a=0$ 时，$-a=0$（零）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：三行对照表（逐行 popRow）
      {
        narration: '我们用表格来展示 -a 的三种情况。第一行：a=3，-a=-3，是负数。第二行：a=-3，-a等于负的负3等于正3，是正数！注意这里！第三行：a=0，-a=0，是零。',
        enter: function (anim) {
          // 清场上一步文字
          S.remove('s5-formula'); S.remove('s5-read');
          S.remove('s5-warn-box'); S.remove('s5-warn-tip');

          S.actor('s5-table-title', 0, 6.2,
            '$a$ 的值不同，$-a$ 的值也不同：',
            { color: INK, size: 17 });

          P.renderTable({
            head: ['$a$ 的值', '$-a$ 的值', '$-a$ 是正是负'],
            rows: [
              ['$a=3$', '$-a=-3$', '负数'],
              ['$a=-3$', '$-a=-(-3)=3$', '<b>正数！</b>'],
              ['$a=0$', '$-a=0$', '零']
            ]
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：及时练习三题揭晓
      {
        narration: '来做练习！当 a=5 时，-a 等于多少？当 a=-2 时，-a 等于多少？当 a=0 时，-a 等于多少？答案：-5、正2、0。第二题最关键——a=-2 代入，-a=负的负2=正2，-a 是正数！',
        enter: function (anim) {
          // 清场上一步
          S.remove('s5-table-title');

          S.actor('s5-prac-title', 0, 6.8, '及时练习：求 -a 的值', { color: COOL, size: 18 });

          // 三题
          S.actor('s5-pr1-q', -4, 5.0, '① $a=5$ 时，$-a=$【？】', { color: INK, size: 16 });
          S.actor('s5-pr1-a', 5, 5.0, '$-5$', { color: GREEN, size: 18 });

          S.actor('s5-pr2-q', -4, 3.0, '② $a=-2$ 时，$-a=$【？】', { color: INK, size: 16 });
          S.actor('s5-pr2-a', 5, 3.0, '$2$', { color: RED, size: 18 });
          S.actor('s5-pr2-tip', 2, 1.8,
            '（$-(-2)=2$，是<b>正数</b>！）',
            { color: RED, size: 14 });

          S.actor('s5-pr3-q', -4, 0.5, '③ $a=0$ 时，$-a=$【？】', { color: INK, size: 16 });
          S.actor('s5-pr3-a', 5, 0.5, '$0$', { color: GREEN, size: 18 });

          // 口诀
          S.actor('s5-summary', 0, -1.8,
            '口诀：$-a$ 的符号，取决于 $a$ 的符号！',
            { color: TEAL, size: 16 });

          P.renderCard(
            '<b>练习答案</b><br>' +
            '① $a=5$ 时，$-a=-5$（负数）<br>' +
            '② $a=-2$ 时，$-a=-(-2)=2$（<b>正数！</b>）<br>' +
            '③ $a=0$ 时，$-a=0$（零）<br>' +
            '<b>关键：$-a$ 不一定是负数！</b>',
            'warm',
            'tada'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
