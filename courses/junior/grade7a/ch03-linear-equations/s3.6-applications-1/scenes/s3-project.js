// s3-project.js  环节三：工程问题（3步）
// 数学验算：总工作量=1；每人效率=1/40；分两阶段：x人做4h，(x+2)人做8h
// 等量关系：4x/40 + 8(x+2)/40 = 1
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、工程问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：情境引入 + 把总量看作1
      {
        narration: '好，现在来看第二类问题——工程问题。题目是：整理一批图书，1个人整理需要40小时完成。现先安排若干人整理了4小时，再增加2人一起又整理了8小时，恰好完成任务。每人效率相同，最初安排了多少人？工程问题的核心策略是：把总工作量规定为1！不管这批书有多少本，我们都把它整体看作1。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.2, '三、工程问题情境', { color: TEAL, size: 20, bold: true });

          // 大长方形代表总工作量=1
          S.addPolygon('s3-rect-bg', [[-8, 4.5], [8, 4.5], [8, 1.5], [-8, 1.5]],
            { color: TEAL, opacity: 0.12, borderWidth: 0 });
          S.addSegment('s3-rect-top', [-8, 4.5], [8, 4.5], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-bot', [-8, 1.5], [8, 1.5], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-l', [-8, 1.5], [-8, 4.5], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-r', [8, 1.5], [8, 4.5], { color: TEAL, width: 3, dash: 0 });

          S.actor('s3-total-label', 0, 3.0, '总工作量 = 1', { color: TEAL, size: 20, bold: true });

          // 题目信息
          S.actor('s3-info1', -5, -0.5, '1人整理需 40 小时完成', { color: INK, size: 16 });
          S.actor('s3-info2', -5, -2.0, '先安排 $x$ 人做 4 小时', { color: WARM, size: 16 });
          S.actor('s3-info3', -5, -3.5, '再增加 2 人做 8 小时', { color: COOL, size: 16 });
          S.actor('s3-info4', -5, -5.0, '恰好完成任务', { color: GREEN, size: 16 });

          P.renderCard(
            '<b>工程问题核心策略</b><br>' +
            '把<b>总工作量规定为 1</b>（不管实际是多少本书）<br>' +
            '1人整理需40小时 → 每人每小时效率 $= \\dfrac{1}{40}$<br>' +
            '<small>这样不需要知道实际数量，也能列出方程！</small>'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：效率公式 + 分阶段工作量
      {
        narration: '1个人整理需要40小时完成，那么这个人每小时完成多少？1除以40，即每小时效率是四十分之一。多人合作时，效率相加——x个人每小时完成四十分之x的工作量。第一阶段：x人做4小时，完成的工作量是四十分之四x。第二阶段：增加2人后共(x+2)人，做8小时，完成的工作量是四十分之八乘以(x+2)。',
        enter: function (anim) {
          // 效率公式
          S.actor('s3-eff-title', 0, 6.5, '效率公式', { color: TEAL, size: 18, bold: true });
          S.actor('s3-eff', 0, 5.2,
            '每人每小时效率 $= \\dfrac{1}{40}$',
            { color: ORANGE, size: 18, bold: true });

          // 分阶段工作量
          S.actor('s3-phase1-label', -5, 3.2, '第一阶段', { color: WARM, size: 16, bold: true });
          S.actor('s3-phase1', -5, 1.8,
            '$x$ 人做 4 h，完成 $\\dfrac{4x}{40}$',
            { color: WARM, size: 16 });

          S.actor('s3-phase2-label', 4, 3.2, '第二阶段', { color: COOL, size: 16, bold: true });
          S.actor('s3-phase2', 4, 1.8,
            '$(x+2)$ 人做 8 h，完成 $\\dfrac{8(x+2)}{40}$',
            { color: COOL, size: 16 });

          // 分隔线
          S.addSegment('s3-sep', [0, 4.0], [0, 0.8], { color: INK, width: 1, dash: 3 });

          P.renderCard(
            '<b>分阶段工作量</b><br>' +
            '工作量 = 效率 × 时间 × 人数<br>' +
            '第一阶段：$x$ 人做 4 h → 完成 $\\dfrac{4x}{40}$<br>' +
            '第二阶段：$(x+2)$ 人做 8 h → 完成 $\\dfrac{8(x+2)}{40}$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：两阶段之和=1，写出方程
      {
        narration: '两个阶段加起来，恰好完成全部工作——加起来等于1。这就是我们的等量关系：四十分之四x加上四十分之8(x+2)等于1。这个方程分母都是40，下一环节我们来两边乘以40，去掉分母求解。',
        enter: function (anim) {
          S.remove('s3-phase1-label'); S.remove('s3-phase1');
          S.remove('s3-phase2-label'); S.remove('s3-phase2');
          S.remove('s3-sep');

          S.actor('s3-plus', -1.0, 2.5, '$\\dfrac{4x}{40}$', { color: WARM, size: 22, bold: true });
          S.actor('s3-add-sign', 1.2, 2.5, '$+$', { color: INK, size: 24, bold: true });
          S.actor('s3-plus2', 3.2, 2.5, '$\\dfrac{8(x+2)}{40}$', { color: COOL, size: 22, bold: true });
          S.actor('s3-eq-sign', 6.2, 2.5, '$= 1$', { color: GREEN, size: 24, bold: true });

          S.actor('s3-eq-label', 0, 0.5, '两阶段工作量之和 = 1（总量）', { color: ORANGE, size: 17, bold: true });

          S.actor('s3-key', 0, -1.5,
            '关键：两阶段<b>都要</b>列进方程，一个不能漏！',
            { color: WARM, size: 16 });

          P.renderCard(
            '<b>等量关系（工程问题核心）</b><br>' +
            '两阶段工作量之和 = 1（总量）<br>' +
            '$\\dfrac{4x}{40} + \\dfrac{8(x+2)}{40} = 1$<br>' +
            '<b>注意：多阶段问题每阶段都要列进去，不能漏！</b>',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
