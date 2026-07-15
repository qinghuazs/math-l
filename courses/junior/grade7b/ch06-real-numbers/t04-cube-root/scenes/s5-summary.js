(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';
  var INK = '#455a64', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、对比与小结',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：平方根 vs 立方根对照表（四行）
        narration: '我们来系统对比平方根和立方根。请看这张对照表，注意四个方面的异同：被开方数的范围、根的个数、符号写法、与哪种运算互逆。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s5-title', 0, 9.2,
            '平方根与立方根对比总结', { color: INK, size: 20, anchorX: 'middle' });

          P.renderTable({
            head: ['比较项目', '平方根 $\\sqrt{a}$', '立方根 $\\sqrt[3]{a}$'],
            rows: [
              [
                '被开方数范围',
                '$a \\geq 0$（负数无意义）',
                '$a$ 为任意实数'
              ],
              [
                '根的个数',
                '正数有 $2$ 个，$0$ 有 $1$ 个，负数 $0$ 个',
                '任意数都有且仅有 $1$ 个'
              ],
              [
                '符号',
                '$\\sqrt{a}$（算术平方根取正值）',
                '$\\sqrt[3]{a}$（正负由 $a$ 决定）'
              ],
              [
                '互逆运算',
                '与<b>平方</b>互逆：$(\\sqrt{a})^2 = a$',
                '与<b>立方</b>互逆：$(\\sqrt[3]{a})^3 = a$'
              ],
            ]
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：易错卡
        narration: '学完立方根，有几个常见易错点要特别注意。听老师来讲解。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s5-title', 0, 9.2,
            '易错点提醒', { color: WARM, size: 22, anchorX: 'middle' });

          S.addText('s5-e1', -5.5, 7.8,
            '❌ 误区 1：认为负数没有立方根', { color: WARM, size: 15 });
          S.addText('s5-e1c', -5.5, 6.9,
            '✅ 正确：负数有立方根，且为负数', { color: GREEN, size: 15 });

          S.addText('s5-e2', -5.5, 5.6,
            '❌ 误区 2：把立方根写成 $\\pm$ 形式', { color: WARM, size: 15 });
          S.addText('s5-e2c', -5.5, 4.7,
            '✅ 正确：立方根唯一，<b>不写</b> $\\pm$', { color: GREEN, size: 15 });
          S.addText('s5-e2ex', -5.5, 3.9,
            '例：$\\sqrt[3]{8} = 2$（而非 $\\pm 2$）', { color: COOL, size: 14 });

          S.addText('s5-e3', -5.5, 2.8,
            '❌ 误区 3：与平方根混淆，漏写指标 $3$', { color: WARM, size: 15 });
          S.addText('s5-e3c', -5.5, 1.9,
            '✅ 正确：$\\sqrt[3]{a}$ 的指标 $3$ 不能省略', { color: GREEN, size: 15 });

          S.addText('s5-e4', -5.5, 0.8,
            '❌ 误区 4：忘记 $(\\sqrt[3]{a})^3 = a$', { color: WARM, size: 15 });
          S.addText('s5-e4c', -5.5, -0.1,
            '✅ 正确：$(\\sqrt[3]{5})^3 = 5$（开方与立方互逆）', { color: GREEN, size: 15 });

          P.renderCard(
            '<b>易错速查</b><br>' +
            '① 负数有立方根<br>' +
            '② 立方根唯一，不加 $\\pm$<br>' +
            '③ 指标 3 不省略<br>' +
            '④ $(\\sqrt[3]{a})^3 = a$',
            'warm', 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：课堂小结
        narration: '好，这节课我们系统学习了立方根。核心要点记住：定义——$x^3 = a$ 的解就是 $a$ 的立方根，记作 $\\sqrt[3]{a}$；唯一性——任何实数都有且只有一个立方根；性质——正数的立方根是正数，负数的立方根是负数，零的立方根是零；以及 $\\sqrt[3]{-a} = -\\sqrt[3]{a}$。下节课我们将进入实数的认识，期待大家继续探索！',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s5-title', 0, 9.2,
            '本节课小结', { color: INK, size: 22, anchorX: 'middle' });

          S.addText('s5-k1', -5.5, 7.8,
            '① <b>定义</b>：$x^3 = a \\Rightarrow x = \\sqrt[3]{a}$（$a$ 的立方根）',
            { color: COOL, size: 16 });
          S.addText('s5-k2', -5.5, 6.4,
            '② <b>唯一性</b>：每个实数有且仅有一个立方根',
            { color: COOL, size: 16 });
          S.addText('s5-k3', -5.5, 5.0,
            '③ <b>符号</b>：正 → 正，负 → 负，零 → 零',
            { color: COOL, size: 16 });
          S.addText('s5-k4', -5.5, 3.6,
            '④ <b>性质</b>：$\\sqrt[3]{-a} = -\\sqrt[3]{a}$，$(\\sqrt[3]{a})^3 = a$',
            { color: COOL, size: 16 });
          S.addText('s5-k5', -5.5, 2.2,
            '⑤ <b>开立方</b>与<b>立方</b>互为逆运算',
            { color: COOL, size: 16 });

          P.renderCard(
            '<b>本节重点</b><br>' +
            '$\\sqrt[3]{a}$ 的定义与性质<br>' +
            '任何实数都有唯一立方根<br>' +
            '与平方根的本质区别',
            'cool', 'flipInX'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
