// s2-define.js  环节二：项与常数项（4步）
// 数学验算：x²-2x-3 = x²+(-2x)+(-3)
//   项：x²（含符号+，即+x²），-2x（含符号−），-3（含符号−，常数项）
//   m-n+1 = m+(-n)+1，常数项=1（非-1；若 m-n-1 则常数项=-1）
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
    id: 's2',
    title: '二、项与常数项',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义——每个加数叫"项"
      {
        narration: '多项式 x²-2x-3 改写成加法形式：x² 加 括号-2x 加 括号-3。三个加数，每个加数都叫做这个多项式的"项"。第一项是 x²，第二项是 -2x，第三项是 -3。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.0, '项与常数项', { color: COOL, size: 22, bold: true });
          // 改写形式
          S.actor('s2-orig', 0, 5.0, '$x^{2}-2x-3$', { color: INK, size: 30, bold: true });
          S.actor('s2-eq',   0, 3.5, '$=$', { color: GRAY, size: 24 });
          S.actor('s2-add',  0, 2.0,
            '$x^{2}+(-2x)+(-3)$',
            { color: INK, size: 28 });
          // 三项标注
          S.actor('s2-t1', -5, 0.2, '$x^{2}$',  { color: COOL, size: 28, bold: true });
          S.actor('s2-t2',  0, 0.2, '$-2x$',     { color: WARM, size: 28, bold: true });
          S.actor('s2-t3',  5, 0.2, '$-3$',       { color: TEAL, size: 28, bold: true });
          S.actor('s2-lab1', -5, -1.2, '第一项', { color: COOL, size: 16 });
          S.actor('s2-lab2',  0, -1.2, '第二项', { color: WARM, size: 16 });
          S.actor('s2-lab3',  5, -1.2, '第三项', { color: TEAL, size: 16 });
          P.renderCard(
            '$x^{2}-2x-3 = x^{2}+(-2x)+(-3)$<br>' +
            '每个加数叫做多项式的<b>项</b>：<br>' +
            '第一项 $x^{2}$，第二项 $-2x$，第三项 $-3$。'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 2：头号易错！第二项含负号
      {
        narration: '注意！这是本节最容易出错的地方——第二项到底是 -2x 还是 2x？我们来看：改写为加法之后，第二个加数是括号里的 -2x，所以第二项是 -2x，负号是它自身的一部分，绝对不能丢！如果写成 2x，原式就变成了 x²+2x+(-3)，和 x²-2x-3 完全不同！',
        enter: function (anim) {
          // 清掉上一步的标注，只留改写式
          S.remove('s2-t1'); S.remove('s2-t2'); S.remove('s2-t3');
          S.remove('s2-lab1'); S.remove('s2-lab2'); S.remove('s2-lab3');
          // 错误示范
          S.actor('s2-wrong-label', -4, 0.5, '错误：', { color: RED, size: 18, bold: true });
          S.actor('s2-wrong', 0, 0.5, '第二项是 $2x$', { color: RED, size: 22 });
          // 正确示范
          S.actor('s2-right-label', -4, -1.5, '正确：', { color: GREEN, size: 18, bold: true });
          S.actor('s2-right', 0, -1.5, '第二项是 $-2x$', { color: GREEN, size: 22, bold: true });
          S.actor('s2-reason', 0, -3.2,
            '负号是该项自身的一部分，不能丢！',
            { color: WARM, size: 17 });
          P.renderCard(
            '<b>头号易错：项含符号！</b><br>' +
            '第二项是 $-2x$，<b>不是</b> $2x$。<br>' +
            '负号是这一项自身的一部分，不能丢！<br>' +
            '丢了负号：$x^{2}+2x+(-3) \\ne x^{2}-2x-3$',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 3：常数项
      {
        narration: '多项式 x²-2x-3 的第三项是 -3，它不含字母。不含字母的项叫做常数项。注意：常数项也包含它自己的符号，所以这里常数项是 -3，不是 3。',
        enter: function (anim) {
          S.remove('s2-wrong-label'); S.remove('s2-wrong');
          S.remove('s2-right-label'); S.remove('s2-right');
          S.remove('s2-reason');
          // 高亮常数项
          S.actor('s2-ct-show', 0, 1.0,
            '$x^{2}+(-2x)+\\boldsymbol{(-3)}$',
            { color: INK, size: 28 });
          S.actor('s2-ct-arrow', 2.5, -0.8, '↑', { color: TEAL, size: 24 });
          S.actor('s2-ct-label', 2.5, -2.0, '常数项 $-3$', { color: TEAL, size: 20, bold: true });
          S.actor('s2-ct-note', 0, -3.5,
            '不含字母，含自身符号（-3，非 3）',
            { color: TEAL, size: 16 });
          P.renderCard(
            '<b>常数项</b><br>' +
            '不含字母的项叫做<b>常数项</b>。<br>' +
            '$x^{2}-2x-3$ 的常数项是 $-3$（含负号）。<br>' +
            '常数项同样含自身符号！',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 4：辨析练习 m-n+1 的常数项
      {
        narration: '小练习：m 减 n 加 1，它的常数项是多少？先别急着回答。我们改写成加法：m 加 括号-n 加 1。三个加数分别是 m、-n 和 1。不含字母的是 1，所以常数项是正1，不是 -1！注意：-1 是第二项 -n 前面的符号影响了你的判断，要看最后这一项本身——它是 +1。',
        enter: function (anim) {
          S.remove('s2-ct-show'); S.remove('s2-ct-arrow');
          S.remove('s2-ct-label'); S.remove('s2-ct-note');
          S.actor('s2-ex-title', 0, 6.0, '辨析练习', { color: COOL, size: 20, bold: true });
          S.actor('s2-ex-q', 0, 4.5, '$m-n+1$ 的常数项是？', { color: INK, size: 24 });
          S.actor('s2-ex-rw', 0, 3.0,
            '$= m+(-n)+1$',
            { color: INK, size: 24 });
          S.actor('s2-ex-ans', 0, 1.0,
            '常数项 $= 1$（不是 $-1$）',
            { color: GREEN, size: 24, bold: true });
          S.actor('s2-ex-note', 0, -0.8,
            '若是 $m-n-1$，改写 $m+(-n)+(-1)$，常数项才是 $-1$',
            { color: GRAY, size: 15 });
          P.renderCard(
            '<b>辨析：常数项含自身符号</b><br>' +
            '$m-n+1 = m+(-n)+1$<br>' +
            '最后一项是 $+1$，常数项是 $1$，不是 $-1$！<br>' +
            '若为 $m-n-1$，则常数项是 $-1$。',
            'cool'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
