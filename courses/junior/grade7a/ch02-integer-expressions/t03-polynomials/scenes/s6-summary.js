// s6-summary.js  环节六：易错与小结（3步）
// 数学验算：
//   多选题：A x²-2x-3第二项是2x → 错，应是-2x；
//           B 5-3y是一次二项式 → 正确（最高次项-3y次数1，共2项）；
//           C 3x²y-2x+1的次数是2 → 错，最高次项3x²y次数3；
//           D 整式包括单项式和多项式 → 正确
//   正确选项：BD
//   悬念：3x与5x同类项，合并=8x（下节课合并同类项）
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
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：多选题辨析（ABCD，正确答案BD）
      {
        narration: '最后来一道多选辨析，巩固易错点。四个选项，哪几个正确？A：x²-2x-3 的第二项是 2x——错！第二项是 -2x，负号不能丢。B：5-3y 是一次二项式——正确！最高次项 -3y 次数1，共2项。C：3x²y-2x+1 的次数是2——错！最高次项 3x²y 次数是 2+1=3，不是2。D：整式包括单项式和多项式——正确。所以答案是BD。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.0, '易错辨析（多选）', { color: COOL, size: 22, bold: true });
          S.actor('s6-qA', -0.5, 5.8,
            'A. $x^{2}-2x-3$ 的第二项是 $2x$',
            { color: INK, size: 17 });
          S.actor('s6-qB', -0.5, 4.6,
            'B. $5-3y$ 是一次二项式',
            { color: INK, size: 17 });
          S.actor('s6-qC', -0.5, 3.4,
            'C. $3x^{2}y-2x+1$ 的次数是 $2$',
            { color: INK, size: 17 });
          S.actor('s6-qD', -0.5, 2.2,
            'D. 整式包括单项式和多项式',
            { color: INK, size: 17 });
          // 答案标签
          S.actor('s6-aA', 8, 5.8, '✗ 错', { color: RED,   size: 18, bold: true });
          S.actor('s6-aB', 8, 4.6, '✓ 对', { color: GREEN, size: 18, bold: true });
          S.actor('s6-aC', 8, 3.4, '✗ 错', { color: RED,   size: 18, bold: true });
          S.actor('s6-aD', 8, 2.2, '✓ 对', { color: GREEN, size: 18, bold: true });
          S.actor('s6-bd', 0, 0.5,
            '正确答案：BD',
            { color: WARM, size: 26, bold: true });
          P.renderCard(
            '<b>辨析结论</b><br>' +
            'A错：第二项是 $-2x$，负号不能丢。<br>' +
            'B对：$5-3y$ 一次二项式。<br>' +
            'C错：$3x^{2}y$ 次数 $2+1=3$，不是2。<br>' +
            'D对：整式=单项式+多项式。<br>' +
            '<b>答案：BD</b>',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 2：知识小结表
      {
        narration: '来做一个完整的知识小结。本节三个核心知识点：第一，多项式：几个单项式的和，每项含符号，常数项不含字母且含符号；第二，次数：最高次项的次数，取最大值，不是各项次数相加；第三，整式：单项式加多项式，分母含字母的式子不属于整式。',
        enter: function (anim) {
          S.remove('s6-qA'); S.remove('s6-qB'); S.remove('s6-qC'); S.remove('s6-qD');
          S.remove('s6-aA'); S.remove('s6-aB'); S.remove('s6-aC'); S.remove('s6-aD');
          S.remove('s6-bd');
          S.actor('s6-sum-title', 0, 7.0, '知识小结', { color: COOL, size: 22, bold: true });
          P.renderTable({
            head: ['知识点', '核心要点'],
            rows: [
              ['多项式', '几个单项式的和；每项含符号'],
              ['次数',   '最高次项的次数（取最大，不求和）'],
              ['整式',   '单项式+多项式；分母含字母则非整式'],
            ],
          });
          P.renderCard(
            '<b>本节四句话</b><br>' +
            '① 负号是项的一部分，绝不能丢。<br>' +
            '② 次数取最大值，不相加。<br>' +
            '③ 整式=单项式+多项式。<br>' +
            '④ 命名：次数在前，项数在后。',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 3：悬念——3x 与 5x 能合并吗？
      {
        narration: '最后一个问题留给大家思考——3x 和 5x，字母相同，次数也相同，它们能合并成一项吗？结果是 8x 还是 8x²？这个问题的答案，就在下节课 2.4 合并同类项！带着这个问题预习一下，看看你的猜测对不对。',
        enter: function (anim) {
          S.remove('s6-sum-title');
          S.actor('s6-sus-title', 0, 7.0, '课后悬念', { color: WARM, size: 22, bold: true });
          S.actor('s6-m1', -5, 4.5, '$3x$', { color: COOL, size: 40, bold: true });
          S.actor('s6-m2',  5, 4.5, '$5x$', { color: WARM, size: 40, bold: true });
          S.actor('s6-q',   0, 2.8,
            '字母相同、次数相同——能合并吗？',
            { color: INK, size: 19 });
          S.actor('s6-opt1', -4, 1.2, '$8x$', { color: TEAL, size: 28 });
          S.actor('s6-or',    0, 1.2, '还是', { color: GRAY, size: 18 });
          S.actor('s6-opt2',  4, 1.2, '$8x^{2}$', { color: RED, size: 28 });
          S.actor('s6-next', 0, -0.8,
            '答案在下节课 2.4《合并同类项》！',
            { color: WARM, size: 18, bold: true });
          P.renderCard(
            '$3x$ 与 $5x$ 能合并吗？<br>' +
            '是 $8x$ 还是 $8x^{2}$？<br>' +
            '答案就在下节课 <b>2.4 合并同类项</b>！',
            'warm',
            'tada'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
