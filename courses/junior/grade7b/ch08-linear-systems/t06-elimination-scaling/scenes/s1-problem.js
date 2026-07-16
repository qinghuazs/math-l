(function (CW) {
  'use strict';
  var S, P;
  var ROWS = [];
  var INK = '#455a64', RED = '#c62828', ORANGE = '#e65100', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function putRow(id, y, str, opts) {
    opts = opts || {};
    var a = S.actor(id, 0, y, str, {
      color: opts.color || INK,
      size: opts.size || 22,
      bold: opts.bold || false
    });
    ROWS.push(id);
    return a;
  }

  function clearRows() {
    ROWS.forEach(function (id) { S.remove(id); });
    ROWS = [];
  }

  var scene = {
    id: 's1',
    title: '一、新困难：系数不相等怎么办',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      {
        narration: '上节课我们学了加减消元法：系数相反就相加，系数相同就相减。可是今天这道题——$\\begin{cases}3x+4y=16 & ① \\\\ 5x-6y=33 & ②\\end{cases}$——$y$ 的系数是 $4$ 和 $-6$，既不相同也不相反，直接加减都消不掉！怎么办呢？',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s1-title', 6.5, '今天的例题：', { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s1-sys', 3.5,
                '$\\begin{cases}3x+4y=16 & \\text{①} \\\\ 5x-6y=33 & \\text{②}\\end{cases}$',
                { color: PURPLE, size: 26, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s1-check', 0.5, '$y$ 的系数：$4$ 和 $-6$', { color: RED, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s1-note', -2.5,
                '既不相同 $(4 \\ne -6)$，也不相反 $(4 \\ne 6)$',
                { color: ORANGE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-q', -5.5, '直接加减都消不掉！怎么办？', { color: RED, size: 24, bold: true });
              P.renderCard(
                '<b>新困难</b><br>加减消元的前提：两个方程中同一个未知数的系数相同或相反。<br>当系数 <b>既不相同也不相反</b> 时，需要先"变换"方程，再消元。',
                'warm'
              );
            });
          } else {
            putRow('s1-title', 6.5, '今天的例题：', { color: INK, size: 20 });
            putRow('s1-sys', 3.5,
              '$\\begin{cases}3x+4y=16 & \\text{①} \\\\ 5x-6y=33 & \\text{②}\\end{cases}$',
              { color: PURPLE, size: 26, bold: true });
            putRow('s1-check', 0.5, '$y$ 的系数：$4$ 和 $-6$', { color: RED, size: 22 });
            putRow('s1-note', -2.5,
              '既不相同 $(4 \\ne -6)$，也不相反 $(4 \\ne 6)$',
              { color: ORANGE, size: 22 });
            putRow('s1-q', -5.5, '直接加减都消不掉！怎么办？', { color: RED, size: 24, bold: true });
            P.renderCard(
              '<b>新困难</b><br>加减消元的前提：两个方程中同一个未知数的系数相同或相反。<br>当系数 <b>既不相同也不相反</b> 时，需要先"变换"方程，再消元。',
              'warm'
            );
          }
        }
      },
      {
        narration: '思路：如果我们能让 $y$ 的系数变成相反数，不就可以相加消元了吗？$4$ 和 $6$ 的最小公倍数是 $12$。只要把①两边乘以 $3$，让 $4y$ 变成 $12y$；再把②两边乘以 $2$，让 $-6y$ 变成 $-12y$——这样 $12y$ 和 $-12y$ 互为相反数，相加就消掉了！这就是"先乘再消"的策略。',
        enter: function (anim) {
          clearRows();
          putRow('s1-sys', 6.5,
            '$\\begin{cases}3x+4y=16 & \\text{①} \\\\ 5x-6y=33 & \\text{②}\\end{cases}$',
            { color: PURPLE, size: 22 });
          if (anim) {
            return delay(200).then(function () {
              putRow('s1-idea', 4.0, '策略：让 $y$ 的系数变成相反数', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s1-lcm', 1.5, '$4$ 和 $6$ 的最小公倍数 $= 12$', { color: ORANGE, size: 24, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s1-plan1', -1.0, '①两边 $\\times 3$：$4y \\rightarrow 12y$', { color: '#1565c0', size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-plan2', -3.5, '②两边 $\\times 2$：$-6y \\rightarrow -12y$', { color: '#1565c0', size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-res', -6.0, '$12y + (-12y) = 0$ ✓ 消元成功！', { color: '#2e7d32', size: 22, bold: true });
              P.renderCard(
                '<b>先乘再消策略</b><br>目标：找 $y$ 系数绝对值的最小公倍数 $= 12$<br>' +
                '①×3，②×2，让 $y$ 系数变为 $+12$ 和 $-12$，相加即消。',
                'cool'
              );
            });
          } else {
            putRow('s1-idea', 4.0, '策略：让 $y$ 的系数变成相反数', { color: INK, size: 22 });
            putRow('s1-lcm', 1.5, '$4$ 和 $6$ 的最小公倍数 $= 12$', { color: ORANGE, size: 24, bold: true });
            putRow('s1-plan1', -1.0, '①两边 $\\times 3$：$4y \\rightarrow 12y$', { color: '#1565c0', size: 22 });
            putRow('s1-plan2', -3.5, '②两边 $\\times 2$：$-6y \\rightarrow -12y$', { color: '#1565c0', size: 22 });
            putRow('s1-res', -6.0, '$12y + (-12y) = 0$ ✓ 消元成功！', { color: '#2e7d32', size: 22, bold: true });
            P.renderCard(
              '<b>先乘再消策略</b><br>目标：找 $y$ 系数绝对值的最小公倍数 $= 12$<br>' +
              '①×3，②×2，让 $y$ 系数变为 $+12$ 和 $-12$，相加即消。',
              'cool'
            );
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
