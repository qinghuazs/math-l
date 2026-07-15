(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a';

  // 淡色文氏图作背景，中央 ∩ 记号呼应主题
  function base() {
    S.addCircle('s7-ca', -2.2, 0, 3.0, { color: WARM, width: 2.5, fill: WARM, fillOpacity: 0.06 });
    S.addCircle('s7-cb', 2.2, 0, 3.0, { color: COOL, width: 2.5, fill: COOL, fillOpacity: 0.06 });
    S.actor('s7-sym', 0, 0, '∩', { color: PURPLE, size: 40, bold: true });
  }

  var scene = {
    id: 's7',
    title: '七、易错辨析 · 小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '判断 1：集合 $A$ 中有元素 $2$，集合 $B$ 中有元素 $3$，所以 $A\\cap B=\\{2,3\\}$。对吗？',
        enter: function () {
          P.renderCard('<b>错误！</b>交集不是把两个集合的元素<b>拼在一起</b>——<br>交集中的每一个元素，都必须<b>同时属于</b>两个集合。', 'warm');
        },
      },
      {
        narration: '判断 2：两个集合没有公共元素，就说它们"没有交集"。这种说法准确吗？',
        enter: function () {
          P.renderCard('不够准确。正确的表达是：它们的<b>交集是空集</b>，即 $A\\cap B=\\varnothing$。<br>两个集合<b>永远有交集</b>，只是交集可能为空。', 'cool');
        },
      },
      {
        narration: '判断 3：$A\\cap B=B\\cap A$，对吗？',
        enter: function () {
          P.renderCard('<b>正确。</b>无论先看 $A$ 还是先看 $B$，找的都是同一批公共元素——交集运算满足<b>交换律</b>。');
        },
      },
      {
        narration: '<b>课堂小结</b>：这节课的知识，浓缩成一张结构图。',
        enter: function () {
          P.renderTable({
            head: ['交集', '要点'],
            rows: [
              ['含义', '两个集合的公共部分'],
              ['关键词', '既……又……、同时、且'],
              ['符号', '$A\\cap B$，读作"$A$ 交 $B$"'],
              ['方法', '求交集，就是找公共元素'],
              ['图形', '文氏图的重叠部分'],
              ['特殊情况', '没有公共元素时 $A\\cap B=\\varnothing$'],
            ],
          });
        },
      },
      {
        narration: '课后作业分三层，量力而行、逐层挑战。',
        enter: function () {
          P.renderCard('基础题：<br>① $A=\\{1,3,5,7,9\\}$，$B=\\{2,3,5,8,9\\}$，求 $A\\cap B$；<br>② $A=\\{a,b,c,d\\}$，$B=\\{b,d,e\\}$，求 $A\\cap B$。');
          P.renderCard('提高题：已知 $A=\\{1,2,3,4\\}$ 且 $A\\cap B=\\{2,4\\}$，写出一个符合条件的集合 $B$（答案不唯一）。', 'cool');
          P.renderCard('实践题：调查班级同学，喜欢阅读的组成集合 $A$，喜欢运动的组成集合 $B$，找出 $A\\cap B$ 并说明它的实际意义。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
