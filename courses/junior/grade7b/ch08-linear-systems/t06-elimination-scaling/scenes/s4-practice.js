(function (CW) {
  'use strict';
  var S, P;
  var ROWS = [];
  var INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', PURPLE = '#6a1b9a', BLUE = '#1565c0', RED = '#c62828';

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
    id: 's4',
    title: '四、练习：用加减消元法解方程组',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：出题并分析
      {
        narration: '练习题：解方程组 $\\begin{cases}2x+3y=12 & ① \\\\ 3x-2y=5 & ②\\end{cases}$。<br>先分析：$y$ 的系数是 $3$ 和 $-2$，lcm $=6$；$x$ 的系数是 $2$ 和 $3$，lcm $=6$。两个方向的公倍数一样大！任选其一，这里选消 $y$：①$\\times 2$，②$\\times 3$。',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s4-sys', 7.0,
                '$\\begin{cases}2x+3y=12 & \\text{①} \\\\ 3x-2y=5 & \\text{②}\\end{cases}$',
                { color: PURPLE, size: 26, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s4-ana', 4.5, '分析系数：', { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-y', 2.5,
                '$y$ 系数：$3$ 和 $-2$，lcm $= 6$',
                { color: BLUE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s4-x', 0.3,
                '$x$ 系数：$2$ 和 $3$，lcm $= 6$',
                { color: ORANGE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s4-choice', -2.2,
                '两个方向公倍数相等，任选——选消 $y$',
                { color: INK, size: 21 });
              return delay(400);
            }).then(function () {
              putRow('s4-plan', -4.8,
                '①$\\times 2$，②$\\times 3$，使 $y$ 系数变为 $+6$ 和 $-6$',
                { color: GREEN, size: 21 });
              P.renderCard(
                '<b>练习题</b>：$\\begin{cases}2x+3y=12 & ①\\\\ 3x-2y=5 & ②\\end{cases}$<br>' +
                '消 $y$：lcm(3,2)=6，①×2，②×3<br>' +
                '目标：让 $y$ 系数变为 $6$ 和 $-6$',
                'warm'
              );
            });
          } else {
            putRow('s4-sys', 7.0,
              '$\\begin{cases}2x+3y=12 & \\text{①} \\\\ 3x-2y=5 & \\text{②}\\end{cases}$',
              { color: PURPLE, size: 26, bold: true });
            putRow('s4-ana', 4.5, '分析系数：', { color: INK, size: 20 });
            putRow('s4-y', 2.5, '$y$ 系数：$3$ 和 $-2$，lcm $= 6$', { color: BLUE, size: 22 });
            putRow('s4-x', 0.3, '$x$ 系数：$2$ 和 $3$，lcm $= 6$', { color: ORANGE, size: 22 });
            putRow('s4-choice', -2.2, '两个方向公倍数相等，任选——选消 $y$', { color: INK, size: 21 });
            putRow('s4-plan', -4.8, '①$\\times 2$，②$\\times 3$，使 $y$ 系数变为 $+6$ 和 $-6$', { color: GREEN, size: 21 });
            P.renderCard(
              '<b>练习题</b>：$\\begin{cases}2x+3y=12 & ①\\\\ 3x-2y=5 & ②\\end{cases}$<br>' +
              '消 $y$：lcm(3,2)=6，①×2，②×3<br>' +
              '目标：让 $y$ 系数变为 $6$ 和 $-6$',
              'warm'
            );
          }
        }
      },
      // 步骤2：乘法变换 + 加法消 y + 解 x
      {
        narration: '<b>乘法变换与消元：</b>①$\\times 2$：$4x+6y=24$，记为③；②$\\times 3$：$9x-6y=15$，记为④。③+④：$13x=39$，$x=3$。',
        enter: function (anim) {
          clearRows();
          putRow('s4-sys', 7.5,
            '$\\begin{cases}2x+3y=12 & \\text{①} \\\\ 3x-2y=5 & \\text{②}\\end{cases}$',
            { color: PURPLE, size: 20 });
          if (anim) {
            return delay(300).then(function () {
              putRow('s4-r3', 5.5, '①$\\times 2$：$4x + 6y = 24 \\quad$ ③', { color: BLUE, size: 22, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s4-r4', 3.5, '②$\\times 3$：$9x - 6y = 15 \\quad$ ④', { color: BLUE, size: 22, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s4-add', 1.5, '③ + ④：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-sum', -0.5,
                '$(4x+9x) + (6y-6y) = 24+15$',
                { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s4-13x', -3.0, '$13x = 39$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s4-x', -5.5, '$x = 3$', { color: GREEN, size: 28, bold: true });
              P.renderCard(
                '<b>变换并消元</b><br>' +
                '③：$4x + 6y = 24$<br>' +
                '④：$9x - 6y = 15$<br>' +
                '③+④：$13x = 39$，$x = 3$',
                'cool'
              );
            });
          } else {
            putRow('s4-r3', 5.5, '①$\\times 2$：$4x + 6y = 24 \\quad$ ③', { color: BLUE, size: 22, bold: true });
            putRow('s4-r4', 3.5, '②$\\times 3$：$9x - 6y = 15 \\quad$ ④', { color: BLUE, size: 22, bold: true });
            putRow('s4-add', 1.5, '③ + ④：', { color: ORANGE, size: 20 });
            putRow('s4-sum', -0.5, '$(4x+9x) + (6y-6y) = 24+15$', { color: INK, size: 22 });
            putRow('s4-13x', -3.0, '$13x = 39$', { color: INK, size: 24 });
            putRow('s4-x', -5.5, '$x = 3$', { color: GREEN, size: 28, bold: true });
            P.renderCard(
              '<b>变换并消元</b><br>' +
              '③：$4x + 6y = 24$<br>' +
              '④：$9x - 6y = 15$<br>' +
              '③+④：$13x = 39$，$x = 3$',
              'cool'
            );
          }
        }
      },
      // 步骤3：回代求 y，写解并验算
      {
        narration: '<b>回代求 $y$：</b>把 $x=3$ 代入①：$2\\times3+3y=12$，$6+3y=12$，$3y=6$，$y=2$。<br>方程组的解为 $\\begin{cases}x=3\\\\y=2\\end{cases}$。<br>验算①：$6+6=12$ ✓；验算②：$9-4=5$ ✓',
        enter: function (anim) {
          clearRows();
          putRow('s4-x-known', 7.5, '已知 $x = 3$，代入①：$2x + 3y = 12$', { color: GREEN, size: 20 });
          if (anim) {
            return delay(300).then(function () {
              putRow('s4-sub', 5.5, '$2 \\times 3 + 3y = 12$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s4-step1', 3.5, '$6 + 3y = 12$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s4-step2', 1.5, '$3y = 6$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s4-y', -0.5, '$y = 2$', { color: GREEN, size: 28, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s4-sol', -3.0,
                '$\\begin{cases}x = 3 \\\\ y = 2\\end{cases}$',
                { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-v1', -5.5,
                '验①：$6+6=12$ ✓  验②：$9-4=5$ ✓',
                { color: GREEN, size: 20 });
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=2\\end{cases}$<br>' +
                '验算①：$2 \\times 3 + 3 \\times 2 = 6 + 6 = 12$ ✓<br>' +
                '验算②：$3 \\times 3 - 2 \\times 2 = 9 - 4 = 5$ ✓',
                'success', 'tada'
              );
            });
          } else {
            putRow('s4-sub', 5.5, '$2 \\times 3 + 3y = 12$', { color: INK, size: 24 });
            putRow('s4-step1', 3.5, '$6 + 3y = 12$', { color: INK, size: 24 });
            putRow('s4-step2', 1.5, '$3y = 6$', { color: INK, size: 24 });
            putRow('s4-y', -0.5, '$y = 2$', { color: GREEN, size: 28, bold: true });
            putRow('s4-sol', -3.0,
              '$\\begin{cases}x = 3 \\\\ y = 2\\end{cases}$',
              { color: PURPLE, size: 26, bold: true });
            putRow('s4-v1', -5.5, '验①：$6+6=12$ ✓  验②：$9-4=5$ ✓', { color: GREEN, size: 20 });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=2\\end{cases}$<br>' +
              '验算①：$2 \\times 3 + 3 \\times 2 = 6 + 6 = 12$ ✓<br>' +
              '验算②：$3 \\times 3 - 2 \\times 2 = 9 - 4 = 5$ ✓',
              'success', 'tada'
            );
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
