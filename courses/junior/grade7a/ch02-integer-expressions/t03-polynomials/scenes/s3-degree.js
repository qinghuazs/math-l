// s3-degree.js  环节三：多项式的次数（3步）
// 数学验算：3x²y-2x+1
//   3x²y：x 指数2，y 指数1，次数=2+1=3
//   -2x：x 指数1，次数=1
//   1：常数，次数=0
//   最高次=3，共3项 → 三次三项式
// 练习：a³b-2ab²+5
//   a³b：3+1=4；-2ab²：1+2=3；5：0 → 最高次=4，三项 → 四次三项式
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、多项式的次数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：逐项标注次数，找最高次
      {
        narration: '来看多项式 3x²y 减 2x 加 1。这个多项式有三项，我们逐项算次数：第一项 3x²y，x 的指数是 2，y 的指数是 1，次数等于 2 加 1 等于 3；第二项 -2x，次数是 1；第三项 1，常数项次数是 0。三项的次数分别是 3、1、0，取最大值，多项式的次数是 3。注意！是取最大值，不是把三个次数相加！',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.0, '多项式的次数', { color: COOL, size: 22, bold: true });
          S.actor('s3-poly', 0, 5.5,
            '$3x^{2}y-2x+1$',
            { color: INK, size: 32, bold: true });
          // 表格用 renderTable
          P.renderTable({
            head: ['项', '次数计算', '次数'],
            rows: [
              ['$3x^{2}y$', '$2+1$', '$3$'],
              ['$-2x$',     '$1$',   '$1$'],
              ['$1$',       '常数',  '$0$'],
            ],
          });
          S.actor('s3-maxlabel', 0, 2.8,
            '各项次数：3、1、0　取最大值',
            { color: GRAY, size: 17 });
          S.actor('s3-max', 0, 1.2,
            '多项式次数 $= 3$',
            { color: WARM, size: 28, bold: true });
          S.actor('s3-warn', 0, -0.5,
            '取最大值，不是 3+1+0=4！',
            { color: RED, size: 17 });
          return anim ? delay(400) : null;
        },
      },
      // Step 2：几次几项式命名规则
      {
        narration: '知道了次数，再数项数，就可以命名了。命名规则：次数在前，项数在后。3x²y-2x+1 次数是3，有3项，所以叫做三次三项式。口诀：先找最高次，再数项数，次数在前、项数在后。',
        enter: function (anim) {
          S.remove('s3-maxlabel'); S.remove('s3-max'); S.remove('s3-warn');
          S.actor('s3-rule-title', 0, 4.0, '命名规则：次数在前，项数在后', { color: TEAL, size: 18, bold: true });
          S.actor('s3-name', 0, 2.5,
            '$3x^{2}y-2x+1$',
            { color: INK, size: 28, bold: true });
          S.actor('s3-name-deg', -4, 1.0, '次数=3', { color: WARM, size: 20 });
          S.actor('s3-name-cnt', 4, 1.0, '项数=3', { color: COOL, size: 20 });
          S.actor('s3-arrow-d', -3, 0.2, '↘', { color: GRAY, size: 18 });
          S.actor('s3-arrow-c', 3, 0.2, '↙', { color: GRAY, size: 18 });
          S.actor('s3-result', 0, -1.2,
            '三次三项式',
            { color: GREEN, size: 32, bold: true });
          P.renderCard(
            '<b>命名规则</b><br>' +
            '次数在前、项数在后。<br>' +
            '$3x^{2}y-2x+1$：次数3，共3项<br>' +
            '→ <b>三次三项式</b>',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 3：练习揭晓 a³b-2ab²+5
      {
        narration: '来练习一道：a³b 减 2ab² 加 5，这是几次几项式？自己先算一下各项次数。揭晓：第一项 a³b，a 的指数3加上 b 的指数1，次数4；第二项 -2ab²，a 的指数1加 b 的指数2，次数3；第三项 5，常数，次数0。最高次是4，共3项，所以是四次三项式！常数项是 5（正5）。',
        enter: function (anim) {
          S.remove('s3-rule-title'); S.remove('s3-name');
          S.remove('s3-name-deg'); S.remove('s3-name-cnt');
          S.remove('s3-arrow-d'); S.remove('s3-arrow-c'); S.remove('s3-result');
          S.actor('s3-ex-title', 0, 6.5, '练习', { color: COOL, size: 20, bold: true });
          S.actor('s3-ex-poly', 0, 5.2,
            '$a^{3}b-2ab^{2}+5$',
            { color: INK, size: 30, bold: true });
          P.renderTable({
            head: ['项', '次数计算', '次数'],
            rows: [
              ['$a^{3}b$',   '$3+1$', '$4$'],
              ['$-2ab^{2}$', '$1+2$', '$3$'],
              ['$5$',        '常数',  '$0$'],
            ],
          });
          S.actor('s3-ex-ans', 0, 1.2,
            '最高次=4，共3项',
            { color: WARM, size: 22 });
          S.actor('s3-ex-name', 0, -0.5,
            '四次三项式',
            { color: GREEN, size: 32, bold: true });
          S.actor('s3-ex-ct', 0, -2.2,
            '常数项：$5$（正5）',
            { color: TEAL, size: 18 });
          P.renderCard(
            '<b>揭晓</b><br>' +
            '$a^{3}b-2ab^{2}+5$<br>' +
            '最高次=4（$a^{3}b$ 次数 $3+1=4$），共3项<br>' +
            '→ <b>四次三项式</b>，常数项 $5$',
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
