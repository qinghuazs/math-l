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
    id: 's2',
    title: '二、先乘再消：最小公倍数法（消 y）',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：乘法变换——①×3 和 ②×2，动画展示系数变化
      {
        narration: '<b>第一步：乘法变换。</b>$4$ 和 $6$ 的最小公倍数是 $12$。<br>①两边同乘以 $3$：$3x+4y=16$ 变为 $9x+12y=48$，记为③；<br>②两边同乘以 $2$：$5x-6y=33$ 变为 $10x-12y=66$，记为④。<br>现在 $y$ 的系数 $12$ 与 $-12$ 互为相反数！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s2-orig1', 7.0,
                '$3x + 4y = 16 \\quad$ ①',
                { color: INK, size: 22 });
              putRow('s2-orig2', 5.0,
                '$5x - 6y = 33 \\quad$ ②',
                { color: INK, size: 22 });
              return delay(600);
            }).then(function () {
              putRow('s2-arrow1', 2.8, '①两边 $\\times 3$：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-r3a', 0.8,
                '$\\underbrace{3}_{\\times 3} \\cdot 3x + \\underbrace{3}_{\\times 3} \\cdot 4y = \\underbrace{3}_{\\times 3} \\cdot 16$',
                { color: ORANGE, size: 20 });
              return delay(500);
            }).then(function () {
              S.remove('s2-r3a');
              ROWS = ROWS.filter(function (id) { return id !== 's2-r3a'; });
              putRow('s2-r3', 0.8, '$9x + 12y = 48 \\quad$ ③', { color: BLUE, size: 24, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s2-arrow2', -1.5, '②两边 $\\times 2$：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-r4a', -3.5,
                '$\\underbrace{2}_{\\times 2} \\cdot 5x - \\underbrace{2}_{\\times 2} \\cdot 6y = \\underbrace{2}_{\\times 2} \\cdot 33$',
                { color: ORANGE, size: 20 });
              return delay(500);
            }).then(function () {
              S.remove('s2-r4a');
              ROWS = ROWS.filter(function (id) { return id !== 's2-r4a'; });
              putRow('s2-r4', -3.5, '$10x - 12y = 66 \\quad$ ④', { color: BLUE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s2-hint', -6.2,
                '$+12y$ 与 $-12y$：互为相反数 ✓',
                { color: GREEN, size: 22, bold: true });
              P.renderCard(
                '<b>步骤一：乘法变换</b><br>' +
                'lcm(4, 6) = 12，故①×3 得③，②×2 得④<br>' +
                '③：$9x + 12y = 48$<br>' +
                '④：$10x - 12y = 66$<br>' +
                '$y$ 系数已变为相反数，可以相加消 $y$！',
                'cool'
              );
            });
          } else {
            putRow('s2-orig1', 7.0, '$3x + 4y = 16 \\quad$ ①', { color: INK, size: 22 });
            putRow('s2-orig2', 5.0, '$5x - 6y = 33 \\quad$ ②', { color: INK, size: 22 });
            putRow('s2-arrow1', 2.8, '①两边 $\\times 3$：', { color: ORANGE, size: 20 });
            putRow('s2-r3', 0.8, '$9x + 12y = 48 \\quad$ ③', { color: BLUE, size: 24, bold: true });
            putRow('s2-arrow2', -1.5, '②两边 $\\times 2$：', { color: ORANGE, size: 20 });
            putRow('s2-r4', -3.5, '$10x - 12y = 66 \\quad$ ④', { color: BLUE, size: 24, bold: true });
            putRow('s2-hint', -6.2, '$+12y$ 与 $-12y$：互为相反数 ✓', { color: GREEN, size: 22, bold: true });
            P.renderCard(
              '<b>步骤一：乘法变换</b><br>' +
              'lcm(4, 6) = 12，故①×3 得③，②×2 得④<br>' +
              '③：$9x + 12y = 48$<br>' +
              '④：$10x - 12y = 66$<br>' +
              '$y$ 系数已变为相反数，可以相加消 $y$！',
              'cool'
            );
          }
        }
      },
      // 步骤2：③+④ 消去 y，解出 x
      {
        narration: '<b>第二步：③+④，消去 $y$。</b>$9x+12y+10x-12y=48+66$，$12y+(-12y)=0$，得 $19x=114$，$x=6$。',
        enter: function (anim) {
          clearRows();
          putRow('s2-r3', 7.0, '$9x + 12y = 48 \\quad$ ③', { color: BLUE, size: 22 });
          putRow('s2-r4', 5.0, '$10x - 12y = 66 \\quad$ ④', { color: BLUE, size: 22 });
          if (anim) {
            return delay(300).then(function () {
              putRow('s2-add', 2.8, '③ + ④：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s2-cancel', 0.8,
                '$(9x+10x) + (12y-12y) = 48+66$',
                { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-simp', -1.5, '$19x + 0 = 114$', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s2-x', -4.0, '$x = 6$', { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>步骤二：③+④ 消去 $y$</b><br>' +
                '$(9+10)x + (12-12)y = 48+66$<br>' +
                '$19x = 114$<br>' +
                '$x = 6$',
                'cool'
              );
            });
          } else {
            putRow('s2-add', 2.8, '③ + ④：', { color: ORANGE, size: 20 });
            putRow('s2-cancel', 0.8, '$(9x+10x) + (12y-12y) = 48+66$', { color: INK, size: 22 });
            putRow('s2-simp', -1.5, '$19x + 0 = 114$', { color: INK, size: 22 });
            putRow('s2-x', -4.0, '$x = 6$', { color: GREEN, size: 28, bold: true });
            P.renderCard(
              '<b>步骤二：③+④ 消去 $y$</b><br>' +
              '$(9+10)x + (12-12)y = 48+66$<br>' +
              '$19x = 114$<br>' +
              '$x = 6$',
              'cool'
            );
          }
        }
      },
      // 步骤3：回代原式①求 y
      {
        narration: '<b>第三步：回代。</b>把 $x=6$ 代入原方程①：$3\\times6+4y=16$，$18+4y=16$，$4y=-2$，$y=-\\frac{1}{2}$。',
        enter: function (anim) {
          clearRows();
          putRow('s2-known', 7.0, '已知 $x = 6$，代入①：$3x + 4y = 16$', { color: GREEN, size: 20 });
          if (anim) {
            return delay(300).then(function () {
              putRow('s2-sub', 4.8, '$3 \\times 6 + 4y = 16$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-step1', 2.5, '$18 + 4y = 16$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-step2', 0.2, '$4y = 16 - 18 = -2$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-y', -2.5, '$y = -\\dfrac{1}{2}$', { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>步骤三：回代求 $y$</b><br>' +
                '代入①：$18 + 4y = 16$<br>' +
                '$4y = -2$，$y = -\\dfrac{1}{2}$',
                'cool'
              );
            });
          } else {
            putRow('s2-sub', 4.8, '$3 \\times 6 + 4y = 16$', { color: INK, size: 24 });
            putRow('s2-step1', 2.5, '$18 + 4y = 16$', { color: INK, size: 24 });
            putRow('s2-step2', 0.2, '$4y = 16 - 18 = -2$', { color: INK, size: 24 });
            putRow('s2-y', -2.5, '$y = -\\dfrac{1}{2}$', { color: GREEN, size: 28, bold: true });
            P.renderCard(
              '<b>步骤三：回代求 $y$</b><br>' +
              '代入①：$18 + 4y = 16$<br>' +
              '$4y = -2$，$y = -\\dfrac{1}{2}$',
              'cool'
            );
          }
        }
      },
      // 步骤4：写解并验算
      {
        narration: '<b>第四步：写解并验算。</b>方程组的解为 $\\begin{cases}x=6\\\\y=-\\frac{1}{2}\\end{cases}$。<br>验算①：$3\\times6+4\\times(-\\frac{1}{2})=18-2=16$ ✓<br>验算②：$5\\times6-6\\times(-\\frac{1}{2})=30+3=33$ ✓',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(300).then(function () {
              putRow('s2-sol', 5.5,
                '$\\begin{cases}x = 6 \\\\ y = -\\dfrac{1}{2}\\end{cases}$',
                { color: PURPLE, size: 28, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s2-v1', 1.5,
                '验算①：$3 \\times 6 + 4 \\times \\left(-\\dfrac{1}{2}\\right) = 18 - 2 = 16$ ✓',
                { color: GREEN, size: 20 });
              return delay(500);
            }).then(function () {
              putRow('s2-v2', -1.5,
                '验算②：$5 \\times 6 - 6 \\times \\left(-\\dfrac{1}{2}\\right) = 30 + 3 = 33$ ✓',
                { color: GREEN, size: 20 });
              return delay(400);
            }).then(function () {
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=6\\\\y=-\\dfrac{1}{2}\\end{cases}$<br>' +
                '验算①：$18 - 2 = 16$ ✓<br>' +
                '验算②：$30 + 3 = 33$ ✓',
                'success', 'tada'
              );
            });
          } else {
            putRow('s2-sol', 5.5,
              '$\\begin{cases}x = 6 \\\\ y = -\\dfrac{1}{2}\\end{cases}$',
              { color: PURPLE, size: 28, bold: true });
            putRow('s2-v1', 1.5,
              '验算①：$3 \\times 6 + 4 \\times \\left(-\\dfrac{1}{2}\\right) = 18 - 2 = 16$ ✓',
              { color: GREEN, size: 20 });
            putRow('s2-v2', -1.5,
              '验算②：$5 \\times 6 - 6 \\times \\left(-\\dfrac{1}{2}\\right) = 30 + 3 = 33$ ✓',
              { color: GREEN, size: 20 });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=6\\\\y=-\\dfrac{1}{2}\\end{cases}$<br>' +
              '验算①：$18 - 2 = 16$ ✓<br>' +
              '验算②：$30 + 3 = 33$ ✓',
              'success', 'tada'
            );
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
