// s3-rule.js  三、合并法则（3步）
// 知识点：①分配律逆用 3x+5x=(3+5)x=8x；②面积模型动画（两矩形拼合）；③法则口诀"找—合—抄"
// 数学验算：3+5=8，面积模型：宽x长3+宽x长5=宽x长(3+5)=宽x长8
// 注意：此场景含面积拼接动画，但 actor.moveTo 方案不适合矩形，改用 S.animate 驱动 x 坐标（标量）
// keepAspect: true（画面有几何图形，等比必须开）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、合并法则',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：分配律逆用推导
      {
        narration: '合并同类项的数学依据是什么？答案是：分配律逆用。我们来看推导过程：3x 加 5x，提取公因式 x，得到括号 3 加 5 再乘以 x，计算括号内得 8x。这就是合并法则的本质：系数相加，字母和指数保持不变。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.0, '三、合并法则', { color: COOL, size: 22, bold: true });

          S.actor('s3-basis', 0, 5.5,
            '依据：分配律逆用',
            { color: WARM, size: 20, bold: true });

          S.actor('s3-step1', 0, 3.8,
            '$3x + 5x$',
            { color: INK, size: 26, bold: true });
          S.actor('s3-arrow1', 0, 2.8, '↓ 提取公因式 $x$', { color: GRAY, size: 16 });
          S.actor('s3-step2', 0, 1.8,
            '$(3 + 5)x$',
            { color: TEAL, size: 26, bold: true });
          S.actor('s3-arrow2', 0, 0.8, '↓ 括号内计算', { color: GRAY, size: 16 });
          S.actor('s3-step3', 0, -0.2,
            '$8x$',
            { color: WARM, size: 28, bold: true });

          S.actor('s3-rule', 0, -2.0,
            '法则：系数相加，字母和指数不变',
            { color: COOL, size: 18, bold: true });

          P.renderCard(
            '<b>分配律逆用</b><br>' +
            '$3x + 5x = (3+5)x = 8x$<br>' +
            '提取公因式 $x$，系数 3 和 5 相加得 8，<br>' +
            '字母 $x$ 和它的指数（1）保持不变。'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：面积拼接模型
      {
        narration: '我们用面积模型来直观感受一下。左边矩形：宽为 x，高为 3，面积是 3x；右边矩形：宽为 x，高为 5，面积是 5x。因为两个矩形的宽都是 x——"同底"！——它们可以左右拼合，合并成一个大矩形：宽 x，高 8，面积就是 8x。几何和代数完美对应！',
        enter: function (anim) {
          S.remove('s3-title');
          S.remove('s3-basis');
          S.remove('s3-step1'); S.remove('s3-arrow1');
          S.remove('s3-step2'); S.remove('s3-arrow2');
          S.remove('s3-step3'); S.remove('s3-rule');

          // 面积模型：左矩形宽 x=2单位，高3；右矩形宽x=2单位，高5
          // 坐标系 bbox [-10,8,10,-8]，用画面单位直接画
          // 左矩形：x 从 -7 到 -5（宽2），y 从 -3 到 0（高3）
          // 右矩形：x 从 -4.8 到 -2.8（宽2），y 从 -3 到 2（高5）
          // 用 addText 标注
          var LX1 = -8, LX2 = -5.5; // 左矩形 x 范围
          var RX1 = -5.3, RX2 = -2.8; // 右矩形 x 范围
          var BY = -3; // 底部 y

          // 左矩形（高3）
          S.addPolygon('s3-rect-l',
            [[LX1, BY], [LX2, BY], [LX2, BY + 3], [LX1, BY + 3]],
            { color: WARM, fill: WARM, fillOpacity: 0.25 });
          S.addSegment('s3-rect-l-t', [LX1, BY + 3], [LX2, BY + 3], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s3-rect-l-b', [LX1, BY], [LX2, BY], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s3-rect-l-l', [LX1, BY], [LX1, BY + 3], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s3-rect-l-r', [LX2, BY], [LX2, BY + 3], { color: WARM, width: 3, dash: 0 });

          // 右矩形（高5）
          S.addPolygon('s3-rect-r',
            [[RX1, BY], [RX2, BY], [RX2, BY + 5], [RX1, BY + 5]],
            { color: COOL, fill: COOL, fillOpacity: 0.20 });
          S.addSegment('s3-rect-r-t', [RX1, BY + 5], [RX2, BY + 5], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s3-rect-r-b', [RX1, BY], [RX2, BY], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s3-rect-r-l', [RX1, BY], [RX1, BY + 5], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s3-rect-r-r', [RX2, BY], [RX2, BY + 5], { color: COOL, width: 3, dash: 0 });

          // 标注
          S.actor('s3-lab-3x', (LX1 + LX2) / 2, BY + 1.5, '面积$=3x$', { color: WARM, size: 15, bold: true });
          S.actor('s3-lab-5x', (RX1 + RX2) / 2, BY + 2.5, '面积$=5x$', { color: COOL, size: 15, bold: true });
          S.actor('s3-lab-w', (LX1 + LX2) / 2, BY - 0.5, '宽$=x$', { color: INK, size: 14 });
          S.actor('s3-lab-w2', (RX1 + RX2) / 2, BY - 0.5, '宽$=x$', { color: INK, size: 14 });
          S.actor('s3-lab-h3', LX1 - 1.0, BY + 1.5, '高$=3$', { color: WARM, size: 14 });
          S.actor('s3-lab-h5', RX2 + 0.3, BY + 2.5, '高$=5$', { color: COOL, size: 14 });

          // 右侧：合并图示
          var MX1 = 1, MX2 = 3.5;
          S.addPolygon('s3-rect-m',
            [[MX1, BY], [MX2, BY], [MX2, BY + 8], [MX1, BY + 8]],
            { color: TEAL, fill: TEAL, fillOpacity: 0.22 });
          S.addSegment('s3-rect-m-t', [MX1, BY + 8], [MX2, BY + 8], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-m-b', [MX1, BY], [MX2, BY], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-m-l', [MX1, BY], [MX1, BY + 8], { color: TEAL, width: 3, dash: 0 });
          S.addSegment('s3-rect-m-r', [MX2, BY], [MX2, BY + 8], { color: TEAL, width: 3, dash: 0 });
          S.actor('s3-lab-8x', (MX1 + MX2) / 2, BY + 4, '面积$=8x$', { color: TEAL, size: 16, bold: true });
          S.actor('s3-lab-wm', (MX1 + MX2) / 2, BY - 0.5, '宽$=x$', { color: INK, size: 14 });
          S.actor('s3-lab-hm', MX2 + 0.3, BY + 4, '高$=8$', { color: TEAL, size: 14 });
          S.actor('s3-arrow-merge', -1.8, BY + 3, '拼合→', { color: GRAY, size: 18, bold: true });

          S.actor('s3-formula', 2.3, 6.5,
            '$3x + 5x = (3+5)x = 8x$',
            { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>面积拼接模型</b><br>' +
            '两矩形宽都是 $x$（同底！），可以拼合。<br>' +
            '拼合后：宽 $x$，高 $3+5=8$，面积 $=8x$<br>' +
            '<b>几何直觉：同底才能拼！</b>',
            'teal'
          );

          return anim ? delay(500) : null;
        },
      },

      // Step 3：法则口诀与书写规范
      {
        narration: '现在我们把合并同类项的操作程序固化成三步口诀：找—合—抄。第一步，找：找出所有同类项，可以用颜色标出；第二步，合：系数相加，用有理数加法，注意符号；第三步，抄：字母和指数照抄不变，不增不减。合并完成后，按降幂排列——次数高的写前面，常数项写最后。记住：只加系数，字母和指数绝对不动！',
        enter: function (anim) {
          S.remove('s3-rect-l'); S.remove('s3-rect-l-t'); S.remove('s3-rect-l-b');
          S.remove('s3-rect-l-l'); S.remove('s3-rect-l-r');
          S.remove('s3-rect-r'); S.remove('s3-rect-r-t'); S.remove('s3-rect-r-b');
          S.remove('s3-rect-r-l'); S.remove('s3-rect-r-r');
          S.remove('s3-lab-3x'); S.remove('s3-lab-5x');
          S.remove('s3-lab-w'); S.remove('s3-lab-w2');
          S.remove('s3-lab-h3'); S.remove('s3-lab-h5');
          S.remove('s3-rect-m'); S.remove('s3-rect-m-t'); S.remove('s3-rect-m-b');
          S.remove('s3-rect-m-l'); S.remove('s3-rect-m-r');
          S.remove('s3-lab-8x'); S.remove('s3-lab-wm'); S.remove('s3-lab-hm');
          S.remove('s3-arrow-merge'); S.remove('s3-formula');

          S.actor('s3-t2', 0, 7.0, '合并同类项三步法', { color: COOL, size: 22, bold: true });

          S.actor('s3-f1', -3, 5.0, '第一步', { color: WARM, size: 18, bold: true });
          S.actor('s3-f1t', 2, 5.0, '找：找出同类项（可标色标号）', { color: INK, size: 17 });

          S.actor('s3-f2', -3, 3.2, '第二步', { color: TEAL, size: 18, bold: true });
          S.actor('s3-f2t', 2, 3.2, '合：系数相加（注意符号！）', { color: INK, size: 17 });

          S.actor('s3-f3', -3, 1.4, '第三步', { color: COOL, size: 18, bold: true });
          S.actor('s3-f3t', 2, 1.4, '抄：字母和指数照抄不变', { color: INK, size: 17 });

          S.actor('s3-norm', 0, -0.4,
            '结果按降幂排列（次数高→低→常数项）',
            { color: INK, size: 16 });

          S.actor('s3-warn', 0, -2.2,
            '只加系数，字母和指数绝对不动！',
            { color: WARM, size: 19, bold: true });

          P.renderCard(
            '<b>三步法：找—合—抄</b><br>' +
            '<b>找</b>：找出同类项（用颜色标出）<br>' +
            '<b>合</b>：系数相加（有理数加法，注意符号）<br>' +
            '<b>抄</b>：字母和指数照抄，一字不差<br>' +
            '最终按<b>降幂排列</b>，常数项写最后。',
            'cool',
            'tada'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
