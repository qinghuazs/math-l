(function (CW) {
  'use strict';
  // s2 鸡兔同笼（核心例题）
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  // 闭包变量，setup 时重置
  var chickenActor, rabbitActor;

  var scene = {
    id: 's2',
    title: '二、鸡兔同笼',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      chickenActor = null;
      rabbitActor  = null;
    },
    steps: [
      {
        narration: '现在来看一道非常经典的题目——鸡兔同笼！这道题来自中国古代的《孙子算经》，已经有1500多年的历史了。题目是：笼子里有鸡和兔，共有35个头、94条腿，请问鸡有多少只、兔有多少只？同学们先思考一下，这道题有几个未知量？有几个等量关系？',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '经典题：鸡兔同笼', {
            color: BLUE, size: 22, bold: true,
          });

          // 题目框
          S.addPolygon('s2-q-bg', [
            [-9, 5.8], [9, 5.8], [9, 3.2], [-9, 3.2],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s2-q-text', 0, 5.3,
            '笼中有鸡和兔，共有 35 个头，94 条腿。',
            { color: INK, size: 17 });
          S.actor('s2-q-ask', 0, 4.0,
            '鸡有多少只？兔有多少只？',
            { color: ORANGE, size: 19, bold: true });

          // 鸡兔示意——用 actor 绘制文字图标
          S.actor('s2-chicken', -5, 1.5, '🐓', { size: 40 });
          S.actor('s2-rabbit',   5, 1.5, '🐇', { size: 40 });
          S.actor('s2-chicken-label', -5, -0.5, '鸡：2 条腿', { color: INK, size: 16 });
          S.actor('s2-rabbit-label',   5, -0.5, '兔：4 条腿', { color: INK, size: 16 });

          // 已知信息
          S.addPolygon('s2-info-bg', [
            [-8, -1.8], [8, -1.8], [8, -3.5], [-8, -3.5],
          ], { color: GRAY, opacity: 0.09, borderWidth: 1.5, strokeColor: GRAY });
          S.actor('s2-info-heads', -3, -2.4, '头数：35 个', { color: INK, size: 16 });
          S.actor('s2-info-legs',   3, -2.4, '腿数：94 条', { color: INK, size: 16 });
          S.actor('s2-info-q',      0, -3.15,
            '未知量：鸡的只数  兔的只数', { color: BLUE, size: 15 });

          P.renderCard(
            '<b>鸡兔同笼</b>（经典名题）<br>' +
            '头数 35 → 一个等量关系<br>' +
            '腿数 94 → 另一个等量关系<br>' +
            '两个未知量，两个关系——正好列方程组！'
          );
        },
      },
      {
        narration: '按照七步法，先来设元和找关系。设鸡有 x 只，兔有 y 只。关系①：每只动物只有一个头，头的总数等于35，所以 x 加 y 等于35。关系②：鸡有2条腿，兔有4条腿，腿的总数等于94，所以 2x 加 4y 等于94。现在把这两个方程联立，就得到方程组了！',
        enter: function (anim) {
          // 设元
          S.addPolygon('s2-set-bg', [
            [-9.5, 6.8], [9.5, 6.8], [9.5, 5.6], [-9.5, 5.6],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-set-text', 0, 6.25,
            '设鸡有 $x$ 只，兔有 $y$ 只',
            { color: BLUE, size: 18, bold: true });

          // 关系①
          S.addPolygon('s2-c1-bg', [
            [-9.5, 5.0], [0.0, 5.0], [0.0, 2.5], [-9.5, 2.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-c1-title', -4.75, 4.6, '关系①：头数', { color: BLUE, size: 16, bold: true });
          S.actor('s2-c1-desc',  -4.75, 3.7,
            '每只动物 1 个头', { color: INK, size: 14 });
          S.actor('s2-c1-eq',    -4.75, 2.9,
            '$x + y = 35$', { color: BLUE, size: 18, bold: true });

          // 关系②
          S.addPolygon('s2-c2-bg', [
            [0.2, 5.0], [9.5, 5.0], [9.5, 2.5], [0.2, 2.5],
          ], { color: RED, opacity: 0.07, borderWidth: 2, strokeColor: RED });
          S.actor('s2-c2-title', 4.85, 4.6, '关系②：腿数', { color: RED, size: 16, bold: true });
          S.actor('s2-c2-desc',  4.85, 3.7,
            '鸡2腿 兔4腿', { color: INK, size: 14 });
          S.actor('s2-c2-eq',    4.85, 2.9,
            '$2x + 4y = 94$', { color: RED, size: 18, bold: true });

          // 方程组
          S.addPolygon('s2-sys-bg', [
            [-6, 1.8], [6, 1.8], [6, -0.2], [-6, -0.2],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-sys-label', 0, 1.4, '联立方程组：', { color: GREEN, size: 15 });
          S.actor('s2-sys-eq', 0, 0.5,
            '$\\begin{cases}x+y=35\\\\2x+4y=94\\end{cases}$',
            { color: GREEN, size: 20, bold: true });

          P.renderCard(
            '设鸡 $x$ 只，兔 $y$ 只<br>' +
            '关系①（头）：$x+y=35$<br>' +
            '关系②（腿）：$2x+4y=94$<br>' +
            '联立得方程组'
          );
        },
      },
      {
        narration: '现在用加减消元法解这个方程组。方程②减去方程①乘以2：2x+4y 减去 2x+2y，左边剩 2y，右边 94 减 70 等于 24，所以 y 等于 12。把 y=12 代回方程①：x 加 12 等于 35，x 等于 23。',
        enter: function (anim) {
          // 解题过程
          S.actor('s2-solve-title', 0, 7.2, '加减消元：消去 $x$', {
            color: INK, size: 19, bold: true,
          });

          S.actor('s2-step1-label', -5, 5.8, '方程②', { color: RED, size: 15 });
          S.actor('s2-step1-eq',     3, 5.8, '$2x + 4y = 94$', { color: RED, size: 17 });

          S.actor('s2-step2-label', -5, 4.8, '方程①×2', { color: BLUE, size: 15 });
          S.actor('s2-step2-eq',     3, 4.8, '$2x + 2y = 70$', { color: BLUE, size: 17 });

          // 减法线
          S.addSegment('s2-minus-line', [-7, 4.2], [9, 4.2], {
            color: INK, width: 1.5, dash: 0,
          });
          S.actor('s2-minus-sym', -8.5, 3.7, '②－①×2：', { color: ORANGE, size: 14 });
          S.actor('s2-minus-res',  3, 3.7, '$2y = 24$', { color: ORANGE, size: 17, bold: true });

          S.actor('s2-y-res', 0, 2.7,
            '$y = 12$（兔有 12 只）',
            { color: GREEN, size: 19, bold: true });

          // 代回
          S.actor('s2-sub-label', -5, 1.6, '代回①：', { color: INK, size: 15 });
          S.actor('s2-sub-eq',     3, 1.6, '$x + 12 = 35$', { color: INK, size: 17 });
          S.actor('s2-x-res',      0, 0.6,
            '$x = 23$（鸡有 23 只）',
            { color: BLUE, size: 19, bold: true });

          P.renderCard(
            '②－①×2：$2y=24$，所以 $y=12$<br>' +
            '代回①：$x+12=35$，所以 $x=23$<br>' +
            '<b>鸡 23 只，兔 12 只</b>'
          );
        },
      },
      {
        narration: '解出来了，但还不能直接写答句，要先检验！把 x=23、y=12 代回两个方程：头数：23加12等于35，正确✓；腿数：23乘以2加12乘以4等于46加48等于94，正确✓。两个方程都满足，说明解是对的。然后写答句：鸡有23只，兔有12只。',
        enter: function (anim) {
          S.actor('s2-check-title', 0, 7.2, '检验与作答', {
            color: GREEN, size: 21, bold: true,
          });

          // 检验①
          S.addPolygon('s2-ck1-bg', [
            [-9.5, 6.2], [9.5, 6.2], [9.5, 4.8], [-9.5, 4.8],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-ck1-label', -5, 5.55, '验头数：', { color: INK, size: 15 });
          S.actor('s2-ck1-calc',   3, 5.55,
            '$23 + 12 = 35$ ✓', { color: GREEN, size: 16, bold: true });

          // 检验②
          S.addPolygon('s2-ck2-bg', [
            [-9.5, 4.2], [9.5, 4.2], [9.5, 2.8], [-9.5, 2.8],
          ], { color: GREEN, opacity: 0.07, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-ck2-label', -5, 3.55, '验腿数：', { color: INK, size: 15 });
          S.actor('s2-ck2-calc',   2, 3.55,
            '$23\\times2 + 12\\times4 = 46+48 = 94$ ✓',
            { color: GREEN, size: 15, bold: true });

          // 答句
          S.addPolygon('s2-ans-bg', [
            [-7, 2.0], [7, 2.0], [7, 0.4], [-7, 0.4],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-ans-text', 0, 1.25,
            '答：鸡有 23 只，兔有 12 只。',
            { color: BLUE, size: 19, bold: true });

          // 答句格式提示
          S.actor('s2-ans-hint', 0, -0.6,
            '答句格式：主语 + 结论，对应题目中的问法。',
            { color: GRAY, size: 14 });

          P.renderCard(
            '检验：$23+12=35$ ✓，$46+48=94$ ✓<br>' +
            '<b>答：鸡有 23 只，兔有 12 只。</b>',
            'cool',
            'tada'
          );
        },
      },
      {
        narration: '我们再来回顾一遍这道题的解题思路：审题——找到两个未知量"鸡的只数"和"兔的只数"；找关系——头数一个方程，腿数一个方程；列方程组——加减消元；验证答句。这就是用二元一次方程组解决实际问题的完整过程！',
        enter: function (anim) {
          S.actor('s2-review-title', 0, 7.0, '回顾：鸡兔同笼完整解法', {
            color: BLUE, size: 20, bold: true,
          });

          var rows = [
            ['步骤', '内容', '本题示例'],
            ['①审题', '明确已知/未知', '头35、腿94；求鸡数兔数'],
            ['②设元', '设两个未知数', '鸡 $x$ 只，兔 $y$ 只'],
            ['③找关系', '两个等量关系', '头：$x+y=35$；腿：$2x+4y=94$'],
            ['④列方程组', '联立两方程', '$\\begin{cases}x+y=35\\\\2x+4y=94\\end{cases}$'],
            ['⑤⑥解与验', '消元法+检验', '$x=23,y=12$，代回均满足✓'],
            ['⑦答', '完整答句', '鸡23只，兔12只'],
          ];

          P.renderTable({ head: rows[0], rows: rows.slice(1) });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
