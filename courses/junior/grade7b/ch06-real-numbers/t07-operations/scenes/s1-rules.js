(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', BLUE = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、运算法则迁移',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们好！我们已经学过有理数的运算律，今天先来确认一件重要的事：这些运算律在<b>实数范围</b>内是否还成立？答案是肯定的——完全适用！',
        enter: function () {
          P.renderCard(
            '<b>实数的运算</b><br>' +
            '实数包括有理数和无理数。<br>' +
            '在实数范围内，可以进行：<br>' +
            '加法 · 减法 · 乘法 · 除法（除数 ≠ 0）· 乘方 · 开方',
            'cool'
          );
          S.actor('s1-title', 0, 5.5, '有理数的运算律在实数范围内仍然适用', { size: 22, bold: true, color: BLUE });
        },
      },
      {
        narration: '我们把五条运算律列出来，这些规则你都很熟悉——以后遇到含根号的实数时，照样可以用这些律来化简计算，不必担心根号会"破坏"规则。',
        enter: function (anim) {
          var rows = [
            ['s1-r1', '加法交换律：$a+b=b+a$', INK, 20],
            ['s1-r2', '加法结合律：$(a+b)+c=a+(b+c)$', INK, 20],
            ['s1-r3', '乘法交换律：$a\\times b=b\\times a$', INK, 20],
            ['s1-r4', '乘法结合律：$(a\\times b)\\times c=a\\times(b\\times c)$', INK, 20],
            ['s1-r5', '乘法分配律：$a\\times(b+c)=a\\times b+a\\times c$', GREEN, 20],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(r[0], 0, 3.5 - i * 2.0, r[1], { color: r[2], size: r[3] });
              return anim ? delay(400) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '有一个重要的直觉：计算含根号的实数时，可以把根号整体"当作一个字母"来看待。比如 $\\sqrt{3}$ 就像字母 $a$ 一样，适用所有的代数运算规则。这个思想会贯穿今天的全部内容，请牢记！',
        enter: function () {
          P.renderTable({
            head: ['把根号当"字母"的直觉', '字母写法', '根号写法'],
            rows: [
              ['同类项合并', '$2a+3a=5a$', '$2\\sqrt{3}+3\\sqrt{3}=5\\sqrt{3}$'],
              ['提公因式', '$a\\cdot b+a\\cdot c=a(b+c)$', '$\\sqrt{2}\\cdot3+\\sqrt{2}\\cdot5=\\sqrt{2}\\cdot8$'],
              ['不能合并', '$a+b$（不同字母）', '$\\sqrt{2}+\\sqrt{3}$（不同根号）'],
            ],
          });
          S.actor('s1-hint', 0, 1.5, '根号 = 字母：同类才能合并！', { size: 22, bold: true, color: PURPLE });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
