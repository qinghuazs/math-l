// s2-rule.js  环节二：去括号法则回顾（3步）
// 衔接第2章：+(a+b)=a+b（保号）；-(a+b)=-a-b（全变号）
// 数学验算：-(x+2)=-x-2（两项都变号）；-(3x-5)=-3x+5（两项都变号，-(-5)=+5）
// 红色反例：-(x+2)=-x+2 是错误的（只改了第一项）
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', RED = '#c62828', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、去括号法则回顾',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '去括号法则我们在第二章整式加减里学过，今天先回顾一下。括号前是正号，括号内各项符号不变；括号前是负号，括号内每一项符号全部改变——注意是每一项，一个都不能少！',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.5, '去括号法则（衔接第二章）', { color: COOL, size: 21, bold: true });
          S.actor('s2-rule1-label', -5, 4.5, '正号括号：各项保号', { color: TEAL, size: 18, bold: true });
          S.actor('s2-rule1-ex', -5, 3.0, '$+(x+2) = x+2$', { color: TEAL, size: 22 });
          S.actor('s2-rule2-label', 3, 4.5, '负号括号：各项全变号', { color: WARM, size: 18, bold: true });
          S.actor('s2-rule2-ex', 3, 3.0, '$-(x+2) = -x-2$', { color: WARM, size: 22 });
          P.renderCard(
            '<b>法则核心</b>：<br>' +
            '括号前是 $+$ 号 → 各项符号<b>不变</b><br>' +
            '括号前是 $-$ 号 → 各项符号<b>全部改变</b>'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        narration: '来一道口头判断：$-(3x-5)$ 展开是 $-3x+5$ 还是 $-3x-5$？——是 $-3x+5$！因为负号括号内每项都变号：$3x$ 变成 $-3x$，$-5$ 变成 $+5$，负负得正就是 $+5$。注意：两项都要变，不能只变第一项！',
        enter: function (anim) {
          S.remove('s2-rule1-label'); S.remove('s2-rule1-ex');
          S.remove('s2-rule2-label'); S.remove('s2-rule2-ex');
          S.actor('s2-q', 0, 5.5, '判断：$-(3x-5)$ 展开结果是？', { color: INK, size: 20 });
          S.actor('s2-wrong', -4, 3.2, '$-(3x-5) = -3x-5$', { color: RED, size: 22 });
          S.actor('s2-wrong-mark', -4, 2.0, '✗  第二项漏变号', { color: RED, size: 16 });
          S.actor('s2-right', 4, 3.2, '$-(3x-5) = -3x+5$', { color: GREEN, size: 22 });
          S.actor('s2-right-mark', 4, 2.0, '✓  两项都变号', { color: GREEN, size: 16 });
          P.renderCard(
            '$-(3x-5)$：括号前是负号，两项都要变：<br>' +
            '$3x$ → $-3x$（正变负）；$-5$ → $+5$（负变正）<br>' +
            '结果：$-3x+5$',
            'warm'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        narration: '最后看一个规则对比表，记住正反两种情况。然后特别警示：红色这边是最常见的错误——负号括号只改了第一项，第二项忘了改。这个陷阱本节例题里就会遇到，现在脑子里先打上一个红色警报！',
        enter: function (anim) {
          S.remove('s2-q'); S.remove('s2-wrong'); S.remove('s2-wrong-mark');
          S.remove('s2-right'); S.remove('s2-right-mark');
          P.renderTable({
            head: ['括号前符号', '去括号规则', '示例'],
            rows: [
              ['正号 $+$', '各项符号不变', '$+(a+b)=a+b$'],
              ['负号 $-$', '各项符号全部改变', '$-(a+b)=-a-b$'],
            ],
          });
          S.actor('s2-warn', 0, 3.5, '警戒：$-(x+2)=-x-2$ ✓', { color: GREEN, size: 20 });
          S.actor('s2-err', 0, 2.0, '错误：$-(x+2)=-x+2$ ✗（只改了第一项）', { color: RED, size: 18 });
          P.renderCard(
            '<b>牢记口诀</b>：括号前是减号，括号内<b>每一项</b>都要变号，一个都不能少！',
            'warm',
            'headShake'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
