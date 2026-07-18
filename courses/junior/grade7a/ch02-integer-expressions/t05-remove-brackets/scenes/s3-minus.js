// s3-minus.js  三、-括号——减号前逐项变号动画（4步）
// 数学验算：-(x-3) = (-1)×(x-3) = (-1)×x + (-1)×(-3) = -x + 3 ✓
// 对比表：+(x-3)=x-3（不变号）；-(x-3)=-x+3（都变号）
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
    title: '三、-括号',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示 -(x-3) 与 +(x-3) 对比，引出 (-1) 等价
      {
        narration: '现在括号前换成减号：减号括号 x 减 3。与加号的情形对比一下——减号等于什么？等于乘以负 1！所以 -(x-3) 完全等于 (-1) 乘以 (x-3)。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.0, '减号前去括号——与加号对比', { color: TEAL, size: 20, bold: true });

          S.actor('s3-plus-lab', -5, 5.2, '加号：', { color: COOL, size: 18 });
          S.actor('s3-plus-expr', 1, 5.2, '$+(x-3)$', { color: COOL, size: 22, bold: true });

          S.actor('s3-minus-lab', -5, 3.5, '减号：', { color: RED, size: 18 });
          S.actor('s3-minus-expr', 1, 3.5, '$-(x-3)$', { color: RED, size: 22, bold: true });

          S.actor('s3-arrow', 0, 1.8, '减号 $=$ 乘以 $(-1)$', { color: WARM, size: 20 });
          S.actor('s3-eq1', 0, 0.2, '$-(x-3) = (-1)\\times(x-3)$', { color: INK, size: 22, bold: true });

          P.renderCard(
            '<b>减号等价变形</b><br>' +
            '$-(x-3) = (-1)\\times(x-3)$<br>' +
            '减号 = 乘以 $(-1)$，<br>' +
            '接下来每项都要乘以 $-1$，符号全变！'
          );
          return anim ? delay(400) : null;
        }
      },
      // Step 2：逐项标红变号动画
      {
        narration: '乘法分配律展开：负 1 分别乘以括号里每一项，逐项标红替换。第一项：负 1 乘以 x，等于负 x，原来的 x 变成了负 x。第二项：负 1 乘以负 3，负负得正，等于正 3，原来的负 3 变成了正 3！',
        enter: function (anim) {
          S.remove('s3-arrow'); S.remove('s3-eq1');

          S.actor('s3-dist-title', 0, 6.8, '逐项乘以 $(-1)$', { color: TEAL, size: 20, bold: true });
          S.actor('s3-dist-left', 0, 5.3, '$(-1) \\times (x-3)$', { color: INK, size: 24, bold: true });

          // 第一项：x → -x
          S.actor('s3-item1-before', -4.5, 3.5, '$x$（原）', { color: GRAY, size: 18 });
          S.actor('s3-item1-op',     -0.5, 3.5, '$(-1)\\times x$', { color: RED, size: 20 });
          S.actor('s3-item1-eq',      2.5, 3.5, '$=$', { color: INK, size: 18 });
          S.actor('s3-item1-res',     4.5, 3.5, '$-x$', { color: WARM, size: 24, bold: true });

          // 第二项：-3 → +3
          S.actor('s3-item2-before', -4.5, 1.8, '$-3$（原）', { color: GRAY, size: 18 });
          S.actor('s3-item2-op',     -0.5, 1.8, '$(-1)\\times(-3)$', { color: RED, size: 20 });
          S.actor('s3-item2-eq',      2.5, 1.8, '$=$', { color: INK, size: 18 });
          S.actor('s3-item2-res',     4.5, 1.8, '$+3$', { color: GREEN, size: 24, bold: true });

          S.addSegment('s3-sep', [-7, 0.8], [7, 0.8], { color: INK, width: 1, dash: 2 });

          S.actor('s3-result-lab', -3, -0.4, '结果：', { color: INK, size: 20 });
          S.actor('s3-result',      2, -0.4, '$-x+3$', { color: WARM, size: 28, bold: true });

          P.renderCard(
            '<b>逐项变号</b><br>' +
            '$(-1)\\times x = -x$（正变负）<br>' +
            '$(-1)\\times(-3) = +3$（负变正，负负得正！）<br>' +
            '结果：$-(x-3) = -x+3$',
            'warm'
          );
          return anim ? delay(600) : null;
        }
      },
      // Step 3：对比表
      {
        narration: '来看对比表，加号和减号的结果放在一起。+(x-3) 等于 x-3，各项不变号；-(x-3) 等于 -x+3，各项都变号。两条法则的差别，就在于括号前符号的那个正负！',
        enter: function (anim) {
          S.remove('s3-title'); S.remove('s3-plus-lab'); S.remove('s3-plus-expr');
          S.remove('s3-minus-lab'); S.remove('s3-minus-expr');
          S.remove('s3-dist-title'); S.remove('s3-dist-left');
          S.remove('s3-item1-before'); S.remove('s3-item1-op'); S.remove('s3-item1-eq'); S.remove('s3-item1-res');
          S.remove('s3-item2-before'); S.remove('s3-item2-op'); S.remove('s3-item2-eq'); S.remove('s3-item2-res');
          S.remove('s3-sep'); S.remove('s3-result-lab'); S.remove('s3-result');

          P.renderTable({
            head: ['类型', '展开结果', '符号变化'],
            rows: [
              ['$+(x-3)$', '$x-3$', '各项<b>不变号</b>'],
              ['$-(x-3)$', '$-x+3$', '各项<b>都变号</b>']
            ]
          });

          S.actor('s3-tab-title', 0, 7.0, '加减号去括号对比', { color: TEAL, size: 22, bold: true });
          S.actor('s3-tab-hint', 0, 5.5,
            '括号前符号决定变不变——加号不变，减号全变！',
            { color: WARM, size: 19 });

          return anim ? delay(400) : null;
        }
      },
      // Step 4：法则二提炼
      {
        narration: '提炼法则二：括号前是减号，去掉括号后，括号内各项符号都改变。记住：有几项，就变几项，一个都不能漏！这是本节的头号重点，也是头号易错点。',
        enter: function (anim) {
          S.remove('s3-tab-title'); S.remove('s3-tab-hint');

          S.actor('s3-rule2-banner', 0, 6.8, '【法则二】', { color: WARM, size: 24, bold: true });
          S.actor('s3-rule2-text', 0, 5.3,
            '括号前是"−"，去掉括号后各项符号都改变',
            { color: INK, size: 20 });
          S.actor('s3-rule2-ex1', 0, 3.6,
            '$-(x-3) = -x+3$',
            { color: WARM, size: 24, bold: true });
          S.actor('s3-rule2-ex2', 0, 2.0,
            '$-(2a-3b+c) = -2a+3b-c$',
            { color: RED, size: 20 });
          S.actor('s3-rule2-warn', 0, 0.2,
            '三项全变，一个都不能漏！',
            { color: RED, size: 20, bold: true });

          P.renderCard(
            '<b>法则二</b><br>' +
            '括号前是"−"：去掉括号，各项符号都改变。<br>' +
            '示例：$-(2a-3b+c) = -2a+3b-c$<br>' +
            '<b>有几项就变几项，一个都不漏！</b>',
            'warm'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
