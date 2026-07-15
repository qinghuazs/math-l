(function (CW) {
  'use strict';
  // 场景五：易错与小结
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、易错与小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在我们来做"易错三连"，也就是三个同学最容易出错的地方。第一个易错：有人写 $\\sqrt{25} = \\pm 5$，这是错误的！$\\sqrt{25}$ 是 $25$ 的算术平方根，只取正值，应该等于 $5$。"$25$ 的平方根"才是 $\\pm 5$，要把"平方根"和"算术平方根"区分开来！',
        enter: function (anim) {
          S.actor('s5-title', 0, 6.5, '五、易错与小结', { color: WARM, size: 24, bold: true });
          // 易错1
          S.shadeRect('s5-e1-bg', -9.5, 5.8, 9.5, 2.5, { color: WARM, opacity: 0.07 });
          S.actor('s5-e1-label', -8.0, 4.8, '易错①', { color: WARM, size: 18, bold: true });
          S.actor('s5-e1-wrong', -2.0, 4.8, '$\\sqrt{25} = \\pm 5$', { color: WARM, size: 22 });
          S.actor('s5-e1-cross', 3.2, 4.8, '✗', { color: WARM, size: 24, bold: true });
          S.actor('s5-e1-correct', 0, 3.5, '$\\sqrt{25} = 5$（算术平方根只取正值）', { color: GREEN, size: 18, bold: true });
          P.clearExtras();
          P.renderCard('<b>易错①</b>：$\\sqrt{25} = \\pm 5$？<br><br>✗ 错误：$\\pm 5$ 是平方根<br>✓ 正确：$\\sqrt{25} = 5$<br>（算术平方根只取正值）');
          if (!anim) return null;
          var o = S.get('s5-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 12, to: 24, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '第二个易错：有人认为 $\\sqrt{-9}$ 有意义。这是错误的！负数没有算术平方根。算术平方根要求被开方数 $a \\geq 0$，$-9$ 是负数，不满足条件，所以 $\\sqrt{-9}$ 是无意义的。这正是双重非负性中的第一条：被开方数必须非负。第三个易错：有人认为 $\\sqrt{a}$ 一定是正数。这也是错误的！当 $a = 0$ 时，$\\sqrt{0} = 0$，结果是 $0$，不是正数。正确表述是：$\\sqrt{a} \\geq 0$，即算术平方根是非负数。',
        enter: function (anim) {
          // 易错2
          S.shadeRect('s5-e2-bg', -9.5, 2.0, 9.5, -0.2, { color: COOL, opacity: 0.07 });
          S.actor('s5-e2-label', -8.0, 1.1, '易错②', { color: COOL, size: 18, bold: true });
          S.actor('s5-e2-wrong', -2.5, 1.1, '$\\sqrt{-9}$ 有意义', { color: COOL, size: 20 });
          S.actor('s5-e2-cross', 4.0, 1.1, '✗', { color: WARM, size: 24, bold: true });
          S.actor('s5-e2-correct', 0, 0.0,
            '$\\sqrt{-9}$ 无意义（被开方数 $< 0$）', { color: GREEN, size: 17, bold: true });
          // 易错3
          S.shadeRect('s5-e3-bg', -9.5, -0.5, 9.5, -2.8, { color: GRAY, opacity: 0.07 });
          S.actor('s5-e3-label', -8.0, -1.3, '易错③', { color: INK, size: 18, bold: true });
          S.actor('s5-e3-wrong', -2.0, -1.3, '$\\sqrt{a}$ 一定是正数', { color: INK, size: 20 });
          S.actor('s5-e3-cross', 4.5, -1.3, '✗', { color: WARM, size: 24, bold: true });
          S.actor('s5-e3-correct', 0, -2.3,
            '$\\sqrt{a} \\geq 0$（含 $0$），$\\sqrt{0} = 0$ 是非负数非正数', { color: GREEN, size: 15, bold: true });
          P.clearExtras();
          P.renderCard('<b>易错②</b>：$\\sqrt{-9}$ 有意义？<br>✗ 错误：$-9 < 0$，无意义<br><br><b>易错③</b>：$\\sqrt{a}$ 一定是正数？<br>✗ 错误：$\\sqrt{0} = 0$，是非负数<br>✓ 正确：$\\sqrt{a} \\geq 0$（非负数）');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '好，最后我们来做一个总结对照表，把平方根和算术平方根的区别整理清楚。请看：平方根有两个（正负各一），用 $\\pm\\sqrt{a}$ 表示；算术平方根只有一个，是正的那个，用 $\\sqrt{a}$ 表示，且 $\\sqrt{a} \\geq 0$。同时，$0$ 比较特殊：$0$ 的平方根只有一个，就是 $0$；$0$ 的算术平方根也是 $0$。负数没有平方根，更没有算术平方根。今天的内容就学到这里，记住双重非负性和三个易错点，你就掌握了本节的核心！',
        enter: function (anim) {
          // 清除易错展示
          S.remove('s5-e1-bg'); S.remove('s5-e1-label'); S.remove('s5-e1-wrong');
          S.remove('s5-e1-cross'); S.remove('s5-e1-correct');
          S.remove('s5-e2-bg'); S.remove('s5-e2-label'); S.remove('s5-e2-wrong');
          S.remove('s5-e2-cross'); S.remove('s5-e2-correct');
          S.remove('s5-e3-bg'); S.remove('s5-e3-label'); S.remove('s5-e3-wrong');
          S.remove('s5-e3-cross'); S.remove('s5-e3-correct');
          // 小结标题
          S.actor('s5-sum-title', 0, 5.5, '平方根 vs 算术平方根', { color: COOL, size: 20, bold: true });
          // 对比表格区域（两栏）
          S.addSegment('s5-div', [0, 4.8], [0, -4.5], { color: GRAY, width: 2, dash: 2 });
          // 左列：平方根
          S.actor('s5-lh', -4.5, 4.3, '平方根', { color: COOL, size: 18, bold: true });
          S.actor('s5-l1', -4.5, 3.0, '正数：两个（$\\pm$）', { color: COOL, size: 15 });
          S.actor('s5-l2', -4.5, 1.8, '记号：$\\pm\\sqrt{a}$', { color: COOL, size: 15 });
          S.actor('s5-l3', -4.5, 0.6, '$0$：一个（$0$）', { color: COOL, size: 15 });
          S.actor('s5-l4', -4.5, -0.6, '负数：无', { color: GRAY, size: 15 });
          // 右列：算术平方根
          S.actor('s5-rh', 4.5, 4.3, '算术平方根', { color: WARM, size: 18, bold: true });
          S.actor('s5-r1', 4.5, 3.0, '正数：一个（正值）', { color: WARM, size: 15 });
          S.actor('s5-r2', 4.5, 1.8, '记号：$\\sqrt{a}$', { color: WARM, size: 15 });
          S.actor('s5-r3', 4.5, 0.6, '$0$：$\\sqrt{0}=0$', { color: WARM, size: 15 });
          S.actor('s5-r4', 4.5, -0.6, '负数：无意义', { color: GRAY, size: 15 });
          // 核心公式
          S.shadeRect('s5-formula-bg', -9.5, -1.5, 9.5, -4.5, { color: GREEN, opacity: 0.08 });
          S.actor('s5-formula1', -3.0, -2.5,
            '$(\\sqrt{a})^2 = a$', { color: GREEN, size: 20, bold: true });
          S.actor('s5-formula2', 4.0, -2.5,
            '$a \\geq 0$', { color: GREEN, size: 18 });
          S.actor('s5-formula3', 0, -3.8,
            '双重非负：$a \\geq 0$，$\\sqrt{a} \\geq 0$', { color: WARM, size: 17, bold: true });
          P.clearExtras();
          P.renderTable({
            head: ['', '平方根', '算术平方根'],
            rows: [
              ['正数', '$\\pm\\sqrt{a}$（两个）', '$\\sqrt{a}$（一个）'],
              ['$0$', '$0$', '$0$'],
              ['负数', '无', '无意义'],
              ['范围', '可负', '$\\geq 0$'],
            ],
          });
          P.renderCard('$(\\sqrt{a})^2 = a$（$a \\geq 0$）<br>双重非负：$a \\geq 0$，$\\sqrt{a} \\geq 0$', 'cool');
          if (!anim) return null;
          return delay(500);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
