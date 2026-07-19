// s6-summary.js  环节六：小结（3步）
// 数学验算：无新计算；悬念题：80元进价七折=56元，盈亏待下节课揭秘
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32', PURPLE = '#7b1fa2', GRAY = '#90a4ae';

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
      // Step 1：两类问题对照表
      {
        narration: '好，这节课我们学了两类经典应用题。先来一张完整的对照表，把两类问题的关键词、等量关系、常用设元方式并排列出来，方便大家系统记忆。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.2, '六、课堂小结', { color: TEAL, size: 20, bold: true });

          P.renderTable({
            head: ['类型', '关键词', '等量关系', '常用设元'],
            rows: [
              ['配套问题', '"1 个配 n 个"/"恰好配套"', 'B数量 = 配套比 × A数量', '设生产A零件的人数为 $x$'],
              ['工程问题', '"共同完成一项工作"', '各阶段工作量之和 = 1', '设先安排 $x$ 人（或合作 $x$ 天）']
            ]
          });

          P.renderCard(
            '<b>两类问题对照</b><br>' +
            '配套问题：关键词"恰好配套"→等量关系是倍数关系<br>' +
            '工程问题：关键词"恰好完成"→等量关系是各阶段工作量之和=1'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：章节衔接时间轴
      {
        narration: '本章的学习进程是这样的：3.1学了方程概念和等式性质；3.2到3.5学完了解方程的全套方法——移项、合并同类项、去括号、去分母；今天3.6是首次系统应用，学了配套和工程两类问题；下节课3.7继续学盈亏与积分类问题。我们已经走过了最关键的那一步——从解法到应用！',
        enter: function (anim) {
          // 章节时间轴
          S.addSegment('s6-axis', [-9, 2.5], [9, 2.5], { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s6-arr1', [8.7, 2.8], [9.0, 2.5], { color: INK, width: 2, dash: 0 });
          S.addSegment('s6-arr2', [8.7, 2.2], [9.0, 2.5], { color: INK, width: 2, dash: 0 });

          // 节点
          var nodes = [
            ['s6-n1', -7.5, '3.1', '概念\n等式性质', COOL],
            ['s6-n2', -3.0, '3.2~3.5', '解法全齐', COOL],
            ['s6-n3', 2.0, '3.6', '实际问题\n配套+工程', WARM],
            ['s6-n4', 6.5, '3.7', '盈亏与积分', GRAY]
          ];

          nodes.forEach(function (n) {
            S.dropPoint(n[0] + '-pt', n[1], 2.5, { color: n[4], size: 5 });
            S.addText(n[0] + '-num', n[1] - 0.5, 3.8, n[2], { color: n[4], size: 14 });
            S.addText(n[0] + '-desc', n[1] - 0.8, 1.2, n[3], { color: n[4], size: 12 });
          });

          // 今天标注
          S.actor('s6-today', 2.0, 0.0, '今天 ↑', { color: WARM, size: 14, bold: true });

          P.renderCard(
            '<b>本章进程</b><br>' +
            '3.1概念 → 3.2~3.5解法全齐 → 3.6实际问题（配套+工程）→ 3.7盈亏与积分（下节课）<br>' +
            '我们已从"会解方程"走向"用方程解决实际问题"！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：悬念钩子
      {
        narration: '最后给大家留一个悬念！下节课3.7是盈亏与积分问题。商场打折促销——一件进价80元的商品，七折出售，到底是赚了还是亏了？你能用一元一次方程算出来吗？课后先想想，下节课来揭秘！',
        enter: function (anim) {
          S.actor('s6-hook-title', 0, -1.8, '下节课挑战：3.7 盈亏与积分', { color: ORANGE, size: 18, bold: true });

          S.actor('s6-hook-q', 0, -3.6,
            '进价 80 元的商品，七折出售……',
            { color: INK, size: 17 });
          S.actor('s6-hook-q2', 0, -5.0,
            '赚了还是亏了？',
            { color: WARM, size: 22, bold: true });

          S.actor('s6-hook-sign', 0, -7.0,
            '盈 or 亏 ？',
            { color: ORANGE, size: 24, bold: true, css: 'background:#fff3e0;border:3px solid #e65100;border-radius:12px;padding:4px 20px;' });

          P.renderCard(
            '<b>下节课预告：3.7 盈亏与积分</b><br>' +
            '商场打折促销——进价80元的商品，七折出售，到底是赚了还是亏了？<br>' +
            '用一元一次方程来揭秘！',
            'warm', 'headShake'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
