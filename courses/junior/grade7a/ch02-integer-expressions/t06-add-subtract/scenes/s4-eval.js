// s4-eval.js  环节四：化简求值——先化简省大力气（4步）
// 数学验算：(2x²-x+3)-(x²-x+1)
//   去括号：2x²-x+3-x²+x-1
//   x² 项：2x²-x²=x²；x 项：-x+x=0（消失）；常数项：3-1=2
//   化简结果：x²+2
//   x=-2 代入：(-2)²+2=4+2=6  ✓
// 直接代入验算：(2×4-(-2)+3)-(4-(-2)+1)=(8+2+3)-(4+2+1)=13-7=6  ✓（两路结果一致）
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、化简求值',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：出示例题，展示法一（先代入硬算）
      {
        narration: '这道例题有两条解题路线。例题是：化简 括号2x²减x加3，减去括号x²减x加1，并在 x等于负2 时求值。法一直接代入：把 x等于负2 代进原式，要算两组括号，每组里面都有 x的平方。2乘4是8，加负负2即加2，再加3，第一组是13；4加2加1等于7；13减7等于6。步骤多，数字大，哪步容易算错？',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '化简求值：两条路的对比', { color: COOL, size: 21, bold: true });
          S.actor('s4-origin', 0, 5.8,
            '$(2x^{2} - x + 3) - (x^{2} - x + 1)$，$x = -2$ 时求值',
            { color: INK, size: 19 });
          // 分隔线
          S.addSegment('s4-split', [0, 5.0], [0, -7.5], { color: GRAY, width: 1, dash: 2 });
          // 法一标题
          S.actor('s4-m1-title', -5, 4.3, '法一：直接代入', { color: RED, size: 19, bold: true });
          S.actor('s4-m1-sub', -5, 3.2,
            '$(2 \\times 4 + 2 + 3)$',
            { color: RED, size: 17 });
          S.actor('s4-m1-sub2', -5, 2.1,
            '$- (4 + 2 + 1)$',
            { color: RED, size: 17 });
          S.actor('s4-m1-mid', -5, 0.9, '$= 13 - 7$', { color: RED, size: 18 });
          S.actor('s4-m1-ans', -5, -0.2, '$= 6$', { color: RED, size: 22, bold: true });
          S.actor('s4-m1-note', -5, -1.5, '步骤多，数字大', { color: GRAY, size: 15 });
          P.renderCard(
            '<b>法一：直接代入</b><br>' +
            '$x = -2$ 代入原式：$x^{2} = 4$<br>' +
            '$(2 \\times 4 + 2 + 3) - (4 + 2 + 1)$<br>' +
            '$= 13 - 7 = 6$<br>' +
            '步骤多，数字大，容易出错。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：法二——先去括号化简
      {
        narration: '法二：先化简再代入。第一步去括号：加号括号符号不变，减号括号各项变号。展开得 2x²减x加3减x²加x减1——注意第二个括号里 负x变正x，正1变负1。合并：x²项 2x²减x²等于x²；x项 负x加x等于0，x项再次消失！常数项 3减1等于2。化简结果：x²加2，简洁多了！',
        enter: function (anim) {
          // 法二标题和步骤（右侧）
          S.actor('s4-m2-title', 5, 4.3, '法二：先化简', { color: TEAL, size: 19, bold: true });
          S.actor('s4-m2-step1', 5, 3.2,
            '$= 2x^{2} - x + 3 - x^{2} + x - 1$',
            { color: INK, size: 16 });
          S.actor('s4-m2-x2', 5, 2.0,
            '$x^{2}$ 项：$2x^{2} - x^{2} = x^{2}$',
            { color: COOL, size: 16 });
          S.actor('s4-m2-x', 5, 1.0,
            '$x$ 项：$-x + x = 0$（消失！）',
            { color: COOL, size: 16 });
          S.actor('s4-m2-const', 5, 0.0,
            '常数项：$3 - 1 = 2$',
            { color: COOL, size: 16 });
          S.actor('s4-m2-simp', 5, -1.2,
            '化简结果：$x^{2} + 2$',
            { color: GREEN, size: 20, bold: true });
          P.renderCard(
            '<b>法二：先化简</b><br>' +
            '去括号：$2x^{2} - x + 3 - x^{2} + x - 1$<br>' +
            '$x^{2}$ 项：$2x^{2} - x^{2} = x^{2}$<br>' +
            '$x$ 项：$-x + x = 0$（消失！）<br>' +
            '常数项：$3 - 1 = 2$<br>' +
            '化简结果：$x^{2} + 2$'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：法二代入 x=-2，得 6；两法对比结论
      {
        narration: '化简后，x²加2，再代入 x等于负2：负2的平方等于4，加2等于6。一步代入，结果完全一样，但简单太多！法二只需一步代入，法一却要算两组大括号。同学们，化简求值的正确顺序是：先化简，再代入，事半功倍！',
        enter: function (anim) {
          S.actor('s4-m2-sub', 5, -2.4,
            '$x = -2$：$(-2)^{2} + 2 = 4 + 2 = 6$',
            { color: GREEN, size: 18 });
          S.actor('s4-m2-ans', 5, -3.5, '$= 6$', { color: GREEN, size: 22, bold: true });
          // 底部对比结论
          S.actor('s4-concl', 0, -5.2,
            '两法结果相同，但法二仅需一步代入！',
            { color: TEAL, size: 18, bold: true });
          P.renderCard(
            '<b>法二代入</b><br>' +
            '$x = -2$：$(-2)^{2} + 2 = 4 + 2 = 6$<br>' +
            '两法结果均为 $6$，但法二简单得多！',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：结论卡——先化简再代入
      {
        narration: '记住这句话：化简求值，先化简，再代入！先把式子整理到最简，字母越少、指数越低，代入时就越不容易出错。这是一种"化繁为简"的数学思维习惯，以后在更复杂的运算里，这个习惯会帮你省下大量时间。',
        enter: function (anim) {
          S.remove('s4-m1-title'); S.remove('s4-m1-sub'); S.remove('s4-m1-sub2');
          S.remove('s4-m1-mid'); S.remove('s4-m1-ans'); S.remove('s4-m1-note');
          S.remove('s4-m2-title'); S.remove('s4-m2-step1'); S.remove('s4-m2-x2');
          S.remove('s4-m2-x'); S.remove('s4-m2-const'); S.remove('s4-m2-simp');
          S.remove('s4-m2-sub'); S.remove('s4-m2-ans'); S.remove('s4-concl');
          S.remove('s4-split');
          S.actor('s4-final-title', 0, 3.5, '化简求值的正确顺序', { color: TEAL, size: 24, bold: true });
          S.actor('s4-step-a', 0, 1.8,
            '① 先化简代数式',
            { color: COOL, size: 22 });
          S.actor('s4-arrow', 0, 0.6, '↓', { color: INK, size: 24 });
          S.actor('s4-step-b', 0, -0.6,
            '② 再代入数值求值',
            { color: WARM, size: 22 });
          S.actor('s4-motto', 0, -2.5,
            '先化简，再代入——事半功倍！',
            { color: GREEN, size: 20, bold: true });
          P.renderCard(
            '<b>化简求值口诀</b><br>' +
            '① 先把代数式化到最简<br>' +
            '② 再把数值代入计算<br>' +
            '先化简，再代入，事半功倍！',
            'cool',
            'headShake'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
