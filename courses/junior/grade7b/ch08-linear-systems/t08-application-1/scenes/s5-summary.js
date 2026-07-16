(function (CW) {
  'use strict';
  // s5 课堂小结
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '今天我们学习了用二元一次方程组解实际问题，一共见了三种典型情境：鸡兔同笼（数量与总量）、和倍问题（和与倍数关系）、顺逆流问题（速度和差）。来做一个完整的小结：',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '课堂小结：三类应用题', {
            color: BLUE, size: 22, bold: true,
          });

          // 三类问题对比表
          P.renderTable({
            head: ['题型', '未知量', '方程组模型', '消元方法'],
            rows: [
              ['鸡兔同笼', '鸡数 $x$，兔数 $y$',
               '$x+y=35$<br>$2x+4y=94$', '加减消元'],
              ['和倍问题', '大数 $x$，小数 $y$',
               '$x+y=36$<br>$x=2y$', '代入消元'],
              ['顺逆流', '船速 $v$，水速 $w$',
               '$v+w=20$<br>$v-w=16$', '加减消元'],
            ],
          });
        },
      },
      {
        narration: '最重要的是"两个等量关系"——一道题要能列方程组，就必须从题目中找到两个独立的等量关系，每个关系对应一个方程。没有两个关系，就无法唯一确定两个未知量。这是判断"能不能列方程组"的根本依据！下节课我们继续学习实际问题与方程组（二），探索更多类型的应用题。',
        enter: function (anim) {
          // 核心思想卡片
          S.addPolygon('s5-core-bg', [
            [-9, 5.0], [9, 5.0], [9, 2.5], [-9, 2.5],
          ], { color: BLUE, opacity: 0.09, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-core-title', 0, 4.6, '★ 核心思想', { color: BLUE, size: 20, bold: true });
          S.actor('s5-core-t1', 0, 3.75,
            '找到两个独立的等量关系，是列方程组的关键！',
            { color: RED, size: 16, bold: true });
          S.actor('s5-core-t2', 0, 2.95,
            '两个关系 → 两个方程 → 唯一解',
            { color: BLUE, size: 15 });

          // 七步法浓缩
          S.addPolygon('s5-step-bg', [
            [-9, 2.0], [9, 2.0], [9, 0.6], [-9, 0.6],
          ], { color: GREEN, opacity: 0.07, borderWidth: 1.5, strokeColor: GREEN });
          S.actor('s5-step-text', 0, 1.35,
            '七步：审→设→找→列→解→验→答',
            { color: GREEN, size: 16, bold: true });

          // 下节预告
          S.addPolygon('s5-next-bg', [
            [-7, -0.3], [7, -0.3], [7, -1.8], [-7, -1.8],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s5-next-text', 0, -1.0,
            '下节课：实际问题与方程组（二）',
            { color: ORANGE, size: 17, bold: true });

          P.renderCard(
            '<b>今日三类题型</b>：鸡兔同笼 / 和倍问题 / 顺逆流<br>' +
            '<b>共同关键</b>：找两个独立等量关系<br>' +
            '<b>七步法</b>：审→设→找→列→解→验→答<br>' +
            '下节继续：更多类型的实际问题！',
            'cool',
            'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
