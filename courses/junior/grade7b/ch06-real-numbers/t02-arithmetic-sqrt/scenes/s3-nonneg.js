(function (CW) {
  'use strict';
  // 场景三：双重非负性
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';
  var AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、双重非负性',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '算术平方根有一个非常重要的性质，叫做双重非负性。"双重"是什么意思呢？第一重：被开方数 $a$ 必须是非负数，也就是 $a \\geq 0$。第二重：算术平方根的结果也是非负数，也就是 $\\sqrt{a} \\geq 0$。两个都是非负的，所以叫双重非负性。',
        enter: function (anim) {
          S.actor('s3-title', 0, 6.0, '三、双重非负性', { color: WARM, size: 24, bold: true });
          // 第一条：被开方数非负
          S.shadeRect('s3-bg1', -9.5, 4.8, 9.5, 2.5, { color: COOL, opacity: 0.08 });
          S.actor('s3-prop1-label', -7.5, 3.8, '①', { color: COOL, size: 20, bold: true });
          S.actor('s3-prop1', 0, 3.8, '被开方数：$a \\geq 0$', { color: COOL, size: 21, bold: true });
          S.actor('s3-prop1-desc', 0, 2.9, '负数没有算术平方根', { color: GRAY, size: 16 });
          // 第二条：结果非负
          S.shadeRect('s3-bg2', -9.5, 2.2, 9.5, -0.1, { color: GREEN, opacity: 0.08 });
          S.actor('s3-prop2-label', -7.5, 1.2, '②', { color: GREEN, size: 20, bold: true });
          S.actor('s3-prop2', 0, 1.2, '结果：$\\sqrt{a} \\geq 0$', { color: GREEN, size: 21, bold: true });
          S.actor('s3-prop2-desc', 0, 0.3, '根号给出的总是非负值', { color: GRAY, size: 16 });
          P.clearExtras();
          P.renderCard('<b>双重非负性</b><br><br>① 被开方数 $a \\geq 0$<br>（$a$ 不能是负数）<br><br>② 结果 $\\sqrt{a} \\geq 0$<br>（根号值是非负数）');
          if (!anim) return null;
          var o = S.get('s3-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 12, to: 24, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '为了帮助大家记住双重非负性，我们用一个生动的比喻：把根号 $\\sqrt{\\phantom{a}}$ 想象成一台机器。往机器里"输入"一个非负数，机器"输出"它的算术平方根。机器的规则是：它只接受非负数输入，输出也永远是非负数。如果你输入一个负数，机器直接报错——"无意义"！',
        enter: function (anim) {
          // 清除文字说明
          S.remove('s3-prop1-label'); S.remove('s3-prop1'); S.remove('s3-prop1-desc');
          S.remove('s3-prop2-label'); S.remove('s3-prop2'); S.remove('s3-prop2-desc');
          S.remove('s3-bg1'); S.remove('s3-bg2');
          // 机器箱主体（addPolygon）
          S.addPolygon('s3-machine',
            [[-2.5, 2.5], [2.5, 2.5], [2.5, -2.0], [-2.5, -2.0]],
            { color: COOL, opacity: 0.18, borderWidth: 3, borderColor: COOL });
          // 机器上的根号标志
          S.actor('s3-machine-label', 0, 0.4, '$\\sqrt{\\phantom{a}}$', { color: WARM, size: 36, bold: true });
          S.actor('s3-machine-title', 0, 1.8, '根号机器', { color: COOL, size: 16, bold: true });
          // 输入箭头（左侧）
          S.addSegment('s3-in-arrow', [-6.5, 0.4], [-2.7, 0.4], { color: GREEN, width: 3, dash: 0 });
          S.actor('s3-in-label', -7.8, 1.2, '输入', { color: GREEN, size: 16 });
          S.actor('s3-in-val', -7.8, 0.4, '$a \\geq 0$', { color: GREEN, size: 20, bold: true });
          // 输出箭头（右侧）
          S.addSegment('s3-out-arrow', [2.7, 0.4], [6.5, 0.4], { color: AMBER, width: 3, dash: 0 });
          S.actor('s3-out-label', 7.8, 1.2, '输出', { color: AMBER, size: 16 });
          S.actor('s3-out-val', 7.8, 0.4, '$\\sqrt{a} \\geq 0$', { color: AMBER, size: 20, bold: true });
          // 禁止输入负数
          S.actor('s3-ban-label', -7.8, -2.0, '❌ 输入 $a < 0$', { color: WARM, size: 16 });
          S.actor('s3-ban-result', -7.8, -3.0, '机器：无意义！', { color: WARM, size: 16, bold: true });
          P.clearExtras();
          P.renderCard('根号是一台"只出非负数"的机器：<br><br>• 输入：$a \\geq 0$（非负数）<br>• 输出：$\\sqrt{a} \\geq 0$（非负数）<br><br>输入负数 → <b>无意义</b>');
          if (!anim) return null;
          return delay(500);
        },
      },
      {
        narration: '最后，特别记住 $\\sqrt{0} = 0$ 这个特例。$0$ 的算术平方根是 $0$，而不是无意义。因为 $0 \\geq 0$，满足被开方数的条件。有些同学误以为"算术平方根的结果一定是正数"，这是错误的！$\\sqrt{0} = 0$，结果是 $0$，不是正数，而是非负数。"非负数"包含 $0$！',
        enter: function (anim) {
          // 清除机器图形
          S.remove('s3-machine'); S.remove('s3-machine-label'); S.remove('s3-machine-title');
          S.remove('s3-in-arrow'); S.remove('s3-in-label'); S.remove('s3-in-val');
          S.remove('s3-out-arrow'); S.remove('s3-out-label'); S.remove('s3-out-val');
          S.remove('s3-ban-label'); S.remove('s3-ban-result');
          // 重点展示
          S.actor('s3-zero-title', 0, 5.0, '特别注意：$\\sqrt{0} = 0$', { color: WARM, size: 22, bold: true });
          S.actor('s3-zero-big', 0, 2.8, '$\\sqrt{0} = 0$', { color: GREEN, size: 40, bold: true });
          // 澄清误区
          S.shadeRect('s3-wrong-bg', -8.5, 1.2, 8.5, -0.5, { color: WARM, opacity: 0.08 });
          S.actor('s3-wrong', 0, 0.4, '误区：$\\sqrt{a}$ 一定是正数 ✗', { color: WARM, size: 18, bold: true });
          S.actor('s3-correct', 0, -1.5, '正确：$\\sqrt{a} \\geq 0$（非负数，含 $0$）', { color: GREEN, size: 18, bold: true });
          // 数轴展示非负范围
          S.addSegment('s3-numline', [-7, -4.0], [7, -4.0], { color: INK, width: 2, dash: 0 });
          S.actor('s3-num0', 0, -3.5, '$0$', { color: COOL, size: 18 });
          S.dropPoint('s3-dot0', 0, -4.0, { color: COOL, size: 4 });
          S.shadeRect('s3-nonneg-range', 0, -3.7, 7.2, -4.3, { color: GREEN, opacity: 0.18 });
          S.actor('s3-nonneg-label', 3.5, -5.2, '$\\sqrt{a}$ 的范围（$\\geq 0$）', { color: GREEN, size: 15 });
          P.clearExtras();
          P.renderCard('<b>$\\sqrt{0} = 0$（特例）</b><br><br>$\\sqrt{a} \\geq 0$，即"非负数"<br>非负数 $= 0$ 或正数<br><br>❌ "$\\sqrt{a}$ 一定是正数" — 错！<br>✓ "$\\sqrt{a}$ 一定是非负数" — 对！');
          if (!anim) return null;
          return delay(400);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
