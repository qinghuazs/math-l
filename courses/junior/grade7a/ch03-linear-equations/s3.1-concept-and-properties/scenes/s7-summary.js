(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var GREEN = '#2e7d32', RED = '#c62828';
  var CSS_X = 'background:#f3e5f5;border:2px solid #6a1b9a;border-radius:6px;padding:3px 10px;';
  var CSS_W = 'background:#fbe9e7;border:2px solid #e64a19;border-radius:6px;padding:3px 8px;';
  var CSS_B = 'background:#e3f2fd;border:2px solid #1565c0;border-radius:6px;padding:3px 8px;';
  var dy = 0;        // 小天平倾角（易错 2 失衡演示）
  var w4 = null;     // 被单独拿走的 [4] 砝码

  // 失衡演示用小天平（画板下半区）；[2x]/[10] 用函数坐标跟随 dy，[4] 是要飞走的 actor
  function buildMiniScale() {
    dy = 0;
    S.addPolygon('s7-pivot', [[-0.5, -5.6], [0.5, -5.6], [0, -3.1]], { color: '#78909c' });
    S.addSegment('s7-base', [-1.6, -5.6], [1.6, -5.6], { color: INK, width: 5, dash: 0 });
    S.addSegment('s7-beam',
      [-3.8, function () { return -2.9 + dy; }],
      [3.8, function () { return -2.9 - dy; }], { color: INK, width: 4, dash: 0 });
    S.addSegment('s7-panL',
      [-4.7, function () { return -2.75 + dy; }],
      [-2.9, function () { return -2.75 + dy; }], { color: '#78909c', width: 3, dash: 0 });
    S.addSegment('s7-panR',
      [2.9, function () { return -2.75 - dy; }],
      [4.7, function () { return -2.75 - dy; }], { color: '#78909c', width: 3, dash: 0 });
    S.addText('s7-wx', -4.5, function () { return -2.1 + dy; }, '2x', { size: 16, color: PURPLE });
    w4 = S.actor('s7-w4', -3.3, -2.1, '4', { color: INK, size: 16, css: CSS_W });
    S.addText('s7-w10', 3.5, function () { return -2.1 - dy; }, '10', { size: 16, color: COOL });
  }

  var scene = {
    id: 's7',
    title: '七、练习 · 易错 · 小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; dy = 0; w4 = null; },
    steps: [
      {
        narration: '课堂练习：解下面 4 个方程（第 4 题注意负号！），先自己算，再对照答案。',
        enter: function () {
          P.renderTable({
            head: ['方程', '解'],
            rows: [
              ['$x-4=9$', '$x=13$'],
              ['$5x=20$', '$x=4$'],
              ['$2x+1=9$', '$x=4$'],
              ['$7-3x=1$', '$x=2$'],
            ],
          });
          P.renderCard('第 4 题规范过程：$7-3x=1$<br>移项，得 $-3x=1-7$，即 $-3x=-6$；<br>两边同除以 $-3$，得 $x=2$。', 'cool');
        },
      },
      {
        narration: '<b>易错点 1</b>：移项忘了变号。$x+3=8$，把 $+3$ 移过去应该是加还是减？',
        enter: function () {
          S.actor('s7-e1a', 0, 5.4, 'x = 8 + 3　✗', { color: RED, size: 26, bold: true });
          S.actor('s7-e1b', 0, 3.6, 'x = 8 − 3　✓', { color: GREEN, size: 26, bold: true });
          P.renderCard('移项<b>必须变号</b>：$+3$ 过了等号就是 $-3$。', 'warm');
        },
      },
      {
        narration: '<b>易错点 2</b>：只改方程的一边。$2x+4=10$，只把左边的 4 拿走——看天平会发生什么！',
        enter: function (anim) {
          buildMiniScale();
          var fall = function () {
            return S.animate({
              from: 0, to: 0.55, duration: anim ? 900 : 0,
              onUpdate: function (v) { dy = v; S.getBoard().update(); },
            }).then(function () {
              S.actor('s7-tilt', 0, 0.6, '✗ 天平歪了！', { color: RED, size: 24, bold: true });
              P.renderCard('只拿走左边的 4，等式就<b>不成立</b>了！<br>正确做法：$2x+4-4=10-4$，两边<b>同时</b>减 4，得 $2x=6$。', 'warm');
            });
          };
          if (!anim) { return w4.moveTo(-3.3, 7, 0).then(function () { S.remove('s7-w4'); return fall(); }); }
          return w4.moveTo(-3.3, 7, 800).then(function () {
            S.remove('s7-w4');
            return fall();
          });
        },
      },
      {
        narration: '<b>易错点 3</b>：解出来只写一个数。方程的解要写成什么样子才规范？',
        enter: function () {
          S.actor('s7-e3a', 0, 5.4, '3　✗', { color: RED, size: 26, bold: true });
          S.actor('s7-e3b', 0, 3.6, 'x = 3　✓', { color: GREEN, size: 26, bold: true });
          P.renderCard('方程的解要写成 $x=a$ 的形式——"$x=3$"才是完整的答案。', 'cool');
        },
      },
      {
        narration: '<b>课堂小结</b>：这节课的知识地图。',
        enter: function () {
          P.renderTable({
            head: ['概念', '要点'],
            rows: [
              ['方程', '含有未知数的等式'],
              ['一元一次方程', '一个未知数、次数是 1、两边是整式'],
              ['一般形式', '$ax+b=0$（$a\\neq 0$）'],
              ['方程的解', '使两边相等的未知数的值（结果）'],
              ['解方程', '求解的过程'],
              ['解法依据', '等式性质：同加减、同乘除（除数非 0）'],
              ['移项', '本质是两边同加减；移项必变号'],
            ],
          });
        },
      },
      {
        narration: '课后作业分三层——基础判断、计算训练、提高与实践。',
        enter: function () {
          P.renderCard('基础题：判断是不是一元一次方程并说明理由：<br>$3x+5=11$；$x^2-4=0$；$2x+y=8$；$\\frac{x}{3}+2=5$；$7=7$');
          P.renderCard('计算题：$x+8=15$；$x-6=10$；$4x=28$；$3x+5=20$；$8-2x=14$；$\\frac{x}{4}+3=7$', 'cool');
          P.renderCard('提高题：$3(x-2)=2x+5$（提示：先去括号再移项）<br>实践题：研学活动公共支出 120 元，全班 40 人共缴 1320 元，每人缴多少？（$40x+120=1320$）', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
