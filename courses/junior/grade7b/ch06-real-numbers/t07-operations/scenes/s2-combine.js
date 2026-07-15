(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', BLUE = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', RED = '#c62828';
  var IDS = [];

  function clearAll() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、同类根式合并',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      IDS = [];
    },
    steps: [
      {
        narration: '核心规则：被开方数相同、次数相同的根式叫做"同类根式"，它们可以合并，就像合并同类项一样。我们用字母 $a$（左列）和根式 $\\sqrt{3}$（右列）并排对比，一眼看懂！',
        enter: function (anim) {
          clearAll();
          // 左列标题：字母类比
          S.actor(keep('s2-h-left'), -5, 6.2, '字母版（类比）', { size: 18, bold: true, color: BLUE });
          // 右列标题：根式
          S.actor(keep('s2-h-right'), 4, 6.2, '根式版（实际）', { size: 18, bold: true, color: GREEN });
          // 分隔线提示
          S.actor(keep('s2-sep'), 0, 6.2, '|', { size: 22, color: '#90a4ae' });

          var leftRows = [
            ['s2-la1', '$2a$', 18],
            ['s2-la2', '$+ 3a$', 18],
            ['s2-la3', '$= (2+3)a$', 18],
            ['s2-la4', '$= 5a$', 20],
          ];
          var rightRows = [
            ['s2-ra1', '$2\\sqrt{3}$', 18],
            ['s2-ra2', '$+ 3\\sqrt{3}$', 18],
            ['s2-ra3', '$= (2+3)\\sqrt{3}$', 18],
            ['s2-ra4', '$= 5\\sqrt{3}$', 20],
          ];
          var p = Promise.resolve();
          leftRows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), -5, 4.5 - i * 2.0, r[1], { size: r[2], color: BLUE });
              S.actor(keep(rightRows[i][0]), 4, 4.5 - i * 2.0, rightRows[i][1], { size: rightRows[i][2], color: GREEN });
              return anim ? delay(500) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '类比合并的关键：系数相加，根式部分保持不变。$2\\sqrt{3}+3\\sqrt{3}=(2+3)\\sqrt{3}=5\\sqrt{3}$。这与 $2a+3a=5a$ 完全一样的道理——被加的"单位"是 $\\sqrt{3}$，系数是 2 和 3，相加得 5。',
        enter: function (anim) {
          clearAll();
          var rows = [
            ['s2-b1', '$2\\sqrt{3}+3\\sqrt{3}$', INK, 26],
            ['s2-b2', '$= (2+3)\\sqrt{3}$', BLUE, 26],
            ['s2-b3', '$= 5\\sqrt{3}$', GREEN, 30],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 4.0 - i * 2.5, r[1], { size: r[2], color: r[3], bold: i === 2 });
              return anim ? delay(600) : null;
            });
          });
          return p.then(function () {
            P.renderCard('$2\\sqrt{3}+3\\sqrt{3}=5\\sqrt{3}$<br><br>口诀：<b>系数相加，根号不动</b>', 'cool');
          });
        },
      },
      {
        narration: '【易错警示】$\\sqrt{2}+\\sqrt{3}$ 能合并吗？<b>不能！</b>因为 $\\sqrt{2}$ 和 $\\sqrt{3}$ 的被开方数不同，是不同类的根式，就像 $a+b$ 不能写成 $2a$——它们不是同类项！',
        enter: function (anim) {
          clearAll();
          S.actor(keep('s2-c1'), 0, 5.5, '易错辨析', { size: 22, bold: true, color: RED });

          var rows = [
            ['s2-c2', '$\\sqrt{2}+\\sqrt{3}$', INK, 28],
            ['s2-c3', '被开方数不同 → 不同类根式', RED, 20],
            ['s2-c4', '不能合并，结果只能写 $\\sqrt{2}+\\sqrt{3}$', RED, 20],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 3.5 - i * 2.0, r[1], { size: r[2], color: r[3] });
              return anim ? delay(600) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '课堂练习：① $4\\sqrt{5}-\\sqrt{5}=$ ？ ② $\\sqrt{7}+2\\sqrt{7}=$ ？ ③ $\\sqrt{2}+\\sqrt{5}=$ ？ 先自己算，再看答案——注意第③题不要误合并！',
        enter: function () {
          clearAll();
          P.renderTable({
            head: ['练习', '算式', '结果', '说明'],
            rows: [
              ['①', '$4\\sqrt{5}-\\sqrt{5}$', '$3\\sqrt{5}$', '系数 4-1=3，根式 $\\sqrt{5}$ 不变'],
              ['②', '$\\sqrt{7}+2\\sqrt{7}$', '$3\\sqrt{7}$', '系数 1+2=3，根式 $\\sqrt{7}$ 不变'],
              ['③', '$\\sqrt{2}+\\sqrt{5}$', '不能合并', '被开方数不同，不同类'],
            ],
          });
          S.actor(keep('s2-d1'), 0, 5.5, '同类根式合并练习', { size: 22, bold: true, color: PURPLE });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
