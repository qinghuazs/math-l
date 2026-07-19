// 环节四：四、全章知识网络
// 知识链：方程概念(3.1)→等式性质(3.1)→合并同类项(3.2)→移项(3.3)→去括号(3.4)→去分母(3.5)→实际建模(3.6-3.7)→方案选择(3.8)
// 解方程标准五步：去括号→去分母→移项→合并同类项→系数化1
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 知识树节点位置（纵向排列，上到下）
  // bbox: [-10, 9, 10, -9]，无坐标轴
  var NODES = [
    { id: 'n1', x: 0, y: 7.8, label: '方程概念（3.1）',      color: COOL },
    { id: 'n2', x: 0, y: 6.2, label: '等式性质（3.1）',      color: COOL },
    { id: 'n3', x: 0, y: 4.6, label: '合并同类项（3.2）',    color: TEAL },
    { id: 'n4', x: 0, y: 3.0, label: '移项（3.3）',          color: TEAL },
    { id: 'n5', x: 0, y: 1.4, label: '去括号（3.4）',        color: TEAL },
    { id: 'n6', x: 0, y: -0.2, label: '去分母（3.5）',       color: TEAL },
    { id: 'n7', x: 0, y: -1.8, label: '实际建模（3.6-3.7）', color: ORANGE },
    { id: 'n8', x: 0, y: -3.4, label: '方案选择（3.8）',     color: WARM },
  ];

  var scene = {
    id: 's4',
    title: '四、全章知识网络',
    bbox: [-10, 9, 10, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在做全章知识网络梳理。第三章从 3.1 到 3.8，我们走过了八个站点。请跟着课件，逐一看每个节点出现，形成一条完整的串珠链。3.1 建立了方程概念和等式性质，3.2 到 3.5 是四大变形技能，3.6 到 3.7 是实际问题建模，3.8 是综合应用。',
        enter: function (anim) {
          S.actor('s4-title', 0, 8.6, '第三章 一元一次方程 · 知识链', { color: INK, size: 19, bold: true });
          var p = Promise.resolve();
          for (var i = 0; i < NODES.length; i++) {
            (function (node, idx) {
              p = p.then(function () {
                S.actor('s4-' + node.id, node.x, node.y, node.label,
                  { color: node.color, size: 16, bold: true });
                if (idx > 0) {
                  var prev = NODES[idx - 1];
                  S.addSegment('s4-arr-' + idx,
                    [0, prev.y - 0.35],
                    [0, node.y + 0.35],
                    { color: GRAY, width: 2, dash: 0 });
                }
                return anim ? delay(250) : Promise.resolve();
              });
            })(NODES[i], i);
          }
          P.renderCard(
            '<b>第三章知识链（8节点）</b><br>' +
            '3.1 概念 → 3.1 等式性质 → 3.2 合并 → 3.3 移项 → 3.4 括号 → 3.5 分母 → 3.6-7 建模 → 3.8 方案<br>' +
            '每一步都是上一步的基础，环环相扣。'
          );
          return p;
        },
      },
      {
        narration: '知识网络表：整理每节的核心操作、依据和易错提示，一览全章。从方程概念到方案选择，一共八行，覆盖本章所有核心考点。',
        enter: function (anim) {
          P.renderTable({
            head: ['章节', '核心操作', '依据', '易错提示'],
            rows: [
              ['3.1', '方程与方程的解', '含未知数的等式', '不是等式→不是方程'],
              ['3.1', '等式性质', '同加减/同乘除', '两边同时操作'],
              ['3.2', '合并同类项', '分配律', '只能合并同类项'],
              ['3.3', '移项', '等式性质（同加减）', '移项必变号'],
              ['3.4', '去括号', '分配律', '负号前括号全变号'],
              ['3.5', '去分母', '两边乘以最小公倍数', '常数项也要乘'],
              ['3.6-3.7', '实际建模', '找等量关系', '单位统一、设元清晰'],
              ['3.8', '方案选择', '临界值+三段讨论', '三段缺一不可'],
            ],
          });
          P.renderCard(
            '<b>全章知识网络要点</b><br>' +
            '变形技能是解方程的工具；建模是方程的应用出口。<br>' +
            '每种变形都有对应的数学依据，不是"凑"出来的！',
            'cool'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
      {
        narration: '最重要的：解一元一次方程的标准五步。记住顺序：去括号、去分母、移项、合并同类项、系数化 1。这五步不是随意的——每一步都是为了让方程变得更简单，最终化成 x 等于某个数的形式。把这五步背下来！',
        enter: function (anim) {
          S.actor('s4-five-title', 0, 8.0, '解方程标准五步', { color: PURPLE, size: 20, bold: true });
          var steps5 = [
            { id: 'f1', x: -8, y: 5.5, label: '① 去括号', color: WARM },
            { id: 'f2', x: -4, y: 5.5, label: '② 去分母', color: WARM },
            { id: 'f3', x: 0, y: 5.5, label: '③ 移项', color: TEAL },
            { id: 'f4', x: 4, y: 5.5, label: '④ 合并同类项', color: TEAL },
            { id: 'f5', x: 8, y: 5.5, label: '⑤ 系数化 1', color: COOL },
          ];
          var q = Promise.resolve();
          for (var k = 0; k < steps5.length; k++) {
            (function (st, idx) {
              q = q.then(function () {
                S.actor('s4-' + st.id, st.x, st.y, st.label,
                  { color: st.color, size: 16, bold: true });
                if (idx > 0) {
                  var px = steps5[idx - 1].x + 1.5;
                  S.addSegment('s4-farr-' + idx,
                    [px, 5.5],
                    [st.x - 1.8, 5.5],
                    { color: GRAY, width: 2, dash: 0 });
                }
                return anim ? delay(200) : Promise.resolve();
              });
            })(steps5[k], k);
          }
          S.actor('s4-five-sub', 0, 3.5,
            '最终目标：把方程化为 $x = a$ 的形式',
            { color: INK, size: 17 });
          P.renderCard(
            '<b>解方程标准五步</b><br>' +
            '去括号 → 去分母 → 移项 → 合并同类项 → 系数化 1<br>' +
            '不是每道题都需要全部五步，但顺序不能乱。<br>' +
            '目标：把方程化成 $x = a$ 的形式。',
            'warm'
          );
          return q;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
