(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', RED = '#c62828', BLUE = '#1565c0';

  // 当前场景中所有行 actor 的登记表
  var ROWS = [];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 在画板上 y 位置放一行推导文字；返回 actor handle
  // rowY: 顶行 y=7，每行下降 2.2
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

  // 题目静态展示（始终在左侧）
  function showProblem() {
    S.actor('s2-prob', -7, 6.5,
      '$\\begin{cases}x - y = 3 & \\text{①} \\\\ 3x - 8y = 14 & \\text{②}\\end{cases}$',
      { color: INK, size: 22 });
  }

  var scene = {
    id: 's2',
    title: '二、代入消元法步骤',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
      showProblem();
    },
    steps: [
      // 步骤1：题目 + 第一步变形 y = x - 3（记为③）
      {
        narration: '解方程组 $\\begin{cases}x-y=3 & ①\\\\ 3x-8y=14 & ②\\end{cases}$。<br><b>第一步：变形。</b>由①得 $y = x - 3$，记为③。<br>为什么选①？因为 $y$ 的系数是 $-1$，移项后 $y$ 已"单独出来"。',
        enter: function (anim) {
          // 重置画板行（保留题目）
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem();

          if (anim) {
            return delay(200).then(function () {
              putRow('s2-r1', 4.5, '由①得：', { color: INK, size: 20 });
              return delay(500);
            }).then(function () {
              putRow('s2-r2', 2.0, '$y = x - 3 \\quad$ ③', { color: PURPLE, size: 24, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>步骤①：变形</b><br>从一个方程中，把某个未知数单独表示出来。', 'cool');
            });
          } else {
            putRow('s2-r1', 4.5, '由①得：', { color: INK, size: 20 });
            putRow('s2-r2', 2.0, '$y = x - 3 \\quad$ ③', { color: PURPLE, size: 24, bold: true });
            P.renderCard('<b>步骤①：变形</b><br>从一个方程中，把某个未知数单独表示出来。', 'cool');
          }
        }
      },
      // 步骤2：代入——把③代入②，y 被替换为 x-3
      {
        narration: '<b>第二步：代入。</b>把③代入②，把②中的 $y$ 全部替换成 $x-3$。<br>注意要加括号！$3x - 8y = 14$ → $3x - 8(x-3) = 14$。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem();

          // 先放已知的③
          putRow('s2-r1', 4.5, '由①得：', { color: INK, size: 20 });
          putRow('s2-r2', 2.0, '$y = x - 3 \\quad$ ③', { color: PURPLE, size: 22 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-r3', -0.5, '把③代入②：', { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              // 先显示未替换的②
              putRow('s2-r4a', -3, '$3x - 8\\underline{y} = 14$', { color: RED, size: 22 });
              return delay(600);
            }).then(function () {
              // 替换 y → (x-3)，高亮替换处
              S.remove('s2-r4a');
              ROWS = ROWS.filter(function (id) { return id !== 's2-r4a'; });
              putRow('s2-r4b', -3, '$3x - 8(x-3) = 14$', { color: ORANGE, size: 24, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>步骤②：代入</b><br>把 $y = x-3$ 代入②中的 $y$，记住要加括号：$-8y \\rightarrow -8(x-3)$。', 'warm');
            });
          } else {
            putRow('s2-r3', -0.5, '把③代入②：', { color: INK, size: 20 });
            putRow('s2-r4b', -3, '$3x - 8(x-3) = 14$', { color: ORANGE, size: 24, bold: true });
            P.renderCard('<b>步骤②：代入</b><br>把 $y = x-3$ 代入②中的 $y$，记住要加括号：$-8y \\rightarrow -8(x-3)$。', 'warm');
          }
        }
      },
      // 步骤3：展开解一元方程，得 x=2
      {
        narration: '<b>第三步：求解。</b>展开括号：$-8 \\times (x-3) = -8x + 24$。<br>$3x - 8x + 24 = 14$ → $-5x = -10$ → $x = 2$。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem();

          putRow('s2-r1', 4.5, '由①得：$y = x - 3$ ③', { color: PURPLE, size: 20 });
          putRow('s2-r2', 2.5, '把③代入②：$3x - 8(x-3) = 14$', { color: ORANGE, size: 20 });

          if (anim) {
            return delay(300).then(function () {
              putRow('s2-r3', 0.2, '展开：$3x - 8x + 24 = 14$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-r4', -2.2, '$-5x = 14 - 24 = -10$', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-r5', -4.7, '$x = 2$', { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>步骤③：求解</b><br>展开括号，合并同类项，解出 $x = 2$。', 'cool');
            });
          } else {
            putRow('s2-r3', 0.2, '展开：$3x - 8x + 24 = 14$', { color: INK, size: 22 });
            putRow('s2-r4', -2.2, '$-5x = 14 - 24 = -10$', { color: INK, size: 22 });
            putRow('s2-r5', -4.7, '$x = 2$', { color: GREEN, size: 28, bold: true });
            P.renderCard('<b>步骤③：求解</b><br>展开括号，合并同类项，解出 $x = 2$。', 'cool');
          }
        }
      },
      // 步骤4：回代③得 y=-1
      {
        narration: '<b>第四步：回代。</b>把 $x=2$ 代回③式 $y = x - 3$，得 $y = 2 - 3 = -1$。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem();

          putRow('s2-r1', 4.5, '已求出：$x = 2$', { color: GREEN, size: 22, bold: true });
          putRow('s2-r2', 2.0, '回代③：$y = x - 3$', { color: PURPLE, size: 22 });

          if (anim) {
            return delay(400).then(function () {
              putRow('s2-r3', -0.5, '$y = 2 - 3$', { color: INK, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s2-r4', -3.2, '$y = -1$', { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>步骤④：回代</b><br>把已知 $x=2$ 代入变形式③，求出 $y=-1$。', 'cool');
            });
          } else {
            putRow('s2-r3', -0.5, '$y = 2 - 3$', { color: INK, size: 24 });
            putRow('s2-r4', -3.2, '$y = -1$', { color: GREEN, size: 28, bold: true });
            P.renderCard('<b>步骤④：回代</b><br>把已知 $x=2$ 代入变形式③，求出 $y=-1$。', 'cool');
          }
        }
      },
      // 步骤5：写出方程组的解（大括号）
      {
        narration: '<b>第五步：写解。</b>用大括号写出方程组的解：$\\begin{cases}x=2\\\\y=-1\\end{cases}$。',
        enter: function (anim) {
          ROWS.forEach(function (id) { S.remove(id); });
          ROWS = [];
          showProblem();

          putRow('s2-r1', 4.5, '已解出：$x = 2,\\; y = -1$', { color: GREEN, size: 22 });

          if (anim) {
            return delay(400).then(function () {
              putRow('s2-r2', 1.5, '所以，原方程组的解为：', { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s2-r3', -2.0,
                '$\\begin{cases}x = 2 \\\\ y = -1\\end{cases}$',
                { color: PURPLE, size: 28, bold: true });
              return delay(400);
            }).then(function () {
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=2\\\\y=-1\\end{cases}$<br>' +
                '<b>验算</b>：代入①：$2-(-1)=3$ ✓；代入②：$3\\times2-8\\times(-1)=6+8=14$ ✓',
                'success', 'tada');
            });
          } else {
            putRow('s2-r2', 1.5, '所以，原方程组的解为：', { color: INK, size: 22 });
            putRow('s2-r3', -2.0,
              '$\\begin{cases}x = 2 \\\\ y = -1\\end{cases}$',
              { color: PURPLE, size: 28, bold: true });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=2\\\\y=-1\\end{cases}$<br>' +
              '<b>验算</b>：代入①：$2-(-1)=3$ ✓；代入②：$3\\times2-8\\times(-1)=6+8=14$ ✓',
              'success', 'tada');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
