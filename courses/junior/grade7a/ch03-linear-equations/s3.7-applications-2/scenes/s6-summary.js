// s6-summary.js  环节六：小结——百分比基数陷阱 + 四步流程 + 悬念（3步）
// 本节总结：盈亏题基数=进价；积分题基数=总场数；四步规范流程；下启3.8方案选择
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：百分比基数陷阱总结对比表
      {
        narration: '好，今天两道例题都做完了，我们来做个总结。第一个核心：百分比的基数。盈亏问题里，25% 的基数是进价，不是售价——进价 48 和 80，差距悬殊，直觉"抵消"完全错误。积分问题里，"22 场"是约束总量，设胜 x 场后，负场数用 22 减 x 来表达，系数 1 不能省。不同题目中，百分比或系数的基数（参照量）不同，计算时一定要搞清楚"从哪里出发"！',
        enter: function (anim) {
          S.actor('s6-sum-title', 0, 6.8, '核心：% 的基数搞清楚！', { color: WARM, size: 22, bold: true });

          P.renderTable({
            head: ['问题类型', '% 或系数的基数', '说明'],
            rows: [
              ['盈亏问题', '进价（原始量）', '48 ≠ 80，不能直接抵消'],
              ['积分问题', '总场数（约束量）', '负场 = 22$-$x，系数 1 显式'],
              ['增减百分比', '参照量（原始量）', '基数是"从哪里出发"的量'],
            ]
          });

          P.renderCard(
            '<b>核心口诀</b><br>' +
            '百分比的基数，是<b>"从哪里出发"的那个量</b>。<br>' +
            '盈亏题：基数 = 进价；积分题：约束 = 总场数。',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：四步规范流程卡
      {
        narration: '第二个核心：四步规范流程。第一步，审题，找等量关系——这是最关键的一步，找到了等量关系，方程就列出来了；第二步，设元，要注明单位；第三步，列方程；第四步，解加检验——检验分两步：先数值代入验证方程，再对照题意验情境合理性。注意，很多同学只做数值验证，忽视了情境检验，这是不完整的！',
        enter: function (anim) {
          S.actor('s6-flow-title', 0, 6.8, '四步规范流程', { color: TEAL, size: 20, bold: true });

          var steps = [
            ['s6-f1', 0, 5.4, '① 审题——找等量关系（最关键！）', WARM],
            ['s6-f2', 0, 4.1, '② 设元——注明单位', COOL],
            ['s6-f3', 0, 2.8, '③ 列方程', TEAL],
            ['s6-f4', 0, 1.5, '④ 解 + 检验（数值 + 情境，两步！）', ORANGE],
          ];

          var p = Promise.resolve();
          steps.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[3], size: 17, bold: true });
              return anim ? delay(400) : Promise.resolve();
            });
          });

          return p.then(function () {
            S.actor('s6-warn', 0, 0.0,
              '情境检验不能省！（$x=23$ 超出 22 场约束就会暴露）',
              { color: WARM, size: 14 });
            P.renderCard(
              '<b>四步流程</b>：审题 → 设元 → 列方程 → 解 + 检验<br>' +
              '检验必须两步：<b>数值代入</b> + <b>情境合理性</b>！',
              'cool', 'headShake'
            );
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 3：悬念引出3.8方案选择
      {
        narration: '今天我们用方程识破了"不赚不亏"的假象。下节课 3.8，我们来挑战一道更贴近生活的题——某手机套餐 A，月租 30 元，每分钟通话 0.1 元；套餐 B，月租 50 元，每分钟通话 0.05 元。打多少分钟，两个套餐费用相同？哪个套餐更划算？用同样的方程思路，帮你省下套餐费！下课前，同学们先在草稿纸上猜一猜！',
        enter: function (anim) {
          S.remove('s6-sum-title');
          S.remove('s6-flow-title');
          S.remove('s6-f1'); S.remove('s6-f2'); S.remove('s6-f3'); S.remove('s6-f4');
          S.remove('s6-warn');

          S.actor('s6-next-title', 0, 6.8, '下节课预告——3.8 方案选择', { color: TEAL, size: 20, bold: true });

          S.actor('s6-pkg-a', -4, 5.2, '套餐 A', { color: WARM, size: 18, bold: true });
          S.actor('s6-pkg-a-1', -4, 4.0, '月租 30 元', { color: INK, size: 16 });
          S.actor('s6-pkg-a-2', -4, 2.9, '每分钟 0.1 元', { color: INK, size: 16 });

          S.actor('s6-pkg-b', 4, 5.2, '套餐 B', { color: COOL, size: 18, bold: true });
          S.actor('s6-pkg-b-1', 4, 4.0, '月租 50 元', { color: INK, size: 16 });
          S.actor('s6-pkg-b-2', 4, 2.9, '每分钟 0.05 元', { color: INK, size: 16 });

          S.addSegment('s6-vs-line', [0, 5.5], [0, 2.3], { color: GRAY, width: 2, dash: 2 });
          S.actor('s6-vs', 0, 3.9, 'VS', { color: GRAY, size: 20, bold: true });

          S.actor('s6-question', 0, 1.6,
            '打多少分钟，两方案费用相同？',
            { color: WARM, size: 17, bold: true });
          S.actor('s6-tease', 0, 0.3,
            '用方程帮你省套餐费！',
            { color: TEAL, size: 16 });

          P.renderCard(
            '<b>悬念：3.8 方案选择</b><br>' +
            '套餐 A：月租 30 元 + 0.1 元/分钟<br>' +
            '套餐 B：月租 50 元 + 0.05 元/分钟<br>' +
            '打多少分钟，两者费用相同？用方程算！',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
