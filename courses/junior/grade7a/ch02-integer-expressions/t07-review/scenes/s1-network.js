// s1-network.js  一、知识网络总览（3步）
// 数学验算：本章知识链条——用字母表示数→单项式/多项式→整式→同类项合并→去括号→整式加减，无数字计算，结构性内容无需验算。
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、知识网络总览',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：开场承接 + 知识树节点依次飞入
      {
        narration: '上学期我们把有理数算透了——能加减乘除、能算乘方；第二章我们又把式子的名字摸清了，知道了系数、次数、同类项。今天这节课，我们把整章整理成一张地图，看看自己究竟掌握了多少。先把每个知识节点摆出来——注意看它们的顺序！',
        enter: function (anim) {
          // 节点从上到下排列，x=0 居中，y 逐步递减
          // 节点标题
          S.actor('s1-n0', 0, 8.5, '用字母表示数', { color: COOL, size: 18, bold: true });
          if (!anim) {
            S.actor('s1-n1', 0, 6.5, '代数式', { color: COOL, size: 18, bold: true });
            S.actor('s1-n2a', -4, 4.5, '单项式', { color: INK, size: 17, bold: true });
            S.actor('s1-n2b', 4, 4.5, '多项式', { color: INK, size: 17, bold: true });
            S.actor('s1-n3', 0, 2.5, '整式', { color: TEAL, size: 18, bold: true });
            S.actor('s1-n4a', -4, 0.5, '同类项合并', { color: INK, size: 17, bold: true });
            S.actor('s1-n4b', 4, 0.5, '去括号', { color: INK, size: 17, bold: true });
            S.actor('s1-n5', 0, -1.5, '整式加减', { color: WARM, size: 19, bold: true });
            P.renderCard(
              '<b>第二章知识树</b><br>' +
              '用字母表示数 → 代数式 → 单项式 / 多项式 → 整式<br>' +
              '整式运算核心：<b>合并同类项 + 去括号</b> → 整式加减'
            );
            return null;
          }
          return delay(500).then(function () {
            S.actor('s1-n1', 0, 6.5, '代数式', { color: COOL, size: 18, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s1-n2a', -4, 4.5, '单项式', { color: INK, size: 17, bold: true });
            S.actor('s1-n2b', 4, 4.5, '多项式', { color: INK, size: 17, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s1-n3', 0, 2.5, '整式', { color: TEAL, size: 18, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s1-n4a', -4, 0.5, '同类项合并', { color: INK, size: 17, bold: true });
            S.actor('s1-n4b', 4, 0.5, '去括号', { color: INK, size: 17, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s1-n5', 0, -1.5, '整式加减', { color: WARM, size: 19, bold: true });
            return delay(400);
          }).then(function () {
            P.renderCard(
              '<b>第二章知识树</b><br>' +
              '用字母表示数 → 代数式 → 单项式 / 多项式 → 整式<br>' +
              '整式运算核心：<b>合并同类项 + 去括号</b> → 整式加减'
            );
            return delay(300);
          });
        },
      },

      // Step 2：标注连接线 + 红色主线
      {
        narration: '看清楚了吗？节点有了，现在我把它们连起来。这就是本章的主干线：字母代数——刻画式的结构——运算整式。红色加粗线标注的就是最核心的运算主线：从同类项合并和去括号，汇聚到整式加减。',
        enter: function (anim) {
          // 竖向主线箭头（用线段模拟）
          S.addSegment('s1-line-01', [0, 8.1], [0, 7.0], { color: GRAY, width: 2, dash: 0 });
          S.addSegment('s1-line-12a', [0, 6.1], [-3.5, 5.0], { color: GRAY, width: 2, dash: 0 });
          S.addSegment('s1-line-12b', [0, 6.1], [3.5, 5.0], { color: GRAY, width: 2, dash: 0 });
          S.addSegment('s1-line-2a3', [-3.5, 4.1], [-1, 3.0], { color: GRAY, width: 2, dash: 0 });
          S.addSegment('s1-line-2b3', [3.5, 4.1], [1, 3.0], { color: GRAY, width: 2, dash: 0 });
          // 红色主线：整式 → 同类项合并 / 去括号 → 整式加减
          S.addSegment('s1-red-3-4a', [0, 2.1], [-3.5, 1.0], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s1-red-3-4b', [0, 2.1], [3.5, 1.0], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s1-red-4a-5', [-3.5, 0.1], [-1, -1.0], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s1-red-4b-5', [3.5, 0.1], [1, -1.0], { color: WARM, width: 3, dash: 0 });

          P.renderCard(
            '<b>主线（红色）</b><br>' +
            '字母代数 $\\rightarrow$ 式的结构 $\\rightarrow$ 整式加减<br>' +
            '核心 = <b>合并同类项</b> + <b>去括号</b>'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 3：弹出关卡标签，预告后续环节
      {
        narration: '地图画好了！整章就这一条主线。接下来我们按关卡逐一过：概念关卡检验你对系数、次数、同类项的理解；运算关卡练合并与去括号；化简求值关卡做种子题；最后出口测试检验本章掌握情况。准备好了吗，开始闯关！',
        enter: function (anim) {
          // 右侧关卡标签（绿色方框感觉）
          S.actor('s1-kw-title', 7.5, 8.0, '关卡地图', { color: GREEN, size: 17, bold: true });
          S.actor('s1-kw1', 7.5, 6.5, '① 概念关卡', { color: COOL, size: 15, bold: true });
          S.actor('s1-kw2', 7.5, 5.2, '② 运算关卡', { color: TEAL, size: 15, bold: true });
          S.actor('s1-kw3', 7.5, 3.9, '③ 化简求值', { color: ORANGE, size: 15, bold: true });
          S.actor('s1-kw4', 7.5, 2.6, '④ 易错大扫除', { color: WARM, size: 15, bold: true });
          S.actor('s1-kw5', 7.5, 1.3, '⑤ 出口测试', { color: GREEN, size: 15, bold: true });

          P.renderCard(
            '<b>四个关卡，依次闯关！</b><br>' +
            '① 概念关卡：系数/次数/同类项<br>' +
            '② 运算关卡：合并 + 去括号 + 综合<br>' +
            '③ 化简求值：先化简再代值<br>' +
            '④ 易错大扫除：五大坑全避<br>' +
            '⑤ 出口测试：五题小卷',
            'teal'
          );

          return anim ? delay(300) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
