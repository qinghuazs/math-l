// s6-summary.js  环节六：易错辨析与小结（4步）
// 对应教学设计环节六：易错辨析 + 课堂小结
// 数学验算（5道辨析）：
//   ①0是正整数？错。0是整数但既不正也不负，单独一类。
//   ②-3.9是负整数？错。-3.9=-39/10，是负分数不是整数。
//   ③非负数就是正数？错。非负数=正数+0，0也是非负数。
//   ④自然数=正整数？错。自然数=正整数+0，0是自然数但不是正整数。
//   ⑤0.1是有理数因为它是整数？错。0.1=1/10是分数；但它确实是有理数（分数也是有理数）。
//   填空答案：① 0/负分数 ② 有理数 ③ 分数 ④ 正有理数/0/负有理数 ⑤ 正数/负数 ⑥ 不重不漏
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与小结',
    bbox: [-10, 8, 10, -5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：4道辨析逐一判错
      {
        narration: '最后做几道辨析题，这些都是同学们最容易犯错的地方，请快速判断。第一题：0 是正整数——错！0 是整数，但既不是正整数也不是负整数，它是单独一类。第二题：-3.9 是负整数——错！-3.9 等于负十分之三十九，它是负分数，不是整数。第三题：非负数就是正数——错！非负数等于正数加 0，0 也是非负数。第四题：自然数和正整数是一回事——错！初中阶段，自然数包括 0 和所有正整数，0 是自然数但不是正整数。',
        enter: function (anim) {
          // 辨析1
          S.actor('s6-q1', 0, 7.0, '① $0$ 是正整数', { color: INK, size: 17 });
          S.actor('s6-a1', 0, 6.0, '✗ 错：$0$ 是整数，既不正也不负，单独一类', { color: WARM, size: 15 });

          S.addSegment('s6-sep1', [-9, 5.4], [9, 5.4], { color: GRAY, width: 1, dash: 1 });

          // 辨析2
          S.actor('s6-q2', 0, 4.8, '② $-3.9$ 是负整数', { color: INK, size: 17 });
          S.actor('s6-a2', 0, 3.8, '✗ 错：$-3.9 = -\\dfrac{39}{10}$ 是负分数', { color: WARM, size: 15 });

          S.addSegment('s6-sep2', [-9, 3.2], [9, 3.2], { color: GRAY, width: 1, dash: 1 });

          // 辨析3
          S.actor('s6-q3', 0, 2.6, '③ 非负数就是正数', { color: INK, size: 17 });
          S.actor('s6-a3', 0, 1.6, '✗ 错：非负数 = 正数 + $0$，$0$ 也是非负数', { color: WARM, size: 15 });

          S.addSegment('s6-sep3', [-9, 1.0], [9, 1.0], { color: GRAY, width: 1, dash: 1 });

          // 辨析4
          S.actor('s6-q4', 0, 0.4, '④ 自然数和正整数是一回事', { color: INK, size: 17 });
          S.actor('s6-a4', 0, -0.6, '✗ 错：自然数 = 正整数 + $0$（$0$ 是自然数但不是正整数）', { color: WARM, size: 15 });

          P.renderCard(
            '<b>4道辨析——全都是错误说法！</b><br>' +
            '① $0$ 不是正整数；<br>' +
            '② $-3.9$ 是负分数，不是负整数；<br>' +
            '③ 非负数包含 $0$；<br>' +
            '④ 自然数包含 $0$，正整数不含 $0$。',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      },

      // Step 2：填空小结
      {
        narration: '现在来做填空小结，把这节课学到的核心内容串一遍！',
        enter: function (anim) {
          // 清掉辨析
          S.remove('s6-q1'); S.remove('s6-a1'); S.remove('s6-sep1');
          S.remove('s6-q2'); S.remove('s6-a2'); S.remove('s6-sep2');
          S.remove('s6-q3'); S.remove('s6-a3'); S.remove('s6-sep3');
          S.remove('s6-q4'); S.remove('s6-a4');

          S.actor('s6-fill-title', 0, 7.5, '填空小结', { color: TEAL, size: 22, bold: true });

          S.actor('s6-f1-q', 0, 6.2,
            '① 正整数、【？】和负整数统称整数；正分数和【？】统称分数。',
            { color: INK, size: 15 });
          S.actor('s6-f1-a', 0, 5.4,
            '→ $0$；负分数',
            { color: GREEN, size: 14 });

          S.actor('s6-f2-q', 0, 4.4,
            '② 整数和分数统称【？】。',
            { color: INK, size: 15 });
          S.actor('s6-f2-a', 0, 3.6,
            '→ 有理数',
            { color: GREEN, size: 14 });

          S.actor('s6-f3-q', 0, 2.6,
            '③ 有限小数和无限循环小数都能化为【？】，因此也是有理数。',
            { color: INK, size: 15 });
          S.actor('s6-f3-a', 0, 1.8,
            '→ 分数',
            { color: GREEN, size: 14 });

          S.actor('s6-f4-q', 0, 0.8,
            '④ 按符号分类：有理数分为【？】、【？】和【？】三类。',
            { color: INK, size: 15 });
          S.actor('s6-f4-a', 0, 0.0,
            '→ 正有理数、$0$、负有理数',
            { color: GREEN, size: 14 });

          S.actor('s6-f5-q', 0, -1.2,
            '⑤ "非负数"是【？】和 $0$ 的合称；$0$ 既不是正数也不是【？】。',
            { color: INK, size: 15 });
          S.actor('s6-f5-a', 0, -2.0,
            '→ 正数；负数',
            { color: GREEN, size: 14 });

          S.actor('s6-f6-q', 0, -3.2,
            '⑥ 分类要做到【？】（四个字）。',
            { color: INK, size: 15 });
          S.actor('s6-f6-a', 0, -4.0,
            '→ 不重不漏',
            { color: WARM, size: 16, bold: true });

          P.renderCard(
            '<b>填空答案</b><br>' +
            '① $0$；负分数<br>' +
            '② 有理数<br>' +
            '③ 分数<br>' +
            '④ 正有理数、$0$、负有理数<br>' +
            '⑤ 正数；负数<br>' +
            '⑥ 不重不漏'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 3：知识树卡片
      {
        narration: '最后来看这节课完整的知识结构树。有理数分两大支：整数（正整数、0、负整数）和分数（正分数、负分数）。同时，可以按符号分成正有理数、0、负有理数三类。有限小数和无限循环小数都是分数的"化装"，同样是有理数。分类原则：不重不漏！',
        enter: function (anim) {
          // 清掉填空
          S.remove('s6-fill-title');
          S.remove('s6-f1-q'); S.remove('s6-f1-a');
          S.remove('s6-f2-q'); S.remove('s6-f2-a');
          S.remove('s6-f3-q'); S.remove('s6-f3-a');
          S.remove('s6-f4-q'); S.remove('s6-f4-a');
          S.remove('s6-f5-q'); S.remove('s6-f5-a');
          S.remove('s6-f6-q'); S.remove('s6-f6-a');

          S.actor('s6-tree-title', 0, 7.5, '有理数知识结构树', { color: TEAL, size: 22, bold: true });

          // 根
          S.actor('s6-root', 0, 6.2, '有 理 数', { color: TEAL, size: 20, bold: true });
          S.addSegment('s6-rt-li', [-3, 5.9], [-5, 5.3], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s6-rt-rf', [3, 5.9], [5, 5.3], { color: GREEN, width: 2, dash: 0 });

          // 整数枝
          S.actor('s6-int',  -5, 5.0, '整 数', { color: COOL, size: 18, bold: true });
          S.addSegment('s6-i-pi', [-6.5, 4.7], [-7.5, 4.0], { color: COOL, width: 1.5, dash: 0 });
          S.addSegment('s6-i-0',  [-5.0, 4.7], [-5.0, 4.0], { color: INK,  width: 1.5, dash: 0 });
          S.addSegment('s6-i-ni', [-3.5, 4.7], [-2.5, 4.0], { color: WARM, width: 1.5, dash: 0 });
          S.actor('s6-posint', -7.5, 3.7, '正整数', { color: COOL, size: 14 });
          S.actor('s6-zero',   -5.0, 3.7, '$0$',    { color: INK,  size: 14, bold: true });
          S.actor('s6-negint', -2.5, 3.7, '负整数', { color: WARM, size: 14 });
          S.actor('s6-ex-pi',  -7.5, 2.9, '$15,128$', { color: COOL, size: 12 });
          S.actor('s6-ex-ni',  -2.5, 2.9, '$-10,-80$', { color: WARM, size: 12 });

          // 分数枝
          S.actor('s6-frac',  5, 5.0, '分 数', { color: GREEN, size: 18, bold: true });
          S.addSegment('s6-f-pf', [4.0, 4.7], [3.2, 4.0], { color: GREEN, width: 1.5, dash: 0 });
          S.addSegment('s6-f-nf', [6.0, 4.7], [6.8, 4.0], { color: WARM,  width: 1.5, dash: 0 });
          S.actor('s6-posfrac', 3.2, 3.7, '正分数', { color: GREEN, size: 14 });
          S.actor('s6-negfrac', 6.8, 3.7, '负分数', { color: WARM,  size: 14 });
          S.actor('s6-ex-pf',   3.2, 2.9, '$\\dfrac{4}{5},0.1$', { color: GREEN, size: 12 });
          S.actor('s6-ex-nf',   6.8, 2.9, '$-\\dfrac{2}{3},-3.9$', { color: WARM, size: 11 });

          // 分类原则
          S.addSegment('s6-sep-b', [-9, 2.0], [9, 2.0], { color: GRAY, width: 1, dash: 1 });
          S.actor('s6-prin', 0, 1.3, '分类原则：', { color: INK, size: 16 });
          S.actor('s6-prin2', 0, 0.3, '不 重 不 漏', { color: WARM, size: 22, bold: true });

          P.renderCard(
            '<b>有理数知识树</b><br>' +
            '整数：正整数 / $0$ / 负整数<br>' +
            '分数：正分数 / 负分数<br>' +
            '（小数 = 分数的"化装"）<br>' +
            '按符号：正有理数 / $0$ / 负有理数<br>' +
            '<b>分类原则：不重不漏！</b>',
            'teal'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 4：悬念——数轴
      {
        narration: '这节课我们认识了有理数及其两种分类方式。现在有一个有趣的问题留给大家思考：这么多有理数，正的、负的、大的、小的，能不能给它们每人安排一个"座位"，让所有的有理数都有自己的位置、永不重叠？下节课，我们来认识一件神奇的工具——数轴，它能让每一个有理数都找到自己专属的座位！',
        enter: function (anim) {
          // 清掉知识树
          S.remove('s6-tree-title'); S.remove('s6-root');
          S.remove('s6-rt-li'); S.remove('s6-rt-rf');
          S.remove('s6-int'); S.remove('s6-frac');
          S.remove('s6-i-pi'); S.remove('s6-i-0'); S.remove('s6-i-ni');
          S.remove('s6-f-pf'); S.remove('s6-f-nf');
          S.remove('s6-posint'); S.remove('s6-zero'); S.remove('s6-negint');
          S.remove('s6-posfrac'); S.remove('s6-negfrac');
          S.remove('s6-ex-pi'); S.remove('s6-ex-ni');
          S.remove('s6-ex-pf'); S.remove('s6-ex-nf');
          S.remove('s6-sep-b'); S.remove('s6-prin'); S.remove('s6-prin2');

          // 悬念画面：一排省略号 + 问号 + 数轴预告
          S.actor('s6-sus1', 0, 6.5,
            '这么多有理数……',
            { color: INK, size: 20 });
          S.actor('s6-sus2', 0, 5.0,
            '$\\cdots, -80, -10, -\\dfrac{2}{3}, -3.9, 0, 0.1, \\dfrac{4}{5}, 15, 128, \\cdots$',
            { color: COOL, size: 16 });
          S.actor('s6-sus3', 0, 3.5,
            '能给它们每人安排一个"座位"吗？',
            { color: TEAL, size: 18, bold: true });
          S.actor('s6-sus4', 0, 2.2,
            '让每个数都有自己的位置，永不重叠？',
            { color: TEAL, size: 17 });

          S.addSegment('s6-axis-pre', [-8, 0.5], [8, 0.5],
            { color: INK, width: 3, dash: 0 });
          S.addSegment('s6-axis-arr', [7.7, 0.7], [8.1, 0.5], { color: INK, width: 2, dash: 0 });
          S.addSegment('s6-axis-arr2', [7.7, 0.3], [8.1, 0.5], { color: INK, width: 2, dash: 0 });

          S.actor('s6-preview', 0, -0.6,
            '下节课：数轴',
            { color: WARM, size: 22, bold: true });
          S.actor('s6-preview2', 0, -1.8,
            '每一个有理数都能找到自己的"座位"！',
            { color: WARM, size: 16 });

          P.renderCard(
            '<b>下节课预告：数轴</b><br>' +
            '有理数有无穷多个——<br>' +
            '数轴让每一个有理数都找到属于自己的点，<br>' +
            '正的在右，负的在左，$0$ 居中。<br>' +
            '<b>期待下节课！</b>',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
