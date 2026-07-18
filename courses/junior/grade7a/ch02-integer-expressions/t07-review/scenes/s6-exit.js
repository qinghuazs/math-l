// s6-exit.js  六、出口测试与收官（3步）
// 数学验算（五道出口测试题，对应教学设计种子题①-⑤，均已验算）：
// ① -3x²y 系数=-3，次数=2+1=3 ✓
// ② x²-2x-3 常数项=-3 ✓
// ③ 3a+2b-5a=(3-5)a+2b=-2a+2b ✓
// ④ -(2x-3)=-2x+3 ✓
// ⑤ 2(a²-ab)-(2a²-3ab)=2a²-2ab-2a²+3ab=ab；a=2,b=-1：ab=2×(-1)=-2 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、出口测试与收官',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：出口测试五题（限时2分钟）
      {
        narration: '出口测试！五道题，限时两分钟，独立完成，不能看前面的笔记。计时开始！',
        enter: function (anim) {
          S.actor('s6-title', 0, 9.0, '出口测试——限时 2 分钟，独立完成！', { color: RED, size: 19, bold: true });

          S.actor('s6-q1', 0, 7.3, '① 写出 $-3x^{2}y$ 的系数和次数', { color: INK, size: 16 });
          S.actor('s6-q2', 0, 5.9, '② 写出 $x^{2} - 2x - 3$ 的常数项', { color: INK, size: 16 });
          S.actor('s6-q3', 0, 4.5, '③ 化简 $3a + 2b - 5a$', { color: INK, size: 16 });
          S.actor('s6-q4', 0, 3.1, '④ 化简 $-(2x - 3)$', { color: INK, size: 16 });
          S.actor('s6-q5', 0, 1.7,
            '⑤ 化简 $2(a^{2}-ab)-(2a^{2}-3ab)$，令 $a=2$，$b=-1$ 求值',
            { color: INK, size: 15 });

          S.actor('s6-timer', 0, 0.0, '⏱ 2 分钟，独立完成，加油！', { color: ORANGE, size: 15 });

          P.renderCard(
            '<b>出口测试（共 5 题）</b><br>' +
            '每题 2 分，满分 10 分。<br>' +
            '限时 2 分钟，独立完成后对照答案。'
          );

          return anim ? delay(300) : null;
        },
      },

      // Step 2：逐题揭晓答案
      {
        narration: '时间到！对照答案，逐题揭晓。第一题：系数负三，次数三。第二题：常数项负三。第三题：负 2a 加 2b。第四题：负 2x 加 3。第五题：化简得 ab，代入 a 等于 2、b 等于负 1，ab 等于负 2，答案是负 2。每题对了给自己打两分，看看拿了几分！',
        enter: function (anim) {
          if (!anim) {
            S.actor('s6-a1', 9, 7.3, '系数 $-3$，次数 $3$ ✓', { color: GREEN, size: 14, bold: true });
            S.actor('s6-a2', 9, 5.9, '常数项 $-3$ ✓', { color: GREEN, size: 14, bold: true });
            S.actor('s6-a3', 9, 4.5, '$-2a + 2b$ ✓', { color: GREEN, size: 14, bold: true });
            S.actor('s6-a4', 9, 3.1, '$-2x + 3$ ✓', { color: GREEN, size: 14, bold: true });
            S.actor('s6-a5', 9, 1.7, '$ab = -2$ ✓', { color: GREEN, size: 14, bold: true });
            P.renderCard(
              '<b>答案揭晓</b><br>' +
              '① 系数 $-3$，次数 $3$<br>' +
              '② 常数项 $-3$<br>' +
              '③ $-2a + 2b$<br>' +
              '④ $-2x + 3$<br>' +
              '⑤ $ab = -2$'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s6-a1', 9, 7.3, '系数 $-3$，次数 $3$ ✓', { color: GREEN, size: 14, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s6-a2', 9, 5.9, '常数项 $-3$ ✓', { color: GREEN, size: 14, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s6-a3', 9, 4.5, '$-2a + 2b$ ✓', { color: GREEN, size: 14, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s6-a4', 9, 3.1, '$-2x + 3$ ✓', { color: GREEN, size: 14, bold: true });
            return delay(500);
          }).then(function () {
            S.actor('s6-a5', 9, 1.7, '$ab = -2$ ✓', { color: GREEN, size: 14, bold: true });
            P.renderCard(
              '<b>答案揭晓</b><br>' +
              '① 系数 $-3$，次数 $3$<br>' +
              '② 常数项 $-3$<br>' +
              '③ $-2a + 2b$<br>' +
              '④ $-2x + 3$<br>' +
              '⑤ $ab = -2$',
              'cool'
            );
            return delay(400);
          });
        },
      },

      // Step 3：收官预告第3章
      {
        narration: '第二章圆满收官！整式会算了。但问题来了：式子里的字母到底等于多少？比如 2x 加 1 等于 5，x 是几？这类问题光靠式的运算是解决不了的——我们需要方程！第三章，一元一次方程，就是帮你解决这个问题的。下一章见！',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-q1'); S.remove('s6-q2'); S.remove('s6-q3'); S.remove('s6-q4'); S.remove('s6-q5');
          S.remove('s6-timer');
          S.remove('s6-a1'); S.remove('s6-a2'); S.remove('s6-a3'); S.remove('s6-a4'); S.remove('s6-a5');

          S.actor('s6-fin-title', 0, 8.5, '第二章《整式的加减》——全章收官！', { color: GREEN, size: 19, bold: true });
          S.actor('s6-fin-sum', 0, 6.8,
            '知识链：用字母表示数 → 整式 → 整式加减',
            { color: INK, size: 16 });
          S.actor('s6-fin-core', 0, 5.4,
            '核心法则：合并同类项 + 去括号',
            { color: TEAL, size: 16 });

          S.actor('s6-next-intro', 0, 3.5, '下一章问题：', { color: COOL, size: 17, bold: true });
          S.actor('s6-next-eq', 0, 2.2, '$2x + 1 = 5$，$x$ 是几？', { color: WARM, size: 22, bold: true });
          S.actor('s6-next-hint', 0, 0.8, '这个问题，第三章一元一次方程帮你解决！', { color: COOL, size: 16 });
          S.actor('s6-next-end', 0, -0.8, '方程，见！', { color: GREEN, size: 24, bold: true });

          P.renderCard(
            '<b>第二章收官</b><br>' +
            '整式会算了，下一步：<b>方程！</b><br>' +
            '$2x + 1 = 5$，$x$ 是几？<br>' +
            '第三章《一元一次方程》带你解决！',
            'teal',
            'tada'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
