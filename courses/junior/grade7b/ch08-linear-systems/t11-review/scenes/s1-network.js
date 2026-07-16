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

  // 画板：两直线交点"名场面"缩影
  // 直线1: 2x+3y=7  → y=(7-2x)/3
  // 直线2: 3x-y=5   → y=3x-5
  // 交点：x=2, y=1
  function drawIntersection(anim) {
    // 直线1：y=(7-2x)/3  蓝色
    S.plotCurve('ns-l1', function (x) { return (7 - 2 * x) / 3; }, {
      color: BLUE, width: 2.5, dash: 0, domain: [-1, 5], animate: false
    });
    // 直线2：y=3x-5  红色
    S.plotCurve('ns-l2', function (x) { return 3 * x - 5; }, {
      color: RED, width: 2.5, dash: 0, domain: [0.5, 4], animate: false
    });
    // 标注直线
    S.addText('ns-l1t', 3.8, 1.5, '$2x+3y=7$', { size: 13, color: BLUE });
    S.addText('ns-l2t', 3.0, 4.2, '$3x-y=5$', { size: 13, color: RED });
    // 交点 (2,1)
    if (anim) {
      return delay(400).then(function () {
        return S.dropPoint('ns-pt', 2, 1, { color: TEAL, name: '$(2,1)$', size: 4, animate: true });
      }).then(function () {
        S.addText('ns-sol', 2.2, 1.6, '方程组的解', { size: 13, color: TEAL });
      });
    } else {
      S.dropPoint('ns-pt', 2, 1, { color: TEAL, name: '$(2,1)$', size: 4, animate: false });
      S.addText('ns-sol', 2.2, 1.6, '方程组的解', { size: 13, color: TEAL });
    }
  }

  var scene = {
    id: 's1',
    title: '一、知识网络',
    bbox: [-1, 6, 6, -2],
    board: { axis: true, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：本章知识网络总览表
        narration: '同学们，今天是《二元一次方程组》第十一课时——阅读、数学活动与单元复习，也是七年级下册全部数学课程的收官课！让我们用一张知识网络总览表，把本章的核心内容一次性梳理清楚。本章共有六大知识板块：二元一次方程、二元一次方程组、代入消元法、加减消元法、实际应用问题，以及三元一次方程组初步。请看这张总览表！',
        enter: function (anim) {
          P.renderTable({
            head: ['知识板块', '核心内容'],
            rows: [
              ['二元一次方程', '两个未知数，最高次数为1，通常有无数组解'],
              ['二元一次方程组', '两个方程联立，解是两方程的公共解'],
              ['代入消元法', '由一式表示一未知数，代入另一式消元'],
              ['加减消元法', '系数相同相减·系数相反相加·系数不同先倍乘'],
              ['实际应用', '设元 → 找两个等量关系 → 列方程组 → 求解 → 检验作答'],
              ['三元一次方程组', '三元 → 二元 → 一元（逐步消元）'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：画板两直线交点"名场面"
        narration: '画板上这幅图是本章最重要的"名场面"——两条直线的交点。方程组的解在几何上就是两条直线的交点！蓝色直线是 $2x+3y=7$，红色直线是 $3x-y=5$，它们交于点 $(2,1)$——这就是方程组的解 $x=2,y=1$。这幅图揭示了代数与几何的深刻联系：解方程组，就是找两直线的交点。这是本章的核心意象，也是初中数学数形结合思想的绝佳体现！',
        enter: function (anim) {
          P.renderCard(
            '<b>核心意象：方程组的解 = 两直线的交点</b><br>' +
            '蓝色直线：$2x+3y=7$<br>' +
            '红色直线：$3x-y=5$<br>' +
            '交点 $(2,1)$ 同时满足两个方程，即为方程组的解<br>' +
            '<span style="color:#00695c"><b>消元法的本质：把两条直线的"相遇"翻译成代数运算</b></span>'
          );
          return Promise.resolve(drawIntersection(anim));
        },
      },
      {
        // 步骤3：知识树结构卡片
        narration: '让我们用一棵知识树来整理本章的层次结构！最顶层是"二元一次方程组"；第二层分为概念层（单个二元一次方程有无数解）和方法层（两大消元法）；第三层展开：代入法的流程是变形→代入→求解→回代，加减法的要诀是调整系数使一个未知数系数相等或相反后相加减；底层是应用与拓展——实际问题建模和三元方程组初步。这棵知识树就是本章的全部家当，记住它，这章就稳了！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章知识树</b><br>' +
            '<div style="font-size:13px;line-height:1.9;margin-top:4px">' +
            '二元一次方程组<br>' +
            '├─ <b>概念</b>：二元一次方程（无数解） → 联立成方程组（唯一解）<br>' +
            '├─ <b>代入消元法</b>：变形 → 代入 → 求解 → 回代 → 检验<br>' +
            '├─ <b>加减消元法</b>：<br>' +
            '│&nbsp;&nbsp;├─ 系数相同 → 相减<br>' +
            '│&nbsp;&nbsp;├─ 系数相反 → 相加<br>' +
            '│&nbsp;&nbsp;└─ 系数不同 → 先倍乘，再相加减<br>' +
            '├─ <b>实际应用</b>：审题 → 设元 → 找两个等量关系 → 列式 → 解答<br>' +
            '└─ <b>三元拓展</b>：三元 → 二元 → 一元（逐步消元降维）' +
            '</div>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
