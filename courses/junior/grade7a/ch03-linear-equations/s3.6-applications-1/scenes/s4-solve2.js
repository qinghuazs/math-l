// s4-solve2.js  环节四：图书整理求解（4步）
// 数学验算：4x/40 + 8(x+2)/40 = 1 → ×40 → 4x+8(x+2)=40 → 4x+8x+16=40 → 12x=24 → x=2
// 检验：第一阶段=4×2/40=8/40；第二阶段=8×4/40=32/40；合计=(8+32)/40=40/40=1 ✓；x=2正整数 ✓
// 答：最初安排了2人
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32', PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、图书整理求解',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：设元 + 去分母
      {
        narration: '现在来完整解出工程问题。设最初安排 x 人整理图书，x 的单位是"人"。方程是：四十分之4x加四十分之8(x+2)等于1。两边乘以40去掉分母：4x加8乘以(x+2)等于40。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '例2 工程问题·完整解题过程', { color: TEAL, size: 19, bold: true });

          S.actor('s4-set-label', -8, 5.8, '【设】', { color: PURPLE, size: 17, bold: true });
          S.actor('s4-set', 0, 5.8,
            '设最初安排 $x$ 人（单位：人）',
            { color: WARM, size: 17 });

          S.actor('s4-list-label', -8, 4.2, '【列】', { color: PURPLE, size: 17, bold: true });
          S.actor('s4-eq0', 0, 4.2,
            '$\\dfrac{4x}{40} + \\dfrac{8(x+2)}{40} = 1$',
            { color: INK, size: 18 });

          S.actor('s4-step1-label', -8, 2.4, '两边×40', { color: ORANGE, size: 14 });

          var p = anim ? delay(500) : Promise.resolve();
          return p.then(function () {
            S.actor('s4-eq1', 0, 2.4,
              '$4x + 8(x+2) = 40$',
              { color: INK, size: 18 });
            return anim ? delay(400) : Promise.resolve();
          });
        },
      },

      // Step 2：展开合并 → x=2
      {
        narration: '展开括号：8乘以(x+2)等于8x加16。合并同类项：4x加8x等于12x，所以12x加16等于40。移项：12x等于40减16等于24。两边除以12，得 x 等于2！',
        enter: function (anim) {
          S.actor('s4-eq2', 0, 0.8,
            '$4x + 8x + 16 = 40$',
            { color: INK, size: 18 });

          var p = anim ? delay(400) : Promise.resolve();
          return p.then(function () {
            S.actor('s4-eq3', 0, -0.8,
              '$12x + 16 = 40$',
              { color: INK, size: 18 });
            return anim ? delay(400) : Promise.resolve();
          }).then(function () {
            S.actor('s4-eq4', 0, -2.4,
              '$12x = 24$',
              { color: WARM, size: 18 });
            return anim ? delay(400) : Promise.resolve();
          }).then(function () {
            S.actor('s4-x', 0, -4.2,
              '$x = 2$',
              { color: WARM, size: 28, bold: true, css: 'background:#fbe9e7;border:2px solid #e64a19;border-radius:8px;padding:4px 20px;' });
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 3：检验（两关）
      {
        narration: '检验。第一关：代入验算。x等于2时，第一阶段完成：4乘2再除以40，等于四十分之八；第二阶段完成：8乘4再除以40，等于四十分之三十二。合计：八加三十二等于四十，四十分之四十等于1，恰好完成！第二关：x等于2是正整数，满足实际约束。两关都通过！',
        enter: function (anim) {
          S.remove('s4-set-label'); S.remove('s4-set');
          S.remove('s4-list-label'); S.remove('s4-eq0');
          S.remove('s4-step1-label'); S.remove('s4-eq1');
          S.remove('s4-eq2'); S.remove('s4-eq3'); S.remove('s4-eq4');
          S.remove('s4-x');

          S.actor('s4-check-title', 0, 6.2, '【检验】', { color: PURPLE, size: 17, bold: true });
          S.actor('s4-ck1', 0, 4.8,
            '第一阶段：$\\dfrac{4 \\times 2}{40} = \\dfrac{8}{40}$',
            { color: WARM, size: 16 });
          S.actor('s4-ck2', 0, 3.2,
            '第二阶段：$\\dfrac{8 \\times (2+2)}{40} = \\dfrac{32}{40}$',
            { color: COOL, size: 16 });
          S.actor('s4-ck3', 0, 1.6,
            '合计：$\\dfrac{8+32}{40} = \\dfrac{40}{40} = 1$ ✓',
            { color: GREEN, size: 17 });
          S.actor('s4-ck4', 0, 0.2,
            '$x=2$ 为正整数 ✓',
            { color: GREEN, size: 16 });

          P.renderCard(
            '<b>检验（代入 $x=2$）</b><br>' +
            '第一阶段：$\\dfrac{4 \\times 2}{40} = \\dfrac{8}{40}$<br>' +
            '第二阶段：$\\dfrac{8 \\times 4}{40} = \\dfrac{32}{40}$<br>' +
            '合计：$\\dfrac{8+32}{40} = 1$ ✓，$x=2$ 正整数 ✓',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：作答 + 两题对比表
      {
        narration: '答：最初安排了2人整理图书。现在我们用一张对比表把两类题型并排呈现，帮大家理清异同。配套问题的核心等量关系是"B数量等于配套比乘以A数量"；工程问题的核心等量关系是"各阶段工作量之和等于1"。两个不同的等量关系，但解题框架是一样的——都是"设、列、解、验、答"。',
        enter: function (anim) {
          S.remove('s4-check-title');
          S.remove('s4-ck1'); S.remove('s4-ck2'); S.remove('s4-ck3'); S.remove('s4-ck4');

          S.actor('s4-ans-label', 0, 6.8, '【答】', { color: PURPLE, size: 17, bold: true });
          S.actor('s4-ans', 0, 5.4,
            '最初安排了 <b>2</b> 人整理图书',
            { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>答：最初安排了2人整理图书。</b>',
            'warm', 'tada'
          );

          var p = anim ? delay(600) : Promise.resolve();
          return p.then(function () {
            P.renderTable({
              head: ['题型', '未知数', '核心等量关系', '关键条件'],
              rows: [
                ['配套问题', '生产某种零件的人数', 'B数量 = 配套比 × A数量', '恰好配套，不浪费'],
                ['工程问题', '初始人数（或合作天数）', '各阶段工作量之和 = 1', '总量规定为1，效率=1/总时间']
              ]
            });
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
