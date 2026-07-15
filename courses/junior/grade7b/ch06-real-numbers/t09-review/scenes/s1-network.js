// s1-network.js  知识网络（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 左：抛物线交数轴小图（y=x^2-2，交x轴于±√2）
  function drawParabolaMini() {
    var fn = function (x) { return 0.6 * x * x - 1.8; };
    // 绘制抛物线（局部，x in [-2.2,2.2]）
    var pts = [];
    for (var xi = -2.2; xi <= 2.2; xi += 0.1) {
      pts.push([xi - 7, fn(xi) + 3.5]);
    }
    for (var i = 0; i < pts.length - 1; i++) {
      S.addSegment('n-par' + i, pts[i], pts[i + 1], { color: PURPLE, width: 2, dash: 0 });
    }
    // x轴
    S.addSegment('n-px', [-9.5, 1.7], [-4.5, 1.7], { color: INK, width: 1.5, dash: 0 });
    // 交点±√2
    S.dropPoint('n-p1', -8.73, 1.7, { color: RED, name: '', size: 2.5, animate: false });
    S.dropPoint('n-p2', -5.27, 1.7, { color: RED, name: '', size: 2.5, animate: false });
    S.addText('n-pm', -9.0, 1.1, '$-\\sqrt{2}$', { size: 12, color: RED });
    S.addText('n-pp', -5.5, 1.1, '$\\sqrt{2}$', { size: 12, color: RED });
    S.addText('n-pt', -8.0, 0.3, '抛物线交x轴', { size: 12, color: PURPLE });
  }

  // 中：√2 落在数轴上（单位正方形对角线→数轴）
  function drawSqrt2Mini() {
    // 数轴
    S.addSegment('n-ax', [-1.8, 3.5], [2.2, 3.5], { color: INK, width: 2, dash: 0 });
    S.addText('n-a0', -0.1, 3.0, '0', { size: 12, color: INK });
    S.addText('n-a1', 0.9, 3.0, '1', { size: 12, color: INK });
    // 正方形（边长1）
    S.addSegment('n-sq1', [-0.05, 3.5], [-0.05, 4.55], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('n-sq2', [-0.05, 4.55], [1.0, 4.55], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('n-sq3', [1.0, 4.55], [1.0, 3.5], { color: BLUE, width: 2, dash: 0 });
    // 对角线（长√2）
    S.addSegment('n-diag', [-0.05, 3.5], [1.0, 4.55], { color: RED, width: 2.5, dash: 0 });
    // √2落点
    S.dropPoint('n-sqrt2', 1.36, 3.5, { color: RED, name: '', size: 2.5, animate: false });
    S.addText('n-sqrt2lbl', 1.1, 3.0, '$\\sqrt{2}$', { size: 12, color: RED });
    S.addText('n-sqrt2t', -0.8, 2.3, '$\\sqrt{2}$落在数轴上', { size: 12, color: RED });
  }

  // 右：实数分类树小图
  function drawClassMini() {
    var bx = 5.5;
    S.addText('n-rt', bx, 7.0, '实数', { size: 14, color: INK });
    // 分支线
    S.addSegment('n-c1', [bx + 0.5, 6.8], [bx - 0.5, 6.3], { color: INK, width: 1.5, dash: 0 });
    S.addSegment('n-c2', [bx + 0.5, 6.8], [bx + 1.5, 6.3], { color: INK, width: 1.5, dash: 0 });
    S.addText('n-rat', bx - 1.5, 6.1, '有理数', { size: 12, color: BLUE });
    S.addText('n-irr', bx + 0.8, 6.1, '无理数', { size: 12, color: RED });
    // 有理数子分支
    S.addSegment('n-c3', [bx - 1.0, 5.9], [bx - 1.8, 5.4], { color: BLUE, width: 1, dash: 0 });
    S.addSegment('n-c4', [bx - 1.0, 5.9], [bx - 0.3, 5.4], { color: BLUE, width: 1, dash: 0 });
    S.addText('n-fin', bx - 2.8, 5.2, '有限小数', { size: 11, color: BLUE });
    S.addText('n-rep', bx - 0.9, 5.2, '循环小数', { size: 11, color: BLUE });
    // 无理数说明
    S.addText('n-irrd', bx + 0.3, 5.5, '不循环', { size: 11, color: RED });
    S.addText('n-irrd2', bx + 0.1, 4.9, '无限小数', { size: 11, color: RED });
  }

  var scene = {
    id: 's1',
    title: '一、知识网络',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：四大知识块总览表
        narration: '同学们，我们用整整一章学习了《实数》。今天是第九课时——数学活动与单元复习，是本章的收官课。让我们先来梳理整章的知识网络。本章共有四大块：平方根、算术平方根、立方根，以及实数的分类与运算。请看这张总览表，把握全局！',
        enter: function (anim) {
          P.renderTable({
            head: ['知识板块', '核心内容'],
            rows: [
              ['平方根', '$x^2=a$ 的解 · 正数两根 · 0一根 · 负数无根'],
              ['算术平方根', '$\\sqrt{a}$（$a\\geq0$）· 结果非负 · $(\\sqrt{a})^2=a$ · $\\sqrt{a^2}=|a|$'],
              ['立方根', '$x^3=a$ 的解 · 每个数唯一 · $\\sqrt[3]{-a}=-\\sqrt[3]{a}$'],
              ['实数分类与运算', '有理数与无理数 · 数轴一一对应 · 估算 · 比较大小'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：画板三大名场面缩影
        narration: '再来看画板——我们把本章三大"名场面"并排：左边是抛物线与 $x$ 轴交于 $\\pm\\sqrt{2}$，揭示了无理数产生的动机；中间是单位正方形对角线长 $\\sqrt{2}$ 被转移到数轴上的经典构造；右边是实数完整的分类树。这三幅图是本章的视觉灵魂，见到就能想起对应的知识！',
        enter: function (anim) {
          drawParabolaMini();
          drawSqrt2Mini();
          drawClassMini();
          // 分隔线
          S.addSegment('n-div1', [-3.3, 7.2], [-3.3, 1.0], { color: '#b0bec5', width: 1.5, dash: 2 });
          S.addSegment('n-div2', [3.3, 7.2], [3.3, 1.0], { color: '#b0bec5', width: 1.5, dash: 2 });
          S.addText('n-hd', -1.0, 7.3, '第六章 · 知识网络全景', { size: 16, color: INK });
          P.renderCard(
            '<b>三大核心图形</b><br>' +
            '左：抛物线与 $x$ 轴的交点 → 无理数的诞生<br>' +
            '中：正方形对角线 $\\sqrt{2}$ → 数轴上的无理数点<br>' +
            '右：实数分类树 → 有理数与无理数的完整体系'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：复习重点提示卡
        narration: '复习有六个重点：第一，平方根与算术平方根的区分——一个两个、一个非负；第二，$\\sqrt{a^2}=|a|$ 的绝对值不能漏；第三，负数的立方根存在但平方根不存在；第四，带根号不一定是无理数（$\\sqrt{16}=4$）；第五，无限小数不一定是无理数（循环的是有理数）；第六，估算根式要先找相邻的完全平方数。下面我们逐块复习！',
        enter: function (anim) {
          P.renderCard(
            '<b>六大复习重点</b><br>' +
            '<ol style="margin:6px 0 0 16px;line-height:2">' +
            '<li>平方根（$\\pm$）与算术平方根（非负）的区分</li>' +
            '<li>$\\sqrt{a^2}=|a|$，<b>不要漏绝对值</b></li>' +
            '<li>负数：无平方根，但<b>有立方根</b></li>' +
            '<li>带根号的数<b>不一定</b>是无理数</li>' +
            '<li>无限小数<b>不一定</b>是无理数（看循环）</li>' +
            '<li>估算根式：先找<b>相邻完全平方数</b></li>' +
            '</ol>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
