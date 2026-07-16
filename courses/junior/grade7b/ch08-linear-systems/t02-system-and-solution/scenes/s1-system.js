(function (CW) {
  'use strict';
  // s1 从一个方程到方程组
  var S, P;
  var BLUE   = '#1565c0';
  var ORANGE = '#e65100';
  var GREEN  = '#2e7d32';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's1',
    title: '一、从两个方程到方程组',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '上节课我们用两个未知数描述篮球联赛问题：设胜了 x 场、负了 y 场，得到两个方程——x+y=10 和 2x+y=16。每个方程单独来看，解有多少组？',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.8, '篮球联赛问题的两个方程', {
            color: BLUE, size: 22, bold: true,
          });

          // 方程①背景框
          S.addPolygon('s1-box1', [
            [-9.5, 5.2], [-0.3, 5.2], [-0.3, 2.0], [-9.5, 2.0],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s1-eq1-label', -4.9, 4.7, '方程①（场数）', { color: BLUE, size: 14, bold: true });
          S.actor('s1-eq1', -4.9, 3.6, '$x + y = 10$', { color: BLUE, size: 20, bold: true });

          // 方程②背景框
          S.addPolygon('s1-box2', [
            [0.3, 5.2], [9.5, 5.2], [9.5, 2.0], [0.3, 2.0],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s1-eq2-label', 4.9, 4.7, '方程②（得分）', { color: ORANGE, size: 14, bold: true });
          S.actor('s1-eq2', 4.9, 3.6, '$2x + y = 16$', { color: ORANGE, size: 20, bold: true });

          // 若干组解示例
          S.actor('s1-sols1-title', -4.9, 1.2, '方程①的部分解', { color: BLUE, size: 13 });
          S.actor('s1-sols1', -4.9, 0.1,
            '$(0,10)$  $(3,7)$  $(5,5)$  $(6,4)$ ···',
            { color: BLUE, size: 14 });
          S.actor('s1-sols1-more', -4.9, -0.8, '无数组解！', { color: BLUE, size: 15, bold: true });

          S.actor('s1-sols2-title', 4.9, 1.2, '方程②的部分解', { color: ORANGE, size: 13 });
          S.actor('s1-sols2', 4.9, 0.1,
            '$(0,16)$  $(3,10)$  $(5,6)$  $(6,4)$ ···',
            { color: ORANGE, size: 14 });
          S.actor('s1-sols2-more', 4.9, -0.8, '无数组解！', { color: ORANGE, size: 15, bold: true });

          P.renderCard(
            '每个方程单独看，都有<b>无数组解</b>——<br>' +
            '无法确定胜了几场、负了几场。'
          );
        },
      },
      {
        narration: '胜负场数必须同时满足两个条件！只有 x=6、y=4 同时满足两个方程。我们把两个方程用大括号联立在一起，就组成了一个二元一次方程组。',
        enter: function (anim) {
          // 同时满足的解高亮
          S.actor('s1-key', 0, -2.2, '必须同时满足两个方程！', {
            color: GREEN, size: 19, bold: true,
          });

          // 大括号方程组（用画板双行文字模拟）
          S.addPolygon('s1-sys-bg', [
            [-5.5, -3.2], [5.5, -3.2], [5.5, -6.6], [-5.5, -6.6],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2.5, strokeColor: GREEN });
          S.actor('s1-sys-label', 0, -3.6, '二元一次方程组', { color: GREEN, size: 15, bold: true });
          S.actor('s1-sys-brace', -4.0, -5.0, '{', { color: INK, size: 40 });
          S.actor('s1-sys-eq1', 0.5, -4.3, '$x + y = 10$', { color: BLUE, size: 18, bold: true });
          S.actor('s1-sys-eq2', 0.5, -5.8, '$2x + y = 16$', { color: ORANGE, size: 18, bold: true });

          P.renderCard(
            '<b>二元一次方程组</b>：把含相同未知数的两个二元一次方程合在一起，<br>' +
            '用大括号联立，就组成一个<b>二元一次方程组</b>。<br>' +
            '$\\begin{cases}x+y=10\\\\2x+y=16\\end{cases}$'
          );
        },
      },
      {
        narration: '看一看这个方程组的特点：含有 x、y 两个未知数，每个方程都是关于 x、y 的一次方程。这正是"二元一次方程组"名称的含义——"二元"指两个未知数，"一次"指每个方程中未知数的最高次数都是一次。',
        enter: function (anim) {
          // 名称分析标注
          S.actor('s1-name', 0, -7.2,
            '二元：2个未知数   一次：最高次数为1   方程组：多个方程联立',
            { color: INK, size: 14 });

          S.addSegment('s1-line', [-9.5, -7.6], [9.5, -7.6], {
            color: GREEN, width: 2, dash: 0,
          });

          P.renderCard(
            '<b>名称解析</b>：<br>' +
            '二元 → 含 <b>2</b> 个未知数（$x$ 和 $y$）<br>' +
            '一次 → 每个方程中未知数最高次数为 <b>1</b><br>' +
            '方程组 → 多个方程<b>联立</b>（大括号）',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
