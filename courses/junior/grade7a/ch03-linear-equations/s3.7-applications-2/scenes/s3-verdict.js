// s3-verdict.js  环节三：揭晓——亏 8 元（3步）
// 数学验算：总进价 48+80=128；总售价 60+60=120；128-120=8（亏8元）
// 绝对金额：25%×48=12（盈利12元）；25%×80=20（亏损20元）；净亏20-12=8元
// 柱状图：keepAspect:true（addBar场景，画板等比）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GRAY   = '#90a4ae';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、揭晓：亏 8 元',
    bbox: [-6, 9, 6, -3],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：两根柱子生长动画——128 vs 120
      {
        narration: '好，现在揭晓答案！总进价等于 48 加 80，等于 128 元；总售价等于 60 加 60，等于 120 元。128 大于 120，说明总体亏损了！亏损额 128 减 120 等于 8 元。——不是不赚不亏，而是亏了整整 8 元！',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接画终态
            S.addBar('s3-bar-cost', -2.5, 2, 7.2,
              { color: RED, fill: RED, fillOpacity: 0.8 });
            S.addBar('s3-bar-sell', 1.5, 2, 6.8,
              { color: COOL, fill: COOL, fillOpacity: 0.8 });
            S.addText('s3-lab-cost', -2.5, -0.6, '总进价 128 元', { color: RED, size: 15, bold: true });
            S.addText('s3-lab-sell', 1.5, -0.6, '总售价 120 元', { color: COOL, size: 15, bold: true });
            S.addText('s3-val-cost', -2.5, 7.5, '128', { color: RED, size: 16, bold: true });
            S.addText('s3-val-sell', 1.5, 7.0, '120', { color: COOL, size: 16, bold: true });

            S.addSegment('s3-diff-top', [-1.6, 6.8], [0.6, 6.8], { color: WARM, width: 2, dash: 1 });
            S.addSegment('s3-diff-bot', [-1.6, 7.2], [0.6, 7.2], { color: WARM, width: 2, dash: 1 });
            S.addSegment('s3-diff-mid', [-0.5, 6.8], [-0.5, 7.2], { color: WARM, width: 2.5, dash: 0 });
            S.addText('s3-diff-lab', 0.7, 7.0, '亏损 8 元', { color: WARM, size: 15, bold: true });

            P.renderCard(
              '<b>揭晓！</b><br>' +
              '总进价 = 48 + 80 = <b>128 元</b><br>' +
              '总售价 = 60 + 60 = <b>120 元</b><br>' +
              '128 $\\gt$ 120，净亏 <b>8 元</b>！',
              'warm'
            );
            return Promise.resolve();
          }

          // 动画：柱子从高度0生长至目标高
          var costH = 0;
          var sellH = 0;
          S.addBar('s3-bar-cost', -2.5, 2, 0,
            { color: RED, fill: RED, fillOpacity: 0.8 });
          S.addBar('s3-bar-sell', 1.5, 2, 0,
            { color: COOL, fill: COOL, fillOpacity: 0.8 });
          S.addText('s3-lab-cost', -2.5, -0.6, '总进价 128 元', { color: RED, size: 15, bold: true });
          S.addText('s3-lab-sell', 1.5, -0.6, '总售价 120 元', { color: COOL, size: 15, bold: true });

          return S.animate({
            from: 0, to: 7.2, duration: 900,
            onUpdate: function (v) {
              S.remove('s3-bar-cost');
              S.addBar('s3-bar-cost', -2.5, 2, v,
                { color: RED, fill: RED, fillOpacity: 0.8 });
            }
          }).then(function () {
            return S.animate({
              from: 0, to: 6.8, duration: 800,
              onUpdate: function (v) {
                S.remove('s3-bar-sell');
                S.addBar('s3-bar-sell', 1.5, 2, v,
                  { color: COOL, fill: COOL, fillOpacity: 0.8 });
              }
            });
          }).then(function () {
            S.addText('s3-val-cost', -2.5, 7.5, '128', { color: RED, size: 16, bold: true });
            S.addText('s3-val-sell', 1.5, 7.0, '120', { color: COOL, size: 16, bold: true });
            S.addSegment('s3-diff-top', [-1.6, 6.8], [0.6, 6.8], { color: WARM, width: 2, dash: 1 });
            S.addSegment('s3-diff-bot', [-1.6, 7.2], [0.6, 7.2], { color: WARM, width: 2, dash: 1 });
            S.addSegment('s3-diff-mid', [-0.5, 6.8], [-0.5, 7.2], { color: WARM, width: 2.5, dash: 0 });
            S.addText('s3-diff-lab', 0.7, 7.0, '亏损 8 元', { color: WARM, size: 15, bold: true });
            P.renderCard(
              '<b>揭晓！</b><br>' +
              '总进价 = 48 + 80 = <b>128 元</b><br>' +
              '总售价 = 60 + 60 = <b>120 元</b><br>' +
              '128 $\\gt$ 120，净亏 <b>8 元</b>！',
              'warm', 'tada'
            );
            return delay(300);
          });
        },
      },

      // Step 2：直觉为何错——25%基数不同，绝对金额不对称
      {
        narration: '直觉为什么错了？来看两个 25% 对应的绝对金额。盈利件进价 48 元，盈利 25%，实际盈利 48 乘以 25% 等于 12 元；亏损件进价 80 元，亏损 25%，实际亏损 80 乘以 25% 等于 20 元。盈利只挽回 12 元，亏损却损失了 20 元——净亏 8 元！两个 25% 的绝对金额不相等，不能互相抵消！',
        enter: function (anim) {
          S.actor('s3-why-title', 0, 8.3, '为什么直觉错了？', { color: TEAL, size: 18, bold: true });

          S.actor('s3-profit-label', -3.5, 7.0, '盈利件', { color: GREEN, size: 16, bold: true });
          S.actor('s3-profit-calc', -3.5, 5.8,
            '$25\\% \\times 48 = 12$ 元',
            { color: GREEN, size: 16 });
          S.actor('s3-profit-word', -3.5, 4.8, '（实际盈利 12 元）', { color: GREEN, size: 14 });

          S.actor('s3-loss-label', 3.5, 7.0, '亏损件', { color: RED, size: 16, bold: true });
          S.actor('s3-loss-calc', 3.5, 5.8,
            '$25\\% \\times 80 = 20$ 元',
            { color: RED, size: 16 });
          S.actor('s3-loss-word', 3.5, 4.8, '（实际亏损 20 元）', { color: RED, size: 14 });

          S.actor('s3-net', 0, 3.4,
            '净亏 = $20 - 12 = 8$ 元',
            { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>误区剖析</b><br>' +
            '盈利 $25\\% \\times 48 = 12$ 元（绿色）<br>' +
            '亏损 $25\\% \\times 80 = 20$ 元（红色）<br>' +
            '净亏 $20 - 12 = \\mathbf{8}$ 元<br>' +
            '两个 25% 的<b>基数不同</b>，绝对金额不等！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：核心规律——百分比基数陷阱
      {
        narration: '这就是"百分比基数陷阱"！同样的百分比率，基数不同，对应的绝对金额就不同，不能直接相加减。在盈亏问题里，百分比的基数永远是进价，不是售价。这一点一定要记牢！',
        enter: function (anim) {
          S.remove('s3-why-title');
          S.remove('s3-profit-label'); S.remove('s3-profit-calc'); S.remove('s3-profit-word');
          S.remove('s3-loss-label'); S.remove('s3-loss-calc'); S.remove('s3-loss-word');
          S.remove('s3-net');

          S.actor('s3-trap-title', 0, 8.0, '百分比基数陷阱', { color: WARM, size: 22, bold: true });
          S.actor('s3-trap1', 0, 6.5,
            '两个 25% 的基数不同：48 $\\neq$ 80',
            { color: INK, size: 17 });
          S.actor('s3-trap2', 0, 5.2,
            '所以绝对金额不同：12 元 $\\neq$ 20 元',
            { color: INK, size: 17 });
          S.actor('s3-trap3', 0, 3.8,
            '不能直接相加减——不赚不亏是错的！',
            { color: WARM, size: 17, bold: true });
          S.actor('s3-rule', 0, 2.3,
            '盈亏问题：% 的基数 = 进价',
            { color: TEAL, size: 19, bold: true });

          P.renderCard(
            '<b>百分比基数陷阱</b><br>' +
            '两个 25% 的基数不同（48 $\\neq$ 80），不能直接相消。<br>' +
            '核心规律：<b>盈亏 % 的基数是进价，不是售价！</b>',
            'warm', 'headShake'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
