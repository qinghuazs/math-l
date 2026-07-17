// s5-order.js  五、混合运算顺序（4步）
// 数学验算：
//   例一：2×(-3)^2 - 4×(-3) + 15
//       = 2×9 - (-12) + 15
//       = 18 + 12 + 15 = 45
//   例二：(-3)^2 - (-2)^3
//       = 9 - (-8)
//       = 9 + 8 = 17
//   练习：(-1/2)^2 × (-4)^3 + 3
//       = (1/4) × (-64) + 3
//       = -16 + 3 = -13
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
    id: 's5',
    title: '五、混合运算顺序',
    bbox: [-10, 9, 10, -9],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：运算顺序金字塔
      {
        narration: '有了乘方，五种运算全齐了。运算顺序有个金字塔：顶层最先算——乘方；中层其次——乘除（同级从左到右）；底层最后——加减（同级从左到右）；括号里的无论什么，都要最先算！这就是终极运算总章程。',
        enter: function (anim) {
          // 金字塔三层梯形（用多边形模拟）
          // 顶层
          S.addPolygon('s5-top', [[-1.5, 7], [1.5, 7], [2.5, 5.2], [-2.5, 5.2]],
            { color: WARM, opacity: 0.25, borderColor: WARM, borderWidth: 2 });
          S.actor('s5-top-txt', 0, 6.15, '<b>乘方</b>（最优先）', { color: WARM, size: 17 });

          // 中层
          S.addPolygon('s5-mid', [[-2.5, 5.0], [2.5, 5.0], [4.0, 3.2], [-4.0, 3.2]],
            { color: COOL, opacity: 0.18, borderColor: COOL, borderWidth: 2 });
          S.actor('s5-mid-txt', 0, 4.1, '<b>乘除</b>（同级从左到右）', { color: COOL, size: 16 });

          // 底层
          S.addPolygon('s5-bot', [[-4.0, 3.0], [4.0, 3.0], [6.0, 1.2], [-6.0, 1.2]],
            { color: TEAL, opacity: 0.15, borderColor: TEAL, borderWidth: 2 });
          S.actor('s5-bot-txt', 0, 2.1, '<b>加减</b>（同级从左到右）', { color: TEAL, size: 16 });

          // 括号说明
          S.actor('s5-bracket', 0, -0.2,
            '括号内：无论什么运算都 <b>最先</b> 算',
            { color: ORANGE, size: 17 });

          S.actor('s5-charter', 0, -2.0,
            '总章程：乘方 $\\succ$ 乘除 $\\succ$ 加减；括号优先',
            { color: INK, size: 15 });

          P.renderCard(
            '<b>混合运算总章程</b><br>' +
            '① 先算 <b>乘方</b><br>' +
            '② 再算 <b>乘除</b>（同级从左到右）<br>' +
            '③ 后算 <b>加减</b>（同级从左到右）<br>' +
            '④ 有括号 → <b>括号内优先</b>'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：例一 2×(-3)^2 - 4×(-3) + 15 = 45
      {
        narration: '用总章程做例一：2乘以(-3)的平方，减去4乘以(-3)，再加15。第一步先算乘方：(-3)的平方等于9。第二步算乘法：2×9=18，4×(-3)=-12。第三步算加减：18 减 (-12) 再加15，等于 18+12+15=45！',
        enter: function (anim) {
          S.remove('s5-top'); S.remove('s5-mid'); S.remove('s5-bot');
          S.remove('s5-top-txt'); S.remove('s5-mid-txt'); S.remove('s5-bot-txt');
          S.remove('s5-bracket'); S.remove('s5-charter');

          S.actor('s5-e1-title', 0, 8.0, '<b>例一</b>', { color: COOL, size: 19 });
          S.actor('s5-e1-q', 0, 6.8,
            '$2 \\times (-3)^{2} - 4 \\times (-3) + 15$',
            { color: INK, size: 20 });

          S.actor('s5-e1-ann', 0, 5.5,
            '↑ 第一步：先算乘方 $(-3)^{2}=9$',
            { color: WARM, size: 15 });

          S.actor('s5-e1-s1', 0, 4.2,
            '$= 2 \\times 9 - 4 \\times (-3) + 15$',
            { color: INK, size: 19 });
          S.actor('s5-e1-ann2', 0, 3.0,
            '↑ 第二步：算乘法 $2\\times9=18$，$4\\times(-3)=-12$',
            { color: COOL, size: 15 });

          S.actor('s5-e1-s2', 0, 1.8,
            '$= 18 - (-12) + 15$',
            { color: INK, size: 19 });

          S.actor('s5-e1-s3', 0, 0.5,
            '$= 18 + 12 + 15$',
            { color: INK, size: 19 });

          S.actor('s5-e1-ans', 0, -1.0,
            '$= \\mathbf{45}$',
            { color: GREEN, size: 26 });

          P.renderCard(
            '<b>例一分步板书</b><br>' +
            '$2\\times(-3)^{2}-4\\times(-3)+15$<br>' +
            '$=2\\times9-4\\times(-3)+15$（先算乘方）<br>' +
            '$=18+12+15$（再算乘法）<br>' +
            '$=\\mathbf{45}$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：例二 (-3)^2 - (-2)^3 = 17
      {
        narration: '例二：(-3)的平方减去(-2)的立方。先算两个乘方：(-3)的平方是正9；(-2)的立方，奇次幂，是负8。然后9减去(-8)，减负变加正，等于9加8等于17！',
        enter: function (anim) {
          S.remove('s5-e1-title'); S.remove('s5-e1-q'); S.remove('s5-e1-ann');
          S.remove('s5-e1-s1'); S.remove('s5-e1-ann2');
          S.remove('s5-e1-s2'); S.remove('s5-e1-s3'); S.remove('s5-e1-ans');

          S.actor('s5-e2-title', 0, 8.0, '<b>例二</b>', { color: COOL, size: 19 });
          S.actor('s5-e2-q', 0, 6.8,
            '$(-3)^{2} - (-2)^{3}$',
            { color: INK, size: 22 });

          S.actor('s5-e2-ann1', -4, 5.5,
            '$(-3)^{2}=9$（偶次正）',
            { color: TEAL, size: 16 });
          S.actor('s5-e2-ann2', 4, 5.5,
            '$(-2)^{3}=-8$（奇次负）',
            { color: WARM, size: 16 });

          S.actor('s5-e2-s1', 0, 4.0,
            '$= 9 - (-8)$',
            { color: INK, size: 22 });
          S.actor('s5-e2-ann3', 0, 2.8,
            '减负变加正：$-(-8) = +8$',
            { color: COOL, size: 15 });

          S.actor('s5-e2-s2', 0, 1.5,
            '$= 9 + 8$',
            { color: INK, size: 22 });
          S.actor('s5-e2-ans', 0, 0.0,
            '$= \\mathbf{17}$',
            { color: GREEN, size: 28 });

          P.renderCard(
            '<b>例二分步板书</b><br>' +
            '$(-3)^{2}-(-2)^{3}$<br>' +
            '$=9-(-8)$（先算乘方）<br>' +
            '$=9+8$（减负变加）<br>' +
            '$=\\mathbf{17}$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：学生练习揭晓 (-1/2)^2 × (-4)^3 + 3 = -13
      {
        narration: '轮到你了！独立计算：负二分之一的平方，乘以负4的立方，再加3。先算两个乘方：(-1/2)的平方等于 四分之一；(-4)的立方，奇次幂负，等于 -64。再算乘法：四分之一乘以 -64 等于 -16。最后加3，等于 -13！',
        enter: function (anim) {
          S.remove('s5-e2-title'); S.remove('s5-e2-q'); S.remove('s5-e2-ann1'); S.remove('s5-e2-ann2');
          S.remove('s5-e2-s1'); S.remove('s5-e2-ann3');
          S.remove('s5-e2-s2'); S.remove('s5-e2-ans');

          S.actor('s5-ex-title', 0, 8.0, '<b>学生练习·揭晓</b>', { color: WARM, size: 19 });
          S.actor('s5-ex-q', 0, 6.8,
            '$\\left(-\\dfrac{1}{2}\\right)^{2} \\times (-4)^{3} + 3$',
            { color: INK, size: 20 });

          S.actor('s5-ex-ann1', -4, 5.3,
            '$\\left(-\\dfrac{1}{2}\\right)^{2}=\\dfrac{1}{4}$',
            { color: TEAL, size: 16 });
          S.actor('s5-ex-ann2', 4, 5.3,
            '$(-4)^{3}=-64$',
            { color: WARM, size: 16 });

          S.actor('s5-ex-s1', 0, 3.8,
            '$= \\dfrac{1}{4} \\times (-64) + 3$',
            { color: INK, size: 19 });
          S.actor('s5-ex-ann3', 0, 2.5,
            '$\\dfrac{1}{4} \\times (-64) = -16$',
            { color: COOL, size: 15 });

          S.actor('s5-ex-s2', 0, 1.2,
            '$= -16 + 3$',
            { color: INK, size: 22 });
          S.actor('s5-ex-ans', 0, -0.5,
            '$= \\mathbf{-13}$',
            { color: GREEN, size: 28 });

          S.actor('s5-ex-check', 0, -2.5,
            '综合了分数底数 + 负数底数 + 运算顺序，全部搞定！',
            { color: TEAL, size: 14 });

          P.renderCard(
            '<b>练习分步板书</b><br>' +
            '$\\left(-\\dfrac{1}{2}\\right)^{2}\\times(-4)^{3}+3$<br>' +
            '$=\\dfrac{1}{4}\\times(-64)+3$（先算乘方）<br>' +
            '$=-16+3$（再算乘法）<br>' +
            '$=\\mathbf{-13}$',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
