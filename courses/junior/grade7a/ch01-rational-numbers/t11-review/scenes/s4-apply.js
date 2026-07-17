// s4-apply.js  四、应用关卡（3步）
// 数学验算：
// ① 384000 = 3.84×10^5（小数点左移5位，3.84满足1≤3.84<10）✓
// ② π≈3.1415，精确到百分位：第三位小数=1<5，舍去，得3.14，精确位是百分位 ✓
// ③ 50800000 = 5.08×10^7（小数点左移7位，5.08满足1≤5.08<10）✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、应用关卡',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：月地距离384000千米=3.84×10^5，反例辨析38.4×10^4不对
        narration: '应用关卡开始！先复习格式：科学记数法 a×10^n，1≤a<10，n 是正整数，两个条件缺一不可。题7：月球与地球的平均距离约384000千米，用科学记数法表示。小数点从末尾移到 3 和 8 之间，向左移了 5 位，所以指数是 5，得 3.84×10^5。反例：如果写成 38.4×10^4，对不对？不对——38.4≥10，不满足 1≤a<10！',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '应用关卡：科学记数法', { color: INK, size: 18, bold: true });

          // 格式要求
          S.actor('s4-fmt', 0, 6.0, '格式：$a \\times 10^{n}$，其中 $1 \\leq a \\lt 10$，$n$ 为正整数', { color: COOL, size: 16, bold: true });

          // 题目
          S.actor('s4-q7', 0, 4.5, '题7：月球与地球的平均距离约 384000 千米', { color: INK, size: 16 });
          S.actor('s4-q7-ask', 0, 3.5, '用科学记数法表示：', { color: INK, size: 15 });

          // 移动小数点动画说明
          S.actor('s4-num-raw', -3, 2.2, '$384000$', { color: INK, size: 20 });
          S.actor('s4-arrow', 2, 2.2, '$\\longrightarrow$', { color: GRAY, size: 20 });
          S.actor('s4-num-sci', 5, 2.2, '$3.84 \\times 10^{5}$', { color: GREEN, size: 22, bold: true });

          // 移位说明
          S.actor('s4-move', -1, 0.8, '小数点向左移 5 位，指数 = 5', { color: COOL, size: 15 });
          S.actor('s4-check-a', -2, -0.2, '验证：$1 \\leq 3.84 \\lt 10$ ✓', { color: GREEN, size: 15 });

          // 反例辨析
          S.addSegment('s4-sep1', [-10, -1.2], [10, -1.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s4-wrong-title', 0, -2.0, '反例辨析：', { color: RED, size: 15, bold: true });
          S.actor('s4-wrong', -3, -3.2, '$38.4 \\times 10^{4}$', { color: RED, size: 19 });
          S.actor('s4-wrong-x', 4, -3.2, '✗ 错误！', { color: RED, size: 17, bold: true });
          S.actor('s4-wrong-reason', 0, -4.5,
            '因为 $38.4 \\geq 10$，不满足 $1 \\leq a \\lt 10$',
            { color: ORANGE, size: 14 });

          P.renderCard(
            '<b>题7</b>：$384000 = 3.84 \\times 10^{5}$<br>' +
            '小数点从末尾左移 5 位到 3 和 8 之间<br>' +
            '反例：$38.4 \\times 10^{4}$ <b>错误</b>——$a \\geq 10$ 违规<br>' +
            '格式铁律：$1 \\leq a \\lt 10$（左闭右开）'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤2：π≈3.1415精确到百分位≈3.14
        narration: '题8：近似数的精确度。圆周率π≈3.1415，精确到百分位是多少？百分位是小数点后第二位，即 0.01 的位置。保留两位小数，看第三位：3.1415 第三位是 1，小于 5，四舍五入舍去，得 3.14。精确位是百分位——小数点后第二位。',
        enter: function (anim) {
          // 清上一步
          S.remove('s4-title'); S.remove('s4-fmt'); S.remove('s4-q7'); S.remove('s4-q7-ask');
          S.remove('s4-num-raw'); S.remove('s4-arrow'); S.remove('s4-num-sci');
          S.remove('s4-move'); S.remove('s4-check-a');
          S.remove('s4-sep1'); S.remove('s4-wrong-title'); S.remove('s4-wrong');
          S.remove('s4-wrong-x'); S.remove('s4-wrong-reason');

          S.actor('s4-t8-title', 0, 7.2, '题8：近似数与精确度', { color: INK, size: 18, bold: true });
          S.actor('s4-t8-q', 0, 6.0, '$\\pi \\approx 3.1415$，精确到百分位是多少？', { color: INK, size: 17 });

          // 数位标注
          S.actor('s4-pos-title', 0, 4.5, '各位名称：', { color: COOL, size: 15 });
          S.actor('s4-digits', 0, 3.2, '$3  .  1  4  1  5$', { color: INK, size: 22, bold: true });
          // 标注各位
          S.actor('s4-d-ge', -4.5, 2.0, '个位', { color: GRAY, size: 12 });
          S.actor('s4-d-ten1', -1.5, 2.0, '十分位', { color: GRAY, size: 12 });
          S.actor('s4-d-hun', 0.8, 2.0, '百分位', { color: RED, size: 13, bold: true });
          S.actor('s4-d-tho', 3.0, 2.0, '千分位', { color: GRAY, size: 12 });
          S.actor('s4-d-man', 5.0, 2.0, '万分位', { color: GRAY, size: 12 });

          // 步骤
          S.addSegment('s4-t8-sep', [-10, 0.8], [10, 0.8], { color: GRAY, width: 1, dash: 2 });
          S.actor('s4-t8-step1', -2, -0.2, '保留到百分位（第二位小数）', { color: COOL, size: 15 });
          S.actor('s4-t8-look', -2, -1.4, '看第三位（千分位）：$1 \\lt 5$，四舍五入舍去', { color: COOL, size: 14 });
          S.actor('s4-t8-ans', 0, -3.0,
            '$\\pi \\approx 3.1415 \\approx 3.14$',
            { color: RED, size: 22, bold: true });
          S.actor('s4-t8-prec', 0, -4.8, '精确位：百分位（$0.01$ 位）', { color: TEAL, size: 15 });

          P.renderCard(
            '<b>题8</b>：$\\pi \\approx 3.1415$，精确到百分位<br>' +
            '百分位 = 小数点后第二位<br>' +
            '看第三位：$1 \\lt 5$ → 四舍五入舍去<br>' +
            '$\\pi \\approx 3.14$，精确位是<b>百分位</b>'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤3：练习50800000=5.08×10^7，对错对比揭晓
        narration: '现在来一道练习题：把 50800000 用科学记数法表示。先自己算一下……小数点从末尾移到 5 和 0 之间，向左移了 7 位，所以是 5.08×10^7。验证：5.08 满足 1≤5.08<10，指数7是正整数，完全正确！常见错误：50.8×10^6，因为 50.8≥10 违规。',
        enter: function (anim) {
          // 清上一步
          S.remove('s4-t8-title'); S.remove('s4-t8-q');
          S.remove('s4-pos-title'); S.remove('s4-digits');
          S.remove('s4-d-ge'); S.remove('s4-d-ten1'); S.remove('s4-d-hun');
          S.remove('s4-d-tho'); S.remove('s4-d-man');
          S.remove('s4-t8-sep'); S.remove('s4-t8-step1'); S.remove('s4-t8-look');
          S.remove('s4-t8-ans'); S.remove('s4-t8-prec');

          S.actor('s4-t9-title', 0, 7.2, '练习：科学记数法', { color: INK, size: 18, bold: true });
          S.actor('s4-t9-q', 0, 6.0, '把 $50800000$ 用科学记数法表示', { color: INK, size: 18 });

          // 对比区：正确 vs 错误
          S.addSegment('s4-vs-line', [0, 4.8], [0, -3.0], { color: GRAY, width: 1, dash: 2 });

          // 正确
          S.actor('s4-cor-label', -5, 4.3, '正确写法', { color: GREEN, size: 15, bold: true });
          S.actor('s4-cor-move', -5, 2.8, '小数点左移 7 位', { color: GREEN, size: 14 });
          S.actor('s4-cor-ans', -5, 1.3, '$5.08 \\times 10^{7}$', { color: GREEN, size: 22, bold: true });
          S.actor('s4-cor-ck', -5, -0.2, '$1 \\leq 5.08 \\lt 10$ ✓', { color: GREEN, size: 14 });
          S.actor('s4-cor-ok', -5, -1.6, '✓ 正确！', { color: GREEN, size: 17, bold: true });

          // 错误
          S.actor('s4-err-label', 5, 4.3, '常见错误', { color: RED, size: 15, bold: true });
          S.actor('s4-err-move', 5, 2.8, '小数点左移 6 位', { color: RED, size: 14 });
          S.actor('s4-err-ans', 5, 1.3, '$50.8 \\times 10^{6}$', { color: RED, size: 22, bold: true });
          S.actor('s4-err-ck', 5, -0.2, '$50.8 \\geq 10$，违规！', { color: RED, size: 14 });
          S.actor('s4-err-no', 5, -1.6, '✗ 错误！', { color: RED, size: 17, bold: true });

          // 总结
          S.addSegment('s4-t9-sep', [-10, -2.8], [10, -2.8], { color: GRAY, width: 1, dash: 2 });
          S.actor('s4-sum', 0, -4.0,
            '格式铁律：$1 \\leq a \\lt 10$，$n$ 为正整数',
            { color: TEAL, size: 15, bold: true });
          S.actor('s4-sum2', 0, -5.5,
            '记忆技巧：$a$ 只有一位整数，其余全进入指数！',
            { color: TEAL, size: 14 });

          P.renderCard(
            '<b>练习揭晓</b>：$50800000 = 5.08 \\times 10^{7}$<br>' +
            '正确：$5.08$，满足 $1 \\leq a \\lt 10$，指数 $7$<br>' +
            '常见错误：$50.8 \\times 10^{6}$，因 $50.8 \\geq 10$ 违规<br>' +
            '铁律：$a$ 的整数部分<b>只有一位</b>！'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
