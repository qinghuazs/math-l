// s1-intro.js  环节一：带括号的方程来了（3步）
// 数学验算：顺流路程=2(x+3), 逆流路程=2.5(x-3); 路程相等列方程 2(x+3)=2.5(x-3)
// 本环节只列方程，制造认知冲突，不求解
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、带括号的方程来了',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，上节课我们学了移项，今天换一道方程——一艘船顺流航行 2 小时到达目的地，逆流返回需要 2.5 小时，水流速度是 3 千米每小时。设船在静水中的速度是 $x$ 千米每小时，顺流速度就是 $(x+3)$，逆流速度就是 $(x-3)$，两次走的是同一段路，路程相等，列出方程来看看。',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.2, '情境：顺逆流问题', { color: COOL, size: 22, bold: true });
          S.actor('s1-cond1', 0, 4.5, '顺流航行 2 小时，逆流返回 2.5 小时', { color: INK, size: 18 });
          S.actor('s1-cond2', 0, 3.2, '水流速度 3 千米/时，设静水速度 $x$ 千米/时', { color: INK, size: 18 });
          if (!anim) { return null; }
          return delay(300);
        },
      },
      {
        narration: '顺流速度等于静水速度加水速，就是 $(x+3)$；逆流速度等于静水速度减水速，就是 $(x-3)$。两段路程相等：顺流路程 $2(x+3)$ 等于逆流路程 $2.5(x-3)$。这个方程就是我们今天要解决的。',
        enter: function (anim) {
          S.actor('s1-speed1', -4, 1.5, '顺流速度：$(x+3)$ 千米/时', { color: TEAL, size: 17 });
          S.actor('s1-speed2', 4, 1.5, '逆流速度：$(x-3)$ 千米/时', { color: WARM, size: 17 });
          S.actor('s1-eq-label', 0, 0.0, '路程相等，列方程：', { color: INK, size: 18 });
          S.actor('s1-eq', 0, -1.5, '$2(x+3) = 2.5(x-3)$', { color: COOL, size: 28, bold: true });
          P.renderCard(
            '<b>等量关系</b>：顺流路程 $=$ 逆流路程<br>' +
            '$2(x+3) = 2.5(x-3)$<br>' +
            '这个方程两边都有括号！'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        narration: '好，这个方程有括号，我们能直接移项吗？大家想一想——括号里的 $x+3$ 是一个整体，没法直接和右边的 $x-3$ 合并，更没法直接移项。怎么办？必须先把括号展开！展开括号，这就是本节课的新技能：<b>去括号</b>。',
        enter: function (anim) {
          S.actor('s1-problem', 0, -3.2, '直接移项行吗？', { color: WARM, size: 20, bold: true });
          S.actor('s1-answer', 0, -4.5, '不行！括号内是整体，必须先展开——去括号！', { color: INK, size: 17 });
          P.renderCard(
            '<b>本课任务</b>：学会<b>去括号</b>，打通含括号方程的解法通道。<br>' +
            '流程：去括号 → 合并同类项 → 移项 → 系数化为 1 → 检验',
            'cool'
          );
          if (!anim) { return null; }
          return delay(300);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
