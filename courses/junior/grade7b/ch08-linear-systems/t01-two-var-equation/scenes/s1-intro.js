(function (CW) {
  'use strict';
  // s1 情境导入：篮球联赛问题引出二元一次方程
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's1',
    title: '一、情境导入：篮球联赛',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，今天我们先从一个篮球联赛的问题入手。某校篮球队参加联赛，共赛了10场，胜一场得2分，负一场得1分，该队共得16分。请问：胜了几场，负了几场？',
        enter: function (anim) {
          // 标题
          S.actor('s1-title', 0, 6.5, '篮球联赛积分问题', {
            color: BLUE, size: 22, bold: true,
          });

          // 题目背景框
          S.addPolygon('s1-box', [
            [-9, 5.2], [9, 5.2], [9, 2.0], [-9, 2.0],
          ], { color: BLUE, opacity: 0.07, borderWidth: 2, strokeColor: BLUE });

          // 题目内容
          S.actor('s1-q1', 0, 4.6, '共赛 10 场：胜  +  负  = 10', {
            color: INK, size: 17,
          });
          S.actor('s1-q2', 0, 3.3, '得分：胜得 2 分，负得 1 分，共 16 分', {
            color: INK, size: 17,
          });

          // 问题
          S.actor('s1-ask', 0, 1.0, '胜了几场？  负了几场？', {
            color: ORANGE, size: 20, bold: true,
          });

          P.renderCard('同学们先思考一下：如果用一个未知数，能列出方程解这道题吗？');
        },
      },
      {
        narration: '我们设胜了 x 场，则负了多少场呢？由于共赛10场，负了 10-x 场。得分方程：2x + (10-x) = 16，解得 x = 6。一个未知数也能解！但今天我们换一种思路——同时设两个未知数。',
        enter: function (anim) {
          // 一元解法
          S.addPolygon('s1-one-bg', [
            [-9, 0.2], [9, 0.2], [9, -2.8], [-9, -2.8],
          ], { color: GRAY, opacity: 0.10, borderWidth: 1.5, strokeColor: GRAY });
          S.actor('s1-one-label', 0, -0.3, '【一元解法】设胜了 x 场，负了 (10-x) 场', {
            color: INK, size: 15,
          });
          S.actor('s1-one-eq', 0, -1.4, '得分方程：2x + (10 - x) = 16', {
            color: INK, size: 15,
          });
          S.actor('s1-one-ans', 0, -2.4, '解得 x = 6，即胜 6 场、负 4 场', {
            color: GREEN, size: 15,
          });

          P.renderCard('一元方程能解，但需要用已知条件"转化"，思路稍繁琐。<br>下面试试<b>同时设两个未知数</b>——更直接！');
        },
      },
      {
        narration: '现在设胜了 x 场，负了 y 场。直接用两个未知数来描述两个条件：场数条件得 x + y = 10，得分条件得 2x + y = 16。这就出现了含有两个未知数的方程！',
        enter: function (anim) {
          // 两个未知数引出
          S.actor('s1-set', -4, -4.0, '设胜了 $x$ 场，负了 $y$ 场', {
            color: BLUE, size: 17, bold: true,
          });

          // 条件1
          S.addPolygon('s1-c1-bg', [
            [-9.5, -5.0], [0, -5.0], [0, -6.5], [-9.5, -6.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s1-c1-title', -4.75, -5.4, '场数条件', { color: BLUE, size: 14, bold: true });
          S.actor('s1-c1-eq', -4.75, -6.1, '$x + y = 10$', { color: BLUE, size: 16 });

          // 条件2
          S.addPolygon('s1-c2-bg', [
            [0.2, -5.0], [9.5, -5.0], [9.5, -6.5], [0.2, -6.5],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s1-c2-title', 4.85, -5.4, '得分条件', { color: ORANGE, size: 14, bold: true });
          S.actor('s1-c2-eq', 4.85, -6.1, '$2x + y = 16$', { color: ORANGE, size: 16 });

          P.renderCard(
            '两个条件，两个未知数，得到<b>两个方程</b>：<br>' +
            '$x+y=10$ 和 $2x+y=16$<br>' +
            '含两个未知数的方程——这就是今天的主角！'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
