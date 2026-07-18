// s6-summary.js  六、易错与小结（3步）
// 数学验算：-(a-b+c)：(-1)×a=-a，(-1)×(-b)=+b，(-1)×(+c)=-c，结果=-a+b-c ✓
//   错误写法 -a-b+c 中第二项符号未变，第三项符号却对了（误打误撞）
//   下节悬念式：2(3x-1)+(x+5)-3(x-2)（不要求化简，留悬念）
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：头号易错——减号只变第一项（headShake卡片）
      {
        narration: '头号易错展示！看这道式子：减号括号 a 减 b 加 c。有同学会写成负 a 减 b 加 c——注意！这是错的！减号后面括号里的每一项都要变号，b 前面是减号，变号后要变成加 b；c 前面是加号，变号后变成负 c。正确结果是负 a 加 b 减 c，三项全变，一个都不能漏！',
        enter: function (anim) {
          S.actor('s6-err-title', 0, 7.0, '头号易错：减号只变第一项', { color: RED, size: 22, bold: true });

          S.actor('s6-orig', 0, 5.6, '$-(a - b + c)$', { color: INK, size: 26, bold: true });

          S.actor('s6-wrong-lab', -5, 4.0, '错误写法：', { color: RED, size: 18 });
          S.actor('s6-wrong-expr', 3, 4.0, '$-a - b + c$', { color: RED, size: 22, bold: true });
          S.actor('s6-wrong-x', 7.5, 4.0, '✗', { color: RED, size: 26, bold: true });

          S.actor('s6-right-lab', -5, 2.4, '正确写法：', { color: GREEN, size: 18 });
          S.actor('s6-right-expr', 3, 2.4, '$-a + b - c$', { color: GREEN, size: 22, bold: true });
          S.actor('s6-right-ok', 7.5, 2.4, '✓', { color: GREEN, size: 26, bold: true });

          S.actor('s6-explain', 0, 0.8,
            '三项都是负号乘的：$-a$、$+b$（负负得正）、$-c$',
            { color: TEAL, size: 17 });
          S.actor('s6-warn', 0, -0.6,
            '有几项，就变几项——一个都不能漏！',
            { color: WARM, size: 20, bold: true });

          P.renderCard(
            '【易错】$-(a-b+c) \\neq -a-b+c$<br>' +
            '正确：$-(a-b+c) = -a+b-c$<br>' +
            '减号后的每一项都要变号！',
            'warm',
            'headShake'
          );
          return anim ? delay(600) : null;
        }
      },
      // Step 2：小结表（三种情形汇总）
      {
        narration: '来看小结表，三种情形汇总。第一行，加号括号，各项不变号，代表例子 +(x-3) 等于 x-3；第二行，减号括号，各项都变号，代表例子 -(x-3) 等于 -x+3；第三行，带整数因数 k，每项乘以 k，注意负负得正，代表例子 -2(x-y) 等于 -2x 加 2y。三条法则，背后都是乘法分配律！',
        enter: function (anim) {
          S.remove('s6-err-title'); S.remove('s6-orig');
          S.remove('s6-wrong-lab'); S.remove('s6-wrong-expr'); S.remove('s6-wrong-x');
          S.remove('s6-right-lab'); S.remove('s6-right-expr'); S.remove('s6-right-ok');
          S.remove('s6-explain'); S.remove('s6-warn');

          S.actor('s6-sum-title', 0, 7.0, '本节小结', { color: TEAL, size: 22, bold: true });

          P.renderTable({
            head: ['情形', '法则', '代表例'],
            rows: [
              ['$+(\\quad)$', '各项不变号', '$+(x-3)=x-3$'],
              ['$-(\\quad)$', '各项都变号', '$-(x-3)=-x+3$'],
              ['$k(\\quad)$（含负 $k$）', '每项乘以 $k$，注意负负得正', '$-2(x-y)=-2x+2y$']
            ]
          });

          S.actor('s6-sum-basis', 0, 5.5,
            '三条法则的共同依据：乘法分配律',
            { color: COOL, size: 18 });
          S.actor('s6-sum-flow', 0, 4.2,
            '完整流程：去括号 $\\Rightarrow$ 合并同类项',
            { color: WARM, size: 18 });

          P.renderCard(
            '<b>本节知识树</b><br>' +
            '去括号依据：乘法分配律<br>' +
            '法则一：+号 → 不变<br>' +
            '法则二：−号 → 全变<br>' +
            '带系数：每项乘，注意负负得正<br>' +
            '完整化简：去括号 → 合并同类项',
            'teal'
          );
          return anim ? delay(400) : null;
        }
      },
      // Step 3：悬念结尾
      {
        narration: '最后给大家留一个悬念！看这道式子：2 乘括号 3x 减 1，加括号 x 加 5，减 3 乘括号 x 减 2。既有去括号，又有合并同类项，两步要联手登场——这就是下节课整式的加减要挑战的！你准备好了吗？',
        enter: function (anim) {
          S.remove('s6-sum-title'); S.remove('s6-sum-basis'); S.remove('s6-sum-flow');

          S.actor('s6-next-title', 0, 7.0, '下节预告：整式的加减', { color: TEAL, size: 22, bold: true });
          S.actor('s6-next-expr', 0, 5.2,
            '$2(3x-1) + (x+5) - 3(x-2)$',
            { color: INK, size: 24, bold: true });
          S.actor('s6-next-q', 0, 3.6, '括号和同类项各个击破……', { color: WARM, size: 20 });
          S.actor('s6-next-q2', 0, 2.4, '下节它们将联手登场！', { color: WARM, size: 20 });

          S.actor('s6-link1', -5, 0.8, '上承：', { color: COOL, size: 17 });
          S.actor('s6-link1-text', 1, 0.8, '2.4 合并同类项', { color: COOL, size: 17 });
          S.actor('s6-link2', -5, -0.4, '本节：', { color: INK, size: 17 });
          S.actor('s6-link2-text', 1, -0.4, '2.5 去括号', { color: INK, size: 17 });
          S.actor('s6-link3', -5, -1.6, '下启：', { color: GREEN, size: 17 });
          S.actor('s6-link3-text', 1, -1.6, '2.6 整式的加减', { color: GREEN, size: 17 });

          P.renderCard(
            '括号和同类项各个击破，<br>' +
            '下节课它们将联手登场——<br>' +
            '<b>整式加减的终极挑战，你准备好了吗？</b>',
            'cool'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
