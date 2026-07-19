// s2-model.js  环节二：总量等于各部分和——方程结构分析（3步）
// 数学验算：x+2x+4x，系数1+2+4=7，合并得7x；7x=140，方程结构分析正确 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、总量等于各部分和',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：大字显示方程，三项用颜色区分
      {
        narration: '我们来仔细分析这个方程：x 加 2x 加 4x 等于 140。看左边——这三项有什么共同特点？它们都含有未知数 x，而且 x 的次数都是 1。这就是我们在第二章学过的"同类项"！同类项可以合并。',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.5, '分析方程结构', { color: COOL, size: 20, bold: true });

          // 三项分色显示
          S.actor('s2-t1', -6.5, 3.5, '$x$', { color: WARM, size: 40, bold: true });
          S.actor('s2-plus1', -4.8, 3.5, '+', { color: INK, size: 36 });
          S.actor('s2-t2', -3.0, 3.5, '$2x$', { color: COOL, size: 40, bold: true });
          S.actor('s2-plus2', -0.8, 3.5, '+', { color: INK, size: 36 });
          S.actor('s2-t3', 1.2, 3.5, '$4x$', { color: TEAL, size: 40, bold: true });
          S.actor('s2-eq', 3.6, 3.5, '= 140', { color: INK, size: 36 });

          // 标注"同类项"
          S.actor('s2-lbl', 0, 1.2, '都含 $x$，次数均为 1——同类项！', { color: PURPLE, size: 18 });

          P.renderCard(
            '<b>方程：$x + 2x + 4x = 140$</b><br>' +
            '左边三项特点：<br>' +
            '• 都含未知数 $x$<br>' +
            '• $x$ 的次数都是 <b>1</b><br>' +
            '→ 它们是<b>同类项</b>，可以用第二章的方法合并！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：合并动画——系数逐个高亮，收拢为7x
      {
        narration: '合并同类项：字母 x 不变，系数相加。系数 1 加 2 加 4，等于 7，所以 x 加 2x 加 4x 等于 7x。方程的左边就变成了 7x，等于 140。这一步叫"合并同类项"。',
        enter: function (anim) {
          S.remove('s2-lbl');

          // 显示系数提取过程
          S.actor('s2-coeff', 0, 1.5,
            '系数：$1 + 2 + 4 = 7$',
            { color: PURPLE, size: 22, bold: true });
          S.actor('s2-arrow', 0, 0.0, '↓  合并同类项', { color: TEAL, size: 18 });
          S.actor('s2-result', 0, -1.8,
            '$7x = 140$',
            { color: PURPLE, size: 42, bold: true });

          P.renderCard(
            '<b>合并同类项</b><br>' +
            '$x + 2x + 4x = (1+2+4)x = 7x$<br><br>' +
            '法则：<b>字母不变，系数相加</b><br>' +
            '系数：$1 + 2 + 4 = 7$<br>' +
            '方程化为：$7x = 140$'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：推导链——明确"只做了合并同类项"，下一步再解
      {
        narration: '我们把这两步用推导链展示出来：原方程 x 加 2x 加 4x 等于 140，经过"合并同类项"这一步，得到 7x 等于 140。注意：这一步我们只做了合并，方程还没解出来，下一环节再用等式性质求出 x 的值。',
        enter: function (anim) {
          S.remove('s2-t1'); S.remove('s2-plus1'); S.remove('s2-t2');
          S.remove('s2-plus2'); S.remove('s2-t3'); S.remove('s2-eq');
          S.remove('s2-coeff'); S.remove('s2-arrow'); S.remove('s2-result');

          S.actor('s2-chain1', 0, 3.5,
            '$x + 2x + 4x = 140$',
            { color: INK, size: 26 });
          S.actor('s2-chain-lbl', 0, 2.0,
            '合并同类项',
            { color: TEAL, size: 18 });
          S.actor('s2-chain-arr', 0, 1.0, '↓', { color: TEAL, size: 24 });
          S.actor('s2-chain2', 0, -0.2,
            '$7x = 140$',
            { color: PURPLE, size: 34, bold: true });
          S.actor('s2-next-hint', 0, -2.5,
            '下一步：用等式性质 2 求 $x$',
            { color: WARM, size: 17 });

          P.renderCard(
            '<b>推导链（第一步完成）</b><br>' +
            '$x + 2x + 4x = 140$<br>' +
            '合并同类项 $\\Rightarrow 7x = 140$<br><br>' +
            '本步只做了"合并同类项"，<br>方程变成 $ax=b$ 形式，再用等式性质 2 求解。',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
