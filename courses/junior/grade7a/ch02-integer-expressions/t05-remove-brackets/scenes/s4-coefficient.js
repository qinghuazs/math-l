// s4-coefficient.js  四、带数字因数——分配律延伸（3步）
// 数学验算：3(a-b) = 3×a + 3×(-b) = 3a - 3b ✓
//           -2(x-y) = (-2)×x + (-2)×(-y) = -2x + 2y ✓（负负得正）
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、带数字因数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示两式，处理 3(a-b)——雨露箭头
      {
        narration: '现在括号前有数字因数。先看 3 乘括号 a 减 b。乘法分配律：3 分别雨露均沾，射向括号里每一项。箭头一：3 乘以 a 等于 3a；箭头二：3 乘以负 b 等于负 3b。结果：3(a-b) 等于 3a 减 3b。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.0, '带数字因数的去括号', { color: TEAL, size: 20, bold: true });

          // 两式展示
          S.actor('s4-expr1-orig', -5, 5.4, '$3(a-b)$', { color: COOL, size: 24, bold: true });
          S.actor('s4-expr2-orig',  5, 5.4, '$-2(x-y)$', { color: RED, size: 24, bold: true });
          S.actor('s4-focus',       0, 4.0, '先看左边：', { color: INK, size: 18 });

          // 3(a-b) 展开
          S.actor('s4-dist1-title', -5, 2.6, '乘法分配律', { color: TEAL, size: 16 });
          S.actor('s4-dist1-a', -5, 1.4, '$3 \\times a = 3a$', { color: COOL, size: 18 });
          S.actor('s4-dist1-b', -5, 0.0, '$3 \\times (-b) = -3b$', { color: COOL, size: 18 });
          S.addSegment('s4-sep1', [-8.5, -0.8], [-1.5, -0.8], { color: COOL, width: 1, dash: 2 });
          S.actor('s4-res1', -5, -1.9, '$3(a-b) = 3a - 3b$', { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>$3(a-b)$ 展开</b><br>' +
            '$3\\times a = 3a$<br>' +
            '$3\\times(-b) = -3b$<br>' +
            '结果：$3(a-b) = 3a-3b$<br>' +
            '因数 3 雨露均沾，每项都乘！'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 2：处理 -2(x-y)，强调负负得正
      {
        narration: '再看右边：负 2 乘括号 x 减 y。负 2 也要雨露均沾！箭头一：负 2 乘以 x 等于负 2x，注意符号是负；箭头二：负 2 乘以负 y，负负得正，等于正 2y！这是有理数乘法在字母运算中的直接体现，千万别漏符号！',
        enter: function (anim) {
          S.remove('s4-focus');
          S.actor('s4-focus2', 5, 4.0, '再看右边：', { color: INK, size: 18 });

          // -2(x-y) 展开
          S.actor('s4-dist2-title', 5, 2.6, '乘法分配律', { color: TEAL, size: 16 });
          S.actor('s4-dist2-x', 5, 1.4, '$(-2)\\times x = -2x$', { color: RED, size: 18 });
          S.actor('s4-dist2-y', 5, 0.0, '$(-2)\\times(-y) = +2y$', { color: GREEN, size: 18 });
          S.actor('s4-neg-tip', 5, -0.9, '负负得正！', { color: ORANGE, size: 16, bold: true });
          S.addSegment('s4-sep2', [1.5, -1.5], [8.5, -1.5], { color: RED, width: 1, dash: 2 });
          S.actor('s4-res2', 5, -2.5, '$-2(x-y) = -2x + 2y$', { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>$-2(x-y)$ 展开</b><br>' +
            '$(-2)\\times x = -2x$（正变负）<br>' +
            '$(-2)\\times(-y) = +2y$（<b>负负得正</b>！）<br>' +
            '结果：$-2(x-y) = -2x+2y$<br>' +
            '负系数带来的正项，不能丢！',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 3：两道当堂练习题展示答案
      {
        narration: '来两道练习，大家先想想。第一道：负 3 乘括号 2a 减 1；第二道：5 乘括号 x 加 2y 减 1。答案揭晓：第一道，负 3 乘 2a 等于负 6a，负 3 乘负 1 等于正 3，结果是负 6a 加 3；第二道，5 乘以每项，结果是 5x 加 10y 减 5。',
        enter: function (anim) {
          S.remove('s4-title');
          S.remove('s4-expr1-orig'); S.remove('s4-expr2-orig');
          S.remove('s4-dist1-title'); S.remove('s4-dist1-a'); S.remove('s4-dist1-b');
          S.remove('s4-sep1'); S.remove('s4-res1');
          S.remove('s4-focus2');
          S.remove('s4-dist2-title'); S.remove('s4-dist2-x'); S.remove('s4-dist2-y');
          S.remove('s4-neg-tip'); S.remove('s4-sep2'); S.remove('s4-res2');

          S.actor('s4-prac-title', 0, 7.0, '当堂练习——展开下列各式', { color: TEAL, size: 20, bold: true });

          S.actor('s4-prac1-q', -5, 5.2, '（1）$-3(2a-1)$', { color: INK, size: 20 });
          S.actor('s4-prac1-a', -5, 3.8,
            '$= (-3)\\times 2a + (-3)\\times(-1)$',
            { color: COOL, size: 16 });
          S.actor('s4-prac1-r', -5, 2.6, '$= -6a + 3$', { color: WARM, size: 22, bold: true });

          S.actor('s4-prac2-q', 5, 5.2, '（2）$5(x+2y-1)$', { color: INK, size: 20 });
          S.actor('s4-prac2-a', 5, 3.8,
            '$= 5\\times x + 5\\times 2y + 5\\times(-1)$',
            { color: COOL, size: 14 });
          S.actor('s4-prac2-r', 5, 2.6, '$= 5x + 10y - 5$', { color: WARM, size: 22, bold: true });

          S.actor('s4-prac-tip', 0, 0.8,
            '每项都乘，不能漏；负系数遇负项，负负得正！',
            { color: RED, size: 18 });

          P.renderCard(
            '<b>练习答案</b><br>' +
            '（1）$-3(2a-1) = -6a+3$<br>' +
            '（2）$5(x+2y-1) = 5x+10y-5$<br>' +
            '关键：每项都乘，不漏项；<br>' +
            '负系数遇负项，<b>负负得正</b>！',
            'cool'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
