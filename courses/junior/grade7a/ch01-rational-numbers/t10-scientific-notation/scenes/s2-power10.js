// s2-power10.js  环节二：10 的幂脚手架（3步）
// 数学验算：10^1=10, 10^2=100, 10^3=1000, 10^4=10000, 10^5=100000
// 反向：100000000 = 10^8（1后面8个零）
// 折叠动画：300000000 → 3×10^8
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
    id: 's2',
    title: '二、10 的幂脚手架',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：10^1 到 10^5 列表（renderTable popRow）
      {
        narration: '先把 10 的幂列出来看一看。10的1次方是 10，10的2次方是 100，10的3次方是 1000，10的4次方是 10000，10的5次方是 100000。你看出规律了吗？',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.0, '10 的幂规律', { color: COOL, size: 22, bold: true });

          P.renderTable({
            head: ['幂次', '展开结果', '1后面几个零'],
            rows: [
              ['$10^1$', '$10$', '1个零'],
              ['$10^2$', '$100$', '2个零'],
              ['$10^3$', '$1000$', '3个零'],
              ['$10^4$', '$10000$', '4个零'],
              ['$10^5$', '$100000$', '5个零'],
            ],
          });

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：规律总结
      {
        narration: '规律一目了然：10 的 n 次方，写出来就是 1 后面跟 n 个零。10的1次方1后面1个零，10的5次方1后面5个零，以此类推。这个规律是理解科学记数法的脚手架，一定要牢记！',
        enter: function (anim) {
          S.actor('s2-rule-title', 0, 3.8, '规律', { color: TEAL, size: 20, bold: true });
          S.actor('s2-rule-body', 0, 2.2,
            '$10^n$ = 1 后面跟 <b>n</b> 个零',
            { color: WARM, size: 22 }
          );
          S.actor('s2-example', 0, 0.5,
            '$10^8$ = 1后面8个零 = 100000000',
            { color: INK, size: 17 }
          );

          P.renderCard(
            '<b>规律</b>：$10^n$ = 1 后面跟 <b>n</b> 个零<br>' +
            '例：$10^5 = 100000$（5个零）<br>' +
            '$10^8 = 100000000$（8个零）',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：反向问答 + 折叠动画预演
      {
        narration: '反过来提问：100000000 是 10 的几次方？数一数，1后面有8个零，所以是 10 的 8 次方！现在看动画：屏幕上的 300000000，后面八个零逐步"收拢"缩进，变成 3×10的8次方——这就是科学记数法的"魔法"！',
        enter: function (anim) {
          S.remove('s2-rule-title');
          S.remove('s2-rule-body');
          S.remove('s2-example');

          S.actor('s2-q', 0, 4.5, '反向提问：$100000000 = 10^{?}$', { color: COOL, size: 19 });
          S.actor('s2-ans', 0, 3.0, '答：$10^{8}$（1后面8个零）', { color: GREEN, size: 19, bold: true });

          if (!anim) {
            S.actor('s2-fold-orig', 0, 1.2, '300000000', { color: INK, size: 20 });
            S.actor('s2-fold-arrow', 0, 0.0, '$\\Downarrow$ 8个零收拢', { color: TEAL, size: 16 });
            S.actor('s2-fold-result', 0, -1.4, '$3 \\times 10^{8}$', { color: WARM, size: 26, bold: true });
            P.renderCard(
              '<b>折叠预演</b><br>' +
              '$300000000 \\Rightarrow 3 \\times 10^{8}$<br>' +
              '8个零"收拢"成 $10^{8}$！<br>' +
              '下一环节正式学习科学记数法。',
              'warm'
            );
            return Promise.resolve();
          }

          // 动画路径：先显示原数，再逐步替换
          var actors = ['s2-fold-orig'];
          S.actor('s2-fold-orig', 0, 1.2, '300000000', { color: INK, size: 20 });

          return delay(600).then(function () {
            S.remove('s2-fold-orig');
            S.actor('s2-fold-s1', 0, 1.2, '3 00000000', { color: INK, size: 20 });
            return delay(500);
          }).then(function () {
            S.remove('s2-fold-s1');
            S.actor('s2-fold-s2', 0, 1.2, '3 × 00000000', { color: INK, size: 20 });
            return delay(500);
          }).then(function () {
            S.remove('s2-fold-s2');
            S.actor('s2-fold-s3', 0, 1.2, '3 × 10000000<span style="color:' + WARM + '">0</span>', { color: INK, size: 20 });
            return delay(400);
          }).then(function () {
            S.remove('s2-fold-s3');
            S.actor('s2-fold-s4', 0, 1.2, '3 × 1<span style="color:' + WARM + '">00</span>000000', { color: INK, size: 20 });
            return delay(400);
          }).then(function () {
            S.remove('s2-fold-s4');
            S.actor('s2-fold-s5', 0, 1.2, '$3 \\times 10^{8}$', { color: WARM, size: 26, bold: true });
            P.renderCard(
              '<b>折叠预演</b><br>' +
              '$300000000 \\Rightarrow 3 \\times 10^{8}$<br>' +
              '8个零"收拢"成 $10^{8}$！<br>' +
              '下一环节正式学习科学记数法。',
              'warm'
            );
            return delay(300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
