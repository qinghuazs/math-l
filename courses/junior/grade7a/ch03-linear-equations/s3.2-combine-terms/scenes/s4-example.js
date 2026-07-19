// s4-example.js  环节四：例题精讲——带小数系数与右边乘积式（4步）
// 数学验算：
//   左边：7x-2.5x+3x-1.5x，正系数7+3=10，负系数2.5+1.5=4，净系数=10-4=6 → 6x ✓
//   右边：-15×4=-60，-6×3=-18，-60+(-18)=-78 ✓
//   6x=-78，x=-78÷6=-13 ✓
//   检验：7×(-13)-2.5×(-13)+3×(-13)-1.5×(-13)=-91+32.5+(-39)+19.5=-78=右边 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a', GREEN = '#2e7d32', ORANGE = '#e65100', RED = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示题目，观察结构
      {
        narration: '下面来看一道例题，方程是：7x 减 2.5x 加 3x 减 1.5x，等于负 15 乘以 4，减 6 乘以 3。先观察结构：左边有 4 项都含 x，是同类项，可以合并；右边是两个乘积式，先分别算数值，再加在一起。两边分别整理，再合在一起！',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '例题精讲：带小数系数', { color: COOL, size: 20, bold: true });

          // 左边蓝色，右边橙色
          S.actor('s4-lhs', -3.5, 5.0,
            '$7x - 2.5x + 3x - 1.5x$',
            { color: COOL, size: 22, bold: true });
          S.actor('s4-eq-sign', 0, 3.4, '=', { color: INK, size: 28 });
          S.actor('s4-rhs', 0, 1.8,
            '$-15 \\times 4 - 6 \\times 3$',
            { color: ORANGE, size: 22, bold: true });

          S.actor('s4-hint-l', -5, -0.5,
            '左边 4 项含 $x$，合并',
            { color: COOL, size: 16 });
          S.actor('s4-hint-r', 4, -0.5,
            '右边先算数值',
            { color: ORANGE, size: 16 });

          P.renderCard(
            '<b>例题：</b><br>' +
            '$7x - 2.5x + 3x - 1.5x = -15 \\times 4 - 6 \\times 3$<br><br>' +
            '观察结构：<br>' +
            '• <b>左边</b>：4 项都含 $x$，同类项，合并！<br>' +
            '• <b>右边</b>：两个乘积式，先各自计算数值。<br>' +
            '策略：两边分别整理，再合在一起。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：合并左边同类项——正负系数分开高亮
      {
        narration: '第一步，合并左边的同类项。把正系数单独看：7 和 3，正系数之和是 10；再看负系数：2.5 和 1.5，负系数之和是 4。净系数等于 10 减 4，等于 6。所以左边 4 项合并后等于 6x。特别注意：负 2.5x 的系数是负 2.5，不是正 2.5，负号是系数的一部分，一个也不能丢！',
        enter: function (anim) {
          S.remove('s4-lhs'); S.remove('s4-eq-sign'); S.remove('s4-rhs');
          S.remove('s4-hint-l'); S.remove('s4-hint-r');

          // 正系数高亮
          S.actor('s4-pos-lbl', -6, 5.5, '正系数：', { color: WARM, size: 17, bold: true });
          S.actor('s4-pos-val', 0, 5.5, '$7 + 3 = 10$', { color: WARM, size: 22, bold: true });

          // 负系数高亮
          S.actor('s4-neg-lbl', -6, 3.8, '负系数：', { color: COOL, size: 17, bold: true });
          S.actor('s4-neg-val', 0, 3.8, '$2.5 + 1.5 = 4$', { color: COOL, size: 22, bold: true });

          // 净系数
          S.actor('s4-net-lbl', -6, 2.1, '净系数：', { color: PURPLE, size: 17, bold: true });
          S.actor('s4-net-val', 0, 2.1, '$10 - 4 = 6$', { color: PURPLE, size: 22, bold: true });

          // 合并结果
          S.actor('s4-merge-arrow', 0, 0.5, '↓  合并同类项', { color: TEAL, size: 17 });
          S.actor('s4-lhs-result', 0, -1.2,
            '左边 $= 6x$',
            { color: PURPLE, size: 30, bold: true });

          // 易错提示
          S.actor('s4-warn', 0, -3.5,
            '注意：$-2.5x$ 的系数是 $-2.5$，负号不能丢！',
            { color: RED, size: 16 });

          P.renderCard(
            '<b>第一步：合并左边同类项</b><br>' +
            '$7x - 2.5x + 3x - 1.5x = (7 - 2.5 + 3 - 1.5)x$<br>' +
            '正系数：$7 + 3 = 10$<br>' +
            '负系数：$2.5 + 1.5 = 4$<br>' +
            '净系数：$10 - 4 = 6$<br>' +
            '∴ 左边 $= 6x$<br><br>' +
            '<b>易错：</b>$-2.5x$ 的系数是 $-2.5$，<br>负号是系数的一部分，一个也不能丢！',
            'warm'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：计算右边，方程化为 6x=-78
      {
        narration: '第二步，计算右边的数值。负 15 乘以 4 等于负 60；负 6 乘以 3 等于负 18。右边等于负 60 加负 18，等于负 78。现在方程两边都整理好了：左边是 6x，右边是负 78，方程化为 6x 等于负 78。',
        enter: function (anim) {
          S.remove('s4-pos-lbl'); S.remove('s4-pos-val');
          S.remove('s4-neg-lbl'); S.remove('s4-neg-val');
          S.remove('s4-net-lbl'); S.remove('s4-net-val');
          S.remove('s4-merge-arrow'); S.remove('s4-lhs-result'); S.remove('s4-warn');

          // 右边计算过程
          S.actor('s4-rhs-title', 0, 6.0,
            '计算右边：',
            { color: ORANGE, size: 19, bold: true });
          S.actor('s4-rhs-a', 0, 4.5,
            '$-15 \\times 4 = -60$',
            { color: ORANGE, size: 22 });
          S.actor('s4-rhs-b', 0, 3.0,
            '$-6 \\times 3 = -18$',
            { color: ORANGE, size: 22 });
          S.actor('s4-rhs-c', 0, 1.5,
            '右边 $= -60 + (-18) = -78$',
            { color: ORANGE, size: 22, bold: true });

          // 方程汇总
          S.actor('s4-combined-arrow', 0, 0.0, '↓  两边整理完毕', { color: TEAL, size: 17 });
          S.actor('s4-final-eq', 0, -1.8,
            '$6x = -78$',
            { color: PURPLE, size: 38, bold: true });

          P.renderCard(
            '<b>第二步：计算右边数值</b><br>' +
            '$-15 \\times 4 = -60$<br>' +
            '$-6 \\times 3 = -18$<br>' +
            '右边 $= -60 + (-18) = -78$<br><br>' +
            '<b>方程化为：</b>$6x = -78$'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 4：系数化1与检验
      {
        narration: '两边同除以 6——等式性质 2。左边 6x 除以 6 得 x；右边负 78 除以 6 得负 13。解出 x 等于负 13。最后代入原方程检验：7 乘以负 13，等于负 91；负 2.5 乘以负 13，等于 32.5；3 乘以负 13，等于负 39；负 1.5 乘以负 13，等于 19.5。左边等于负 91 加 32.5 加负 39 加 19.5，等于负 78，等于右边，检验正确！',
        enter: function (anim) {
          S.remove('s4-rhs-title'); S.remove('s4-rhs-a'); S.remove('s4-rhs-b');
          S.remove('s4-rhs-c'); S.remove('s4-combined-arrow'); S.remove('s4-final-eq');

          S.actor('s4-div-eq', 0, 7.0,
            '$6x \\div 6 = -78 \\div 6$',
            { color: PURPLE, size: 24 });
          S.actor('s4-ans', 0, 5.5,
            '$x = -13$',
            { color: PURPLE, size: 40, bold: true });

          // 检验
          S.actor('s4-chk-title', 0, 3.8,
            '检验（代入原方程）：',
            { color: TEAL, size: 17, bold: true });
          S.actor('s4-chk1', 0, 2.5,
            '左边 $= 7 \\times(-13) - 2.5 \\times(-13) + 3 \\times(-13) - 1.5 \\times(-13)$',
            { color: INK, size: 14 });
          S.actor('s4-chk2', 0, 1.2,
            '$= -91 + 32.5 + (-39) + 19.5 = -78 = $ 右边',
            { color: GREEN, size: 16 });
          S.actor('s4-chk-tick', 0, 0.0, '✓ 检验正确', { color: GREEN, size: 22, bold: true });

          // 两步流程小结
          S.actor('s4-flow', 0, -2.2,
            '两步：① 合并同类项　② 系数化为 1',
            { color: COOL, size: 17, bold: true });

          P.renderCard(
            '<b>第三步：系数化为 1（等式性质 2）</b><br>' +
            '$6x \\div 6 = -78 \\div 6$<br>' +
            '$x = -13$<br><br>' +
            '<b>检验（代入原方程）：</b><br>' +
            '左边 $= -91 + 32.5 + (-39) + 19.5 = -78 =$ 右边 ✓<br><br>' +
            '<b>两步流程总结：</b><br>' +
            '① 合并同类项 → ② 系数化为 1',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
