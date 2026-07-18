// s4-degree.js  环节四：次数（4步）
// 数学验算：
// Step1：-5x²y³ 次数 = 2+3 = 5（x 的指数2，y 的指数3）✓
// Step2：abc = a¹b¹c¹，次数 = 1+1+1 = 3（每个字母各贡献指数1）✓
// Step3：2³x = 8x，2³ 是数字因数（系数=8），字母 x 指数=1，次数=1 ✓
// Step4：对比表：4mn²→系数4,次数1+2=3；-x→系数-1,次数1；(2/3)a²bc→系数2/3,次数2+1+1=4 ✓
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
    id: 's4',
    title: '四、次数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义 + -5x²y³ 示范（次数=2+3=5）
      {
        narration: '现在学单项式的第二个属性——次数。看这个单项式：负5x的平方y的三次方。里面有两个字母：x 的指数是2，y 的指数是3。把所有字母的指数加起来：2加3等于5。所以这个单项式的次数是5！定义：所有字母指数的和叫做单项式的次数。',
        enter: function (anim) {
          // 主式大字
          S.actor('s4-main', 0, 6.0, '$-5x^2y^3$', { color: INK, size: 32 });

          // 蓝色箭头指 x²（指数2）
          S.actor('s4-lab-x', -3.5, 4.0, '指数 $2$', { color: COOL, size: 20 });
          S.addSegment('s4-arr-x', [-2.2, 4.5], [-0.8, 5.2],
            { color: COOL, width: 2, dash: 0 });

          // 橙色箭头指 y³（指数3）
          S.actor('s4-lab-y', 3.0, 4.0, '指数 $3$', { color: ORANGE, size: 20 });
          S.addSegment('s4-arr-y', [2.5, 4.5], [1.2, 5.2],
            { color: ORANGE, width: 2, dash: 0 });

          // 汇聚计算
          S.actor('s4-calc', 0, 2.2,
            '次数 $= 2 + 3 = 5$',
            { color: WARM, size: 24 });

          // 定义
          S.actor('s4-def', 0, 0.5,
            '定义：所有字母指数的和叫做单项式的次数',
            { color: COOL, size: 17, bold: true });

          P.renderCard(
            '<b>次数</b>：单项式所有字母指数的<b>和</b><br>' +
            '$-5x^2y^3$：$x$ 指数 $2$，$y$ 指数 $3$<br>' +
            '次数 $= 2+3 = \\boldsymbol{5}$'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 2：abc 的次数（易错点：3 不是 1）
      {
        narration: '再看 abc。三个字母直接写在一起，看起来"普普通通"，有人会说次数是1——错！abc 其实是 a的1次方 乘 b的1次方 乘 c的1次方，每个字母的指数都是1。加起来：1加1加1等于3。所以 abc 的次数是3，不是1！每个字母单独算！',
        enter: function (anim) {
          // 清除旧内容
          S.remove('s4-main'); S.remove('s4-lab-x'); S.remove('s4-arr-x');
          S.remove('s4-lab-y'); S.remove('s4-arr-y'); S.remove('s4-calc');
          S.remove('s4-def');

          // abc 大字居中
          S.actor('s4-abc', 0, 6.0, '$abc$', { color: INK, size: 36 });

          // 展开为带指数形式
          S.actor('s4-abc-expand', 0, 4.2,
            '$= a^1 \\cdot b^1 \\cdot c^1$',
            { color: COOL, size: 26 });

          // 指数各自标注
          S.actor('s4-exp-a', -4.5, 2.5, '$a$ 的指数 $1$', { color: COOL,   size: 18 });
          S.actor('s4-exp-b',  0,   2.5, '$b$ 的指数 $1$', { color: ORANGE, size: 18 });
          S.actor('s4-exp-c',  4.5, 2.5, '$c$ 的指数 $1$', { color: GREEN,  size: 18 });

          // 计算式
          S.actor('s4-abc-calc', 0, 0.8,
            '次数 $= 1+1+1 = 3$',
            { color: WARM, size: 26 });

          // 警示对比
          S.actor('s4-warn', 0, -1.0,
            '不是 $1$！每个字母都要单独算！',
            { color: RED, size: 18 });

          P.renderCard(
            '<b>$abc$ 的次数是 $3$，不是 $1$！</b><br>' +
            '$abc = a^1 \\cdot b^1 \\cdot c^1$<br>' +
            '次数 $= 1+1+1 = 3$（每个字母单独算指数）',
            'warm'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 3：陷阱辨析 2³x（系数中的乘方不计入次数）
      {
        narration: '第三个陷阱！看 2的三次方 乘 x。有人说：2的三次方里也有指数3，加上 x 的指数1，次数是3加1等于4？——错！2的三次方等于8，是个数字，是系数的一部分，系数是8。次数只数字母的指数！字母只有 x，指数是1，所以次数是1。口诀：次数只数字母的指数，数字的指数不管！',
        enter: function (anim) {
          // 清除旧内容
          S.remove('s4-abc'); S.remove('s4-abc-expand');
          S.remove('s4-exp-a'); S.remove('s4-exp-b'); S.remove('s4-exp-c');
          S.remove('s4-abc-calc'); S.remove('s4-warn');

          // 主式大字
          S.actor('s4-trap', 0, 6.2, '$2^3x$', { color: INK, size: 34 });

          // 红色错误思路（先出现警示）
          S.actor('s4-wrong', 0, 4.5,
            '有人说：次数 $= 3+1 = 4$？',
            { color: RED, size: 20 });

          // 纠正：2³ = 8 是系数
          S.actor('s4-fix1', -4, 2.8,
            '$2^3 = 8$（数字因数，归系数！）',
            { color: ORANGE, size: 17 });
          // 圆圈标注 2³ 是系数
          S.addCircle('s4-coef-circle', -1.8, 6.2, 1.8,
            { color: ORANGE, fill: ORANGE, fillOpacity: 0.08, width: 2, dash: 2 });
          S.actor('s4-coef-lab', -4.5, 7.2, '系数 $= 8$', { color: ORANGE, size: 16 });

          // 只有 x 的指数算次数
          S.actor('s4-fix2', 3, 2.8,
            '字母 $x$ 指数 $= 1$',
            { color: COOL, size: 17 });
          S.actor('s4-fix3', 0, 1.2,
            '次数 $= 1$（只看字母！）',
            { color: GREEN, size: 22 });

          // 口诀
          S.actor('s4-slogan', 0, -0.5,
            '口诀：次数只数字母的指数，数字的指数不管！',
            { color: TEAL, size: 16 });

          P.renderCard(
            '<b>陷阱：$2^3x$ 的次数</b><br>' +
            '$2^3 = 8$ 是数字，归入<b>系数</b>，不计入次数！<br>' +
            '字母 $x$ 的指数 $= 1$，所以次数 $= 1$<br>' +
            '口诀：<b>次数只数字母的指数，数字的指数不管！</b>',
            'warm'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 4：对比表巩固 + tada 结论卡
      {
        narration: '来做一张对比表，把系数和次数一起填。第一个：4mn的平方，系数是4，次数是 m 的1加 n 的2等于3；第二个：负x，系数是负1，次数是1；第三个：三分之二a的平方bc，系数是三分之二，次数是 a的2加 b的1加 c的1等于4。系数看数字、含符号；次数看字母指数之和——两者独立，互不影响！',
        enter: function (anim) {
          // 清除旧内容
          S.remove('s4-trap'); S.remove('s4-wrong');
          S.remove('s4-fix1'); S.remove('s4-fix2'); S.remove('s4-fix3');
          S.remove('s4-coef-circle'); S.remove('s4-coef-lab');
          S.remove('s4-slogan');

          P.renderTable({
            head: ['单项式', '系数', '次数'],
            rows: [
              ['$4mn^2$',                         '$4$',               '$1+2=3$'],
              ['$-x$',                             '$-1$',              '$1$'],
              ['$\\dfrac{2}{3}a^2bc$',             '$\\dfrac{2}{3}$',   '$2+1+1=4$'],
            ]
          });

          // 结论卡（tada）
          P.renderCard(
            '<b>系数 vs 次数</b><br>' +
            '系数：看数字因数（含符号）<br>' +
            '次数：看字母指数之和<br>' +
            '<b>两者独立，互不影响！</b>',
            'teal',
            'tada'
          );

          return anim ? delay(300) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
