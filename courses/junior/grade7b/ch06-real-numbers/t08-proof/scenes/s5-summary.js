// s5-summary.js  小结（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';
  var CYAN   = '#00838f';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：反证法三步回顾 + 本课证明要点
        narration: '最后，我们来回顾今天这节课的核心内容。第一，我们学习了<b>反证法</b>的思想——三步走：假设反面、严格推理、发现矛盾。第二，我们用反证法严格证明了 $\\sqrt{2}$ 不是有理数：假设 $\\sqrt{2} = \\dfrac{p}{q}$（$p,q$ 互质），两边平方得 $p^2 = 2q^2$，推出 $p$ 是偶数，再设 $p = 2m$ 代入推出 $q$ 也是偶数，从而 $p,q$ 有公因数 2，与互质矛盾！反证法是数学推理的利器，同学们要好好掌握。',
        enter: function (anim) {
          // 反证法三步（左侧竖向）
          S.addPolygon('rc-title-bg',
            [[-9.8, 7.3], [0.5, 7.3], [0.5, 6.3], [-9.8, 6.3]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('rc-title', -4.65, 6.9,
            '反证法三步',
            { size: 17, color: GREEN, anchorX: 'middle' });

          // 步骤1
          S.addPolygon('rc1-bg',
            [[-9.8, 5.9], [0.5, 5.9], [0.5, 4.5], [-9.8, 4.5]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('rc1-t', -4.65, 5.35,
            '① 假设结论的反面成立',
            { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('rc1-s', -4.65, 4.75,
            '（设 $\\sqrt{2}$ 是有理数，写成 $\\frac{p}{q}$，$p,q$ 互质）',
            { size: 12, color: INK, anchorX: 'middle' });

          S.addText('rc-arr1', -4.65, 4.1, '↓', { size: 20, color: INK, anchorX: 'middle' });

          // 步骤2
          S.addPolygon('rc2-bg',
            [[-9.8, 3.7], [0.5, 3.7], [0.5, 2.3], [-9.8, 2.3]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('rc2-t', -4.65, 3.15,
            '② 由假设推理，推出矛盾',
            { size: 14, color: ORANGE, anchorX: 'middle' });
          S.addText('rc2-s', -4.65, 2.55,
            '（推出 $p,q$ 都是偶数，有公因数 2）',
            { size: 12, color: INK, anchorX: 'middle' });

          S.addText('rc-arr2', -4.65, 1.9, '↓', { size: 20, color: INK, anchorX: 'middle' });

          // 步骤3
          S.addPolygon('rc3-bg',
            [[-9.8, 1.5], [0.5, 1.5], [0.5, 0.1], [-9.8, 0.1]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('rc3-t', -4.65, 0.95,
            '③ 矛盾 ⟹ 假设错误 ⟹ 原结论成立',
            { size: 14, color: RED, anchorX: 'middle' });
          S.addText('rc3-s', -4.65, 0.35,
            '（$\\sqrt{2}$ 不是有理数 ∎）',
            { size: 12, color: GREEN, anchorX: 'middle' });

          // 右侧：本课证明要点
          S.addPolygon('proof-bg',
            [[1.0, 7.3], [9.8, 7.3], [9.8, -0.5], [1.0, -0.5]],
            { fillColor: '#f3e5f5', fillOpacity: 0.95, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('proof-title', 5.4, 6.8,
            '证明要点回顾',
            { size: 16, color: PURPLE, anchorX: 'middle' });
          S.addText('proof-t1', 1.5, 6.0, '① $\\sqrt{2}=\\dfrac{p}{q}$（$p,q$ 互质）', { size: 13, color: BLUE });
          S.addText('proof-t2', 1.5, 5.0, '② $p^2=2q^2$ ⟹ $p$ 是偶数', { size: 13, color: ORANGE });
          S.addText('proof-t3', 1.5, 4.0, '③ $p=2m$ ⟹ $q^2=2m^2$ ⟹ $q$ 是偶数', { size: 13, color: CYAN });
          S.addText('proof-t4', 1.5, 2.8,
            '④ $p,q$ 都偶 ⟹ 公因数 2',
            { size: 13, color: RED });
          S.addText('proof-t5', 1.5, 2.0,
            '与互质矛盾！',
            { size: 14, color: RED });
          S.addText('proof-t6', 1.5, 1.0,
            '⑤ $\\sqrt{2}$ 不是有理数 ∎',
            { size: 14, color: GREEN });

          // 底部：本课收获
          S.addPolygon('gain-bg',
            [[-9.8, -1.0], [9.8, -1.0], [9.8, -4.2], [-9.8, -4.2]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('gain-title', 0, -1.6,
            '本课收获',
            { size: 17, color: GREEN, anchorX: 'middle' });
          S.addText('gain-t1', -8.5, -2.5,
            '1. 理解反证法的思想与结构（三步走）',
            { size: 14, color: INK });
          S.addText('gain-t2', -8.5, -3.4,
            '2. 能说出 $\\sqrt{2}$ 不是有理数的证明思路与关键矛盾',
            { size: 14, color: INK });

          P.renderCard(
            '<b>本课小结</b><br><br>' +
            '<b>反证法：</b><br>' +
            '① 假设反面<br>' +
            '② 严格推理<br>' +
            '③ 矛盾 ⟹ 原结论成立<br><br>' +
            '<b>结论：$\\sqrt{2}$ 不是有理数 ∎</b>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：思考题 + 结束语
        narration: '今天的课就到这里。给大家留一道思考题：请仿照证明 $\\sqrt{2}$ 不是有理数的方法，证明 $\\sqrt{3}$ 不是有理数。提示：先假设 $\\sqrt{3} = \\dfrac{p}{q}$，$p,q$ 互质，两边平方，分析 $p$ 的奇偶性，再分析 $q$ 的奇偶性，找到矛盾。同学们课后独立尝试，检验自己是否真正理解了反证法的精髓！这节课我们见识了数学逻辑的力量——一个严密的证明，胜过一千次计算机验证！',
        enter: function (anim) {
          // 清除主体，展示思考题大卡
          S.remove('rc-title-bg'); S.remove('rc-title');
          S.remove('rc1-bg'); S.remove('rc1-t'); S.remove('rc1-s');
          S.remove('rc-arr1');
          S.remove('rc2-bg'); S.remove('rc2-t'); S.remove('rc2-s');
          S.remove('rc-arr2');
          S.remove('rc3-bg'); S.remove('rc3-t'); S.remove('rc3-s');
          S.remove('proof-bg'); S.remove('proof-title');
          S.remove('proof-t1'); S.remove('proof-t2'); S.remove('proof-t3');
          S.remove('proof-t4'); S.remove('proof-t5'); S.remove('proof-t6');
          S.remove('gain-bg'); S.remove('gain-title');
          S.remove('gain-t1'); S.remove('gain-t2');

          // 思考题卡
          S.addPolygon('hw-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 0.5], [-9.5, 0.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('hw-title', 0, 6.5,
            '课后思考题',
            { size: 20, color: GOLD, anchorX: 'middle' });
          S.addText('hw-q', 0, 5.3,
            '证明：$\\sqrt{3}$ 不是有理数',
            { size: 18, color: ORANGE, anchorX: 'middle' });
          S.addText('hw-h0', -8.5, 4.1, '提示：', { size: 15, color: PURPLE });
          S.addText('hw-h1', -8.0, 3.2,
            '① 假设 $\\sqrt{3}=\\dfrac{p}{q}$，$p,q$ 互质',
            { size: 14, color: INK });
          S.addText('hw-h2', -8.0, 2.3,
            '② 两边平方：$p^2 = 3q^2$',
            { size: 14, color: INK });
          S.addText('hw-h3', -8.0, 1.4,
            '③ 分析 $p$ 是 3 的倍数，设 $p=3m$……',
            { size: 14, color: INK });
          S.addText('hw-h4', -8.0, 0.8,
            '（找出矛盾，完成证明）',
            { size: 13, color: GRAY });

          // 结束语
          S.addPolygon('end-bg',
            [[-9.5, 0.0], [9.5, 0.0], [9.5, -3.8], [-9.5, -3.8]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('end-t1', 0, -0.8,
            '数学的力量',
            { size: 18, color: GREEN, anchorX: 'middle' });
          S.addText('end-t2', 0, -2.0,
            '一个严密的证明，胜过一千次计算机验证！',
            { size: 15, color: INK, anchorX: 'middle' });
          S.addText('end-t3', 0, -3.1,
            '——这就是数学的美妙与力量',
            { size: 14, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>课后思考题</b><br><br>' +
            '证明 $\\sqrt{3}$ 不是有理数<br><br>' +
            '<b>提示：</b><br>' +
            '假设 $\\sqrt{3}=\\frac{p}{q}$（$p,q$ 互质）<br>' +
            '⟹ $p^2=3q^2$ ⟹ $p$ 是 3 的倍数<br>' +
            '⟹ 设 $p=3m$，代入……<br>' +
            '<span style="color:#2e7d32">独立完成，检验理解！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
