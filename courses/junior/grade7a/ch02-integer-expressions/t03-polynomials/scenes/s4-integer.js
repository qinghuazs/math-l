// s4-integer.js  环节四：整式家族树（3步）
// 数学验算：整式=单项式∪多项式；分式（分母含字母如 2/x）不属于整式
// 分类树：整式 → 单项式（-5, 3x², 4m²n）/ 多项式（a+b, 3x²y-2x+1, a²-3a+2）
// 类比第一章：整数+分数=有理数；单项式+多项式=整式
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
    id: 's4',
    title: '四、整式家族树',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：引出整式定义，类比有理数
      {
        narration: '我们在第一章学过，整数和分数统称有理数。代数式也有类似的分类。单项式和多项式并列，它们合在一起有一个统一的名字——整式。整式就是单项式和多项式的统称。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.0, '整式家族树', { color: COOL, size: 22, bold: true });
          // 类比说明
          S.actor('s4-cmp1', 0, 5.5,
            '第一章：整数 + 分数 = 有理数',
            { color: GRAY, size: 18 });
          S.actor('s4-cmp2', 0, 4.2,
            '本节：单项式 + 多项式 = 整式',
            { color: COOL, size: 20, bold: true });
          S.actor('s4-def', 0, 2.5,
            '单项式和多项式统称<b>整式</b>',
            { color: INK, size: 22 });
          P.renderCard(
            '<b>整式定义</b><br>' +
            '就像整数和分数统称有理数，<br>' +
            '<b>单项式和多项式统称整式</b>。'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 2：分类树生长动画
      {
        narration: '来看整式的分类树。根节点是"整式"，向下分为两支：左边是单项式，右边是多项式。单项式的例子有：-5，3x²，4m²n；多项式的例子有：a+b，3x²y-2x+1，a²-3a+2。',
        enter: function (anim) {
          S.remove('s4-cmp1'); S.remove('s4-cmp2'); S.remove('s4-def');
          // 根节点
          S.actor('s4-root', 0, 6.5, '整式', { color: COOL, size: 26, bold: true });
          if (!anim) {
            // 快放：直接画全树
            S.addSegment('s4-line-l', [-0.5, 6.0], [-4.5, 4.5], { color: INK, width: 2, dash: 0 });
            S.addSegment('s4-line-r', [0.5, 6.0],  [4.5, 4.5],  { color: INK, width: 2, dash: 0 });
            S.actor('s4-mono',  -5, 4.0, '单项式', { color: TEAL, size: 22, bold: true });
            S.actor('s4-poly',   5, 4.0, '多项式', { color: WARM, size: 22, bold: true });
            S.actor('s4-eg-m1', -6, 2.5, '$-5$',        { color: TEAL, size: 18 });
            S.actor('s4-eg-m2', -4.5, 1.5, '$3x^{2}$',  { color: TEAL, size: 18 });
            S.actor('s4-eg-m3', -6, 0.5, '$4m^{2}n$',   { color: TEAL, size: 18 });
            S.actor('s4-eg-p1', 3.5, 2.5, '$a+b$',           { color: WARM, size: 18 });
            S.actor('s4-eg-p2', 3.5, 1.5, '$3x^{2}y-2x+1$', { color: WARM, size: 16 });
            S.actor('s4-eg-p3', 3.5, 0.5, '$a^{2}-3a+2$',    { color: WARM, size: 18 });
            P.renderCard(
              '<b>整式分类树</b><br>' +
              '整式 → 单项式（$-5$、$3x^{2}$、$4m^{2}n$）<br>' +
              '整式 → 多项式（$a+b$、$3x^{2}y-2x+1$、$a^{2}-3a+2$)',
              'cool'
            );
            return null;
          }
          // 动画：分支逐步出现
          return delay(300).then(function () {
            S.addSegment('s4-line-l', [-0.5, 6.0], [-4.5, 4.5], { color: INK, width: 2, dash: 0 });
            S.addSegment('s4-line-r', [0.5, 6.0],  [4.5, 4.5],  { color: INK, width: 2, dash: 0 });
            S.actor('s4-mono', -5, 4.0, '单项式', { color: TEAL, size: 22, bold: true });
            S.actor('s4-poly',  5, 4.0, '多项式', { color: WARM, size: 22, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s4-eg-m1', -6, 2.5, '$-5$',        { color: TEAL, size: 18 });
            S.actor('s4-eg-m2', -4.5, 1.5, '$3x^{2}$',  { color: TEAL, size: 18 });
            S.actor('s4-eg-m3', -6, 0.5, '$4m^{2}n$',   { color: TEAL, size: 18 });
            return delay(400);
          }).then(function () {
            S.actor('s4-eg-p1', 3.5, 2.5, '$a+b$',           { color: WARM, size: 18 });
            S.actor('s4-eg-p2', 3.5, 1.5, '$3x^{2}y-2x+1$', { color: WARM, size: 16 });
            S.actor('s4-eg-p3', 3.5, 0.5, '$a^{2}-3a+2$',    { color: WARM, size: 18 });
            P.renderCard(
              '<b>整式分类树</b><br>' +
              '整式 → 单项式（$-5$、$3x^{2}$、$4m^{2}n$）<br>' +
              '整式 → 多项式（$a+b$、$3x^{2}y-2x+1$、$a^{2}-3a+2$)',
              'cool'
            );
            return delay(300);
          });
        },
      },
      // Step 3：非整式标注 + 分类判断表
      {
        narration: '树外还有一类——分式。比如 x 分之 2，分母含字母 x，这叫分式，不属于整式。整式只含加减乘和正整数次乘方；分母含字母就超出整式范围。来看一张对比表，巩固分类。',
        enter: function (anim) {
          // 添加非整式标注（红色，树外）
          S.actor('s4-noint', 7.5, 6.0,
            '$\\dfrac{2}{x}$',
            { color: RED, size: 26, bold: true });
          S.actor('s4-noint-label', 7.5, 4.5,
            '分式（非整式）',
            { color: RED, size: 16 });
          S.actor('s4-noint-reason', 7.5, 3.3,
            '分母含字母',
            { color: RED, size: 14 });
          P.renderTable({
            head: ['式子', '类别'],
            rows: [
              ['$-5$',              '单项式（零次）'],
              ['$3a+2b$',          '多项式（一次二项式）'],
              ['$\\dfrac{2}{x}$',  '非整式（分式）'],
              ['$4m^{2}n$',        '单项式（三次）'],
            ],
          });
          P.renderCard(
            '<b>整式范围</b><br>' +
            '整式只含加减乘与正整数次乘方。<br>' +
            '分母含字母 $\\Rightarrow$ 分式 $\\Rightarrow$ <b>不属于整式</b>！',
            'warm'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
