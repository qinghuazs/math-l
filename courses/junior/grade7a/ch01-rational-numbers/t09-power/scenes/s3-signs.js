// s3-signs.js  三、符号规律奇负偶正（3步）
// 数学验算：
//   (-2)^1 = -2
//   (-2)^2 = (-2)×(-2) = 4
//   (-2)^3 = 4×(-2) = -8
//   (-2)^4 = (-8)×(-2) = 16
//   (-2)^5 = 16×(-2) = -32
//   (-2)^6 = (-32)×(-2) = 64
//   (-1)^2026：2026偶数 → 1；(-1)^2025：2025奇数 → -1
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 表格数据
  var ROWS = [
    { n: 1, expand: '$(-2)$',                         result: '$-2$',  sign: '负', neg: true  },
    { n: 2, expand: '$(-2) \\times (-2)$',             result: '$4$',   sign: '正', neg: false },
    { n: 3, expand: '$(-2)\\times(-2)\\times(-2)$',    result: '$-8$',  sign: '负', neg: true  },
    { n: 4, expand: '（四个 $-2$ 连乘）',               result: '$16$',  sign: '正', neg: false },
    { n: 5, expand: '（五个 $-2$ 连乘）',               result: '$-32$', sign: '负', neg: true  },
    { n: 6, expand: '（六个 $-2$ 连乘）',               result: '$64$',  sign: '正', neg: false }
  ];

  // 闭包变量
  var rowsPushed = 0;

  var scene = {
    id: 's3',
    title: '三、符号规律奇负偶正',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      rowsPushed = 0;
    },
    steps: [
      // Step 1：逐行弹入 (-2)^n 计算表，颜色标负红/正绿
      {
        narration: '我们来做一个"列表实验"，依次计算负2的1次方到6次方，观察结果的正负有什么规律。现在逐行揭开：负2的1次方是负2；2次方是正4；3次方是负8……你发现规律了吗？',
        enter: function (anim) {
          P.renderTable({
            head: ['$n$', '展开', '结果', '正/负'],
            rows: [],
            popRow: false
          });

          if (!anim) {
            // 快放：一次性推入全部行
            var allRows = [];
            for (var i = 0; i < ROWS.length; i++) {
              var r = ROWS[i];
              var cls = r.neg ? 'color:' + RED + ';font-weight:bold' : 'color:' + GREEN + ';font-weight:bold';
              allRows.push([
                '<b>' + r.n + '</b>',
                r.expand,
                '<span style="' + cls + '">' + r.result + '</span>',
                '<span style="' + cls + '">' + r.sign + '</span>'
              ]);
            }
            P.renderTable({ head: ['$n$', '展开', '结果', '正/负'], rows: allRows, popRow: false });
            rowsPushed = ROWS.length;
            return Promise.resolve();
          }

          // 动画：逐行 popRow
          var idx = 0;
          function pushNext() {
            if (idx >= ROWS.length) {
              rowsPushed = ROWS.length;
              return Promise.resolve();
            }
            var r = ROWS[idx];
            var cls = r.neg ? 'color:' + RED + ';font-weight:bold' : 'color:' + GREEN + ';font-weight:bold';
            P.renderTable({
              head: ['$n$', '展开', '结果', '正/负'],
              rows: [[
                '<b>' + r.n + '</b>',
                r.expand,
                '<span style="' + cls + '">' + r.result + '</span>',
                '<span style="' + cls + '">' + r.sign + '</span>'
              ]],
              popRow: true
            });
            idx++;
            rowsPushed = idx;
            return delay(500).then(pushNext);
          }
          return pushNext();
        },
      },

      // Step 2：规律归纳
      {
        narration: '规律出来了！负数的奇次幂是负数，偶次幂是正数——这叫"奇负偶正"。正数的任何正整数次幂都是正数，0的正整数次幂是0。记不住规律就展开连乘，符号一对一消，一定正确。',
        enter: function (anim) {
          S.actor('s3-rule-title', 0, 7.0, '<b>符号规律：奇负偶正</b>', { color: COOL, size: 21 });

          S.actor('s3-neg', 0, 5.2,
            '负数的<b>奇</b>次幂 → <b>负数</b>　　$(-a)^{n} \\lt 0$（$a\\gt0$，$n$ 为奇数）',
            { color: RED, size: 18 });
          S.actor('s3-pos', 0, 3.5,
            '负数的<b>偶</b>次幂 → <b>正数</b>　　$(-a)^{n} \\gt 0$（$a\\gt0$，$n$ 为偶数）',
            { color: GREEN, size: 18 });

          S.addSegment('s3-div1', [-8, 2.5], [8, 2.5], { color: INK, width: 1, dash: 1 });

          S.actor('s3-pos2', 0, 1.5,
            '正数的任何正整数次幂 → <b>正数</b>',
            { color: TEAL, size: 16 });
          S.actor('s3-zero', 0, 0.2,
            '$0$ 的正整数次幂 → $0$',
            { color: TEAL, size: 16 });

          S.actor('s3-tip', 0, -1.8,
            '记不住规律？就老实展开连乘，符号一对一消！',
            { color: ORANGE, size: 15 });

          P.renderCard(
            '<b>奇负偶正口诀</b><br>' +
            '负数 · 奇次幂 → 负（如 $(-2)^{3}=-8$）<br>' +
            '负数 · 偶次幂 → 正（如 $(-2)^{4}=16$）<br>' +
            '正数任何次幂 → 正；$0$ 的正整数次幂 → $0$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：年份题巩固
      {
        narration: '来用规律做两道年份题。(-1) 的 2026 次方，2026 是偶数，偶次幂为正，所以等于 1。(-1) 的 2025 次方，2025 是奇数，奇次幂为负，所以等于 负1。只要判断指数奇偶，就能秒出答案！',
        enter: function (anim) {
          S.remove('s3-rule-title'); S.remove('s3-neg'); S.remove('s3-pos');
          S.remove('s3-div1'); S.remove('s3-pos2'); S.remove('s3-zero'); S.remove('s3-tip');

          S.actor('s3-yr-title', 0, 7.0, '<b>年份题快判</b>', { color: WARM, size: 21 });

          S.actor('s3-y1-q', 0, 5.2,
            '$(-1)^{2026} = $ 【？】',
            { color: INK, size: 20 });
          S.actor('s3-y1-key', -3, 3.7,
            '$2026$ 是<b>偶数</b>',
            { color: COOL, size: 16 });
          S.actor('s3-y1-a', 3, 3.7,
            '→ 偶次幂为正 → $= 1$',
            { color: GREEN, size: 16 });

          S.addSegment('s3-ydiv', [-8, 2.8], [8, 2.8], { color: INK, width: 1, dash: 1 });

          S.actor('s3-y2-q', 0, 2.0,
            '$(-1)^{2025} = $ 【？】',
            { color: INK, size: 20 });
          S.actor('s3-y2-key', -3, 0.5,
            '$2025$ 是<b>奇数</b>',
            { color: WARM, size: 16 });
          S.actor('s3-y2-a', 3, 0.5,
            '→ 奇次幂为负 → $= -1$',
            { color: RED, size: 16 });

          S.actor('s3-ysumm', 0, -2.0,
            '口诀：看指数——奇数 → 负；偶数 → 正',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>年份题秒杀技</b><br>' +
            '$(-1)^{2026}$：$2026$ 偶 → 正 → $\\mathbf{1}$<br>' +
            '$(-1)^{2025}$：$2025$ 奇 → 负 → $\\mathbf{-1}$<br>' +
            '只需判断指数的奇偶性！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
