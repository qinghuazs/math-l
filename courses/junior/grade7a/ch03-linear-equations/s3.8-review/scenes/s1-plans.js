// 环节一：一、话费方案对决
// 数学验算：方案A费用 = (15 + 0.1t) 元；方案B费用 = 0.2t 元
// t=0:  A=15, B=0;  t=50: A=20, B=10;  t=100: A=25, B=20;  t=150: A=30, B=30（差=0★）;  t=200: A=35, B=40
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、话费方案对决',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '生活中常常要做"选哪个方案更省钱"的决策。今天我们来看一道真实的话费选择题：方案 A，月租 15 元，每分钟 0.1 元；方案 B，无月租，每分钟 0.2 元。如果你每月打 100 分钟，你选哪个？设月通话时间为 t 分钟，请先写出两个方案各自的费用表达式。',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '话费方案对决', { color: INK, size: 22, bold: true });
          S.actor('s1-labelA', -5.5, 4.5, '方案 A', { color: WARM, size: 20, bold: true });
          S.actor('s1-descA', -5.5, 3.0, '月租 15 元 + 每分钟 0.1 元', { color: WARM, size: 16 });
          S.actor('s1-labelB', 3.5, 4.5, '方案 B', { color: COOL, size: 20, bold: true });
          S.actor('s1-descB', 3.5, 3.0, '无月租，每分钟 0.2 元', { color: COOL, size: 16 });
          S.actor('s1-q', 0, 1.2, '设月通话时间为 $t$ 分钟，费用分别是多少？', { color: INK, size: 17 });
          P.renderCard(
            '<b>话费方案</b><br>' +
            '方案 A：月租 15 元 + 每分钟 0.1 元<br>' +
            '方案 B：无月租，每分钟 0.2 元<br>' +
            '设月通话时间为 $t$ 分钟（$t \\geq 0$），分别写出费用表达式。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '方案 A 的费用：月租 15 元是固定的，再加上通话费 0.1 乘以 t，所以是 15 加 0.1t 元。方案 B 没有月租，只有通话费 0.2 乘以 t，所以是 0.2t 元。这两个代数式就是我们建立方程的基础。',
        enter: function (anim) {
          S.remove('s1-q');
          S.actor('s1-exprA', -5.5, 0.5,
            '费用 $= (15 + 0.1t)$ 元',
            { color: WARM, size: 18, bold: true });
          S.actor('s1-exprB', 3.5, 0.5,
            '费用 $= 0.2t$ 元',
            { color: COOL, size: 18, bold: true });
          S.actor('s1-vs', 0, 0.5, 'VS', { color: INK, size: 20, bold: true });
          P.renderCard(
            '<b>两方案费用表达式</b><br>' +
            '方案 A 费用：$(15 + 0.1t)$ 元（月租固定 + 通话费）<br>' +
            '方案 B 费用：$0.2t$ 元（纯通话费）<br>' +
            '口算验证：$t=100$ 时，A = 25 元，B = 20 元；$t=200$ 时，A = 35 元，B = 40 元。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '下面看费用对比表。取 t 等于 0、50、100、150、200 五个值，看两方案费用的差。注意 t 等于 150 那一行，差值为 0，打上了星号——这就是我们要精确求出的临界点。表格给了我们感性印象，但如何精确求出"两方案费用恰好相等"时的 t 值？用方程！',
        enter: function (anim) {
          P.renderTable({
            head: ['通话时间 $t$（分钟）', '方案A费用（元）', '方案B费用（元）', '差（A-B）'],
            rows: [
              ['0', '15', '0', '+15'],
              ['50', '20', '10', '+10'],
              ['100', '25', '20', '+5'],
              ['150', '30', '30', '0 ★'],
              ['200', '35', '40', '-5'],
            ],
          });
          P.renderCard(
            '<b>观察规律</b><br>' +
            '$t \\lt 150$ 时：方案 A 更贵（差值为正）<br>' +
            '$t = 150$ 时：两方案<b>相等</b>（差值为 0 ★）<br>' +
            '$t \\gt 150$ 时：方案 B 更贵（差值为负）<br>' +
            '如何<b>精确</b>求出临界值？——列方程！',
            'cool'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
