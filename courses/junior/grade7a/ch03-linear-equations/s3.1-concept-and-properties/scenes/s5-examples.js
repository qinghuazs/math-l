(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64', GREEN = '#2e7d32';
  var IDS = []; // 当前例题画板对象登记（换题清场）

  function clearProblem() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 逐行浮现推导过程；rows: [[id, 文本, 颜色, 字号], ...]，y 自 3.6 起每行下移 2
  function derive(rows, anim) {
    var p = Promise.resolve();
    rows.forEach(function (r, i) {
      p = p.then(function () {
        S.actor(keep(r[0]), 0, 3.6 - i * 2, r[1], { color: r[2] || INK, size: r[3] || 26, bold: true });
        return anim ? delay(500) : null;
      });
    });
    return p;
  }

  var scene = {
    id: 's5',
    title: '五、例题：解简单的方程',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; IDS = []; },
    steps: [
      {
        narration: '例 1：解方程 $x+5=12$。每一步都要"两边同步"，最后别忘了<b>检验</b>。',
        enter: function (anim) {
          clearProblem();
          return derive([
            ['s5-a1', 'x + 5 = 12', INK, 28],
            ['s5-a2', '两边同时减去 5：x + 5 − 5 = 12 − 5', '#8d6e63', 20],
            ['s5-a3', 'x = 7', PURPLE, 30],
          ], anim).then(function () {
            P.renderCard('<b>检验</b>：把 $x=7$ 代入原方程，左边 $=7+5=12=$ 右边 ✓<br>所以 $x=7$ 是原方程的解。', 'cool');
          });
        },
      },
      {
        narration: '例 2：解方程 $3x=15$。这次用等式性质 2。',
        enter: function (anim) {
          clearProblem();
          return derive([
            ['s5-b1', '3x = 15', INK, 28],
            ['s5-b2', '两边同时除以 3', '#8d6e63', 20],
            ['s5-b3', 'x = 5', PURPLE, 30],
          ], anim);
        },
      },
      {
        narration: '例 3：解方程 $2x+3=11$。两步走：先去掉常数项，再把系数化为 1。',
        enter: function (anim) {
          clearProblem();
          return derive([
            ['s5-c1', '2x + 3 = 11', INK, 28],
            ['s5-c2', '两边同减 3：2x = 8', INK, 26],
            ['s5-c3', '两边同除以 2：x = 4', PURPLE, 28],
          ], anim);
        },
      },
      {
        narration: '把三道例题放在一起，解简单一元一次方程的<b>套路</b>就出来了。',
        enter: function () {
          P.renderCard('解方程的一般顺序：<br>① 去掉未知数旁边的常数（同加/同减）；<br>② 把未知数的系数化为 1（同乘/同除）；<br>③ 化成 $x=a$；④ 必要时代入<b>检验</b>。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
