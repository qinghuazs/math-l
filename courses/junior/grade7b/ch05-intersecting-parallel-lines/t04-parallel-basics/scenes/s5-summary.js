(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';

  var scene = {
    id: 's5',
    title: '五、小结与练习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '今天我们学习了平行线的三个核心内容：定义、符号记法、平行公理，以及推论。让我们用一张表格来归纳梳理。',
        enter: function () {
          P.renderTable({
            head: ['知识点', '核心内容'],
            rows: [
              ['定义三要素', '① 同一平面内 ② 两条直线 ③ 不相交'],
              ['符号记法', '$a \\parallel b$（读作：$a$ 平行于 $b$）'],
              ['平行公理', '过直线外一点，有且只有一条直线与已知直线平行'],
              ['推论', '平行于同一直线的两条直线互相平行'],
            ],
          });

          // 画三组平行线示意
          S.addSegment('sum-a1', [-9, 5.5], [-1, 5.5], { color: BLUE, width: 3, dash: 0 });
          S.addSegment('sum-a2', [-9, 3.5], [-1, 3.5], { color: BLUE, width: 3, dash: 0 });
          S.actor('sum-sym', -5, 4.5, '∥', { color: ORANGE, size: 26, bold: true });
        },
      },
      {
        narration: '下面来做几道判断题，巩固今天所学。请同学们先自己判断，再看答案。',
        enter: function () {
          P.renderTable({
            head: ['题目', '判断', '说明'],
            rows: [
              [
                '在同一平面内，两条不相交的线段一定平行',
                '✗',
                '线段延长后可能相交；平行要求整条<b>直线</b>不相交'
              ],
              [
                '过直线上一点，能作且只能作一条直线与已知直线平行',
                '✗',
                '平行公理的条件是"直线<b>外</b>一点"，线上的点作不出平行线'
              ],
              [
                '若 $a \\parallel b$，$b \\parallel c$，则 $a \\parallel c$',
                '✓',
                '平行公理推论（传递性）'
              ],
            ],
          });
        },
      },
      {
        narration: '最后我们来看一道综合题，加深理解。已知：直线 a 平行于直线 b，直线 b 平行于直线 c，直线 c 平行于直线 d。请问：a 与 d 是否平行？说出你的理由。',
        enter: function () {
          P.renderCard(
            '<b>综合练习</b><br>' +
            '已知：$a \\parallel b$，$b \\parallel c$，$c \\parallel d$<br>' +
            '求证：$a \\parallel d$<br><br>' +
            '<b>解答思路</b>：<br>' +
            '由 $a \\parallel b$，$b \\parallel c$，根据推论得 $a \\parallel c$；<br>' +
            '再由 $a \\parallel c$，$c \\parallel d$，再次用推论得 $a \\parallel d$。<br><br>' +
            '推论可以连续使用，这是平行关系的<b>传递性</b>。',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
