(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 每道例题的数据
  var EXAMPLES = [
    {
      num: '①',
      question: '$100$',
      steps: [
        '因为 $10^2 = 100$，$(-10)^2 = 100$',
        '所以 $100$ 的平方根是 $\\pm 10$'
      ],
      answer: '$\\pm 10$',
      color: COOL
    },
    {
      num: '②',
      question: '$\\dfrac{16}{49}$',
      steps: [
        '因为 $\\left(\\dfrac{4}{7}\\right)^2 = \\dfrac{16}{49}$，$\\left(-\\dfrac{4}{7}\\right)^2 = \\dfrac{16}{49}$',
        '所以 $\\dfrac{16}{49}$ 的平方根是 $\\pm\\dfrac{4}{7}$'
      ],
      answer: '$\\pm\\dfrac{4}{7}$',
      color: PURPLE
    },
    {
      num: '③',
      question: '$0.09$',
      steps: [
        '因为 $0.3^2 = 0.09$，$(-0.3)^2 = 0.09$',
        '所以 $0.09$ 的平方根是 $\\pm 0.3$'
      ],
      answer: '$\\pm 0.3$',
      color: GREEN
    }
  ];

  var scene = {
    id: 's5',
    title: '五、例题：求平方根',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '现在我们来做几道例题，练习求一个数的平方根。例题：求下列各数的平方根。① $100$；② $\\dfrac{16}{49}$；③ $0.09$。解题思路：找到哪个数的平方等于给定的数，答案就是那两个数（正负各一个）。',
        enter: function (anim) {
          S.addText('s5-title', 0, 9, '例题：求下列各数的平方根', { color: INK, size: 20, anchorX: 'middle' });
          var qs = EXAMPLES;
          qs.forEach(function (ex, i) {
            S.addText('s5-q' + i, -5, 7 - i * 1.5,
              ex.num + ' 求 ' + ex.question + ' 的平方根', { color: ex.color, size: 17 });
          });
          P.renderCard('解题思路：<br>找 $x$ 使 $x^2 = a$<br>① $x^2 = 100$<br>② $x^2 = \\dfrac{16}{49}$<br>③ $x^2 = 0.09$');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '第 ① 题：求 $100$ 的平方根。因为 $10^2 = 100$，$(-10)^2 = 100$，所以 $100$ 的平方根是 $+10$ 和 $-10$，合写为 $\\pm 10$。注意：不能只写 $10$，漏掉负根是最常见的错误！',
        enter: function (anim) {
          var ex = EXAMPLES[0];
          S.addText('s5-title', 0, 9, '例题：求下列各数的平方根', { color: INK, size: 20, anchorX: 'middle' });
          S.addText('s5-q-mark', -5, 7.5, ex.num + ' 求 ' + ex.question + ' 的平方根', { color: ex.color, size: 18 });
          S.addText('s5-step1', -5, 6.0, ex.steps[0], { color: INK, size: 16 });
          S.addText('s5-step2', -5, 4.8, ex.steps[1], { color: ex.color, size: 16 });
          S.addText('s5-ans', -5, 3.5, '答：' + ex.question + ' 的平方根为 ' + ex.answer, { color: ex.color, size: 17 });
          S.addText('s5-warn', -5, 2.0,
            '！易错：不能只写 $\\sqrt{100}=10$，应写 $\\pm 10$', { color: WARM, size: 15 });
          P.renderCard(
            '<b>① 求 100 的平方根</b><br>' +
            '$10^2 = 100$，$(-10)^2 = 100$<br>' +
            '∴ 平方根为 $\\pm 10$<br><br>' +
            '注：$\\sqrt{100} = 10$（算术平方根，只取正）<br>' +
            '平方根 = $\\pm 10$（两个）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '第 ② 题：求 $\\dfrac{16}{49}$ 的平方根。观察分子分母：$16 = 4^2$，$49 = 7^2$，所以 $\\dfrac{16}{49} = \\left(\\dfrac{4}{7}\\right)^2 = \\left(-\\dfrac{4}{7}\\right)^2$。答：平方根为 $\\pm\\dfrac{4}{7}$。',
        enter: function (anim) {
          var ex = EXAMPLES[1];
          S.addText('s5-title', 0, 9, '例题：求下列各数的平方根', { color: INK, size: 20, anchorX: 'middle' });
          S.addText('s5-q-mark', -5, 7.5, ex.num + ' 求 ' + ex.question + ' 的平方根', { color: ex.color, size: 18 });
          S.addText('s5-hint', -5, 6.3, '分子：$16 = 4^2$；分母：$49 = 7^2$', { color: INK, size: 16 });
          S.addText('s5-step1', -5, 5.1, ex.steps[0], { color: INK, size: 15 });
          S.addText('s5-step2', -5, 3.8, ex.steps[1], { color: ex.color, size: 16 });
          S.addText('s5-ans', -5, 2.6, '答：平方根为 ' + ex.answer, { color: ex.color, size: 17 });
          P.renderCard(
            '<b>② 求 $\\dfrac{16}{49}$ 的平方根</b><br>' +
            '$16 = 4^2$，$49 = 7^2$<br>' +
            '$\\dfrac{16}{49} = \\left(\\dfrac{4}{7}\\right)^2$<br>' +
            '∴ 平方根为 $\\pm\\dfrac{4}{7}$'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '第 ③ 题：求 $0.09$ 的平方根。$0.09 = 0.3^2 = (-0.3)^2$，所以平方根为 $\\pm 0.3$。整体回顾：三道题的答案分别是 $\\pm 10$、$\\pm\\dfrac{4}{7}$、$\\pm 0.3$，都是一对互为相反数的值。',
        enter: function (anim) {
          var ex = EXAMPLES[2];
          S.addText('s5-title', 0, 9, '例题：求下列各数的平方根', { color: INK, size: 20, anchorX: 'middle' });
          S.addText('s5-q-mark', -5, 7.5, ex.num + ' 求 ' + ex.question + ' 的平方根', { color: ex.color, size: 18 });
          S.addText('s5-step1', -5, 6.2, ex.steps[0], { color: INK, size: 16 });
          S.addText('s5-step2', -5, 5.0, ex.steps[1], { color: ex.color, size: 16 });
          S.addText('s5-ans', -5, 3.7, '答：平方根为 ' + ex.answer, { color: ex.color, size: 17 });
          // 汇总三题答案
          S.addText('s5-sum', -5, 1.8, '汇总：①$\\pm 10$ ②$\\pm\\dfrac{4}{7}$ ③$\\pm 0.3$', { color: COOL, size: 16 });
          P.renderTable({
            head: ['题号', '原数', '平方根'],
            rows: [
              ['①', '$100$', '$\\pm 10$'],
              ['②', '$\\dfrac{16}{49}$', '$\\pm\\dfrac{4}{7}$'],
              ['③', '$0.09$', '$\\pm 0.3$']
            ]
          });
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
