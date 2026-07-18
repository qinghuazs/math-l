// s2-plus.js  二、+括号——加号前去括号推导（3步）
// 数学验算：+(x-3) = (+1)×(x-3) = (+1)×x + (+1)×(-3) = x + (-3) = x - 3 ✓
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
    title: '二、+括号',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示 +(x-3)，等价于 (+1)×(x-3)
      {
        narration: '聚焦最简情形：加号括号 x 减 3。加号等于什么？等于加 1 乘以——有理数运算里，正号就是正 1 的乘号！所以 +(x-3) 完全等于 (+1) 乘以 (x-3)。',
        enter: function (anim) {
          S.actor('s2-step1-label', 0, 6.2, '推导加号括号', { color: TEAL, size: 20, bold: true });
          S.actor('s2-expr-orig', 0, 4.2, '$+(x-3)$', { color: INK, size: 30, bold: true });
          S.actor('s2-arrow1', 0, 2.8, '$=$', { color: INK, size: 26 });
          S.actor('s2-expr-eq', 0, 1.2, '$(+1) \\times (x-3)$', { color: COOL, size: 26, bold: true });
          S.actor('s2-hint', 0, -0.8, '加号 = 乘以 $(+1)$，这是关键！', { color: WARM, size: 18 });

          P.renderCard(
            '<b>关键等价</b><br>' +
            '$+(x-3) = (+1) \\times (x-3)$<br>' +
            '加号前面等价于乘以 $+1$，<br>' +
            '接下来用乘法分配律展开！'
          );
          return anim ? delay(400) : null;
        }
      },
      // Step 2：乘法分配律展开，雨露双箭头
      {
        narration: '用乘法分配律展开：(+1) 分别乘以括号里的每一项。箭头一：(+1) 乘以 x，等于正 x；箭头二：(+1) 乘以负 3，等于负 3。结果：x 减 3。各项符号完全不变！',
        enter: function (anim) {
          S.remove('s2-hint');
          S.remove('s2-arrow1');
          S.remove('s2-expr-orig');
          S.remove('s2-step1-label');
          S.remove('s2-expr-eq');

          S.actor('s2-dist-title', 0, 6.8, '乘法分配律展开', { color: TEAL, size: 20, bold: true });
          S.actor('s2-dist-left', 0, 5.2, '$(+1) \\times (x-3)$', { color: COOL, size: 26, bold: true });

          // 展开行
          S.actor('s2-line1-label', -4, 3.2, '$(+1) \\times x$', { color: COOL, size: 19 });
          S.actor('s2-line1-eq',    0, 3.2, '$=$', { color: INK, size: 18 });
          S.actor('s2-line1-res',   3, 3.2, '$+x$', { color: GREEN, size: 22, bold: true });

          S.actor('s2-line2-label', -4, 1.5, '$(+1) \\times (-3)$', { color: COOL, size: 19 });
          S.actor('s2-line2-eq',    0, 1.5, '$=$', { color: INK, size: 18 });
          S.actor('s2-line2-res',   3, 1.5, '$-3$', { color: GREEN, size: 22, bold: true });

          S.addSegment('s2-sep', [-6, 0.4], [6, 0.4], { color: INK, width: 1, dash: 2 });

          S.actor('s2-result-label', -3, -0.8, '结果：', { color: INK, size: 18 });
          S.actor('s2-result',       2, -0.8, '$x - 3$', { color: WARM, size: 26, bold: true });

          P.renderCard(
            '<b>分配律展开</b><br>' +
            '$(+1) \\times x = +x$<br>' +
            '$(+1) \\times (-3) = -3$<br>' +
            '结果：$+(x-3) = x-3$<br>' +
            '各项符号<b>完全不变</b>！'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 3：法则提炼
      {
        narration: '总结法则一：括号前是加号，去掉括号后，括号内各项符号不变。道理很简单——加号等于乘以正 1，正 1 乘以任何数都不改变符号。',
        enter: function (anim) {
          S.remove('s2-dist-title'); S.remove('s2-dist-left');
          S.remove('s2-line1-label'); S.remove('s2-line1-eq'); S.remove('s2-line1-res');
          S.remove('s2-line2-label'); S.remove('s2-line2-eq'); S.remove('s2-line2-res');
          S.remove('s2-sep');
          S.remove('s2-result-label'); S.remove('s2-result');

          S.actor('s2-rule-banner', 0, 6.2, '【法则一】', { color: WARM, size: 24, bold: true });
          S.actor('s2-rule-text', 0, 4.5,
            '括号前是"+"，去掉括号后各项符号不变',
            { color: INK, size: 20 });
          S.actor('s2-rule-example', 0, 2.6,
            '$+(x-3) = x-3$',
            { color: COOL, size: 26, bold: true });
          S.actor('s2-rule-why', 0, 0.6,
            '因为：$(+1) \\times$ 任何数，符号不变',
            { color: TEAL, size: 18 });

          P.renderCard(
            '<b>法则一</b><br>' +
            '括号前是"+"：去掉括号，各项符号不变。<br>' +
            '示例：$+(x-3) = x-3$<br>' +
            '依据：$(+1)\\times$ 任何数，符号不变。',
            'cool'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
