(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', PURPLE = '#6a1b9a', BLUE = '#1565c0', ORANGE = '#e65100', GREEN = '#2e7d32', RED = '#c62828';

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
    id: 's4',
    title: '四、加还是减的选择',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：规则总结——口诀
      {
        narration: '关键问题：什么时候用加法消元？什么时候用减法消元？<br>记住这个口诀：<b>系数互为相反数→相加；系数相同→相减。</b><br>目的都是让某个未知数的系数变成 $0$，从而消去它！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s4-rule-title', 7,
                '选择原则：',
                { color: INK, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-rule1', 4.5,
                '系数互为<b>相反数</b>',
                { color: BLUE, size: 26 });
              return delay(300);
            }).then(function () {
              putRow('s4-arr1', 2.5,
                '↓',
                { color: BLUE, size: 28 });
              return delay(200);
            }).then(function () {
              putRow('s4-res1', 0.5,
                '两式<b>相加</b>  (消去)',
                { color: GREEN, size: 28, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s4-rule2', -2,
                '系数<b>相同</b>',
                { color: ORANGE, size: 26 });
              return delay(300);
            }).then(function () {
              putRow('s4-arr2', -3.8,
                '↓',
                { color: ORANGE, size: 28 });
              return delay(200);
            }).then(function () {
              putRow('s4-res2', -5.6,
                '两式<b>相减</b>  (消去)',
                { color: RED, size: 28, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>选择口诀</b><br>' +
                '系数<b>互为相反数</b> → 两式<b>相加</b><br>' +
                '系数<b>相同</b> → 两式<b>相减</b><br>' +
                '目标：让某未知数系数变为 $0$',
                'cool');
            });
          } else {
            putRow('s4-rule-title', 7,
              '选择原则：',
              { color: INK, size: 24, bold: true });
            putRow('s4-rule1', 4.5,
              '系数互为相反数',
              { color: BLUE, size: 26 });
            putRow('s4-arr1', 2.5, '↓', { color: BLUE, size: 28 });
            putRow('s4-res1', 0.5,
              '两式相加  (消去)',
              { color: GREEN, size: 28, bold: true });
            putRow('s4-rule2', -2,
              '系数相同',
              { color: ORANGE, size: 26 });
            putRow('s4-arr2', -3.8, '↓', { color: ORANGE, size: 28 });
            putRow('s4-res2', -5.6,
              '两式相减  (消去)',
              { color: RED, size: 28, bold: true });
            P.renderCard(
              '<b>选择口诀</b><br>' +
              '系数<b>互为相反数</b> → 两式<b>相加</b><br>' +
              '系数<b>相同</b> → 两式<b>相减</b><br>' +
              '目标：让某未知数系数变为 $0$',
              'cool');
          }
        }
      },
      // 步骤2：判断练习——四组方程组快判加还是减
      {
        narration: '来做几道快判练习！看方程组，快速判断：用加法消元还是减法消元？消去哪个未知数？',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s4-ex-title', 7.5,
                '快判练习（看系数，判加还是减）：',
                { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              // 例1：系数互反→加
              putRow('s4-ex1', 5.5,
                '① $\\begin{cases}2x+y=5 \\\\ 3x-y=9\\end{cases}$',
                { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-ex1a', 3.5,
                '→ $y$ 系数 $+1$ 与 $-1$：<b>相加</b>消去 $y$',
                { color: GREEN, size: 20, bold: true });
              return delay(500);
            }).then(function () {
              // 例2：系数相同→减
              putRow('s4-ex2', 1.5,
                '② $\\begin{cases}4x+3y=10 \\\\ 4x-y=2\\end{cases}$',
                { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-ex2a', -0.5,
                '→ $x$ 系数都是 $4$：<b>相减</b>消去 $x$',
                { color: RED, size: 20, bold: true });
              return delay(500);
            }).then(function () {
              // 例3：y系数相同→减
              putRow('s4-ex3', -2.5,
                '③ $\\begin{cases}x+5y=11 \\\\ 3x+5y=17\\end{cases}$',
                { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-ex3a', -4.5,
                '→ $y$ 系数都是 $5$：<b>相减</b>消去 $y$',
                { color: RED, size: 20, bold: true });
              return delay(500);
            }).then(function () {
              // 例4：系数互反→加
              putRow('s4-ex4', -6.5,
                '④ $\\begin{cases}3x+4y=7 \\\\ 5x-4y=9\\end{cases}$',
                { color: INK, size: 20 });
              return delay(400);
            }).then(function () {
              putRow('s4-ex4a', -8,
                '→ $y$ 系数 $+4$ 与 $-4$：<b>相加</b>消去 $y$',
                { color: GREEN, size: 20, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>快判练习答案</b><br>' +
                '① $y$ 系数互反 → 相加<br>' +
                '② $x$ 系数相同 → 相减<br>' +
                '③ $y$ 系数相同 → 相减<br>' +
                '④ $y$ 系数互反 → 相加',
                'cool');
            });
          } else {
            putRow('s4-ex-title', 7.5,
              '快判练习（看系数，判加还是减）：',
              { color: INK, size: 22 });
            putRow('s4-ex1', 5.5,
              '① $\\begin{cases}2x+y=5 \\\\ 3x-y=9\\end{cases}$',
              { color: INK, size: 20 });
            putRow('s4-ex1a', 3.5,
              '→ $y$ 系数 $+1$ 与 $-1$：相加消去 $y$',
              { color: GREEN, size: 20, bold: true });
            putRow('s4-ex2', 1.5,
              '② $\\begin{cases}4x+3y=10 \\\\ 4x-y=2\\end{cases}$',
              { color: INK, size: 20 });
            putRow('s4-ex2a', -0.5,
              '→ $x$ 系数都是 $4$：相减消去 $x$',
              { color: RED, size: 20, bold: true });
            putRow('s4-ex3', -2.5,
              '③ $\\begin{cases}x+5y=11 \\\\ 3x+5y=17\\end{cases}$',
              { color: INK, size: 20 });
            putRow('s4-ex3a', -4.5,
              '→ $y$ 系数都是 $5$：相减消去 $y$',
              { color: RED, size: 20, bold: true });
            putRow('s4-ex4', -6.5,
              '④ $\\begin{cases}3x+4y=7 \\\\ 5x-4y=9\\end{cases}$',
              { color: INK, size: 20 });
            putRow('s4-ex4a', -8,
              '→ $y$ 系数 $+4$ 与 $-4$：相加消去 $y$',
              { color: GREEN, size: 20, bold: true });
            P.renderCard(
              '<b>快判练习答案</b><br>' +
              '① $y$ 系数互反 → 相加<br>' +
              '② $x$ 系数相同 → 相减<br>' +
              '③ $y$ 系数相同 → 相减<br>' +
              '④ $y$ 系数互反 → 相加',
              'cool');
          }
        }
      },
      // 步骤3：口诀卡
      {
        narration: '记住这张口诀卡，做题时先看系数关系，再决定用加法还是减法消元！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(300).then(function () {
              putRow('s4-card-title', 6,
                '加减消元法 · 选择口诀',
                { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s4-card-l1', 3.5,
                '第一步：看两个方程中，哪个未知数的',
                { color: INK, size: 22 });
              return delay(200);
            }).then(function () {
              putRow('s4-card-l2', 1.5,
                '系数满足"相同"或"互为相反数"',
                { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s4-card-l3', -0.5,
                '系数互为相反数  →  两式<b>相加</b>消去它',
                { color: GREEN, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s4-card-l4', -2.5,
                '系数相同          →  两式<b>相减</b>消去它',
                { color: RED, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s4-card-l5', -5,
                '消去后：解一元方程 → 回代 → 写解',
                { color: BLUE, size: 20 });
              return delay(200);
            }).then(function () {
              P.renderCard(
                '<b>口诀</b><br>' +
                '相反数 → 相<b>加</b>（"反加"）<br>' +
                '相同数 → 相<b>减</b>（"同减"）',
                'success');
            });
          } else {
            putRow('s4-card-title', 6,
              '加减消元法 · 选择口诀',
              { color: PURPLE, size: 26, bold: true });
            putRow('s4-card-l1', 3.5,
              '第一步：看两个方程中，哪个未知数的',
              { color: INK, size: 22 });
            putRow('s4-card-l2', 1.5,
              '系数满足"相同"或"互为相反数"',
              { color: INK, size: 22 });
            putRow('s4-card-l3', -0.5,
              '系数互为相反数  →  两式相加消去它',
              { color: GREEN, size: 22, bold: true });
            putRow('s4-card-l4', -2.5,
              '系数相同          →  两式相减消去它',
              { color: RED, size: 22, bold: true });
            putRow('s4-card-l5', -5,
              '消去后：解一元方程 → 回代 → 写解',
              { color: BLUE, size: 20 });
            P.renderCard(
              '<b>口诀</b><br>' +
              '相反数 → 相<b>加</b>（"反加"）<br>' +
              '相同数 → 相<b>减</b>（"同减"）',
              'success');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
