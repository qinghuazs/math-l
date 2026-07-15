(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var CSS_CARD = 'background:#fff8e1;border:2px solid #f9a825;border-radius:8px;padding:6px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、情境导入：生活中的相交',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，先来看看生活中这些熟悉的场景：张开的剪刀、十字路口、钟表的两个指针……它们有什么共同特点？对——都有两条线交叉在一起！在数学里，我们称这种情形为两直线<b>相交</b>。今天这节课，就从这里出发。',
        enter: function (anim) {
          // 画剪刀示意：两条线段相交呈X形
          var items = [
            ['s1-title', 0, 6.2, '生活中的相交', { color: INK, size: 28, bold: true }],
          ];
          var p = Promise.resolve();
          items.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], it[4]);
              return anim ? delay(300) : null;
            });
          });
          // 剪刀图示：左侧两条相交线段，模拟剪刀张开
          p = p.then(function () {
            S.addSegment('s1-scissor1', [-6, 4.5], [-1, 1.5], { color: INK, width: 5, dash: 0 });
            S.addSegment('s1-scissor2', [-6, 1.5], [-1, 4.5], { color: WARM, width: 5, dash: 0 });
            S.actor('s1-lbl-sci', -3.5, 0.5, '剪刀', { color: INK, size: 16 });
            return anim ? delay(400) : null;
          }).then(function () {
            // 道路交叉：中间用直线模拟十字路口
            S.addSegment('s1-road1', [0.5, 5], [0.5, 1], { color: COOL, width: 6, dash: 0 });
            S.addSegment('s1-road2', [-1, 3], [2, 3], { color: COOL, width: 6, dash: 0 });
            S.actor('s1-lbl-road', 0.5, 0.5, '路口', { color: INK, size: 16 });
            return anim ? delay(400) : null;
          }).then(function () {
            // 时钟指针：两条从中心出发的射线
            S.addSegment('s1-clock1', [4.5, 3], [5.5, 5], { color: GREEN, width: 5, dash: 0 });
            S.addSegment('s1-clock2', [4.5, 3], [6.5, 2.8], { color: WARM, width: 5, dash: 0 });
            S.actor('s1-lbl-clock', 5.0, 0.5, '指针', { color: INK, size: 16 });
            return anim ? delay(400) : null;
          });
          return p;
        },
      },
      {
        narration: '好，现在请大家思考这个问题：<b>两条直线相交，会形成几个角？</b>你可以先猜一猜，再用笔在草稿纸上画一画，数一数。想好了吗？我们接下来一起在图上找答案。',
        enter: function (anim) {
          P.renderCard('思考问题：<br><b>两条直线相交后，会形成几个角？</b><br><br>请先在草稿纸上画一画，数一数。');
          S.actor('s1-q1', 0, -2.5, '两直线相交 → 形成 __ 个角', { color: WARM, size: 22, bold: true, css: CSS_CARD });
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '答案是<b>四个角</b>！两条直线相交，会形成四个角。接下来，我们就用数学方法来研究这四个角之间的关系——它们有的相邻，有的"对着看"，位置不同，关系也不同。',
        enter: function () {
          S.actor('s1-ans', 0, -2.5, '两直线相交 → 形成 4 个角', { color: GREEN, size: 22, bold: true, css: CSS_CARD });
          P.renderCard('✓ 两条直线相交，形成 <b>4 个角</b>。<br>这 4 个角可以分成两组：<br>① <b>邻补角</b>：相邻的两个角（共一条边）<br>② <b>对顶角</b>：对着的两个角（顶点相同，无公共边）');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
