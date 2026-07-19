// s6-summary.js  环节六：小结——两步流程+悬念（3步）
// 数学验算：
//   知识地图：7x-2.5x+3x-1.5x=6x ✓；6x=-78→x=-13 ✓；x+2x+4x=140 ✓
//   悬念方程：3x+5=2x-1，两边都有含x的项，下节课讲（不提"移项"一词）
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：流程图——两步顺序不能颠倒
      {
        narration: '我们来做今天的课堂小结。解含多项 x 的一元一次方程，流程分两步：第一步，合并同类项——把左边（或右边）含 x 的项合并，让方程变成 ax 等于 b 的标准形式；第二步，系数化为 1——用等式性质 2，两边同除以系数 a，得到 x 等于某个数。这两步的顺序不能颠倒！',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.2, '课堂小结', { color: COOL, size: 22, bold: true });

          // 流程图
          S.actor('s6-flow-start', -8, 4.5,
            '方程（含多项 $x$）',
            { color: INK, size: 18, bold: true });
          S.actor('s6-flow-arr1', -2.5, 4.5, '→', { color: PURPLE, size: 26 });
          S.actor('s6-flow-step1', 0, 4.5,
            '合并同类项',
            { color: TEAL, size: 18, bold: true });
          S.actor('s6-flow-mid', 4.2, 4.5,
            '$ax = b$',
            { color: PURPLE, size: 20 });
          S.actor('s6-flow-arr2', -4.5, 2.2, '→', { color: PURPLE, size: 26 });
          S.actor('s6-flow-step2', -2, 2.2,
            '两边同除以 $a$',
            { color: TEAL, size: 18, bold: true });
          S.actor('s6-flow-end', 3.5, 2.2,
            '$x = \\cdots$',
            { color: WARM, size: 22, bold: true });

          // 注意顺序
          S.actor('s6-order', 0, 0.2,
            '顺序不能颠倒！先合并，再化系数。',
            { color: WARM, size: 17 });

          P.renderCard(
            '<b>解方程两步流程</b><br>' +
            '方程（含多项 $x$）<br>' +
            '① 合并同类项 $\\Rightarrow ax = b$<br>' +
            '② 两边同除以 $a$ $\\Rightarrow x = \\cdots$<br><br>' +
            '顺序不能颠倒：先合并同类项，再系数化为 1。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：知识地图表格
      {
        narration: '来看知识地图。本节课用到了哪些已学知识？合并同类项——第二章整式加减学过的；系数化为 1——3.1 等式性质 2；总量模型——各部分之和等于总量。这节课的内容是旧知识的组合应用，没有全新的工具，只是把已有的工具按顺序串联在一起！',
        enter: function (anim) {
          S.remove('s6-flow-start'); S.remove('s6-flow-arr1'); S.remove('s6-flow-step1');
          S.remove('s6-flow-mid'); S.remove('s6-flow-arr2'); S.remove('s6-flow-step2');
          S.remove('s6-flow-end'); S.remove('s6-order');

          P.renderTable({
            head: ['环节', '操作依据', '本节例子'],
            rows: [
              ['合并同类项', '整式加减（第二章）', '$7x - 2.5x + 3x - 1.5x = 6x$'],
              ['系数化为 1', '等式性质 2（3.1）', '$6x = -78 \\Rightarrow x = -13$'],
              ['总量模型', '各部分之和', '$x + 2x + 4x = 140$'],
            ],
          });

          P.renderCard(
            '<b>知识地图</b><br>' +
            '本节是旧知识的<b>组合应用</b>：<br>' +
            '• 合并同类项（第二章）<br>' +
            '• 等式性质 2（3.1）<br>' +
            '→ 顺序串联，形成完整解方程流程。',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：悬念——两边都有x，下节课解决（不提"移项"）
      {
        narration: '最后，留一个思考题——也是下节课的悬念。如果方程变成这样：3x 加 5 等于 2x 减 1，两边都有含 x 的项，今天学的方法能直接用吗？同学们先想一想——下节课我们来解决这个问题！',
        enter: function (anim) {
          S.actor('s6-wonder-lbl', 0, 7.0,
            '思考：下节课的悬念',
            { color: TEAL, size: 19, bold: true });
          S.actor('s6-wonder-eq', 0, 5.0,
            '$3x + 5 = 2x - 1$',
            { color: PURPLE, size: 38, bold: true });
          S.actor('s6-wonder-hint', 0, 3.0,
            '两边都有含 $x$ 的项……',
            { color: WARM, size: 20 });
          S.actor('s6-wonder-q', 0, 1.5,
            '今天的方法能直接用吗？',
            { color: INK, size: 18 });
          S.actor('s6-wonder-next', 0, 0.0,
            '→ 下节课解决！',
            { color: COOL, size: 20, bold: true });

          P.renderCard(
            '<b>悬念：方程两边都有 $x$ 时怎么办？</b><br>' +
            '$3x + 5 = 2x - 1$<br>' +
            '两边都有含 $x$ 的项，今天的方法能直接使用吗？<br><br>' +
            '先思考，下节课揭晓！',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
