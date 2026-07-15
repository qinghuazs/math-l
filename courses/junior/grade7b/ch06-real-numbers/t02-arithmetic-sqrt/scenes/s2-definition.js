(function (CW) {
  'use strict';
  // 场景二：算术平方根定义与记号
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、定义与记号',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '好，下面我们来学习算术平方根的定义。定义是这样的：一般地，正数 $a$ 的正的平方根，叫作 $a$ 的算术平方根。特别地，$0$ 的算术平方根是 $0$。注意，只有正数和 $0$ 才有算术平方根，负数没有算术平方根。请大家把这句话记下来。',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.0, '二、定义与记号', { color: WARM, size: 24, bold: true });
          // 定义文本块
          S.actor('s2-def1', 0, 3.8, '正数 $a$ 的正的平方根，', { color: INK, size: 19 });
          S.actor('s2-def2', 0, 2.4, '叫作 $a$ 的算术平方根。', { color: WARM, size: 19, bold: true });
          S.actor('s2-def3', 0, 0.8, '特别地：$0$ 的算术平方根是 $0$。', { color: COOL, size: 18 });
          S.actor('s2-cond', 0, -0.8, '（$a \\geq 0$ 才有算术平方根）', { color: GRAY, size: 16 });
          P.clearExtras();
          P.renderCard('<b>算术平方根 定义</b><br><br>正数 $a$ 的<b>正的</b>平方根，<br>叫作 $a$ 的<b>算术平方根</b>。<br><br>$0$ 的算术平方根是 $0$。<br><br>条件：$a \\geq 0$');
          if (!anim) return null;
          var o = S.get('s2-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 12, to: 24, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '算术平方根用根号来表示。$a$ 的算术平方根记作 $\\sqrt{a}$，读作"根号 $a$"。其中"$\\sqrt{\\phantom{a}}$"这个符号叫作根号，$a$ 叫作被开方数。例如，$25$ 的算术平方根记作 $\\sqrt{25}$，等于 $5$。这里 $25$ 是被开方数，$5$ 是结果。',
        enter: function (anim) {
          S.remove('s2-def1'); S.remove('s2-def2');
          S.remove('s2-def3'); S.remove('s2-cond');
          // 大号根号展示
          S.actor('s2-sqrt-big', -2, 3.5, '$\\sqrt{25}$', { color: WARM, size: 48, bold: true });
          S.actor('s2-eq', 1.5, 3.5, '$=$', { color: INK, size: 40 });
          S.actor('s2-result', 3.5, 3.5, '$5$', { color: GREEN, size: 48, bold: true });
          // 标注部件
          S.actor('s2-label-radicand', -3.2, 1.5, '被开方数', { color: COOL, size: 16 });
          S.actor('s2-label-sign', -0.2, 5.5, '根号', { color: PURPLE, size: 16 });
          // 箭头线用 segment 模拟指向
          S.addSegment('s2-arr1', [-3.2, 1.8], [-1.5, 2.8], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s2-arr2', [-0.2, 5.2], [-1.0, 4.3], { color: PURPLE, width: 2, dash: 0 });
          P.clearExtras();
          P.renderCard('<b>记号</b>：$a$ 的算术平方根记作 $\\sqrt{a}$<br><br>• $\\sqrt{\\phantom{a}}$ 叫作<b>根号</b><br>• $a$ 叫作<b>被开方数</b><br><br>例：$\\sqrt{25} = 5$<br>（读作"根号 $25$ 等于 $5$"）');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '现在来看一个非常关键的对比。"$25$ 的平方根"和"$25$ 的算术平方根"有什么区别？左边：$25$ 的平方根是 $\\pm 5$，有两个值，一正一负。右边：$25$ 的算术平方根是 $\\sqrt{25} = 5$，只有一个值，就是正的那个 $5$。切记：根号表示的永远是算术平方根，结果是非负数！',
        enter: function (anim) {
          // 清除前一步标注
          S.remove('s2-sqrt-big'); S.remove('s2-eq'); S.remove('s2-result');
          S.remove('s2-label-radicand'); S.remove('s2-label-sign');
          S.remove('s2-arr1'); S.remove('s2-arr2');
          // 对比布局：分隔线
          S.addSegment('s2-divider', [0, 6.5], [0, -6.5], { color: GRAY, width: 2, dash: 2 });
          // 左列：平方根
          S.actor('s2-left-head', -4.5, 6.0, '平方根', { color: COOL, size: 20, bold: true });
          S.shadeRect('s2-left-bg', -9.8, 5.5, -0.2, -1.5, { color: COOL, opacity: 0.06 });
          S.actor('s2-left-q', -4.5, 4.3, '$25$ 的平方根', { color: INK, size: 17 });
          S.actor('s2-left-ans', -4.5, 2.8, '$= \\pm 5$', { color: COOL, size: 26, bold: true });
          S.actor('s2-left-n', -4.5, 1.4, '两个值', { color: COOL, size: 16 });
          S.actor('s2-left-desc', -4.5, 0.2, '（$+5$ 和 $-5$）', { color: GRAY, size: 16 });
          // 右列：算术平方根
          S.actor('s2-right-head', 4.5, 6.0, '算术平方根', { color: WARM, size: 20, bold: true });
          S.shadeRect('s2-right-bg', 0.2, 5.5, 9.8, -1.5, { color: WARM, opacity: 0.06 });
          S.actor('s2-right-q', 4.5, 4.3, '$25$ 的算术平方根', { color: INK, size: 17 });
          S.actor('s2-right-ans', 4.5, 2.8, '$\\sqrt{25} = 5$', { color: WARM, size: 26, bold: true });
          S.actor('s2-right-n', 4.5, 1.4, '一个值', { color: WARM, size: 16 });
          S.actor('s2-right-desc', 4.5, 0.2, '（只取正的）', { color: GRAY, size: 16 });
          // 重点提示
          S.actor('s2-warn', 0, -3.0, '$\\sqrt{25} \\neq \\pm 5$', { color: WARM, size: 24, bold: true });
          S.actor('s2-warn2', 0, -4.5, '根号结果 = 非负数！', { color: WARM, size: 18, bold: true });
          P.clearExtras();
          P.renderTable({
            head: ['', '平方根', '算术平方根'],
            rows: [
              ['结果', '$\\pm 5$', '$5$'],
              ['个数', '两个', '一个'],
              ['记号', '$\\pm\\sqrt{25}$', '$\\sqrt{25}$'],
            ],
          });
          P.renderCard('关键：$\\sqrt{25} = 5$（非 $\\pm 5$）<br>根号始终表示<b>非负值</b>！', 'warm');
          if (!anim) return null;
          return delay(500);
        },
      },
      {
        narration: '我们再看几个例子来巩固记号的用法。$\\sqrt{9} = 3$，因为 $3$ 是 $9$ 的正的平方根。$\\sqrt{0} = 0$，因为 $0$ 的算术平方根就是 $0$。注意 $\\sqrt{9} \\neq \\pm 3$，这是同学们最容易犯的错误，一定要避免！',
        enter: function (anim) {
          // 清除对比布局
          S.remove('s2-divider');
          S.remove('s2-left-head'); S.remove('s2-left-bg'); S.remove('s2-left-q');
          S.remove('s2-left-ans'); S.remove('s2-left-n'); S.remove('s2-left-desc');
          S.remove('s2-right-head'); S.remove('s2-right-bg'); S.remove('s2-right-q');
          S.remove('s2-right-ans'); S.remove('s2-right-n'); S.remove('s2-right-desc');
          S.remove('s2-warn'); S.remove('s2-warn2');
          // 例子列表
          S.actor('s2-ex-title', 0, 5.5, '记号练习', { color: COOL, size: 22, bold: true });
          S.actor('s2-ex1', 0, 3.5, '$\\sqrt{9} = 3$', { color: GREEN, size: 26, bold: true });
          S.actor('s2-ex1c', 0, 2.3, '（因为 $3^2 = 9$，取正值）', { color: GRAY, size: 16 });
          S.actor('s2-ex2', 0, 0.8, '$\\sqrt{0} = 0$', { color: GREEN, size: 26, bold: true });
          S.actor('s2-ex2c', 0, -0.4, '（$0$ 的算术平方根是 $0$）', { color: GRAY, size: 16 });
          S.actor('s2-wrong', 0, -2.5, '$\\sqrt{9} \\neq \\pm 3$', { color: WARM, size: 24, bold: true });
          S.actor('s2-wrong-label', 0, -3.8, '✗ 错误写法，切记！', { color: WARM, size: 17 });
          P.clearExtras();
          P.renderCard('例：<br>$\\sqrt{9} = 3$ ✓<br>$\\sqrt{0} = 0$ ✓<br><br>$\\sqrt{9} \\neq \\pm 3$ ✗<br><br>根号 $=$ 算术平方根 $=$ 非负数');
          if (!anim) return null;
          return delay(400);
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
