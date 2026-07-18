// s1-intro.js  一、括号里的秘密——情境引入（3步）
// 数学验算：a=1,b=1 代入 8a+2b+(5a-b)=8+2+(5-1)=14
//   方案一(错误)：8a+2b+5a+b=13a+3b → 代入=13+3=16 ≠ 14
//   方案二(正确)：8a+2b+5a-b=13a+b  → 代入=13+1=14 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、括号里的秘密',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示含括号的式子，提出问题
      {
        narration: '上节课我们学会了合并同类项，今天式子里悄悄藏了一个括号——8a 加 2b 加小括号 5a 减 b。括号是拦路虎还是纸老虎？能直接去掉括号合并吗？',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '上节课：合并同类项', { color: TEAL, size: 18, bold: true });
          S.actor('s1-expr', 0, 4.5, '$8a + 2b + (5a - b)$', { color: INK, size: 26, bold: true });
          S.actor('s1-q', 0, 2.5, '括号怎么去？直接抹掉行吗？', { color: WARM, size: 20 });
          P.renderCard(
            '<b>情境问题</b><br>' +
            '式子 $8a + 2b + (5a - b)$ 含有括号。<br>' +
            '去掉括号合并同类项，怎么处理括号里的符号？'
          );
          return anim ? delay(400) : null;
        }
      },
      // Step 2：对比两种方案——错误 vs 正确
      {
        narration: '我们来看两种方案。方案一：直接抹掉括号，括号内符号原样保留，得 13a 加 3b。方案二：去括号时 b 前面的减号保留，得 13a 加 b。哪种对？用 a 等于 1、b 等于 1 代入原式验证！',
        enter: function (anim) {
          S.remove('s1-q');
          S.actor('s1-label-orig', -6, 2.8, '原式（代入 $a=1, b=1$）：', { color: INK, size: 16 });
          S.actor('s1-val-orig', 0, 2.8, '$8+2+(5-1) = 14$', { color: TEAL, size: 18, bold: true });

          S.actor('s1-label-a', -6, 1.2, '方案一（错！）：', { color: RED, size: 16 });
          S.actor('s1-wrong', 2, 1.2, '$13a+3b \\Rightarrow 16 \\neq 14$', { color: RED, size: 17 });

          S.actor('s1-label-b', -6, -0.4, '方案二（待验）：', { color: COOL, size: 16 });
          S.actor('s1-right-expr', 2, -0.4, '$13a+b \\Rightarrow 14 = 14$ ✓', { color: GREEN, size: 17 });

          P.renderCard(
            '<b>数值验证</b>（$a=1, b=1$）<br>' +
            '原式 $= 8+2+(5-1) = 14$<br>' +
            '方案一：$13a+3b = 16$ ✗<br>' +
            '方案二：$13a+b = 14$ ✓<br>' +
            '括号前的加号对符号<b>有影响</b>，不能乱去！'
          );
          return anim ? delay(500) : null;
        }
      },
      // Step 3：点出关键——需要去括号法则
      {
        narration: '方案二是对的！这说明括号前的加号对括号内的符号确实有影响——不能随便抹掉。那么，到底什么情况下符号不变、什么情况下符号改变？这就是今天要学的——去括号法则！',
        enter: function (anim) {
          S.remove('s1-label-a'); S.remove('s1-wrong');
          S.remove('s1-label-b'); S.remove('s1-right-expr');
          S.remove('s1-label-orig'); S.remove('s1-val-orig');

          S.actor('s1-rule-title', 0, 3.5, '去括号法则', { color: WARM, size: 28, bold: true });
          S.actor('s1-rule-sub', 0, 1.5, '依据：乘法分配律', { color: TEAL, size: 22 });
          S.actor('s1-flow', 0, -0.5,
            '情境 $\\Rightarrow$ 推导 $\\Rightarrow$ 法则 $\\Rightarrow$ 例题 $\\Rightarrow$ 易错',
            { color: INK, size: 17 });

          P.renderCard(
            '<b>本节目标</b><br>' +
            '① 括号前是"+"：各项符号不变<br>' +
            '② 括号前是"−"：各项符号都变<br>' +
            '③ 带数字因数：逐项相乘<br>' +
            '依据：乘法分配律（今天揭秘！）',
            'teal'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
