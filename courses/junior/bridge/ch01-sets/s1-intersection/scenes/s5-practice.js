(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var IDS = []; // 当前练习画板对象登记（换题清场）

  function clearProblem() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 依次放置数字演员；spec: [id, x, y, 文本, 颜色]
  function place(list, anim) {
    var p = Promise.resolve();
    list.forEach(function (n) {
      p = p.then(function () {
        S.actor(keep(n[0]), n[1], n[2], n[3], { color: n[4] || INK, size: 19, bold: true });
        return anim ? delay(130) : null;
      });
    });
    return p;
  }

  var scene = {
    id: 's5',
    title: '五、基础练习：求交集',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; IDS = []; },
    steps: [
      {
        narration: '练习 1：$A=\\{1,2,3,4,5\\}$，$B=\\{3,4,5,6,7\\}$，求 $A\\cap B$。——先把元素放进图里。',
        enter: function (anim) {
          clearProblem();
          S.addCircle(keep('s5-ca'), -2.2, 0, 3.3, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
          S.addCircle(keep('s5-cb'), 2.2, 0, 3.3, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
          S.actor(keep('s5-ta'), -3.6, 4.1, 'A', { color: WARM, size: 22, bold: true });
          S.actor(keep('s5-tb'), 3.6, 4.1, 'B', { color: COOL, size: 22, bold: true });
          return place([
            ['s5-p1', -4.4, 0.9, '1'], ['s5-p2', -3.3, -0.9, '2'],
            ['s5-p3', 0, 1.3, '3', PURPLE], ['s5-p4', 0, 0, '4', PURPLE], ['s5-p5', 0, -1.3, '5', PURPLE],
            ['s5-p6', 3.3, 0.9, '6'], ['s5-p7', 4.4, -0.9, '7'],
          ], anim).then(function () {
            P.renderCard('公共元素是 $3$、$4$、$5$，所以 $A\\cap B=\\{3,4,5\\}$。');
          });
        },
      },
      {
        narration: '练习 2：$A=\\{2,4,6,8\\}$，$B=\\{1,3,5,7\\}$，求 $A\\cap B$。——咦，两个圈<b>没有重叠</b>！',
        enter: function (anim) {
          clearProblem();
          S.addCircle(keep('s5-c2a'), -5.2, 0, 2.9, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
          S.addCircle(keep('s5-c2b'), 5.2, 0, 2.9, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
          S.actor(keep('s5-t2a'), -5.2, 3.8, 'A', { color: WARM, size: 22, bold: true });
          S.actor(keep('s5-t2b'), 5.2, 3.8, 'B', { color: COOL, size: 22, bold: true });
          return place([
            ['s5-q2', -6.1, 1, '2'], ['s5-q4', -4.3, 1, '4'],
            ['s5-q6', -6.1, -1, '6'], ['s5-q8', -4.3, -1, '8'],
            ['s5-q1', 4.3, 1, '1'], ['s5-q3', 6.1, 1, '3'],
            ['s5-q5', 4.3, -1, '5'], ['s5-q7', 6.1, -1, '7'],
          ], anim).then(function () {
            P.renderCard('没有公共元素——交集是<b>空集</b>：$A\\cap B=\\varnothing$。<br>$\\varnothing$ 表示不含任何元素的集合。', 'cool');
          });
        },
      },
      {
        narration: '特别提醒：空集要写 $\\varnothing$，<b>不能</b>写成 $\\{\\varnothing\\}$——想一想为什么？',
        enter: function () {
          P.renderCard('$\\varnothing$ 本身是一个集合（空集）；<br>$\\{\\varnothing\\}$ 是"含有一个元素"的集合，那个元素是空集。<br>两者含义不同，所以 $A\\cap B=\\{\\varnothing\\}$ 是<b>错误</b>写法。', 'warm');
        },
      },
      {
        narration: '练习 3：$A=\\{1,2,3\\}$，$B=\\{1,2,3,4,5\\}$。这次 $A$ 的元素<b>全部</b>在 $B$ 中——圈套圈了！',
        enter: function (anim) {
          clearProblem();
          S.addCircle(keep('s5-c3b'), 0.8, 0, 4.6, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.07 });
          S.addCircle(keep('s5-c3a'), -1.4, 0, 2.1, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.1 });
          S.actor(keep('s5-t3a'), -1.4, 2.7, 'A', { color: WARM, size: 20, bold: true });
          S.actor(keep('s5-t3b'), 4.4, 4.2, 'B', { color: COOL, size: 22, bold: true });
          return place([
            ['s5-r1', -2.1, 0.7, '1', PURPLE], ['s5-r2', -0.8, 0, '2', PURPLE], ['s5-r3', -2.1, -0.7, '3', PURPLE],
            ['s5-r4', 3.2, 1.4, '4'], ['s5-r5', 3.2, -1.4, '5'],
          ], anim).then(function () {
            P.renderCard('$A$ 的所有元素都在 $B$ 中，公共元素就是 $A$ 的全部元素：<br>$A\\cap B=\\{1,2,3\\}=A$。', 'cool');
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
