// s3-operations.js  三、运算关卡（4步）
// 数学验算：
// ① 3a+2b-5a：同类项3a与-5a，系数3+(-5)=-2，结果-2a+2b ✓
// ② -(2x-3)：负号前括号每项变号，+2x→-2x，-3→+3，结果-2x+3 ✓
// ③ 3x-(2x-y+1)=3x-2x+y-1=x+y-1 ✓（去括号三项全变号；合并3x与-2x系数3-2=1）
// ④ (3x²-2x+1)-(x²+x-3)=3x²-2x+1-x²-x+3=(3-1)x²+(-2-1)x+(1+3)=2x²-3x+4 ✓
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
    id: 's3',
    title: '三、运算关卡',
    bbox: [-12, 10, 12, -10],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：合并同类项
      {
        narration: '运算关卡，四步挑战！第一步：合并同类项。化简 3a 加 2b 减 5a。先找同类项——3a 和负 5a 含字母 a，是同类项；2b 没有同类项，原样保留。合并：3 加负 5 等于负 2，所以是负 2a；加上 2b 不变。结果：负 2a 加 2b。',
        enter: function (anim) {
          S.actor('s3-title', 0, 9.0, '第一步：合并同类项', { color: TEAL, size: 19, bold: true });
          S.actor('s3-q1-expr', 0, 7.2, '化简 $3a + 2b - 5a$', { color: INK, size: 18 });

          if (!anim) {
            S.actor('s3-like-mark', -3, 5.5, '同类项：$3a$ 与 $-5a$', { color: ORANGE, size: 16 });
            S.actor('s3-b-mark', 3, 5.5, '$2b$ 无同类项，保留', { color: GRAY, size: 15 });
            S.actor('s3-step1', 0, 3.8, '$3a + (-5a) = (3 - 5)a = -2a$', { color: COOL, size: 17 });
            S.actor('s3-ans1', 0, 2.2, '结果：$-2a + 2b$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule1', 0, 0.6, '规律：合并同类项只加系数，字母和指数不变', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>合并同类项</b><br>' +
              '$3a + 2b - 5a = -2a + 2b$<br>' +
              '法则：<b>系数相加</b>，字母和指数不变'
            );
            return null;
          }

          return delay(500).then(function () {
            S.actor('s3-like-mark', -3, 5.5, '同类项：$3a$ 与 $-5a$', { color: ORANGE, size: 16 });
            S.actor('s3-b-mark', 3, 5.5, '$2b$ 无同类项，保留', { color: GRAY, size: 15 });
            return delay(600);
          }).then(function () {
            S.actor('s3-step1', 0, 3.8, '$3a + (-5a) = (3 - 5)a = -2a$', { color: COOL, size: 17 });
            return delay(600);
          }).then(function () {
            S.actor('s3-ans1', 0, 2.2, '结果：$-2a + 2b$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule1', 0, 0.6, '规律：合并同类项只加系数，字母和指数不变', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>合并同类项</b><br>' +
              '$3a + 2b - 5a = -2a + 2b$<br>' +
              '法则：<b>系数相加</b>，字母和指数不变'
            );
            return delay(400);
          });
        },
      },

      // Step 2：去括号
      {
        narration: '第二步：去括号。化简负号括号 2x 减 3。括号前是负号——这是关键！每一项都要变号，一项不能漏。2x 变成负 2x；负 3 变成正 3。结果：负 2x 加 3。',
        enter: function (anim) {
          S.remove('s3-title'); S.remove('s3-q1-expr');
          S.remove('s3-like-mark'); S.remove('s3-b-mark');
          S.remove('s3-step1'); S.remove('s3-ans1'); S.remove('s3-rule1');

          S.actor('s3-title2', 0, 9.0, '第二步：去括号', { color: WARM, size: 19, bold: true });
          S.actor('s3-q2-expr', 0, 7.2, '化简 $-(2x - 3)$', { color: INK, size: 18 });

          if (!anim) {
            S.actor('s3-warn2', 0, 5.5, '括号前是负号 → 每项变号！', { color: RED, size: 17, bold: true });
            S.actor('s3-ch1', -4, 3.8, '$+2x \\to -2x$', { color: WARM, size: 16 });
            S.actor('s3-ch2', 4, 3.8, '$-3 \\to +3$', { color: WARM, size: 16 });
            S.actor('s3-ans2', 0, 2.0, '结果：$-2x + 3$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule2', 0, 0.4, '去括号法则：负号前括号内每项都要变号，一项不漏', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>去括号</b><br>' +
              '$-(2x - 3) = -2x + 3$<br>' +
              '法则：括号前是<b>负号</b>，括号内<b>每项都变号</b>'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s3-warn2', 0, 5.5, '括号前是负号 → 每项变号！', { color: RED, size: 17, bold: true });
            return delay(600);
          }).then(function () {
            S.actor('s3-ch1', -4, 3.8, '$+2x \\to -2x$', { color: WARM, size: 16 });
            S.actor('s3-ch2', 4, 3.8, '$-3 \\to +3$', { color: WARM, size: 16 });
            return delay(600);
          }).then(function () {
            S.actor('s3-ans2', 0, 2.0, '结果：$-2x + 3$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule2', 0, 0.4, '去括号法则：负号前括号内每项都要变号，一项不漏', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>去括号</b><br>' +
              '$-(2x - 3) = -2x + 3$<br>' +
              '法则：括号前是<b>负号</b>，括号内<b>每项都变号</b>'
            );
            return delay(400);
          });
        },
      },

      // Step 3：去括号+合并（三项变号）
      {
        narration: '第三步：去括号后再合并同类项。化简 3x 减括号 2x 减 y 加 1。第一步去括号——负号括号内三项全部变号：2x 变负 2x，负 y 变正 y，正 1 变负 1；第二步合并同类项：3x 与负 2x 合并，系数 3 减 2 等于 1，得 x；y 无同类项保留；负 1 无同类项保留。结果：x 加 y 减 1。',
        enter: function (anim) {
          S.remove('s3-title2'); S.remove('s3-q2-expr');
          S.remove('s3-warn2'); S.remove('s3-ch1'); S.remove('s3-ch2');
          S.remove('s3-ans2'); S.remove('s3-rule2');

          S.actor('s3-title3', 0, 9.0, '第三步：去括号 + 合并同类项', { color: COOL, size: 19, bold: true });
          S.actor('s3-q3-expr', 0, 7.5, '化简 $3x - (2x - y + 1)$', { color: INK, size: 18 });

          if (!anim) {
            S.actor('s3-d3-1', 0, 5.8, '第一步去括号：', { color: WARM, size: 16 });
            S.actor('s3-d3-1v', 0, 4.6, '$3x - 2x + y - 1$', { color: WARM, size: 17 });
            S.actor('s3-d3-note', 0, 3.4, '（三项全变号：$+2x \\to -2x$，$-y \\to +y$，$+1 \\to -1$）', { color: RED, size: 13 });
            S.actor('s3-d3-2', 0, 2.2, '第二步合并：', { color: ORANGE, size: 16 });
            S.actor('s3-d3-2v', 0, 1.0, '$(3-2)x + y - 1 = x + y - 1$', { color: ORANGE, size: 17 });
            S.actor('s3-ans3', 0, -0.5, '结果：$x + y - 1$', { color: GREEN, size: 19, bold: true });
            P.renderCard(
              '<b>去括号 + 合并</b><br>' +
              '$3x - (2x - y + 1)$<br>' +
              '$= 3x - 2x + y - 1$<br>' +
              '$= x + y - 1$'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s3-d3-1', 0, 5.8, '第一步去括号：', { color: WARM, size: 16 });
            S.actor('s3-d3-1v', 0, 4.6, '$3x - 2x + y - 1$', { color: WARM, size: 17 });
            S.actor('s3-d3-note', 0, 3.4, '（三项全变号：$+2x \\to -2x$，$-y \\to +y$，$+1 \\to -1$）', { color: RED, size: 13 });
            return delay(700);
          }).then(function () {
            S.actor('s3-d3-2', 0, 2.2, '第二步合并：', { color: ORANGE, size: 16 });
            S.actor('s3-d3-2v', 0, 1.0, '$(3-2)x + y - 1 = x + y - 1$', { color: ORANGE, size: 17 });
            return delay(600);
          }).then(function () {
            S.actor('s3-ans3', 0, -0.5, '结果：$x + y - 1$', { color: GREEN, size: 19, bold: true });
            P.renderCard(
              '<b>去括号 + 合并</b><br>' +
              '$3x - (2x - y + 1)$<br>' +
              '$= 3x - 2x + y - 1$<br>' +
              '$= x + y - 1$'
            );
            return delay(400);
          });
        },
      },

      // Step 4：综合整式加减（完整板演）
      {
        narration: '第四步：综合整式加减。化简括号 3x 平方减 2x 加 1 括号减括号 x 平方加 x 减 3 括号。第二个括号前是负号，三项全部变号：x 平方变负 x 平方，x 变负 x，负 3 变正 3。然后合并同类项：x 平方项系数 3 减 1 等于 2；x 项系数负 2 减 1 等于负 3；常数项 1 加 3 等于 4。结果：2x 平方减 3x 加 4。整式加减两步缺一不可！',
        enter: function (anim) {
          S.remove('s3-title3'); S.remove('s3-q3-expr');
          S.remove('s3-d3-1'); S.remove('s3-d3-1v'); S.remove('s3-d3-note');
          S.remove('s3-d3-2'); S.remove('s3-d3-2v'); S.remove('s3-ans3');

          S.actor('s3-title4', 0, 9.0, '第四步：综合整式加减', { color: ORANGE, size: 19, bold: true });
          S.actor('s3-q4-expr', 0, 7.5, '化简 $(3x^{2} - 2x + 1) - (x^{2} + x - 3)$', { color: INK, size: 17 });

          if (!anim) {
            S.actor('s3-d4-1label', 0, 6.0, '去括号（红色：第二括号三项全变号）：', { color: RED, size: 14 });
            S.actor('s3-d4-1v', 0, 4.8, '$3x^{2} - 2x + 1 - x^{2} - x + 3$', { color: WARM, size: 16 });
            S.actor('s3-d4-2label', 0, 3.5, '配对合并同类项：', { color: ORANGE, size: 14 });
            S.actor('s3-d4-2v', 0, 2.3, '$(3-1)x^{2} + (-2-1)x + (1+3)$', { color: ORANGE, size: 16 });
            S.actor('s3-ans4', 0, 0.8, '结果：$2x^{2} - 3x + 4$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule4', 0, -0.7, '整式加减 = 去括号 + 合并同类项，两步缺一不可', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>综合整式加减</b><br>' +
              '$(3x^{2} - 2x + 1) - (x^{2} + x - 3)$<br>' +
              '$= 3x^{2} - 2x + 1 - x^{2} - x + 3$<br>' +
              '$= 2x^{2} - 3x + 4$',
              'cool'
            );
            return null;
          }

          return delay(400).then(function () {
            S.actor('s3-d4-1label', 0, 6.0, '去括号（红色：第二括号三项全变号）：', { color: RED, size: 14 });
            S.actor('s3-d4-1v', 0, 4.8, '$3x^{2} - 2x + 1 - x^{2} - x + 3$', { color: WARM, size: 16 });
            return delay(700);
          }).then(function () {
            S.actor('s3-d4-2label', 0, 3.5, '配对合并同类项：', { color: ORANGE, size: 14 });
            S.actor('s3-d4-2v', 0, 2.3, '$(3-1)x^{2} + (-2-1)x + (1+3)$', { color: ORANGE, size: 16 });
            return delay(700);
          }).then(function () {
            S.actor('s3-ans4', 0, 0.8, '结果：$2x^{2} - 3x + 4$', { color: GREEN, size: 19, bold: true });
            S.actor('s3-rule4', 0, -0.7, '整式加减 = 去括号 + 合并同类项，两步缺一不可', { color: TEAL, size: 14 });
            P.renderCard(
              '<b>综合整式加减</b><br>' +
              '$(3x^{2} - 2x + 1) - (x^{2} + x - 3)$<br>' +
              '$= 3x^{2} - 2x + 1 - x^{2} - x + 3$<br>' +
              '$= 2x^{2} - 3x + 4$',
              'cool'
            );
            return delay(400);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
