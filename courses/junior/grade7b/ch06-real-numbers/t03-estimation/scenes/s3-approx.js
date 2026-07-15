(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、近似值与计算器',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：常用近似值说明
      {
        narration: '通过夹逼法，我们可以把 √2 估算到任意精度。在实际中，通常只需要精确到千分位就够了：√2 约等于 1.414。这个值非常常用，建议大家记住。同样常用的还有 √3 约等于 1.732，√5 约等于 2.236。',
        enter: function (anim) {
          // 展示三个常用近似值（大字）
          S.addText('s3-t1', -8.5, 5.8, '$\\sqrt{2} \\approx 1.414$', { color: WARM, size: 28 });
          S.addText('s3-t2', -8.5, 3.6, '$\\sqrt{3} \\approx 1.732$', { color: COOL, size: 28 });
          S.addText('s3-t3', -8.5, 1.4, '$\\sqrt{5} \\approx 2.236$', { color: TEAL, size: 28 });

          // 记忆提示
          S.addText('s3-tip1', 1.0, 5.8, '← 常用！记住它', { color: WARM, size: 16 });
          S.addText('s3-tip2', 1.0, 3.6, '← 60° 三角形用到', { color: COOL, size: 16 });
          S.addText('s3-tip3', 1.0, 1.4, '← 斐波那契比值', { color: TEAL, size: 16 });

          P.renderCard(
            '<b>常用平方根近似值（精确到千分位）</b><br>' +
            '$\\sqrt{2} \\approx 1.414$<br>' +
            '$\\sqrt{3} \\approx 1.732$<br>' +
            '$\\sqrt{5} \\approx 2.236$<br>' +
            '建议记住 $\\sqrt{2} \\approx 1.414$！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：近似值表（renderTable）
      {
        narration: '我们用一张表格来整理常见平方根的近似值。请大家看表格：被开方数、精确到十分位的近似值、精确到百分位的近似值、精确到千分位的近似值。同学们可以用夹逼法验证其中任何一个！',
        enter: function (anim) {
          P.renderTable({
            head: ['被开方数', '约（十分位）', '约（百分位）', '约（千分位）'],
            rows: [
              ['$\\sqrt{2}$', '$1.4$', '$1.41$', '$1.414$'],
              ['$\\sqrt{3}$', '$1.7$', '$1.73$', '$1.732$'],
              ['$\\sqrt{5}$', '$2.2$', '$2.24$', '$2.236$'],
              ['$\\sqrt{6}$', '$2.4$', '$2.45$', '$2.449$'],
              ['$\\sqrt{7}$', '$2.6$', '$2.65$', '$2.646$'],
              ['$\\sqrt{10}$', '$3.2$', '$3.16$', '$3.162$'],
            ],
          });

          // 画面上提示如何查表
          S.addText('s3-hint', -8.5, 5.0, '常用平方根近似值表', { color: COOL, size: 22 });
          S.addText('s3-h1',   -8.5, 3.5, '精度越高，区间越窄', { color: INK, size: 16 });
          S.addText('s3-h2',   -8.5, 2.5, '夹逼法可验证每一行', { color: INK, size: 16 });
          S.addText('s3-h3',   -8.5, 1.2, '实际取精度视题意而定', { color: WARM, size: 15 });

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：计算器使用说明卡
      {
        narration: '当然，现实中我们有计算器。计算器上有一个专门的平方根键，通常标记为 √ 或 SQRT。输入数字，按下这个键，就能得到高精度近似值。不过在考试中，大家要会用夹逼法手算估算，这是最基本的技能。',
        enter: function (anim) {
          // 计算器按键示意图（文字排版）
          S.addText('s3-calc-title', -8.5, 6.0, '【计算器操作】', { color: TEAL, size: 20 });
          S.addText('s3-calc-1', -8.5, 4.8, '① 输入被开方数（如 2）',        { color: INK, size: 17 });
          S.addText('s3-calc-2', -8.5, 3.6, '② 按 √ 键（或 SQRT 键）',       { color: INK, size: 17 });
          S.addText('s3-calc-3', -8.5, 2.4, '③ 屏幕显示：1.41421356…',       { color: WARM, size: 17 });
          S.addText('s3-calc-4', -8.5, 1.0, '④ 按精度要求四舍五入',           { color: INK, size: 17 });

          // 示例框
          S.addText('s3-ex-label', -8.5, -0.6, '例：计算器求 $\\sqrt{5}$',   { color: COOL, size: 16 });
          S.addText('s3-ex-val',   -8.5, -1.8, '→  2.2360679… ≈ 2.236',     { color: WARM, size: 16 });

          P.renderCard(
            '<b>计算器求平方根</b><br>' +
            '① 输入数字 → ② 按 $\\sqrt{\\ }$ 键 → ③ 读取结果 → ④ 按需取近似值<br>' +
            '<br>' +
            '注意：考试手算时，<b>必须用夹逼法</b>，不能只写结果！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
