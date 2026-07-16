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
    id: 's3',
    title: '三、也可消 x——对比两种路径',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：同一题改消 x，展示 ①×5 ②×3
      {
        narration: '同一道题 $\\begin{cases}3x+4y=16 & ① \\\\ 5x-6y=33 & ②\\end{cases}$ 也可以改成消去 $x$。$x$ 的系数是 $3$ 和 $5$，最小公倍数是 $15$。①两边乘以 $5$ 得 $15x+20y=80$，记为⑤；②两边乘以 $3$ 得 $15x-18y=99$，记为⑥。',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s3-sys', 7.2,
                '$\\begin{cases}3x+4y=16 & \\text{①} \\\\ 5x-6y=33 & \\text{②}\\end{cases}$',
                { color: PURPLE, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-lcm', 5.0, '$x$ 系数：$3$ 和 $5$，最小公倍数 $= 15$', { color: ORANGE, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-arrow1', 2.8, '①两边 $\\times 5$：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s3-r5', 0.8, '$15x + 20y = 80 \\quad$ ⑤', { color: BLUE, size: 24, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s3-arrow2', -1.5, '②两边 $\\times 3$：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s3-r6', -3.5, '$15x - 18y = 99 \\quad$ ⑥', { color: BLUE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-hint', -6.0, '$x$ 系数均为 $15$，相减即消！', { color: GREEN, size: 22, bold: true });
              P.renderCard(
                '<b>消 $x$ 路径</b><br>' +
                'lcm(3, 5) = 15，①×5 得⑤，②×3 得⑥<br>' +
                '⑤：$15x + 20y = 80$<br>' +
                '⑥：$15x - 18y = 99$<br>' +
                '$x$ 系数相同，⑤-⑥ 即消！',
                'cool'
              );
            });
          } else {
            putRow('s3-sys', 7.2,
              '$\\begin{cases}3x+4y=16 & \\text{①} \\\\ 5x-6y=33 & \\text{②}\\end{cases}$',
              { color: PURPLE, size: 22 });
            putRow('s3-lcm', 5.0, '$x$ 系数：$3$ 和 $5$，最小公倍数 $= 15$', { color: ORANGE, size: 22 });
            putRow('s3-arrow1', 2.8, '①两边 $\\times 5$：', { color: ORANGE, size: 20 });
            putRow('s3-r5', 0.8, '$15x + 20y = 80 \\quad$ ⑤', { color: BLUE, size: 24, bold: true });
            putRow('s3-arrow2', -1.5, '②两边 $\\times 3$：', { color: ORANGE, size: 20 });
            putRow('s3-r6', -3.5, '$15x - 18y = 99 \\quad$ ⑥', { color: BLUE, size: 24, bold: true });
            putRow('s3-hint', -6.0, '$x$ 系数均为 $15$，相减即消！', { color: GREEN, size: 22, bold: true });
            P.renderCard(
              '<b>消 $x$ 路径</b><br>' +
              'lcm(3, 5) = 15，①×5 得⑤，②×3 得⑥<br>' +
              '⑤：$15x + 20y = 80$<br>' +
              '⑥：$15x - 18y = 99$<br>' +
              '$x$ 系数相同，⑤-⑥ 即消！',
              'cool'
            );
          }
        }
      },
      // 步骤2：⑤-⑥ 消 x，得 y=-1/2（与消 y 路径结果相同）
      {
        narration: '<b>⑤-⑥：</b>$(15x+20y)-(15x-18y)=80-99$，$38y=-19$，$y=-\\frac{1}{2}$。结果与消 $y$ 路径完全相同！验证两条路径都正确。',
        enter: function (anim) {
          clearRows();
          putRow('s3-r5', 7.0, '$15x + 20y = 80 \\quad$ ⑤', { color: BLUE, size: 22 });
          putRow('s3-r6', 5.0, '$15x - 18y = 99 \\quad$ ⑥', { color: BLUE, size: 22 });
          if (anim) {
            return delay(300).then(function () {
              putRow('s3-sub', 2.8, '⑤ - ⑥：', { color: ORANGE, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s3-calc', 0.8,
                '$(15x - 15x) + (20y - (-18y)) = 80 - 99$',
                { color: INK, size: 20 });
              return delay(500);
            }).then(function () {
              putRow('s3-simp', -1.5, '$38y = -19$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s3-y', -4.0, '$y = -\\dfrac{1}{2}$', { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s3-same', -6.5, '与消 $y$ 路径结果相同 ✓', { color: GREEN, size: 20 });
              P.renderCard(
                '<b>⑤-⑥ 消 $x$</b><br>' +
                '$(20+18)y = 80 - 99$<br>' +
                '$38y = -19$<br>' +
                '$y = -\\dfrac{1}{2}$（与消 $y$ 路径一致）',
                'cool'
              );
            });
          } else {
            putRow('s3-sub', 2.8, '⑤ - ⑥：', { color: ORANGE, size: 20 });
            putRow('s3-calc', 0.8, '$(15x - 15x) + (20y - (-18y)) = 80 - 99$', { color: INK, size: 20 });
            putRow('s3-simp', -1.5, '$38y = -19$', { color: INK, size: 24 });
            putRow('s3-y', -4.0, '$y = -\\dfrac{1}{2}$', { color: GREEN, size: 28, bold: true });
            putRow('s3-same', -6.5, '与消 $y$ 路径结果相同 ✓', { color: GREEN, size: 20 });
            P.renderCard(
              '<b>⑤-⑥ 消 $x$</b><br>' +
              '$(20+18)y = 80 - 99$<br>' +
              '$38y = -19$<br>' +
              '$y = -\\dfrac{1}{2}$（与消 $y$ 路径一致）',
              'cool'
            );
          }
        }
      },
      // 步骤3：对比表——应选哪个消元
      {
        narration: '<b>如何选择消哪个未知数？</b>消 $y$：最小公倍数 $12$（较小）；消 $x$：最小公倍数 $15$（较大）。通常优先选<b>公倍数更小</b>的方向，乘以的数更小，计算更简单。本题消 $y$ 更优！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(300).then(function () {
              putRow('s3-cmp-title', 7.0, '两种路径对比：', { color: INK, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-cmp-y', 4.5,
                '消 $y$：系数 $4, 6$，lcm $= 12$，①$\\times 3$，②$\\times 2$',
                { color: BLUE, size: 21 });
              return delay(400);
            }).then(function () {
              putRow('s3-cmp-x', 2.0,
                '消 $x$：系数 $3, 5$，lcm $= 15$，①$\\times 5$，②$\\times 3$',
                { color: ORANGE, size: 21 });
              return delay(500);
            }).then(function () {
              putRow('s3-rule', -0.5,
                '公倍数更小 → 乘数更小 → 计算更简单',
                { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s3-win', -3.0,
                '本题：消 $y$（lcm=12）优于消 $x$（lcm=15）',
                { color: GREEN, size: 22, bold: true });
              P.renderTable({
                head: ['消元对象', '系数', 'lcm', '乘数', '推荐'],
                rows: [
                  ['消 $y$', '$4, 6$', '$12$', '$3, 2$', '★ 更简单'],
                  ['消 $x$', '$3, 5$', '$15$', '$5, 3$', '较繁']
                ]
              });
            });
          } else {
            putRow('s3-cmp-title', 7.0, '两种路径对比：', { color: INK, size: 22, bold: true });
            putRow('s3-cmp-y', 4.5,
              '消 $y$：系数 $4, 6$，lcm $= 12$，①$\\times 3$，②$\\times 2$',
              { color: BLUE, size: 21 });
            putRow('s3-cmp-x', 2.0,
              '消 $x$：系数 $3, 5$，lcm $= 15$，①$\\times 5$，②$\\times 3$',
              { color: ORANGE, size: 21 });
            putRow('s3-rule', -0.5, '公倍数更小 → 乘数更小 → 计算更简单', { color: INK, size: 20 });
            putRow('s3-win', -3.0,
              '本题：消 $y$（lcm=12）优于消 $x$（lcm=15）',
              { color: GREEN, size: 22, bold: true });
            P.renderTable({
              head: ['消元对象', '系数', 'lcm', '乘数', '推荐'],
              rows: [
                ['消 $y$', '$4, 6$', '$12$', '$3, 2$', '★ 更简单'],
                ['消 $x$', '$3, 5$', '$15$', '$5, 3$', '较繁']
              ]
            });
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
