// s3-coefficient.js  环节三：系数（3步）
// 数学验算：
// -3x²y：系数 = -3（数字因数，含负号），字母部分 x²y
// -a = (-1)×a：系数 = -1（负号必须带入）
// πr²：π ≈ 3.14159 是确定的常数，不是字母，系数 = π，次数 = 2
// (2/3)mn：系数 = 2/3（分数也可做系数）
// 填系数练习：5x²→5，-y→-1，abc→1，(1/4)x²y→1/4
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
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、系数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：系数定义 + -3x²y 直观分析
      {
        narration: '认识了单项式，接下来研究它的第一个属性——系数。看这个单项式：负3x的平方y。里面有数字因数 负3，也有字母部分 x的平方乘y。我们把单项式中的数字因数叫做系数。特别注意：负号必须包含在系数里！负3x的平方y，系数是 负3，不是3！口诀：看到负号，系数带着走。',
        enter: function (anim) {
          // 主式子居中大字
          S.actor('s3-main', 0, 5.5, '$-3x^2y$', { color: INK, size: 32 });

          // 红色标注数字因数 -3
          S.actor('s3-label-coef', -4, 3.8, '系数 $-3$', { color: RED, size: 20 });
          S.addSegment('s3-arrow-coef', [-2.5, 4.1], [-1.2, 4.9],
            { color: RED, width: 2, dash: 0 });

          // 绿色标注字母部分
          S.actor('s3-label-letter', 3.5, 3.8, '字母因数 $x^2y$', { color: GREEN, size: 20 });
          S.addSegment('s3-arrow-letter', [2.0, 4.1], [0.8, 4.9],
            { color: GREEN, width: 2, dash: 0 });

          // 定义
          S.actor('s3-def', 0, 2.0,
            '定义：单项式中的数字因数叫做系数（含负号）',
            { color: COOL, size: 16, bold: true });

          // 口诀
          S.actor('s3-slogan', 0, 0.5,
            '口诀：看到负号，系数带着走！',
            { color: WARM, size: 18 });

          P.renderCard(
            '<b>系数</b>：单项式中的数字因数（<b>含负号</b>）<br>' +
            '$-3x^2y$ 的系数是 $-3$，不是 $3$！<br>' +
            '口诀：<b>看到负号，系数带着走。</b>'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 2：三个特殊系数对比表
      {
        narration: '系数有三种特别容易出错的情形，我们用表格来专项突破。第一，负a，系数是负1，因为负a等于负1乘a，负号是系数的一部分，不能丢；第二，πr的平方，系数是π，因为π等于3.14159……是个确定的常数，不是字母，它归入系数，不归入次数；第三，三分之二mn，系数是三分之二，分数也可以做系数。',
        enter: function (anim) {
          // 清掉旧箭头和标注
          S.remove('s3-label-coef'); S.remove('s3-arrow-coef');
          S.remove('s3-label-letter'); S.remove('s3-arrow-letter');
          S.remove('s3-def'); S.remove('s3-slogan');
          S.remove('s3-main');

          // 三行 actor 示例（配合 renderTable）
          S.actor('s3-eg1', -6, 5.5, '$-a$',                    { color: COOL,   size: 24 });
          S.actor('s3-eg2',  0, 5.5, '$\\pi r^2$',              { color: ORANGE, size: 24 });
          S.actor('s3-eg3',  6, 5.5, '$\\dfrac{2}{3}mn$',       { color: GREEN,  size: 24 });
          S.actor('s3-coef1', -6, 4.2, '系数：$-1$',           { color: COOL,   size: 18 });
          S.actor('s3-coef2',  0, 4.2, '系数：$\\pi$',          { color: ORANGE, size: 18 });
          S.actor('s3-coef3',  6, 4.2, '系数：$\\dfrac{2}{3}$', { color: GREEN,  size: 18 });

          // 重点警示
          S.actor('s3-warn1', -6, 2.8,
            '$-a = (-1) \\times a$',
            { color: COOL, size: 15 });
          S.actor('s3-warn2', 0, 2.8,
            '$\\pi \\approx 3.14159\\ldots$ 是常数！',
            { color: ORANGE, size: 15 });
          S.actor('s3-warn3', 6, 2.8,
            '分数也可做系数',
            { color: GREEN, size: 15 });

          P.renderTable({
            head: ['单项式', '系数', '说明'],
            rows: [
              ['$-a$',                    '$-1$',                  '$-a = (-1) \\times a$，系数含负号'],
              ['$\\pi r^2$',              '$\\pi$',                '$\\pi$ 是确定的常数，不是字母'],
              ['$\\dfrac{2}{3}mn$',       '$\\dfrac{2}{3}$',       '分数也可作系数'],
            ]
          });

          return anim ? delay(400) : null;
        },
      },

      // Step 3：填系数练习揭晓
      {
        narration: '好，来做一组填系数练习。我说四个式子，大家口答系数。5x的平方，系数是多少？负y，系数是多少？abc，系数是多少？四分之一x的平方y，系数是多少？……答案依次揭晓：5；负1——注意负号；1——abc里数字因数是1，隐含的1也是系数；四分之一。',
        enter: function (anim) {
          // 清掉旧内容
          S.remove('s3-eg1'); S.remove('s3-eg2'); S.remove('s3-eg3');
          S.remove('s3-coef1'); S.remove('s3-coef2'); S.remove('s3-coef3');
          S.remove('s3-warn1'); S.remove('s3-warn2'); S.remove('s3-warn3');

          // 四题
          S.actor('s3-p1', -5.5, 5.0, '$5x^2$',            { color: INK, size: 24 });
          S.actor('s3-p2',  2.5, 5.0, '$-y$',               { color: INK, size: 24 });
          S.actor('s3-p3', -5.5, 2.0, '$abc$',              { color: INK, size: 24 });
          S.actor('s3-p4',  2.5, 2.0, '$\\dfrac{1}{4}x^2y$', { color: INK, size: 24 });

          // 揭晓
          S.actor('s3-a1', -5.5, 3.8, '系数：$5$',                   { color: GREEN, size: 19 });
          S.actor('s3-a2',  2.5, 3.8, '系数：$-1$（含负号！）',      { color: RED,   size: 19 });
          S.actor('s3-a3', -5.5, 0.8, '系数：$1$（隐含的 $1$）',     { color: GREEN, size: 19 });
          S.actor('s3-a4',  2.5, 0.8, '系数：$\\dfrac{1}{4}$',       { color: GREEN, size: 19 });

          P.renderCard(
            '<b>填系数答案</b><br>' +
            '$5x^2$：系数 $5$&emsp;' +
            '$-y$：系数 $-1$（负号！）<br>' +
            '$abc$：系数 $1$&emsp;' +
            '$\\dfrac{1}{4}x^2y$：系数 $\\dfrac{1}{4}$',
            'cool'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
