(function (CW) {
  'use strict';
  // 场景四：例题
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 例题数据：[题号, 题目latex, 分析, 答案latex]
  var PROBLEMS = [
    ['1', '\\sqrt{16}',
     '找正数使其平方为 $16$：$4^2 = 16$，取正值',
     '4'],
    ['2', '\\sqrt{\\dfrac{81}{100}}',
     '$\\left(\\dfrac{9}{10}\\right)^2 = \\dfrac{81}{100}$，取正值',
     '\\dfrac{9}{10}'],
    ['3', '\\sqrt{0.04}',
     '$0.04 = \\dfrac{4}{100}$，$(0.2)^2 = 0.04$，取正值',
     '0.2'],
    ['4', '(\\sqrt{7})^2',
     '根据关系式 $(\\sqrt{a})^2 = a$（$a \\geq 0$）',
     '7'],
  ];

  // 各题 y 坐标（四题分两行）
  var POSITIONS = [
    { x: -4.5, y: 3.5 },
    { x: 4.5, y: 3.5 },
    { x: -4.5, y: -1.2 },
    { x: 4.5, y: -1.2 },
  ];

  var scene = {
    id: 's4',
    title: '四、例题',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在我们做四道例题来巩固算术平方根的计算。这四道题涵盖整数、分数、小数以及含根号的幂运算。先看题目，大家可以自己先算一算，然后我们逐一揭示答案和分析。',
        enter: function (anim) {
          S.actor('s4-title', 0, 6.5, '四、例题', { color: WARM, size: 24, bold: true });
          // 展示四道题目
          var i, pos, prob;
          for (i = 0; i < PROBLEMS.length; i++) {
            pos = POSITIONS[i];
            prob = PROBLEMS[i];
            S.shadeRect('s4-card-bg' + i, pos.x - 4.0, pos.y + 2.0, pos.x + 4.0, pos.y - 2.8,
              { color: COOL, opacity: 0.07 });
            S.actor('s4-num' + i, pos.x - 2.8, pos.y + 0.8,
              '例' + prob[0], { color: COOL, size: 18, bold: true });
            S.actor('s4-prob' + i, pos.x + 0.5, pos.y + 0.8,
              '$' + prob[0] + '. \\quad ' + prob[1] + ' = ?$', { color: INK, size: 18 });
          }
          P.clearExtras();
          P.renderCard('计算以下算术平方根：<br><br>$1.\\;\\sqrt{16}$<br>$2.\\;\\sqrt{\\dfrac{81}{100}}$<br>$3.\\;\\sqrt{0.04}$<br>$4.\\;(\\sqrt{7})^2$');
          if (!anim) return null;
          var o = S.get('s4-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 12, to: 24, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '第一题：$\\sqrt{16}$。我们要找一个正数，使它的平方等于 $16$。$4^2 = 16$，所以 $16$ 的算术平方根是 $4$。注意，$(-4)^2$ 也等于 $16$，但算术平方根只取正的那个，所以 $\\sqrt{16} = 4$，而不是 $\\pm 4$。第二题：$\\sqrt{\\dfrac{81}{100}}$。$\\left(\\dfrac{9}{10}\\right)^2 = \\dfrac{81}{100}$，所以答案是 $\\dfrac{9}{10}$。',
        enter: function (anim) {
          // 揭示例1和例2答案
          var pos0 = POSITIONS[0];
          S.shadeRect('s4-ans-bg0', pos0.x - 4.0, pos0.y - 0.3, pos0.x + 4.0, pos0.y - 2.8,
            { color: GREEN, opacity: 0.10 });
          S.actor('s4-analysis0', pos0.x, pos0.y - 0.8,
            PROBLEMS[0][2], { color: GRAY, size: 13 });
          S.actor('s4-ans0', pos0.x, pos0.y - 1.8,
            '$= ' + PROBLEMS[0][3] + '$', { color: GREEN, size: 24, bold: true });

          var pos1 = POSITIONS[1];
          S.shadeRect('s4-ans-bg1', pos1.x - 4.0, pos1.y - 0.3, pos1.x + 4.0, pos1.y - 2.8,
            { color: GREEN, opacity: 0.10 });
          S.actor('s4-analysis1', pos1.x, pos1.y - 0.8,
            PROBLEMS[1][2], { color: GRAY, size: 12 });
          S.actor('s4-ans1', pos1.x, pos1.y - 1.9,
            '$= ' + PROBLEMS[1][3] + '$', { color: GREEN, size: 22, bold: true });

          P.clearExtras();
          P.renderCard('$1.\\;\\sqrt{16} = 4$（$4^2=16$，取正）<br><br>$2.\\;\\sqrt{\\dfrac{81}{100}} = \\dfrac{9}{10}$<br>（$\\left(\\dfrac{9}{10}\\right)^2 = \\dfrac{81}{100}$）');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '第三题：$\\sqrt{0.04}$。$0.04$ 等于 $\\dfrac{4}{100}$，$(0.2)^2 = 0.04$，所以 $\\sqrt{0.04} = 0.2$。计算小数的算术平方根，可以先把小数化为分数来找规律。第四题：$(\\sqrt{7})^2$。这里用到一个重要的关系：当 $a \\geq 0$ 时，$(\\sqrt{a})^2 = a$。这是算术平方根和平方的互逆关系。所以 $(\\sqrt{7})^2 = 7$。',
        enter: function (anim) {
          // 揭示例3和例4答案
          var pos2 = POSITIONS[2];
          S.shadeRect('s4-ans-bg2', pos2.x - 4.0, pos2.y - 0.3, pos2.x + 4.0, pos2.y - 2.8,
            { color: GREEN, opacity: 0.10 });
          S.actor('s4-analysis2', pos2.x, pos2.y - 0.8,
            PROBLEMS[2][2], { color: GRAY, size: 13 });
          S.actor('s4-ans2', pos2.x, pos2.y - 1.8,
            '$= ' + PROBLEMS[2][3] + '$', { color: GREEN, size: 24, bold: true });

          var pos3 = POSITIONS[3];
          S.shadeRect('s4-ans-bg3', pos3.x - 4.0, pos3.y - 0.3, pos3.x + 4.0, pos3.y - 2.8,
            { color: GREEN, opacity: 0.10 });
          S.actor('s4-analysis3', pos3.x, pos3.y - 0.8,
            PROBLEMS[3][2], { color: GRAY, size: 13 });
          S.actor('s4-ans3', pos3.x, pos3.y - 1.8,
            '$= ' + PROBLEMS[3][3] + '$', { color: GREEN, size: 24, bold: true });

          // 重要关系式
          S.actor('s4-rel', 0, -5.5,
            '$(\\sqrt{a})^2 = a$（$a \\geq 0$）', { color: WARM, size: 20, bold: true });
          P.clearExtras();
          P.renderCard('$3.\\;\\sqrt{0.04} = 0.2$<br>（$(0.2)^2=0.04$）<br><br>$4.\\;(\\sqrt{7})^2 = 7$<br>（$(\\sqrt{a})^2 = a$，$a\\geq 0$）<br><br><b>关键公式</b>：$(\\sqrt{a})^2 = a$', 'cool');
          if (!anim) return null;
          return delay(400);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
