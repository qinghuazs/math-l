// s5-mixed.js  五、加减混合与代数和（4步）
// 数学验算：
//   例：(-20)+(+3)-(-5)-(+7)
//   全变加法：(-20)+(+3)+(+5)+(-7)
//   省略括号：-20+3+5-7
//   同号集中：(-20-7)+(3+5) = -27+8 = -19 ✓
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
    id: 's5',
    title: '五、加减混合与代数和',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：题目，全部转加法
      {
        narration: '当一道题里既有加法又有减法，我们能不能统一成只有加法来算呢？看这道例题：(-20) 加 (+3) 减 (-5) 减 (+7)。里面有加有减，混在一起。第一步：把所有减法都用法则转化为加法。(-5) 的相反数是 (+5)，(+7) 的相反数是 (-7)。全变加法后：(-20)+(+3)+(+5)+(-7)。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.5, '加减混合运算→统一成加法', { color: COOL, size: 18, bold: true });

          // 原式
          S.actor('s5-orig-lbl', 0, 6.5, '原式：', { color: INK, size: 15 });
          S.actor('s5-orig', 0, 5.5,
            '$(-20)+(+3)-(-5)-(+7)$',
            { color: INK, size: 20 });

          // 逐步分析
          S.actor('s5-ana1', 0, 4.3,
            '$-(-5)$ → $+(+5)$（减负变加正）',
            { color: WARM, size: 15 });
          S.actor('s5-ana2', 0, 3.3,
            '$-(+7)$ → $+(-7)$（减正变加负）',
            { color: COOL, size: 15 });

          // 第一步结果
          S.actor('s5-step1-lbl', 0, 2.1, '全变加法：', { color: TEAL, size: 15 });
          S.actor('s5-step1', 0, 1.1,
            '$= (-20) + (+3) + (+5) + (-7)$',
            { color: TEAL, size: 19 });

          P.renderCard(
            '<b>加减混合例题</b><br>' +
            '$(-20)+(+3)-(-5)-(+7)$<br>' +
            '<b>第一步</b>：全变加法<br>' +
            '$= (-20)+(+3)+(+5)+(-7)$'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：省略括号，代数和
      {
        narration: '第二步：省略括号，写成代数和。规则：加号后面的正数括号可以直接去掉；+(+3) 写成 +3；+(-7) 写成 -7。省略括号后得到：-20+3+5-7。这种省略加号括号的式子，叫做代数和。注意：省略括号但符号不能丢！',
        enter: function (anim) {
          S.remove('s5-ana1');
          S.remove('s5-ana2');

          S.actor('s5-step2-lbl', 0, 0.0, '省略括号（代数和）：', { color: TEAL, size: 15 });
          S.actor('s5-step2', 0, -1.1,
            '$= -20 + 3 + 5 - 7$',
            { color: RED, size: 23, bold: true });

          // 省略规则说明
          S.actor('s5-omit1', 0, -2.4,
            '$+(+3)$ → $+3$（加正数，括号去掉）',
            { color: GRAY, size: 14 });
          S.actor('s5-omit2', 0, -3.4,
            '$+(-7)$ → $-7$（加负数，括号去掉保留符号）',
            { color: GRAY, size: 14 });

          // 代数和定义
          S.actor('s5-def-title', 0, -4.8, '"代数和"定义：', { color: COOL, size: 16, bold: true });
          S.actor('s5-def', 0, -5.8,
            '省略加号括号后的式子叫<b>代数和</b>',
            { color: COOL, size: 15 });

          P.renderCard(
            '<b>第二步：省略括号 → 代数和</b><br>' +
            '$(-20)+(+3)+(+5)+(-7)$<br>' +
            '$= -20+3+5-7$<br>' +
            '这就是<b>代数和</b>（省略了加号括号）。<br>' +
            '符号<b>不能丢</b>！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：同号集中计算
      {
        narration: '第三步：同号集中，分别求和，再相加。代数和 -20+3+5-7 中，负数有 -20 和 -7，正数有 3 和 5。负数集中：-20-7=-27；正数集中：3+5=8。最后 -27+8=-19。答案是 -19！',
        enter: function (anim) {
          S.remove('s5-step2-lbl');
          S.remove('s5-step2');
          S.remove('s5-omit1');
          S.remove('s5-omit2');
          S.remove('s5-def-title');
          S.remove('s5-def');

          S.actor('s5-step3-lbl', 0, 0.3,
            '第三步：同号集中', { color: TEAL, size: 16, bold: true });
          S.actor('s5-step3-split', 0, -0.8,
            '$-20+3+5-7$', { color: INK, size: 22 });

          S.actor('s5-neg-lbl', -3.5, -2.0, '负数：', { color: RED, size: 15 });
          S.actor('s5-neg', -3.5, -3.0,
            '$(-20) + (-7) = -27$', { color: RED, size: 17 });

          S.actor('s5-pos-lbl', 3.5, -2.0, '正数：', { color: GREEN, size: 15 });
          S.actor('s5-pos', 3.5, -3.0,
            '$(+3) + (+5) = +8$', { color: GREEN, size: 17 });

          S.actor('s5-step3-final', 0, -4.5,
            '$= -27 + 8 = -19$', { color: COOL, size: 22 });

          S.actor('s5-ans', 0, -5.8,
            '答案：$-19$ ✓', { color: GREEN, size: 24, bold: true });

          P.renderCard(
            '<b>第三步：同号集中计算</b><br>' +
            '负数：$(-20)+(-7) = -27$<br>' +
            '正数：$(+3)+(+5) = +8$<br>' +
            '$-27+8 = -19$<br>' +
            '答案：$-19$ ✓'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 4：两种读法 + 易错提醒
      {
        narration: '代数和有两种正确读法。对于 -20+3+5-7，第一种按"和"读："-20、+3、+5、-7 的和"；第二种按运算读："负20 加3 加5 减7"。两种都对。最后一个易错点：省略括号后看到 -20+3，有人算成 -23，把加法做成了减法。要记住：-20 是一个完整的数，+3 是加上3，不是-23！',
        enter: function (anim) {
          S.remove('s5-step3-lbl');
          S.remove('s5-step3-split');
          S.remove('s5-neg-lbl');
          S.remove('s5-neg');
          S.remove('s5-pos-lbl');
          S.remove('s5-pos');
          S.remove('s5-step3-final');
          S.remove('s5-ans');

          S.actor('s5-read-title', 0, 7.0,
            '代数和的两种读法', { color: COOL, size: 19, bold: true });
          S.actor('s5-read-expr', 0, 5.8,
            '$-20+3+5-7$', { color: INK, size: 24 });

          S.actor('s5-read1-lbl', 0, 4.5, '读法 ①（按"和"读）：', { color: TEAL, size: 15 });
          S.actor('s5-read1', 0, 3.5,
            '"$-20$、$+3$、$+5$、$-7$ 的和"',
            { color: TEAL, size: 15 });

          S.actor('s5-read2-lbl', 0, 2.5, '读法 ②（按运算读）：', { color: COOL, size: 15 });
          S.actor('s5-read2', 0, 1.5,
            '"负20 加3 加5 减7"',
            { color: COOL, size: 15 });

          // 分割线
          S.addSegment('s5-div', [-9, 0.8], [9, 0.8], { color: GRAY, width: 1.5, dash: 2 });

          // 易错提醒
          S.actor('s5-err-title', 0, 0.1, '易错提醒', { color: RED, size: 17, bold: true });
          S.actor('s5-err-wrong', 0, -1.0,
            '错误：$-20+3 = -23$　✗', { color: RED, size: 16 });
          S.actor('s5-err-why', 0, -2.1,
            '$-20$ 是一个数，$+3$ 是加上 $3$，', { color: WARM, size: 15 });
          S.actor('s5-err-why2', 0, -3.0,
            '不要把"$-20+3$"误读成"$-20$ 与 $3$ 相减"！', { color: WARM, size: 14 });
          S.actor('s5-err-right', 0, -4.1,
            '正确：$-20+3 = -17$　✓', { color: GREEN, size: 16 });

          P.renderCard(
            '<b>代数和两种读法</b>（对 $-20+3+5-7$）<br>' +
            '① "$-20$、$+3$、$+5$、$-7$ 的和"<br>' +
            '② "负20 加3 加5 减7"<br>' +
            '<b style="color:#c62828">易错</b>：$-20+3 \\neq -23$，$-20$ 是整体！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
