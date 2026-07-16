(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', PURPLE = '#6a1b9a', BLUE = '#1565c0', ORANGE = '#e65100', GREEN = '#2e7d32', RED = '#c62828';

  // 数学验算（写码前确认）：
  // 方程组：① 3x+2y=13  ② 3x-2y=5
  // ①+②：(3x+3x)+(2y-2y)=13+5 → 6x=18 → x=3
  // 回代①：3×3+2y=13 → 9+2y=13 → 2y=4 → y=2
  // 验算①：3×3+2×2=9+4=13 ✓
  // 验算②：3×3-2×2=9-4=5 ✓

  var ROWS = [];

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

  // 始终显示题目（左上角）
  function showProblem() {
    S.actor('s2-prob', -9, 7.5,
      '$\\begin{cases}3x+2y=13 & \\text{①}\\\\ 3x-2y=5 & \\text{②}\\end{cases}$',
      { color: PURPLE, size: 24, bold: true });
  }

  var scene = {
    id: 's2',
    title: '二、加法消元完整步骤',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
      showProblem();
    },
    steps: [
      // 步骤1：展示题目，观察系数互为相反数
      {
        narration: '来解这个方程组：$\\begin{cases}3x+2y=13 & ①\\\\ 3x-2y=5 & ②\\end{cases}$。<br>先<b>观察系数</b>：$2y$ 与 $-2y$，系数 $2$ 与 $-2$ 互为相反数！所以选择<b>①+②</b>来消去 $y$。',
        enter: function (anim) {
          clearRows();
          showProblem();
          if (anim) {
            return delay(300).then(function () {
              putRow('s2-obs1', 4.5,
                '$2y$ 的系数：$+2$',
                { color: BLUE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s2-obs2', 2,
                '$-2y$ 的系数：$-2$',
                { color: ORANGE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s2-obs3', -0.5,
                '$+2$ 与 $-2$ 互为相反数',
                { color: RED, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s2-obs4', -3,
                '策略：用 <b>①+②</b> 消去 $y$',
                { color: GREEN, size: 24, bold: true });
              return delay(200);
            }).then(function () {
              P.renderCard('<b>判断策略</b><br>$y$ 的系数互为相反数：$+2$ 与 $-2$<br>→ 选择<b>两式相加</b>，$y$ 会被消去！', 'cool');
            });
          } else {
            putRow('s2-obs1', 4.5,
              '$2y$ 的系数：$+2$',
              { color: BLUE, size: 22 });
            putRow('s2-obs2', 2,
              '$-2y$ 的系数：$-2$',
              { color: ORANGE, size: 22 });
            putRow('s2-obs3', -0.5,
              '$+2$ 与 $-2$ 互为相反数',
              { color: RED, size: 22, bold: true });
            putRow('s2-obs4', -3,
              '策略：用 ①+② 消去 $y$',
              { color: GREEN, size: 24, bold: true });
            P.renderCard('<b>判断策略</b><br>$y$ 的系数互为相反数：$+2$ 与 $-2$<br>→ 选择<b>两式相加</b>，$y$ 会被消去！', 'cool');
          }
        }
      },
      // 步骤2：核心动画——竖式相加，逐项演示 y 被消去
      {
        narration: '现在执行 ①+②，把两个方程<b>上下对齐竖式相加</b>：<br>$3x+3x=6x$，$2y+(-2y)=0$（$y$ 消去！），$13+5=18$。<br>得到 $6x=18$。',
        enter: function (anim) {
          clearRows();
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              // 竖式第一行：①
              putRow('s2-v1', 5.5,
                '$3x+2y=13$  ……①',
                { color: BLUE, size: 24 });
              return delay(500);
            }).then(function () {
              // 竖式第二行：②（带加号）
              putRow('s2-v2', 3,
                '$+)\\;3x-2y=5$  ……②',
                { color: ORANGE, size: 24 });
              return delay(400);
            }).then(function () {
              // 横线（用文字模拟）
              putRow('s2-vline', 1.2,
                '——————————————',
                { color: INK, size: 18 });
              return delay(500);
            }).then(function () {
              // 逐项显示相加结果（x项）
              putRow('s2-vr-x', -0.5,
                '$3x+3x = 6x$',
                { color: GREEN, size: 22 });
              return delay(600);
            }).then(function () {
              // y项被消去！闪烁高亮
              putRow('s2-vr-y', -3,
                '$2y+(-2y) = \\mathbf{0}$  ← $y$ 被消去！',
                { color: RED, size: 22, bold: true });
              return delay(600);
            }).then(function () {
              // 常数项
              putRow('s2-vr-c', -5.5,
                '$13+5=18$',
                { color: GREEN, size: 22 });
              return delay(400);
            }).then(function () {
              P.renderCard(
                '<b>①+② 竖式相加</b><br>' +
                '$3x+3x=6x$<br>' +
                '$2y+(-2y)=\\mathbf{0}$（$y$ 消去！）<br>' +
                '$13+5=18$<br>' +
                '→ 得 $6x=18$',
                'warm');
            });
          } else {
            putRow('s2-v1', 5.5,
              '$3x+2y=13$  ……①',
              { color: BLUE, size: 24 });
            putRow('s2-v2', 3,
              '$+)\\;3x-2y=5$  ……②',
              { color: ORANGE, size: 24 });
            putRow('s2-vline', 1.2,
              '——————————————',
              { color: INK, size: 18 });
            putRow('s2-vr-x', -0.5,
              '$3x+3x = 6x$',
              { color: GREEN, size: 22 });
            putRow('s2-vr-y', -3,
              '$2y+(-2y) = \\mathbf{0}$  ← $y$ 被消去！',
              { color: RED, size: 22, bold: true });
            putRow('s2-vr-c', -5.5,
              '$13+5=18$',
              { color: GREEN, size: 22 });
            P.renderCard(
              '<b>①+② 竖式相加</b><br>' +
              '$3x+3x=6x$<br>' +
              '$2y+(-2y)=\\mathbf{0}$（$y$ 消去！）<br>' +
              '$13+5=18$<br>' +
              '→ 得 $6x=18$',
              'warm');
          }
        }
      },
      // 步骤3：解出 x=3
      {
        narration: '<b>第三步：解一元方程。</b>由 $6x=18$ 得 $x=3$。',
        enter: function (anim) {
          clearRows();
          showProblem();
          putRow('s2-prev', 6.5,
            '①+② 得：$6x=18$',
            { color: BLUE, size: 22 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-solve1', 3.5,
                '$6x = 18$',
                { color: INK, size: 26 });
              return delay(500);
            }).then(function () {
              putRow('s2-solve2', 0.5,
                '$x = 18 \\div 6$',
                { color: INK, size: 26 });
              return delay(500);
            }).then(function () {
              putRow('s2-xval', -2.5,
                '$x = 3$',
                { color: GREEN, size: 32, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>解出 $x$</b><br>$6x=18$，两边除以 $6$，得 $x=3$。', 'cool');
            });
          } else {
            putRow('s2-solve1', 3.5, '$6x = 18$', { color: INK, size: 26 });
            putRow('s2-solve2', 0.5, '$x = 18 \\div 6$', { color: INK, size: 26 });
            putRow('s2-xval', -2.5, '$x = 3$', { color: GREEN, size: 32, bold: true });
            P.renderCard('<b>解出 $x$</b><br>$6x=18$，两边除以 $6$，得 $x=3$。', 'cool');
          }
        }
      },
      // 步骤4：回代①求 y=2
      {
        narration: '<b>第四步：回代。</b>把 $x=3$ 代回方程①：$3\\times3+2y=13$，即 $9+2y=13$，解得 $2y=4$，$y=2$。',
        enter: function (anim) {
          clearRows();
          showProblem();
          putRow('s2-xknown', 6.5,
            '已知 $x=3$，代入①：$3x+2y=13$',
            { color: GREEN, size: 22 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-sub1', 4,
                '$3 \\times 3 + 2y = 13$',
                { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-sub2', 1.5,
                '$9 + 2y = 13$',
                { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-sub3', -1,
                '$2y = 13 - 9 = 4$',
                { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-yval', -3.8,
                '$y = 2$',
                { color: GREEN, size: 32, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>回代求 $y$</b><br>把 $x=3$ 代入①：$9+2y=13$<br>$2y=4$，$y=2$。', 'cool');
            });
          } else {
            putRow('s2-sub1', 4, '$3 \\times 3 + 2y = 13$', { color: INK, size: 24 });
            putRow('s2-sub2', 1.5, '$9 + 2y = 13$', { color: INK, size: 24 });
            putRow('s2-sub3', -1, '$2y = 13 - 9 = 4$', { color: INK, size: 24 });
            putRow('s2-yval', -3.8, '$y = 2$', { color: GREEN, size: 32, bold: true });
            P.renderCard('<b>回代求 $y$</b><br>把 $x=3$ 代入①：$9+2y=13$<br>$2y=4$，$y=2$。', 'cool');
          }
        }
      },
      // 步骤5：写出解并验算
      {
        narration: '<b>第五步：写出解并验算。</b>方程组的解为 $\\begin{cases}x=3\\\\y=2\\end{cases}$。<br>验算：代入①：$3\\times3+2\\times2=9+4=13$ ✓；代入②：$3\\times3-2\\times2=9-4=5$ ✓。',
        enter: function (anim) {
          clearRows();
          showProblem();
          putRow('s2-sol-label', 6.5, '方程组的解：', { color: INK, size: 22 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-sol', 4,
                '$\\begin{cases}x=3 \\\\ y=2\\end{cases}$',
                { color: PURPLE, size: 30, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s2-chk1', 0.5,
                '验算①：$3\\times3+2\\times2=9+4=13$ ✓',
                { color: GREEN, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-chk2', -2,
                '验算②：$3\\times3-2\\times2=9-4=5$ ✓',
                { color: GREEN, size: 20 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=2\\end{cases}$<br>' +
                '验算①：$9+4=13$ ✓<br>' +
                '验算②：$9-4=5$ ✓',
                'success', 'tada');
            });
          } else {
            putRow('s2-sol', 4,
              '$\\begin{cases}x=3 \\\\ y=2\\end{cases}$',
              { color: PURPLE, size: 30, bold: true });
            putRow('s2-chk1', 0.5,
              '验算①：$3\\times3+2\\times2=9+4=13$ ✓',
              { color: GREEN, size: 20 });
            putRow('s2-chk2', -2,
              '验算②：$3\\times3-2\\times2=9-4=5$ ✓',
              { color: GREEN, size: 20 });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=2\\end{cases}$<br>' +
              '验算①：$9+4=13$ ✓<br>' +
              '验算②：$9-4=5$ ✓',
              'success', 'tada');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
