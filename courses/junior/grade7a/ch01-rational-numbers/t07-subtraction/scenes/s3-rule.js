// s3-rule.js  三、减法变加法的"两变"（3步）
// 数学验算：
//   法则：a - b = a + (-b)
//   口练：(-3)-(-5) = (-3)+(+5) = 2 ✓；0-7 = 0+(-7) = -7 ✓
//   错例：4-(-3) 错算成 4-3=1（只变减数变相反数，减号未变）✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、减法变加法的"两变"',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：法则框
      {
        narration: '把我们刚才的发现提炼成法则。有理数减法法则：减去一个数，等于加上这个数的相反数。用字母表示就是：a 减 b，等于 a 加上 b 的相反数，即 a 减 b 等于 a 加上负 b。这条法则的妙处在于：减法没有新法则，它把自己变成了加法！',
        enter: function (anim) {
          S.actor('s3-rule-title', 0, 7.0, '有理数减法法则', { color: COOL, size: 22, bold: true });

          // 法则框
          S.addPolygon('s3-rule-box',
            [[-7.5, 5.8], [7.5, 5.8], [7.5, 3.2], [-7.5, 3.2]],
            { color: COOL, opacity: 0.08, borderWidth: 2, borderColor: COOL });

          S.actor('s3-rule-text', 0, 4.8,
            '$a - b = a + (-b)$',
            { color: RED, size: 28, bold: true });

          S.actor('s3-rule-desc', 0, 2.5,
            '减去一个数，等于加上这个数的<b>相反数</b>',
            { color: INK, size: 16 });

          S.actor('s3-insight', 0, 1.2,
            '减法没有新法则——它把自己变成了加法！',
            { color: TEAL, size: 17, bold: true });

          // 具体例子
          S.actor('s3-eg', 0, -0.2,
            '例：$4 - (-3) = 4 + 3 = 7$',
            { color: INK, size: 16 });

          P.renderCard(
            '<b>有理数减法法则</b><br>' +
            '$a - b = a + (-b)$<br>' +
            '减去一个数 = 加上这个数的<b>相反数</b>。<br>' +
            '减法就这样变成了加法！',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：两变箭头动画
      {
        narration: '法则的操作叫"两变"。第一变：减号变加号——把算式里的减号改成加号，标红。第二变：减数变相反数——把减数取相反数，标蓝。两变必须同步，一个都不能少！我们用 4-(-3) 示范一遍。',
        enter: function (anim) {
          S.remove('s3-rule-title');
          S.remove('s3-rule-box');
          S.remove('s3-rule-text');
          S.remove('s3-rule-desc');
          S.remove('s3-insight');
          S.remove('s3-eg');

          S.actor('s3-two-title', 0, 7.0, '"两变"操作演示', { color: COOL, size: 20, bold: true });

          // 原式
          S.actor('s3-orig-lbl', 0, 5.5, '原式：', { color: INK, size: 15 });
          S.actor('s3-orig', 0, 4.3,
            '$4 \\ - \\ (-3)$',
            { color: INK, size: 26 });

          // 第一变：减号变加号（红）
          S.actor('s3-v1-lbl', -4, 2.5,
            '<b style="color:#c62828">第一变</b>：减号变加号',
            { color: INK, size: 16 });
          S.actor('s3-v1-arrow', -4, 1.5, '↓', { color: RED, size: 20 });
          S.actor('s3-v1-result', -4, 0.5,
            '$4 \\ \\boldsymbol{+} \\ (-3)$',
            { color: RED, size: 22 });

          // 第二变：减数变相反数（蓝）
          S.actor('s3-v2-lbl', 4, 2.5,
            '<b style="color:#1565c0">第二变</b>：减数变相反数',
            { color: INK, size: 16 });
          S.actor('s3-v2-arrow', 4, 1.5, '↓', { color: COOL, size: 20 });
          S.actor('s3-v2-result', 4, 0.5,
            '$4 + \\boldsymbol{(+3)}$',
            { color: COOL, size: 22 });

          // 合并结果
          S.actor('s3-final-sep', 0, -0.5, '两变同时完成↓', { color: TEAL, size: 15 });
          S.actor('s3-final', 0, -1.8,
            '$4 - (-3) = 4 + 3 = 7$',
            { color: GREEN, size: 24, bold: true });

          // 强调
          S.actor('s3-emph', 0, -3.2,
            '<b>两变必须同步，缺一不可！</b>',
            { color: WARM, size: 17 });

          P.renderCard(
            '<b>两变操作</b><br>' +
            '<b style="color:#c62828">第一变</b>：减号 → 加号<br>' +
            '<b style="color:#1565c0">第二变</b>：减数 → 相反数<br>' +
            '$4 - (-3) = 4 + 3 = 7$<br>' +
            '两变<b>必须同步</b>，缺一不可！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：口练两题 + 错例辨析
      {
        narration: '口练两题，全班一起来。第一题：(-3)-(-5)，减数是 -5，相反数是 +5，所以变成 (-3)+(+5)=2。第二题：0-7，减数是 7，相反数是 -7，变成 0+(-7)=-7。再来看错例：有同学把 4-(-3) 算成 4-3=1——减号没变，只把 -3 变成了 3，只做了一变，这就是只变一半的错误！',
        enter: function (anim) {
          S.remove('s3-two-title');
          S.remove('s3-orig-lbl');
          S.remove('s3-orig');
          S.remove('s3-v1-lbl');
          S.remove('s3-v1-arrow');
          S.remove('s3-v1-result');
          S.remove('s3-v2-lbl');
          S.remove('s3-v2-arrow');
          S.remove('s3-v2-result');
          S.remove('s3-final-sep');
          S.remove('s3-final');
          S.remove('s3-emph');

          S.actor('s3-prac-title', 0, 7.2, '口练两题', { color: COOL, size: 19, bold: true });

          // 口练 1
          S.actor('s3-p1-q', -3.5, 5.8,
            '$(-3) - (-5) = $ ？', { color: INK, size: 17 });
          S.actor('s3-p1-step', -3.5, 4.7,
            '= $(-3) + (+5)$', { color: TEAL, size: 16 });
          S.actor('s3-p1-ans', -3.5, 3.6,
            '= $2$', { color: GREEN, size: 20, bold: true });

          // 口练 2
          S.actor('s3-p2-q', 3.5, 5.8,
            '$0 - 7 = $ ？', { color: INK, size: 17 });
          S.actor('s3-p2-step', 3.5, 4.7,
            '= $0 + (-7)$', { color: TEAL, size: 16 });
          S.actor('s3-p2-ans', 3.5, 3.6,
            '= $-7$', { color: GREEN, size: 20, bold: true });

          // 分隔线
          S.addSegment('s3-div', [-9, 2.8], [9, 2.8], { color: GRAY, width: 1.5, dash: 2 });

          // 错例辨析
          S.actor('s3-err-title', 0, 2.1,
            '错例辨析', { color: RED, size: 18, bold: true });

          S.actor('s3-err-wrong', 0, 1.0,
            '错误：$4 - (-3) = 4 - 3 = 1$　✗', { color: RED, size: 16 });
          S.actor('s3-err-why', 0, -0.1,
            '只把 $-3$ 变成 $3$，减号没变——只变了一半！', { color: WARM, size: 15 });

          S.actor('s3-err-right', 0, -1.3,
            '正确：$4 - (-3) = 4 + 3 = 7$　✓', { color: GREEN, size: 16 });
          S.actor('s3-err-remind', 0, -2.4,
            '<b>两变同步：减号也要变！</b>', { color: RED, size: 16 });

          P.renderCard(
            '<b>口练</b><br>' +
            '$(-3)-(-5) = (-3)+(+5) = 2$<br>' +
            '$0 - 7 = 0 + (-7) = -7$<br>' +
            '<b style="color:#c62828">错例</b>：$4-(-3)=4-3=1$（减号未变！）<br>' +
            '两变必须同步，不能漏！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
