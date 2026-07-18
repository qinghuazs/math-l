// s1-intro.js  环节一：单项式拼积木（3步）
// 数学验算：3x² + (-2x) + (-3) = 3x²-2x-3，三个单项式的和 → 多项式定义引入
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、单项式拼积木',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示三个单项式积木
      {
        narration: '上节课我们学了单项式，知道它是数与字母的积，或者单独的一个数、一个字母。今天我这儿有三块"积木"——第一块 3x²，第二块 -2x，第三块 -3。它们都是单项式。仔细看：第二块和第三块都带着负号，负号是它们自身的一部分！',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.0, '上节课的单项式积木', { color: COOL, size: 22, bold: true });
          S.actor('s1-m1', -5, 3.5, '$3x^{2}$', { color: COOL, size: 36 });
          S.actor('s1-m2',  0, 3.5, '$-2x$',    { color: WARM, size: 36 });
          S.actor('s1-m3',  5, 3.5, '$-3$',      { color: TEAL, size: 36 });
          S.actor('s1-lab1', -5, 1.5, '单项式①', { color: COOL, size: 16 });
          S.actor('s1-lab2',  0, 1.5, '单项式②', { color: WARM, size: 16 });
          S.actor('s1-lab3',  5, 1.5, '单项式③', { color: TEAL, size: 16 });
          P.renderCard('这三个都是<b>单项式</b>：数与字母的积，或单独的数。<br>注意 $-2x$ 和 $-3$ 的负号是它们自身的一部分！');
          return anim ? delay(400) : null;
        },
      },
      // Step 2：三块积木用加号拼在一起
      {
        narration: '现在把三块积木用加号连起来。看动画——三块积木向中间聚拢，中间插上加号，得到：3x² 加上括号负2x，再加上括号负3。这个式子含有加法运算，已经不是单项式了，但它由三个单项式的和组成。',
        enter: function (anim) {
          if (!anim) {
            S.actor('s1-m1', -5, 3.5, '$3x^{2}$', { color: COOL, size: 36 });
            S.actor('s1-m2',  0, 3.5, '$-2x$',    { color: WARM, size: 36 });
            S.actor('s1-m3',  5, 3.5, '$-3$',      { color: TEAL, size: 36 });
            S.actor('s1-sum', 0, 0.5,
              '$3x^{2}+(-2x)+(-3)$',
              { color: INK, size: 28, bold: true });
            S.actor('s1-plus1', -2.5, 3.5, '$+$', { color: INK, size: 30 });
            S.actor('s1-plus2',  2.5, 3.5, '$+$', { color: INK, size: 30 });
            P.renderCard('三块积木用加号拼在一起：<br>$3x^{2}+(-2x)+(-3)$<br>含有加法运算，不再是单项式！');
            return null;
          }
          // 动画路径：加号先出现，再合并显示完整式
          S.actor('s1-plus1', -2.5, 3.5, '$+$', { color: INK, size: 30 });
          S.actor('s1-plus2',  2.5, 3.5, '$+$', { color: INK, size: 30 });
          return delay(600).then(function () {
            S.actor('s1-sum', 0, 0.5,
              '$3x^{2}+(-2x)+(-3)$',
              { color: INK, size: 28, bold: true });
            P.renderCard('三块积木用加号拼在一起：<br>$3x^{2}+(-2x)+(-3)$<br>含有加法运算，不再是单项式！');
            return delay(400);
          });
        },
      },
      // Step 3：化简书写 + 定义卡
      {
        narration: '我们通常把它写成更简洁的形式：3x²减2x再减3。这就是多项式！定义：几个单项式的和叫做多项式。因为 3x²-2x-3 是三个单项式的和，所以它是一个多项式。',
        enter: function (anim) {
          S.remove('s1-plus1');
          S.remove('s1-plus2');
          S.remove('s1-lab1');
          S.remove('s1-lab2');
          S.remove('s1-lab3');
          S.actor('s1-arrow', 0, -1.2, '↓ 化简书写', { color: GRAY, size: 16 });
          S.actor('s1-simp', 0, -2.8,
            '$3x^{2}-2x-3$',
            { color: WARM, size: 36, bold: true });
          P.renderCard(
            '<b>多项式定义</b><br>' +
            '几个单项式的<b>和</b>叫做<b>多项式</b>。<br>' +
            '$3x^{2}-2x-3$ 是三个单项式的和，它是多项式。',
            'cool'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
