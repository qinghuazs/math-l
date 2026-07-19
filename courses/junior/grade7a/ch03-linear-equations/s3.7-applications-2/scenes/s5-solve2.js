// s5-solve2.js  环节五：求解与检验——规范完整呈现（3步）
// 数学验算：2x+1×(22-x)=40 → 2x+22-x=40 → x=40-22=18（场）
// 检验1（数值）：2×18+(22-18)=36+4=40 ✓
// 检验2（情境）：胜18场、负4场；18≥0 ✓，4≥0 ✓，18+4=22 ✓，均为非负整数 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、求解与检验',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：逐步解方程
      {
        narration: '我们来解方程 2x 加 1 乘以（22 减 x）等于 40。第一步，去括号：2x 加 22 减 x 等于 40。第二步，合并同类项：x 加 22 等于 40。第三步，移项：x 等于 40 减 22。第四步，计算：x 等于 18 场！',
        enter: function (anim) {
          S.actor('s5-eq-title', 0, 6.8, '解方程', { color: TEAL, size: 20, bold: true });

          var steps = [
            ['s5-step0', 0, 5.4,  '$2x + 1 \\times (22 - x) = 40$', INK],
            ['s5-step1', 0, 4.1,  '$2x + 22 - x = 40$', COOL],
            ['s5-step2', 0, 2.8,  '$x + 22 = 40$', COOL],
            ['s5-step3', 0, 1.5,  '$x = 40 - 22$', WARM],
            ['s5-step4', 0, 0.1,  '$x = 18$（场）', WARM],
          ];

          var p = Promise.resolve();
          steps.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[3], size: 19, bold: it[3] === WARM });
              return anim ? delay(500) : Promise.resolve();
            });
          });

          return p.then(function () {
            P.renderCard(
              '<b>解方程步骤</b><br>' +
              '$2x + 1 \\times (22-x) = 40$<br>' +
              '$\\Rightarrow 2x + 22 - x = 40$<br>' +
              '$\\Rightarrow x = 40 - 22$<br>' +
              '$\\Rightarrow x = \\mathbf{18}$ 场'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 2：两步检验——数值检验 + 情境检验
      {
        narration: '解出 x 等于 18，别急，先检验！检验分两步。第一步，数值检验：把 x 等于 18 代回方程左边，2 乘以 18 加（22 减 18）等于 36 加 4 等于 40，等于右边，正确！第二步，情境检验：胜 18 场，负 4 场，两者都是非负整数，且 18 加 4 等于 22，符合总场数约束，情境合理！',
        enter: function (anim) {
          S.remove('s5-eq-title');
          S.remove('s5-step0'); S.remove('s5-step1'); S.remove('s5-step2');
          S.remove('s5-step3'); S.remove('s5-step4');

          S.actor('s5-check-title', 0, 6.8, '两步检验', { color: TEAL, size: 20, bold: true });

          S.actor('s5-chk1-h', -4.5, 5.4, '第一步：数值检验', { color: GREEN, size: 17, bold: true });
          var chk1rows = [
            ['s5-chk1-r1', -4.5, 4.2, '代入 $x=18$：', INK],
            ['s5-chk1-r2', -4.5, 3.0, '$2 \\times 18 + (22-18)$', INK],
            ['s5-chk1-r3', -4.5, 1.8, '$= 36 + 4 = 40$ ✓', GREEN],
          ];

          S.actor('s5-chk2-h', 4.5, 5.4, '第二步：情境检验', { color: COOL, size: 17, bold: true });
          var chk2rows = [
            ['s5-chk2-r1', 4.5, 4.2, '胜 18 场 $\\geq 0$ ✓', INK],
            ['s5-chk2-r2', 4.5, 3.0, '负 4 场 $\\geq 0$ ✓', INK],
            ['s5-chk2-r3', 4.5, 1.8, '$18 + 4 = 22$ ✓', COOL],
          ];

          var p = Promise.resolve();
          chk1rows.concat(chk2rows).forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[3], size: 16 });
              return anim ? delay(350) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.addSegment('s5-chk-div', [0, 6.0], [0, 0.8], { color: GRAY, width: 1, dash: 2 });
            P.renderCard(
              '<b>两步检验</b><br>' +
              '数值：$2 \\times 18 + 4 = 40$ ✓<br>' +
              '情境：胜 18 场、负 4 场，均非负整数，$18+4=22$ ✓<br>' +
              '两步都通过，答案有效！',
              'teal', 'tada'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 3：规范作答 + 追问
      {
        narration: '规范作答：该队胜了 18 场，负了 4 场。注意：答案要包含"负了 4 场"，不只是"胜了 18 场"，因为题目的完整信息在这里。最后我问一个问题：如果算出来 x 等于 23，合理吗？——不合理，总场数才 22 场，不可能胜 23 场。所以情境检验非常必要！',
        enter: function (anim) {
          S.remove('s5-check-title');
          S.remove('s5-chk1-h'); S.remove('s5-chk1-r1'); S.remove('s5-chk1-r2'); S.remove('s5-chk1-r3');
          S.remove('s5-chk2-h'); S.remove('s5-chk2-r1'); S.remove('s5-chk2-r2'); S.remove('s5-chk2-r3');
          S.remove('s5-chk-div');

          S.actor('s5-ans-big', 0, 5.6,
            '该队胜了 18 场，负了 4 场。',
            { color: GREEN, size: 22, bold: true });

          S.actor('s5-note', 0, 3.8,
            '答案要同时写出胜场数和负场数！',
            { color: TEAL, size: 17 });

          S.actor('s5-ask', 0, 2.2,
            '追问：若算出 $x=23$，合理吗？',
            { color: WARM, size: 16 });
          S.actor('s5-ask-ans', 0, 1.0,
            '不合理！总场数才 22 场，$x$ 不能超过 22。',
            { color: WARM, size: 15 });
          S.actor('s5-ask-note', 0, -0.2,
            '情境检验就是为了发现这类错误！',
            { color: ORANGE, size: 15, bold: true });

          P.renderCard(
            '<b>规范作答</b>：该队胜了 <b>18 场</b>，负了 <b>4 场</b>。<br>' +
            '追问：若 $x=23$，不合理——总场数只有 22 场。<br>' +
            '情境检验：发现超出现实范围的错误！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
