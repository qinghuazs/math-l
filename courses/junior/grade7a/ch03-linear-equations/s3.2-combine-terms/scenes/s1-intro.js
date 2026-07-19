// s1-intro.js  环节一：三年买电脑——情境建立与翻倍表达（3步）
// 数学验算：前年x台，后年2x台，大后年4x台；x+2x+4x=7x，7x=140时x=20；验算20+40+80=140 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var PURPLE = '#6a1b9a', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、三年买电脑',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：情境呈现——三张卡片落入，制造悬念
      {
        narration: '同学们好！先看一道生活情境题：某校三年共购买了 140 台计算机，而且每年购买的数量是前一年的 2 倍——这叫"翻倍"。问：前年、后年、大后年各买了多少台？先思考一下，三年的台数可以用三张卡片来表示。',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.8, '情境：三年购买计算机', { color: COOL, size: 22, bold: true });

          if (!anim) {
            S.actor('s1-y1', -6, 2.5, '前年', { color: INK, size: 20, bold: true });
            S.actor('s1-y1v', -6, 0.8, '？台', { color: GRAY, size: 26, bold: true });
            S.actor('s1-y2', 0, 2.5, '后年', { color: INK, size: 20, bold: true });
            S.actor('s1-y2v', 0, 0.8, '？台', { color: GRAY, size: 26, bold: true });
            S.actor('s1-y3', 6, 2.5, '大后年', { color: INK, size: 20, bold: true });
            S.actor('s1-y3v', 6, 0.8, '？台', { color: GRAY, size: 26, bold: true });
            S.actor('s1-total', 0, -1.5, '三年共 140 台，每年翻倍', { color: WARM, size: 19 });
            P.renderCard('题目：某校三年共购买计算机 <b>140 台</b>，每年购买数量是前一年的 <b>2 倍</b>。<br>设前年购买 $x$ 台，各年分别是多少台？');
            return Promise.resolve();
          }

          // 动画：三张卡片依次落入
          var c1 = S.actor('s1-y1', -6, 9, '前年', { color: INK, size: 20, bold: true });
          var v1 = S.actor('s1-y1v', -6, 9, '？台', { color: GRAY, size: 26, bold: true });
          var c2 = S.actor('s1-y2', 0, 9, '后年', { color: INK, size: 20, bold: true });
          var v2 = S.actor('s1-y2v', 0, 9, '？台', { color: GRAY, size: 26, bold: true });
          var c3 = S.actor('s1-y3', 6, 9, '大后年', { color: INK, size: 20, bold: true });
          var v3 = S.actor('s1-y3v', 6, 9, '？台', { color: GRAY, size: 26, bold: true });

          return c1.moveTo(-6, 2.5, 500).then(function () {
            return v1.moveTo(-6, 0.8, 400);
          }).then(function () {
            return c2.moveTo(0, 2.5, 500);
          }).then(function () {
            return v2.moveTo(0, 0.8, 400);
          }).then(function () {
            return c3.moveTo(6, 2.5, 500);
          }).then(function () {
            return v3.moveTo(6, 0.8, 400);
          }).then(function () {
            S.actor('s1-total', 0, -1.5, '三年共 140 台，每年翻倍', { color: WARM, size: 19 });
            P.renderCard('题目：某校三年共购买计算机 <b>140 台</b>，每年购买数量是前一年的 <b>2 倍</b>。<br>设前年购买 $x$ 台，各年分别是多少台？');
            return delay(300);
          });
        },
      },

      // Step 2：翻倍关系代数化——x、2x、4x 逐步浮现
      {
        narration: '现在我们用字母来表达。设前年购买 x 台。"翻倍"的意思就是乘以 2——所以后年是 x 乘以 2，写成 2x 台；大后年又翻一倍，是 2x 再乘以 2，等于 4x 台。注意：翻倍不是加 1 或加 2，而是乘以 2！',
        enter: function (anim) {
          // 替换"？台"为代数式
          S.remove('s1-y1v'); S.remove('s1-y2v'); S.remove('s1-y3v');

          if (!anim) {
            S.actor('s1-e1', -6, 0.8, '$x$ 台', { color: PURPLE, size: 26, bold: true });
            S.actor('s1-e2', 0, 0.8, '$2x$ 台', { color: WARM, size: 26, bold: true });
            S.actor('s1-e3', 6, 0.8, '$4x$ 台', { color: COOL, size: 26, bold: true });
            S.actor('s1-arrow1', -3, -0.2, '× 2', { color: GRAY, size: 17 });
            S.actor('s1-arrow2', 3, -0.2, '× 2', { color: GRAY, size: 17 });
            S.actor('s1-explain', 0, -3.2,
              '翻倍 = 乘以 2，不是加 1！', { color: WARM, size: 18 });
            P.renderCard(
              '<b>翻倍关系</b><br>' +
              '前年：$x$ 台<br>' +
              '后年：$x \\times 2 = 2x$ 台<br>' +
              '大后年：$2x \\times 2 = 4x$ 台<br>' +
              '注意：翻倍 = 乘以 2，不是加 1 或加 2！'
            );
            return Promise.resolve();
          }

          var a1 = S.actor('s1-e1', -6, 9, '$x$ 台', { color: PURPLE, size: 26, bold: true });
          return a1.moveTo(-6, 0.8, 500).then(function () {
            S.actor('s1-arrow1', -3, -0.2, '× 2', { color: GRAY, size: 17 });
            var a2 = S.actor('s1-e2', 0, 9, '$2x$ 台', { color: WARM, size: 26, bold: true });
            return a2.moveTo(0, 0.8, 500);
          }).then(function () {
            S.actor('s1-arrow2', 3, -0.2, '× 2', { color: GRAY, size: 17 });
            var a3 = S.actor('s1-e3', 6, 9, '$4x$ 台', { color: COOL, size: 26, bold: true });
            return a3.moveTo(6, 0.8, 500);
          }).then(function () {
            S.actor('s1-explain', 0, -3.2,
              '翻倍 = 乘以 2，不是加 1！', { color: WARM, size: 18 });
            P.renderCard(
              '<b>翻倍关系</b><br>' +
              '前年：$x$ 台<br>' +
              '后年：$x \\times 2 = 2x$ 台<br>' +
              '大后年：$2x \\times 2 = 4x$ 台<br>' +
              '注意：翻倍 = 乘以 2，不是加 1 或加 2！'
            );
            return delay(300);
          });
        },
      },

      // Step 3：总量模型，列出方程
      {
        narration: '现在用"总量等于各部分之和"这个数量模型来列方程。三年购买台数的总和是 140 台，就是：前年的 x，加上后年的 2x，加上大后年的 4x，等于 140。这就是我们这节课要解的方程——左边有三项都含 x！',
        enter: function (anim) {
          S.remove('s1-explain');
          S.actor('s1-model-lbl', 0, -1.8, '总量 = 各部分之和', { color: TEAL, size: 19, bold: true });
          S.actor('s1-eq', 0, -4.0,
            '$x + 2x + 4x = 140$',
            { color: PURPLE, size: 30, bold: true });
          P.renderCard(
            '<b>数量模型：总量 = 各部分之和</b><br>' +
            '$x + 2x + 4x = 140$（前年 + 后年 + 大后年）<br>' +
            '左边三项都含 $x$，是<b>同类项</b>，可以合并！'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
