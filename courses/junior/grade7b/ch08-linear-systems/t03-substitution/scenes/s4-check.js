(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', RED = '#c62828';

  var ROWS = [];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function putRow(id, y, str, opts) {
    opts = opts || {};
    S.actor(id, 0, y, str, {
      color: opts.color || INK,
      size: opts.size || 22,
      bold: opts.bold || false
    });
    ROWS.push(id);
  }

  var scene = {
    id: 's4',
    title: '四、检验与易错',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：检验——代入两个原方程
      {
        narration: '求出解之后，应把 $x=2, y=-1$ 代入<b>原方程组的两个方程</b>逐一检验。<br>只代入一个方程是不够的——两个方程都要满足，解才正确！',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s4-chk-t', 7, '检验：代入原方程组', { color: PURPLE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-chk1', 4.5, '原方程组：$\\begin{cases}x-y=3 & ① \\\\ 3x-8y=14 & ②\\end{cases}$，解：$x=2, y=-1$', { color: INK, size: 20 });
              return delay(500);
            }).then(function () {
              putRow('s4-chk2', 2.0, '代入①：左边 $= 2 - (-1) = 3 =$ 右边 ✓', { color: GREEN, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s4-chk3', -0.5, '代入②：左边 $= 3\\times2 - 8\\times(-1) = 6 + 8 = 14 =$ 右边 ✓', { color: GREEN, size: 22 });
              return delay(400);
            }).then(function () {
              P.renderCard('<b>检验要点</b>：必须代入原方程组的<b>两个</b>方程分别检验，两个都满足才算正确！', 'cool');
            });
          } else {
            putRow('s4-chk-t', 7, '检验：代入原方程组', { color: PURPLE, size: 24, bold: true });
            putRow('s4-chk1', 4.5, '原方程组：$\\begin{cases}x-y=3 & ① \\\\ 3x-8y=14 & ②\\end{cases}$，解：$x=2, y=-1$', { color: INK, size: 20 });
            putRow('s4-chk2', 2.0, '代入①：左边 $= 2 - (-1) = 3 =$ 右边 ✓', { color: GREEN, size: 22 });
            putRow('s4-chk3', -0.5, '代入②：左边 $= 3\\times2 - 8\\times(-1) = 6 + 8 = 14 =$ 右边 ✓', { color: GREEN, size: 22 });
            P.renderCard('<b>检验要点</b>：必须代入原方程组的<b>两个</b>方程分别检验，两个都满足才算正确！', 'cool');
          }
        }
      },
      // 步骤2：易错——展开括号时符号
      {
        narration: '易错点：展开 $-8(x-3)$ 时，<b>负号不能漏掉</b>！<br>$-8 \\times x = -8x$，$-8 \\times (-3) = +24$（负负得正）。<br>错写成 $-8x - 24$ 就完全错了！',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s4-err-t', 7, '易错：展开括号忘变符号', { color: RED, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-err1', 4.5, '代入后：$3x - 8(x - 3) = 14$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s4-err2', 2.0, '错误展开 ✗：$3x - 8x - 24 = 14$', { color: RED, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-err3', -0.5, '（$-8 \\times (-3)$ 应得 $+24$，不是 $-24$！）', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-err4', -3.0, '正确展开 ✓：$3x - 8x + 24 = 14$', { color: GREEN, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>易错</b>：$-8(x-3)$ 展开<br>' +
                '错：$-8x - 24$ ✗<br>' +
                '对：$-8x + 24$ ✓（负 × 负 = 正）',
                'error', 'headShake');
            });
          } else {
            putRow('s4-err-t', 7, '易错：展开括号忘变符号', { color: RED, size: 24, bold: true });
            putRow('s4-err1', 4.5, '代入后：$3x - 8(x - 3) = 14$', { color: INK, size: 22 });
            putRow('s4-err2', 2.0, '错误展开 ✗：$3x - 8x - 24 = 14$', { color: RED, size: 22, bold: true });
            putRow('s4-err3', -0.5, '（$-8 \\times (-3)$ 应得 $+24$，不是 $-24$！）', { color: ORANGE, size: 20 });
            putRow('s4-err4', -3.0, '正确展开 ✓：$3x - 8x + 24 = 14$', { color: GREEN, size: 22, bold: true });
            P.renderCard(
              '<b>易错</b>：$-8(x-3)$ 展开<br>' +
              '错：$-8x - 24$ ✗<br>' +
              '对：$-8x + 24$ ✓（负 × 负 = 正）',
              'error', 'headShake');
          }
        }
      },
      // 步骤3：易错——代入要用整个式子（不能少括号）
      {
        narration: '另一个易错点：代入时，变形式必须<b>整体</b>代入，务必加括号！<br>$y = x - 3$，代入 $-8y$ 时，写 $-8(x-3)$ 而非 $-8 x - 3$。<br>漏掉括号会导致 $-8$ 只乘了 $x$，没乘 $-3$。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s4-par-t', 7, '易错：代入忘加括号', { color: RED, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-par1', 4.5, '$-8y$ 换成 $y = x-3$：', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s4-par2', 2.0, '错：$-8 \\cdot x - 3$　（漏括号！）✗', { color: RED, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s4-par3', -0.5, '对：$-8(x - 3)$　（整体代入）✓', { color: GREEN, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>代入规则</b>：把 $y=x-3$ 代入 $-8y$，<br>' +
                '要写 $-8\\times(x-3)$，括号必须有！<br>' +
                '漏括号 = 只乘了 $x$，少乘了 $-3$。',
                'error', 'headShake');
            });
          } else {
            putRow('s4-par-t', 7, '易错：代入忘加括号', { color: RED, size: 24, bold: true });
            putRow('s4-par1', 4.5, '$-8y$ 换成 $y = x-3$：', { color: INK, size: 22 });
            putRow('s4-par2', 2.0, '错：$-8 \\cdot x - 3$　（漏括号！）✗', { color: RED, size: 22 });
            putRow('s4-par3', -0.5, '对：$-8(x - 3)$　（整体代入）✓', { color: GREEN, size: 22, bold: true });
            P.renderCard(
              '<b>代入规则</b>：把 $y=x-3$ 代入 $-8y$，<br>' +
              '要写 $-8\\times(x-3)$，括号必须有！<br>' +
              '漏括号 = 只乘了 $x$，少乘了 $-3$。',
              'error', 'headShake');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
