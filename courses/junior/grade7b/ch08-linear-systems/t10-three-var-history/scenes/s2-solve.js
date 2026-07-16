// s2-solve.js  三元方程组求解示范（5步）
// 数学验算（写码前确认）：
// 方程组：① x+y+z=6  ② x-y+z=2  ③ x+y-z=0
// ①-②：(x+y+z)-(x-y+z)=6-2 → 2y=4 → y=2
// ①-③：(x+y+z)-(x+y-z)=6-0 → 2z=6 → z=3
// 代回①：x+2+3=6 → x=1
// 验算①：1+2+3=6 ✓
// 验算②：1-2+3=2 ✓
// 验算③：1+2-3=0 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GRAY   = '#90a4ae';

  var ROWS = [];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function putRow(id, y, str, opts) {
    opts = opts || {};
    var a = S.actor(id, 0, y, str, {
      color: opts.color || INK,
      size: opts.size || 20,
      bold: opts.bold || false
    });
    ROWS.push(id);
    return a;
  }

  function clearRows() {
    ROWS.forEach(function (id) { S.remove(id); });
    ROWS = [];
  }

  function showProblem() {
    S.actor('s2-prob', -11, 7.5,
      '$\\begin{cases}x+y+z=6 & ①\\\\x-y+z=2 & ②\\\\x+y-z=0 & ③\\end{cases}$',
      { color: PURPLE, size: 20, bold: true });
  }

  var scene = {
    id: 's2',
    title: '二、三元方程组求解示范',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
      showProblem();
    },
    steps: [
      {
        // 步骤1：展示题目，策略分析
        narration: '来解这个三元一次方程组：$\\begin{cases}x+y+z=6 & ①\\\\x-y+z=2 & ②\\\\x+y-z=0 & ③\\end{cases}$。<br>消元策略：观察①和②，差别在于 $y$ 的符号（$+y$ 和 $-y$），做 <b>①-②</b> 可以消去 $x$ 和 $z$！再观察①和③，差别在于 $z$ 的符号（$+z$ 和 $-z$），做 <b>①-③</b> 可以消去 $x$ 和 $y$！',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-s1', 4.0,
                '观察①②：$y$ 系数互为相反数 (+1 和 -1)',
                { color: BLUE, size: 18 });
              return delay(500);
            }).then(function () {
              putRow('s2-s2', 1.5,
                '① - ② 可消去 $x$ 和 $z$，留下 $y$',
                { color: BLUE, size: 18, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s2-s3', -1.5,
                '观察①③：$z$ 系数互为相反数 (+1 和 -1)',
                { color: ORANGE, size: 18 });
              return delay(500);
            }).then(function () {
              putRow('s2-s4', -4.0,
                '① - ③ 可消去 $x$ 和 $y$，留下 $z$',
                { color: ORANGE, size: 18, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>消元策略</b><br>' +
                '① - ②：消去 $x, z$，解出 $y$<br>' +
                '① - ③：消去 $x, y$，解出 $z$<br>' +
                '→ 再回代求 $x$'
              );
            });
          } else {
            putRow('s2-s1', 4.0, '观察①②：$y$ 系数互为相反数 (+1 和 -1)', { color: BLUE, size: 18 });
            putRow('s2-s2', 1.5, '① - ② 可消去 $x$ 和 $z$，留下 $y$', { color: BLUE, size: 18, bold: true });
            putRow('s2-s3', -1.5, '观察①③：$z$ 系数互为相反数 (+1 和 -1)', { color: ORANGE, size: 18 });
            putRow('s2-s4', -4.0, '① - ③ 可消去 $x$ 和 $y$，留下 $z$', { color: ORANGE, size: 18, bold: true });
            P.renderCard(
              '<b>消元策略</b><br>' +
              '① - ②：消去 $x, z$，解出 $y$<br>' +
              '① - ③：消去 $x, y$，解出 $z$<br>' +
              '→ 再回代求 $x$'
            );
          }
        },
      },
      {
        // 步骤2：①-② 求 y
        narration: '<b>第一步：① - ②，消去 $x$ 和 $z$。</b>$(x+y+z)-(x-y+z)=6-2$，展开：$x-x+y-(-y)+z-z=4$，即 $2y=4$，所以 $y=2$！',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              putRow('s2-c1-lbl', 6.5, '①-②：', { color: BLUE, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s2-c1-r1', 4.5, '$x+y+z=6$  ……①', { color: BLUE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-c1-r2', 2.0, '$-)\\;x-y+z=2$  ……②', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-c1-line', 0.3, '——————————————', { color: INK, size: 16 });
              return delay(400);
            }).then(function () {
              putRow('s2-c1-r3', -1.5,
                '$(x-x)+(y+y)+(z-z)=6-2$',
                { color: INK, size: 18 });
              return delay(500);
            }).then(function () {
              putRow('s2-c1-r4', -3.5,
                '$2y=4$',
                { color: GREEN, size: 24 });
              return delay(400);
            }).then(function () {
              putRow('s2-c1-r5', -5.5,
                '$y=2$',
                { color: GREEN, size: 30, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>①-② 消去 $x$ 和 $z$</b><br>' +
                '$(x+y+z)-(x-y+z)=6-2$<br>' +
                '$2y=4$<br>' +
                '$y=2$ ✓'
              );
            });
          } else {
            putRow('s2-c1-lbl', 6.5, '①-②：', { color: BLUE, size: 18 });
            putRow('s2-c1-r1', 4.5, '$x+y+z=6$  ……①', { color: BLUE, size: 20 });
            putRow('s2-c1-r2', 2.0, '$-)\\;x-y+z=2$  ……②', { color: ORANGE, size: 20 });
            putRow('s2-c1-line', 0.3, '——————————————', { color: INK, size: 16 });
            putRow('s2-c1-r3', -1.5, '$(x-x)+(y+y)+(z-z)=6-2$', { color: INK, size: 18 });
            putRow('s2-c1-r4', -3.5, '$2y=4$', { color: GREEN, size: 24 });
            putRow('s2-c1-r5', -5.5, '$y=2$', { color: GREEN, size: 30, bold: true });
            P.renderCard(
              '<b>①-② 消去 $x$ 和 $z$</b><br>' +
              '$(x+y+z)-(x-y+z)=6-2$<br>' +
              '$2y=4$<br>' +
              '$y=2$ ✓'
            );
          }
        },
      },
      {
        // 步骤3：①-③ 求 z
        narration: '<b>第二步：① - ③，消去 $x$ 和 $y$。</b>$(x+y+z)-(x+y-z)=6-0$，展开：$z+z=6$，即 $2z=6$，所以 $z=3$！',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              putRow('s2-c2-lbl', 6.5, '①-③：', { color: ORANGE, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s2-c2-r1', 4.5, '$x+y+z=6$  ……①', { color: BLUE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-c2-r2', 2.0, '$-)\\;x+y-z=0$  ……③', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-c2-line', 0.3, '——————————————', { color: INK, size: 16 });
              return delay(400);
            }).then(function () {
              putRow('s2-c2-r3', -1.5,
                '$(x-x)+(y-y)+(z+z)=6-0$',
                { color: INK, size: 18 });
              return delay(500);
            }).then(function () {
              putRow('s2-c2-r4', -3.5,
                '$2z=6$',
                { color: GREEN, size: 24 });
              return delay(400);
            }).then(function () {
              putRow('s2-c2-r5', -5.5,
                '$z=3$',
                { color: GREEN, size: 30, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>①-③ 消去 $x$ 和 $y$</b><br>' +
                '$(x+y+z)-(x+y-z)=6-0$<br>' +
                '$2z=6$<br>' +
                '$z=3$ ✓'
              );
            });
          } else {
            putRow('s2-c2-lbl', 6.5, '①-③：', { color: ORANGE, size: 18 });
            putRow('s2-c2-r1', 4.5, '$x+y+z=6$  ……①', { color: BLUE, size: 20 });
            putRow('s2-c2-r2', 2.0, '$-)\\;x+y-z=0$  ……③', { color: ORANGE, size: 20 });
            putRow('s2-c2-line', 0.3, '——————————————', { color: INK, size: 16 });
            putRow('s2-c2-r3', -1.5, '$(x-x)+(y-y)+(z+z)=6-0$', { color: INK, size: 18 });
            putRow('s2-c2-r4', -3.5, '$2z=6$', { color: GREEN, size: 24 });
            putRow('s2-c2-r5', -5.5, '$z=3$', { color: GREEN, size: 30, bold: true });
            P.renderCard(
              '<b>①-③ 消去 $x$ 和 $y$</b><br>' +
              '$(x+y+z)-(x+y-z)=6-0$<br>' +
              '$2z=6$<br>' +
              '$z=3$ ✓'
            );
          }
        },
      },
      {
        // 步骤4：代回①求 x，并写出解
        narration: '<b>第三步：回代求 $x$。</b>已知 $y=2$，$z=3$，代入方程①：$x+2+3=6$，即 $x+5=6$，解得 $x=1$。方程组的解为 $\\begin{cases}x=1\\\\y=2\\\\z=3\\end{cases}$。',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              putRow('s2-bc-lbl', 6.5, '已知 $y=2, z=3$，代入①：', { color: PURPLE, size: 18 });
              return delay(400);
            }).then(function () {
              putRow('s2-bc-r1', 4.5,
                '$x+2+3=6$',
                { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-bc-r2', 2.0,
                '$x+5=6$',
                { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-bc-r3', -0.5,
                '$x=1$',
                { color: GREEN, size: 30, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s2-sol', -3.5,
                '$\\begin{cases}x=1\\\\y=2\\\\z=3\\end{cases}$',
                { color: PURPLE, size: 26, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>回代求 $x$</b><br>' +
                '$x+2+3=6$ → $x=1$<br><br>' +
                '<b>方程组的解：</b><br>' +
                '$x=1,\\;y=2,\\;z=3$'
              );
            });
          } else {
            putRow('s2-bc-lbl', 6.5, '已知 $y=2, z=3$，代入①：', { color: PURPLE, size: 18 });
            putRow('s2-bc-r1', 4.5, '$x+2+3=6$', { color: INK, size: 24 });
            putRow('s2-bc-r2', 2.0, '$x+5=6$', { color: INK, size: 24 });
            putRow('s2-bc-r3', -0.5, '$x=1$', { color: GREEN, size: 30, bold: true });
            putRow('s2-sol', -3.5, '$\\begin{cases}x=1\\\\y=2\\\\z=3\\end{cases}$', { color: PURPLE, size: 26, bold: true });
            P.renderCard(
              '<b>回代求 $x$</b><br>' +
              '$x+2+3=6$ → $x=1$<br><br>' +
              '<b>方程组的解：</b><br>' +
              '$x=1,\\;y=2,\\;z=3$'
            );
          }
        },
      },
      {
        // 步骤5：验算三式
        narration: '<b>第四步：验算！</b>将 $x=1,y=2,z=3$ 分别代入三个方程：①$1+2+3=6$ ✓，② $1-2+3=2$ ✓，③ $1+2-3=0$ ✓。三式全部成立，解正确！',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              putRow('s2-chk-lbl', 6.5,
                '验算（将 $x=1,y=2,z=3$ 代入）：',
                { color: INK, size: 18 });
              return delay(400);
            }).then(function () {
              putRow('s2-chk1', 4.0,
                '①：$1+2+3=6$ ✓',
                { color: GREEN, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-chk2', 1.5,
                '②：$1-2+3=2$ ✓',
                { color: GREEN, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-chk3', -1.0,
                '③：$1+2-3=0$ ✓',
                { color: GREEN, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-final', -4.0,
                '三式全部成立！解正确 ✓✓✓',
                { color: PURPLE, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>验算</b><br>' +
                '①：$1+2+3=6$ ✓<br>' +
                '②：$1-2+3=2$ ✓<br>' +
                '③：$1+2-3=0$ ✓<br><br>' +
                '解为 $x=1,\\;y=2,\\;z=3$',
                'success', 'tada'
              );
            });
          } else {
            putRow('s2-chk-lbl', 6.5, '验算（将 $x=1,y=2,z=3$ 代入）：', { color: INK, size: 18 });
            putRow('s2-chk1', 4.0, '①：$1+2+3=6$ ✓', { color: GREEN, size: 22 });
            putRow('s2-chk2', 1.5, '②：$1-2+3=2$ ✓', { color: GREEN, size: 22 });
            putRow('s2-chk3', -1.0, '③：$1+2-3=0$ ✓', { color: GREEN, size: 22 });
            putRow('s2-final', -4.0, '三式全部成立！解正确 ✓✓✓', { color: PURPLE, size: 22, bold: true });
            P.renderCard(
              '<b>验算</b><br>' +
              '①：$1+2+3=6$ ✓<br>' +
              '②：$1-2+3=2$ ✓<br>' +
              '③：$1+2-3=0$ ✓<br><br>' +
              '解为 $x=1,\\;y=2,\\;z=3$',
              'success', 'tada'
            );
          }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
