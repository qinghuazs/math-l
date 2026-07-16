(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', PURPLE = '#6a1b9a', BLUE = '#1565c0', ORANGE = '#e65100', GREEN = '#2e7d32';

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

  var scene = {
    id: 's1',
    title: '一、新思路引入',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：展示方程组，观察系数
      {
        narration: '同学们，上节课我们学了代入消元法。今天来看一道题：$\\begin{cases}2x+y=7 & ①\\\\ 3x-y=8 & ②\\end{cases}$。<br>用代入法解——你会发现，不管从哪个式变形，都不太顺手。有没有更快的办法？',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s1-title', 6.5, '观察这个方程组：', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-eq', 3.5,
                '$\\begin{cases}2x+y=7 & \\text{①}\\\\ 3x-y=8 & \\text{②}\\end{cases}$',
                { color: PURPLE, size: 28, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s1-hint', 0,
                '注意：① 中 $y$ 的系数是 $+1$',
                { color: BLUE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-hint2', -2.5,
                '② 中 $y$ 的系数是 $-1$',
                { color: ORANGE, size: 22 });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>观察系数</b><br>① 的 $y$ 系数：$+1$<br>② 的 $y$ 系数：$-1$<br>两者互为相反数！', 'cool');
            });
          } else {
            putRow('s1-title', 6.5, '观察这个方程组：', { color: INK, size: 22 });
            putRow('s1-eq', 3.5,
              '$\\begin{cases}2x+y=7 & \\text{①}\\\\ 3x-y=8 & \\text{②}\\end{cases}$',
              { color: PURPLE, size: 28, bold: true });
            putRow('s1-hint', 0,
              '注意：① 中 $y$ 的系数是 $+1$',
              { color: BLUE, size: 22 });
            putRow('s1-hint2', -2.5,
              '② 中 $y$ 的系数是 $-1$',
              { color: ORANGE, size: 22 });
            P.renderCard('<b>观察系数</b><br>① 的 $y$ 系数：$+1$<br>② 的 $y$ 系数：$-1$<br>两者互为相反数！', 'cool');
          }
        }
      },
      // 步骤2：提出设问——两式相加会发生什么
      {
        narration: '既然 $y$ 与 $-y$ 互为相反数，如果把两个方程<b>左边加左边、右边加右边</b>，$y$ 会发生什么？<br>$(2x+y)+(3x-y) = 7+8$——猜猜结果！',
        enter: function (anim) {
          clearRows();
          putRow('s1-eq', 6.5,
            '$\\begin{cases}2x+y=7 & \\text{①}\\\\ 3x-y=8 & \\text{②}\\end{cases}$',
            { color: PURPLE, size: 26, bold: true });

          if (anim) {
            return delay(300).then(function () {
              putRow('s1-q1', 3,
                '如果 ①+②（两边分别相加）：',
                { color: INK, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s1-q2', 0.5,
                '$(2x+y)+(3x-y)=7+8$',
                { color: BLUE, size: 24, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s1-q3', -2.5,
                '$y+(-y)=\\;?$',
                { color: ORANGE, size: 26, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>设问：两式相加</b><br>等式两边分别相加，等式仍成立——这是等式的性质！<br>关键：$y+(-y)=0$，$y$ 会被消掉！', 'warm');
            });
          } else {
            putRow('s1-q1', 3,
              '如果 ①+②（两边分别相加）：',
              { color: INK, size: 22 });
            putRow('s1-q2', 0.5,
              '$(2x+y)+(3x-y)=7+8$',
              { color: BLUE, size: 24, bold: true });
            putRow('s1-q3', -2.5,
              '$y+(-y)=\\;?$',
              { color: ORANGE, size: 26, bold: true });
            P.renderCard('<b>设问：两式相加</b><br>等式两边分别相加，等式仍成立——这是等式的性质！<br>关键：$y+(-y)=0$，$y$ 会被消掉！', 'warm');
          }
        }
      },
      // 步骤3：揭晓答案——y消去，引出加减消元法概念
      {
        narration: '$y+(-y)=0$，$y$ 被完全消去！得到只含 $x$ 的方程 $5x=15$，马上能解出 $x=3$！<br>这就是<b>加减消元法</b>——通过把两个方程相加或相减，消去一个未知数！',
        enter: function (anim) {
          clearRows();
          putRow('s1-eq', 6.5,
            '$\\begin{cases}2x+y=7 & \\text{①}\\\\ 3x-y=8 & \\text{②}\\end{cases}$',
            { color: PURPLE, size: 26 });

          if (anim) {
            return delay(200).then(function () {
              putRow('s1-add', 3.5, '①+②：', { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s1-res1', 1.5,
                '$(2x+3x)+(y-y)=7+8$',
                { color: BLUE, size: 24 });
              return delay(600);
            }).then(function () {
              putRow('s1-res2', -1,
                '$5x + 0 = 15$',
                { color: BLUE, size: 26 });
              return delay(500);
            }).then(function () {
              putRow('s1-res3', -3.5,
                '$5x=15 \\Rightarrow x=3$',
                { color: GREEN, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>加减消元法</b><br>通过将两个方程<b>相加或相减</b>，消去一个未知数，从而解方程组。<br>依据：<b>等式两边同时加上（或减去）同一个数（或式），等式仍成立。</b>',
                'success', 'tada');
            });
          } else {
            putRow('s1-add', 3.5, '①+②：', { color: INK, size: 22 });
            putRow('s1-res1', 1.5,
              '$(2x+3x)+(y-y)=7+8$',
              { color: BLUE, size: 24 });
            putRow('s1-res2', -1,
              '$5x + 0 = 15$',
              { color: BLUE, size: 26 });
            putRow('s1-res3', -3.5,
              '$5x=15 \\Rightarrow x=3$',
              { color: GREEN, size: 28, bold: true });
            P.renderCard(
              '<b>加减消元法</b><br>通过将两个方程<b>相加或相减</b>，消去一个未知数，从而解方程组。<br>依据：<b>等式两边同时加上（或减去）同一个数（或式），等式仍成立。</b>',
              'success', 'tada');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
