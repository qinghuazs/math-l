// s1-intro.js  环节一：和差要打包（3步）
// 数学验算：(2x-3y)+(5x+4y) = 2x+5x + (-3y+4y) = 7x+y  ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、和差要打包',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：提出问题——求两个多项式的和要先打包
      {
        narration: '同学们，我们先来看两个多项式：2x减3y，还有5x加4y。现在要求它们的和。直接写 2x减3y加5x加4y，行不行？求和还好，但如果要求差，直接写就会出错——减号只管第一项，后面各项都不变号。所以，规范做法是：先给每个多项式用括号"打包"，再去括号、再合并同类项。这就是今天的核心规则：求和差，先打包！',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.0, '求两式的和：先打包！', { color: COOL, size: 22, bold: true });
          S.actor('s1-p1', -3.5, 5.0, '$2x - 3y$', { color: WARM, size: 24 });
          S.actor('s1-plus', 0, 5.0, '和', { color: INK, size: 20 });
          S.actor('s1-p2', 3.5, 5.0, '$5x + 4y$', { color: COOL, size: 24 });
          S.actor('s1-rule', 0, 2.8,
            '规范列式：$(2x - 3y) + (5x + 4y)$',
            { color: TEAL, size: 20 });
          S.actor('s1-hint', 0, 1.2,
            '每个多项式先用括号"打包"',
            { color: GRAY, size: 17 });
          P.renderCard(
            '<b>求两多项式的和</b><br>' +
            '两式：$2x - 3y$ 与 $5x + 4y$<br>' +
            '规范写法：先用括号打包每个多项式，<br>' +
            '$(2x - 3y) + (5x + 4y)$<br>' +
            '再去括号，再合并同类项。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：去括号展开
      {
        narration: '打包之后，第一步去括号。加号括号里各项符号不变，所以 $(2x-3y)+(5x+4y)$ 去掉括号就得到 $2x-3y+5x+4y$。加号前的括号直接去掉，每项符号原封不动。现在四项全部展开在一行里了。',
        enter: function (anim) {
          S.remove('s1-hint');
          S.actor('s1-step1-label', -9, 0.0, '第一步：去括号', { color: TEAL, size: 18, bold: true });
          S.actor('s1-expand', 0, 0.0,
            '$= 2x - 3y + 5x + 4y$',
            { color: INK, size: 22 });
          S.actor('s1-note', 0, -1.6,
            '加号括号，各项符号不变',
            { color: GRAY, size: 16 });
          P.renderCard(
            '<b>第一步：去括号</b><br>' +
            '$(2x - 3y) + (5x + 4y)$<br>' +
            '$= 2x - 3y + 5x + 4y$<br>' +
            '加号前括号：各项符号<b>不变</b>。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：合并同类项，得结果
      {
        narration: '第二步合并同类项。x 项：2x 加 5x 等于 7x；y 项：负3y 加 4y 等于 y。最终结果是 7x 加 y。两步完成！打包→去括号→合并同类项，这就是整式加减的完整路径。',
        enter: function (anim) {
          S.remove('s1-note');
          S.actor('s1-step2-label', -9, -2.5, '第二步：合并同类项', { color: WARM, size: 18, bold: true });
          S.actor('s1-xterm', -3.5, -2.5,
            '$x$ 项：$2x + 5x = 7x$',
            { color: COOL, size: 18 });
          S.actor('s1-yterm', 3.5, -2.5,
            '$y$ 项：$-3y + 4y = y$',
            { color: WARM, size: 18 });
          S.actor('s1-result', 0, -4.5,
            '$= 7x + y$',
            { color: GREEN, size: 26, bold: true });
          P.renderCard(
            '<b>第二步：合并同类项</b><br>' +
            '$x$ 项：$2x + 5x = 7x$<br>' +
            '$y$ 项：$-3y + 4y = y$<br>' +
            '最终结果：$7x + y$',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
