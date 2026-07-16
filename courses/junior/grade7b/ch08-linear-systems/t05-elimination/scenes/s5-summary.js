(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', PURPLE = '#6a1b9a', BLUE = '#1565c0', GREEN = '#2e7d32', ORANGE = '#e65100';

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
    id: 's5',
    title: '五、课堂小结',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
    },
    steps: [
      // 步骤1：加减消元法完整步骤
      {
        narration: '今天我们学了<b>加减消元法</b>，完整步骤是：<br>① 观察系数 → ② 判断加或减 → ③ 两式相加/减消去一个未知数 → ④ 解一元方程 → ⑤ 回代求另一个未知数 → ⑥ 写出解并验算。',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s5-title', 8,
                '加减消元法 · 解题步骤',
                { color: PURPLE, size: 26, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s5-s1', 6,
                '① 观察：找系数相同或互为相反数的未知数',
                { color: BLUE, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s5-s2', 4.2,
                '② 判断：相反数→相加；相同→相减',
                { color: BLUE, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s5-s3', 2.4,
                '③ 消元：两式相加或相减，消去一个未知数',
                { color: GREEN, size: 20, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s5-s4', 0.6,
                '④ 解方程：解出剩下的一元方程',
                { color: GREEN, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s5-s5', -1.2,
                '⑤ 回代：把解代入原方程求另一个未知数',
                { color: GREEN, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s5-s6', -3,
                '⑥ 写解：用大括号写出方程组的解',
                { color: BLUE, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s5-s7', -5,
                '（⑦ 验算：代回原方程组，检验是否都满足）',
                { color: ORANGE, size: 18 });
              return delay(200);
            }).then(function () {
              P.renderCard(
                '<b>加减消元法步骤</b><br>' +
                '① 看系数 → ② 选加减 → ③ 消一元<br>' +
                '→ ④ 解方程 → ⑤ 回代 → ⑥ 写解',
                'cool');
            });
          } else {
            putRow('s5-title', 8,
              '加减消元法 · 解题步骤',
              { color: PURPLE, size: 26, bold: true });
            putRow('s5-s1', 6,
              '① 观察：找系数相同或互为相反数的未知数',
              { color: BLUE, size: 20 });
            putRow('s5-s2', 4.2,
              '② 判断：相反数→相加；相同→相减',
              { color: BLUE, size: 20 });
            putRow('s5-s3', 2.4,
              '③ 消元：两式相加或相减，消去一个未知数',
              { color: GREEN, size: 20, bold: true });
            putRow('s5-s4', 0.6,
              '④ 解方程：解出剩下的一元方程',
              { color: GREEN, size: 20 });
            putRow('s5-s5', -1.2,
              '⑤ 回代：把解代入原方程求另一个未知数',
              { color: GREEN, size: 20 });
            putRow('s5-s6', -3,
              '⑥ 写解：用大括号写出方程组的解',
              { color: BLUE, size: 20 });
            putRow('s5-s7', -5,
              '（⑦ 验算：代回原方程组，检验是否都满足）',
              { color: ORANGE, size: 18 });
            P.renderCard(
              '<b>加减消元法步骤</b><br>' +
              '① 看系数 → ② 选加减 → ③ 消一元<br>' +
              '→ ④ 解方程 → ⑤ 回代 → ⑥ 写解',
              'cool');
          }
        }
      },
      // 步骤2：与代入法对比，两大消元法并列
      {
        narration: '现在我们掌握了解方程组的两大方法：<b>代入消元法</b>和<b>加减消元法</b>。<br>什么时候用哪个？<br>有系数为 $1$（或 $-1$）时→代入法；有系数相同或互为相反数时→加减法。实际解题时，选更简便的那种！',
        enter: function (anim) {
          clearRows();
          if (anim) {
            return delay(200).then(function () {
              putRow('s5-comp-title', 7.5,
                '两大消元法对比',
                { color: PURPLE, size: 26, bold: true });
              return delay(400);
            }).then(function () {
              // 左边：代入法
              putRow('s5-left-title', 5.5,
                '代入消元法',
                { color: BLUE, size: 24, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s5-left-when', 3.5,
                '适用：有系数为 $\\pm1$ 的未知数',
                { color: BLUE, size: 20 });
              return delay(200);
            }).then(function () {
              putRow('s5-left-how', 1.5,
                '用一个式表示某未知数，',
                { color: BLUE, size: 19 });
              return delay(100);
            }).then(function () {
              putRow('s5-left-how2', 0,
                '再代入另一个方程',
                { color: BLUE, size: 19 });
              return delay(400);
            }).then(function () {
              // 分隔线
              putRow('s5-div', -1.5,
                '——————————————',
                { color: INK, size: 16 });
              return delay(300);
            }).then(function () {
              // 右边：加减法
              putRow('s5-right-title', -3,
                '加减消元法',
                { color: GREEN, size: 24, bold: true });
              return delay(300);
            }).then(function () {
              putRow('s5-right-when', -5,
                '适用：有系数相同或互为相反数',
                { color: GREEN, size: 20 });
              return delay(200);
            }).then(function () {
              putRow('s5-right-how', -7,
                '两式直接相加或相减消去一个未知数',
                { color: GREEN, size: 19 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>两大消元法</b><br>' +
                '<b>代入法</b>：系数为 $\\pm1$ 时更方便<br>' +
                '<b>加减法</b>：系数相同/互反时直接消元<br>' +
                '<br>根据具体题目，选更简便的方法！',
                'success', 'tada');
            });
          } else {
            putRow('s5-comp-title', 7.5,
              '两大消元法对比',
              { color: PURPLE, size: 26, bold: true });
            putRow('s5-left-title', 5.5,
              '代入消元法',
              { color: BLUE, size: 24, bold: true });
            putRow('s5-left-when', 3.5,
              '适用：有系数为 ±1 的未知数',
              { color: BLUE, size: 20 });
            putRow('s5-left-how', 1.5,
              '用一个式表示某未知数，',
              { color: BLUE, size: 19 });
            putRow('s5-left-how2', 0,
              '再代入另一个方程',
              { color: BLUE, size: 19 });
            putRow('s5-div', -1.5,
              '——————————————',
              { color: INK, size: 16 });
            putRow('s5-right-title', -3,
              '加减消元法',
              { color: GREEN, size: 24, bold: true });
            putRow('s5-right-when', -5,
              '适用：有系数相同或互为相反数',
              { color: GREEN, size: 20 });
            putRow('s5-right-how', -7,
              '两式直接相加或相减消去一个未知数',
              { color: GREEN, size: 19 });
            P.renderCard(
              '<b>两大消元法</b><br>' +
              '<b>代入法</b>：系数为 $\\pm1$ 时更方便<br>' +
              '<b>加减法</b>：系数相同/互反时直接消元<br>' +
              '<br>根据具体题目，选更简便的方法！',
              'success', 'tada');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
