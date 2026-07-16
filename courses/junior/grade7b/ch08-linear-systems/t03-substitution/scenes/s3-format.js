(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', BLUE = '#1565c0';

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

  function showProblem2() {
    S.actor('s3-prob', -7.5, 7,
      '$\\begin{cases}y = 2x - 3 & \\text{①} \\\\ 3x + 2y = 8 & \\text{②}\\end{cases}$',
      { color: INK, size: 22 });
    ROWS.push('s3-prob');
  }

  var scene = {
    id: 's3',
    title: '三、完整格式示范',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：题目 + 说明已有 y=... 直接代入
      {
        narration: '再解一题：$\\begin{cases}y=2x-3 & ① \\\\ 3x+2y=8 & ②\\end{cases}$。<br>①式已经是 $y=\\ldots$ 的形式——<b>不需要再变形</b>，直接把①代入②！',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem2();

          if (anim) {
            return delay(300).then(function () {
              putRow('s3-r1', 4.5, '①式已有 $y = 2x - 3$，直接代入②：', { color: ORANGE, size: 20 });
              return delay(500);
            }).then(function () {
              putRow('s3-r2', 2.0, '$3x + 2(2x - 3) = 8$', { color: PURPLE, size: 24, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('①式已经是 $y=\\ldots$ 的形式，可以直接跳过变形步骤，直接代入！', 'cool');
            });
          } else {
            putRow('s3-r1', 4.5, '①式已有 $y = 2x - 3$，直接代入②：', { color: ORANGE, size: 20 });
            putRow('s3-r2', 2.0, '$3x + 2(2x - 3) = 8$', { color: PURPLE, size: 24, bold: true });
            P.renderCard('①式已经是 $y=\\ldots$ 的形式，可以直接跳过变形步骤，直接代入！', 'cool');
          }
        }
      },
      // 步骤2：展开求解 x=2, y=1
      {
        narration: '展开计算：$3x + 4x - 6 = 8$ → $7x = 14$ → $x = 2$。<br>回代①：$y = 2 \\times 2 - 3 = 1$。验算：$3 \\times 2 + 2 \\times 1 = 8$ ✓',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem2();

          putRow('s3-r0', 4.5, '把①代入②：$3x + 2(2x-3) = 8$', { color: PURPLE, size: 20 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s3-r1', 2.2, '展开：$3x + 4x - 6 = 8$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-r2', 0.0, '$7x = 14$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-r3', -2.2, '$x = 2$', { color: GREEN, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-r4', -4.5, '回代①：$y = 2 \\times 2 - 3 = 1$', { color: GREEN, size: 24 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=2\\\\y=1\\end{cases}$<br>' +
                '<b>验算</b>：代入②：$3\\times2+2\\times1=6+2=8$ ✓',
                'success', 'tada');
            });
          } else {
            putRow('s3-r1', 2.2, '展开：$3x + 4x - 6 = 8$', { color: INK, size: 22 });
            putRow('s3-r2', 0.0, '$7x = 14$', { color: INK, size: 22 });
            putRow('s3-r3', -2.2, '$x = 2$', { color: GREEN, size: 26, bold: true });
            putRow('s3-r4', -4.5, '回代①：$y = 2 \\times 2 - 3 = 1$', { color: GREEN, size: 24 });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=2\\\\y=1\\end{cases}$<br>' +
              '<b>验算</b>：代入②：$3\\times2+2\\times1=6+2=8$ ✓',
              'success', 'tada');
          }
        }
      },
      // 步骤3：规范书写格式卡
      {
        narration: '来看一下代入消元法的<b>规范书写格式</b>。六个步骤要完整，缺一不可。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];

          if (anim) {
            return delay(200).then(function () {
              putRow('s3-fmt-t', 7, '代入消元法——规范书写格式', { color: PURPLE, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-fmt1', 4.8, '设：设出未知数（题目中已有则跳过）', { color: INK, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s3-fmt2', 3.0, '变形：从某方程表示出一个未知数', { color: INK, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s3-fmt3', 1.2, '代入：代入另一方程（加括号！）', { color: ORANGE, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s3-fmt4', -0.6, '求解：解一元一次方程', { color: INK, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s3-fmt5', -2.4, '回代：求出另一个未知数', { color: INK, size: 18 });
              return delay(300);
            }).then(function () {
              putRow('s3-fmt6', -4.2, '写解：用大括号写出方程组的解', { color: GREEN, size: 18 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>六步规范</b>：设 → 变形 → 代入 → 求解 → 回代 → 写解<br>' +
                '代入时必须加括号，最终解用大括号表示。',
                'warm');
            });
          } else {
            putRow('s3-fmt-t', 7, '代入消元法——规范书写格式', { color: PURPLE, size: 22, bold: true });
            putRow('s3-fmt1', 4.8, '设：设出未知数（题目中已有则跳过）', { color: INK, size: 18 });
            putRow('s3-fmt2', 3.0, '变形：从某方程表示出一个未知数', { color: INK, size: 18 });
            putRow('s3-fmt3', 1.2, '代入：代入另一方程（加括号！）', { color: ORANGE, size: 18 });
            putRow('s3-fmt4', -0.6, '求解：解一元一次方程', { color: INK, size: 18 });
            putRow('s3-fmt5', -2.4, '回代：求出另一个未知数', { color: INK, size: 18 });
            putRow('s3-fmt6', -4.2, '写解：用大括号写出方程组的解', { color: GREEN, size: 18 });
            P.renderCard(
              '<b>六步规范</b>：设 → 变形 → 代入 → 求解 → 回代 → 写解<br>' +
              '代入时必须加括号，最终解用大括号表示。',
              'warm');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
