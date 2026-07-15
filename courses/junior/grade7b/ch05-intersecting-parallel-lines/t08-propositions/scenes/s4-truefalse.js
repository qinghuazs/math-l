(function (CW) {
  'use strict';
  // 场景四：真假命题与反例
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、真假命题与反例',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '命题有真有假。正确的命题叫真命题，错误的命题叫假命题。比如"对顶角相等"，已经被证明是正确的，所以是真命题。而"相等的角都是对顶角"——我们来判断一下，这是真命题还是假命题？',
        enter: function (anim) {
          S.actor('s4-title', 0, 6.0, '四、真假命题与反例', { color: WARM, size: 24, bold: true });
          // 真命题定义卡
          S.shadeRect('s4-bg-true', -9.5, 5.0, -0.5, 2.8, { color: GREEN, opacity: 0.10 });
          S.actor('s4-true-head', -5.0, 4.6, '真命题', { color: GREEN, size: 20, bold: true });
          S.actor('s4-true-body', -5.0, 3.5, '正确的命题', { color: INK, size: 17 });
          // 假命题定义卡
          S.shadeRect('s4-bg-false', 0.5, 5.0, 9.5, 2.8, { color: WARM, opacity: 0.10 });
          S.actor('s4-false-head', 5.0, 4.6, '假命题', { color: WARM, size: 20, bold: true });
          S.actor('s4-false-body', 5.0, 3.5, '错误的命题', { color: INK, size: 17 });
          // 问题
          S.actor('s4-q', 0, 1.5, '"相等的角都是对顶角"', { color: PURPLE, size: 18, bold: true });
          S.actor('s4-q2', 0, 0.3, '这是真命题还是假命题？', { color: INK, size: 17 });
          P.renderCard('<b>真假命题</b><br>正确的命题 → <span style="color:#388e3c;font-weight:700">真命题</span><br>错误的命题 → <span style="color:#e64a19;font-weight:700">假命题</span><br><br>命题"相等的角都是对顶角"——<br>你认为它是真命题还是假命题？');
          if (!anim) return null;
          var o = S.get('s4-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 24, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '要判断"相等的角都是对顶角"是不是真命题，最有力的方式是找一个反例——找两个角，它们相等，但不是对顶角。如果能找到，这个命题就是假命题。我们在图上画两个独立的60度角，你来看！',
        enter: function (anim) {
          // 清理定义卡和问题
          S.remove('s4-bg-true'); S.remove('s4-true-head'); S.remove('s4-true-body');
          S.remove('s4-bg-false'); S.remove('s4-false-head'); S.remove('s4-false-body');
          S.remove('s4-q'); S.remove('s4-q2');
          S.actor('s4-title', 0, 6.5, '四、真假命题与反例', { color: WARM, size: 20, bold: true });
          S.actor('s4-claim', 0, 5.5, '命题："相等的角都是对顶角"', { color: PURPLE, size: 16, bold: true });
          S.actor('s4-plan',  0, 4.4, '策略：画一个反例图形来否定它！', { color: GREEN, size: 16 });
          P.renderCard('要否定一个命题，只需举出<b>一个反例</b>。<br><br>策略：画两个相等的角，但它们不是对顶角——<br>如果能画出来，该命题就是<b>假命题</b>！');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '看图——左边画了一个60度角，顶点在左侧；右边独立地又画了一个60度角，顶点在右侧。这两个角都是60度，大小完全相同。但是它们的顶点不同、射线不共顶点，完全不是对顶角的关系！这就是一个反例，直接否定了"相等的角都是对顶角"这个命题！',
        enter: function (anim) {
          // 左边角：顶点(-5.5, 1.0)，两条射线方向让角度约60°
          // 射线1：向右水平方向 → (to: (-5.5+3, 1.0))
          // 射线2：向右上方60° → (to: (-5.5 + 3*cos60, 1.0 + 3*sin60) = (-3.5, 3.598))
          var L_VTX = [-5.5, 0.5];
          var L_R1   = [-5.5 + 3.5, 0.5];                        // 水平右
          var L_R2   = [-5.5 + 3.5 * Math.cos(Math.PI / 3),
                         0.5 + 3.5 * Math.sin(Math.PI / 3)];   // 上方60°
          S.addRay('s4-l-r1', L_VTX, L_R1,  { color: COOL, width: 2.5, dash: 0 });
          S.addRay('s4-l-r2', L_VTX, L_R2,  { color: COOL, width: 2.5, dash: 0 });
          S.addAngle('s4-l-ang', L_R1, L_VTX, L_R2,
            { radius: 0.85, color: COOL, opacity: 0.12, label: '60°', labelSize: 15 });
          S.actor('s4-l-vtx', L_VTX[0] - 0.5, L_VTX[1] - 0.4, 'A', { color: COOL, size: 15 });

          // 右边角：顶点(4.5, -2.0)，方向不同：右下水平+右上方60°
          var R_VTX = [4.5, -2.0];
          var R_R1   = [4.5 + 3.5, -2.0];
          var R_R2   = [4.5 + 3.5 * Math.cos(Math.PI / 3),
                        -2.0 + 3.5 * Math.sin(Math.PI / 3)];
          S.addRay('s4-r-r1', R_VTX, R_R1,  { color: WARM, width: 2.5, dash: 0 });
          S.addRay('s4-r-r2', R_VTX, R_R2,  { color: WARM, width: 2.5, dash: 0 });
          S.addAngle('s4-r-ang', R_R1, R_VTX, R_R2,
            { radius: 0.80, color: WARM, opacity: 0.12, label: '60°', labelSize: 15 });
          S.actor('s4-r-vtx', R_VTX[0] - 0.5, R_VTX[1] - 0.4, 'B', { color: WARM, size: 15 });

          // 等号标注
          S.actor('s4-eq', 0, -4.8, '∠A = ∠B = 60°  但  ∠A 与 ∠B 不是对顶角！', { color: PURPLE, size: 16, bold: true });

          P.renderCard('<b>反例图形</b><br>∠A = 60°（左图，蓝色）<br>∠B = 60°（右图，红色）<br><br>∠A = ∠B，但顶点不同，射线不共顶点，<br><b>根本不是对顶角</b>！<br><br>→ "相等的角都是对顶角" 是<span style="color:#e64a19;font-weight:700">假命题</span>');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '总结一下反例的作用：要证明一个命题是真命题，需要对所有情况都进行严格推理。但要证明它是假命题，只需要举出一个反例就够了！一个反例就足以否定一个命题。这是数学中非常重要的思想方法。',
        enter: function (anim) {
          S.actor('s4-summary', 0, -6.5,
            '举一个反例，即可否定一个命题！', { color: WARM, size: 18, bold: true });
          P.renderCard('<b>反例的威力</b><br>证明命题为<span style="color:#388e3c;font-weight:700">真</span>：需严格推理所有情况<br>证明命题为<span style="color:#e64a19;font-weight:700">假</span>：只需<b>一个反例</b>即可！<br><br>反例举法：找一个满足题设，但结论不成立的例子。');
          if (!anim) return null;
          var o = S.get('s4-summary');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 10, to: 18, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
