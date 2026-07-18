// s2-define.js  二、同类项：两同两无关（4步）
// 知识点：①定义（两同：字母相同+各字母指数分别相同）；②两无关（与系数无关、与字母顺序无关）
//         ③常数项互为同类项；④反例 x 与 x²（指数不同）
// 数学验算：3x²y 与 -5yx²：x指数均为2，y指数均为1 → 是同类项
//           x（指数1）与 x²（指数2） → 非同类项
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、同类项：两同两无关',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义 + 两同两无关口诀
      {
        narration: '好，我们来学同类项的正式定义。人教版的定义是：在多项式中，所含字母相同，且相同字母的指数也分别相同的项，叫做同类项。所有常数项都是同类项。我们把这个定义压缩成一句口诀：两同两无关——两同是：字母种类相同、各字母指数分别相同；两无关是：与系数无关、与字母书写顺序无关。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '二、同类项定义', { color: COOL, size: 22, bold: true });

          S.actor('s2-def1', 0, 5.5,
            '定义：所含字母相同，且相同字母的指数也分别相同的项',
            { color: INK, size: 15 });
          S.actor('s2-def2', 0, 4.6, '叫做同类项。所有常数项都是同类项。', { color: INK, size: 15 });

          S.actor('s2-slogan', 0, 3.0, '口诀：两同两无关', { color: WARM, size: 22, bold: true });

          S.actor('s2-two1', -5, 1.5, '两同：', { color: TEAL, size: 17, bold: true });
          S.actor('s2-two1a', -1, 1.5, '① 字母种类相同', { color: TEAL, size: 16 });
          S.actor('s2-two1b', -1, 0.5, '② 各字母指数分别相同', { color: TEAL, size: 16 });

          S.actor('s2-two2', -5, -1.0, '两无关：', { color: COOL, size: 17, bold: true });
          S.actor('s2-two2a', -1, -1.0, '与系数无关', { color: COOL, size: 16 });
          S.actor('s2-two2b', -1, -2.0, '与字母书写顺序无关', { color: COOL, size: 16 });

          P.renderCard(
            '<b>同类项口诀：两同两无关</b><br>' +
            '两同：字母种类相同 + 各字母指数分别相同<br>' +
            '两无关：与系数无关、与字母书写顺序无关<br>' +
            '特例：<b>所有常数项互为同类项</b>'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 2：辨析 3x²y 与 -5yx²（字母顺序无关）
      {
        narration: '现在来看一个经典辨析题：3x²y 与负 5yx² 是不是同类项？有同学看到字母顺序不同——一个是 xy，一个是 yx——就觉得不是同类项，这是错的！我们逐项对照：两项都含字母 x 和 y；第一项 x 的指数是 2，y 的指数是 1；第二项 x 的指数也是 2，y 的指数也是 1。两同全满足，与系数 3 和负 5 无关，与书写顺序无关——结论：是同类项！',
        enter: function (anim) {
          S.remove('s2-def1'); S.remove('s2-def2');
          S.remove('s2-slogan');
          S.remove('s2-two1'); S.remove('s2-two1a'); S.remove('s2-two1b');
          S.remove('s2-two2'); S.remove('s2-two2a'); S.remove('s2-two2b');

          S.actor('s2-q', 0, 5.5,
            '$3x^2y$ 与 $-5yx^2$ 是同类项吗？',
            { color: INK, size: 20, bold: true });

          S.actor('s2-p1', -5, 3.5, '$3x^2y$', { color: WARM, size: 28, bold: true });
          S.actor('s2-p2', 5, 3.5, '$-5yx^2$', { color: COOL, size: 28, bold: true });

          S.actor('s2-c-x1', -5, 2.0, '$x$ 指数：2', { color: WARM, size: 16 });
          S.actor('s2-c-y1', -5, 1.0, '$y$ 指数：1', { color: WARM, size: 16 });
          S.actor('s2-c-x2', 5, 2.0, '$x$ 指数：2', { color: COOL, size: 16 });
          S.actor('s2-c-y2', 5, 1.0, '$y$ 指数：1', { color: COOL, size: 16 });

          S.actor('s2-c-same', 0, -0.5,
            '字母相同 ✓　各指数分别相同 ✓',
            { color: TEAL, size: 17 });
          S.actor('s2-c-coef', 0, -1.8,
            '系数 3 与 -5：无关 ✓　顺序 $x^2y$ 与 $yx^2$：无关 ✓',
            { color: TEAL, size: 16 });
          S.actor('s2-c-yes', 0, -3.2,
            '结论：是同类项！',
            { color: GREEN, size: 22, bold: true });

          P.renderCard(
            '<b>辨析：$3x^2y$ 与 $-5yx^2$</b><br>' +
            '字母种类：都含 $x$ 和 $y$ ✓<br>' +
            '$x$ 指数：均为 2 ✓　$y$ 指数：均为 1 ✓<br>' +
            '系数（3 和 -5）不影响判断，书写顺序不影响判断。<br>' +
            '<b>是同类项！</b>',
            'teal'
          );

          return anim ? delay(500) : null;
        },
      },

      // Step 3：常数项互为同类项
      {
        narration: '接下来是一个特别规定：所有常数项都互为同类项。比如 3 和负 7，都是常数项，它们可以合并：3 加上负 7 等于负 4。但要注意：3 和 3x 不是同类项！3 没有字母，3x 含字母 x——一个有字母一个没有，绝对不能合并。',
        enter: function (anim) {
          S.remove('s2-q');
          S.remove('s2-p1'); S.remove('s2-p2');
          S.remove('s2-c-x1'); S.remove('s2-c-y1');
          S.remove('s2-c-x2'); S.remove('s2-c-y2');
          S.remove('s2-c-same'); S.remove('s2-c-coef'); S.remove('s2-c-yes');

          S.actor('s2-const-title', 0, 5.5,
            '特例：所有常数项互为同类项',
            { color: WARM, size: 19, bold: true });

          S.actor('s2-const-ex', 0, 3.8,
            '$3$ 与 $-7$：均为常数项，是同类项',
            { color: GREEN, size: 18 });
          S.actor('s2-const-merge', 0, 2.6,
            '$3 + (-7) = -4$',
            { color: GREEN, size: 20, bold: true });

          S.addSegment('s2-div', [-7, 1.5], [7, 1.5], { color: GRAY, width: 1, dash: 2 });

          S.actor('s2-const-no', 0, 0.5,
            '反例：$3$ 与 $3x$',
            { color: RED, size: 18, bold: true });
          S.actor('s2-const-no2', 0, -0.7,
            '$3$ 无字母，$3x$ 含字母 $x$',
            { color: RED, size: 17 });
          S.actor('s2-const-no3', 0, -2.0,
            '不是同类项，不能合并！',
            { color: RED, size: 18, bold: true });

          P.renderCard(
            '<b>常数项互为同类项</b><br>' +
            '$3$ 与 $-7$：都是常数项 → 是同类项 → $3+(-7)=-4$<br>' +
            '<b>反例：$3$ 与 $3x$ 不是同类项</b><br>' +
            '含字母项与常数项永远不是同类项，不能合并！',
            'warm'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 4：关键反例 x 与 x²（指数不同）+ 判断汇总表
      {
        narration: '最后看一个关键反例：x 和 x²，字母都是 x，能合并吗？不能！因为 x 的指数是 1，x² 的指数是 2，指数不同！"两同"缺一不可——字母种类要同，各字母指数也必须分别相同。我们看一张汇总表，把常见的判断一网打尽。',
        enter: function (anim) {
          S.remove('s2-const-title');
          S.remove('s2-const-ex'); S.remove('s2-const-merge');
          S.remove('s2-div');
          S.remove('s2-const-no'); S.remove('s2-const-no2'); S.remove('s2-const-no3');

          S.actor('s2-vs', 0, 6.5,
            '$x$（指数1）与 $x^2$（指数2）',
            { color: INK, size: 20, bold: true });
          S.actor('s2-vs2', 0, 5.3,
            '字母相同，但 $x$ 指数 1 ≠ 2，不是同类项！',
            { color: RED, size: 18 });

          P.renderTable({
            head: ['式子对', '字母是否同', '指数是否同', '结论'],
            rows: [
              ['$3x^2y$ 与 $-5yx^2$', '✓', '✓', '同类项'],
              ['$2ab$ 与 $3ba$', '✓', '✓', '同类项'],
              ['$2x^2$ 与 $2x$', '✓', '✗', '非同类项'],
              ['$3$ 与 $-7$', '均无字母', '—', '同类项'],
              ['$-2mn^2$ 与 $3m^2n$', '✓', '✗', '非同类项'],
            ],
          });

          P.renderCard(
            '<b>$x$ 与 $x^2$ 不是同类项！</b><br>' +
            '字母相同，但指数 $1 \\neq 2$，"两同"不全满足。<br>' +
            '判断口诀：<b>两同两无关，缺一不可！</b>',
            'cool'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
