// 环节二：二、求相等点
// 数学验算：15 + 0.1t = 0.2t
// 移项：15 = 0.2t - 0.1t
// 合并同类项：15 = 0.1t
// 系数化1：t = 15 / 0.1 = 150
// 检验：代入 t=150：A = 15 + 0.1×150 = 15+15 = 30 元；B = 0.2×150 = 30 元 ✓ 两边相等
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、求相等点',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在我们列方程求临界点。令方案 A 的费用等于方案 B 的费用，得到方程：15 加 0.1t 等于 0.2t。注意：左边 15 加 0.1t 是方案 A，用暖色；右边 0.2t 是方案 B，用冷色。这就是本节课的核心方程。',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.3, '列方程：令两方案费用相等', { color: INK, size: 20, bold: true });
          S.actor('s2-condA', -5.5, 4.5, '方案A费用', { color: WARM, size: 17 });
          S.actor('s2-eq-eq', 0, 4.5, '=', { color: INK, size: 22, bold: true });
          S.actor('s2-condB', 5.5, 4.5, '方案B费用', { color: COOL, size: 17 });
          S.actor('s2-eq-lhs', -4.5, 2.5, '$15 + 0.1t$', { color: WARM, size: 26, bold: true });
          S.actor('s2-eq-mid', 0, 2.5, '$=$', { color: INK, size: 26, bold: true });
          S.actor('s2-eq-rhs', 4.5, 2.5, '$0.2t$', { color: COOL, size: 26, bold: true });
          P.renderCard(
            '<b>列方程</b><br>' +
            '令两方案费用相等：<br>' +
            '$15 + 0.1t = 0.2t$<br>' +
            '左边（方案 A）= 右边（方案 B）'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '开始解方程。第一步，移项：把含 t 的项移到右边，把 0.1t 从左边移到右边，变为负 0.1t，得 15 等于 0.2t 减 0.1t。第二步，合并同类项：0.2t 减 0.1t 等于 0.1t，得 15 等于 0.1t。第三步，系数化 1：两边除以 0.1，得 t 等于 150。记住：移项必须变号！',
        enter: function (anim) {
          S.remove('s2-condA'); S.remove('s2-eq-eq'); S.remove('s2-condB');
          S.remove('s2-eq-lhs'); S.remove('s2-eq-mid'); S.remove('s2-eq-rhs');
          S.actor('s2-step-orig', 0, 6.0, '原方程：$15 + 0.1t = 0.2t$', { color: INK, size: 17 });
          S.actor('s2-arr1', 0, 5.1, '↓ 移项（$0.1t$ 移到右边变为 $-0.1t$）', { color: ORANGE, size: 15 });
          S.actor('s2-step1', 0, 4.2, '$15 = 0.2t - 0.1t$', { color: INK, size: 20 });
          S.actor('s2-arr2', 0, 3.3, '↓ 合并同类项', { color: ORANGE, size: 15 });
          S.actor('s2-step2', 0, 2.4, '$15 = 0.1t$', { color: INK, size: 20 });
          S.actor('s2-arr3', 0, 1.5, '↓ 两边除以 $0.1$（系数化 1）', { color: ORANGE, size: 15 });
          S.actor('s2-step3', 0, 0.4, '$t = 150$', { color: WARM, size: 30, bold: true });
          P.renderCard(
            '<b>解方程过程</b><br>' +
            '$15 + 0.1t = 0.2t$<br>' +
            '移项：$15 = 0.2t - 0.1t$<br>' +
            '合并：$15 = 0.1t$<br>' +
            '化 1：$t = 150$<br>' +
            '关键：<b>移项必变号</b>，$0.1t$ 过等号变 $-0.1t$'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      {
        narration: '解得 t 等于 150，一定要代入原方程检验。把 t 等于 150 代入：方案 A 等于 15 加 0.1 乘以 150，等于 15 加 15，等于 30 元；方案 B 等于 0.2 乘以 150，等于 30 元。两边都等于 30 元，相等，验算正确！结论：每月通话恰好 150 分钟时，两方案费用相同，都是 30 元。',
        enter: function (anim) {
          S.remove('s2-title');
          S.remove('s2-step-orig'); S.remove('s2-arr1'); S.remove('s2-step1');
          S.remove('s2-arr2'); S.remove('s2-step2'); S.remove('s2-arr3'); S.remove('s2-step3');
          S.actor('s2-ans', 0, 6.0, '$t = 150$（临界点）', { color: WARM, size: 24, bold: true });
          S.actor('s2-check-title', 0, 4.5, '检验：代入 $t=150$', { color: TEAL, size: 18 });
          S.actor('s2-check-A', -4.5, 3.0,
            '方案A：$15 + 0.1 \\times 150 = 30$ 元',
            { color: WARM, size: 16 });
          S.actor('s2-check-B', 4.5, 3.0,
            '方案B：$0.2 \\times 150 = 30$ 元',
            { color: COOL, size: 16 });
          S.actor('s2-check-ok', 0, 1.5, '两边相等 ✓', { color: GREEN, size: 22, bold: true });
          P.renderCard(
            '<b>检验</b>（代入原方程 $15 + 0.1t = 0.2t$）<br>' +
            '左边 $= 15 + 0.1 \\times 150 = 30$<br>' +
            '右边 $= 0.2 \\times 150 = 30$<br>' +
            '左边 $=$ 右边 ✓<br>' +
            '结论：每月通话 <b>150 分钟</b>时，两方案费用均为 <b>30 元</b>。',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
