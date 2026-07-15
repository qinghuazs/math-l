(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', BLUE = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';
  var IDS = [];

  function clearAll() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }

  var scene = {
    id: 's5',
    title: '五、小结与作业',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      IDS = [];
    },
    steps: [
      {
        narration: '今天的运算要点，我们用一张表来汇总。这四个要点缺一不可：运算顺序决定先算什么；合并同类根式是关键技能；绝对值化简要先定号；近似计算务必看清保留位数的要求。',
        enter: function () {
          clearAll();
          P.renderTable({
            head: ['要点', '规则', '典型例子'],
            rows: [
              ['① 运算顺序', '先开方/乘方，再乘除，再加减，括号最优先', '$\\sqrt{9}+\\sqrt[3]{-8}-|-2|=3-2-2=-1$'],
              ['② 同类根式', '被开方数相同才能合并系数；不同类不合并', '$2\\sqrt{3}+3\\sqrt{3}=5\\sqrt{3}$；$\\sqrt{2}+\\sqrt{3}$ 不合并'],
              ['③ 绝对值先定号', '括号内正：直接去绝对值；括号内负：变号', '$|1-\\sqrt{2}|=\\sqrt{2}-1$（因 $\\sqrt{2}>1$）'],
              ['④ 近似计算', '按题目要求保留位数，写近似号 ≈', '$\\sqrt{2}+\\pi\\approx 4.56$（精确到 0.01）'],
            ],
          });
          S.actor(keep('s5-title'), 0, 5.8, '实数运算四要点', { size: 22, bold: true, color: PURPLE });
        },
      },
      {
        narration: '今天的课到这里！布置作业：同学们回去认真完成以下四道题，注意每道题对应一个今天学到的要点，巩固后才算真正掌握。',
        enter: function () {
          clearAll();
          P.renderCard(
            '<b>课后作业</b><br>' +
            '1. 计算：$\\sqrt{16}-\\sqrt[3]{-8}$<br>' +
            '2. 化简：$|1-\\sqrt{3}|$<br>' +
            '3. 合并：$5\\sqrt{2}-2\\sqrt{2}+\\sqrt{3}$<br>' +
            '4. 近似：$\\sqrt{10}-2$（精确到 0.01，取 $\\sqrt{10}\\approx 3.162$）',
            'warm'
          );
          S.actor(keep('s5-hw'), 0, 5.8, '实数的运算 · 课后作业', { size: 22, bold: true, color: BLUE });
          S.actor(keep('s5-ans-hint'), 0, -5.5, '参考答案：① 6  ② $\\sqrt{3}-1$  ③ $3\\sqrt{2}+\\sqrt{3}$  ④ $\\approx 1.16$', { size: 17, color: GREEN });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
