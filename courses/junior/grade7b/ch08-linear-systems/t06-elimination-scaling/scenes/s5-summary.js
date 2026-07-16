(function (CW) {
  'use strict';
  var S, P;
  var ROWS = [];
  var INK = '#455a64', GREEN = '#2e7d32', ORANGE = '#e65100', PURPLE = '#6a1b9a', BLUE = '#1565c0';

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
    id: 's5',
    title: '五、小结：加减消元完整流程',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：加减消元法完整流程（分步显示）
      {
        narration: '加减消元法的完整流程：<br>①选择目标——看两个方程，确定要消去哪个未知数；②找最小公倍数——找该未知数系数绝对值的最小公倍数；③倍乘方程——让目标未知数系数变为相同或相反数；④加减消元——系数相反就相加，系数相同就相减；⑤解一元方程，求出一个未知数；⑥回代求另一个；⑦写出方程组的解并验算。',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s5-title', 8.0, '加减消元法——完整流程', { color: PURPLE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s5-s1', 6.0, '① 选目标：确定消去哪个未知数', { color: INK, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s2', 4.2, '② 求 lcm：找该系数绝对值的最小公倍数', { color: INK, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s3', 2.4, '③ 倍乘：使目标系数变相同或相反', { color: ORANGE, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s4', 0.6,
                '④ 加减：相反 $\\Rightarrow$ 相加；相同 $\\Rightarrow$ 相减',
                { color: ORANGE, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s5', -1.2, '⑤ 解一元方程，求出一个未知数', { color: BLUE, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s6', -3.0, '⑥ 回代：求另一个未知数', { color: BLUE, size: 21 });
              return delay(350);
            }).then(function () {
              putRow('s5-s7', -4.8, '⑦ 写解并验算', { color: GREEN, size: 21 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>加减消元法完整流程</b><br>' +
                '选目标 → 求lcm → 倍乘方程 → 加减消元<br>' +
                '→ 解一元方程 → 回代 → 写解验算',
                'cool'
              );
            });
          } else {
            putRow('s5-title', 8.0, '加减消元法——完整流程', { color: PURPLE, size: 24, bold: true });
            putRow('s5-s1', 6.0, '① 选目标：确定消去哪个未知数', { color: INK, size: 21 });
            putRow('s5-s2', 4.2, '② 求 lcm：找该系数绝对值的最小公倍数', { color: INK, size: 21 });
            putRow('s5-s3', 2.4, '③ 倍乘：使目标系数变相同或相反', { color: ORANGE, size: 21 });
            putRow('s5-s4', 0.6, '④ 加减：相反 $\\Rightarrow$ 相加；相同 $\\Rightarrow$ 相减', { color: ORANGE, size: 21 });
            putRow('s5-s5', -1.2, '⑤ 解一元方程，求出一个未知数', { color: BLUE, size: 21 });
            putRow('s5-s6', -3.0, '⑥ 回代：求另一个未知数', { color: BLUE, size: 21 });
            putRow('s5-s7', -4.8, '⑦ 写解并验算', { color: GREEN, size: 21 });
            P.renderCard(
              '<b>加减消元法完整流程</b><br>' +
              '选目标 → 求lcm → 倍乘方程 → 加减消元<br>' +
              '→ 解一元方程 → 回代 → 写解验算',
              'cool'
            );
          }
        }
      },
      // 步骤2：三种情形归纳表
      {
        narration: '加减消元三种情形归纳：<b>情形一</b>——系数互为相反数，直接相加消元；<b>情形二</b>——系数相同，直接相减消元；<b>情形三</b>——都不满足，先求最小公倍数，倍乘其中一个或两个方程，化归为情形一或情形二再消元。今天学的就是情形三！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(300).then(function () {
              putRow('s5-cmp', 7.5, '三种情形归纳', { color: PURPLE, size: 24, bold: true });
              return delay(400);
            }).then(function () {
              P.renderTable({
                head: ['情形', '系数关系', '操作', '典型例子'],
                rows: [
                  ['一', '互为相反数', '直接相加', '$3y$ 和 $-3y$'],
                  ['二', '完全相同', '直接相减', '$5x$ 和 $5x$'],
                  ['三', '都不满足', '先乘再加/减', '$4y$ 和 $-6y$ → ×3/×2']
                ]
              });
              return delay(400);
            }).then(function () {
              putRow('s5-key', 3.5,
                '情形三 = 先化为情形一或二，再消元',
                { color: ORANGE, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s5-tip', 1.0,
                '选消元对象：优先选 lcm 更小的方向',
                { color: BLUE, size: 21 });
              return delay(400);
            }).then(function () {
              putRow('s5-end', -1.5,
                '加减消元法学习完毕！',
                { color: GREEN, size: 24, bold: true });
              P.renderCard(
                '<b>三种情形总结</b><br>' +
                '① 相反数 → 直接相加<br>' +
                '② 相同数 → 直接相减<br>' +
                '③ 都不满足 → <b>先乘再消（今天重点！）</b><br>' +
                '选择原则：lcm 更小的方向优先',
                'success', 'tada'
              );
            });
          } else {
            putRow('s5-cmp', 7.5, '三种情形归纳', { color: PURPLE, size: 24, bold: true });
            P.renderTable({
              head: ['情形', '系数关系', '操作', '典型例子'],
              rows: [
                ['一', '互为相反数', '直接相加', '$3y$ 和 $-3y$'],
                ['二', '完全相同', '直接相减', '$5x$ 和 $5x$'],
                ['三', '都不满足', '先乘再加/减', '$4y$ 和 $-6y$ → ×3/×2']
              ]
            });
            putRow('s5-key', 3.5, '情形三 = 先化为情形一或二，再消元', { color: ORANGE, size: 22, bold: true });
            putRow('s5-tip', 1.0, '选消元对象：优先选 lcm 更小的方向', { color: BLUE, size: 21 });
            putRow('s5-end', -1.5, '加减消元法学习完毕！', { color: GREEN, size: 24, bold: true });
            P.renderCard(
              '<b>三种情形总结</b><br>' +
              '① 相反数 → 直接相加<br>' +
              '② 相同数 → 直接相减<br>' +
              '③ 都不满足 → <b>先乘再消（今天重点！）</b><br>' +
              '选择原则：lcm 更小的方向优先',
              'success', 'tada'
            );
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
