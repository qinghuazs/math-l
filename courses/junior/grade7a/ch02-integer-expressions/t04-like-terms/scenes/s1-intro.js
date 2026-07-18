// s1-intro.js  一、超市归类（3步）
// 情境：苹果+苹果可以合并，苹果+橙子不能合并，引出"同类才能合"
// 数学验算：3a+5a=(3+5)a=8a；8a 与 2b 字母不同不能合并
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、超市归类',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：货架情境，苹果和橙子
      {
        narration: '同学们，我们先来看一道生活中的问题。超市货架上有 3 箱苹果、5 箱苹果，还有 2 筐橙子。请问：哪些货物可以合在一起数？苹果和橙子能合并吗？',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.0, '一、超市归类', { color: COOL, size: 22, bold: true });

          S.actor('s1-apple1', -5, 4.5, '苹果 × 3 箱', { color: WARM, size: 20 });
          S.actor('s1-apple2', 0, 4.5, '苹果 × 5 箱', { color: WARM, size: 20 });
          S.actor('s1-orange', 5, 4.5, '橙子 × 2 筐', { color: ORANGE, size: 20 });

          S.actor('s1-q', 0, 2.0,
            '哪些可以合并？苹果和橙子能合并吗？',
            { color: INK, size: 17 });

          P.renderCard(
            '<b>超市归类问题</b><br>' +
            '货架上有 3 箱苹果、5 箱苹果、2 筐橙子。<br>' +
            '请思考：哪些货物可以合并计数？'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：用字母列算式，揭示分配律逆用
      {
        narration: '苹果和苹果可以合，因为是同一种东西！橙子和苹果不能合，因为种类不同。现在我们用字母来描述：设苹果为 a，橙子为 b。于是 3 箱苹果加 5 箱苹果，用字母写就是 3a 加 5a；利用分配律逆用：3a 加 5a 等于括号 3 加 5 再乘以 a，等于 8a。而 8a 和 2b 字母不同，不能合并！',
        enter: function (anim) {
          S.remove('s1-q');

          S.actor('s1-let', -7, 2.5, '设苹果为 $a$，橙子为 $b$：', { color: INK, size: 17 });
          S.actor('s1-expr1', 0, 1.0,
            '$3a + 5a + 2b$',
            { color: INK, size: 24, bold: true });
          S.actor('s1-merge', -2, -1.0,
            '$3a + 5a = (3 + 5)a = 8a$',
            { color: WARM, size: 21 });
          S.actor('s1-no', 3, -2.8,
            '$8a$ 与 $2b$：字母不同，不能合并！',
            { color: COOL, size: 17 });

          P.renderCard(
            '<b>字母计算</b><br>' +
            '苹果：$3a + 5a = (3+5)a = 8a$<br>' +
            '橙子：$2b$ 保留<br>' +
            '<b>$8a$ 和 $2b$ 字母不同，不能合并！</b>'
          );

          return anim ? delay(500) : null;
        },
      },

      // Step 3：条形图动画示意 + 引出课题
      {
        narration: '我们用柱形图来感受一下。苹果高 3，再来 5，合并后变成高 8。橙子高 2，单独留着。同类的东西才能合并——这就是我们今天要学的"合并同类项"！',
        enter: function (anim) {
          S.remove('s1-title');
          S.remove('s1-apple1');
          S.remove('s1-apple2');
          S.remove('s1-orange');
          S.remove('s1-let');
          S.remove('s1-expr1');
          S.remove('s1-merge');
          S.remove('s1-no');

          // 苹果柱1（高3）
          S.addBar('s1-bar-a1', -5, 0, 1.4, 3, { color: WARM, fill: WARM, fillOpacity: 0.7 });
          S.addText('s1-bar-a1-lab', -5, -0.6, '$3a$', { color: WARM, size: 16 });

          // 苹果柱2（高5）
          S.addBar('s1-bar-a2', -3.4, 0, 1.4, 5, { color: WARM, fill: WARM, fillOpacity: 0.4 });
          S.addText('s1-bar-a2-lab', -3.4, -0.6, '$5a$', { color: WARM, size: 16 });

          // 橙子柱（高2）
          S.addBar('s1-bar-b', 3, 0, 1.4, 2, { color: ORANGE, fill: ORANGE, fillOpacity: 0.6 });
          S.addText('s1-bar-b-lab', 3, -0.6, '$2b$', { color: ORANGE, size: 16 });

          if (!anim) {
            // 快放：直接显示合并后柱（高8）
            S.addBar('s1-bar-merged', -5, 0, 2.9, 8, { color: WARM, fill: WARM, fillOpacity: 0.85 });
            S.addText('s1-bar-merged-lab', -4.5, -0.6, '$8a$', { color: WARM, size: 18, bold: true });
            S.actor('s1-topic', 0, 6.5, '课题：合并同类项', { color: COOL, size: 22, bold: true });
            P.renderCard(
              '<b>课题：合并同类项</b><br>' +
              '苹果柱合并为 $8a$，橙子 $2b$ 独立保留。<br>' +
              '同类的才能合——这就是<b>合并同类项</b>！'
            );
            return null;
          }

          return delay(800).then(function () {
            S.remove('s1-bar-a1');
            S.remove('s1-bar-a1-lab');
            S.remove('s1-bar-a2');
            S.remove('s1-bar-a2-lab');
            S.addBar('s1-bar-merged', -5, 0, 2.9, 8, { color: WARM, fill: WARM, fillOpacity: 0.85 });
            S.addText('s1-bar-merged-lab', -4.5, -0.6, '$8a$', { color: WARM, size: 18, bold: true });
            return delay(600);
          }).then(function () {
            S.actor('s1-topic', 0, 6.5, '课题：合并同类项', { color: COOL, size: 22, bold: true });
            P.renderCard(
              '<b>课题：合并同类项</b><br>' +
              '苹果柱合并为 $8a$，橙子 $2b$ 独立保留。<br>' +
              '同类的才能合——这就是<b>合并同类项</b>！',
              'cool'
            );
            return delay(300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
