// s3-rules.js  三、法则形成（3步）
// 数学验算：
//   口答题1：(-7)+(-5)：同号，取负，7+5=12，结果-12 ✓
//   口答题2：(-6)+10：异号，|10|=10>|-6|=6，取正，10-6=4，结果+4 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、法则形成',
    bbox: [-11, 9, 11, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：法则分类流程图
      {
        narration: '从六情形中，我们来画一张分岔流程图，把有理数加法的计算路径梳理清楚。两数相加，第一步问：同号还是异号？同号走左边，取相同符号，绝对值相加。异号走右边，先比绝对值大小——相等就得0，不等则取绝对值较大加数的符号，绝对值相减。',
        enter: function (anim) {
          // 流程图：上方标题
          S.actor('s3-top', 0, 7.8, '<b>两数相加</b>', { color: INK, size: 20 });
          // 主竖线
          S.addSegment('s3-v1', [0, 7.2], [0, 6.0], { color: INK, width: 2, dash: 0 });
          // 分岔横线
          S.addSegment('s3-h1', [-5, 6.0], [5, 6.0], { color: INK, width: 2, dash: 0 });
          // 左分支竖线
          S.addSegment('s3-vl', [-5, 6.0], [-5, 4.5], { color: COOL, width: 2, dash: 0 });
          // 右分支竖线
          S.addSegment('s3-vr', [5, 6.0], [5, 4.5], { color: WARM, width: 2, dash: 0 });
          // 分岔标签
          S.actor('s3-lbl-l', -5, 6.4, '<b>同号</b>', { color: COOL, size: 17 });
          S.actor('s3-lbl-r', 5, 6.4, '<b>异号</b>', { color: WARM, size: 17 });
          // 左结论框
          S.actor('s3-res-l1', -5, 4.0, '取相同符号', { color: COOL, size: 15 });
          S.actor('s3-res-l2', -5, 3.2, '绝对值<b>相加</b>', { color: COOL, size: 15 });
          // 右分支：比绝对值
          S.actor('s3-cmp', 5, 4.0, '比较绝对值大小', { color: WARM, size: 14 });
          S.addSegment('s3-vr2', [5, 3.5], [5, 2.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s3-hr2', [2, 2.5], [8, 2.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s3-vr-eq', [2, 2.5], [2, 1.5], { color: TEAL, width: 2, dash: 0 });
          S.addSegment('s3-vr-neq', [8, 2.5], [8, 0.0], { color: WARM, width: 2, dash: 0 });
          S.actor('s3-eq-lbl', 2, 2.8, '相等', { color: TEAL, size: 13 });
          S.actor('s3-neq-lbl', 8, 2.8, '不等', { color: WARM, size: 13 });
          S.actor('s3-eq-res', 2, 1.0, '<b>得 0</b>', { color: TEAL, size: 16 });
          S.actor('s3-neq-r1', 8, -0.5, '取较大绝对值', { color: WARM, size: 13 });
          S.actor('s3-neq-r2', 8, -1.3, '加数的符号', { color: WARM, size: 13 });
          S.actor('s3-neq-r3', 8, -2.1, '绝对值<b>相减</b>', { color: WARM, size: 13 });
          P.renderCard(
            '<b>法则分类流程图</b><br>' +
            '先问：<b>同号还是异号？</b><br>' +
            '同号→绝对值相加，取同号<br>' +
            '异号→比绝对值大小→取大号，绝对值相减（相等则得0）'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      // Step 2：三条法则板书
      {
        narration: '现在把三条法则正式写出来。法则一：同号两数相加，取相同的符号，并把绝对值相加。法则二：绝对值不相等的异号两数相加，取绝对值较大的加数的符号，并用较大绝对值减去较小绝对值。法则三两条特殊：互为相反数相加得0；任何数与0相加等于它本身。',
        enter: function (anim) {
          P.renderCard(
            '<b>法则一（同号）</b><br>' +
            '同号两数相加，取<b>相同的符号</b>，并把绝对值<b>相加</b>。<br>' +
            '例：$(-5)+(-3)$：同号取负，$5+3=8$，结果 $-8$',
            'cool'
          );
          P.renderCard(
            '<b>法则二（异号）</b><br>' +
            '绝对值不相等的异号两数相加，取<b>绝对值较大</b>的加数的符号，绝对值<b>相减</b>。<br>' +
            '例：$(+5)+(-3)$：$|+5|\\gt|-3|$，取正，$5-3=2$，结果 $+2$',
            'warm'
          );
          P.renderCard(
            '<b>法则三（特殊）</b><br>' +
            '· 互为相反数的两个数相加，得 $0$<br>' +
            '· 一个数与 $0$ 相加，仍得这个数',
            'teal'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
      // Step 3："两步走"口诀 + 口答两题
      {
        narration: '法则三条，浓缩成"两步走"口诀。第一步：看符号，同号还是异号？第二步：定结果，取什么符号，算什么绝对值。现在用口诀口答两道题——(-7)+(-5)等于多少？同号，取负，7+5=12，结果-12！再来：(-6)+10等于多少？异号，|10|>|-6|，取正，10-6=4，结果+4！',
        enter: function (anim) {
          S.actor('s3-slogan-t', 0, 7.0, '<b>"两步走"口诀</b>', { color: TEAL, size: 20 });
          S.actor('s3-step1', 0, 5.5, '<b>第一步：</b>看符号——同号还是异号？', { color: COOL, size: 17 });
          S.actor('s3-step2', 0, 4.2, '<b>第二步：</b>定结果——取什么符号，算什么绝对值', { color: WARM, size: 17 });
          S.addSegment('s3-div', [-8, 3.2], [8, 3.2], { color: INK, width: 1.5, dash: 2 });
          S.actor('s3-q1', -4, 2.2, '口答①：$(-7)+(-5)=?$', { color: INK, size: 16 });
          S.actor('s3-a1', 4, 2.2, '同号取负，$7+5=12$，<b>结果 $-12$</b>', { color: GREEN, size: 15 });
          S.actor('s3-q2', -4, 0.8, '口答②：$(-6)+10=?$', { color: INK, size: 16 });
          S.actor('s3-a2', 4, 0.8, '异号，$|10|\\gt|-6|$，取正，$10-6=4$，<b>结果 $+4$</b>', { color: GREEN, size: 15 });
          P.renderCard(
            '<b>"两步走"口诀</b><br>' +
            '第一步：<b>看符号</b>（同号 / 异号）<br>' +
            '第二步：<b>定结果</b>（符号 + 绝对值）<br>' +
            '① $(-7)+(-5) = -12$　② $(-6)+10 = +4$',
            'teal',
            'tada'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
