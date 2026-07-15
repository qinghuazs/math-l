// s2-roots.js  开方运算复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、开方运算复习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：三栏对照表
        narration: '开方运算复习从三个概念的对比开始——平方根、算术平方根、立方根。请看这张三栏对照表：第一栏是定义，第二栏是符号写法，第三栏是个数与正负。核心区分：平方根正数有两个（正负各一），算术平方根只取非负那一个；立方根则每个实数唯一，正负数均有。',
        enter: function (anim) {
          P.renderTable({
            head: ['概念', '定义方程', '符号', '个数与正负'],
            rows: [
              ['平方根', '$x^2 = a$', '$\\pm\\sqrt{a}$', '正数两个；0一个（为0）；负数无'],
              ['算术平方根', '——', '$\\sqrt{a}\\;(a\\geq0)$', '结果唯一且 $\\geq 0$'],
              ['立方根', '$x^3 = a$', '$\\sqrt[3]{a}$', '每个实数恰好一个（正/负同号）'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：典型陷阱题——√81 的平方根（分步揭示）
        narration: '来看一道经典"陷阱题"：求 $\\sqrt{81}$ 的平方根。注意，这里有两步：第一步先求 $\\sqrt{81}$，得到 $9$；第二步再求 $9$ 的平方根，得到 $\\pm 3$。很多同学一看到题目，直接写 $\\sqrt{81} = \\pm 9$——这就混淆了"算术平方根"和"平方根"的概念。$\\sqrt{81}$ 是算术平方根，只有 $9$；而 $9$ 的平方根才是 $\\pm 3$！',
        enter: function (anim) {
          // 画板分步揭示
          S.addText('r-title', -9, 6.5, '陷阱题：求 $\\sqrt{81}$ 的平方根', { size: 17, color: INK });
          S.addText('r-step1h', -9, 5.2, '第一步：先求 $\\sqrt{81}$', { size: 15, color: BLUE });

          if (!anim) {
            S.addText('r-step1', -9, 4.2, '$\\sqrt{81} = 9$（算术平方根，唯一且非负）', { size: 15, color: BLUE });
            S.addText('r-step2h', -9, 3.0, '第二步：求 9 的平方根', { size: 15, color: ORANGE });
            S.addText('r-step2', -9, 2.0, '$9$ 的平方根 $= \\pm 3$', { size: 16, color: RED });
            S.addText('r-warn', -9, 0.7, '⚠ 不是 $\\pm 9$！$\\sqrt{81}$ 只等于 $9$', { size: 14, color: RED });
            S.addText('r-wrong', -9, -0.5, '错误写法：$\\sqrt{81} = \\pm 9$  ✗', { size: 14, color: RED });
            S.addText('r-right', -9, -1.7, '正确答案：$\\sqrt{81}$ 的平方根 $= \\pm 3$  ✓', { size: 14, color: GREEN });
            P.renderCard(
              '<b>陷阱题解析</b><br>' +
              '题目：求 $\\sqrt{81}$ 的平方根<br><br>' +
              '步骤1：$\\sqrt{81} = 9$（算术平方根，非负）<br>' +
              '步骤2：$9$ 的平方根 $= \\pm3$<br><br>' +
              '<b style="color:#c62828">答案：$\\pm3$，不是 $\\pm9$！</b>'
            );
            return;
          }
          return delay(400).then(function () {
            S.addText('r-step1', -9, 4.2, '$\\sqrt{81} = 9$（算术平方根，唯一且非负）', { size: 15, color: BLUE });
            return delay(600);
          }).then(function () {
            S.addText('r-step2h', -9, 3.0, '第二步：求 9 的平方根', { size: 15, color: ORANGE });
            return delay(500);
          }).then(function () {
            S.addText('r-step2', -9, 2.0, '$9$ 的平方根 $= \\pm 3$', { size: 16, color: RED });
            return delay(500);
          }).then(function () {
            S.addText('r-warn', -9, 0.7, '⚠ 不是 $\\pm 9$！$\\sqrt{81}$ 只等于 $9$', { size: 14, color: RED });
            S.addText('r-wrong', -9, -0.5, '错误写法：$\\sqrt{81} = \\pm 9$  ✗', { size: 14, color: RED });
            S.addText('r-right', -9, -1.7, '正确答案：$\\sqrt{81}$ 的平方根 $= \\pm 3$  ✓', { size: 14, color: GREEN });
            P.renderCard(
              '<b>陷阱题解析</b><br>' +
              '题目：求 $\\sqrt{81}$ 的平方根<br><br>' +
              '步骤1：$\\sqrt{81} = 9$（算术平方根，非负）<br>' +
              '步骤2：$9$ 的平方根 $= \\pm3$<br><br>' +
              '<b style="color:#c62828">答案：$\\pm3$，不是 $\\pm9$！</b>'
            );
          });
        },
      },
      {
        // 步骤3：综合例题——√(−8)² 和 ∛(−27/64)
        narration: '再来两道综合例题巩固。例题一：计算 $\\sqrt{(-8)^2}$。注意：$\\sqrt{a^2}=|a|$，所以 $\\sqrt{(-8)^2}=|-8|=8$，而不是 $-8$！根号下先算平方得 $64$，$\\sqrt{64}=8$，结果是正的。例题二：求 $\\sqrt[3]{-\\dfrac{27}{64}}$。立方根的负号可以提出来，$\\sqrt[3]{-\\dfrac{27}{64}}=-\\sqrt[3]{\\dfrac{27}{64}}=-\\dfrac{3}{4}$。两道题都是本章的典型考题！',
        enter: function (anim) {
          S.addText('r2-e1h', -9, 6.5, '例题一：$\\sqrt{(-8)^2}$', { size: 16, color: BLUE });
          S.addText('r2-e1s1', -9, 5.4, '$\\sqrt{(-8)^2} = \\sqrt{64} = 8$', { size: 15, color: BLUE });
          S.addText('r2-e1s2', -9, 4.4, '或：$\\sqrt{(-8)^2} = |-8| = 8$', { size: 15, color: BLUE });
          S.addText('r2-e1w', -9, 3.4, '⚠ 结果是 $8$，不是 $-8$！', { size: 14, color: RED });

          S.addSegment('r2-div', [-9, 2.8], [9, 2.8], { color: '#b0bec5', width: 1, dash: 2 });

          S.addText('r2-e2h', -9, 2.2, '例题二：$\\sqrt[3]{-\\dfrac{27}{64}}$', { size: 16, color: ORANGE });
          S.addText('r2-e2s1', -9, 1.0, '$= -\\sqrt[3]{\\dfrac{27}{64}}$', { size: 15, color: ORANGE });
          S.addText('r2-e2s2', -9, 0.0, '$= -\\dfrac{\\sqrt[3]{27}}{\\sqrt[3]{64}}$', { size: 15, color: ORANGE });
          S.addText('r2-e2s3', -9, -1.2, '$= -\\dfrac{3}{4}$', { size: 16, color: GREEN });

          P.renderCard(
            '<b>两道典型例题</b><br>' +
            '① $\\sqrt{(-8)^2} = |-8| = \\mathbf{8}$<br>' +
            '<span style="color:#c62828">关键：$\\sqrt{a^2}=|a|$，结果恒非负</span><br><br>' +
            '② $\\sqrt[3]{-\\dfrac{27}{64}} = -\\dfrac{3}{4}$<br>' +
            '<span style="color:#e65100">关键：立方根负号可提出，$\\sqrt[3]{-a}=-\\sqrt[3]{a}$</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
