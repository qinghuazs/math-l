(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数
  var AXIS_Y = 1.0;
  var UNIT = 2.0; // 1 数学单位 = 2 画面单位
  function tx(n) { return n * UNIT; }

  // 画数轴辅助（只画一次，后续步骤复用）
  function drawAxis(stage) {
    S.addSegment('s4-axis', [tx(-0.5) - 0.2, AXIS_Y], [tx(4) + 0.3, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    S.addSegment('s4-arr1', [tx(4) + 0.1, AXIS_Y + 0.15], [tx(4) + 0.4, AXIS_Y],
      { color: INK, width: 2, dash: 0 });
    S.addSegment('s4-arr2', [tx(4) + 0.1, AXIS_Y - 0.15], [tx(4) + 0.4, AXIS_Y],
      { color: INK, width: 2, dash: 0 });

    for (var n = 0; n <= 3; n++) {
      S.addSegment('s4-tick-' + n, [tx(n), AXIS_Y - 0.18], [tx(n), AXIS_Y + 0.18],
        { color: INK, width: 2, dash: 0 });
      S.addText('s4-tlab-' + n, tx(n) - 0.1, AXIS_Y - 0.5, '' + n,
        { color: INK, size: 14 });
    }
  }

  var SQRT2 = Math.sqrt(2); // ≈ 1.414

  var scene = {
    id: 's4',
    title: '四、实数大小比较',
    bbox: [-1.5, 7, 9, -3],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：数轴比较法原理 + 比较 √2 与 1.5
      {
        narration: '比较实数大小有个简单原则：在数轴上，右边的数总比左边的数大！这叫做数轴比较法。现在来比较根号2和1.5。根号2大约等于1.414，而1.5在它右边一点。所以，根号2 小于 1.5。',
        enter: function (anim) {
          drawAxis(S);

          // 数轴上标出 √2 和 1.5
          var x_sqrt2 = tx(SQRT2); // ≈ 2.828
          var x_15 = tx(1.5);      // = 3.0

          S.dropPoint('s4-pt-sqrt2', x_sqrt2, AXIS_Y, { color: WARM, size: 5, animate: !!anim });
          S.addText('s4-lab-sqrt2', x_sqrt2 - 0.28, AXIS_Y + 0.55,
            '$\\sqrt{2}$', { color: WARM, size: 16 });
          S.addText('s4-val-sqrt2', x_sqrt2 - 0.42, AXIS_Y - 0.65,
            '$\\approx 1.414$', { color: WARM, size: 12 });

          S.dropPoint('s4-pt-15', x_15, AXIS_Y, { color: COOL, size: 5, animate: !!anim });
          S.addText('s4-lab-15', x_15 - 0.15, AXIS_Y + 0.55, '$1.5$', { color: COOL, size: 16 });

          // 右大于左箭头提示
          S.addText('s4-rule', -1.2, 6.5, '【数轴比较法】', { color: TEAL, size: 18 });
          S.addText('s4-rule2', -1.2, 5.8,
            '右边的数 $\\gt$ 左边的数', { color: INK, size: 16 });

          // 比较结论
          S.addText('s4-cmp1', -1.2, 4.9,
            '例1：比较 $\\sqrt{2}$ 与 $1.5$', { color: INK, size: 15 });
          S.addText('s4-cmp2', -1.2, 4.2,
            '$\\sqrt{2} \\approx 1.414 \\lt 1.5$', { color: WARM, size: 17 });
          S.addText('s4-cmp3', -1.2, 3.5,
            '$\\therefore \\sqrt{2} \\lt 1.5$', { color: WARM, size: 17 });

          // 箭头示意（指向 1.5 在 √2 右边）
          S.addSegment('s4-arrow', [x_sqrt2 + 0.15, AXIS_Y + 0.25], [x_15 - 0.15, AXIS_Y + 0.25],
            { color: TEAL, width: 2.5, dash: 0 });
          S.addText('s4-arrow-lab', (x_sqrt2 + x_15) / 2 - 0.35, AXIS_Y + 0.6,
            '右边更大', { color: TEAL, size: 12 });

          P.renderCard(
            '<b>数轴比较法：右大左小</b><br>' +
            '例1：比较 $\\sqrt{2}$ 与 $1.5$<br>' +
            '$\\sqrt{2} \\approx 1.414$，$1.5$ 在数轴上更靠右<br>' +
            '$\\therefore \\sqrt{2} \\lt 1.5$'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：负数比较——比较 -√2 与 -1.5
      {
        narration: '负数怎么比较？我们来看 负根号2 和 负1.5。绝对值大的负数反而更小！负根号2 约等于 负1.414，它在数轴上比 负1.5 更靠右，所以 负根号2 大于 负1.5。记住：负数比较，绝对值越大越小！',
        enter: function (anim) {
          // 扩展数轴到负数区域
          S.remove('s4-axis');
          S.remove('s4-arr1');
          S.remove('s4-arr2');
          for (var n = 0; n <= 3; n++) {
            S.remove('s4-tick-' + n);
            S.remove('s4-tlab-' + n);
          }

          // 重画更大范围数轴
          S.addSegment('s4-axis2', [tx(-2.5) - 0.2, AXIS_Y], [tx(3) + 0.3, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          S.addSegment('s4-arr2a', [tx(3) + 0.1, AXIS_Y + 0.15], [tx(3) + 0.4, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr2b', [tx(3) + 0.1, AXIS_Y - 0.15], [tx(3) + 0.4, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr2c', [tx(-2.5) - 0.0, AXIS_Y + 0.15], [tx(-2.5) - 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr2d', [tx(-2.5) - 0.0, AXIS_Y - 0.15], [tx(-2.5) - 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          for (var m = -2; m <= 2; m++) {
            S.addSegment('s4-tick2-' + (m + 5), [tx(m), AXIS_Y - 0.18], [tx(m), AXIS_Y + 0.18],
              { color: INK, width: 2, dash: 0 });
            if (m !== 0) {
              S.addText('s4-tlab2-' + (m + 5), tx(m) - 0.1, AXIS_Y - 0.5, '' + m,
                { color: INK, size: 14 });
            }
          }
          S.addText('s4-tlab2-0', tx(0) - 0.08, AXIS_Y - 0.5, '0', { color: INK, size: 14 });

          // 标 -√2 和 -1.5
          var x_nsqrt2 = tx(-SQRT2); // ≈ -2.828
          var x_n15 = tx(-1.5);      // = -3.0

          S.dropPoint('s4-pt-nsqrt2', x_nsqrt2, AXIS_Y,
            { color: WARM, size: 5, animate: !!anim });
          S.addText('s4-lab-nsqrt2', x_nsqrt2 - 0.45, AXIS_Y + 0.55,
            '$-\\sqrt{2}$', { color: WARM, size: 16 });
          S.addText('s4-val-nsqrt2', x_nsqrt2 - 0.55, AXIS_Y - 0.65,
            '$\\approx -1.414$', { color: WARM, size: 12 });

          S.dropPoint('s4-pt-n15', x_n15, AXIS_Y,
            { color: COOL, size: 5, animate: !!anim });
          S.addText('s4-lab-n15', x_n15 - 0.2, AXIS_Y + 0.55, '$-1.5$', { color: COOL, size: 16 });

          // 说明：-√2 在 -1.5 右边
          S.addText('s4-neg1', -1.2, 4.9,
            '例2：比较 $-\\sqrt{2}$ 与 $-1.5$', { color: INK, size: 15 });
          S.addText('s4-neg2', -1.2, 4.2,
            '$-\\sqrt{2} \\approx -1.414 \\gt -1.5$', { color: WARM, size: 16 });
          S.addText('s4-neg3', -1.2, 3.5,
            '$\\therefore -\\sqrt{2} \\gt -1.5$', { color: WARM, size: 16 });
          S.addText('s4-neg4', -1.2, 2.8,
            '负数：绝对值越大，越小！', { color: TEAL, size: 15 });

          P.renderCard(
            '<b>负数比较——绝对值越大越小</b><br>' +
            '例2：比较 $-\\sqrt{2}$ 与 $-1.5$<br>' +
            '$-\\sqrt{2} \\approx -1.414$，在数轴上比 $-1.5$ 更靠右<br>' +
            '$\\therefore -\\sqrt{2} \\gt -1.5$<br>' +
            '规律：负数的绝对值越大，这个数本身越小。'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：估值比较法（作差法/平方比较）
      {
        narration: '有时候不用数轴，可以用"估值法"直接比较。例如：比较 根号7 和 2.5。因为它们都是正数，可以平方比较：根号7的平方等于7，2.5的平方等于6.25，7大于6.25，所以根号7大于2.5。再比如：根号8和根号10，被开方数8小于10，所以根号8小于根号10。',
        enter: function (anim) {
          // 清空画板上的数轴相关内容，用文字演算模式
          // 左侧演算区
          S.addText('s4-calc-title', -1.2, 6.5, '【估值/平方比较法】', { color: TEAL, size: 17 });

          // 例1：√7 vs 2.5
          S.addText('s4-ex1-t', -1.2, 5.7, '例3：比较 $\\sqrt{7}$ 与 $2.5$', { color: INK, size: 15 });
          S.addText('s4-ex1-1', -1.2, 5.0,
            '$\\because (\\sqrt{7})^2 = 7$', { color: COOL, size: 15 });
          S.addText('s4-ex1-2', -1.2, 4.3,
            '$2.5^2 = 6.25$', { color: COOL, size: 15 });
          S.addText('s4-ex1-3', -1.2, 3.6,
            '$7 \\gt 6.25$', { color: COOL, size: 15 });
          S.addText('s4-ex1-4', -1.2, 2.9,
            '$\\therefore \\sqrt{7} \\gt 2.5$', { color: WARM, size: 17 });

          // 例2：√8 vs √10（同根比较）
          S.addText('s4-ex2-t', 4.5, 5.7, '例4：比较 $\\sqrt{8}$ 与 $\\sqrt{10}$', { color: INK, size: 15 });
          S.addText('s4-ex2-1', 4.5, 5.0,
            '$\\because 8 \\lt 10$', { color: PURPLE, size: 15 });
          S.addText('s4-ex2-2', 4.5, 4.3,
            '被开方数越大，', { color: PURPLE, size: 15 });
          S.addText('s4-ex2-3', 4.5, 3.7,
            '算术平方根越大', { color: PURPLE, size: 15 });
          S.addText('s4-ex2-4', 4.5, 2.9,
            '$\\therefore \\sqrt{8} \\lt \\sqrt{10}$', { color: WARM, size: 17 });

          P.renderCard(
            '<b>估值/平方比较法</b><br>' +
            '例3：$\\sqrt{7}$ vs $2.5$<br>' +
            '$(\\sqrt{7})^2 = 7 \\gt 6.25 = 2.5^2$<br>' +
            '$\\therefore \\sqrt{7} \\gt 2.5$<br><br>' +
            '例4：$\\sqrt{8}$ vs $\\sqrt{10}$<br>' +
            '$8 \\lt 10 \\Rightarrow \\sqrt{8} \\lt \\sqrt{10}$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：综合练习题演算卡
      {
        narration: '好，我们来做几道课堂练习。同学们先想一想，然后看答案。第一题：根号5和2比较——2的平方等于4，4小于5，所以根号5大于2。第二题：根号8和3——3的平方等于9，9大于8，所以根号8小于3。第三题：负根号3和负1——绝对值根号3大于1，所以负根号3小于负1。第四题：根号11和3.5——3.5平方等于12.25，大于11，所以根号11小于3.5。',
        enter: function (anim) {
          S.addText('s4-prac-t', -1.2, 6.5, '【课堂练习】比较大小', { color: TEAL, size: 17 });

          var exercises = [
            { q: '$\\sqrt{5}$ 与 $2$',      a: '$\\sqrt{5} \\gt 2$',       hint: '$2^2=4 \\lt 5$' },
            { q: '$\\sqrt{8}$ 与 $3$',      a: '$\\sqrt{8} \\lt 3$',       hint: '$3^2=9 \\gt 8$' },
            { q: '$-\\sqrt{3}$ 与 $-1$',    a: '$-\\sqrt{3} \\lt -1$',     hint: '$\\sqrt{3}\\gt1$，负数反向' },
            { q: '$\\sqrt{11}$ 与 $3.5$',   a: '$\\sqrt{11} \\lt 3.5$',    hint: '$3.5^2=12.25\\gt11$' },
          ];

          for (var i = 0; i < exercises.length; i++) {
            var e = exercises[i];
            var col = (i < 2) ? -1.2 : 4.5;
            var row = (i % 2 === 0) ? 5.5 : 3.0;
            S.addText('s4-q-' + i, col, row, '比较：' + e.q, { color: INK, size: 14 });
            S.addText('s4-h-' + i, col, row - 0.65, e.hint, { color: GRAY, size: 13 });
            S.addText('s4-a-' + i, col, row - 1.3, e.a, { color: WARM, size: 16 });
          }

          P.renderTable({
            head: ['题目', '方法', '答案'],
            rows: [
              ['$\\sqrt{5}$ 与 $2$',     '$2^2=4 \\lt 5$',          '$\\sqrt{5} \\gt 2$'],
              ['$\\sqrt{8}$ 与 $3$',     '$3^2=9 \\gt 8$',          '$\\sqrt{8} \\lt 3$'],
              ['$-\\sqrt{3}$ 与 $-1$',   '$\\sqrt{3}\\gt 1$，反号', '$-\\sqrt{3} \\lt -1$'],
              ['$\\sqrt{11}$ 与 $3.5$',  '$3.5^2=12.25\\gt 11$',    '$\\sqrt{11} \\lt 3.5$'],
            ],
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
