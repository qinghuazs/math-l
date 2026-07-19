// s5-practice.js  环节五：练习——三题巩固（3步）
// 数学验算：
//   练习一：5x-3x=(5-3)x=2x，2x=-14，x=-7；检验：5×(-7)-3×(-7)=-35+21=-14 ✓
//   练习二：2x+3x-x=(2+3-1)x=4x，4x=12，x=3；-x系数是-1不是0 ✓
//   综合题：x+2x+4x=35，7x=35，x=5；5+10+20=35 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a', GREEN = '#2e7d32', RED = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、练习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：练习一 5x-3x=-14
      {
        narration: '现在来练习！第一题：解方程 5x 减 3x 等于负 14。先自己在草稿纸上算，再看解答。合并同类项：5 减 3 等于 2，左边化为 2x；再用等式性质 2，两边除以 2，x 等于负 7。检验：5 乘以负 7 减 3 乘以负 7，等于负 35 加 21，等于负 14，等于右边，正确！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '课堂练习', { color: COOL, size: 20, bold: true });

          // 题目
          S.actor('s5-q1-lbl', -8, 5.5, '练习一', { color: TEAL, size: 17, bold: true });
          S.actor('s5-q1', 0, 5.5,
            '解方程：$5x - 3x = -14$',
            { color: INK, size: 22, bold: true });

          // 解答过程
          S.actor('s5-q1-s1', 0, 3.8,
            '$(5-3)x = -14$',
            { color: PURPLE, size: 20 });
          S.actor('s5-q1-s2', 0, 2.5,
            '$2x = -14$',
            { color: PURPLE, size: 20 });
          S.actor('s5-q1-s3', 0, 1.2,
            '$x = -7$',
            { color: WARM, size: 26, bold: true });

          // 检验
          S.actor('s5-q1-chk', 0, -0.5,
            '检验：$5 \\times(-7) - 3 \\times(-7) = -35 + 21 = -14$ ✓',
            { color: GREEN, size: 16 });

          P.renderCard(
            '<b>练习一：$5x - 3x = -14$</b><br>' +
            '合并：$(5-3)x = -14 \\Rightarrow 2x = -14$<br>' +
            '两边 $\\div 2$：$x = -7$<br>' +
            '检验：$5 \\times(-7) - 3 \\times(-7) = -35+21 = -14 =$ 右边 ✓'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：练习二 2x+3x-x=12；强调-x系数是-1
      {
        narration: '第二题：解方程 2x 加 3x 减 x 等于 12。注意：减 x 这一项，它的系数是负 1，不是 0！合并：2 加 3 减 1 等于 4，左边化为 4x；两边除以 4，x 等于 3。检验：6 加 9 减 3 等于 12，正确！这道题最容易出错的地方，就是把减 x 的系数当成 0，同学们要特别注意。',
        enter: function (anim) {
          // 清除练习一
          S.remove('s5-q1-lbl'); S.remove('s5-q1'); S.remove('s5-q1-s1');
          S.remove('s5-q1-s2'); S.remove('s5-q1-s3'); S.remove('s5-q1-chk');

          // 题目
          S.actor('s5-q2-lbl', -8, 5.5, '练习二', { color: TEAL, size: 17, bold: true });
          S.actor('s5-q2', 0, 5.5,
            '解方程：$2x + 3x - x = 12$',
            { color: INK, size: 22, bold: true });

          // 解答过程
          S.actor('s5-q2-s1', 0, 3.8,
            '$(2 + 3 - 1)x = 12$',
            { color: PURPLE, size: 20 });
          S.actor('s5-q2-s2', 0, 2.5,
            '$4x = 12$',
            { color: PURPLE, size: 20 });
          S.actor('s5-q2-s3', 0, 1.2,
            '$x = 3$',
            { color: WARM, size: 26, bold: true });

          // 检验
          S.actor('s5-q2-chk', 0, -0.2,
            '检验：$6 + 9 - 3 = 12$ ✓',
            { color: GREEN, size: 17 });

          // 易错提示
          S.actor('s5-q2-warn', 0, -2.0,
            '$-x$ 的系数是 $-1$，不是 $0$！',
            { color: RED, size: 18, bold: true });

          P.renderCard(
            '<b>练习二：$2x + 3x - x = 12$</b><br>' +
            '合并：$(2+3-1)x = 12 \\Rightarrow 4x = 12$<br>' +
            '两边 $\\div 4$：$x = 3$<br>' +
            '检验：$6+9-3=12=$ 右边 ✓<br><br>' +
            '<b>易错点：</b>$-x$ 的系数是 $-1$，不是 $0$！',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：综合题——翻倍情境同构变式
      {
        narration: '第三题，出口综合题：某兴趣小组三次活动的参加人数，第二次是第一次的 2 倍，第三次是第一次的 4 倍，三次共 35 人参加。设第一次 x 人，列方程并求解。这道题和"买计算机"的结构完全一样——能感受到吗？x 加 2x 加 4x 等于 35，合并得 7x 等于 35，x 等于 5。验算：5 加 10 加 20 等于 35，正确！',
        enter: function (anim) {
          S.remove('s5-q2-lbl'); S.remove('s5-q2'); S.remove('s5-q2-s1');
          S.remove('s5-q2-s2'); S.remove('s5-q2-s3'); S.remove('s5-q2-chk'); S.remove('s5-q2-warn');

          // 题目
          S.actor('s5-q3-lbl', -8, 6.2, '综合题', { color: TEAL, size: 17, bold: true });
          S.actor('s5-q3-ctx', 0, 5.5,
            '兴趣小组三次活动：第二次是第一次的 2 倍，',
            { color: INK, size: 16 });
          S.actor('s5-q3-ctx2', 0, 4.5,
            '第三次是第一次的 4 倍，三次共 35 人。',
            { color: INK, size: 16 });

          // 解答
          S.actor('s5-q3-model', 0, 3.0,
            '设第一次 $x$ 人，则方程：$x + 2x + 4x = 35$',
            { color: PURPLE, size: 17 });
          S.actor('s5-q3-s1', 0, 1.8,
            '$7x = 35 \\Rightarrow x = 5$',
            { color: WARM, size: 24, bold: true });
          S.actor('s5-q3-ans', 0, 0.5,
            '第一次 5 人，第二次 10 人，第三次 20 人',
            { color: COOL, size: 17 });
          S.actor('s5-q3-chk', 0, -0.8,
            '验算：$5 + 10 + 20 = 35$ ✓',
            { color: GREEN, size: 17 });

          // 结构类比
          S.actor('s5-q3-note', 0, -2.5,
            '与"买计算机"结构完全相同——总量=各部分之和',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>综合题（翻倍情境同构）</b><br>' +
            '设第一次 $x$ 人：$x + 2x + 4x = 35$<br>' +
            '$7x = 35 \\Rightarrow x = 5$<br>' +
            '第一次 5 人，第二次 10 人，第三次 20 人<br>' +
            '验算：$5+10+20=35$ ✓<br><br>' +
            '结构与"买计算机"完全相同：<br>总量 = 各部分之和',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
